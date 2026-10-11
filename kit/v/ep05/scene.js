// La Esquina · Ep. 5 — La Cita
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep05');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'smug', day: 'DAY 1213', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);
  const MS = (t, x, y, s, m = {}) => marisol(t, x, y, s, { mood: 'neutral', ...m, talk: tk('marisol', t) });
  const f1w = [0.05, 0.9, 1.95].map((o) => Lt('f1') + o), f1c = ['DINNER', 'FRIDAY', 'YES'];
  const cues = [['pop', 1.9, 0.6]]; f1w.forEach((w) => cues.push(['flap', w, 0.5]));
  cues.push(['swell', M.dread, 0.4], ['whoosh', M.alley, 0.4], ['plop', M.alley + 0.8, 0.4], ['whoosh', M.rest, 0.3], ['glitch', M.glitch + 0.2, 0.5], ['glitch', Lt('f7'), 0.5], ['glitch', Lt('f7') + 1.5, 0.5], ['plop', M.drop, 1.0], ['plop', M.drop + 0.1, 0.6],
    ['pop', M.thumb + 0.5, 0.5], ['whoosh', M.window, 0.3], ['stamp', M.stamp + 0.55, 1], ['whoosh', M.bar, 0.3], ['hum', Lt('r1') + 0.6, 0.5]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [M.dread, M.drop];
  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, hits, [], 10);
    if (t < M.dread) { X.save(); cam(540, 1000, 1.0); apartment(t, 1); F(t, 360, 1250, 0.9, { mood: 'smug', point: t > Lt('f1') && t < Le('f1') });
      phoneUI(t, 790, 980, 300, (w, h) => { X.fillStyle = '#f6efe2'; X.fillRect(-w, -h, 2 * w, 2 * h); txt("IT'S A MATCH", 0, -h / 2 + 90, font('anton', 400, 40), '#d8506a'); X.save(); X.translate(0, -60); X.scale(0.5, 0.5); marisol(t, 0, 0, 1, { mood: 'happy' }); X.restore(); txt('Marisol', 0, 140, font('serif', 400, 44), INK); txt('"¿Cenamos el viernes?"', 0, 200, font('inter', 600, 24), '#5a5048'); });
      let ci = -1; f1w.forEach((w, i) => { if (t >= w) ci = i; }); if (ci >= 0 && t < Lt('f1') + 2.9) { const k = back(lin(t, f1w[ci], f1w[ci] + 0.15), 3); X.save(); X.translate(360, 800); X.scale(k, k); X.fillStyle = '#fff'; rr(-150, -60, 300, 120, 12); X.fill(); txt(f1c[ci], 0, 10, font('anton', 400, 60), '#3a5bd0'); X.restore(); }
      X.restore(); say(t, 'f1', 540, 560, { size: 50 }); }
    else if (t < M.alley) { X.save(); cam(360, 1100, 2.4 + (t - M.dread) * 0.1); apartment(t, 1); F(t, 360, 1250, 0.9, { mood: 'shock', sweat: true }); const fog = lin(t, M.dread + 0.3, M.dread + 1.4); X.fillStyle = `rgba(240,240,255,${0.85 * fog})`; [[-38, -40], [38, -40]].forEach(([ex, ey]) => { X.beginPath(); X.arc(360 + ex * 0.9, 1250 + ey * 0.9, 27, 0, 7); X.fill(); }); X.restore(); say(t, 'f2', 540, 560, { size: 60 }); }
    else if (t < M.rest) { X.save(); keyCam(t, [[M.alley, 540, 1050, 1.0], [Lt('f3') - 0.1, 600, 1150, 1.5], [Lt('p1') - 0.1, 360, 1150, 1.8], [Lt('f4') - 0.1, 700, 1150, 1.8], [Lt('p2') - 0.1, 520, 1150, 1.3]]); alley(t);
      const out = eo(lin(t, M.alley + 0.6, M.alley + 1.4)); P(t, mix(270, 380, out), 1240, 0.8, { mood: 'neutral', lookX: 1, seed: 3, wide: t > Lt('f3') && t < Le('f3') });
      X.fillStyle = '#222'; X.beginPath(); X.arc(mix(200, 320, out), 1300, 50, 0, 7); X.fill();
      F(t, 720, 1250, 0.75, { mood: t > Lt('f4') ? 'neutral' : 'shock', lookX: -1, sweat: true }); X.restore();
      say(t, 'f3', 700, 600, { size: 46 }); say(t, 'p1', 380, 700, { size: 52 }); say(t, 'f4', 700, 640, { size: 48 }); say(t, 'p2', 380, 700, { size: 60 }); }
    else if (t < M.window) { const inTable = [[M.rest, 600, 1100, 1.0], [Lt('p3') - 0.1, 170, 1130, 2.0], [Lt('f5') - 0.05, 470, 1080, 1.9], [Lt('m1') - 0.05, 740, 1060, 1.9], [Lt('p4') - 0.1, 170, 1130, 2.0], [Lt('f6') - 0.05, 470, 1080, 1.9], [M.glitch, 600, 1100, 1.15],
        [M.drop, 470, 1200, 2.4], [Lt('f8') - 0.3, 470, 1060, 2.0], [Lt('m2') - 0.1, 740, 1060, 2.0], [M.thumb, 300, 1100, 1.3]];
      X.save(); keyCam(t, inTable); restaurant(t);
      const sneeze = t > Lt('p4') && t < Lt('p4') + 0.6; bigPlant(t, 270, 1230, 0.9, sneeze ? 1 : 0.1);
      const thumb = t > M.thumb + 0.4; P(t, 110, 1190, 0.6, { mood: thumb ? 'happy' : 'neutral', lookX: 1, seed: 3, armsUp: thumb, calm: true, tilt: 0.12, squash: sneeze ? 0.8 : 0 }, { brows: t > M.glitch && t < M.drop ? 'sad' : undefined });
      X.fillStyle = '#4a9a66'; X.save(); X.translate(270, 1230); X.rotate(-0.9 + Math.sin(t * 30) * (sneeze ? 0.06 : 0.005)); X.beginPath(); X.ellipse(0, -150, 40, 170, 0, 0, 7); X.fill(); X.restore();
      X.fillStyle = '#111'; X.beginPath(); X.arc(150, 1150, 10, 0, 7); X.fill(); X.fillRect(148, 1150, 4, 60);
      F(t, 470, 1150, 0.62, { mood: t > Lt('f8') ? 'neutral' : t > M.glitch ? 'shock' : 'neutral', lookX: 1, sweat: t > M.glitch && t < Lt('f8') });
      X.fillStyle = '#111'; const earY = t < M.drop ? 1080 : mix(1080, 1246, eo(lin(t, M.drop - 0.3, M.drop))); X.beginPath(); X.arc(t < M.drop ? 530 : mix(530, 470, lin(t, M.drop - 0.3, M.drop)), earY, 9, 0, 7); X.fill();
      if (t > M.drop && t < M.drop + 0.5) { const k = lin(t, M.drop, M.drop + 0.5); for (let i = 0; i < 8; i++) { X.fillStyle = `rgba(224,74,42,${1 - k})`; X.beginPath(); X.arc(470 + Math.cos(i) * 60 * k, 1230 - Math.sin(i * 0.7 + 0.5) * 80 * k, 8, 0, 7); X.fill(); } }
      MS(t, 740, 1110, 0.6, { mood: t > Lt('m2') - 0.2 ? 'laugh' : t > Lt('f6') ? 'shock' : 'happy', lookX: -1 });
      if (t > M.glitch && t < M.drop) { X.strokeStyle = 'rgba(255,255,255,0.7)'; X.lineWidth = 3; for (let i = 0; i < 5; i++) { const y = 1060 + hash(Math.floor(t * 20) + i) * 60; X.beginPath(); X.moveTo(500, y); X.lineTo(560, y + 5); X.stroke(); } }
      X.restore();
      say(t, 'p3', 300, 700, { size: 52 }); say(t, 'f5', 540, 640, { size: 52 }); say(t, 'm1', 760, 640, { size: 60, tail: 0.25 }); say(t, 'p4', 300, 700, { size: 50 }); say(t, 'f6', 560, 640, { size: 50 });
      say(t, 'p5', 300, 640, { size: 50 }); say(t, 'f7', 620, 780, { size: 50 }); say(t, 'f8', 540, 600, { size: 54 }); say(t, 'm2', 700, 620, { size: 54, tail: 0.25 }); }
    else if (t < M.stamp) { X.save(); cam(540, 1050, 1.15); streetDay(t); X.fillStyle = 'rgba(10,10,30,0.55)'; X.fillRect(-500, -500, W + 1000, H + 1000);
      X.fillStyle = '#2a1414'; rr(160, 500, 760, 700, 20); X.fill(); X.save(); X.beginPath(); X.rect(180, 520, 720, 660); X.clip(); X.translate(540, 850); X.scale(0.55, 0.55); X.translate(-600, -1150); restaurant(t); bigPlant(t, 220, 1260, 0.9); P(t, 200, 1200, 0.6, { mood: 'happy', armsUp: true, seed: 3 }); F(t, 470, 1150, 0.62, { mood: 'happy' }); MS(t, 740, 1110, 0.6, { mood: 'happy' }); X.restore();
      G(t, 820, 1300, 0.75, { mood: t > Lt('g1') ? 'shock' : 'happy', lookX: -1 }); X.fillStyle = '#d9a441'; X.save(); X.translate(920, 1290); X.rotate(0.3); rr(-14, -60, 28, 120, 10); X.fill(); X.restore(); X.restore(); say(t, 'g1', 760, 700, { size: 58, tail: 0.2 }); }
    else if (t < M.bar) passportShot(t, M.stamp, 3, 3);
    else { X.save(); keyCam(t, [[M.bar, 330, 1100, 1.6], [Lt('r1') - 0.2, 260, 1100, 2.6]]); bar(t); R(t, 230, 1150, 0.78, { mood: 'neutral' }); G(t, 400, 1140, 0.72, { mood: 'happy', lookX: -1 }); table(t, true);
      if (t > Le('r1')) { const g = lin(t, Le('r1'), DUR); X.fillStyle = `rgba(255,120,30,${0.2 * g})`; X.beginPath(); X.arc(230, 1050, 200 + g * 200, 0, 7); X.fill(); }
      X.restore(); say(t, 'g2', 600, 700, { size: 54 }); say(t, 'r1', 400, 640, { size: 64 }); }
    X.restore(); titleCard(t, 5, 'La Cita'); letterbox(); fadeEnd(t, DUR, 0.8);
  } };
})();
