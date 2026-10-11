#!/usr/bin/env bash
# mixmusic.sh <v> <music.mp3> <offset_s> <outname> [music_db]
set -e
cd /home/claude/kit; V=v/$1; M=$2; OFF=$3; OUT=$4; DB=${5:--13}
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $V/final.mp4)
FO=$(python3 -c "print(max(0,$D-1.4))")
ffmpeg -v error -y -ss $OFF -t $D -i "$M" -i $V/vo.wav -i $V/mix.wav -filter_complex \
"[0:a]aresample=44100,pan=mono|c0=0.5*c0+0.5*c1,volume=${DB}dB,afade=t=in:d=0.04,afade=t=out:st=$FO:d=1.4[m];\
[1:a]aresample=44100,apad[k];[m][k]sidechaincompress=threshold=0.03:ratio=6:attack=15:release=280:makeup=1[md];\
[2:a]aresample=44100,apad[sx];[sx][md]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5[a]" \
-map "[a]" -t $D /tmp/claude-0/mm_$1.wav
ffmpeg -v error -y -i $V/final.mp4 -i /tmp/claude-0/mm_$1.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
echo ok $OUT
