# v5 — vijf nieuwe TikToks (12 oktober 2026)

Stijl van video 1: crème + terracotta, Inter 900 op de stem, één idee per beat, het paspoort als mascotte.
Elke video bestaat in twee versies: `met_muziek` (eigen gegenereerde, rechtenvrije track, geduckt onder de stem) en
`zonder_muziek` (alleen stem + geluidseffecten, voor een eigen TikTok-geluid).

| | Video | Wat het laat zien | Lengte |
|---|---|---|---|
| A | This lesson didn't exist yesterday | lessen worden pas geschreven als je zover bent, rond jouw leven | ±30 s |
| B | What €9,99 actually gets you | bonnetje dat regel voor regel uitprint: alles wat erin zit, eerlijk geprijsd | ±31 s |
| C | Your language app has never been to your job | steriele flashcards tegenover wat je baas, verhuurder en schoonmoeder echt zeggen | ±35 s |
| D | Any% speedrun: dinner with the Italian family | speedrun-HUD, splits, eindbaas Nonna | ±38 s |
| E | First day at a job abroad? Four sentences | bruikbaar op zichzelf (om op te slaan), Borderless schrijft dag twee | ±30 s |

Alle claims kloppen met het verdienmodel: €9,99 per cursus, 74 talen, kennismaking + niveautoets, 50 lessen
die één voor één geschreven worden, eerste 14 dagen inbegrepen, daarna €5,99 per maand voor al je cursussen,
gemaakte lessen blijven altijd van jou.

## Captions (voorstel)

- **A** — Lesson 7 was written last night. For one person. Lesson 8 doesn't exist yet.
- **B** — €9,99. Here's the receipt.
- **C** — The apple is red. Your boss needs you on Saturday.
- **D** — Any% · 21 days · Nonna approved. New PB.
- **E** — Four sentences for your first day at a job abroad. Day two is on Borderless.

## Bestanden

- `scenes/5a..5e.js` — de scènes (kit-engine, elke frame is een functie van t)
- `kit/v5.js` — gedeelde stijl (achtergrond, koppen, lessenkaart, personages, eindkaart, stempel)
- `kit/mix5.py` + `music/*.json` — muziek onder de stem: segmenten, crossfades, ducking, dempen tijdens de flashcards in C
- `scripts.md` — de vijf scripts
