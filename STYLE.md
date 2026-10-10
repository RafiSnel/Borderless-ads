# Borderless — videostijl (vastgesteld 10 oktober 2026)

Deze regels komen van Rafi's antwoorden bij video 1 ("Lying") en gelden voor elke volgende video,
tenzij Rafi iets anders vraagt.

## Format
- Verticaal **1080×1920**, 30 fps, **±30 seconden** (25–35).
- Strak exporteren — niet van een laptopscherm filmen.
- Lever **zonder muziek**: alleen stem + geluidseffecten. Rafi zet zelf muziek eronder in TikTok/Instagram.
  (Een eigen Runway-nummer werd te saai gevonden.)

## Beeld
- Licht: crème + terracotta, het palet van de app zelf.
  `bg #f4eee2`, `bg2 #eae2d3`, `paper #fbf7ec`, `ink #1f1a14`, `ink2 #5b5044`, `ink3 #9a8f7e`,
  `acc #a8512b`, `acc2 #8e4322`, `amber #ee8b47`, `pass #6e1f2a`, `gold #e3b871`. Lettertype **Inter** (800/900).
- **Tempo: elke ±0,7 s iets nieuws**, precies op de stem. Nergens stilte, nergens een stilstaand beeld.
- **Alleen sleutelwoorden groot** in beeld, op het moment dat ze gezegd worden (geen volledige ondertiteling).
- **Mascotte**: een klein paspoort met oogjes (bordeaux, gouden globe), dat reageert (zweten, knipogen, armen omhoog).
- **±30% echte app-beelden** uit de statische rondleiding (`/app?rondleiding=madrid|tokio`), in een telefoonframe.
- Klappen, stempels, screen-shake en een korte zoom-punch op elke scènewissel; motion blur (3 subframes).

## Stem
- **Kirk** (Brits), Runway `eleven_v4`, `speed 1.2`, `stability 0.5`, `seed 7`.
- Per zin genereren (met `previousText`/`nextText`) → exacte tijdstempels per zin.
- Daarna: randen trimmen, pauzes binnen een zin max. 0,12 s, `atempo 1.08`, tussen zinnen 0,10 s
  (iets langer voor een kantelmoment).

## Inhoud
- Toon: **brutaal maar slim**. Grote apps niet bij naam noemen en niet tekenen.
- Kernboodschap: andere apps geven iedereen hetzelfde; Borderless bouwt een cursus rond jouw doel.
- **Sterk einde zonder harde call-to-action.** Eindscherm: logo, "A course built around you.",
  klein "€9,99 per course · borderlesslearn.com", mascotte die knipoogt.
- Alleen beweringen die kloppen (74 talen, 50 lessen, niveautoets, €9,99 per cursus; Rafi's stage in Madrid).

## Hooks (volgorde van Rafi's voorkeur)
1. ~~Provocatie~~ — gebruikt in 01-lying
2. ~~Nieuwsgierigheid / founder~~ — gebruikt in 02-built
3. Herkenbare pijn ("300-day streak, still can't order a coffee")
4. Groot getal / claim

## Kosten per video (gemeten)
- Stem: ±13 Runway-credits (13 zinnen, min. 1 credit per aanroep; v4 ±2,2 credits per 1.000 tekens t/m 12 okt 2026, daarna 5).
- Animatie, app-opnames, geluidseffecten, render: €0. Render ±90 s.
