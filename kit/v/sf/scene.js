// SF · "The comeback" — 2D short film. Bar → sad walk → montage inside the app → comeback.
window.ready = (async () => {
  await loadFonts();
  await loadImages({ path: 'app/madrid_path_full_s.jpg', les0: 'app/madrid_lesson_0.png', les2: 'app/madrid_lesson_2.png', over: 'app/madrid_overview.png', pass: 'app/madrid_passport.png', words: 'app/madrid_words.png' });
  const T = { bar: 0, gem1: 0.4, flame1: 1.5, fail: 3.3, laugh: 7.4, card1: 9.5, street: 11.3, buzz: 14.5, phone: 15.2, mont: 16.0, again: 19.5, ghost1: 21.0, punch1: 21.7, ghost2: 22.5, punch2: 23.2, night: 23.4, tomorrow: 24.0, stamps: 26.0, top: 27.0, back: 28.4, door: 28.5, flame3: 29.6, win: 30.8, crack1: 33.0, crack2: 33.6, crack3: 34.2, run: 34.9, alone: 36.0, vale: 36.6, end: 38.4 };
  window.T = T; const DUR = T.end; window.DURATION = DUR;
  const INK = '#1f1a14', CREAM = '#f6efe2', OR = '#ee8b47';

  // ---------- characters ----------
  function face(m, ex = 40, ey = -10, s = 1) { // generic eyes+mouth; m: {mood, t}
    const laugh = m.mood === 'laugh', shock = m.mood === 'shock', smug = m.mood === 'smug';
    X.lineCap = 'round';
    if (laugh) { X.strokeStyle = INK; X.lineWidth = 7; [-ex, ex].forEach((x) => { X.beginPath(); X.arc(x, ey + 8, 16, Math.PI * 1.15, Math.PI * 1.85); X.stroke(); }); }
    else { [-ex, ex].forEach((x) => { X.fillStyle = '#fff'; X.beginPath(); X.ellipse(x, ey, 20, shock ? 28 : 22, 0, 0, 7); X.fill(); X.fillStyle = INK; X.beginPath(); X.arc(x + (m.lookX || 0) * 6, ey + 3 + (m.lookY || 0) * 6, shock ? 7 : 10, 0, 7); X.fill(); }); }
    if (smug && !m.noLids) { X.fillStyle = m.lid || '#000'; [-ex, ex].forEach((x) => { X.fillRect(x - 24, ey - 26, 48, 18); }); }
    X.fillStyle = INK;
    if (laugh) { X.beginPath(); X.moveTo(-34, ey + 38); X.quadraticCurveTo(0, ey + 110, 34, ey + 38); X.closePath(); X.fill(); X.fillStyle = '#e8506a'; X.beginPath(); X.ellipse(0, ey + 74, 16, 9, 0, 0, 7); X.fill();
      X.fillStyle = '#7fc4e8'; const k = (m.t * 3) % 1; [-ex - 16, ex + 16].forEach((x) => { X.beginPath(); X.arc(x, ey + 20 + k * 40, 7, 0, 7); X.fill(); }); }
    else if (shock) { X.beginPath(); X.ellipse(0, ey + 62, 20, 30, 0, 0, 7); X.fill(); }
    else if (smug) { X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); X.moveTo(-26, ey + 50); X.quadraticCurveTo(10, ey + 66, 30, ey + 40); X.stroke(); }
    else { X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); X.moveTo(-20, ey + 52); X.lineTo(22, ey + 52); X.stroke(); }
  }
  function bounce(m) { return m.mood === 'laugh' ? Math.abs(Math.sin(m.t * 16)) * -18 : Math.sin(m.t * 3) * 3; }
  function arms(col, m, w = 100) { X.strokeStyle = col; X.lineWidth = 14; X.lineCap = 'round'; const up = m.mood === 'laugh' ? Math.sin(m.t * 16) * 20 : 0;
    X.beginPath(); X.moveTo(-w, 40); X.lineTo(-w - 40, 90 - up); X.stroke(); X.beginPath(); X.moveTo(w, 40); X.lineTo(w + 40, m.point ? -10 : 90 + up); X.stroke(); }
  function flame(t, x, y, s, m) { // streak-obsessed flame, sunglasses
    m.t = t; const shrink = m.out != null ? 1 - 0.6 * eo(lin(t, m.out, m.out + 0.5)) : 1;
    X.save(); X.translate(x, y + bounce(m)); X.scale(s, s * shrink);
    arms('#e0601c', m, 90);
    const fl = (k) => Math.sin(t * 9 + k) * 12;
    X.fillStyle = shrink < 1 ? '#8a5a3a' : '#f26a1b'; X.beginPath(); X.moveTo(0, -190 + fl(0)); X.bezierCurveTo(60 + fl(1), -120, 120, -40, 110, 50); X.arc(0, 50, 110, 0, Math.PI); X.bezierCurveTo(-120, -40, -40 + fl(2), -80, -30, -140 + fl(3)); X.bezierCurveTo(-20, -100, 10, -120, 0, -190 + fl(0)); X.fill();
    X.fillStyle = shrink < 1 ? '#a07050' : '#ffc23d'; X.beginPath(); X.moveTo(0, -90 + fl(4)); X.bezierCurveTo(50, -40, 80, 20, 70, 70); X.arc(0, 70, 70, 0, Math.PI); X.bezierCurveTo(-80, 20, -50, -40, 0, -90 + fl(4)); X.fill();
    face(m, 40, 0);
    if (m.shades) { X.fillStyle = '#111'; rr(-72, -22, 62, 40, 12); X.fill(); rr(10, -22, 62, 40, 12); X.fill(); X.fillRect(-12, -10, 24, 7); }
    X.fillStyle = '#fff'; rr(-62, 116, 124, 34, 17); X.fill(); txt('DAY 1204', 0, 134, font('anton', 400, 24), '#e0601c');
    X.restore();
    if (m.out != null && t > m.out) { for (let i = 0; i < 5; i++) { const k = ((t - m.out) * 0.8 + i * 0.2) % 1; X.fillStyle = `rgba(200,200,200,${0.6 * (1 - k)})`; X.beginPath(); X.arc(x + Math.sin(i * 2 + t * 2) * 30, y - 120 * s - k * 220, 24 + k * 40, 0, 7); X.fill(); } }
  }
  function card(t, x, y, s, m) { // know-it-all flashcard with glasses
    m.t = t; X.save(); X.translate(x, y + bounce(m)); X.rotate(m.crack != null && t > m.crack ? -0.08 : 0); X.scale(s, s);
    arms('#ffffff', m, 100);
    X.fillStyle = 'rgba(0,0,0,0.2)'; rr(-100, -150, 210, 280, 20); X.fill();
    X.fillStyle = '#fffdf6'; rr(-110, -160, 210, 280, 20); X.fill(); X.fillStyle = '#e04848'; X.fillRect(-110, -110, 210, 5);
    X.strokeStyle = 'rgba(70,120,220,0.35)'; X.lineWidth = 3; for (let i = 0; i < 4; i++) { X.beginPath(); X.moveTo(-100, -70 + i * 50 + 60); X.lineTo(90, -70 + i * 50 + 60); X.stroke(); }
    txt('hola = hi', -5, -132, font('caveat', 700, 34), '#3a5bd0');
    face(m, 38, -40);
    X.strokeStyle = INK; X.lineWidth = 6; [-38, 38].forEach((ex) => { X.beginPath(); X.arc(ex, -40, 30, 0, 7); X.stroke(); }); X.beginPath(); X.moveTo(-8, -42); X.lineTo(8, -42); X.stroke();
    if (m.crack != null && t > m.crack) { X.strokeStyle = INK; X.lineWidth = 3; [[-38, -40], [38, -40]].forEach(([cx, cy]) => { X.beginPath(); X.moveTo(cx - 20, cy - 20); X.lineTo(cx + 2, cy); X.lineTo(cx - 6, cy + 10); X.lineTo(cx + 18, cy + 24); X.moveTo(cx + 2, cy); X.lineTo(cx + 22, cy - 8); X.stroke(); }); }
    X.restore();
  }
  function gem(t, x, y, s, m) { // shiny reward gem
    m.t = t; X.save(); X.translate(x, y + bounce(m)); X.scale(s, s);
    arms('#3a8df0', m, 95);
    X.fillStyle = '#3a8df0'; X.beginPath(); X.moveTo(-110, -60); X.lineTo(-60, -150); X.lineTo(60, -150); X.lineTo(110, -60); X.lineTo(0, 150); X.closePath(); X.fill();
    X.fillStyle = '#7dc0ff'; X.beginPath(); X.moveTo(-60, -150); X.lineTo(60, -150); X.lineTo(30, -60); X.lineTo(-30, -60); X.closePath(); X.fill();
    X.strokeStyle = 'rgba(255,255,255,0.45)'; X.lineWidth = 4; X.beginPath(); X.moveTo(-110, -60); X.lineTo(110, -60); X.moveTo(-30, -60); X.lineTo(0, 150); X.lineTo(30, -60); X.stroke();
    const sp = (t * 0.7) % 1; X.fillStyle = `rgba(255,255,255,${1 - sp})`; X.save(); X.translate(-60, -110); X.rotate(sp * 3); X.fillRect(-3, -16, 6, 32); X.fillRect(-16, -3, 32, 6); X.restore();
    face(m, 36, -10);
    if (m.crack != null && t > m.crack) { X.strokeStyle = '#0b2a5a'; X.lineWidth = 5; X.beginPath(); X.moveTo(-100, -70); X.lineTo(-40, -20); X.lineTo(-60, 30); X.lineTo(10, 80); X.lineTo(-5, 140); X.stroke(); }
    X.restore();
  }
  const hero = (t, x, y, s, st) => HOST.draw(t, x, y, s, st);

  // ---------- sets ----------
  function bar(t, dark = 0) {
    const g = X.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#5a1f14'); g.addColorStop(1, '#a8482a'); X.fillStyle = g; X.fillRect(-400, -400, W + 800, 1700);
    // string lights
    for (let i = 0; i < 16; i++) { const x = -200 + i * 100, y = 170 + Math.sin(i * 0.9) * 18; X.fillStyle = `rgba(255,214,120,${0.6 + 0.4 * Math.sin(t * 3 + i)})`; X.beginPath(); X.arc(x, y, 9, 0, 7); X.fill(); }
    // neon sign
    X.save(); X.shadowColor = '#ff6a9a'; X.shadowBlur = 30; txt('LA ESQUINA', W / 2, 300, font('bungee', 400, 80), '#ffd1df'); X.restore();
    txt('· BAR · TAPAS · MADRID ·', W / 2, 380, font('bebas', 400, 40), '#ffd8a0', { ls: 6 });
    // shelves + bottles
    for (let r = 0; r < 3; r++) { const y = 520 + r * 150; X.fillStyle = '#3b170e'; X.fillRect(-100, y, W + 200, 14); for (let i = 0; i < 14; i++) { const x = -40 + i * 85 + (r % 2) * 40, h = 70 + hash(i * 3 + r) * 50; X.fillStyle = ['#2f6b3a', '#8c2a2a', '#d9a441', '#3a4f8c'][Math.floor(hash(i + r * 7) * 4)]; rr(x, y - h, 34, h, 8); X.fill(); X.fillRect(x + 11, y - h - 26, 12, 30); } }
    // azulejo band
    for (let i = 0; i < 18; i++) { const x = -160 + i * 80; X.fillStyle = '#f2ead9'; X.fillRect(x, 1040, 76, 76); X.strokeStyle = '#2d5aa8'; X.lineWidth = 5; X.beginPath(); X.arc(x + 38, 1078, 22, 0, 7); X.stroke(); X.beginPath(); X.moveTo(x + 38, 1048); X.lineTo(x + 38, 1108); X.moveTo(x + 8, 1078); X.lineTo(x + 68, 1078); X.stroke(); }
    // floor
    for (let r = 0; r < 12; r++) for (let c = -2; c < 16; c++) { X.fillStyle = (r + c) % 2 ? '#9c4a2a' : '#b85d36'; X.fillRect(c * 80 - 40, 1300 + r * 70, 80, 70); }
    if (dark) { X.fillStyle = `rgba(0,0,0,${dark})`; X.fillRect(-400, -400, W + 800, H + 800); }
  }
  function table(t, empty = false) {
    X.fillStyle = 'rgba(0,0,0,0.25)'; X.beginPath(); X.ellipse(550, 1420, 470, 80, 0, 0, 7); X.fill();
    X.fillStyle = '#6b3a1e'; X.beginPath(); X.ellipse(540, 1360, 470, 90, 0, 0, 7); X.fill(); X.fillStyle = '#8a4e2a'; X.beginPath(); X.ellipse(540, 1350, 450, 76, 0, 0, 7); X.fill();
    if (!empty) [[260, '#f2c14e'], [470, '#f2c14e'], [660, '#f2c14e']].forEach(([x, c]) => { X.fillStyle = 'rgba(255,255,255,0.6)'; rr(x - 26, 1250, 52, 90, 10); X.fill(); X.fillStyle = c; rr(x - 22, 1270, 44, 66, 8); X.fill(); X.fillStyle = '#fff'; rr(x - 24, 1254, 48, 20, 8); X.fill(); });
    X.fillStyle = '#fff'; X.beginPath(); X.ellipse(820, 1340, 70, 18, 0, 0, 7); X.fill(); for (let i = 0; i < 8; i++) { X.fillStyle = '#e8a33c'; X.fillRect(780 + hash(i) * 70, 1318 + hash(i * 3) * 14, 18, 18); X.fillStyle = '#c0392b'; X.fillRect(784 + hash(i) * 70, 1316 + hash(i * 3) * 14, 10, 6); }
  }
  function street(t) {
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0b1426'); g.addColorStop(1, '#1d2a44'); X.fillStyle = g; X.fillRect(-400, -400, W + 800, H + 800);
    for (let i = 0; i < 7; i++) { const x = -200 + i * 230, h = 700 + hash(i) * 400; X.fillStyle = '#121c30'; X.fillRect(x, 1350 - h, 220, h); for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) { const lit = hash(i * 31 + r * 7 + c) > 0.55; X.fillStyle = lit ? '#f2c66a' : '#1e2a44'; X.fillRect(x + 25 + c * 65, 1350 - h + 60 + r * 110, 40, 60); if (lit) { X.fillStyle = '#0b1426'; X.fillRect(x + 20 + c * 65, 1350 - h + 120 + r * 110, 50, 6); } } }
    X.fillStyle = '#26324c'; X.fillRect(-400, 1350, W + 800, 700); X.fillStyle = 'rgba(242,198,106,0.08)'; for (let i = 0; i < 6; i++) X.fillRect(-200 + i * 230, 1360, 120, 500);
    // lamp
    X.fillStyle = '#0a0f1c'; X.fillRect(780, 700, 18, 680); X.fillRect(740, 690, 100, 20);
    const cone = X.createRadialGradient(790, 720, 10, 790, 1300, 600); cone.addColorStop(0, 'rgba(255,220,140,0.35)'); cone.addColorStop(1, 'rgba(255,220,140,0)'); X.fillStyle = cone; X.beginPath(); X.moveTo(770, 710); X.lineTo(500, 1400); X.lineTo(1080, 1400); X.lineTo(810, 710); X.fill();
  }
  function rain(t, a = 0.5) { X.strokeStyle = `rgba(180,200,255,${a})`; X.lineWidth = 2; for (let i = 0; i < 120; i++) { const x = (hash(i) * 1400 + t * 200) % 1400 - 160, y = ((hash(i * 7) * 2200 + t * 1600) % 2200) - 200; X.beginPath(); X.moveTo(x, y); X.lineTo(x - 12, y + 50); X.stroke(); } }
  function phoneFrame(img, cx, cy, w, fy = 380, zoom = 1) { phone(img, cx, cy, w, { focus: [585, fy], zoom }); }
  function ghost(t, t0, t1, text, x, y, burst) {
    if (t < t0 || t > (burst ?? t1) + 0.5) return;
    const k = eo(lin(t, t0, t0 + 0.3)); const sh = Math.sin(t * 30) * 4;
    if (burst != null && t > burst) { const b = (t - burst) / 0.5; for (let i = 0; i < 18; i++) { const a = i / 18 * 6.28; X.fillStyle = `rgba(255,255,255,${1 - b})`; X.fillRect(x + Math.cos(a) * b * 420 - 12, y + Math.sin(a) * b * 300 - 8, 24, 16); } return; }
    X.save(); X.globalAlpha = 0.75 * k; X.translate(x + sh, y); X.rotate(-0.04); X.font = font('archivo', 400, 64); const w = X.measureText(text).width + 70;
    X.fillStyle = 'rgba(30,0,0,0.55)'; rr(-w / 2, -60, w, 120, 60); X.fill(); X.strokeStyle = '#ff6b6b'; X.lineWidth = 5; X.setLineDash([14, 10]); X.stroke(); X.setLineDash([]);
    txt(text, 0, 4, font('archivo', 400, 64), '#ffb3b3'); X.restore();
  }
  function sub(t, t0, t1, text) { if (t < t0 || t > t1) return; const ls = text.split('\n'); X.font = font('inter', 800, 42); const w = Math.min(1000, Math.max(...ls.map((l) => X.measureText(l).width)) + 50); const h = 62 * ls.length + 12, y0 = 1772 - h;
    X.fillStyle = 'rgba(0,0,0,0.72)'; rr(W / 2 - w / 2, y0, w, h, 14); X.fill(); ls.forEach((l, i) => txt(l, W / 2, y0 + 37 + i * 62, font('inter', 800, 42), '#fff')); }
  // the payoff: a big multi-line bubble, lines appear as he says them
  function bigBubble(t, t0, t1, lines, at, x, y) { if (t < t0 || t > t1) return; const k = back(lin(t, t0, t0 + 0.2), 2.4) * (1 - lin(t, t1 - 0.15, t1));
    const fs = [64, 64, 64, 80]; const lh = 92, h = lh * lines.length + 60, w = 900;
    X.save(); X.translate(x, y); X.rotate(-0.025); X.scale(k, k);
    const tail = () => { X.beginPath(); X.moveTo(150, h / 2 - 8); X.lineTo(250, h / 2 + 90); X.lineTo(250, h / 2 - 8); X.closePath(); };
    X.fillStyle = '#111'; rr(-w / 2 + 10, -h / 2 + 12, w, h, 60); X.fill(); X.save(); X.translate(10, 12); tail(); X.fill(); X.restore();
    X.lineWidth = 7; X.strokeStyle = '#111'; X.fillStyle = '#fff'; tail(); X.fill(); X.stroke(); rr(-w / 2, -h / 2, w, h, 60); X.fill(); X.stroke(); X.fillRect(150, h / 2 - 12, 100, 14);
    lines.forEach((l, i) => { if (t < t0 + at[i]) return; const kk = back(lin(t, t0 + at[i], t0 + at[i] + 0.18), 3); X.save(); X.translate(0, -h / 2 + 30 + lh * (i + 0.5)); X.scale(kk, kk);
      X.font = font('archivo', 400, fs[i]); let f = fs[i]; const tw = X.measureText(l).width; if (tw > w - 70) f *= (w - 70) / tw; txt(l, 0, 4, font('archivo', 400, f), i === 3 ? '#c4622d' : '#111'); X.restore(); });
    X.restore(); }
  function bubble(t, t0, t1, text, sx, sy, tail = -0.3, size = 50) { HOST.say(t, t0, t1, text, sx, sy, { size, maxw: 820, tail }); }

  // camera shots: [t, cx, cy, zoom]
  const SHOTS = [[0, 540, 1000, 1.0], [0.4, 440, 1060, 1.9], [1.5, 240, 1080, 2.1], [3.3, 870, 1110, 2.2], [5.2, 450, 1110, 1.6], [6.2, 880, 1090, 3.0], [7.4, 540, 1020, 1.15], [7.9, 240, 1090, 2.4], [8.4, 440, 1060, 2.4], [8.9, 650, 1080, 2.4], [9.5, 650, 1080, 1.9], [10.4, 880, 1120, 2.5],
    [T.street, 540, 960, 1.0], [12.8, 560, 1160, 2.2], [14.0, 540, 960, 1.0], [T.phone, 400, 1290, 2.3],
    [T.door, 540, 1000, 1.0], [T.flame3, 240, 1090, 2.2], [T.win, 880, 1080, 2.2], [32.0, 540, 1050, 1.3], [T.crack1, 650, 1080, 2.6], [T.crack2, 240, 1090, 2.6], [T.crack3, 440, 1060, 2.6], [T.run, 540, 1000, 1.0], [T.alone, 870, 1100, 1.8], [T.vale, 880, 1080, 2.8]];
  let CAM = [540, 960, 1];
  function shot(t) { let s = SHOTS[0]; for (const x of SHOTS) if (t >= x[0]) s = x; const d = t - s[0]; const z = s[3] * (1 + d * 0.025); CAM = [s[1], s[2], z];
    X.translate(W / 2, H / 2); X.scale(z, z); X.translate(-s[1], -s[2]); }
  const scr = (wx, wy) => [W / 2 + (wx - CAM[0]) * CAM[2], H / 2 + (wy - CAM[1]) * CAM[2]];

  // ---------- sound cues ----------
  const cues = [];
  SHOTS.forEach(([t0]) => t0 > 0.1 && cues.push(['whoosh', t0, 0.25]));
  cues.push(['tick', T.fail + 1.2, 0.5], ['tick', T.fail + 2.4, 0.5], ['gasp', T.laugh - 0.2, 0.4], ['boing', T.laugh, 0.5], ['scratch', T.mont - 0.15, 0.9], ['boom', T.mont, 1.0], ['vibrate', T.buzz, 0.6], ['vibrate', T.buzz + 0.45, 0.6],
    ['impact', T.again, 0.8], ['impact', T.punch1, 1], ['glitch', T.punch1, 0.6], ['impact', T.punch2, 1], ['glitch', T.punch2, 0.6], ['boom', T.tomorrow, 0.9],
    ['stamp', T.stamps, 1], ['stamp', T.stamps + 0.3, 1], ['stamp', T.stamps + 0.6, 1], ['fanfare', T.top, 0.5], ['whoosh', T.back, 0.8], ['boom', T.door, 1.0],
    ['shutter', T.crack1, 0.8], ['glitch', T.crack1, 0.6], ['hum', T.crack2, 0.5], ['glitch', T.crack3, 0.6], ['whoosh', T.run, 0.8], ['ratchet', T.run + 0.1, 0.7], ['ratchet', T.run + 0.4, 0.7], ['ding', T.vale + 0.1, 0.5]);
  for (let k = 0; k < 22; k++) cues.push(['tick', 16.6 + k * 0.5, 0.25]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.4 };

  const hits = [T.laugh, T.mont, T.punch1, T.punch2, T.tomorrow, T.stamps, T.door, T.run];
  window.SCENE = {
    frame(t) {
      X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
      X.save(); camera(t, hits, [], 22);
      if (t < T.street) {
        // ======== BAR: the roast ========
        X.save(); shot(t); bar(t);
        const laughing = t >= T.laugh && t < T.street;
        const bm = (who) => ({ mood: laughing ? 'laugh' : t > T.fail + 0.8 ? 'smug' : 'neutral', lookX: who === 'f' ? 1 : who === 'g' ? 1 : 0.6, lid: '#000' });
        flame(t, 230, 1150, 0.78, { ...bm('f'), shades: true, mood: laughing ? 'laugh' : 'smug', noLids: true, point: t > T.card1 });
        gem(t, 440, 1130, 0.75, bm('g'));
        card(t, 650, 1140, 0.72, { ...bm('c'), mood: laughing && t < T.card1 ? 'laugh' : t >= T.card1 ? 'smug' : bm('c').mood, lid: '#fffdf6' });
        hero(t, 880, 1150, 0.8, { mood: t < T.fail ? 'happy' : laughing ? 'worried' : 'worried', sweat: t > T.fail + 0.6, wide: t > T.laugh, lookX: t > T.laugh ? -1 : -0.5, lookY: t > T.card1 ? 1 : 0, squash: t > T.laugh && t < T.laugh + 0.3 ? 1 : 0, seed: 1 });
        table(t); X.restore();
        let p; p = scr(440, 900); bubble(t, T.gem1, T.flame1, '¿Qué pasa, tío?', p[0], p[1] - 40);
        p = scr(230, 880); bubble(t, T.flame1, T.fail, '¡Esto es fiesta!', p[0] + 120, p[1] - 40);
        p = scr(880, 900); bubble(t, T.fail + 0.1, T.laugh, 'Eh… fiesta… is… yes?', Math.min(760, p[0] - 120), p[1] - 40, 0.3);
        if (laughing && t < T.card1) { ['JAJAJA', 'HAHAHA', 'JAJAJA'].forEach((w, i) => { const k = back(lin(t, T.laugh + i * 0.15, T.laugh + i * 0.15 + 0.2), 2.5); X.save(); X.translate([290, 790, 420][i], [330, 470, 610][i] + Math.sin(t * 20 + i) * 14); X.rotate([-0.12, 0.1, -0.05][i]); X.scale(k, k); txt(w, 0, 0, font('anton', 400, 130), '#fff', { stroke: '#e0601c', sw: 14 }); X.restore(); }); }
        p = scr(650, 900); bubble(t, T.card1, T.street, 'Who even ARE you?', p[0], p[1] - 40);
        sub(t, T.gem1, T.flame1, "What's up, mate?"); sub(t, T.flame1, T.fail, 'This is a party!');
      } else if (t < T.mont) {
        // ======== STREET: the sad walk ========
        X.save(); shot(t); street(t);
        const walkK = lin(t, T.street, T.buzz); const x = mix(940, 470, walkK);
        X.fillStyle = 'rgba(0,0,0,0.3)'; X.beginPath(); X.ellipse(x, 1500, 120, 22, 0, 0, 7); X.fill();
        hero(t, x, 1340, 0.85, { mood: 'worried', lookY: 1, lookX: -0.5, tilt: -0.06, walk: t < T.buzz ? t * 7 : undefined, calm: true, acc: t > T.buzz ? ['phone'] : [], phoneGlow: t > T.buzz ? '#ffd27a' : undefined, sweat: false, seed: 2 });
        // puddle reflection
        X.save(); X.globalAlpha = 0.18; X.translate(0, 3030); X.scale(1, -1); hero(t, x, 1340, 0.85, { mood: 'worried', lookY: 1, walk: t < T.buzz ? t * 7 : undefined }); X.restore();
        X.restore(); rain(t, 0.45);
        ghost(t, 12.6, 14.0, 'jajaja…', 300, 620); ghost(t, 13.2, 14.2, 'who even are you?', 640, 820);
        if (t > T.buzz) { const k = eo(lin(t, T.buzz, T.buzz + 0.3)); X.fillStyle = `rgba(255,210,120,${0.25 * k * (0.6 + 0.4 * Math.sin(t * 20))})`; X.fillRect(0, 0, W, H); }
        if (t > T.phone + 0.15) { const k = eio(lin(t, T.phone + 0.15, T.mont - 0.05)); const hx = mix(940, 470, 1) - 150 * 0.85 * Math.cos(0.2), hy = 1340 + 30 * 0.85; shot(t); const hp = scr(hx, hy); X.setTransform(1, 0, 0, 1, 0, 0); X.save(); X.fillStyle = `rgba(0,0,0,${k})`; X.fillRect(0, 0, W, H); phoneFrame(IMG.over, mix(hp[0], W / 2, k), mix(hp[1], H / 2, k), mix(68 * 0.85 * CAM[2], 900, k), 380, 1); X.restore(); }
      } else if (t < T.back) {
        // ======== MONTAGE: inside the app ========
        const lessons = Math.min(50, Math.max(1, Math.round(1 + 49 * lin(t, T.mont + 0.5, T.top))));
        const seg = [[T.mont, 'path'], [17.0, 'band'], [18.0, 'card0'], [19.0, 'path'], [20.2, 'words'], [21.0, 'ghost'], [22.4, 'card2'], [23.4, 'night'], [24.0, 'path'], [T.stamps, 'stamps'], [T.top, 'top']];
        let cur = seg[0]; seg.forEach((s) => { if (t >= s[0]) cur = s; });
        const kind = cur[1], d = t - cur[0];
        const pathBg = (speed) => { const img = IMG.path; const k = W / img.width; const sy = Math.max(1560, mix(4550, 1900, lin(t, T.mont, T.top)) - d * speed); X.drawImage(img, 0, sy, img.width, H / k, 0, 0, W, H); };
        if (kind === 'path' || kind === 'top' || kind === 'ghost' || kind === 'words') {
          pathBg(kind === 'path' && t > 24 ? 140 : 60);
          if (kind === 'path' && t > 24) { X.strokeStyle = 'rgba(255,255,255,0.5)'; X.lineWidth = 4; for (let i = 0; i < 26; i++) { const x = hash(i) * W, y = ((hash(i * 3) * H + t * 2600) % H); X.beginPath(); X.moveTo(x, y); X.lineTo(x, y + 120); X.stroke(); } }
          const run = kind === 'top' ? 0 : 1;
          hero(t, 540, 1260, 0.95, { mood: kind === 'top' ? 'happy' : 'neutral', acc: ['headband'], sweat: t > 20, walk: run ? t * (t > 24 ? 22 : 13) : undefined, armsUp: kind === 'top', wave: kind === 'top', lookY: -0.4, seed: 3 });
          if (kind === 'words') { [['una caña', 260, 0], ['la cuenta', 800, 0.1], ['¿me lo repites?', 300, 0.25], ['invito yo', 780, 0.35], ['unas bravas', 540, 0.45]].forEach(([w, x, o], i) => { const k = eo(lin(d, o, o + 0.35)); const yy = mix(-100, 600 + (i % 3) * 120, k);
            X.save(); X.translate(x, yy); X.rotate((i - 2) * 0.06); X.font = font('archivo', 400, 46); const ww = X.measureText(w).width + 50; X.fillStyle = OR; rr(-ww / 2, -40, ww, 80, 40); X.fill(); txt(w, 0, 2, font('archivo', 400, 46), '#fff'); X.restore(); }); }
          if (kind === 'ghost') { ghost(t, T.ghost1, T.punch1, 'Who even ARE you?', 540, 760, T.punch1); ghost(t, T.ghost2, T.punch2, 'JAJAJA', 540, 760, T.punch2);
            const pk = (tp) => t > tp - 0.15 && t < tp + 0.25; if (pk(T.punch1) || pk(T.punch2)) { X.fillStyle = '#fff'; txt('POW!', 820, 980, font('bungee', 400, 110), '#ffd23d', { stroke: INK, sw: 10 }); } }
          if (kind === 'top') { confetti(t, T.top, W / 2, 700, 70, [OR, '#fff', '#ffd23d', '#6e1f2a'], 1.6); const k = back(lin(t, T.top, T.top + 0.3)); X.save(); X.translate(W / 2, 420); X.scale(k, k); txt('50 / 50', 0, 0, font('anton', 400, 200), '#fff', { stroke: INK, sw: 16 }); X.restore(); }
        } else if (kind === 'band') {
          X.fillStyle = '#ee8b47'; X.fillRect(0, 0, W, H); X.strokeStyle = 'rgba(255,255,255,0.25)'; X.lineWidth = 16; for (let i = 0; i < 24; i++) { const a = i / 24 * 6.28 + t * 0.4; X.beginPath(); X.moveTo(W / 2, 900); X.lineTo(W / 2 + Math.cos(a) * 1600, 900 + Math.sin(a) * 1600); X.stroke(); }
          hero(t, W / 2, 1000, 2.2, { mood: 'neutral', acc: d > 0.35 ? ['headband'] : [], lookY: 0, squash: d > 0.35 && d < 0.6 ? 1 : 0, seed: 4 });
          slam(t, cur[0] + 0.35, 'LOCK IN.', W / 2, 330, font('anton', 400, 170), '#fff', { stroke: INK, sw: 14, rot: -0.06 });
        } else if (kind === 'card0' || kind === 'card2') {
          X.fillStyle = CREAM; X.fillRect(0, 0, W, H);
          phone(kind === 'card0' ? IMG.les0 : IMG.les2, 640, 960, 560, { focus: [585, 1150], zoom: 1.1, rot: 0.04 });
          hero(t, 210, 1450, 0.8, { mood: 'o', acc: ['headband'], lookX: 1, lookY: -0.5, sweat: kind === 'card2', squash: d < 0.2 ? 1 : 0, seed: 5 });
          slam(t, cur[0] + 0.1, kind === 'card0' ? 'LESSON 1' : 'LESSON 23', W / 2, 220, font('anton', 400, 120), INK, { rot: -0.04 });
          if (kind === 'card0' && t > T.again) slam(t, T.again, 'AGAIN.', W / 2, 1750, font('anton', 400, 170), '#e23b3b', { stroke: '#fff', sw: 14, rot: 0.05 });
        } else if (kind === 'night') {
          X.fillStyle = '#0d1020'; X.fillRect(0, 0, W, H); const lamp = X.createRadialGradient(540, 760, 20, 540, 900, 700); lamp.addColorStop(0, 'rgba(255,214,140,0.5)'); lamp.addColorStop(1, 'rgba(255,214,140,0)'); X.fillStyle = lamp; X.fillRect(0, 0, W, H);
          hero(t, 540, 1050, 1.6, { mood: 'worried', acc: ['headband', 'phone'], phoneGlow: '#ffe7b0', sweat: true, lookX: -0.8, lookY: 0.5, seed: 6 });
          txt('DAY 9 · 02:14', W / 2, 300, font('mono', 700, 60), '#ffd27a');
        } else if (kind === 'stamps') {
          X.fillStyle = '#e9dcc4'; X.fillRect(0, 0, W, H);
          phone(IMG.pass, W / 2, 1000, 620, { focus: [585, 1900], zoom: 1.35 });
          [['50', 'WORDS', 300, 600, '#a8512b'], ['200', 'WORDS', 760, 720, '#2f7fd0'], ['600', 'WORDS', 520, 1450, '#6e1f2a']].forEach(([a, b, x, y, c], i) => { const t0 = T.stamps + i * 0.3; if (t < t0) return; const k = mix(2.2, 1, eo(lin(t, t0, t0 + 0.14)));
            X.save(); X.translate(x, y); X.rotate((i - 1) * 0.2); X.scale(k, k); X.strokeStyle = c; X.lineWidth = 10; X.beginPath(); X.arc(0, 0, 140, 0, 7); X.stroke(); txt(a, 0, -20, font('anton', 400, 90), c); txt(b, 0, 55, font('bebas', 400, 46), c); X.restore(); });
        }
        // overlays: counter + days
        X.fillStyle = 'rgba(0,0,0,0.75)'; rr(40, 60, 380, 90, 20); X.fill(); txt(`LESSON ${lessons}/50`, 230, 107, font('anton', 400, 56), '#fff');
        const day = t < 19 ? 1 : t < 21.5 ? 5 : t < 23.4 ? 9 : t < T.top ? 14 : 14; X.fillStyle = 'rgba(0,0,0,0.75)'; rr(W - 300, 60, 260, 90, 20); X.fill(); txt(`DAY ${day}`, W - 170, 107, font('anton', 400, 56), '#ffd27a');
        if (t >= T.tomorrow && t < T.stamps) { const k = back(lin(t, T.tomorrow, T.tomorrow + 0.25), 2.4); X.save(); X.translate(W / 2, 700); X.rotate(-0.08); X.scale(k, k); txt('THERE IS', 0, -90, font('anton', 400, 150), '#fff', { stroke: '#e23b3b', sw: 16 }); txt('NO TOMORROW!', 0, 80, font('anton', 400, 150), '#fff', { stroke: '#e23b3b', sw: 16 }); X.restore(); }
        if (t > T.top + 0.9) { const k = eio(lin(t, T.top + 0.9, T.back)); X.fillStyle = `rgba(255,255,255,${k})`; X.fillRect(0, 0, W, H); }
      } else {
        // ======== COMEBACK ========
        X.save(); shot(t); bar(t);
        const shock = t > T.win + 1.6; const gone = t > T.run;
        const runK = (o) => eo(lin(t, T.run + o, T.run + o + 0.6));
        if (!gone || runK(0) < 1) {
          const fx = mix(230, -500, runK(0)), gx = mix(440, -500, runK(0.08)), cx = mix(650, -500, runK(0.16));
          flame(t, fx, 1150, 0.78, { mood: shock ? 'shock' : 'smug', shades: !shock, noLids: true, out: T.crack2 });
          gem(t, gx, 1130, 0.75, { mood: shock ? 'shock' : 'smug', crack: T.crack3 });
          card(t, cx, 1140, 0.72, { mood: shock ? 'shock' : 'smug', crack: T.crack1, lid: '#fffdf6' });
          if (gone) for (let i = 0; i < 8; i++) { const k = ((t - T.run) * 1.5 + i * 0.1) % 1; X.fillStyle = `rgba(230,200,170,${0.7 * (1 - k)})`; X.beginPath(); X.arc(300 - k * 300 + i * 40, 1300 - k * 80, 30 + k * 60, 0, 7); X.fill(); }
        }
        const inK = eo(lin(t, T.door, T.door + 1.0));
        hero(t, mix(1250, 880, inK), 1150, 0.8, { mood: t > T.vale ? 'happy' : 'neutral', acc: ['shades', 'headband'], walk: inK < 1 ? t * 6 : undefined, wink: t > T.vale, point: t > T.win && t < T.win + 1.2, seed: 7 });
        table(t, gone && t > T.alone ? false : false); X.restore();
        if (t < T.door + 0.7) { const k = 1 - lin(t, T.door, T.door + 0.7); X.fillStyle = `rgba(255,255,255,${k})`; X.fillRect(0, 0, W, H); }
        let p = scr(230, 880); bubble(t, T.flame3, T.win, 'Back for more?', p[0] + 140, p[1] - 40);
        bigBubble(t, T.win + 0.05, T.win + 4.6, ['Camarero:', 'tres cañas y unas bravas', 'para mis amigos.', 'Invito yo.'], [0, 0.95, 2.5, 3.75], W / 2, 470);
        sub(t, T.win + 0.05, T.win + 4.5, 'Waiter: three beers and patatas bravas\nfor my friends. On me.');
        p = scr(880, 900); bubble(t, T.vale, T.end, 'Vale.', p[0] - 200, p[1] - 60, 0.3, 80); sub(t, T.vale, T.end, 'Cool.');
        if (t > T.run + 0.3 && t < T.alone) txt('…', W / 2, 600, font('anton', 400, 200), '#fff');
      }
      X.restore();
      // letterbox bars for the cinematic feel
      X.fillStyle = '#000'; X.fillRect(0, 0, W, 40); X.fillRect(0, H - 40, W, 40);
      if (t > T.end - 0.5) { X.fillStyle = `rgba(0,0,0,${lin(t, T.end - 0.5, T.end)})`; X.fillRect(0, 0, W, H); }
    },
  };
})();
