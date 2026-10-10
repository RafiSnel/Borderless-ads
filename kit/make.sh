#!/usr/bin/env bash
# make.sh <v> [stills "t1,t2"] — full pipeline for one video folder in v/<v>
set -e
cd /home/claude/kit
V=v/$1
curl -s -o /dev/null http://127.0.0.1:8800/page.html || (python3 -m http.server 8800 --bind 127.0.0.1 >/dev/null 2>&1 &) ; sleep 0.5
if [ "$2" = "stills" ]; then
  rm -rf $V/stills; node render.mjs $1 stills "$3"
  files=$(ls $V/stills/*.jpg | sort); n=$(echo $files | wc -w)
  ffmpeg -v error -y $(for f in $files; do echo -n "-i $f "; done) -filter_complex "$(i=0; for f in $files; do echo -n "[$i]scale=216:-1[v$i];"; i=$((i+1)); done; i=0; for f in $files; do echo -n "[v$i]"; i=$((i+1)); done; echo -n "hstack=inputs=$n")" $V/stills.jpg
  exit 0
fi
[ "$2" = "audio" ] || node render.mjs $1 video
python3 sfx.py $V
ffmpeg -v error -y -i $V/silent.mp4 -i $V/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -af "loudnorm=I=-14:TP=-1.5" -shortest -movflags +faststart $V/final.mp4
# QC: blank-frame scan + contact sheets every 0.5 s
ffmpeg -v error -i $V/final.mp4 -vf "scale=54:96,format=gray" -f rawvideo - | python3 -c "
import sys,numpy as np
d=np.frombuffer(sys.stdin.buffer.read(),dtype=np.uint8).reshape(-1,96,54); s=d.reshape(len(d),-1).std(1)
low=[i for i,v in enumerate(s) if v<6]; print('frames',len(d),'blank-ish',low[:30])"
rm -rf $V/chk; mkdir -p $V/chk
ffmpeg -v error -i $V/final.mp4 -vf "fps=2,scale=180:-1" $V/chk/%03d.jpg
ffmpeg -v error -y -i $V/chk/%03d.jpg -frames:v 1 -vf tile=15x2 $V/chk_a.jpg
[ -f $V/chk/031.jpg ] && ffmpeg -v error -y -start_number 31 -i $V/chk/%03d.jpg -frames:v 1 -vf tile=15x2 $V/chk_b.jpg || true
ffprobe -v error -show_entries format=duration -of csv=p=0 $V/final.mp4
