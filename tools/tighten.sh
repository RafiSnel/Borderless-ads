#!/usr/bin/env bash
# Tighten a voiceover for short-form: cut pauses longer than ~0.12 s, light speed-up, loudness to -14 LUFS.
# Usage: tighten.sh in.mp3 out.mp3 [tempo]
set -euo pipefail
in="$1"; out="$2"; tempo="${3:-1.08}"
ffmpeg -v error -y -i "$in" -af "silenceremove=stop_periods=-1:stop_duration=0.12:stop_threshold=-40dB,atempo=${tempo},loudnorm=I=-14:TP=-1.5" -ar 44100 -b:a 192k "$out"
for f in "$in" "$out"; do printf '%s: %.1f s\n' "$f" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")"; done
