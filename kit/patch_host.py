import re,sys
G="glow: 'rgba(255,255,255,0.22)', "
P = {
'03': f"""[
  {{ t: p(3, 1) + 0.05, d: 1.2, side: 'R', y: 1300, mood: 'o', wide: true, say: 'A kitchen?!' }},
  {{ t: p(3, 4) - 0.05, d: 1.1, side: 'L', y: 1380, mood: 'worried', sweat: true, say: '3 WEEKS?' }},
  {{ t: p(5, 3) - 0.6, d: 1.0, side: 'R', y: 1350, mood: 'happy', armsUp: true, say: 'Fifty!' }},
  {{ t: s(6) + 0.1, d: 2.6, side: 'R', y: 1350, mood: 'o', says: [[s(6) + 0.1, 'Excuse me?'], [p(6, 1) + 0.15, "I'm a passport.", {{ mood: 'worried' }}]] }},
  {{ t: s(8) + 0.95, d: 4, side: 'B', x: W / 2, y: 1600, s: 0.75, mood: 'happy', wave: true, say: 'Tell me everything.' }},
]""",
'04': f"""[
  {{ t: p(1, 3), d: 1.1, side: 'R', y: 1560, mood: 'happy', say: 'Agreed.' }},
  {{ t: p(2, 3) + 0.2, d: 1.5, side: 'L', y: 1560, mood: 'worried', sweat: true, say: '…guilty.' }},
  {{ t: p(4, 2), d: 1.8, side: 'R', y: 1560, mood: 'happy', armsUp: true, say: 'Dutch! My favourite.' }},
  {{ t: p(5, 3), d: 1.2, side: 'L', y: 1560, mood: 'worried', say: 'Oof. Feelings.' }},
  {{ t: p(6, 4) - 0.2, d: 1.1, side: 'R', y: 1560, mood: 'happy', wink: true, say: 'Hehe.' }},
  {{ t: p(7, 5), d: 1.6, side: 'L', y: 1560, mood: 'o', wide: true, say: 'Every. Single. Time.' }},
  {{ t: s(8) + 0.1, d: 4, side: 'R', y: 1560, mood: 'happy', armsUp: true, point: true, say: 'Which one are you?' }},
]""",
'05': f"""[
  {{ t: 0.25, d: 1.4, side: 'R', y: 1600, mood: 'happy', wave: true, say: 'Boarding!' }},
  {{ t: p(4, 1) + 0.1, d: 2.0, side: 'L', y: 1680, s: 0.62, mood: 'happy', armsUp: true, says: [[p(4, 1) + 0.1, 'Stamp!'], [p(4, 3) + 0.35, 'Another one!', {{ wink: true }}]] }},
  {{ t: s(7) + 0.05, d: 1.9, side: 'R', y: 1640, s: 0.62, mood: 'happy', acc: ['shades'], say: 'New look.' }},
  {{ t: s(8) + 0.1, d: 1.8, side: 'L', y: 1640, s: 0.62, mood: 'o', wide: true, say: "That's me!" }},
  {{ t: e(9) + 0.3, d: 4, side: 'B', x: W / 2, y: 1610, s: 0.7, mood: 'happy', wave: true, say: 'See you at the gate.' }},
]""",
'06': f"""[
  {{ t: 0.15, d: 0.95, side: 'R', y: 1640, {G}mood: 'o', say: 'Where to?' }},
  {{ t: p(3, 1), d: 0.9, side: 'L', y: 1680, {G}mood: 'o', wide: true, say: '74?!' }},
  {{ t: p(4, 1) - 0.1, d: 1.2, side: 'R', y: 1680, s: 0.6, {G}mood: 'happy', point: true, say: 'This one!' }},
  {{ t: p(6, 3) - 0.1, d: 1.3, side: 'L', y: 1700, s: 0.6, {G}mood: 'happy', armsUp: true, say: 'Bags packed.' }},
  {{ t: s(9) + 0.6, d: 4, side: 'B', x: W / 2, y: 1560, s: 0.62, {G}mood: 'happy', wave: true, say: 'Departures open!' }},
]""",
'07': f"""[
  {{ t: 0.3, d: 1.7, side: 'R', y: 1700, s: 0.62, {G}mood: 'o', wide: true, say: 'Uh oh.' }},
  {{ t: p(5, 1) + 0.1, d: 1.5, side: 'L', y: 1720, s: 0.6, {G}mood: 'worried', sweat: true, say: 'How polite?!' }},
  {{ t: p(8, 3) + 0.1, d: 1.4, side: 'R', y: 1720, s: 0.6, {G}mood: 'o', wide: true, say: 'THOUSANDS?' }},
  {{ t: p(9, 1) + 0.25, d: 0.75, side: 'L', y: 1720, s: 0.6, {G}mood: 'happy', say: 'Called it.' }},
  {{ t: p(12, 3) + 0.05, d: 1.3, side: 'R', y: 1720, s: 0.6, {G}mood: 'happy', armsUp: true, say: "Let's go!" }},
  {{ t: s(13) + 0.3, d: 3.5, side: 'L', y: 1740, s: 0.6, {G}mood: 'happy', wave: true, say: 'All five.' }},
]""",
'08': f"""[
  {{ t: p(1, 4) - 0.1, d: 1.6, side: 'R', y: 1720, s: 0.62, mood: 'o', wide: true, say: 'Closer?' }},
  {{ t: p(2, 3), d: 1.3, side: 'L', y: 1740, s: 0.6, mood: 'happy', say: 'Bellissimo.' }},
  {{ t: p(5, 4) + 0.3, d: 1.0, side: 'R', y: 1740, s: 0.6, mood: 'happy', armsUp: true, say: 'Too easy.' }},
  {{ t: p(7, 2) + 0.2, d: 1.6, side: 'L', y: 1740, s: 0.6, mood: 'happy', armsUp: true, say: 'Gezellig!' }},
  {{ t: p(10, 1) + 0.3, d: 3, side: 'R', y: 1760, s: 0.6, mood: 'worried', sweat: true, say: '…none?' }},
]""",
'09': f"""[
  {{ t: p(2, 1), d: 0.75, side: 'R', y: 1680, s: 0.6, {G}mood: 'o', wide: true, say: 'WHY?' }},
  {{ t: p(4, 3), d: 0.75, side: 'L', y: 1680, s: 0.6, {G}mood: 'happy', say: 'B1!' }},
  {{ t: p(5, 1), d: 0.9, side: 'R', y: 1700, s: 0.6, {G}mood: 'o', wide: true, say: 'FIFTY.' }},
  {{ t: p(7, 1), d: 0.6, side: 'L', y: 1700, s: 0.6, {G}mood: 'happy', armsUp: true, say: 'Mine!' }},
  {{ t: s(8) + 0.5, d: 3, side: 'B', x: W / 2, y: 1640, s: 0.6, {G}mood: 'happy', wave: true, say: "That's the app." }},
]""",
'12': f"""[
  {{ t: 0.3, d: e(7) - 0.1, side: 'T', x: W / 2, y: 175, s: 0.38, mood: 'happy', noTilt: true, size: 40, maxw: 380, says: [[0.35, 'Same app.'], [p(2, 1), 'Madrid!', {{ lookX: -1 }}], [p(3, 1), 'Tokyo!', {{ lookX: 1 }}],
    [p(4, 1), 'Menus.', {{ lookX: -1 }}], [p(4, 3), 'Requests.', {{ lookX: 1 }}], [p(5, 1), 'Spain…', {{ lookX: -1 }}], [p(5, 3), '…or Tokyo.', {{ lookX: 1 }}],
    [p(6, 1), 'Hispanidad.', {{ lookX: -1 }}], [p(6, 3), 'Nihon.', {{ lookX: 1 }}], [s(7) + 0.3, 'Zero overlap.', {{ mood: 'o', wide: true, lookX: 0 }}]] }},
  {{ t: s(8) + 0.2, d: 3, side: 'B', x: W / 2, y: 1640, s: 0.62, mood: 'happy', wave: true, say: "That's me." }},
]""",
'13': f"""[
  {{ t: p(1, 3), d: 1.0, side: 'R', y: 1730, s: 0.6, mood: 'happy', say: 'Ready?' }},
  {{ t: p(2, 5), d: 1.1, side: 'L', y: 1730, s: 0.6, mood: 'o', say: 'Vale. Vale. Vale.' }},
  {{ t: p(3, 5) + 0.1, d: 1.1, side: 'R', y: 1730, s: 0.6, mood: 'happy', wink: true, say: '¡Tío!' }},
  {{ t: p(4, 1), d: 1.6, side: 'L', y: 1730, s: 0.6, mood: 'happy', acc: ['shades'], say: 'Guay.' }},
  {{ t: p(6, 1), d: 1.4, side: 'R', y: 1730, s: 0.6, mood: 'o', wide: true, say: '¡¿QUÉ?!' }},
  {{ t: p(7, 2) + 0.15, d: 1.3, side: 'L', y: 1730, s: 0.6, mood: 'happy', armsUp: true, say: 'Olé.' }},
  {{ t: s(8) + 0.3, d: 3, side: 'R', y: 1730, s: 0.6, mood: 'happy', wave: true, say: '¡Venga!' }},
]""",
'15': f"""[
  {{ t: p(1, 1) + 0.1, d: 0.85, side: 'R', y: 1520, s: 0.62, {G}mood: 'neutral', say: 'Ha. Ha.' }},
  {{ t: p(4, 1) + 0.2, d: 1.3, side: 'L', y: 1520, s: 0.62, {G}mood: 'o', wide: true, say: 'Grass?' }},
  {{ t: p(6, 2), d: 1.4, side: 'R', y: 1520, s: 0.62, {G}mood: 'happy', say: '555!' }},
  {{ t: p(7, 1) + 0.1, d: 1.3, side: 'L', y: 1520, s: 0.62, {G}mood: 'o', wide: true, sweat: true, say: 'KKKKKK' }},
  {{ t: p(8, 2), d: 1.2, side: 'R', y: 1520, s: 0.62, {G}mood: 'neutral', say: 'lol.' }},
  {{ t: END + 0.3, d: 3, side: 'B', x: W / 2, y: 1600, s: 0.62, {G}mood: 'happy', wave: true, say: 'jajaja' }},
]""",
'16': f"""[
  {{ t: s(2), d: 1.0, side: 'L', y: 1520, s: 0.65, mood: 'worried', wide: true, sweat: true, say: 'AAAH.' }},
  {{ t: p(4, 1) + 0.05, d: 0.9, side: 'R', y: 1640, s: 0.6, mood: 'o', wide: true, say: 'Lesson 3!' }},
  {{ t: s(7) + 0.3, d: 0.9, side: 'L', y: 1520, s: 0.62, mood: 'happy', armsUp: true, acc: ['shades'], say: 'Nailed it.' }},
  {{ t: s(8) + 0.4, d: 3, side: 'B', x: W / 2, y: 1690, s: 0.6, mood: 'happy', wave: true, say: '¡Claro!' }},
]""",
'17': f"""[
  {{ t: 0.9, d: 1.6, side: 'R', y: 1480, s: 0.62, {G}mood: 'happy', acc: ['shades'], say: '400 days!' }},
  {{ t: e(3) + 0.3, d: 1.2, side: 'L', y: 1480, s: 0.62, {G}mood: 'worried', sweat: true, say: 'Oof.' }},
  {{ t: p(7, 1), d: 1.4, side: 'R', y: 1480, s: 0.62, {G}mood: 'o', wide: true, say: 'That accent!' }},
  {{ t: p(8, 1), d: 0.85, side: 'L', y: 1480, s: 0.62, {G}mood: 'happy', wink: true, say: 'Me.' }},
  {{ t: s(9) + 0.55, d: 3, side: 'B', x: W / 2, y: 1640, s: 0.62, {G}mood: 'happy', armsUp: true, say: 'Comeback.' }},
]""",
}
for v, peeks in P.items():
    p=f'v/{v}/scene.js'; s=open(f'bak/scene_{v}.js').read()
    s = s.replace("  window.CUES = { dur: DUR, cues", f"  const PEEKS = {peeks};\n  cues.push(...HOST.cues(PEEKS));\n  window.CUES = {{ dur: DUR, cues", 1)
    m = re.search(r"X\.save\(\); camera\([^\n]*?\);", s)
    if m: s = s[:m.end()] + " HOST.pp(t, L);" + s[m.end():]
    else:
        a = "X.save(); X.translate((hash(Math.floor(t * 60)) - 0.5) * 16 * vib, (hash(Math.floor(t * 60) + 9) - 0.5) * 10 * vib);"
        assert a in s; s = s.replace(a, a + " HOST.pp(t, L);")
    i = s.rindex("\n    },\n  };")
    s = s[:i] + "\n      HOST.peeks(t, PEEKS);" + s[i:]
    open(p,'w').write(s); print(v, 'ok')
