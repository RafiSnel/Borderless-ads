#!/usr/bin/env bash
# two final cuts of the short film: with the original montage music, and without (for a TikTok sound)
set -e; cd /home/claude/kit/v/sf; mkdir -p ../../out
ffmpeg -v error -y -i mix.wav -i mont_bed.wav -i bar2_bed.wav -i vo.wav -filter_complex \
 "[1]aformat=channel_layouts=stereo[m];[3]aformat=channel_layouts=stereo,asplit[sc][x];[m][sc]sidechaincompress=threshold=0.05:ratio=5:attack=15:release=300[md];[x]anullsink;[0]aformat=channel_layouts=stereo[a];[2]aformat=channel_layouts=stereo[b];[a][md][b]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5[o]" -map "[o]" -ar 44100 withmusic.wav
ffmpeg -v error -y -i mix.wav -i bar2_bed.wav -filter_complex "[0]aformat=channel_layouts=stereo[a];[1]aformat=channel_layouts=stereo[b];[a][b]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5[o]" -map "[o]" -ar 44100 nomusic.wav
for v in withmusic nomusic; do n=$([ $v = withmusic ] && echo sf_the-comeback || echo sf_the-comeback_ZONDER_montagemuziek)
 ffmpeg -v error -y -i silent.mp4 -i $v.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart ../../out/$n.mp4; done
ls -la ../../out/sf_*
