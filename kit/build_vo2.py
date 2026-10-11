"""Voiceover from ONE TTS take (+ optional separate clips), split into lines by its longest pauses.
Usage: python3 build_vo2.py <dir>
<dir>/vo.json: {"main": "<url of full take>", "lines": [ {"text": "..."} | {"text": "...", "url": "<separate clip>"} ],
                "gaps": {"<line n>": seconds before it}, "tempo": 1.08}
Writes <dir>/vo.wav and <dir>/timeline.json (n, text, start, end, phrases)."""
import json, os, subprocess, sys, urllib.request, wave
import numpy as np
V = sys.argv[1]; D = V + '/vo'; os.makedirs(D, exist_ok=True)
cfg = json.load(open(V + '/vo.json'))
SR = 44100; TEMPO = cfg.get('tempo', 1.08); LEAD = 0.12
GAPS = {int(k): v for k, v in cfg.get('gaps', {}).items()}

def fetch(url, path):
    if not os.path.exists(path): urllib.request.urlretrieve(url, path)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(float) / 32768

def tighten(x, path):
    """trim edges, squeeze inner pauses to <=0.12 s, speed up"""
    tmp = path + '.in.wav'
    with wave.open(tmp, 'w') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-af',
                    'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02,'
                    'areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,'
                    f'silenceremove=stop_periods=-1:stop_duration={cfg.get("maxpause", 0.12)}:stop_threshold=-42dB,'
                    f'atempo={TEMPO}', '-ac', '1', '-ar', str(SR), path], check=True)
    with wave.open(path) as w: return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768

def split_by_pauses(x, k):
    """split x into k parts at the k-1 longest silences (20 ms frames, adaptive threshold)"""
    if k <= 1: return [x]
    hop = int(SR * 0.02); fr = len(x) // hop
    rms = np.array([np.sqrt(np.mean(x[i * hop:(i + 1) * hop] ** 2)) for i in range(fr)])
    thr = max(0.01, np.percentile(rms, 60) * 0.12)
    sil = rms < thr; runs = []; i = 0
    while i < fr:
        if sil[i]:
            j = i
            while j < fr and sil[j]: j += 1
            if i > 0 and j < fr: runs.append((j - i, i, j))
            i = j
        else: i += 1
    runs.sort(reverse=True)
    if len(runs) < k - 1: raise SystemExit(f'only {len(runs)} pauses found for {k} lines')
    cuts = sorted(((a + b) // 2) * hop for _, a, b in runs[:k - 1])
    return np.split(x, cuts)

def onsets(pcm, min_gap=0.07):
    win = int(SR * 0.02); res = []; silent = 99
    for i in range(0, len(pcm), win):
        c = pcm[i:i + win]; r = np.sqrt(np.mean(c ** 2)) if len(c) else 0
        if r > 0.027:
            if silent * 0.02 >= min_gap: res.append(round(i / SR, 3))
            silent = 0
        else: silent += 1
    return res

lines = cfg['lines']
main_idx = [i for i, l in enumerate(lines) if 'url' not in l]
main = fetch(cfg['main'], D + '/main.mp3') if main_idx else None
parts = split_by_pauses(main, len(main_idx)) if main_idx else []
segs = {}
for i, p in zip(main_idx, parts): segs[i] = tighten(p, f'{D}/l{i + 1:02d}.wav')
for i, l in enumerate(lines):
    if 'url' in l: segs[i] = tighten(fetch(l['url'], f'{D}/x{i + 1:02d}.mp3'), f'{D}/l{i + 1:02d}.wav')
out = [np.zeros(int(SR * LEAD))]; t = LEAD; tl = []
for i, l in enumerate(lines):
    n = i + 1
    if n > 1:
        g = GAPS.get(n, 0.10); out.append(np.zeros(int(SR * g))); t += g
    s = segs[i]; tl.append({'n': n, 'text': l['text'], 'start': round(t, 3), 'end': round(t + len(s) / SR, 3), 'phrases': [round(t + o, 3) for o in onsets(s)]})
    out.append(s); t += len(s) / SR
out.append(np.zeros(int(SR * 0.1)))
y = np.concatenate(out)
with wave.open(V + '/vo.wav', 'w') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
json.dump(tl, open(V + '/timeline.json', 'w'), indent=1)
for r in tl: print(r['n'], r['start'], r['end'], r['phrases'][:6], '|', r['text'][:50])
print('total', round(len(y) / SR, 2))
