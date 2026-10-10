"""Procedural SFX + soft beat, mixed under the voiceover. Cues come from the same timeline as the picture."""
import numpy as np, wave, json
SR = 44100
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(7)

def env(n, a=0.005, r=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / r)

def whoosh(d=0.28, up=True):
    n = int(SR * d); x = rng.standard_normal(n)
    # sweep a simple one-pole low-pass cutoff for a rising/falling air sound
    cut = np.linspace(0.02, 0.35, n) if up else np.linspace(0.35, 0.02, n)
    y = np.zeros(n); s = 0
    for i in range(n): s += cut[i] * (x[i] - s); y[i] = s
    shape = np.sin(np.linspace(0, np.pi, n)) ** 1.5
    return y * shape * 0.9

def pop(f0=900, d=0.09):
    n = int(SR * d); t = np.arange(n) / SR
    f = f0 * np.exp(-t * 30); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(n, 0.002, 0.03) * 0.6

def impact(d=0.5):
    n = int(SR * d); t = np.arange(n) / SR
    f = 120 * np.exp(-t * 9) + 40; ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * env(n, 0.002, 0.16)
    noise = rng.standard_normal(n) * env(n, 0.001, 0.025) * 0.5
    return (body + noise) * 0.9

def stampthud():
    a = impact(0.35) * 0.8; n = int(SR * 0.05)
    a[:n] += rng.standard_normal(n) * env(n, 0.001, 0.01) * 0.6
    return a

def tick():
    n = int(SR * 0.025); return rng.standard_normal(n) * env(n, 0.0005, 0.004) * 0.35

def chime(f=880):
    n = int(SR * 0.9); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 1.5 * t)) * env(n, 0.003, 0.35) * 0.25

sfx = np.zeros(N)
def put(sig, at, g=1.0):
    i = int(at * SR); j = min(N, i + len(sig)); sfx[i:j] += sig[:j - i] * g

T = json.load(open('/home/claude/ad2/cues.json'))
for at in T['whoosh']: put(whoosh(), max(0, at - 0.14), 0.55)
for at in T['pop']: put(pop(rng.uniform(700, 1100)), at, 0.5)
for at in T['impact']: put(impact(), at, 0.9)
for at in T['stamp']: put(stampthud(), at, 0.85)
for a, b, n in T['ticks']:
    for k in range(n): put(tick(), a + (b - a) * k / n, 0.6)
for at in T['chime']: put(chime(), at, 1.0)

# soft beat: 120 bpm kick + offbeat hat, low in the mix, stops for the end card
beat = np.zeros(N); bpm = 120; spb = 60 / bpm
def kick():
    n = int(SR * 0.3); t = np.arange(n) / SR
    f = 110 * np.exp(-t * 25) + 45; return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.12)
def hat():
    n = int(SR * 0.05); x = rng.standard_normal(n); x = np.diff(np.concatenate([[0], x])); return x * env(n, 0.0005, 0.012) * 0.25
k_, h_ = kick(), hat()
t = 0.15
while t < T['beat_end']:
    i = int(t * SR); beat[i:i + len(k_)] += k_[:N - i] * 0.55
    j = int((t + spb / 2) * SR); beat[j:j + len(h_)] += h_[:max(0, N - j)]
    t += spb
# fade the beat out into the end card
fade_i = int(T['beat_end'] * SR); beat[fade_i:] = 0

def read(path):
    with wave.open(path) as w: return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
vo = read('/home/claude/ad2/vo.wav'); vo = np.pad(vo, (0, max(0, N - len(vo))))[:N]
# duck the beat under the voice
venv = np.convolve(np.abs(vo), np.ones(2205) / 2205, mode='same')
duck = 1 - 0.55 * np.clip(venv / 0.05, 0, 1)
mix = vo * 1.0 + sfx * 0.32 + beat * 0.16 * duck
mix = mix / max(1e-9, np.max(np.abs(mix))) * 0.95
with wave.open('/home/claude/ad2/mix.wav', 'w') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('ok', len(mix) / SR)
