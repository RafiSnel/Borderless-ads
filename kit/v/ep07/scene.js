// La Esquina · Ep. 7 — El Secuestro
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep07');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'neutral', day: 'DAY 1216', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);
  function bag(x, y, s, wig = 0, t = 0) { X.save(); X.translate(x, y); X.scale(s, s); X.rotate(Math.sin(t * 12) * 0.05 * wig); X.fillStyle = '#7a6a50'; X.beginPath(); X.moveTo(-110, -150); X.quadraticCurveTo(0, -200, 110, -150); X.lineTo(130, 150); X.quadraticCurveTo(0, 190, -130, 150); X.closePath(); X.fill(); X.strokeStyle = '#4a3a2a'; X.lineWidth = 8; X.beginPath(); X.moveTo(-60, -160); X.lineTo(60, -160); X.stroke(); X.restore(); }
  const cues = [['tick', 2.0, 0.4]]; for (let x = 2.4; x < 6.8; x += 0.18) cues.push(['type', x, 0.15]);
  cues.push(['whoosh', M.apt, 0.3], ['flap', M.apt + 2.2, 0.6], ['whoosh', M.van2, 0.3], ['scratch', Lt('p1') - 0.6, 0.5], ['flap', Lt('f2'), 0.5], ['flap', Lt('f2') + 1.2, 0.5], ['flap', Lt('r3') + 1.2, 0.8], ['whoosh', M.ride, 0.4], ['impact', M.cellar, 0.6], ['hum', M.cellar + 0.3, 0.4], ['shutter', M.wall, 0.6], ['hum', M.wall + 0.4, 0.6], ['glitch', M.machine, 0.6], ['hum', M.machine + 0.3, 0.8], ['click', M.button, 1.0], ['hum', M.button + 0.1, 0.9], ['plop', M.planta + 0.5, 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.38 };
  const hits = [M.cellar, M.button];
  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, hits, [], 10);
    if (t < M.apt) { X.save(); keyCam(t, [[0, 540, 1000, 1.0], [Lt('g1') - 0.1, 760, 1150, 1.8]]); vanInside(t); whiteboard(t, 540, 700, 1.0, lin(t, 2.2, 6.0)); R(t, 280, 1250, 0.7, { point: true }); G(t, 760, 1260, 0.6, { mood: 'worried' in {} ? 'neutral' : 'neutral' }); F(t, 960, 1260, 0.55);
      for (let i = 0; i < 10; i++) { if ((Math.floor(t * 8) + i) % 3) continue; X.fillStyle = '#ff9af0'; X.beginPath(); X.arc(hash(i) * W, hash(i * 3) * H, 8, 0, 7); X.fill(); } X.restore(); say(t, 'r1', 400, 480, { size: 48 }); say(t, 'g1', 720, 760, { size: 54 }); }
    else if (t < M.van2) { const d = t - M.apt; X.save(); cam(540, 1000, 1.0); apartment(t, 1); X.fillStyle = 'rgba(0,0,20,0.6)'; X.fillRect(-500, -500, W + 1000, H + 1000);
      const grabbed = d > 2.2; if (!grabbed) planta(t, 820, 1250, 0.75); P(t, 400, 1320, 0.8, { wink: true, mood: 'neutral', calm: true, tilt: -1.45, seed: 2 });
      const sx = mix(-100, 760, lin(d, 0.2, 2.0)); [0, 1, 2].forEach((i) => { const x = sx - i * 150; X.fillStyle = '#111'; X.beginPath(); X.ellipse(x, 1250, 70, 150, 0, 0, 7); X.fill(); X.fillStyle = '#fff'; X.beginPath(); X.arc(x - 20, 1170, 8, 0, 7); X.arc(x + 20, 1170, 8, 0, 7); X.fill(); });
      if (grabbed) bag(sx, 1220, 0.5, 1, t); X.restore(); }
    else if (t < M.apt2) { X.save(); keyCam(t, [[M.van2, 540, 1100, 1.4], [Lt('g2') - 0.1, 700, 1150, 2.0]]); vanInside(t); R(t, 280, 1250, 0.7, { mood: 'neutral' }); G(t, 700, 1260, 0.6, { mood: t > Lt('g2') ? 'happy' : 'shock' }); F(t, 920, 1260, 0.55, { mood: 'shock' }); planta(t, 520, 1300, 0.65); X.restore();
      say(t, 'f1', 760, 760, { size: 56 }); say(t, 'r2', 300, 760, { size: 56 }); say(t, 'g2', 700, 760, { size: 56 }); }
    else if (t < M.ride) { X.save(); keyCam(t, [[M.apt2, 540, 1050, 1.0], [Lt('f2') - 0.1, 700, 1150, 1.6], [Lt('r3') - 0.1, 540, 1150, 1.3]]); apartment(t, 1); X.fillStyle = 'rgba(0,0,20,0.5)'; X.fillRect(-500, -500, W + 1000, H + 1000);
      for (let i = 0; i < 40; i++) { const k = (t * 0.3 + hash(i)) % 1; X.fillStyle = ['#ff9af0', '#9af0ff', '#fff59a'][i % 3]; X.globalAlpha = 0.7; X.beginPath(); X.arc(hash(i * 3) * W + Math.sin(t + i) * 80, (hash(i * 7) * 1400 + k * 400) % 1500, 12, 0, 7); X.fill(); } X.globalAlpha = 1;
      const bagged = t > Lt('r3') + 1.2; if (!bagged) P(t, 420, 1300, 0.8, { mood: 'o', wide: true, seed: 2 }); else bag(420, 1260, 0.6, 1, t);
      R(t, 260, 1250, 0.6, {}); G(t, 640, 1270, 0.55, { mood: 'shock' }); F(t, 820, 1270, 0.52, { mood: 'shock', point: t > Lt('f2') && t < Le('f2') });
      if (t > Lt('f2') && t < Le('f2') + 0.3) { const ci = t < Lt('f2') + 1.2 ? 0 : 1; X.save(); X.translate(820, 980); X.fillStyle = '#fff'; rr(-150, -60, 300, 120, 12); X.fill(); txt(['NOSOTROS', 'PIZZA'][ci], 0, 10, font('anton', 400, 56), '#3a5bd0'); X.restore(); }
      X.restore(); say(t, 'p1', 420, 760, { size: 60 }); say(t, 'f2', 700, 640, { size: 54 }); say(t, 'p2', 420, 760, { size: 54 }); say(t, 'r3', 300, 700, { size: 56 }); }
    else if (t < M.cellar) { X.save(); cam(540, 1100, 1.2); vanInside(t, 1); R(t, 230, 1250, 0.6, { mood: t > Lt('r4') ? 'neutral' : 'smug' }); bag(470, 1260, 0.55, 1, t); G(t, 720, 1260, 0.55, { mood: 'happy' }); planta(t, 720, 1390, 0.45); F(t, 920, 1270, 0.5); X.restore();
      say(t, 'p3', 470, 820, { size: 54, bg: '#e8dcc0' }); say(t, 'g3', 720, 800, { size: 56 }); say(t, 'r4', 300, 760, { size: 54 }); }
    else if (t < M.wall) { const ws = { r: [300, 1150, 1.8], p: [560, 1180, 1.8], w: [540, 1050, 1.0] }; const cur = [['r5', 'r'], ['p4', 'p'], ['r6', 'r'], ['p5', 'p'], ['g4', 'w']].reduce((a, [id, w]) => t >= Lt(id) - 0.15 ? w : a, 'w');
      X.save(); cam(...(t < Lt('r5') + 1.0 ? ws.w : ws[cur])); cellar(t); chair(560, 1300, 0.9); P(t, 560, 1220, 0.75, { mood: 'neutral', seed: 3 }); X.strokeStyle = '#c9a84a'; X.lineWidth = 8; X.beginPath(); X.moveTo(470, 1240); X.lineTo(650, 1240); X.stroke();
      R(t, 300, 1250, 0.75, { mood: cur === 'r' && t > Lt('r6') ? 'shock' : 'neutral', day: t > Lt('r6') && Math.floor(t * 6) % 2 ? 'DAY ????' : 'DAY 1216' }); G(t, 860, 1290, 0.5, { mood: 'worried' in {} ? 'neutral' : 'neutral', lookX: -1 }); F(t, 980, 1300, 0.45, { lookY: 1 });
      if (t > Lt('g4') - 0.6) { const k = eo(lin(t, Lt('g4') - 0.6, Lt('g4'))); X.fillStyle = 'rgba(200,230,255,0.7)'; rr(mix(820, 660, k) - 18, 1170, 36, 60, 8); X.fill(); }
      X.restore(); say(t, 'r5', 360, 700, { size: 54 }); say(t, 'p4', 560, 660, { size: 50 }); say(t, 'r6', 360, 680, { size: 50 }); say(t, 'p5', 560, 700, { size: 56 }); say(t, 'g4', 820, 820, { size: 60 }); }
    else if (t < M.planta) { const tc = speaking('directie', t); const open = eo(lin(t, M.wall, M.wall + 1.2));
      X.save(); keyCam(t, [[M.wall, 540, 1000, 1.0], [M.machine, 540, 1100, 1.25], [Lt('p6') - 0.1, 560, 1200, 2.0], [M.button - 0.6, 300, 1180, 2.2], [M.button + 0.4, 560, 1100, 1.3]]); cellar(t);
      X.save(); X.beginPath(); X.rect(540 - 420 * open, 200, 840 * open, 700); X.clip(); X.fillStyle = '#05050a'; X.fillRect(0, 200, W, 700); directie(t, 540, 560, 0.45, { talk: tc }); X.restore();
      chair(560, 1300, 0.9); P(t, 560, 1220, 0.75, { mood: t > M.machine ? 'worried' : 'neutral', wide: t > M.machine, sweat: t > M.machine, seed: 3 }); X.strokeStyle = '#c9a84a'; X.lineWidth = 8; X.beginPath(); X.moveTo(470, 1240); X.lineTo(650, 1240); X.stroke();
      R(t, 300, 1250, 0.75, { mood: 'neutral', lookX: t > M.button - 0.6 ? 0.8 : 0 }); X.fillStyle = '#c0392b'; X.beginPath(); X.arc(200, 1250, t > M.button && t < M.button + 0.3 ? 22 : 28, 0, 7); X.fill(); X.fillStyle = '#444'; X.fillRect(180, 1270, 40, 160);
      G(t, 860, 1290, 0.5, { mood: 'shock' }); F(t, 980, 1300, 0.45, { mood: 'shock' });
      const ey = t < M.button ? mix(-200, 700, eo(lin(t, M.machine, M.machine + 1.4))) : mix(700, 1020, lin(t, M.button + 0.2, M.planta - 0.3)); eraser(t, 560, ey, 0.9, t > M.button ? 1 : 0);
      X.restore(); if (t > M.planta - 0.35) { X.fillStyle = '#000'; X.fillRect(0, 0, W, H); }
      say(t, 'd1', 540, 1600, { size: 46, bg: '#2a0505', fg: '#ff9a9a', nosub: true }); say(t, 'p6', 560, 760, { size: 70 }); }
    else { if (t < M.planta + 0.4) { X.fillStyle = '#000'; X.fillRect(0, 0, W, H); } else { X.save(); cam(520, 1250, 1.8); vanInside(t); const fall = eo(lin(t, M.planta + 0.5, M.planta + 0.9)); planta(t, 520, 1300, 0.7, { tilt: fall * 1.4 }); X.restore(); } }
    X.restore(); titleCard(t, 7, 'El Secuestro', '#1a1a2a'); letterbox(); fadeEnd(t, DUR, 0.5);
  } };
})();
