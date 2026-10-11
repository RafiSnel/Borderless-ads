# The Comeback v3 — builds v/sf/vo.wav (dialogue + bar/sad beds + crowd + clip sfx), dlg.wav (dialogue only, for ducking),
# mont_bed.wav (original montage track: stops dead at the hook, slams back at LOCK IN), bar2_bed.wav and lips.json (mouth movement per speaker).
import numpy as np, subprocess, json
SR = 44100; DUR = 78.2; A = '/home/claude/kit/v/sf/a/'; O = '/home/claude/kit/v/sf/'
def load(n):
    d = subprocess.run(['ffmpeg', '-v', 'error', '-i', A + n, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(d, np.float32).copy()
N = int(SR * DUR)
def Z(): return np.zeros(N, np.float32)
def put(buf, x, t, g=1.0):
    i = int(t * SR); x = x[:max(0, N - i)]; buf[i:i + len(x)] += x * g
def lp(x, n=9): return np.convolve(x, np.ones(n) / n, 'same').astype(np.float32)
def echo(x, g=0.45, taps=(0, 0.18, 0.37, 0.6, 0.85)):
    k = np.zeros(int(SR * 1.2), np.float32)
    for j, d in enumerate(taps): k[int(d * SR)] = 0.8 ** j
    return (lp(np.convolve(x, k)[:len(x) + int(SR * 1.2)]) * g).astype(np.float32)
def far(x, g=0.4): return echo(lp(x, 31), g, (0, 0.11, 0.24, 0.4))
db = lambda d: 10 ** (d / 20)
def env(pts):
    ts = np.arange(N) / SR; return np.interp(ts, [p[0] for p in pts], [db(p[1]) for p in pts]).astype(np.float32)
def save(x, p): subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', p], input=np.clip(x, -1, 1).astype(np.float32).tobytes())

# (clip, time, speaker) — speaker drives the mouth of that character on screen
LINES = [('gem1', 0.4, 'gem'), ('flame1', 1.5, 'flame'), ('fail', 3.3, 'hero'), ('laughflame', 7.4, 'flame'), ('laughgem', 7.65, 'gem'), ('card1', 9.5, 'card'),
         ('again', 28.6, None), ('tooeasy', 40.15, 'hero'), ('vamos', 48.15, 'hero'), ('tomorrow', 52.8, None),
         ('flame3', 60.0, 'flame'), ('win', 61.2, 'hero'), ('perfect', 66.0, 'card'), ('noway', 69.3, 'gem'), ('what', 71.3, 'flame'), ('algomas', 73.1, 'hero'), ('vale', 76.0, 'hero')]
dlg = Z(); lips = {}
for n, t, who in LINES:
    x = load(n + '.wav'); put(dlg, x, t)
    if who:
        f = SR // 30; v = [float(np.sqrt(np.mean(x[k:k + f] ** 2))) for k in range(0, len(x) - f, f)]
        m = max(v) or 1; lips.setdefault(who, []).append([t, [round(min(1, (q / m) ** 0.6 * 1.15), 2) if q > 0.012 else 0 for q in v]])
json.dump(lips, open(O + 'lips.json', 'w'))
put(dlg, load('getup.wav'), 46.0)
for n, t, g in [('laughgem', 15.5, 0.4), ('card1', 16.4, 0.5), ('card1', 43.5, 0.55), ('laughflame', 44.4, 0.45), ('flame2', 45.3, 0.5)]:
    put(dlg, echo(load(n + '.wav'), g), t)
ref = load('ref.wav'); segs = [(0.0, 0.62), (1.2, 1.72), (2.3, 2.87), (3.5, 4.07), (4.6, 5.17), (5.65, 6.4), (6.7, 7.4)]
for (a, b), t in zip(segs, [43.1, 43.95, 44.8, 45.65, 46.5, 47.35, 48.2]):
    seg = ref[int(a * SR):int(b * SR)]
    put(dlg, far(seg, 0.5) if t < 46.8 else echo(seg, 0.75, (0, 0.15)), t)

vo = dlg.copy()
bar = load('bar.wav'); sad = load('sad.wav')
b = Z(); put(b, bar, 0); vo += b * env([(0, -16), (7.3, -16), (7.4, -30), (9.4, -24), (10.8, -22), (11.4, -80), (DUR, -80)])
s = Z(); put(s, sad, 11.2); vo += s * env([(0, -80), (11.2, -40), (11.7, -12), (21.2, -11), (22.0, -14), (22.9, -40), (23.1, -80), (DUR, -80)])
put(vo, load('portal.wav'), 22.05, 0.9)
put(vo, load('hook.wav'), 41.35, 0.55)
cr = load('crowd.wav'); crowd = Z()
for t0 in np.arange(38.4, 56.0, 7.9): put(crowd, cr, t0)
vo += crowd * env([(0, -80), (38.4, -80), (38.6, -15), (40.0, -11), (41.6, -12), (41.75, -34), (42.8, -60), (47.6, -60), (48.7, -26), (48.9, -14), (51.3, -9), (52.2, -14), (53.4, -40), (53.8, -80), (DUR, -80)])
save(vo, O + 'vo.wav'); save(dlg, O + 'dlg.wav')

m = load('mont.wav')
mb = Z(); put(mb, m[:int(19.0 * SR)], 23.15)
mb2 = Z(); put(mb2, m[int(111.56 * SR):], 48.9)
mont = mb * env([(0, -80), (23.13, -80), (23.15, -6), (41.68, -6), (41.71, -90), (DUR, -90)])
mont += mb2 * env([(0, -90), (48.88, -90), (48.9, -5), (58.5, -6), (59.2, -21), (73.9, -21), (74.2, -9), (77.4, -9), (DUR, -50)])
save(mont, O + 'mont_bed.wav')
b2 = Z(); put(b2, bar[int(SR * 4):], 58.7); save(b2 * env([(0, -80), (58.7, -80), (58.9, -22), (DUR, -22)]), O + 'bar2_bed.wav')
print('ok', {k: len(v) for k, v in lips.items()})
