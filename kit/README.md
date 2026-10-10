# Video-kit (code-gerenderde motion graphics)

Elke video is een `v/<nr>/scene.js`: een canvas van 1080×1920 waarin elk frame een pure functie van de tijd is.
De stem (Kirk, eleven_v4 via Runway) komt per regel binnen; `build_vo2.py` plakt de regels aan elkaar en schrijft
`timeline.json` (start, eind en zinsdelen per regel). De scène leest die tijden, zodat beeld en geluid altijd gelijk lopen.

```
npm install                      # fonts (@fontsource), playwright-core, world-atlas, topojson-client
python3 set_vo_lines.py 07 '{"9":0.35}'   # urls/v07.txt -> v/07/vo.json (gaten in seconden vóór regel n)
python3 build_vo2.py v/07                 # -> vo.wav + timeline.json
bash make.sh 07 stills "1,5,9"            # losse frames om te controleren
bash make.sh 07                           # render + geluidseffecten (sfx.py) + mux -> v/07/final.mp4
```

- `kit.js` — easing, tekst, slam/stamp/pill, telefoon met app-screenshot, camera-schok, wereldkaart.
- `chat.js` — chat-engine (bubbels, typen, reacties, voicememo).  `flap.js` — vertrekbord.  `arcade.js` — gameshow (11a/11b).
- `sfx.py` — 43 zelfgemaakte geluidseffecten, gestuurd door `window.CUES` uit de scène. Geen muziek: die zet Rafi er zelf onder.
- `urls/` staat niet in git: de Runway-downloadlinks zijn ondertekend en verlopen.
