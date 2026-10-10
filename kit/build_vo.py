"""Download VO lines, trim, tighten, speed up, concatenate with designed gaps.
Writes vo.wav and timeline.json with exact line starts/ends and phrase onsets inside lines."""
import json, subprocess, os, wave, array, urllib.request
import sys; V = sys.argv[1]; D = V + '/vo'; os.makedirs(D, exist_ok=True)
SR = 44100
TEMPO = 1.08          # on top of the model's max speed
GAP = {int(k): v for k, v in (json.load(open(V + '/gaps.json')).items() if os.path.exists(V + '/gaps.json') else {})}
DEFAULT_GAP = 0.10
LEAD = 0.15

def run(*a): subprocess.run(a, check=True)

lines = []
for row in open(V + '/vo_urls.txt'):
    n, url = row.split(maxsplit=1); n = int(n)
    raw = f'{D}/raw_{n:02d}.mp3'
    if not os.path.exists(raw): urllib.request.urlretrieve(url.strip(), raw)
    out = f'{D}/t_{n:02d}.wav'
    # trim edges, squeeze internal pauses to <=0.12 s, speed up, mono 44.1k
    run('ffmpeg', '-v', 'error', '-y', '-i', raw, '-af',
        'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02,'
        'areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,'
        'silenceremove=stop_periods=-1:stop_duration=0.12:stop_threshold=-42dB,'
        f'atempo={TEMPO}', '-ac', '1', '-ar', str(SR), out)
    with wave.open(out) as w: pcm = array.array('h', w.readframes(w.getnframes()))
    lines.append((n, pcm))

def onsets(pcm, min_gap=0.07):
    """Phrase onsets: starts of sound after a silence of >= min_gap s (20 ms windows)."""
    win = int(SR * 0.02); res = []; silent = 99
    for i in range(0, len(pcm), win):
        c = pcm[i:i + win]; rms = (sum(x * x for x in c) / max(1, len(c))) ** 0.5
        if rms > 900:
            if silent * 0.02 >= min_gap: res.append(round(i / SR, 3))
            silent = 0
        else: silent += 1
    return res

out = array.array('h', [0] * int(SR * LEAD)); tl = []
for n, pcm in lines:
    if n > 1: out.extend([0] * int(SR * GAP.get(n, DEFAULT_GAP)))
    start = len(out) / SR
    out.extend(pcm)
    tl.append({'n': n, 'start': round(start, 3), 'end': round(len(out) / SR, 3),
               'phrases': [round(start + o, 3) for o in onsets(pcm)]})
out.extend([0] * int(SR * 0.1))
with wave.open(V + '/vo.wav', 'w') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes())
json.dump(tl, open(V + '/timeline.json', 'w'), indent=1)
for t in tl: print(t['n'], t['start'], t['end'], t['phrases'])
print('total', round(len(out) / SR, 2))
