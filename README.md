# borderless-ads

Marketingvideo's voor Borderless — los van de app (`proyecto-madrid`). Stijlregels: zie `STYLE.md`.

## Mappen
- `ads/NN-naam/` — één map per video: `script.md`, `scene.html` (alle animaties, elk frame een functie van de tijd),
  `cues.json` (geluidseffecten), `timeline.json` (gemeten tijdstempels van de stem), `final_zonder_muziek.mp4`.
- `assets/app/` — scherpe opnames uit de statische rondleiding van de app (telefoonformaat, 3×).
- `assets/brand/` — logo.
- `tools/` — de pijplijn.

## Een nieuwe video maken
1. **Script** in `ads/NN-naam/script.md`: ±13 korte zinnen, ±30 s, tabel met per zin het beeld.
2. **Stem**: per zin `generate_speech` (Runway, Kirk, v4, speed 1.2, seed 7) → URLs in `vo_urls.txt` →
   `python3 tools/build_vo.py` → `vo.wav` + `timeline.json`.
3. **App-beelden** (alleen als er nieuwe nodig zijn): app lokaal starten (`node server.mjs` in proyecto-madrid)
   en `node tools/capture.mjs` → `assets/app/`. Verbergt alleen de rondleidingsbalk en het cloud-label via CSS;
   de app-code wordt niet aangeraakt. De rondleiding is statisch: nul AI-kosten.
4. **Scènes** in `scene.html`: de tijden in `T` komen uit `timeline.json`. Bouwstenen: `slam`, `stamp`, `pill`,
   `bubble`, `phone` (met `zoom`/`focus`/`scrollY`), `mascot`, `lessonCard`, `confetti`, `flame`, `cup`.
5. **Stills checken**: map serveren (`python3 -m http.server 8765`) en `node tools/render.mjs stills 1.2,3.4,…`.
6. **Geluid**: tijden in `cues.json`, dan `python3 tools/sound.py` (effecten, geen muziek).
7. **Render**: `node tools/render.mjs video silent.mp4 30`, daarna muxen met ffmpeg (`loudnorm=I=-14:TP=-1.5`).
8. Frames om de 0,5 s nalopen voordat de video naar Rafi gaat.

## Vereisten
Node 22 + `playwright-core`, Chromium, ffmpeg, Python 3 + numpy, het lettertype Inter (en Noto Sans CJK voor
groeten in andere schriften). Paden in de scripts wijzen nu naar `/home/claude/...`; pas ze aan op de plek waar je draait.
