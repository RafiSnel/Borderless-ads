# Borderless — catalogus van editingstijlen

Elke video kiest één stijl uit deze lijst. Niet elke video hoeft dezelfde stijl te hebben: de stijl volgt het onderwerp.
Nieuwe stijlen komen hier bij zodra Rafi ze goedkeurt.

---

## 1 · Kinetic Type Reel  *(vastgelegd 13 oktober 2026)*

**Hoe heet dit eigenlijk?** Er is niet één officiële naam; het is een combinatie van vier bekende termen uit motion design:

| Term | Wat het is | Waar je het ziet |
|---|---|---|
| **Kinetic typography** | Tekst is het beeld. Letters bewegen los van elkaar en doen wat het woord zegt (STRETCH rekt, SPIN draait). | de grote woorden op de beat |
| **Seamless transitions / morph transitions** (ook *match cut*) | Geen knip naar een nieuwe "slide": het ene ding *wordt* het volgende — tegels flippen naar het volgende beeld, een bal wordt de O van een woord, een kaart breekt in stukjes en bouwt de volgende op. | elke overgang |
| **Swiss / brutalist motion design** | Strak raster, dikke grotesk-letter (Inter 900), vlakke kleurvlakken, kleine monospace-labels, tijdcode en frameteller in de hoeken. | de HUD-laag, de kleurkaarten |
| **3D accents (chrome / gloss)** | Echte 3D-objecten met spiegelende materialen, kort en spaarzaam. | de chromen knoop, de gouden munt |

Samen heet dit in de motion-designwereld meestal een **"motion design showreel"-stijl** of **"kinetic type reel"**. Wij noemen het **Kinetic Type Reel**.

### Wat het is (de regels)
1. **Eén materiaal dat steeds iets anders wordt.** Tegels → raster → 3D; een bal → een letter → een munt. Niet: scène A, knip, scène B.
2. **Knippen alleen in salvo's.** Een paar snelle knippen op de beat of op een opsomming (talen, redenen, werkwoorden), daarna weer vloeiend.
3. **Elk woord beweegt.** Per letter: vallen, draaien, uitrekken, inklikken met veer-fysica (overshoot en uitdempen, nooit lineair).
4. **Kleurkaarten op zwart.** Basis zwart `#0b0a0a`; full-frame kaarten in signaaloranje `#ff4a1c`, kobalt `#2b3bff` of crème `#f2ede4`; tekst wit of zwart. Op de achtergrond een bewegende muur van hetzelfde woord, heel zwak.
5. **De HUD-laag** maakt het "gemaakt": titel linksboven, tijdcode + frameteller rechtsboven, sectielabel linksonder (`03 · 50 LESSONS`), voortgangslijn. Monospace, 55% wit.
6. **3D alleen als moment.** Eén chromen of glanzend object per video, en de munt op het eind (draait om de verticale as, logo altijd rechtop).
7. **Eind:** zwart, de 3D-munt valt en draait uit, `Borderless.` met oranje punt, de slogan, klein `74 LANGUAGES · €9,99 PER COURSE`.
8. **Snelle beweging = bewegingsonscherpte** (3 subframes per frame).

### Wanneer wel, wanneer niet
- **Wel:** lijstjes, aftellingen, "zo werkt het", taalfeitjes, alles met een ritme of opsomming; reels op muziek.
- **Niet:** verhalen met personages en emotie (daar past stijl 3), of als de video juist rustig moet zijn.

### Techniek (voor wie het bouwt)
- `kit/kin.js` — de bouwstenen: `kin()` (woord met letter-animatie), `kwall()` (woordmuur), `kcard()`, overgangen `kTiles()`, `kStripes()`, `kIris()`, `kZoom()`, `khud()`, `kend()` (eind met 3D-munt).
- `kit/r3d.js` — echte 3D (three.js, chroom/glans/glas, bloom): `R3.knot()`, `R3.blob()`, `R3.coin()`. Laden met `MOD=r3d.js bash make.sh <video>`.
- Voorbeelden: `ads/v5/…` test-reel (`v/r1`), reel 02 op "Midnight Club" (`v/r2`), en de remakes `06k`, `07k`, `09k`, `13k`, `14k`.

### Op de beat van een bestaand liedje (zoals reel 02)
1. Rafi stuurt een schermopname van de TikTok-editor waarin het geluid speelt. Daaruit: waar het liedje begint, het tempo, en de fase (wanneer slag 0 valt).
2. Uit de audio meten, niet gokken: de zware 808-klappen (lage band), de claps (midden), en de stiltes. Elke knip, elke woordslag en elke camerapunch staat op zo'n gemeten moment; in de stiltes bevriest het beeld (`HOLD`).
3. Beeld een fractie vóór het geluid (±20 ms): dat voelt strak, andersom voelt traag.
4. Lever **zonder geluid** (Rafi legt het TikTok-geluid eronder, vanaf het begin van het fragment) plus een **preview met het liedje** om de sync te controleren.

---

## 2 · Slam-explainer (video 1, "Lying")  *(vastgesteld 10 oktober 2026)*

Licht crème + terracotta (het palet van de app), Inter 900 sleutelwoorden die op de stem in beeld slaan, elke ±0,7 s iets nieuws,
de paspoort-mascotte, echte app-schermen in een telefoon, schudden en zoom-punch. Alle details: `STYLE.md`.

- **Wel:** reclames die iets beweren en uitleggen; als het product (de app) zelf in beeld moet.

---

## 3 · 2D-verhaal

Platte illustratie met personages (baas, verhuurder, Nonna) en de mascotte in een kort verhaal met een plot. Voorbeelden: 16 "the bathroom lesson", C "never been to your job", D "speedrun".

- **Wel:** humor, herkenbare situaties, een begin-midden-eind.

---

## 4 · Filmtrailer

Donker, filmisch, grote titelkaarten, langzame camerabewegingen, een stem als in een bioscooptrailer. Voorbeeld: 17 "the comeback trailer" (Rafi vond hem goed).
