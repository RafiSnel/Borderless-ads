# ep_build.py <ep>  — La Esquina episode audio + timeline.
# Reads v/<ep>/script.json:
#   lines: [{id, who, text, sub?, at? | gap?(after previous line end, default 0.35), fx?: "echo"|"far"|"radio", gain?}]
#   music: [[file(in music/ or a/), start_t, file_offset, gain_db, fade_in, fade_out, end_t]]
#   clips: [[file, t, gain]]          (sfx clips, extra)
#   tail: seconds after the last line (or "dur": absolute duration)
#   marks: {name: [line_id, offset]}  (named moments relative to a line, for the scene)
# Writes v/<ep>/timeline.json ({lines:{id:{t,d,who,text,sub}}, marks:{}, dur}), lips.json, dlg.wav, vo.wav
import json, subprocess, sys, numpy as np
SR = 44100
ep = sys.argv[1]; D = f'/home/claude/kit/v/{ep}/'; M = '/home/claude/kit/music/'
S = json.load(open(D + 'script.json'))
def load(p):
    d = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(d, np.float32).copy()
def lp(x, n=9): return np.convolve(x, np.ones(n) / n, 'same').astype(np.float32)
def echo(x, g=0.6, taps=(0, 0.18, 0.37, 0.6, 0.85)):
    k = np.zeros(int(SR * 1.2), np.float32)
    for j, d in enumerate(taps): k[int(d * SR)] = 0.8 ** j
    return (lp(np.convolve(x, k)) * g).astype(np.float32)
def radio(x):  # phone / tv / earpiece: band-limited and a bit crunchy
    y = x - lp(x, 41); y = lp(y, 3); return np.clip(y * 2.2, -0.6, 0.6).astype(np.float32)
lines = {}; t = S.get('start', 1.0); prev_end = t; clips = []
for L in S['lines']:
    x = load(D + 'a/' + L['id'] + '.wav'); d = len(x) / SR
    t0 = L['at'] if 'at' in L else prev_end + L.get('gap', 0.35)
    if 'after' in L: t0 = lines[L['after']]['t'] + lines[L['after']]['d'] + L.get('gap', 0.35)
    fx = L.get('fx')
    if fx == 'echo': x = echo(x)
    elif fx == 'far': x = echo(lp(x, 31), 0.5, (0, 0.11, 0.24, 0.4))
    elif fx == 'radio': x = radio(x)
    lines[L['id']] = {'t': round(t0, 3), 'd': round(d, 3), 'who': L.get('who'), 'text': L.get('text', ''), 'sub': L.get('sub')}
    clips.append((x * L.get('gain', 1.0), t0, L.get('who'), fx))
    prev_end = max(prev_end, t0 + d)
marks = {}
for k, v in S.get('marks', {}).items():
    if v[0].startswith('mark:'): marks[k] = round(marks[v[0][5:]] + v[1], 3)
    else: marks[k] = round(lines[v[0]]['t'] + (lines[v[0]]['d'] if len(v) > 2 and v[2] == 'end' else 0) + v[1], 3)
dur = S.get('dur') or round(prev_end + S.get('tail', 2.0), 2)
N = int(SR * dur)
def put(buf, x, t, g=1.0):
    i = int(t * SR)
    if i >= N: return
    x = x[:N - i]; buf[i:i + len(x)] += x * g
dlg = np.zeros(N, np.float32); lips = {}
for x, t0, who, fx in clips:
    put(dlg, x, t0)
    if who and fx not in ('echo', 'far', 'radio'):
        f = SR // 30; v = [float(np.sqrt(np.mean(x[k:k + f] ** 2))) for k in range(0, max(1, len(x) - f), f)]
        m = max(v) or 1; lips.setdefault(who, []).append([round(t0, 3), [round(min(1, (q / m) ** 0.6 * 1.15), 2) if q > 0.012 else 0 for q in v]])
vo = dlg.copy()
db = lambda d: 10 ** (d / 20)
mus = np.zeros(N, np.float32)
for mu in S.get('music', []):
    f, st, off, gdb, fi, fo, en = mu
    R = lambda v: dur if v == 'end' else (marks[v] if isinstance(v, str) and v in marks else (lines[v]['t'] if isinstance(v, str) else v))
    st, en = R(st), R(en)
    p = M + f if not f.startswith('a/') else D + f
    x = load(p)[int(off * SR):]; x = x[:int((en - st) * SR)]
    n = len(x); e = np.ones(n, np.float32)
    a = int(fi * SR); b = int(fo * SR)
    if a: e[:a] = np.linspace(0, 1, a)
    if b and b < n: e[-b:] *= np.linspace(1, 0, b)
    put(mus, x * e, st, db(gdb))
# duck the music under dialogue
w = int(SR * 0.25); env = np.sqrt(np.convolve(dlg ** 2, np.ones(w) / w, 'same'))
env = np.convolve(env, np.ones(w) / w, 'same'); duck = 1 - 0.55 * np.clip(env / 0.04, 0, 1)
vo += mus * duck.astype(np.float32)
for f, t0, g in S.get('clips', []):
    t0 = marks[t0] if isinstance(t0, str) else t0
    put(vo, load(D + f if f.startswith('a/') else '/home/claude/kit/' + f), t0, g)
def save(x, p): subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', p], input=np.clip(x, -1, 1).astype(np.float32).tobytes())
save(vo, D + 'vo.wav'); save(dlg, D + 'dlg.wav')
json.dump({'lines': lines, 'marks': marks, 'dur': dur}, open(D + 'timeline.json', 'w'), indent=0, ensure_ascii=False)
json.dump(lips, open(D + 'lips.json', 'w'))
print('dur', dur); [print(f"  {k:6s} {v['t']:6.2f} +{v['d']:.2f}  {v['who']}: {v['text'][:50]}") for k, v in lines.items()]
for k, v in marks.items(): print('  mark', k, v)
