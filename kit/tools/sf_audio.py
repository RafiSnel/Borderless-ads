# The Comeback v2 — builds v/sf/vo.wav (dialogue + bar/sad beds + crowd), dlg.wav (dialogue only, for ducking),
# mont_bed.wav (original montage track: stops dead at the hook, slams back at LOCK IN) and bar2_bed.wav.
import numpy as np, subprocess
SR = 44100; DUR = 68.2; A = '/home/claude/kit/v/sf/a/'; O = '/home/claude/kit/v/sf/'
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
def far(x, g=0.4):  # muffled, distant: a voice heard after a knockout
    return echo(lp(x, 31), g, (0, 0.11, 0.24, 0.4))
db = lambda d: 10 ** (d / 20)
def env(pts):
    ts = np.arange(N) / SR; return np.interp(ts, [p[0] for p in pts], [db(p[1]) for p in pts]).astype(np.float32)
def save(x, p): subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', p], input=np.clip(x, -1, 1).astype(np.float32).tobytes())

dlg = Z()
for n, t in [('gem1', 0.4), ('flame1', 1.5), ('fail', 3.3), ('laughflame', 7.4), ('laughgem', 7.65), ('card1', 9.5), ('again', 25.35), ('vamos', 40.65), ('tomorrow', 44.4),
             ('flame3', 50.0), ('win', 51.2), ('perfect', 56.0), ('noway', 59.3), ('what', 61.3), ('algomas', 63.1), ('vale', 66.0)]:
    put(dlg, load(n + '.wav'), t)
put(dlg, load('getup.wav'), 38.6, 1.0)
# echoes in his head
for n, t, g in [('laughgem', 15.5, 0.4), ('card1', 16.4, 0.5), ('card1', 36.2, 0.55), ('laughflame', 37.0, 0.45), ('flame2', 37.8, 0.5)]:
    put(dlg, echo(load(n + '.wav'), g), t)
# the referee, far away
ref = load('ref.wav'); segs = [(0.0, 0.62), (1.2, 1.72), (2.3, 2.87), (3.5, 4.07), (4.6, 5.17), (5.65, 6.4), (6.7, 7.4)]
for (a, b), t in zip(segs, [35.9, 36.7, 37.5, 38.3, 39.1, 39.9, 40.7]):
    seg = ref[int(a * SR):int(b * SR)]; g = 0.5 if t < 39.4 else 0.8
    put(dlg, far(seg, g) if t < 39.4 else echo(seg, g, (0, 0.15)), t)

vo = dlg.copy()
bar = load('bar.wav'); sad = load('sad.wav')
b = Z(); put(b, bar, 0); vo += b * env([(0, -16), (7.3, -16), (7.4, -30), (9.4, -24), (10.8, -22), (11.4, -80), (DUR, -80)])
s = Z(); put(s, sad, 11.2); vo += s * env([(0, -80), (11.2, -40), (11.7, -12), (19.6, -11), (20.4, -14), (21.3, -40), (21.5, -80), (DUR, -80)])
# sfx clips
put(vo, load('portal.wav'), 20.45, 0.9)
put(vo, load('hook.wav'), 34.2, 0.55)
cr = load('crowd.wav'); crowd = Z()
for t0 in np.arange(31.9, 46.0, 7.9): put(crowd, cr, t0)
vo += crowd * env([(0, -80), (31.9, -80), (32.1, -15), (33.3, -11), (34.5, -12), (34.6, -34), (35.6, -60), (40.2, -60), (41.1, -26), (41.3, -14), (43.2, -9), (44.0, -14), (45.2, -40), (45.6, -80), (DUR, -80)])
save(vo, O + 'vo.wav'); save(dlg, O + 'dlg.wav')

m = load('mont.wav')
mb = Z(); put(mb, m[:int(13.0 * SR)], 21.55)
mb2 = Z(); put(mb2, m[int(111.56 * SR):], 41.3)
mont = mb * env([(0, -80), (21.53, -80), (21.55, -6), (34.53, -6), (34.56, -90), (DUR, -90)])
mont += mb2 * env([(0, -90), (41.28, -90), (41.3, -5), (48.5, -6), (49.2, -21), (63.9, -21), (64.2, -9), (67.4, -9), (DUR, -50)])
save(mont, O + 'mont_bed.wav')
b2 = Z(); put(b2, bar[int(SR * 8):], 48.7); save(b2 * env([(0, -80), (48.7, -80), (48.9, -22), (DUR, -22)]), O + 'bar2_bed.wav')
print('ok')
