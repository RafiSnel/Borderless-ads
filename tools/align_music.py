"""Measure the music's tempo and beat phase, then offset it so its beats land on the video grid
(beats at 0.15 + n*0.5 s, the grid the cuts were built on). Picks the musical segment whose
biggest energy jump lands closest to the end-card hit. Writes music_aligned.wav (30 s)."""
import numpy as np, subprocess, sys, json
SR = 22050
src = sys.argv[1]
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
x = np.frombuffer(raw, dtype=np.int16).astype(float) / 32768
dur = len(x) / SR
# onset envelope: positive change of low-band energy in 10 ms hops
hop = int(SR * 0.01)
fr = len(x) // hop
e = np.array([np.sum(x[i * hop:(i + 1) * hop] ** 2) for i in range(fr)])
on = np.maximum(0, np.diff(np.log(e + 1e-9), prepend=0))
# tempo: autocorrelation between 100 and 140 BPM
ac = np.correlate(on - on.mean(), on - on.mean(), 'full')[fr - 1:]
lags = np.arange(int(60 / 140 / 0.01), int(60 / 100 / 0.01) + 1)
lag = lags[np.argmax(ac[lags])]
# refine with a parabola around the peak
a, b, c = ac[lag - 1], ac[lag], ac[lag + 1]
lagf = lag + 0.5 * (a - c) / (a - 2 * b + c)
period = lagf * 0.01; bpm = 60 / period
# phase: offset that maximises onset energy on the beat grid
phases = np.arange(0, period, 0.005)
score = [on[(np.arange(ph, dur, period) / 0.01).astype(int).clip(0, fr - 1)].sum() for ph in phases]
phase = phases[int(np.argmax(score))]
# loudness per second to find the drop (biggest rise in 2 s RMS)
rms = np.array([np.sqrt(np.mean(x[int(i * SR):int((i + 1) * SR)] ** 2)) for i in range(int(dur))])
rise = np.convolve(rms, np.ones(2) / 2, 'same')
drop = int(np.argmax(np.diff(rise))) + 1 if len(rise) > 2 else 0
print(json.dumps({'dur': round(dur, 2), 'bpm': round(bpm, 2), 'phase': round(phase, 3), 'drop_s': drop, 'rms_per_s': [round(v, 3) for v in rms]}))
# choose a start offset in the music so that: beats line up with 0.15 + n*0.5 (after tempo-stretch to 120)
stretch = bpm / 120.0                      # atempo factor that turns the track into exactly 120 BPM
beat_v = 0.5
# music time of first beat after stretch: phase/stretch. We want (m_off + 0.15) to sit on a beat:
# choose m_off = phase/stretch + k*beat_v - 0.15 so the end-card hit (27.75) is near the drop if possible.
END_HIT = 27.75
cands = []
for k in range(-4, 200):
    m_off = phase / stretch + k * beat_v - 0.15
    if m_off < 0: continue
    if m_off + 30 > dur / stretch + 0.01: break
    drop_v = drop / stretch - m_off       # where the drop lands in video time
    cands.append((abs(drop_v - END_HIT) if 0 < drop_v < 30 else 99, m_off, drop_v))
if not cands:  # track shorter than 30 s after stretch: start at the first beat and loop is not attempted
    m_off = max(0, phase / stretch - 0.15); drop_v = None
else:
    _, m_off, drop_v = min(cands)
print('stretch', round(stretch, 4), 'music offset', round(m_off, 3), 'drop lands at video', drop_v)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-af',
                f'atempo={stretch:.6f},atrim=start={m_off:.4f},asetpts=PTS-STARTPTS,apad,atrim=0:30,'
                'afade=t=in:st=0:d=0.05,afade=t=out:st=28.8:d=1.2', '-ac', '2', '-ar', '44100',
                '/home/claude/ad2/music_aligned.wav'], check=True)
