"""mix5.py <v> <spec.json> <out.mp4>
spec: {"music": path, "db": -13, "segs": [[video_t0, src_t0, dur], ...] (crossfaded), "gain": [[t0, t1, gain_db], ...]}
Music under VO with sidechain ducking, plus the SFX/VO mix.wav from sfx.py. Writes final mp4 with music."""
import json, subprocess, sys, wave
import numpy as np
SR = 44100
V = 'v/' + sys.argv[1]; spec = json.load(open(sys.argv[2])); out = sys.argv[3]
def load(path, mono=True):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(float) / 32768
mixw = load(V + '/mix.wav'); vo = load(V + '/vo.wav'); N = len(mixw); vo = np.pad(vo, (0, max(0, N - len(vo))))[:N]
src = load(spec['music'])
mus = np.zeros(N); XF = int(SR * 0.12)
for k, (vt, st, d) in enumerate(spec['segs']):
    i0 = int(vt * SR); n = min(int(d * SR) + XF, N - i0); s0 = int(st * SR)
    if n <= 0: continue
    seg = src[s0:s0 + n]; seg = np.pad(seg, (0, n - len(seg)))
    env = np.ones(n)
    if k > 0: env[:XF] = np.linspace(0, 1, XF)
    if k < len(spec['segs']) - 1: env[-XF:] = np.minimum(env[-XF:], np.linspace(1, 0, XF))
    mus[i0:i0 + n] += seg * env
g = np.ones(N) * 10 ** (spec.get('db', -13) / 20)
for t0, t1, gd in spec.get('gain', []):
    a, b = int(t0 * SR), int(t1 * SR); ramp = int(0.08 * SR); m = np.zeros(N); m[a:b] = 1
    m = np.convolve(m, np.ones(ramp) / ramp, mode='same'); g *= 10 ** (gd * m / 20)
# fade out at the end
fo = int(1.4 * SR); g[-fo:] *= np.linspace(1, 0, fo)
# sidechain: duck under the voice
hop = 441; e = np.array([np.sqrt(np.mean(vo[i:i + hop] ** 2)) for i in range(0, N, hop)])
duck = np.clip(1 - (e / 0.05), 0.42, 1.0)
sm = np.zeros_like(duck); v = 1
for i, x in enumerate(duck): v = x if x < v else v + (x - v) * 0.06; sm[i] = v
duck = np.repeat(sm, hop)[:N]
y = mixw + mus * g * duck
y = y / max(1e-9, np.max(np.abs(y))) * 0.95
tmp = f'/tmp/claude-0/m5_{sys.argv[1]}.wav'
with wave.open(tmp, 'w') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes())
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', V + '/silent.mp4', '-i', tmp, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-af', 'loudnorm=I=-14:TP=-1.5', '-shortest', '-movflags', '+faststart', out], check=True)
print('ok', out)
