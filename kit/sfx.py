"""SFX library + mixer. Usage: python3 sfx.py <video_dir>
Reads <dir>/cues.json: {"cues": [[type, time, gain], ...], "dur": seconds}
Mixes with <dir>/vo.wav into <dir>/mix.wav (voice on top, no music)."""
import numpy as np, wave, json, sys
SR = 44100
rng = np.random.default_rng(11)

def env(n, a=0.005, r=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / r)

def lp(x, cut):  # one-pole low-pass, cut may be array
    y = np.zeros_like(x); s = 0.0
    cut = np.broadcast_to(cut, x.shape)
    for i in range(len(x)): s += cut[i] * (x[i] - s); y[i] = s
    return y

def sine(f, d, a=0.002, r=0.2):
    n = int(SR * d); t = np.arange(n) / SR
    f = np.broadcast_to(f, (n,)) if np.ndim(f) else np.full(n, f)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, a, r)

def square(f, d, r=0.12):
    n = int(SR * d); t = np.arange(n) / SR
    return np.sign(np.sin(2 * np.pi * f * t)) * env(n, 0.002, r) * 0.35

def noise(d, a=0.002, r=0.05):
    n = int(SR * d); return rng.standard_normal(n) * env(n, a, r)

def cat(*xs): return np.concatenate(xs)
def silence(d): return np.zeros(int(SR * d))
def at(base, sig, t):
    i = int(t * SR); out = base.copy() if base is not None else None
    return out

def S_whoosh(up=True):
    n = int(SR * 0.3); x = rng.standard_normal(n)
    cut = np.linspace(0.02, 0.35, n) if up else np.linspace(0.35, 0.02, n)
    return lp(x, cut) * np.sin(np.linspace(0, np.pi, n)) ** 1.5 * 0.9
def S_pop(): f0 = rng.uniform(700, 1100); n = int(SR * 0.09); t = np.arange(n) / SR; return sine(f0 * np.exp(-t * 30), 0.09, 0.002, 0.03) * 0.6
def S_plop():  # chat bubble: quick upward chirp
    n = int(SR * 0.08); t = np.arange(n) / SR; return sine(500 + 2200 * t / 0.08, 0.08, 0.001, 0.03) * 0.55
def S_impact():
    n = int(SR * 0.5); t = np.arange(n) / SR
    return (sine(120 * np.exp(-t * 9) + 40, 0.5, 0.002, 0.16) + noise(0.5, 0.001, 0.025) * 0.5) * 0.9
def S_boom():
    n = int(SR * 1.2); t = np.arange(n) / SR
    return (sine(70 * np.exp(-t * 3) + 30, 1.2, 0.003, 0.45) * 1.1 + lp(rng.standard_normal(n), 0.05) * env(n, 0.002, 0.3) * 0.8)
def S_hit():  # bass hit for typo
    n = int(SR * 0.4); t = np.arange(n) / SR
    return sine(55 + 60 * np.exp(-t * 40), 0.4, 0.001, 0.18) * 1.1 + noise(0.4, 0.0005, 0.006) * 0.6
def S_stamp():
    a = S_impact() * 0.8; n = int(SR * 0.05); a[:n] += rng.standard_normal(n) * env(n, 0.001, 0.01) * 0.6; return a
def S_tick(): return noise(0.025, 0.0005, 0.004) * 0.35
def S_ding(f=880): n = 0.9; return (sine(f, n, 0.003, 0.35) + 0.5 * sine(f * 1.5, n, 0.003, 0.3)) * 0.3
def S_dingdong(): return cat(S_ding(784)[:int(SR * 0.45)], S_ding(622)) * 0.9
def S_flap(d=0.6, rate=30):
    out = silence(d)
    for k in range(int(d * rate)):
        i = int(k / rate * SR); c = noise(0.012, 0.0003, 0.003) * rng.uniform(0.4, 0.8); out[i:i + len(c)] += c[:len(out) - i]
    return out
def S_flaplong(): return S_flap(1.6, 45)
def S_buzz():
    n = int(SR * 0.45); t = np.arange(n) / SR
    return np.sin(2 * np.pi * 150 * t) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 9 * t))) * env(n, 0.005, 0.5) * 0.35
def S_type(): return noise(0.02, 0.0003, 0.004) * 0.45 + sine(3000, 0.02, 0.0003, 0.003)[:int(SR*0.02)] * 0.1
def S_back(): return cat(S_type(), silence(0.03), S_type() * 0.8)
def S_heart():
    th = lambda: sine(60, 0.18, 0.003, 0.06) * 1.2
    return cat(th(), silence(0.12), th() * 0.8)
def S_riser(d=1.0):
    n = int(SR * d); x = rng.standard_normal(n)
    return lp(x, np.linspace(0.01, 0.45, n)) * np.linspace(0, 1, n) ** 2 * 0.9
def S_swell(): return S_riser(1.4) * 0.8
def S_gong():
    n = 2.0; return (sine(110, n, 0.004, 0.9) + 0.6 * sine(167, n, 0.004, 0.7) + 0.4 * sine(246, n, 0.004, 0.5)) * 0.4
def S_neon():
    n = int(SR * 0.35); t = np.arange(n) / SR
    return (np.sign(np.sin(2 * np.pi * 120 * t)) * 0.2 + rng.standard_normal(n) * 0.05) * env(n, 0.002, 0.15)
def S_coin(): return cat(square(988, 0.07, 0.05), square(1319, 0.25, 0.1))
def S_jingle(): return cat(*[square(f, 0.09, 0.06) for f in (523, 659, 784)], square(1047, 0.3, 0.12))
def S_correct(): return cat(square(784, 0.08, 0.05), square(1175, 0.25, 0.1))
def S_fail():
    n = int(SR * 0.5); t = np.arange(n) / SR
    return (np.sign(np.sin(2 * np.pi * 110 * t)) + 0.5 * np.sign(np.sin(2 * np.pi * 116 * t))) * env(n, 0.003, 0.35) * 0.3
def S_wahwah(): return cat(square(392, 0.25, 0.2), square(370, 0.25, 0.2), square(349, 0.25, 0.2), square(330, 0.7, 0.4)) * 0.8
def S_fanfare(): return cat(*[square(f, 0.11, 0.08) for f in (523, 659, 784, 1047)], square(1047, 0.1, 0.06), square(1319, 0.5, 0.25))
def S_kaching(): return cat(noise(0.04, 0.001, 0.02) * 0.5, S_ding(1568) * 0.8)
def S_scratch(d=0.35):
    n = int(SR * d); x = rng.standard_normal(n); t = np.arange(n) / SR
    return lp(x, 0.3) * (0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 7 * t))) * env(n, 0.01, d) * 0.45
def S_page():
    n = int(SR * 0.35); x = rng.standard_normal(n); return lp(x, np.linspace(0.4, 0.05, n)) * np.sin(np.linspace(0, np.pi, n)) * 0.5
def S_castanet(): c = lambda: noise(0.03, 0.0003, 0.006) * 0.8 + sine(2400, 0.03, 0.0003, 0.008) * 0.3; return cat(c(), silence(0.06), c(), silence(0.05), c())
def S_boing():
    n = int(SR * 0.5); t = np.arange(n) / SR
    return sine(300 + 120 * np.sin(2 * np.pi * 12 * t) * np.exp(-t * 4), 0.5, 0.002, 0.25) * 0.5
def S_glitch():
    n = int(SR * 0.3); x = rng.standard_normal(n); x = np.round(x * 3) / 3
    gate = (np.floor(np.arange(n) / (SR * 0.02)) % 2).astype(float)
    return x * gate * env(n, 0.001, 0.2) * 0.35
def S_click(): return noise(0.015, 0.0002, 0.002) * 0.8 + sine(1800, 0.015, 0.0002, 0.004) * 0.3
def S_shutter(): return cat(S_click(), silence(0.05), S_click() * 0.7)
def S_micdrop(): return cat(S_impact() * 1.1, noise(0.3, 0.01, 0.2) * 0.2)
def S_gasp():
    n = int(SR * 0.4); x = rng.standard_normal(n); return lp(x, np.linspace(0.3, 0.1, n)) * np.sin(np.linspace(0, np.pi, n)) * 0.25
def S_laugh():  # stylised "ha-ha-ha": formant-ish bursts
    out = []
    for k in range(5):
        n = int(SR * 0.09); t = np.arange(n) / SR
        b = (np.sin(2 * np.pi * (240 - k * 8) * t) * 0.6 + np.sin(2 * np.pi * 720 * t) * 0.3 + rng.standard_normal(n) * 0.25) * np.sin(np.linspace(0, np.pi, n))
        out += [b * 0.5, silence(0.05)]
    return cat(*out)
def S_vibrate(): return S_buzz()
def S_plane():
    n = int(SR * 1.6); x = rng.standard_normal(n); t = np.arange(n) / SR
    return lp(x, 0.04) * np.sin(np.linspace(0, np.pi, n)) * 1.4 + np.sin(2 * np.pi * (180 + 40 * t) * t) * 0.05 * np.sin(np.linspace(0, np.pi, n))
def S_hum(): n = int(SR * 1.0); t = np.arange(n) / SR; return np.sin(2 * np.pi * 50 * t) * 0.25 * np.sin(np.linspace(0, np.pi, n))
def S_guitar():  # short plucked string (Karplus-Strong)
    n = int(SR * 0.6); p = int(SR / 196); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n): out[i] = buf[i % p]; buf[i % p] = 0.5 * (buf[i % p] + buf[(i + 1) % p]) * 0.996
    return out * 0.5
def S_bell(): return (sine(1320, 1.0, 0.002, 0.4) + 0.4 * sine(2640, 1.0, 0.002, 0.2) + 0.25 * sine(3960, 1.0, 0.002, 0.1)) * 0.3
def S_ratchet(): return S_castanet()

LIB = {k[2:]: v for k, v in globals().items() if k.startswith('S_')}

def main(d):
    c = json.load(open(f'{d}/cues.json'))
    dur = c['dur']; N = int(SR * dur)
    sfx = np.zeros(N)
    for typ, t0, g in c['cues']:
        s = LIB[typ]()
        if typ == 'whoosh': t0 -= 0.14
        if typ == 'riser': t0 -= 1.0
        if typ == 'swell': t0 -= 1.4
        i = int(max(0, t0) * SR); j = min(N, i + len(s))
        if i < N: sfx[i:j] += s[:j - i] * g
    with wave.open(f'{d}/vo.wav') as w: vo = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
    vo = np.pad(vo, (0, max(0, N - len(vo))))[:N]
    extra = c.get('extra', [])  # extra voice clips: [path, time, gain]
    for path, t0, g in extra:
        with wave.open(path) as w: x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
        i = int(t0 * SR); j = min(N, i + len(x)); vo[i:j] += x[:j - i] * g
    mix = vo + sfx * c.get('sfx_gain', 0.32)
    mix = mix / max(1e-9, np.max(np.abs(mix))) * 0.95
    with wave.open(f'{d}/mix.wav', 'w') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
    print('mix ok', dur)

if __name__ == '__main__': main(sys.argv[1])
