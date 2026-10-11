// La Esquina · Ep. 8 — La Fuga
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep08');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'neutral', day: 'DAY 1216', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);

  // ---------- local sets ----------
  function alarmLight(t, a = 1) { const k = (Math.sin(t * 9) + 1) / 2; X.fillStyle = `rgba(255,30,30,${0.28 * k * a})`; X.fillRect(-500, -500, W + 1000, H + 1000); }
  function bellIcon(x, y, s, n, on) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = on ? '#ffd23d' : '#8a8f99'; X.beginPath(); X.moveTo(-40, 30); X.quadraticCurveTo(-40, -50, 0, -50); X.quadraticCurveTo(40, -50, 40, 30); X.lineTo(50, 40); X.lineTo(-50, 40); X.closePath(); X.fill(); X.beginPath(); X.arc(0, 50, 12, 0, 7); X.fill();
    X.fillStyle = '#e8322f'; X.beginPath(); X.arc(36, -40, 26, 0, 7); X.fill(); txt(String(n), 36, -38, font('inter', 900, 26), '#fff'); X.restore(); }
  function corridor(t, scroll, kind) { // kind 0: notification wall, 1: streak furnace
    X.fillStyle = kind ? '#1c1414' : '#e6eaf0'; X.fillRect(-500, -500, W + 1000, H + 1000);
    X.fillStyle = kind ? '#2a1a14' : '#cfd6df'; X.fillRect(-500, 1360, W + 1000, 900);
    X.fillStyle = kind ? '#3a2418' : '#bcc5d1'; for (let i = -2; i < 12; i++) X.fillRect(((i * 260 - scroll) % 2600 + 2600) % 2600 - 600, 1360, 8, 900);
    if (!kind) { for (let r = 0; r < 7; r++) for (let c = -1; c < 9; c++) { const x = ((c * 170 - scroll * 0.9) % 1700 + 1700) % 1700 - 300, y = 260 + r * 150; X.fillStyle = '#fff'; rr(x - 70, y - 70, 140, 140, 22); X.fill(); bellIcon(x, y, 0.8, 1 + Math.floor(hash(r * 31 + c * 7) * 99), Math.floor(t * 6 + r + c) % 3 !== 0); } }
    else { const names = ['@lucia_m', '@tomasz', '@aiko', '@bram.nl', '@fatima', '@joe_99', '@ines', '@kwame'];
      for (let c = -1; c < 7; c++) { const x = ((c * 330 - scroll * 0.9) % 2640 + 2640) % 2640 - 400, idx = ((Math.floor((c * 330 - scroll * 0.9) / 2640) * 8 + c) % 8 + 8) % 8;
        X.fillStyle = '#4a3428'; X.fillRect(x - 110, 1120, 220, 240); X.fillStyle = 'rgba(180,220,255,0.18)'; rr(x - 120, 760, 240, 360, 16); X.fill(); X.strokeStyle = '#8a7a6a'; X.lineWidth = 6; rr(x - 120, 760, 240, 360, 16); X.stroke();
        const fl = Math.sin(t * 10 + c) * 8; X.fillStyle = '#f26a1b'; X.beginPath(); X.moveTo(x, 900 + fl); X.bezierCurveTo(x + 50, 960, x + 60, 1040, x, 1080); X.bezierCurveTo(x - 60, 1040, x - 50, 960, x, 900 + fl); X.fill(); X.fillStyle = '#ffc23d'; X.beginPath(); X.ellipse(x, 1040, 24, 34, 0, 0, 7); X.fill();
        X.fillStyle = '#fff'; rr(x - 90, 1150, 180, 44, 10); X.fill(); txt('DAY ' + (12 + Math.floor(hash(idx * 13) * 900)), x, 1173, font('anton', 400, 30), '#e0601c'); txt(names[idx], x, 1240, font('inter', 800, 30), '#d8c3a0'); }
      const g = X.createRadialGradient(540, 1000, 100, 540, 1000, 1100); g.addColorStop(0, 'rgba(255,120,40,0.15)'); g.addColorStop(1, 'rgba(0,0,0,0.5)'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000); } }
  function exitDoor(t, open) { X.fillStyle = '#2b2f38'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#20232a'; X.fillRect(-500, 1360, W + 1000, 900);
    X.fillStyle = '#11141a'; X.fillRect(300, 560, 480, 800); const g = X.createLinearGradient(0, 560, 0, 1360); g.addColorStop(0, '#bfe4ff'); g.addColorStop(1, '#fff3d6'); X.fillStyle = g; X.fillRect(540 - 230 * open, 570, 460 * open, 790);
    X.fillStyle = '#5a6270'; X.fillRect(310 - 220 * open, 570, 230, 790); X.fillRect(540 + 220 * open, 570, 230, 790); X.fillStyle = '#3a8a4a'; rr(440, 450, 200, 80, 10); X.fill(); txt('SALIDA', 540, 492, font('anton', 400, 52), '#e6ffe6');
    if (open > 0) { X.save(); X.globalAlpha = 0.25 * open; X.fillStyle = '#fff6d6'; X.beginPath(); X.moveTo(540 - 230 * open, 570); X.lineTo(540 + 230 * open, 570); X.lineTo(1000, 1900); X.lineTo(80, 1900); X.closePath(); X.fill(); X.restore(); } }
  function scooter(t, x, y, s, lean = 0) { X.save(); X.translate(x, y + Math.sin(t * 30) * 3); X.scale(s, s); X.rotate(lean);
    [-150, 160].forEach((wx) => { X.fillStyle = '#222'; X.beginPath(); X.arc(wx, 60, 60, 0, 7); X.fill(); X.fillStyle = '#999'; X.beginPath(); X.arc(wx, 60, 22, 0, 7); X.fill(); X.strokeStyle = '#ddd'; X.lineWidth = 4; for (let k = 0; k < 3; k++) { const a = t * 30 + k * 2.1; X.beginPath(); X.moveTo(wx, 60); X.lineTo(wx + Math.cos(a) * 50, 60 + Math.sin(a) * 50); X.stroke(); } });
    X.fillStyle = '#f2c230'; X.beginPath(); X.moveTo(-210, 40); X.quadraticCurveTo(-220, -80, -80, -70); X.lineTo(80, -40); X.lineTo(120, 30); X.closePath(); X.fill(); X.fillRect(80, -260, 40, 300); X.fillStyle = '#333'; X.fillRect(60, -280, 120, 20); X.fillStyle = '#5a3a1a'; rr(-170, -110, 200, 40, 14); X.fill();
    X.fillStyle = '#c9a070'; rr(130, -230, 120, 90, 10); X.fill(); X.restore(); }
  function marketSet(t, scroll) { const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#9fd0f2'); g.addColorStop(1, '#f6e7cc'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
    const cols = ['#e8b98a', '#f2d2a0', '#d98c6a', '#efc9a0']; for (let i = -1; i < 8; i++) { const x = ((i * 300 - scroll * 0.4) % 2400 + 2400) % 2400 - 500, h = 700 + hash(i + 40) * 300; X.fillStyle = cols[(i + 4) % 4]; X.fillRect(x, 1100 - h, 290, h); X.fillStyle = '#3a4f6c'; for (let r = 0; r < 3; r++) X.fillRect(x + 60, 1100 - h + 80 + r * 180, 60, 100); }
    const aw = [['#d8322f', '#fff'], ['#2f7fd0', '#fff'], ['#3aa35b', '#fff59a'], ['#e0801c', '#fff']]; const fr = ['#f28a1b', '#e8322f', '#9ad04a', '#ffd23d'];
    for (let i = -1; i < 6; i++) { const x = ((i * 420 - scroll) % 2520 + 2520) % 2520 - 500, a = aw[((i % 4) + 4) % 4];
      X.fillStyle = '#7a5a3a'; X.fillRect(x, 1000, 14, 360); X.fillRect(x + 360, 1000, 14, 360); for (let k = 0; k < 6; k++) { X.fillStyle = a[k % 2]; X.beginPath(); X.moveTo(x - 20 + k * 68, 960); X.lineTo(x + 48 + k * 68, 960); X.lineTo(x + 48 + k * 68, 1060); X.arc(x + 14 + k * 68, 1060, 34, 0, Math.PI); X.fill(); }
      X.fillStyle = '#9a6a3a'; X.fillRect(x - 10, 1200, 390, 160); for (let k = 0; k < 14; k++) { X.fillStyle = fr[(((i % 4) + 4) % 4 + k) % 4]; X.beginPath(); X.arc(x + 14 + (k % 7) * 52, 1190 - Math.floor(k / 7) * 34, 26, 0, 7); X.fill(); } }
    X.fillStyle = '#d9c3a0'; X.fillRect(-500, 1360, W + 1000, 900); X.fillStyle = '#c9b190'; for (let i = 0; i < 24; i++) X.fillRect(((i * 90 - scroll) % 2160 + 2160) % 2160 - 300, 1380 + (i % 2) * 40, 80, 28); }
  function pigeon(t, x, y, s, fly) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#8a8f9a'; X.beginPath(); X.ellipse(0, 0, 50, 34, 0, 0, 7); X.fill(); X.beginPath(); X.arc(40, -26, 20, 0, 7); X.fill(); X.fillStyle = '#5a9a8a'; X.beginPath(); X.arc(34, -10, 12, 0, 7); X.fill();
    X.fillStyle = '#f2a03a'; X.beginPath(); X.moveTo(58, -26); X.lineTo(74, -20); X.lineTo(58, -18); X.fill(); X.fillStyle = INK; X.beginPath(); X.arc(46, -30, 4, 0, 7); X.fill();
    const w = fly ? Math.sin(t * 40 + x) * 1.0 : 0.15; X.fillStyle = '#6e737e'; X.save(); X.rotate(-w); X.beginPath(); X.ellipse(-10, -10, 54, 18, -0.3, 0, 7); X.fill(); X.restore(); X.restore(); }
  function comet(t, x, y, s) { X.save(); for (let i = 0; i < 14; i++) { const k = i / 14; X.fillStyle = `rgba(255,${140 + 80 * k | 0},40,${0.5 * (1 - k)})`; X.beginPath(); X.arc(x + 60 + i * 34 * s, y - 40 * k * s + Math.sin(t * 20 + i) * 8, (90 - 60 * k) * s, 0, 7); X.fill(); } X.restore(); }
  function metroCar(t, doors, xoff = 0) { X.fillStyle = '#2a2d36'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#e6e2d8'; X.fillRect(-500, 300, W + 1000, 80); txt('METRO', 540 + xoff * 0.2, 340, font('anton', 400, 56), '#c0392b');
    X.fillStyle = '#c9ced6'; rr(-100 + xoff, 520, 1280, 900, 40); X.fill(); X.fillStyle = '#c0392b'; X.fillRect(-100 + xoff, 1260, 1280, 30);
    X.fillStyle = '#9fb6c9'; rr(-40 + xoff, 600, 220, 260, 16); X.fill(); rr(900 + xoff, 600, 220, 260, 16); X.fill();
    X.fillStyle = '#ffe9b0'; X.fillRect(300 + xoff, 600, 480, 760); X.fillStyle = '#aeb5bf'; X.fillRect(300 + xoff, 600, 240 * doors, 760); X.fillRect(780 + xoff - 240 * doors, 600, 240 * doors, 760);
    X.fillStyle = 'rgba(160,200,230,0.6)'; if (doors > 0.05) { X.fillRect(340 + xoff, 660, Math.max(0, 240 * doors - 80), 300); X.fillRect(820 + xoff - 240 * doors, 660, Math.max(0, 240 * doors - 80), 300); }
    X.fillStyle = '#d0c8b8'; X.fillRect(-500, 1420, W + 1000, 900); X.fillStyle = '#f2c230'; X.fillRect(-500, 1420, W + 1000, 24); }
  function rooftop(t) { const g = X.createLinearGradient(0, 0, 0, 1400); g.addColorStop(0, '#3a3a6e'); g.addColorStop(0.45, '#e88a7a'); g.addColorStop(0.8, '#ffd59a'); g.addColorStop(1, '#fff0c8'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
    X.fillStyle = 'rgba(255,240,180,0.9)'; X.beginPath(); X.arc(760, 1040 - lin(t, M.roof, M.stamp) * 60, 110, 0, 7); X.fill();
    X.fillStyle = '#5a4060'; for (let i = 0; i < 12; i++) { const x = -200 + i * 130, h = 140 + hash(i + 7) * 260; X.fillRect(x, 1150 - h, 120, h + 10); }
    X.beginPath(); X.arc(300, 1000, 90, Math.PI, 0); X.fill(); X.fillRect(210, 1000, 180, 160); X.fillRect(296, 860, 8, 60); X.fillRect(620, 820, 70, 340); X.beginPath(); X.moveTo(610, 820); X.lineTo(655, 740); X.lineTo(700, 820); X.fill();
    X.fillStyle = '#7a5040'; X.fillRect(-500, 1150, W + 1000, 900); X.fillStyle = '#b26a4a'; for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) { X.beginPath(); X.arc(-100 + c * 110 + (r % 2) * 55, 1200 + r * 70, 52, Math.PI, 0); X.fill(); }
    X.fillStyle = '#c9a080'; X.fillRect(-500, 1150, W + 1000, 40); }
  function curbNight(t) { X.fillStyle = '#0d0f18'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#1a1d2a'; for (let i = 0; i < 6; i++) X.fillRect(-200 + i * 260, 300 + hash(i) * 200, 240, 1100);
    X.fillStyle = '#ffd98a'; for (let i = 0; i < 6; i++) for (let r = 0; r < 6; r++) if (hash(i * 11 + r) > 0.75) X.fillRect(-160 + i * 260 + (r % 2) * 100, 420 + r * 150, 50, 70);
    X.fillStyle = '#222'; X.fillRect(796, 500, 16, 900); X.fillRect(700, 500, 112, 14); X.fillStyle = '#ffe9a8'; X.beginPath(); X.arc(700, 520, 20, 0, 7); X.fill();
    const g = X.createRadialGradient(640, 1300, 40, 640, 1300, 520); g.addColorStop(0, 'rgba(255,220,140,0.35)'); g.addColorStop(1, 'rgba(255,220,140,0)'); X.fillStyle = g; X.beginPath(); X.moveTo(700, 520); X.lineTo(1100, 1500); X.lineTo(250, 1500); X.closePath(); X.fill();
    X.fillStyle = '#2a2d36'; X.fillRect(-500, 1380, W + 1000, 60); X.fillStyle = '#15171f'; X.fillRect(-500, 1440, W + 1000, 900); X.fillStyle = 'rgba(255,220,140,0.15)'; X.fillRect(300, 1460, 600, 20); }
  function grip(x0, y0, x1, y1) { X.strokeStyle = '#3a8df0'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(x0, y0); X.lineTo(x1, y1); X.stroke(); }

  // ---------- timing ----------
  const T0 = 1.4, hitE = M.crumble, hitM = M.metro - 0.5;
  const cues = [['hum', 1.5, 0.5], ['ratchet', 2.0, 0.4], ['whoosh', 3.0, 0.4], ['impact', hitE, 0.9], ['boom', hitE, 0.4], ['scratch', M.free, 0.5], ['glitch', Lt('d1') - 0.3, 0.6], ['buzz', M.run - 0.2, 0.5], ['whoosh', M.run, 0.4],
    ['whoosh', M.furnace, 0.3], ['hum', M.furnace + 0.2, 0.5], ['whoosh', M.door, 0.4], ['click', Le('f1') - 0.1, 0.9], ['swell', Le('f1'), 0.5], ['whoosh', M.ride, 0.5], ['whoosh', M.market, 0.4], ['riser', M.comet - 0.4, 0.4],
    ['flaplong', M.comet + 1.2, 0.7], ['flap', M.comet + 1.5, 0.6], ['whoosh', M.metro - 1.6, 0.4], ['shutter', M.metro - 0.9, 0.6], ['impact', hitM, 0.8], ['wahwah', hitM + 0.3, 0.3],
    ['vibrate', M.revoked - 0.8, 0.7], ['glitch', M.revoked + 0.6, 0.6], ['fail', M.revoked + 1.0, 0.4], ['whoosh', M.roof, 0.3], ['stamp', M.stamp + 0.55, 1.0], ['whoosh', M.hook, 0.2]];
  window.CUES = { dur: DUR, cues, sfx_gain: 0.38 };
  const hits = [hitE, hitM, M.stamp + 0.55];

  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, hits, [M.run, M.door, M.ride, M.roof], 14);
    if (t < M.run) { // ---- cellar: the eraser vs a rock ----
      const stand = t > M.free + 0.6; const rope = t < M.free;
      X.save(); keyCam(t, [[0, 540, 1050, 1.0], [2.6, 560, 1050, 1.25], [hitE + 0.3, 560, 1000, 1.25], [Lt('r1') - 0.1, 320, 1150, 1.8], [Lt('g2') - 0.1, 560, 1100, 1.4], [Lt('d1') - 0.6, 540, 1000, 1.0]]);
      cellar(t); if (t > Lt('d1') - 0.4) { const open = eo(lin(t, Lt('d1') - 0.4, Lt('d1') + 0.2)); X.save(); X.beginPath(); X.rect(540 - 420 * open, 200, 840 * open, 600); X.clip(); X.fillStyle = '#05050a'; X.fillRect(0, 200, W, 600); directie(t, 540, 500, 0.4, { talk: speaking('directie', t) }); X.restore(); alarmLight(t); }
      chair(560, 1300, 0.9); P(t, 560, stand ? 1240 : 1220, 0.75, { mood: t < hitE ? 'worried' : (t < M.free ? 'o' : 'neutral'), wide: t < hitE + 1, sweat: t < hitE, seed: 3 });
      if (rope) { X.strokeStyle = '#c9a84a'; X.lineWidth = 8; X.beginPath(); X.moveTo(470, 1240); X.lineTo(650, 1240); X.stroke(); } else if (t < M.free + 1.2) { const k = t - M.free; X.strokeStyle = '#c9a84a'; X.lineWidth = 8; X.beginPath(); X.moveTo(470 - k * 160, 1240 + k * 200); X.lineTo(540 - k * 120, 1250 + k * 260); X.moveTo(650 + k * 160, 1240 + k * 200); X.lineTo(580 + k * 120, 1250 + k * 260); X.stroke(); }
      R(t, 280, 1250, 0.75, { mood: t > hitE && t < M.free + 1 ? 'shock' : 'neutral' }); F(t, 980, 1300, 0.45, { mood: t > hitE ? 'shock' : 'worried' });
      // gem leaps from the right onto the hero's head, arms up
      const lk = eo(lin(t, 2.6, 3.3)), gx = mix(860, 560, lk), gy = t < 2.6 ? 1290 : (t < M.free - 0.6 ? mix(1290, 1000, lk) - Math.sin(lk * Math.PI) * 220 : mix(1000, 1290, eo(lin(t, M.free - 0.6, M.free - 0.1))));
      const gx2 = t < M.free - 0.6 ? gx : mix(560, 720, eo(lin(t, M.free - 0.6, M.free - 0.1)));
      G(t, gx2, gy, 0.5, { mood: t < 2.6 ? 'worried' : (t < hitE + 0.6 ? 'shock' : 'happy'), raise: t > 3.0 && t < hitE + 1.4, lookX: t < 2.6 ? -1 : 0 });
      if (t > hitE && t < hitE + 1.2) { X.save(); X.translate(gx2, gy - 80); const k = (t - hitE) / 1.2; X.strokeStyle = `rgba(255,255,255,${1 - k})`; X.lineWidth = 6; for (let i = 0; i < 10; i++) { const a = i * 0.63; X.beginPath(); X.moveTo(Math.cos(a) * 100, Math.sin(a) * 100); X.lineTo(Math.cos(a) * (140 + k * 200), Math.sin(a) * (140 + k * 200)); X.stroke(); } X.restore(); }
      // the eraser: comes down, hits the gem, crumbles
      if (t < hitE) eraser(t, 560, mix(520, 900, ei(lin(t, T0, hitE))), 0.9, 1);
      else { const up = mix(900, 200, eo(lin(t, hitE + 0.4, hitE + 1.6))); X.fillStyle = '#6c757d'; X.fillRect(560 - 13, up - 1500, 26, 1400); X.fillStyle = '#9aa3ad'; rr(560 - 72, up - 126, 144, 36, 10); X.fill();
        for (let i = 0; i < 16; i++) { const d = t - hitE, vx = (hash(i * 3) - 0.5) * 900, vy = -300 - hash(i * 5) * 500; const x = 560 + vx * d, y = 890 + vy * d + 1400 * d * d; if (y > 1420) continue; X.save(); X.translate(x, y); X.rotate(d * 8 + i); X.fillStyle = i % 4 ? '#f2a0b0' : '#4a7ad0'; X.fillRect(-18, -12, 36, 24); X.restore(); } }
      X.restore(); if (t > hitE && t < hitE + 0.9) comic(t, hitE, 'CRUNCH', 540, 520, '#f2a0b0', 120);
      say(t, 'g1', 560, 640, { size: 66 }); say(t, 'r1', 320, 780, { size: 54 }); say(t, 'g2', 640, 760, { size: 56 }); say(t, 'd1', 540, 1600, { size: 54, bg: '#2a0505', fg: '#ff9a9a', nosub: true }); }
    else if (t < M.door) { // ---- the corridors: bells, then the furnace ----
      const kind = t > M.furnace ? 1 : 0, slow = kind && t > Lt('p1') - 0.4 && t < Lt('g3') + 0.3; const sp = slow ? 260 : 1100; const scroll = (t - M.run) * 1100 - (slow ? (t - (Lt('p1') - 0.4)) * 840 : 0) - (t > Lt('g3') + 0.3 ? (Lt('g3') + 0.7 - Lt('p1')) * 840 : 0);
      X.save(); keyCam(t, [[M.run, 540, 1080, 1.1], [Lt('p1') - 0.3, 600, 1120, 1.4], [Lt('g3') + 0.4, 540, 1080, 1.1]]); corridor(t, scroll, kind); if (!kind) alarmLight(t, 0.7);
      const px = slow ? mix(640, 560, eo(lin(t, Lt('p1') - 0.4, Lt('p1')))) : 640; P(t, px, 1290, 0.8, { walk: !slow, mood: 'worried', lookX: slow ? -1 : 0, seed: 4 }, slow ? { brows: 'sad' } : {});
      G(t, 860, 1310, 0.55, { mood: slow ? 'sad' : 'worried', point: t > Lt('g3') && t < Le('g3') }); planta(t, 960, 1250, 0.42, { tilt: Math.sin(t * 12) * 0.08 });
      if (t > Lt('g3') && t < Le('g3') + 0.3) grip(px + 80, 1220, 820, 1270);
      if (!slow) for (let i = 0; i < 3; i++) badgeBot(t, mix(-300, 180, cl((t - M.run) / 2.5)) - i * 190 + Math.sin(t * 5 + i) * 20, 1310, 0.65);
      if (!slow) speedLines(t, 0.25, 18, 3000); X.restore();
      say(t, 'p1', 560, 680, { size: 56 }); say(t, 'g3', 820, 760, { size: 60 }); }
    else if (t < M.ride) { // ---- the exit: Ficha decides ----
      const open = eo(lin(t, Le('f1') - 0.1, Le('f1') + 0.8)); const arr = eo(lin(t, M.door + 0.6, M.door + 1.4));
      const cur = t < Lt('r2') + 0.1 ? 'w' : t < Lt('p2') - 0.1 ? 'r' : t < Lt('f1') - 0.1 ? 'p' : t < Le('f1') - 0.2 ? 'f' : 'w';
      const ws = { w: [540, 1050, 1.0], r: [200, 1150, 1.7], p: [420, 1150, 1.8], f: [760, 1150, 1.9] };
      X.save(); keyCam(t, [[M.door, ...ws.w], [Lt('r2') + 0.1, ...ws.r], [Lt('p2') - 0.1, ...ws.p], [Lt('f1') - 0.1, ...ws.f], [Le('f1') - 0.2, ...ws.w]]); exitDoor(t, open);
      F(t, 760 + 200 * open, 1290, 0.55, { mood: t > Le('f1') - 1.2 ? 'happy' : (t > Lt('p2') ? 'worried' : 'neutral'), point: t > Le('f1') - 0.6 && t < Le('f1') + 0.6 });
      P(t, mix(-100, 420, arr), 1290, 0.65, { walk: arr < 1, mood: t > Lt('p2') ? 'neutral' : 'worried', calm: t > Lt('p2'), seed: 5 }); G(t, mix(-260, 260, arr), 1300, 0.42, { mood: 'worried' }); planta(t, mix(-200, 300, arr), 1330, 0.3);
      const ra = eo(lin(t, Lt('r2') - 0.6, Lt('r2'))); R(t, mix(-300, 120, ra), 1270, 0.6, { mood: 'shock', point: t > Lt('r2') && t < Le('r2') });
      if (open > 0.3) { for (let i = 0; i < 3; i++) badgeBot(t, mix(-500, 60, ra) - i * 160, 1300, 0.45); }
      X.restore(); say(t, 'r2', 260, 760, { size: 54 }); say(t, 'p2', 420, 740, { size: 64 }); say(t, 'f1', 760, 780, { size: 50 }); }
    else if (t < M.metro) { // ---- the getaway: scooter, market, the comet, the metro ----
      const ride = t < M.metro - 1.7; const scroll = (t - M.ride) * 1500;
      if (ride) { X.save(); keyCam(t, [[M.ride, 540, 1100, 1.0], [Lt('g4') - 0.1, 560, 1150, 1.4], [M.market, 540, 1000, 1.0], [M.comet + 0.2, 420, 900, 0.95]]);
        if (t < M.market) { streetDay(t); X.save(); X.translate(-((scroll * 0.6) % 230), 0); X.restore(); } else marketSet(t, scroll);
        speedLines(t, 0.3, 22, 3200);
        const bx = 520 + Math.sin(t * 2) * 30; scooter(t, bx, 1300, 0.9, -0.04); P(t, bx + 20, 1130, 0.5, { mood: 'happy', calm: true, seed: 6 }); G(t, bx - 110, 1160, 0.36, { mood: 'happy', raise: t > Lt('g4') && t < Le('g4') + 0.3 }); planta(t, bx + 170, 1080, 0.25, { tilt: Math.sin(t * 9) * 0.1 });
        if (t > M.market) { for (let i = 0; i < 9; i++) { const sx = 900 - ((t - M.market) * 700 + i * 140) % 1600 + 400, fly = t > M.comet + 1.2; const lift = fly ? (t - M.comet - 1.2) * (500 + hash(i) * 400) : 0; pigeon(t, ((sx % 1600) + 1600) % 1600 - 300 + (fly ? (hash(i * 9) - 0.5) * lift : 0), 1330 - lift, 0.6, fly); } }
        if (t > M.comet - 0.6) { const k = lin(t, M.comet - 0.6, M.metro - 1.7), cx = mix(1300, 640, eo(k)), cy = mix(300, 620, k) + Math.sin(t * 6) * 30; comet(t, cx, cy, 0.9); R(t, cx, cy, 0.42, { mood: 'shock', day: 'DAY 1216', point: true }); }
        X.restore(); say(t, 'g4', 420, 860, { size: 56 }); say(t, 'r3', 640, 340, { size: 60 }); }
      else { const doors = 1 - eo(lin(t, M.metro - 1.0, M.metro - 0.6)); X.save(); keyCam(t, [[M.metro - 1.7, 540, 1050, 1.0], [hitM, 540, 1000, 1.1]]); metroCar(t, doors);
        X.save(); X.beginPath(); X.rect(300, 600, 480, 760); X.clip(); P(t, 470, 1280, 0.5, { mood: 'o', wide: true, seed: 6 }); G(t, 620, 1290, 0.36, { mood: 'shock' }); planta(t, 690, 1310, 0.24); X.restore();
        if (t > M.metro - 1.4) { const k = lin(t, M.metro - 1.4, hitM), rx = mix(1400, 640, eo(k)); if (t < hitM) { comet(t, rx, 900, 0.9); R(t, rx, 900, 0.55, { mood: 'shock' }); } else { X.save(); X.translate(780, 900); X.scale(0.55, 1.0); R(t, 0, 0, 0.7, { mood: 'shock', ko: true }); X.restore(); } }
        X.restore(); if (t > hitM && t < hitM + 0.9) comic(t, hitM, 'SPLAT', 760, 520, '#ffd23d', 120); } }
    else if (t < M.roof) { // ---- revoked ----
      if (t < M.revoked - 1.0) { X.save(); cam(540, 1100, 1.2); metroCar(t, 0, -(t - M.metro) * 900); R(t, 640, 1280, 0.7, { mood: 'sad', lookX: -1 }); X.restore(); }
      else { X.fillStyle = '#1a1d26'; X.fillRect(0, 0, W, H); phoneUI(t, W / 2, 860, 620, (w, h) => { X.fillStyle = '#f2f2f4'; X.fillRect(-w, -h, 2 * w, 2 * h); const k = eo(lin(t, M.revoked - 0.8, M.revoked - 0.4));
          X.save(); X.translate(0, mix(-h / 2 - 200, -h / 2 + 260, k)); X.fillStyle = '#fff'; rr(-w / 2 + 30, -110, w - 60, 260, 26); X.fill(); X.fillStyle = '#e8322f'; X.beginPath(); X.arc(-w / 2 + 90, -40, 30, 0, 7); X.fill(); txt('HQ', -w / 2 + 90, -38, font('inter', 900, 24), '#fff');
          X.textAlign = 'left'; X.fillStyle = INK; X.font = font('inter', 800, 40); X.fillText('Your access has', -w / 2 + 140, -48); X.fillText('been revoked.', -w / 2 + 140, 0); X.font = font('inter', 600, 36); X.fillStyle = '#555'; X.fillText('Thank you for your streak.', -w / 2 + 56, 96); X.textAlign = 'center'; X.restore(); });
        if (t > M.revoked + 1.6) { const g = eo(lin(t, M.revoked + 2.0, M.revoked + 3.2)); X.fillStyle = `rgba(10,10,16,${cl((t - M.revoked - 1.6) * 4)})`; X.fillRect(0, 0, W, H); X.save(); X.translate(540, 960); X.scale(5, 5);
          X.fillStyle = g > 0.5 ? '#9a9a9a' : '#fff'; rr(-62, -17, 124, 34, 17); X.fill(); txt(g > 0.5 && Math.floor(t * 8) % 2 ? 'DAY ----' : 'DAY 1216', 0, 1, font('anton', 400, 24), `rgb(${mix(224, 90, g) | 0},${mix(96, 90, g) | 0},${mix(28, 90, g) | 0})`); X.restore(); }
      } }
    else if (t < M.stamp) { // ---- rooftop, dawn ----
      X.save(); keyCam(t, [[M.roof, 540, 1000, 1.0], [Lt('g5') - 0.1, 500, 1080, 1.35], [Lt('p3') - 0.1, 600, 1080, 1.5], [Lt('g6') - 0.1, 500, 1080, 1.5]]); rooftop(t);
      P(t, 640, 1180, 0.6, { mood: 'happy', calm: true, seed: 7, lookX: t > Lt('g5') ? -0.6 : 0 }); G(t, 440, 1210, 0.45, { mood: t > Lt('g6') + 1.2 ? 'happy' : 'neutral', lookX: t > Lt('p3') ? 0.6 : 0 }); planta(t, 830, 1210, 0.4);
      X.restore(); say(t, 'g5', 460, 760, { size: 52 }); say(t, 'p3', 640, 760, { size: 60 }); say(t, 'g6', 460, 760, { size: 62 }); }
    else if (t < M.hook) { passportShot(t, M.stamp, 4, 4); }
    else { // ---- hook: Racha alone on the curb ----
      X.save(); keyCam(t, [[M.hook, 560, 1150, 1.0], [DUR - 0.6, 620, 1230, 1.6]]); curbNight(t); rain(t, 0.4);
      R(t, 620, 1300, 0.75, { mood: 'sad', lookY: 1, day: 'DAY ----' }); X.restore(); desat(0.35); vignette(0.6); }
    X.restore(); titleCard(t, 8, 'La Fuga', '#3a1414'); letterbox(); fadeEnd(t, DUR, 0.8);
  } };
})();
