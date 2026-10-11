# fetch.py <dest_dir> < "name url" lines ; voices (eNN_xx) are trimmed to wav, music saved as mp3
import sys, subprocess, numpy as np, os
dest = sys.argv[1]; SR = 44100
for line in sys.stdin:
    if not line.strip(): continue
    name, url = line.split()
    name = name.replace('.mp3', '')
    tmp = f'/tmp/claude-0/-home-claude/85eb84d6-b868-5fed-a8dc-04e717f31b3a/scratchpad/{name}.mp3'
    subprocess.run(['curl', '-sS', '-o', tmp, url], check=True)
    if name.startswith('laesquina_'):
        os.replace(tmp, f'/home/claude/kit/music/{name[10:]}.mp3'); print('music', name); continue
    a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', tmp, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
    e = np.abs(a) > 0.02; i = np.argmax(e); j = len(a) - np.argmax(e[::-1]); a = a[max(0, i - 1300):j + 3500]
    lid = name.split('_', 1)[1]
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', f'{dest}/{lid}.wav'], input=a.tobytes())
    print(lid, round(len(a) / SR, 2))
