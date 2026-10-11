// La Esquina · Ep. 12 — La Esquina (season finale)
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep12');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'neutral', day: 'DAY 2', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);
  const C = (t, x, y, s, m = {}) => carmen(t, x, y, s, { mood: 'warm', ...m, talk: tk('carmen', t) });
  const dirTalk = (t) => speaking('directie', t) ? 0.4 + 0.4 * Math.abs(Math.sin(t * 17)) : 0;

  function batBell(t, i, cx, cy) { const a = t * (1.2 + hash(i) * 0.8) + i * 2.1, r = 260 + hash(i * 3) * 380; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a * 1.3) * r * 0.7; const fl = Math.sin(t * 22 + i) * 0.6;
    X.save(); X.translate(x, y); X.fillStyle = '#c0182a'; X.beginPath(); X.moveTo(-24, 14); X.quadraticCurveTo(-24, -26, 0, -26); X.quadraticCurveTo(24, -26, 24, 14); X.lineTo(30, 20); X.lineTo(-30, 20); X.fill();
    X.fillStyle = '#7a0a14'; X.beginPath(); X.moveTo(-26, -6); X.lineTo(-70, -26 - fl * 30); X.lineTo(-56, 6); X.fill(); X.beginPath(); X.moveTo(26, -6); X.lineTo(70, -26 - fl * 30); X.lineTo(56, 6); X.fill(); X.restore(); }
  function bigMsg(t, t0, t1, text, x, y) { if (t < t0 || t > t1) return; const k = eo(lin(t, t0, t0 + 0.3)), out = 1 - lin(t, t1 - 0.3, t1); X.save(); X.globalAlpha = out; X.translate(x, y); X.scale(mix(1.6, 1, k), mix(1.6, 1, k)); X.rotate(-0.04);
    const L = wrapText(text.toUpperCase(), font('anton', 400, 80), 900); L.forEach((s, i) => { X.lineWidth = 14; X.strokeStyle = '#2a0505'; X.font = font('anton', 400, 80); X.textAlign = 'center'; X.strokeText(s, 0, i * 90); txt(s, 0, i * 90, font('anton', 400, 80), '#ff3a3a'); }); X.restore(); }
  function phoneToggle(t, x, y, s, on, rot) { X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s); X.fillStyle = '#111'; rr(-150, -300, 300, 600, 40); X.fill(); X.fillStyle = '#f2f2f4'; rr(-134, -284, 268, 568, 30); X.fill();
    txt('Silence', 0, -60, font('inter', 800, 34), INK); txt('notifications', 0, -18, font('inter', 800, 34), INK); X.fillStyle = on ? '#3aa35b' : '#c9ced6'; rr(-60, 40, 120, 64, 32); X.fill(); X.fillStyle = '#fff'; X.beginPath(); X.arc(on ? 28 : -28, 72, 26, 0, 7); X.fill(); X.restore(); }
  function jar(x, y, s, k) { X.save(); X.translate(x, mix(y - 400, y, eo(k))); X.scale(s, s); X.fillStyle = 'rgba(200,230,255,0.28)'; rr(-90, -160, 180, 170, 30); X.fill(); X.strokeStyle = 'rgba(255,255,255,0.7)'; X.lineWidth = 6; rr(-90, -160, 180, 170, 30); X.stroke(); X.fillStyle = '#b5841a'; rr(-80, -180, 160, 28, 8); X.fill(); X.strokeStyle = 'rgba(255,255,255,0.8)'; X.beginPath(); X.moveTo(-60, -130); X.lineTo(-60, -40); X.stroke(); X.restore(); }
  function postcard(t, k) { X.save(); X.translate(540, 940); X.rotate(-0.05); X.scale(mix(0.8, 1, eo(k)), mix(0.8, 1, eo(k))); X.fillStyle = '#f6efe2'; rr(-440, -300, 880, 600, 12); X.fill();
    X.save(); X.beginPath(); rr(-410, -270, 820, 540, 6); X.clip(); const g = X.createLinearGradient(0, -270, 0, 270); g.addColorStop(0, '#1a1040'); g.addColorStop(1, '#5a2a6a'); X.fillStyle = g; X.fillRect(-410, -270, 820, 540);
    for (let i = 0; i < 12; i++) { const x = -420 + i * 72, h = 160 + hash(i + 50) * 260; X.fillStyle = '#120a28'; X.fillRect(x, 270 - h, 66, h); for (let r = 0; r < 8; r++) { X.fillStyle = ['#ff4fa0', '#4ff0ff', '#ffe04f', '#1a1a3a'][Math.floor(hash(i * 9 + r) * 4)]; X.fillRect(x + 10, 290 - h + r * 26, 46, 12); } }
    X.strokeStyle = '#e8402a'; X.lineWidth = 6; X.beginPath(); X.moveTo(150, 270); X.lineTo(210, -180); X.lineTo(270, 270); X.moveTo(170, 120); X.lineTo(250, 120); X.moveTo(190, -20); X.lineTo(230, -20); X.stroke(); X.fillStyle = '#fff'; X.beginPath(); X.arc(210, -190, 8, 0, 7); X.fill();
    X.restore(); X.save(); X.translate(300, -200); X.rotate(0.25); X.strokeStyle = 'rgba(40,40,60,0.75)'; X.lineWidth = 6; X.beginPath(); X.arc(0, 0, 80, 0, 7); X.stroke(); txt('TOKYO', 0, -10, font('anton', 400, 36), 'rgba(40,40,60,0.85)'); txt('03·10·26', 0, 28, font('bebas', 400, 28), 'rgba(40,40,60,0.85)'); X.restore();
    if (k > 0.5) { const w = cl((k - 0.5) * 2); X.save(); X.beginPath(); X.rect(-400, 160, 700 * w, 120); X.clip(); txt('Mamá y Papá', -120, 230, font('caveat', 700, 96), '#fff6d6'); X.restore(); } X.restore(); }

  const cues = [['hum', 1.6, 0.4], ['whoosh', M.storm, 0.5], ['glitch', Lt('d2'), 0.5], ['swell', Lt('r1'), 0.4], ['glitch', Lt('d3'), 0.5], ['glitch', Lt('d4'), 0.5], ['flaplong', Lt('f1') + 1.4, 0.6], ['heart', M.tap - 1.0, 0.8],
    ['click', M.tap, 1.0], ['click', M.tap + 0.03, 0.8], ['click', M.tap + 0.06, 0.8], ['click', M.tap + 0.09, 0.8], ['ding', M.ding, 0.25], ['plop', M.jar + 0.6, 0.7], ['whoosh', M.party, 0.3], ['ding', Lt('r2') - 0.6, 0.5], ['laugh', Le('r2') + 0.1, 0.5], ['fanfare', Le('r2') + 0.1, 0.3],
    ['stamp', M.stamp + 0.55, 1.0], ['page', M.flip + 0.2, 0.4], ['page', M.flip + 1.4, 0.4], ['page', M.flip + 2.6, 0.4], ['page', M.flip + 3.8, 0.4], ['tick', M.empty + 0.3, 0.3], ['tick', M.empty + 1.3, 0.3], ['page', M.card, 0.5]];
  for (let i = 0; i < 20; i++) cues.push(['shutter', M.off + i * 0.11, 0.15]);
  for (let x = M.storm; x < Lt('p2') - 1; x += 0.35) cues.push(['flap', x, 0.15]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };

  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, [M.tap, Lt('d2'), Lt('d3'), Lt('d4'), M.stamp + 0.55], [M.storm, M.party, M.empty], 10);
    if (t < M.storm) { // ---- the truth ----
      X.save(); keyCam(t, [[0, 540, 960, 1.0], [8, 540, 900, 1.15], [Lt('p1') - 0.2, 540, 1400, 1.8]]); topFloor(t); directie(t, 540, 660, 0.4, { talk: dirTalk(t) });
      if (t > 4 && t < Lt('p1')) { X.save(); X.globalAlpha = 0.85 * cl((t - 4) * 2); for (let i = 0; i < 18; i++) { const x = 160 + (i % 6) * 152, y = 340 + Math.floor(i / 6) * 150; X.fillStyle = '#fff'; rr(x - 60, y - 40, 120, 80, 10); X.fill(); txt('DAY ' + (100 + i * 37), x, y - 8, font('anton', 400, 22), '#e0601c'); txt('✓ opened', x, y + 20, font('inter', 700, 16), '#3aa35b'); } X.restore(); }
      R(t, 300, 1500, 0.5, { mood: 'shock' }); G(t, 760, 1510, 0.45, { mood: 'shock' }); F(t, 900, 1510, 0.42, { mood: 'shock' }); P(t, 540, t > Lt('p1') - 0.5 ? 1440 : 1520, 0.55, { mood: t > Lt('p1') ? 'neutral' : 'worried', calm: t > Lt('p1'), seed: 15 }, t < Lt('p1') ? { brows: 'sad' } : {});
      X.restore(); say(t, 'd1', 540, 1250, { size: 44, bg: '#2a0505', fg: '#ff9a9a', nosub: true }); say(t, 'p1', 540, 1100, { size: 50 }); }
    else if (t < Lt('p2') - 0.3) { // ---- the notification storm ----
      const who = t < Lt('d3') - 0.2 ? 'r' : t < Lt('d4') - 0.2 ? 'g' : 'f'; const ws = { r: [300, 1350, 1.6], g: [760, 1360, 1.7], f: [900, 1360, 1.8] };
      X.save(); keyCam(t, [[M.storm, 540, 1100, 1.0], [Lt('d2') - 0.3, ...ws.r], [Lt('d3') - 0.3, ...ws.g], [Lt('d4') - 0.3, ...ws.f]]); topFloor(t); directie(t, 540, 660, 0.4, { talk: dirTalk(t) });
      const calm = eo(lin(t, Lt('r1'), Lt('r1') + 1.2)); if (calm > 0) { const g = X.createRadialGradient(300, 1450, 10, 300, 1450, 260 * calm); g.addColorStop(0, 'rgba(255,200,80,0.5)'); g.addColorStop(1, 'rgba(255,200,80,0)'); X.fillStyle = g; X.fillRect(0, 1150, 600, 600); }
      R(t, 300, 1500, 0.5 + 0.12 * calm, { mood: t > Lt('r1') ? 'smug' : 'shock' }); G(t, 760, 1510, 0.45, { mood: t > Lt('g1') ? 'happy' : (t > Lt('d3') ? 'shock' : 'worried') }); F(t, 900, 1510, 0.42, { mood: t > Lt('f1') ? 'smug' : (t > Lt('d4') ? 'shock' : 'worried'), raise: t > Lt('f1') + 1.2 && t < Lt('f1') + 2.2 }); P(t, 540, 1520, 0.55, { mood: 'worried', seed: 15 });
      if (t > Lt('f1') + 1.4) for (let i = 0; i < 12; i++) { const d = t - Lt('f1') - 1.4; X.save(); X.translate(900 + (hash(i) - 0.5) * 600 * d, 1350 - 700 * d + 300 * d * d + hash(i * 3) * 100); X.rotate(d * (2 + i)); X.fillStyle = '#fffdf6'; rr(-40, -26, 80, 52, 6); X.fill(); X.fillStyle = '#e04848'; X.fillRect(-40, -14, 80, 3); X.restore(); }
      for (let i = 0; i < 22; i++) batBell(t, i, 540, 1100); X.restore();
      bigMsg(t, Lt('d2') - 0.1, Le('d2') + 0.4, "You're nothing at day zero.", 540, 560); bigMsg(t, Lt('d3') - 0.1, Le('d3') + 0.4, 'Nobody likes you without badges.', 540, 560); bigMsg(t, Lt('d4') - 0.1, Le('d4') + 0.4, "You can't even make a sentence.", 540, 560);
      say(t, 'r1', 380, 820, { size: 52 }); say(t, 'g1', 700, 800, { size: 48 }); say(t, 'f1', 760, 820, { size: 52 }); }
    else if (t < M.off) { // ---- four phones, one switch ----
      X.fillStyle = '#05050a'; X.fillRect(0, 0, W, H); const on = t > M.tap; const k = eo(lin(t, Lt('p2') - 0.3, Lt('p2') + 0.5));
      [[270, 820, -0.12], [810, 820, 0.12], [270, 1380, 0.08], [810, 1380, -0.08]].forEach(([x, y, r], i) => { phoneToggle(t, x, mix(y + 300, y, k), 0.8, on, r); if (!on && t > M.tap - 0.8) { X.fillStyle = ['#e0601c', '#3a8df0', '#fffdf6', '#6e1f2a'][i]; X.beginPath(); X.arc(x + 30, y + 160 - (M.tap - t) * 120, 30, 0, 7); X.fill(); } });
      if (on) { X.fillStyle = `rgba(255,255,255,${0.4 * (1 - lin(t, M.tap, M.tap + 0.3))})`; X.fillRect(0, 0, W, H); }
      say(t, 'p2', 540, 520, { size: 60 }); say(t, 'tr', 540, 1100, { size: 64 }); }
    else if (t < M.jar) { // ---- screens go out like dominoes; the Directie shrinks to a little bell ----
      const d = t - M.off; X.save(); cam(540, mix(900, 1420, eo(lin(d, 2.0, 4.0))), mix(1.0, 2.4, eo(lin(d, 2.0, 4.0)))); topFloor(t);
      const sc = d < 1.2 ? 0.4 : d < 2.2 ? 0.18 : d < 3.2 ? 0.08 : 0.03; const cy = d < 2.2 ? 660 : mix(660, 1460, eo(lin(d, 2.2, 3.4)));
      directie(t, 540, cy, sc, { talk: dirTalk(t) }); if (d < 1.4) { for (let r = -4; r <= 4; r++) for (let c = -3; c <= 3; c++) { const idx = (r + 4) * 7 + (c + 3); if (d * 45 > idx) { X.fillStyle = '#000'; rr(540 + (c * 150 - 70) * 0.4, 660 + (r * 150 - 70) * 0.4, 56, 56, 4); X.fill(); } } }
      R(t, 300, 1500, 0.55, { mood: 'smug' }); G(t, 760, 1510, 0.45, { mood: 'happy' }); F(t, 900, 1510, 0.42, { mood: 'happy' }); P(t, 420, 1520, 0.55, { mood: 'happy', calm: true, seed: 15 });
      X.restore(); say(t, 'd5', 540, 760, { size: mix(60, 30, lin(t, Lt('d5'), Le('d5'))), bg: '#2a0505', fg: '#ff9a9a', nosub: true }); if (t > M.ding && t < M.ding + 0.8) txt('ding.', 640, 1000, font('serif', 400, 54), '#ff9a9a'); }
    else if (t < M.party) { // ---- the jar ----
      X.save(); cam(560, 1380, 2.2); topFloor(t); directie(t, 540, 1460, 0.03, {}); jar(540, 1500, 0.6, lin(t, M.jar, M.jar + 0.6)); F(t, 700, 1450, 0.4, { mood: 'smug' }); X.restore(); say(t, 'f2', 640, 1000, { size: 56 }); }
    else if (t < M.stamp) { // ---- the party at La Esquina ----
      const cur = t < Lt('r2') - 0.4 ? 'w' : t < Lt('p3') - 0.2 ? 'r' : 'p'; const ws = { w: [540, 1000, 1.0], r: [700, 1100, 1.4], p: [440, 1150, 1.7] };
      X.save(); cam(...ws[cur]); toog(t); C(t, 780, 980, 0.5, { mood: 'warm' }); paco(t, 120, 1150, 0.4, { mood: 'laugh', talk: 0 }); marisol(t, 960, 1170, 0.45, { mood: 'happy' }); stagiair(t, 260, 1180, 0.42, { mood: 'happy' });
      planta(t, 620, 1110, 0.35); for (let i = 0; i < 10; i++) { X.fillStyle = '#ffd23d'; X.beginPath(); X.arc(590 + (i % 5) * 14, 1060 + Math.floor(i / 5) * 14, 6, 0, 7); X.fill(); }
      X.fillStyle = '#5a2e14'; X.fillRect(-500, 1230, W + 1000, 40); const cheer = t > Le('r2');
      P(t, 440, 1380, 0.55, { mood: 'happy', seed: 16, armsUp: cheer && t < Le('r2') + 1.5 }); R(t, 700, 1370, 0.6, { mood: cheer ? 'laugh' : 'smug', raise: t > Lt('r2') - 0.4 && t < Le('r2') }); G(t, 200, 1400, 0.45, { mood: cheer ? 'laugh' : 'happy' }); F(t, 900, 1400, 0.43, { mood: cheer ? 'laugh' : 'happy' });
      if (t > Lt('r2') - 0.4) { X.save(); X.translate(780, 1160); X.fillStyle = 'rgba(255,214,120,0.85)'; rr(-18, -50, 36, 70, 6); X.fill(); X.fillStyle = '#fff'; rr(-18, -56, 36, 12, 6); X.fill(); X.restore(); }
      if (cheer) for (let i = 0; i < 40; i++) { const k = ((t - Le('r2')) * 0.5 + hash(i)) % 1; X.fillStyle = ['#ff9af0', '#9af0ff', '#fff59a', '#ffd23d'][i % 4]; X.fillRect(hash(i * 3) * W, k * 1500 + 200, 14, 22); }
      X.restore(); say(t, 'r2', 700, 760, { size: 48 }); say(t, 'p3', 440, 860, { size: 64 }); }
    else if (t < M.flip) { passportShot(t, M.stamp, 8, 8, { photo: true }); }
    else if (t < M.empty) { const i = Math.min(8, Math.floor((t - M.flip) / 0.55)); passportShot(t, -10, 9, null, { photo: true });
      X.save(); X.translate(W / 2, 980); const [sx, sy] = [130 + (i % 2) * 230, -470 + Math.floor(i / 2) * 240]; X.strokeStyle = 'rgba(255,214,120,0.9)'; X.lineWidth = 10; X.beginPath(); X.arc(sx, sy, 118 + Math.sin(t * 10) * 4, 0, 7); X.stroke();
      if (t > M.flip + 5.0) { X.strokeStyle = 'rgba(255,214,120,0.9)'; X.strokeRect(-410, -430, 340, 280); } X.restore(); }
    else if (t < M.card) { // ---- later, the empty bar: an envelope ----
      X.save(); cam(560, 1120, 1.5); closedBar(t, 0.55); table(t); C(t, 780, 980, 0.5, { mood: 'warm' }); const k = eo(lin(t, M.empty + 0.6, M.empty + 1.6)); X.save(); X.translate(mix(780, 560, k), mix(1180, 1300, k)); X.rotate(-0.1); X.fillStyle = '#efe6d2'; rr(-80, -50, 160, 100, 6); X.fill(); X.strokeStyle = '#b8a888'; X.lineWidth = 3; X.beginPath(); X.moveTo(-80, -50); X.lineTo(0, 10); X.lineTo(80, -50); X.stroke(); X.restore();
      P(t, 400, 1260, 0.55, { mood: 'neutral', seed: 16, lookX: 1 }); X.restore(); say(t, 'c1', 760, 720, { size: 52 }); }
    else if (t < M.window) { X.fillStyle = '#1a0e08'; X.fillRect(0, 0, W, H); postcard(t, lin(t, M.card, M.card + 2.4)); }
    else if (t < M.s2) { // ---- the window: three friends with suitcases ----
      X.save(); keyCam(t, [[M.window, 380, 1050, 1.3], [Lt('r3') - 0.1, 300, 900, 1.4]]); closedBar(t, 0.5); X.save(); X.beginPath(); rr(60, 360, 300, 420, 16); X.clip(); X.fillStyle = '#1a2440'; X.fillRect(60, 360, 300, 420);
      R(t, 130, 690, 0.32, { mood: 'smug' }); G(t, 220, 700, 0.26, { mood: 'happy' }); F(t, 300, 700, 0.25, { mood: 'happy' }); X.fillStyle = '#c0392b'; rr(80, 720, 60, 50, 8); X.fill(); X.fillStyle = '#2f7fd0'; rr(250, 730, 50, 40, 8); X.fill(); X.restore();
      table(t); P(t, 560, 1240, 0.6, { mood: t > Lt('r3') + 0.5 ? 'happy' : 'o', seed: 16, lookX: -1, lookY: -0.6 }); X.save(); X.translate(640, 1300); X.rotate(-0.06); X.fillStyle = '#f6efe2'; rr(-70, -46, 140, 92, 6); X.fill(); X.restore();
      X.restore(); say(t, 'r3', 300, 520, { size: 52 }); }
    else { // ---- season 2 tag ----
      const k = lin(t, M.s2, M.s2 + 0.4); X.fillStyle = '#1a0a2a'; X.fillRect(0, 0, W, H); for (let i = 0; i < 18; i++) { X.fillStyle = 'rgba(255,79,160,0.08)'; X.fillRect(-160 + i * 80, 1300, 76, 76); }
      X.save(); X.translate(W / 2, 860); const s = back(k, 2.2); X.scale(s, s); X.shadowColor = '#ff4fa0'; X.shadowBlur = 30; txt('LA ESQUINA', 0, 0, font('bungee', 400, 128), '#ffd1df'); X.shadowBlur = 0; txt('TEMPORADA 2', 0, 150, font('anton', 400, 80), '#f6efe2'); txt('Tokio', 0, 240, font('serif', 400, 70), '#4ff0ff'); X.restore(); }
    X.restore(); titleCard(t, '12 · FINAL', 'La Esquina', '#7a1f35'); letterbox(); fadeEnd(t, DUR, 1.0);
  } };
})();
