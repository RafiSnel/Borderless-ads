// SF · "The comeback" v2 — bar → tear → sucked into the phone → action → boss Ñ → KO → LOCK IN → comeback.
window.ready = (async () => {
  await loadFonts();
  await loadImages({ path: 'app/madrid_path_full_s.jpg', les0: 'app/madrid_lesson_0.png', les2: 'app/madrid_lesson_2.png', over: 'app/madrid_overview.png', pass: 'app/madrid_passport.png', words: 'app/madrid_words.png' });
  const T = { bar: 0, gem1: 0.4, flame1: 1.5, fail: 3.3, laugh: 7.4, card1: 9.5, street: 11.3, stop: 14.0, close: 14.6, tear: 15.0, echo1: 15.5, echo2: 16.4, buzz: 17.8, pov: 18.4, notif: 18.7, wipe: 19.7, det: 20.3, cta: 20.6, tap: 21.3, portal: 21.8, suck: 22.4, land: 23.3,
    run: 24.7, corner: 26.5, quiz: 27.8, again: 28.6, words: 30.6, leap: 32.9, night: 34.3, stamps: 35.6, boss: 37.0, ring: 38.5, jab1: 39.1, jab2: 39.6, cocky: 40.0, windup: 40.9, oblivious: 41.3, hook: 41.7, floor: 42.4,
    counts: [43.1, 43.95, 44.8, 45.65, 46.5, 47.35, 48.2], ghostA: 43.5, ghostB: 44.4, ghostC: 45.3, eyes: 46.8, rise: 47.5, vamos: 48.3, lockin: 48.9, combo: 49.4, upper: 50.7, kotxt: 51.1, raise: 51.5,
    sprint: 52.6, tomorrow: 52.8, cards: 54.3, chips2: 55.6, top: 56.9, final: 57.8, back: 58.7, door: 58.7, flame3: 60.0, win: 61.2, perfect: 66.0, noway: 69.3, what: 71.3, algo: 73.1, flee: 74.1, alone: 75.4, vale: 76.0, end: 78.2 };
  const LIPS = await (await fetch('v/sf/lips.json')).json();
  const talk = (who, t) => { for (const [t0, v] of (LIPS[who] || [])) { const f = (t - t0) * 30, i = Math.floor(f); if (i >= 0 && i < v.length - 1) return mix(v[i], v[i + 1], f - i); } return 0; };
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
    else if (shock || m.talk > 0.05) { const tk = m.talk || 0; X.beginPath(); X.ellipse(0, ey + 58, 18 + tk * 8, shock ? 30 * (1 + tk * 0.4) : 5 + tk * 26, 0, 0, 7); X.fill(); X.fillStyle = '#e8506a'; X.beginPath(); X.ellipse(0, ey + 58 + (shock ? 18 : 3 + tk * 14), 9, 3 + tk * 5, 0, 0, 7); X.fill(); }
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

  // cheap blur of everything drawn so far: shrink the canvas to 1/8 and scale it back up (canvas filter blur is far too slow here)
  const LOW = document.createElement('canvas'); LOW.width = Math.ceil(W / 8); LOW.height = Math.ceil(H / 8); const LX = LOW.getContext('2d');
  function blurSoFar() { LX.imageSmoothingQuality = 'high'; LX.clearRect(0, 0, LOW.width, LOW.height); LX.drawImage(C, 0, 0, W, H, 0, 0, LOW.width, LOW.height);
    X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.imageSmoothingQuality = 'high'; X.drawImage(LOW, 0, 0, W, H); X.restore(); }
  // ---------- hero extras: brows, tear, KO eyes, boxing gloves ----------
  function heroX(t, x, y, s, st = {}, fx = {}) { hero(t, x, y, s, { ...st, extra2: (tt) => heroFx(tt, fx) }); }
  function heroFx(t, fx) {
    if (fx.ko) [-42, 44].forEach((ex) => { X.fillStyle = '#6e1f2a'; X.beginPath(); X.ellipse(ex, -62, 31, 35, 0, 0, 7); X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 5; X.beginPath();
      for (let a = 0; a < 12; a += 0.25) { const r = a * 2.3, aa = a + t * 7; X.lineTo(ex + Math.cos(aa) * r, -62 + Math.sin(aa) * r); } X.stroke(); });
    if (fx.brows) { X.strokeStyle = INK; X.lineWidth = 11; X.lineCap = 'round'; X.beginPath();
      if (fx.brows === 'angry') { X.moveTo(-74, -112); X.lineTo(-18, -92); X.moveTo(20, -92); X.lineTo(76, -112); }
      else { X.moveTo(-72, -96); X.lineTo(-22, -112); X.moveTo(22, -112); X.lineTo(72, -96); } X.stroke(); }
    if (fx.tear != null && fx.tear > 0) { const k = fx.tear; X.strokeStyle = 'rgba(127,196,232,0.75)'; X.lineWidth = 7; X.lineCap = 'round';
      X.beginPath(); X.moveTo(-52, -30); X.lineTo(-52, -30 + Math.min(1, k) * 95); X.stroke();
      const ty = -30 + Math.min(1.5, k) * 95; X.fillStyle = '#8fd0f0'; X.beginPath(); X.moveTo(-52, ty - 22); X.quadraticCurveTo(-34, ty + 2, -52, ty + 12); X.quadraticCurveTo(-70, ty + 2, -52, ty - 22); X.fill();
      X.fillStyle = 'rgba(255,255,255,0.8)'; X.beginPath(); X.arc(-56, ty - 2, 4, 0, 7); X.fill(); }
    if (fx.gloves) { const g = fx.gloves;
      [['l', -112, 0, -150, 40], ['r', 108, 0, 150, 40]].forEach(([k, sx, sy, hx, hy]) => { const p = g[k] || [hx, hy];
        X.strokeStyle = '#6e1f2a'; X.lineWidth = 20; X.lineCap = 'round'; X.beginPath(); X.moveTo(sx, sy); X.lineTo(p[0], p[1]); X.stroke();
        X.fillStyle = '#d8322f'; X.beginPath(); X.arc(p[0], p[1], 42, 0, 7); X.fill(); X.fillStyle = '#fff'; rr(p[0] - 34, p[1] + 22, 68, 14, 6); X.fill();
        X.fillStyle = 'rgba(255,255,255,0.35)'; X.beginPath(); X.arc(p[0] - 14, p[1] - 16, 11, 0, 7); X.fill(); }); }
  }
  const pk = (t, tp, up = 0.07, down = 0.22) => t < tp - up || t > tp + down ? 0 : t < tp ? eo((t - tp + up) / up) : 1 - ei((t - tp) / down);
  // stretchy cartoon punch in screen space: arm from (x0,y0) to (x1,y1)
  function sPunch(x0, y0, x1, y1, k, col = '#d8322f') { if (k <= 0) return; const x = mix(x0, x1, k), y = mix(y0, y1, k);
    X.strokeStyle = '#6e1f2a'; X.lineWidth = 22; X.lineCap = 'round'; X.beginPath(); X.moveTo(x0, y0); X.lineTo(x, y); X.stroke();
    X.fillStyle = col; X.beginPath(); X.arc(x, y, 50, 0, 7); X.fill(); X.fillStyle = '#fff'; rr(x - 40, y + 26, 80, 16, 6); X.fill(); }
  function comic(t, t0, text, x, y, col = '#ffd23d', size = 120) { if (t < t0 || t > t0 + 0.45) return; const k = back(lin(t, t0, t0 + 0.12), 3) * (1 - lin(t, t0 + 0.33, t0 + 0.45));
    X.save(); X.translate(x, y); X.rotate(-0.12 + hash(t0) * 0.24); X.scale(k, k);
    X.fillStyle = '#fff'; X.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283, r = i % 2 ? size * 1.0 : size * 1.55; X.lineTo(Math.cos(a) * r * 1.4, Math.sin(a) * r * 0.9); } X.closePath(); X.fill(); X.strokeStyle = INK; X.lineWidth = 7; X.stroke();
    txt(text, 0, 6, font('bungee', 400, size * 0.8), col, { stroke: INK, sw: 9 }); X.restore(); }

  // ---------- the boss: the letter Ñ ----------
  function enye(t, x, y, s, m = {}) {
    X.save(); X.translate(x, y); X.rotate(m.tilt || 0); X.scale(s, s);
    X.fillStyle = 'rgba(0,0,0,0.25)'; X.beginPath(); X.ellipse(0, 250, 180, 30, 0, 0, 7); X.fill();
    const bob = m.ko ? 0 : Math.abs(Math.sin(t * 6)) * -10; X.translate(0, bob);
    X.fillStyle = INK; rr(-120, 214, 70, 34, 14); X.fill(); rr(50, 214, 70, 34, 14); X.fill();
    X.fillStyle = 'rgba(0,0,0,0.25)'; X.save(); X.translate(10, 10);
    const N = () => { X.beginPath(); X.moveTo(-150, 220); X.lineTo(-150, -200); X.lineTo(-62, -200); X.lineTo(70, 40); X.lineTo(70, -200); X.lineTo(150, -200); X.lineTo(150, 220); X.lineTo(62, 220); X.lineTo(-70, -20); X.lineTo(-70, 220); X.closePath(); };
    N(); X.fill(); X.restore(); X.fillStyle = '#26365e'; N(); X.fill(); X.fillStyle = '#34497c'; X.fillRect(-150, -200, 30, 420);
    // face on the upper-left stroke
    const ang = m.mood === 'angry', hurt = m.mood === 'hurt' || m.ko;
    [-112, -40].forEach((ex) => { if (hurt) { X.strokeStyle = '#fff'; X.lineWidth = 7; X.beginPath(); X.moveTo(ex - 14, -88); X.lineTo(ex + 14, -64); X.moveTo(ex + 14, -88); X.lineTo(ex - 14, -64); X.stroke(); return; }
      X.fillStyle = '#fff'; X.beginPath(); X.ellipse(ex, -76, 22, 24, 0, 0, 7); X.fill(); X.fillStyle = INK; X.beginPath(); X.arc(ex - 6 + (m.lookX || 0) * 5, -72, 10, 0, 7); X.fill(); });
    X.strokeStyle = INK; X.lineWidth = 9; X.lineCap = 'round'; X.beginPath(); X.moveTo(-138, ang ? -118 : -110); X.lineTo(-88, ang ? -100 : -108); X.moveTo(-66, ang ? -100 : -108); X.lineTo(-16, ang ? -118 : -110); X.stroke();
    X.strokeStyle = '#fff'; X.lineWidth = 7; X.beginPath(); if (hurt) { X.ellipse(-76, -26, 14, 18, 0, 0, 7); } else if (ang) { X.moveTo(-104, -20); X.lineTo(-48, -30); } else { X.moveTo(-104, -30); X.quadraticCurveTo(-76, -12, -46, -34); } X.stroke();
    // the tilde: a mohawk
    if (!m.noTilde) { X.save(); X.translate(0, -240); X.strokeStyle = '#e23b3b'; X.lineWidth = 44; X.lineCap = 'round'; X.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; X.lineTo(-130 + u * 260, Math.sin(u * 6.283 + Math.PI) * 34 + Math.sin(t * 8) * 4); } X.stroke(); X.restore(); }
    // gloves
    const g = m.gloves || {}; [['l', -150, -60, -200, 10], ['r', 150, -60, 200, 10]].forEach(([k, sx, sy, hx, hy]) => { const p = g[k] || [hx, hy];
      X.strokeStyle = '#26365e'; X.lineWidth = 22; X.lineCap = 'round'; X.beginPath(); X.moveTo(sx, sy); X.lineTo(p[0], p[1]); X.stroke();
      X.fillStyle = '#2f7fd0'; X.beginPath(); X.arc(p[0], p[1], 48, 0, 7); X.fill(); X.fillStyle = '#fff'; rr(p[0] - 38, p[1] + 26, 76, 15, 6); X.fill(); });
    X.restore();
  }
  function tilde(x, y, s, rot) { X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s); X.strokeStyle = '#e23b3b'; X.lineWidth = 44; X.lineCap = 'round'; X.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; X.lineTo(-130 + u * 260, Math.sin(u * 6.283 + Math.PI) * 34); } X.stroke(); X.restore(); }
  function referee(t, x, y, s, m = {}) { // striped shirt, whistle, counting hand
    X.save(); X.translate(x, y); X.scale(s, s); X.rotate(m.tilt || 0);
    X.fillStyle = INK; rr(-70, 150, 50, 24, 10); X.fill(); rr(20, 150, 50, 24, 10); X.fill();
    X.save(); rr(-110, -170, 220, 330, 40); X.clip(); X.fillStyle = '#fff'; X.fillRect(-110, -170, 220, 330); X.fillStyle = '#1b1b1b'; for (let i = -4; i < 6; i++) X.fillRect(-110 + i * 44, -170, 22, 330); X.restore();
    X.fillStyle = '#f2d6b8'; X.beginPath(); X.arc(0, -230, 80, 0, 7); X.fill(); X.fillStyle = '#222'; X.beginPath(); X.arc(0, -262, 72, Math.PI, 0); X.fill();
    X.fillStyle = INK; X.beginPath(); X.arc(-26, -228, 8, 0, 7); X.arc(26, -228, 8, 0, 7); X.fill(); X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); X.moveTo(-20, -190); X.lineTo(20, -190); X.stroke();
    X.strokeStyle = '#fff'; X.lineWidth = 20; X.lineCap = 'round'; const up = m.raise ? 1 : 0;
    X.beginPath(); X.moveTo(-100, -120); X.lineTo(m.raiseL ? -170 : -150, m.raiseL ? -330 : -20); X.stroke();
    X.beginPath(); X.moveTo(100, -120); X.lineTo(160, m.count ? -260 : -20); X.stroke();
    if (m.count) { X.fillStyle = '#f2d6b8'; X.beginPath(); X.arc(160, -280, 32, 0, 7); X.fill(); for (let i = 0; i < Math.min(5, m.count); i++) { X.fillRect(136 + i * 12, -340, 9, 46); } }
    X.restore();
  }
  function ringSet(t, blur = 0) {
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#120c1e'); g.addColorStop(1, '#2b1c38'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
    // crowd
    for (let r = 0; r < 4; r++) for (let i = 0; i < 16; i++) { const x = -140 + i * 90 + (r % 2) * 45, y = 760 + r * 70 + Math.abs(Math.sin(t * 9 + i * 1.7 + r)) * -14; X.fillStyle = ['#3a2a52', '#46305e', '#2f2346'][(i + r) % 3]; X.beginPath(); X.arc(x, y, 34, 0, 7); X.fill(); rr(x - 40, y + 26, 80, 80, 20); X.fill(); }
    for (let i = 0; i < 6; i++) { const f = hash(Math.floor(t * 10) * 13 + i); if (f > 0.7) { X.fillStyle = 'rgba(255,255,255,0.9)'; X.beginPath(); X.arc(hash(i * 5 + Math.floor(t * 10)) * W, 760 + hash(i * 9 + Math.floor(t * 10)) * 260, 10, 0, 7); X.fill(); } }
    // spotlights
    [[200, 0.6], [880, -0.6]].forEach(([x, a]) => { const c = X.createLinearGradient(x, 0, 540, 1300); c.addColorStop(0, 'rgba(255,240,200,0.35)'); c.addColorStop(1, 'rgba(255,240,200,0)'); X.fillStyle = c; X.beginPath(); X.moveTo(x - 30, -100); X.lineTo(x + 30, -100); X.lineTo(820, 1500); X.lineTo(260, 1500); X.closePath(); X.fill(); });
    // posts + ropes (back)
    X.fillStyle = '#1a1a1a'; X.fillRect(40, 930, 30, 360); X.fillRect(1010, 930, 30, 360);
    ['#c4622d', '#f6efe2', '#c4622d'].forEach((c, i) => { X.strokeStyle = c; X.lineWidth = 12; X.beginPath(); X.moveTo(55, 960 + i * 90); X.lineTo(1025, 960 + i * 90); X.stroke(); });
    // canvas
    X.fillStyle = '#efe6d4'; X.beginPath(); X.moveTo(-60, 1260); X.lineTo(1140, 1260); X.lineTo(1400, 1720); X.lineTo(-320, 1720); X.closePath(); X.fill();
    X.fillStyle = 'rgba(196,98,45,0.18)'; X.beginPath(); X.ellipse(540, 1450, 300, 70, 0, 0, 7); X.fill();
    X.fillStyle = '#c4622d'; X.fillRect(-400, 1720, W + 800, 300); txt('BOSS FIGHT · LESSON 31 · LA Ñ', W / 2, 1800, font('anton', 400, 54), '#f6efe2');
  }
  function pathBg(sy) { const img = IMG.path; const k = W / img.width; X.drawImage(img, 0, cl(sy, 1560, 4600), img.width, H / k, 0, 0, W, H); }
  function speedLines(t, a = 0.5, n = 26, v = 2600) { X.strokeStyle = `rgba(255,255,255,${a})`; X.lineWidth = 4; for (let i = 0; i < n; i++) { const x = hash(i) * W, y = ((hash(i * 3) * H + t * v) % H); X.beginPath(); X.moveTo(x, y); X.lineTo(x, y + 140); X.stroke(); } }
  function rays(t, col, cx = W / 2, cy = 900) { X.fillStyle = col; X.fillRect(0, 0, W, H); X.strokeStyle = 'rgba(255,255,255,0.22)'; X.lineWidth = 18; for (let i = 0; i < 24; i++) { const a = i / 24 * 6.28 + t * 0.6; X.beginPath(); X.moveTo(cx, cy); X.lineTo(cx + Math.cos(a) * 1800, cy + Math.sin(a) * 1800); X.stroke(); } }
  function whiteFlash(t, t0, t1) { if (t < t0 || t > t1) return; const m = (t0 + t1) / 2; const k = t < m ? lin(t, t0, m) : 1 - lin(t, m, t1); X.fillStyle = `rgba(255,255,255,${k})`; X.fillRect(0, 0, W, H); }
  function desat(a) { if (a <= 0) return; X.save(); X.globalCompositeOperation = 'saturation'; X.fillStyle = `rgba(128,128,128,${a})`; X.fillRect(0, 0, W, H); X.restore(); }
  function vignette(a) { const v = X.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1200); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${a})`); X.fillStyle = v; X.fillRect(0, 0, W, H); }
  function portalScreen(t, cx, cy, w, mixApp) { const h = w * 2.05;
    X.save(); X.translate(cx, cy); X.fillStyle = '#111'; rr(-w / 2 - w * 0.05, -h / 2 - w * 0.05, w * 1.1, h + w * 0.1, w * 0.16); X.fill();
    rr(-w / 2, -h / 2, w, h, w * 0.12); X.clip();
    X.fillStyle = '#ee8b47'; X.fillRect(-w, -h, w * 2, h * 2);
    for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283 + t * 5; X.fillStyle = i % 2 ? '#f6efe2' : '#c4622d'; X.beginPath(); X.moveTo(0, 0); X.arc(0, 0, h, a, a + 6.283 / 28); X.closePath(); X.fill(); }
    const gl = X.createRadialGradient(0, 0, 0, 0, 0, w * 0.6); gl.addColorStop(0, 'rgba(255,255,255,1)'); gl.addColorStop(1, 'rgba(255,255,255,0)'); X.fillStyle = gl; X.fillRect(-w, -h, w * 2, h * 2);
    if (mixApp > 0) { X.globalAlpha = mixApp; X.drawImage(IMG.over, 0, 0, IMG.over.width, IMG.over.width * h / w, -w / 2, -h / 2, w, h); }
    X.restore(); }
  function lessonPhone(img, cx, cy, w, rot = 0, fy = 1150) { X.save(); X.translate(cx, cy); X.rotate(rot); phone(img, 0, 0, w, { focus: [585, fy], zoom: 1.1 }); X.restore(); }
  function tick(x, y, s, col = '#3aa35b') { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = col; X.beginPath(); X.arc(0, 0, 60, 0, 7); X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(-26, 2); X.lineTo(-6, 22); X.lineTo(28, -20); X.stroke(); X.restore(); }

  // ---------- camera shots: [t, cx, cy, zoom] (bar + street + comeback) ----------
  const SHOTS = [[0, 540, 1000, 1.0], [0.4, 440, 1060, 1.9], [1.5, 240, 1080, 2.1], [3.3, 870, 1110, 2.2], [5.2, 450, 1110, 1.6], [6.2, 880, 1090, 3.0], [7.4, 540, 1020, 1.15], [7.9, 240, 1090, 2.4], [8.4, 440, 1060, 2.4], [8.9, 650, 1080, 2.4], [9.5, 650, 1080, 1.9], [10.4, 880, 1120, 2.5],
    [T.street, 540, 960, 1.0], [12.7, 700, 1180, 1.7], [T.stop, 560, 1150, 1.25], [T.close, 560, 1225, 3.1], [T.buzz, 470, 1280, 2.0],
    [T.door, 540, 1000, 1.0], [T.flame3, 240, 1090, 2.2], [T.win, 880, 1080, 2.2], [T.win + 1.3, 540, 1050, 1.3], [T.perfect, 650, 1080, 2.4], [T.noway, 440, 1060, 2.4], [T.what, 240, 1090, 2.6],
    [T.algo, 880, 1090, 2.7], [T.flee, 540, 1000, 1.0], [T.alone, 760, 1100, 1.5], [T.vale, 880, 1080, 2.8]];
  let CAM = [540, 960, 1];
  function shot(t) { let s = SHOTS[0]; for (const x of SHOTS) if (t >= x[0]) s = x; const d = t - s[0]; const z = s[3] * (1 + d * 0.025); CAM = [s[1], s[2], z];
    X.translate(W / 2, H / 2); X.scale(z, z); X.translate(-s[1], -s[2]); }
  const scr = (wx, wy) => [W / 2 + (wx - CAM[0]) * CAM[2], H / 2 + (wy - CAM[1]) * CAM[2]];
  function cam(cx, cy, z) { X.translate(W / 2, H / 2); X.scale(z, z); X.translate(-cx, -cy); }
  function keyCam(t, keys) { let k = keys[0]; for (const x of keys) if (t >= x[0]) k = x; const z = k[3] * (1 + (t - k[0]) * 0.03); cam(k[1], k[2], z); }

  // ---------- lesson + day counters ----------
  const LK = [[T.land, 1], [T.run, 2], [T.corner, 4], [T.quiz, 5], [T.words, 6], [T.leap, 10], [T.night, 24], [T.stamps, 27], [T.boss, 31], [T.sprint, 32], [T.top, 50]];
  const interp = (t, K) => { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) return mix(K[i - 1][1], K[i][1], lin(t, K[i - 1][0], K[i][0])); return K[K.length - 1][1]; };
  const DK = [[T.land, 1], [T.words, 3], [T.leap, 5], [T.night, 9], [T.boss, 11], [T.sprint, 12], [T.top, 16]];

  // ---------- sound cues ----------
  const cues = [];
  SHOTS.forEach(([t0]) => t0 > 0.1 && t0 < T.land && cues.push(['whoosh', t0, 0.22]));
  SHOTS.forEach(([t0]) => t0 >= T.door && cues.push(['whoosh', t0, 0.18]));
  cues.push(['tick', T.fail + 1.2, 0.5], ['tick', T.fail + 2.4, 0.5], ['gasp', T.laugh - 0.2, 0.4], ['boing', T.laugh, 0.5],
    ['ding', T.notif, 0.5], ['pop', T.cta, 0.5], ['click', T.tap, 0.9], ['whoosh', T.tap + 0.1, 0.6], ['vibrate', T.buzz, 0.6], ['vibrate', T.buzz + 0.45, 0.6], ['swell', T.wipe, 0.4], ['riser', T.portal - 0.4, 0.5],
    ['boom', T.land, 1.0], ['whoosh', T.run, 0.5], ['boing', T.run + 0.35, 0.5], ['whoosh', T.corner, 0.8], ['whoosh', T.corner + 0.55, 0.6],
    ['hit', T.quiz + 0.5, 0.9], ['fail', T.quiz + 0.55, 0.7], ['impact', T.again, 0.8], ['hit', T.quiz + 1.6, 0.9], ['correct', T.quiz + 1.65, 0.8], ['coin', T.quiz + 1.85, 0.6],
    ['flaplong', T.leap, 0.4], ['type', T.night, 0.5], ['stamp', T.stamps, 1], ['stamp', T.stamps + 0.3, 1], ['stamp', T.stamps + 0.6, 1],
    ['gong', T.boss, 0.8], ['impact', T.boss + 0.3, 0.8], ['bell', T.ring, 1], ['bell', T.ring + 0.18, 1],
    ['hit', T.jab1, 1], ['hit', T.jab2, 1], ['whoosh', T.windup, 0.5], ['whoosh', T.hook - 0.12, 0.9],
    ['heart', T.floor + 0.6, 0.6], ['heart', T.floor + 1.5, 0.6], ['heart', T.floor + 2.4, 0.6], ['heart', T.floor + 3.3, 0.6], ['heart', T.eyes - 0.4, 0.8], ['heart', T.eyes + 0.3, 0.9], ['heart', T.eyes + 0.9, 1],
    ['impact', T.vamos, 0.9], ['boom', T.lockin, 1.0], ['scratch', T.lockin - 0.12, 0.5],
    ['hit', T.combo, 1], ['hit', T.combo + 0.3, 1], ['hit', T.combo + 0.6, 1], ['hit', T.combo + 0.9, 1], ['impact', T.upper, 1], ['boom', T.upper, 0.8], ['bell', T.kotxt, 1], ['bell', T.kotxt + 0.18, 1], ['bell', T.kotxt + 0.36, 1], ['fanfare', T.raise, 0.6],
    ['whoosh', T.sprint, 0.7], ['boom', T.tomorrow, 0.9], ['page', T.cards, 0.6], ['page', T.cards + 0.4, 0.6], ['page', T.cards + 0.8, 0.6], ['correct', T.cards + 0.2, 0.5], ['correct', T.cards + 0.6, 0.5], ['correct', T.cards + 1.0, 0.5],
    ['hit', T.chips2 + 0.2, 0.9], ['hit', T.chips2 + 0.55, 0.9], ['hit', T.chips2 + 0.9, 0.9], ['fanfare', T.top, 0.6], ['stamp', T.final + 0.15, 1],
    ['whoosh', T.back, 0.8], ['boom', T.door, 1.0],
    ['shutter', T.perfect + 0.9, 0.8], ['glitch', T.perfect + 0.9, 0.6], ['glitch', T.noway + 0.3, 0.6], ['hum', T.what + 0.9, 0.5], ['gasp', T.flee - 0.25, 0.6],
    ['whoosh', T.flee, 0.8], ['ratchet', T.flee + 0.1, 0.7], ['ratchet', T.flee + 0.4, 0.7], ['ding', T.vale + 0.1, 0.5]);
  [0, 1, 2, 3].forEach((i) => cues.push(['hit', T.words + 0.3 + i * 0.45, 0.9], ['pop', T.words + 0.32 + i * 0.45, 0.6]));
  for (let x = T.leap; x < T.night; x += 0.25) cues.push(['tick', x, 0.35]);
  for (let x = T.sprint; x < T.cards; x += 0.2) cues.push(['tick', x, 0.3]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.4 };

  const hits = [T.laugh, T.land, T.quiz + 0.5, T.quiz + 1.6, T.jab1, T.jab2, T.hook, T.floor, T.vamos, T.lockin, T.combo, T.combo + 0.3, T.combo + 0.6, T.combo + 0.9, T.upper, T.kotxt, T.tomorrow, T.door, T.flee];
  window.SCENE = {
    frame(t) {
      X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
      X.save(); camera(t, hits, [], 24);
      if (t < T.street) {
        // ======== BAR: the roast ========
        X.save(); shot(t); bar(t);
        const laughing = t >= T.laugh && t < T.street;
        const bm = (who) => ({ mood: laughing ? 'laugh' : t > T.fail + 0.8 ? 'smug' : 'neutral', lookX: who === 'f' ? 1 : who === 'g' ? 1 : 0.6, lid: '#000' });
        flame(t, 230, 1150, 0.78, { ...bm('f'), shades: true, mood: laughing ? 'laugh' : 'smug', noLids: true, point: t > T.card1, talk: laughing ? 0 : talk('flame', t) });
        gem(t, 440, 1130, 0.75, { ...bm('g'), talk: laughing ? 0 : talk('gem', t) });
        card(t, 650, 1140, 0.72, { ...bm('c'), mood: laughing && t < T.card1 ? 'laugh' : t >= T.card1 ? (talk('card', t) > 0.05 ? 'neutral' : 'smug') : bm('c').mood, lid: '#fffdf6', talk: talk('card', t) });
        hero(t, 880, 1150, 0.8, { talk: talk('hero', t), mood: t < T.fail ? 'happy' : 'worried', sweat: t > T.fail + 0.6, wide: t > T.laugh, lookX: t > T.laugh ? -1 : -0.5, lookY: t > T.card1 ? 1 : 0, squash: t > T.laugh && t < T.laugh + 0.3 ? 1 : 0, seed: 1 });
        table(t); X.restore();
        let p; p = scr(440, 900); bubble(t, T.gem1, T.flame1, '¿Qué pasa, tío?', p[0], p[1] - 40);
        p = scr(230, 880); bubble(t, T.flame1, T.fail, '¡Esto es fiesta!', p[0] + 120, p[1] - 40);
        p = scr(880, 900); bubble(t, T.fail + 0.1, T.laugh, 'Eh… fiesta… is… yes?', Math.min(760, p[0] - 120), p[1] - 40, 0.3);
        if (laughing && t < T.card1) { ['JAJAJA', 'HAHAHA', 'JAJAJA'].forEach((w, i) => { const k = back(lin(t, T.laugh + i * 0.15, T.laugh + i * 0.15 + 0.2), 2.5); X.save(); X.translate([290, 790, 420][i], [330, 470, 610][i] + Math.sin(t * 20 + i) * 14); X.rotate([-0.12, 0.1, -0.05][i]); X.scale(k, k); txt(w, 0, 0, font('anton', 400, 130), '#fff', { stroke: '#e0601c', sw: 14 }); X.restore(); }); }
        p = scr(650, 900); bubble(t, T.card1, T.street, 'Who even ARE you?', p[0], p[1] - 40);
        sub(t, T.gem1, T.flame1, "What's up, mate?"); sub(t, T.flame1, T.fail, 'This is a party!');
      } else if (t < T.pov) {
        // ======== STREET: the sad walk, the tear ========
        X.save(); shot(t); street(t);
        const x = mix(940, 560, eo(lin(t, T.street, T.stop)));
        X.fillStyle = 'rgba(0,0,0,0.3)'; X.beginPath(); X.ellipse(x, 1500, 120, 22, 0, 0, 7); X.fill();
        const tear = lin(t, T.tear, T.tear + 1.8) * 1.4;
        const st = { mood: 'worried', lookY: t > T.close ? 0.3 : 1, lookX: t > T.close ? 0 : -0.5, tilt: -0.05, walk: t < T.stop ? t * 6 : undefined, calm: true, acc: t > T.buzz ? ['phone'] : [], phoneGlow: '#ffd27a', seed: 2 };
        heroX(t, x, 1340, 0.85, st, { brows: 'sad', tear: t > T.tear ? tear : 0 });
        X.save(); X.globalAlpha = 0.16; X.translate(0, 3030); X.scale(1, -1); hero(t, x, 1340, 0.85, { mood: 'worried', lookY: 1, walk: t < T.stop ? t * 6 : undefined }); X.restore();
        X.restore(); rain(t, t > T.close && t < T.buzz ? 0.3 : 0.45);
        ghost(t, T.echo1, T.echo1 + 1.5, 'jajaja…', 300, 560); ghost(t, T.echo2, T.echo2 + 1.4, 'who even are you?', 600, 760);
        if (t > T.buzz) { const k = eo(lin(t, T.buzz, T.buzz + 0.3)); X.fillStyle = `rgba(255,210,120,${0.22 * k * (0.6 + 0.4 * Math.sin(t * 20))})`; X.fillRect(0, 0, W, H); }
        vignette(0.55);
      } else if (t < T.portal) {
        // ======== POV: through his phone — the notification, the tap ========
        X.fillStyle = '#0b0f1a'; X.fillRect(0, 0, W, H);
        X.save(); X.beginPath(); X.roundRect(60, 120, W - 120, H - 240, 60); X.clip();
        street(t); blurSoFar(); rain(t, 0.25);
        const det = t > T.det; const wipeK = lin(t, T.wipe, T.wipe + 0.45); const reading = t > T.notif + 0.3 && t < T.tap + 0.3;
        X.save(); X.translate(W / 2, 1180); X.rotate(Math.sin(t * 2) * 0.02); X.translate(-W / 2, -1180);
        heroX(t, W / 2, 1260, 2.4, { mood: t > T.cta + 0.2 ? 'neutral' : det ? 'neutral' : 'worried', calm: true, lookY: reading ? -1 : 0.2, lookX: reading ? Math.sin(t * 3) * 0.4 : 0, wide: t > T.cta && t < T.cta + 0.5, squash: det && t < T.det + 0.2 ? 1 : 0, seed: 9 },
          { brows: det ? 'angry' : 'sad', tear: wipeK < 0.5 ? 1.2 : 0 });
        X.restore();
        if (wipeK > 0 && wipeK < 1) { const a = mix(-0.6, 0.9, wipeK); X.strokeStyle = '#6e1f2a'; X.lineWidth = 60; X.lineCap = 'round'; X.beginPath(); X.moveTo(W / 2 - 360, 1560); X.lineTo(W / 2 - 160 + a * 260, 1100); X.stroke(); }
        // the notification: slides in, stays, then offers the first lesson
        const ny = 330, open = eo(lin(t, T.cta, T.cta + 0.35)), nh = mix(170, 340, open);
        if (t > T.notif) { const k = back(lin(t, T.notif, T.notif + 0.35), 2); const pressed = t > T.tap && t < T.tap + 0.25;
          X.save(); X.translate(W / 2, mix(-100, ny, k)); X.globalAlpha = cl(k * 1.5);
          X.fillStyle = 'rgba(0,0,0,0.25)'; rr(-436, -78, 880, nh + 12, 40); X.fill();
          X.fillStyle = 'rgba(246,239,226,0.97)'; rr(-440, -86, 880, nh, 40); X.fill();
          X.fillStyle = '#6e1f2a'; rr(-404, -56, 96, 96, 22); X.fill(); X.strokeStyle = '#e3b871'; X.lineWidth = 5; X.beginPath(); X.arc(-356, -8, 24, 0, 7); X.stroke(); X.beginPath(); X.ellipse(-356, -8, 10, 24, 0, 0, 7); X.stroke();
          X.textAlign = 'left'; X.font = font('inter', 800, 40); X.fillStyle = INK; X.fillText('Borderless', -286, -20); X.font = font('inter', 500, 30); X.fillStyle = '#8a8076'; X.fillText('now', 300, -20);
          X.font = font('inter', 500, 36); X.fillStyle = '#4a4038'; X.fillText('Lesson 1 is ready: ordering at the bar.', -286, 30); X.textAlign = 'center';
          if (open > 0) { X.globalAlpha = open; X.fillStyle = pressed ? '#a8512b' : '#c4622d'; rr(-404, 86, 808, 118, 30); X.fill(); txt('Start your first lesson  →', 0, 146, font('inter', 800, 46), '#fff');
            if (t > T.tap) { const r = lin(t, T.tap, T.tap + 0.5); X.strokeStyle = `rgba(255,255,255,${1 - r})`; X.lineWidth = 10; X.beginPath(); X.arc(150, 146, 40 + r * 160, 0, 7); X.stroke(); } }
          X.restore(); }
        // his hand reaches up and taps it
        const reach = t < T.tap ? eio(lin(t, T.tap - 0.45, T.tap)) : 1 - eio(lin(t, T.tap + 0.2, T.tap + 0.5));
        if (reach > 0) { const fx = mix(W + 80, W / 2 + 150, reach), fy = mix(H + 120, ny + 160, reach);
          X.strokeStyle = '#6e1f2a'; X.lineWidth = 70; X.lineCap = 'round'; X.beginPath(); X.moveTo(W + 160, H + 200); X.lineTo(fx, fy); X.stroke();
          X.fillStyle = '#7d2433'; X.beginPath(); X.arc(fx, fy, 40, 0, 7); X.fill(); }
        // the tap opens the app: the screen swirls open from the button
        if (t > T.tap + 0.1) { const k = ei(lin(t, T.tap + 0.1, T.portal)); const cx = W / 2 + 150, cy = ny + 146, R = k * 2200;
          X.save(); X.beginPath(); X.arc(cx, cy, R, 0, 7); X.clip(); X.fillStyle = '#ee8b47'; X.fillRect(0, 0, W, H);
          for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * 6; X.fillStyle = i % 2 ? '#f6efe2' : '#c4622d'; X.beginPath(); X.moveTo(cx, cy); X.arc(cx, cy, 2400, a, a + 6.283 / 32); X.closePath(); X.fill(); }
          X.restore(); }
        X.restore();
        X.strokeStyle = '#111'; X.lineWidth = 40; X.beginPath(); X.roundRect(60, 120, W - 120, H - 240, 60); X.stroke();
        X.fillStyle = '#111'; rr(W / 2 - 110, 140, 220, 50, 25); X.fill();
      } else if (t < T.land) {
        // ======== SUCKED INTO THE PHONE ========
        X.save(); cam(540, 1100, mix(1.0, 1.15, lin(t, T.portal, T.land))); street(t); X.restore(); rain(t, 0.4);
        const grow = eo(lin(t, T.portal, T.portal + 0.45)); const zoom = ei(lin(t, T.suck + 0.45, T.land - 0.05));
        const pw = mix(70, 520, grow) * mix(1, 5.5, zoom), px = mix(430, 540, grow), py = mix(1300, 820, grow);
        // pull lines toward the screen
        if (t > T.portal + 0.3) { X.strokeStyle = 'rgba(255,230,190,0.55)'; X.lineWidth = 5; for (let i = 0; i < 40; i++) { const a = hash(i) * 6.283, r0 = 1300 - ((t * 1800 + hash(i * 3) * 1300) % 1300); X.beginPath(); X.moveTo(px + Math.cos(a) * r0, py + Math.sin(a) * r0); X.lineTo(px + Math.cos(a) * (r0 + 160), py + Math.sin(a) * (r0 + 160)); X.stroke(); } }
        const glow = X.createRadialGradient(px, py, 50, px, py, 900); glow.addColorStop(0, `rgba(238,139,71,${0.5 * grow})`); glow.addColorStop(1, 'rgba(238,139,71,0)'); X.fillStyle = glow; X.fillRect(0, 0, W, H);
        portalScreen(t, px, py, pw, 0);
        // the hero: crouch, jump, spin and shrink into the screen
        const j = lin(t, T.suck, T.suck + 0.5); const crouch = t > T.suck - 0.3 && t < T.suck ? 1 : 0;
        if (j < 1) { const hx = mix(540, px, ei(j)), hy = mix(1380, py, ei(j)) - Math.sin(j * Math.PI) * 220; const hs = mix(0.95, 0.04, ei(j));
          X.save(); X.translate(hx, hy); X.rotate(ei(j) * 9); X.scale(1, 1 + j * 0.6); X.translate(-hx, -hy);
          heroX(t, hx, hy, hs, { mood: j > 0 ? 'o' : 'neutral', squash: crouch, wide: j > 0, acc: [], seed: 2 }, { brows: 'angry' }); X.restore(); }
        whiteFlash(t, T.land - 0.25, T.land + 0.05);
      } else if (t < T.back) {
        // ======== INSIDE THE APP: action ========
        const lesson = Math.round(interp(t, LK)), day = Math.round(interp(t, DK));
        let hud = true;
        if (t < T.run) { // landing
          const d = t - T.land; pathBg(4300 - d * 40);
          const fall = eo(lin(t, T.land, T.land + 0.22)); const y = mix(-300, 1240, fall);
          if (d > 0.2) { const k = lin(d, 0.2, 0.7); X.strokeStyle = `rgba(255,255,255,${1 - k})`; X.lineWidth = 14; X.beginPath(); X.ellipse(540, 1400, 100 + k * 380, 26 + k * 90, 0, 0, 7); X.stroke(); }
          heroX(t, 540, y, 1.1, { mood: d > 0.5 ? 'happy' : 'o', acc: ['headband'], squash: d > 0.2 && d < 0.45 ? 1.4 : 0, armsUp: d > 0.55, seed: 3 }, { brows: d < 0.5 ? 'angry' : undefined });
          if (d > 0.45) slam(t, T.land + 0.45, 'LESSON 1', W / 2, 360, font('anton', 400, 150), '#fff', { stroke: INK, sw: 14, rot: -0.05 });
        } else if (t < T.corner) { // side-scrolling run
          const d = t - T.run, off = d * 1500;
          const sky = X.createLinearGradient(0, 0, 0, 1300); sky.addColorStop(0, '#f6d9a8'); sky.addColorStop(1, '#f3ead8'); X.fillStyle = sky; X.fillRect(0, 0, W, H);
          for (let i = 0; i < 8; i++) { const x = ((i * 300 - off * 0.35) % 2400 + 2400) % 2400 - 300, h = 300 + hash(i) * 260; X.fillStyle = '#e7cfa8'; X.fillRect(x, 1250 - h, 240, h); X.fillStyle = '#d9b98c'; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) X.fillRect(x + 30 + c * 70, 1250 - h + 40 + r * 80, 36, 44); }
          X.fillStyle = '#d9c3a0'; X.fillRect(0, 1250, W, 700); X.fillStyle = '#6b6f7a'; X.fillRect(0, 1380, W, 110);
          X.fillStyle = '#fff'; for (let i = 0; i < 8; i++) { const x = ((i * 260 - off) % 2080 + 2080) % 2080 - 200; X.fillRect(x, 1430, 120, 12); }
          for (let i = 0; i < 3; i++) { const x = 900 + i * 900 - off; X.fillStyle = '#6e1f2a'; X.fillRect(x, 1080, 14, 300); X.fillStyle = '#f6efe2'; rr(x - 90, 1030, 200, 80, 14); X.fill(); txt('LESSON ' + (2 + i), x + 10, 1072, font('anton', 400, 40), '#6e1f2a'); }
          const bx = 1250 - off; X.fillStyle = '#ee8b47'; rr(bx - 80, 1240, 160, 140, 18); X.fill(); txt('¿EL?', bx, 1290, font('anton', 400, 46), '#fff'); txt('¿LA?', bx, 1345, font('anton', 400, 46), '#fff');
          const jk = lin(t, T.run + 0.33, T.run + 0.85); const jy = Math.sin(jk * Math.PI) * 300;
          X.save(); X.translate(360, 1240 - jy); X.rotate(0.14 + jk * 6.283); X.translate(-360, -(1240 - jy));
          heroX(t, 360, 1240 - jy, 0.9, { mood: jk > 0 && jk < 1 ? 'o' : 'happy', acc: ['headband'], walk: jk > 0 && jk < 1 ? undefined : t * 26, tilt: jk > 0 && jk < 1 ? 0 : Math.sin(t * 13) * 0.05, lookX: 1, sweat: true, seed: 3 }, { brows: 'angry' }); X.restore();
          for (let i = 0; i < 6; i++) { const k = ((t * 2.2 + i / 6) % 1); if (jk > 0 && jk < 1) continue; X.fillStyle = `rgba(255,255,255,${0.7 * (1 - k)})`; X.beginPath(); X.arc(300 - k * 260, 1370 - k * 40, 16 + k * 34, 0, 7); X.fill(); }
          X.strokeStyle = 'rgba(255,255,255,0.7)'; X.lineWidth = 6; for (let i = 0; i < 12; i++) { const y = 900 + hash(i) * 500, x = ((hash(i * 7) * 1400 - off * 2.2) % 1400 + 1400) % 1400 - 200; X.beginPath(); X.moveTo(x, y); X.lineTo(x + 220, y); X.stroke(); }
        } else if (t < T.quiz) { // corner whip + dive into a lesson card
          const d = t - T.corner;
          X.save(); X.translate(W / 2, H / 2); X.rotate(-eio(lin(t, T.corner + 0.05, T.corner + 0.4)) * Math.PI / 2); X.scale(1.5, 1.5); X.translate(-W / 2, -H / 2); pathBg(3600 - d * 600); X.restore();
          if (d > 0.05 && d < 0.45) { X.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 18; i++) X.fillRect(0, hash(i) * H, W, 6 + hash(i * 3) * 10); }
          const a = lin(t, T.corner, T.corner + 0.55); const hs = 0.75 + Math.sin(a * Math.PI) * 0.45;
          heroX(t, mix(200, 760, a), 1250 - Math.sin(a * Math.PI) * 400, hs, { mood: 'happy', acc: ['headband'], tilt: mix(-0.3, 0.5, a), seed: 3 });
          const dk = ei(lin(t, T.corner + 0.5, T.quiz)); if (dk > 0) { X.fillStyle = `rgba(246,239,226,${dk})`; X.fillRect(0, 0, W, H); lessonPhone(IMG.les0, W / 2, 960, mix(120, 1400, dk), (1 - dk) * 0.6); }
        } else if (t < T.words) { // quiz: wrong, AGAIN, right
          X.fillStyle = CREAM; X.fillRect(0, 0, W, H);
          txt('LESSON 5 · AT THE BAR', W / 2, 250, font('bebas', 400, 54), '#a8512b', { ls: 4 }); txt('Order a beer.', W / 2, 360, font('serif', 400, 96), INK);
          const opts = [['Yo cerveza.', 640], ['Una caña, por favor.', 840], ['Cerveza… ¿sí?', 1040]]; const wrongT = T.quiz + 0.5, rightT = T.quiz + 1.6;
          opts.forEach(([s, y], i) => { const wrong = i === 0 && t > wrongT, right = i === 1 && t > rightT; const sh = wrong && t < wrongT + 0.35 ? Math.sin(t * 90) * 14 : 0;
            X.fillStyle = wrong ? '#f4c4c0' : right ? '#c8ecd2' : '#fff'; rr(150 + sh, y - 70, 780, 140, 30); X.fill(); X.strokeStyle = wrong ? '#d8322f' : right ? '#3aa35b' : '#d9cdb8'; X.lineWidth = 6; X.stroke();
            txt(s, 540 + sh, y + 4, font('archivo', 400, 50), INK);
            if (wrong) { X.save(); X.translate(860, y); X.strokeStyle = '#d8322f'; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(-26, -26); X.lineTo(26, 26); X.moveTo(26, -26); X.lineTo(-26, 26); X.stroke(); X.restore(); }
            if (right) tick(860, y, back(lin(t, rightT, rightT + 0.2), 3) * 0.8); });
          const hx = 250, hy = 1480, hs = 0.95;
          heroX(t, hx, hy, hs, { mood: t > rightT ? 'happy' : t > wrongT + 0.1 ? 'worried' : 'neutral', acc: ['headband'], sweat: t > wrongT, lookX: 1, lookY: -1, seed: 5 }, { brows: t > T.again && t < rightT ? 'angry' : undefined, gloves: {} });
          sPunch(hx + 150 * hs, hy + 40 * hs, 540, 640, pk(t, wrongT)); sPunch(hx + 150 * hs, hy + 40 * hs, 640, 840, pk(t, rightT));
          comic(t, wrongT, '¡PUM!', 760, 520, '#d8322f', 80); comic(t, rightT, '¡SÍ!', 820, 720, '#3aa35b', 80);
          if (t > T.again && t < rightT + 0.1) slam(t, T.again, 'AGAIN.', 680, 1360, font('anton', 400, 190), '#e23b3b', { stroke: '#fff', sw: 14, rot: 0.05 });
          if (t > rightT) confetti(t, rightT, 640, 840, 30, ['#3aa35b', '#ffd23d', '#fff', OR], 0.9);
        } else if (t < T.leap) { // word fight
          rays(t, '#ee8b47', W / 2, 1150);
          const hx = 540, hy = 1260, hs = 1.15; const W4 = [['la cuenta', -1, '¡PUM!'], ['invito yo', 1, '¡ZAS!'], ['¿me lo repites?', -1, '¡TOMA!'], ['unas bravas', 1, '¡OLÉ!']];
          let gl = {};
          W4.forEach(([w, side, c], i) => { const tp = T.words + 0.3 + i * 0.45; const ty = 640 + (i % 2) * 140;
            if (t < tp) { const k = lin(t, tp - 0.45, tp); if (k > 0) { const x = mix(side < 0 ? -300 : W + 300, side < 0 ? 300 : 780, k); X.save(); X.translate(x, ty); X.rotate(t * 3 * side); X.font = font('archivo', 400, 54); const ww = X.measureText(w).width + 60; X.fillStyle = '#fff'; rr(-ww / 2, -46, ww, 92, 46); X.fill(); X.strokeStyle = INK; X.lineWidth = 6; X.stroke(); txt(w, 0, 3, font('archivo', 400, 54), INK); X.restore(); } }
            else if (t < tp + 0.5) { const b = (t - tp) / 0.5; for (let q = 0; q < w.length; q++) { const a = q / w.length * 6.283 + i; X.save(); X.translate((side < 0 ? 300 : 780) + Math.cos(a) * b * 500, ty + Math.sin(a) * b * 400 + b * b * 300); X.rotate(b * 8 * (q % 2 ? 1 : -1)); X.globalAlpha = 1 - b; txt(w[q], 0, 0, font('archivo', 400, 60), '#fff', { stroke: INK, sw: 6 }); X.restore(); } }
            const k = pk(t, tp); if (k > 0) { if (side < 0) gl.l = [-150 - k * 140, -60 - k * 300]; else gl.r = [150 + k * 140, -60 - k * 300]; }
            comic(t, tp, c, side < 0 ? 330 : 750, ty - 160, '#ffd23d', 70); });
          heroX(t, hx, hy, hs, { mood: 'happy', acc: ['headband'], sweat: true, squash: 0, seed: 6 }, { brows: 'angry', gloves: gl });
        } else if (t < T.night) { // leap along the path
          const d = t - T.leap; pathBg(3900 - d * 1500); speedLines(t, 0.4);
          const hop = Math.abs(Math.sin(d * Math.PI * 4)); heroX(t, 540, 1250 - hop * 160, 0.85 + hop * 0.1, { mood: 'happy', acc: ['headband'], sweat: true, squash: hop < 0.12 ? 0.8 : 0, seed: 3 });
          for (let i = 0; i < 4; i++) { const tp = T.leap + 0.15 + i * 0.3; if (t > tp) tick(260 + (i % 2) * 560, 700 + i * 120 + (t - tp) * 1500, back(lin(t, tp, tp + 0.15), 3) * 0.9); }
        } else if (t < T.stamps) { // 02:14 at night
          X.fillStyle = '#0d1020'; X.fillRect(0, 0, W, H); const lamp = X.createRadialGradient(540, 760, 20, 540, 900, 700); lamp.addColorStop(0, 'rgba(255,214,140,0.5)'); lamp.addColorStop(1, 'rgba(255,214,140,0)'); X.fillStyle = lamp; X.fillRect(0, 0, W, H);
          heroX(t, 540, 1050, 1.6, { mood: 'neutral', acc: ['headband', 'phone'], phoneGlow: '#ffe7b0', sweat: true, lookX: -0.8, lookY: 0.5, seed: 6 }, { brows: 'angry' });
          txt('DAY 9 · 02:14', W / 2, 330, font('mono', 700, 64), '#ffd27a');
        } else if (t < T.boss) { // stamps
          X.fillStyle = '#e9dcc4'; X.fillRect(0, 0, W, H); phone(IMG.pass, W / 2, 1000, 620, { focus: [585, 1900], zoom: 1.35 });
          [['50', 'WORDS', 300, 600, '#a8512b'], ['200', 'WORDS', 760, 720, '#2f7fd0'], ['600', 'WORDS', 520, 1450, '#6e1f2a']].forEach(([a, b, x, y, c], i) => { const t0 = T.stamps + i * 0.3; if (t < t0) return; const k = mix(2.2, 1, eo(lin(t, t0, t0 + 0.14)));
            X.save(); X.translate(x, y); X.rotate((i - 1) * 0.2); X.scale(k, k); X.strokeStyle = c; X.lineWidth = 10; X.beginPath(); X.arc(0, 0, 140, 0, 7); X.stroke(); txt(a, 0, -20, font('anton', 400, 90), c); txt(b, 0, 55, font('bebas', 400, 46), c); X.restore(); });
        } else if (t < T.ring) { // BOSS FIGHT poster
          hud = false; const d = t - T.boss;
          X.fillStyle = '#6e1f2a'; X.fillRect(0, 0, W, H); X.fillStyle = '#26365e'; X.beginPath(); X.moveTo(W, 0); X.lineTo(W, H); X.lineTo(0, H); X.lineTo(W, 300); X.fill();
          X.fillStyle = '#26365e'; X.beginPath(); X.moveTo(W * 0.62, 0); X.lineTo(W, 0); X.lineTo(W, H); X.lineTo(W * 0.38, H); X.fill();
          const sl = eo(lin(t, T.boss, T.boss + 0.3));
          heroX(t, mix(-300, 300, sl), 1180, 1.1, { mood: 'neutral', acc: ['headband'], seed: 3 }, { brows: 'angry', gloves: { l: [-120, -80], r: [120, -80] } });
          enye(t, mix(W + 300, 790, sl), 1150, 0.95, { mood: 'angry', lookX: -1 });
          slam(t, T.boss + 0.3, 'VS', W / 2, 880, font('bungee', 400, 220), '#ffd23d', { stroke: INK, sw: 16 });
          slam(t, T.boss + 0.05, 'BOSS FIGHT', W / 2, 260, font('anton', 400, 150), '#fff', { stroke: INK, sw: 12, rot: -0.04 });
          if (d > 0.45) txt('LESSON 31 · LA Ñ', W / 2, 1650, font('anton', 400, 80), '#fff');
        } else if (t < T.hook + 0.7) { // the ring: good start, cocky, then THE HOOK
          hud = t < T.hook;
          X.save();
          const RK = [[T.ring, 540, 1100, 1.0], [T.jab1 - 0.1, 600, 1120, 1.45], [T.cocky, 360, 1080, 1.9], [T.windup, 780, 1020, 2.0], [T.oblivious, 380, 1130, 2.3], [T.hook, 480, 1100, 1.25]];
          keyCam(t, RK); ringSet(t);
          const fly = lin(t, T.hook, T.hook + 0.7);
          const nGl = t < T.windup ? { l: [-200, -40], r: [-170 + pk(t, T.cocky + 0.3) * -80, -80] } : t < T.hook - 0.1 ? { l: [-200, -40], r: [mix(200, 340, eo(lin(t, T.windup, T.windup + 0.4))), mix(-40, -120, lin(t, T.windup, T.windup + 0.4))] } : { l: [-200, -40], r: [mix(340, -560, eo(lin(t, T.hook - 0.1, T.hook))), -80] };
          const rec = pk(t, T.jab1, 0.05, 0.4) + pk(t, T.jab2, 0.05, 0.4);
          enye(t, 760 + rec * 40, 1160, 0.75, { mood: t > T.windup ? 'angry' : rec > 0.2 ? 'hurt' : 'neutral', tilt: rec * 0.18, gloves: nGl, lookX: -1 });
          if (fly <= 0) {
            const cocky = t > T.cocky && t < T.windup + 0.2; const jab = (tp) => pk(t, tp, 0.06, 0.2);
            const gl = cocky ? { l: [-170, -150], r: [170, -150] } : { l: [-100, -5], r: [100 + (jab(T.jab1) + jab(T.jab2)) * 340, -5 - (jab(T.jab1) + jab(T.jab2)) * 60] };
            heroX(t, 360, 1250, 0.9, { talk: talk('hero', t), mood: t > T.jab1 ? 'happy' : 'neutral', acc: ['headband'], lookX: cocky ? -1 : 1, wink: t > T.oblivious, walk: t * 8, calm: true, seed: 3 }, { gloves: gl, brows: t < T.jab1 ? 'angry' : undefined });
          } else { const hx = mix(360, 90, eo(fly)), hy = 1250 - Math.sin(fly * Math.PI) * 260 + fly * 120;
            X.save(); X.translate(hx, hy); X.rotate(-eo(fly) * 1.6); X.translate(-hx, -hy);
            heroX(t, hx, hy, 0.9, { mood: 'o', acc: ['headband'], wide: true, seed: 3 }, { ko: fly > 0.3, gloves: { l: [-210, -60], r: [190, 20] } }); X.restore();
            for (let i = 0; i < 6; i++) { const k = fly * (0.8 + hash(i) * 0.6); X.fillStyle = '#7fc4e8'; X.beginPath(); X.arc(360 + Math.cos(i * 1.3) * 300 * k, 1100 - Math.sin(i * 1.1 + 0.5) * 260 * k + k * k * 300, 10, 0, 7); X.fill(); } }
          X.restore();
          comic(t, T.jab1, '¡PUM!', 740, 800, '#ffd23d', 80); comic(t, T.jab2, '¡PAM!', 820, 900, '#ffd23d', 80);
          if (t > T.cocky + 0.1 && t < T.windup) bubble(t, T.cocky + 0.1, T.windup, 'Too easy.', 560, 760, -0.35, 60);
          if (t > T.windup && t < T.hook) { X.fillStyle = `rgba(160,0,0,${0.18 * lin(t, T.windup, T.hook)})`; X.fillRect(0, 0, W, H); }
          if (t >= T.hook && t < T.hook + 0.1) { X.save(); X.globalCompositeOperation = 'difference'; X.fillStyle = '#fff'; X.fillRect(0, 0, W, H); X.restore(); }
          if (t >= T.hook + 0.1) desat(lin(t, T.hook + 0.1, T.hook + 0.6) * 0.9);
          if (t > T.hook && t < T.hook + 0.35) comic(t, T.hook, '¡CRACK!', W / 2, 700, '#e23b3b', 130);
        } else if (t < T.lockin) { // ======== DOWN. silence, count, echoes, GET UP ========
          hud = false;
          const up = eio(lin(t, T.rise, T.rise + 0.6)); const awake = t > T.eyes;
          X.save(); const zz = mix(2.3, 1.35, up) * (1 + (t - T.floor) * 0.01); cam(mix(470, 540, up), mix(1330, 1120, up), zz);
          ringSet(t * 0.2); if (t < T.rise + 0.3) blurSoFar();
          // referee leaning in, counting
          const n = T.counts.filter((c) => t >= c).length;
          referee(t, 690, 1170, 0.75, { count: n, tilt: -0.25 });
          const hx = mix(470, 540, up), hy = mix(1390, 1180, up);
          X.save(); X.translate(hx, hy); X.rotate(mix(-Math.PI / 2, 0, up)); X.translate(-hx, -hy);
          heroX(t, hx, hy, 1.0, { talk: talk('hero', t), mood: awake ? 'neutral' : 'o', acc: ['headband'], calm: true, wide: awake, lookX: awake ? 0.6 : 0, sweat: true, squash: t > T.vamos && t < T.vamos + 0.25 ? 1 : 0, seed: 3 },
            { ko: !awake, brows: awake ? 'angry' : undefined, gloves: up > 0.5 ? { l: [-80, -60], r: [80, -60] } : { l: [-200, 60], r: [200, 60] } });
          X.restore(); X.restore();
          desat(mix(0.9, 0, lin(t, T.eyes + 0.5, T.lockin))); vignette(mix(0.85, 0.4, lin(t, T.eyes, T.lockin)));
          if (awake) { const pulse = Math.max(0, Math.sin((t - T.eyes) * 8)) * 0.18 * (1 - lin(t, T.rise, T.lockin)); X.fillStyle = `rgba(200,20,20,${pulse})`; X.fillRect(0, 0, W, H); }
          T.counts.forEach((c, i) => { if (t < c || t > c + 0.75 || i > 6) return; const k = lin(t, c, c + 0.75); X.save(); X.globalAlpha = 0.45 * (1 - k); txt(String(i + 1), W / 2, 420, font('anton', 400, mix(240, 330, k)), '#fff'); X.restore(); });
          ghost(t, T.ghostA, T.ghostA + 1.4, 'Who even ARE you?', 540, 620); ghost(t, T.ghostB, T.ghostB + 1.3, 'JAJAJA', 360, 860); ghost(t, T.ghostC, T.ghostC + 1.8, 'Day 1204. Never missed one.', 560, 740);
          if (t > T.vamos) { slam(t, T.vamos, '¡VAMOS!', W / 2, 420, font('anton', 400, 200), '#fff', { stroke: '#e23b3b', sw: 16, rot: -0.06 }); }
        } else if (t < T.sprint) { // ======== LOCK IN → destroy the Ñ ========
          if (t < T.combo - 0.05) { hud = false; rays(t, '#e23b3b', W / 2, 1000); heroX(t, W / 2, 1100, 2.0, { mood: 'neutral', acc: ['headband'], squash: t < T.lockin + 0.2 ? 1.2 : 0, seed: 4 }, { brows: 'angry', gloves: { l: [-90, -90], r: [90, -90] } });
            slam(t, T.lockin, 'LOCK IN.', W / 2, 330, font('anton', 400, 210), '#fff', { stroke: INK, sw: 16, rot: -0.06 });
          } else {
            X.save(); keyCam(t, [[T.combo - 0.05, 600, 1080, 1.5], [T.upper, 620, 900, 1.05], [T.raise, 540, 1060, 1.15]]); ringSet(t);
            const uk = lin(t, T.upper, T.upper + 0.6); const comboRec = [0, 1, 2, 3].reduce((a, i) => a + pk(t, T.combo + i * 0.3, 0.05, 0.25), 0);
            if (uk < 1) enye(t, 760 + comboRec * 50 + uk * 200, 1160 - eo(uk) * 1500, 0.75, { mood: 'hurt', tilt: comboRec * 0.2 + uk * 3, noTilde: t > T.upper, gloves: { l: [-230, -120], r: [230, -120] } });
            if (t > T.upper) { const tk = lin(t, T.upper, T.upper + 1.6); tilde(mix(760, 470, tk), mix(880, 1240, eo(tk)) - Math.sin(tk * Math.PI) * 500, 0.7, tk * 12 * (1 - tk * 0.6)); }
            const ci = Math.floor((t - T.combo) / 0.25); const jab = [0, 1, 2, 3].map((i) => pk(t, T.combo + i * 0.3, 0.06, 0.2));
            const up = pk(t, T.upper, 0.08, 0.5);
            const gl = t > T.raise ? { l: [-90, -80], r: [170, -330] } : { l: [-60 + (jab[1] + jab[3]) * 420, -70 - jab[3] * 60], r: [60 + (jab[0] + jab[2]) * 420 + up * 200, -70 - up * 340] };
            heroX(t, t > T.raise ? 470 : 380, 1250, 0.9, { mood: t > T.kotxt ? 'happy' : 'neutral', acc: ['headband'], walk: t * 10, calm: true, lookX: 1, seed: 3 }, { brows: t < T.kotxt ? 'angry' : undefined, gloves: gl });
            if (t > T.raise) referee(t, 760, 1100, 0.85, { raiseL: true });
            X.restore();
            ['¡PUM!', '¡PAM!', '¡ZAS!', '¡TOMA!'].forEach((c, i) => comic(t, T.combo + i * 0.3, c, [760, 640, 820, 700][i], [820, 720, 900, 780][i], '#ffd23d', 80));
            comic(t, T.upper, '¡BOOM!', 640, 560, '#e23b3b', 110);
            if (t > T.kotxt) { slam(t, T.kotxt, 'K.O.', W / 2, 420, font('bungee', 400, 260), '#ffd23d', { stroke: INK, sw: 18 }); confetti(t, T.raise, W / 2, 600, 70, [OR, '#fff', '#ffd23d', '#6e1f2a'], 1.4); }
          }
        } else if (t < T.cards) { // euphoric sprint + THERE IS NO TOMORROW
          const d = t - T.sprint; pathBg(3300 - d * 1300); speedLines(t, 0.55, 34, 3400);
          heroX(t, 540, 1260, 0.95, { mood: 'happy', acc: ['headband'], sweat: true, walk: t * 28, lookY: -0.4, seed: 3 }, { brows: 'angry' });
          if (t >= T.tomorrow) { const k = back(lin(t, T.tomorrow, T.tomorrow + 0.25), 2.4); X.save(); X.translate(W / 2, 640); X.rotate(-0.08); X.scale(k, k); txt('THERE IS', 0, -90, font('anton', 400, 150), '#fff', { stroke: '#e23b3b', sw: 16 }); txt('NO TOMORROW!', 0, 80, font('anton', 400, 150), '#fff', { stroke: '#e23b3b', sw: 16 }); X.restore(); }
        } else if (t < T.chips2) { // lesson cards flying past, each one done
          X.fillStyle = CREAM; X.fillRect(0, 0, W, H); speedLines(t, 0.0);
          [IMG.les0, IMG.les2, IMG.les0].forEach((im, i) => { const t0 = T.cards + i * 0.4; const k = lin(t, t0, t0 + 0.45); if (k <= 0 || k >= 1) return;
            lessonPhone(im, mix(1500, -500, ei(k)), 960, 640, mix(0.3, -0.3, k), 1150 - i * 200); if (k > 0.25) tick(mix(1500, -500, ei(k)) + 220, 600, 1.1); });
          heroX(t, 540, 1550, 0.75, { mood: 'happy', acc: ['headband'], walk: t * 26, seed: 3 });
        } else if (t < T.top) { // quick word smashes
          rays(t, '#ee8b47', W / 2, 1150); let gl = {};
          [['¿cuánto es?', -1], ['la carta', 1], ['vale', -1]].forEach(([w, side], i) => { const tp = T.chips2 + 0.2 + i * 0.35; const ty = 700 + (i % 2) * 140;
            if (t < tp) { const k = lin(t, tp - 0.3, tp); if (k > 0) { X.save(); X.translate(mix(side < 0 ? -300 : W + 300, side < 0 ? 300 : 780, k), ty); X.font = font('archivo', 400, 54); const ww = X.measureText(w).width + 60; X.fillStyle = '#fff'; rr(-ww / 2, -46, ww, 92, 46); X.fill(); X.strokeStyle = INK; X.lineWidth = 6; X.stroke(); txt(w, 0, 3, font('archivo', 400, 54), INK); X.restore(); } }
            const k = pk(t, tp); if (k > 0) { if (side < 0) gl.l = [-150 - k * 140, -60 - k * 300]; else gl.r = [150 + k * 140, -60 - k * 300]; }
            comic(t, tp, ['¡PUM!', '¡ZAS!', '¡OLÉ!'][i], side < 0 ? 330 : 750, ty - 150, '#ffd23d', 70); });
          heroX(t, 540, 1260, 1.15, { mood: 'happy', acc: ['headband'], sweat: true, seed: 6 }, { brows: 'angry', gloves: gl });
        } else if (t < T.final) { // 50/50
          pathBg(1600); heroX(t, 540, 1260, 1.05, { mood: 'happy', acc: ['headband'], armsUp: true, wave: true, seed: 3 });
          confetti(t, T.top, W / 2, 700, 80, [OR, '#fff', '#ffd23d', '#6e1f2a'], 1.6); const k = back(lin(t, T.top, T.top + 0.3)); X.save(); X.translate(W / 2, 430); X.scale(k, k); txt('50 / 50', 0, 0, font('anton', 400, 220), '#fff', { stroke: INK, sw: 16 }); X.restore();
        } else { // passport stamped
          X.fillStyle = '#e9dcc4'; X.fillRect(0, 0, W, H); phone(IMG.pass, W / 2, 1000, 620, { focus: [585, 1900], zoom: 1.35 });
          const k = mix(2.4, 1, eo(lin(t, T.final + 0.15, T.final + 0.3))); if (t > T.final + 0.15) { X.save(); X.translate(W / 2, 980); X.rotate(-0.15); X.scale(k, k); X.strokeStyle = '#a8512b'; X.lineWidth = 14; rr(-330, -120, 660, 240, 30); X.stroke(); txt('LISTO.', 0, 10, font('anton', 400, 150), '#a8512b'); X.restore(); }
          whiteFlash(t, T.back - 0.4, T.back + 0.2);
        }
        if (hud) { X.fillStyle = 'rgba(0,0,0,0.75)'; rr(40, 60, 380, 90, 20); X.fill(); txt(`LESSON ${lesson}/50`, 230, 107, font('anton', 400, 56), '#fff');
          X.fillStyle = 'rgba(0,0,0,0.75)'; rr(W - 300, 60, 260, 90, 20); X.fill(); txt(`DAY ${day}`, W - 170, 107, font('anton', 400, 56), '#ffd27a'); }
      } else {
        // ======== COMEBACK ========
        X.save(); shot(t); bar(t);
        const shC = t > T.perfect - 0.2, shG = t > T.noway - 0.2, shF = t > T.what - 0.1; const gone = t > T.flee;
        const runK = (o) => eo(lin(t, T.flee + o, T.flee + o + 0.6)); const jump = (o) => t > T.flee - 0.3 + o && t < T.flee + o ? -Math.sin(lin(t, T.flee - 0.3 + o, T.flee + o) * Math.PI) * 60 : 0;
        if (runK(0.16) < 1) {
          const fx = mix(230, -500, runK(0)), gx = mix(440, -500, runK(0.08)), cx = mix(650, -500, runK(0.16));
          const shadesDown = shF ? eo(lin(t, T.what + 0.2, T.what + 0.6)) : 0;
          flame(t, fx, 1150 + jump(0), 0.78, { talk: talk('flame', t), mood: shF ? 'shock' : talk('flame', t) > 0.05 ? 'neutral' : 'smug', shades: t < T.what + 0.35, noLids: true, out: T.what + 0.95 });
          if (shF && shadesDown < 1) { X.save(); X.translate(fx, 1150 + shadesDown * 400); X.scale(0.78, 0.78); X.restore(); }
          gem(t, gx, 1130 + jump(0.08), 0.75, { talk: talk('gem', t), mood: shG ? 'shock' : 'smug', crack: T.noway + 0.3 });
          card(t, cx, 1140 + jump(0.16), 0.72, { talk: talk('card', t), mood: shC ? 'shock' : 'smug', crack: T.perfect + 0.9, lid: '#fffdf6' });
          if (gone) for (let i = 0; i < 8; i++) { const k = ((t - T.flee) * 1.5 + i * 0.1) % 1; X.fillStyle = `rgba(230,200,170,${0.7 * (1 - k)})`; X.beginPath(); X.arc(300 - k * 300 + i * 40, 1300 - k * 80, 30 + k * 60, 0, 7); X.fill(); }
        }
        const inK = eo(lin(t, T.door, T.door + 1.0));
        hero(t, mix(1250, 880, inK), 1150, 0.8, { talk: talk('hero', t), mood: t > T.vale ? 'happy' : 'neutral', acc: ['shades', 'headband'], walk: inK < 1 ? t * 6 : undefined, wink: t > T.vale, point: t > T.win && t < T.win + 1.2, lookX: t > T.algo && t < T.flee ? -1 : 0, seed: 7 });
        table(t); X.restore();
        whiteFlash(t, T.door - 0.2, T.door + 0.6);
        let p = scr(230, 880); bubble(t, T.flame3, T.win, 'Back for more?', p[0] + 140, p[1] - 40);
        bigBubble(t, T.win + 0.05, T.win + 4.6, ['Camarero:', 'tres cañas y unas bravas', 'para mis amigos.', 'Invito yo.'], [0, 0.95, 2.5, 3.75], W / 2, 470);
        sub(t, T.win + 0.05, T.win + 4.6, 'Waiter: three beers and patatas bravas\nfor my friends. On me.');
        p = scr(650, 900); bubble(t, T.perfect, T.noway - 0.1, 'That was… grammatically perfect.', Math.max(330, Math.min(750, p[0])), p[1] - 60, -0.1, 58);
        p = scr(440, 900); bubble(t, T.noway, T.what - 0.1, 'No way.', p[0], p[1] - 60, -0.2, 70);
        p = scr(230, 880); bubble(t, T.what, T.algo, 'Wait… what?', Math.max(300, p[0] + 140), p[1] - 60, -0.3, 70);
        p = scr(880, 900); bubble(t, T.algo, T.flee + 0.6, '¿Algo más?', p[0] - 200, p[1] - 60, 0.3, 80); sub(t, T.algo, T.flee + 0.6, 'Anything else?');
        if (t > T.flee - 0.25 && t < T.flee + 0.5) { X.save(); X.translate(260, 700); X.rotate(-0.1); txt('AAAH!', 0, 0, font('bungee', 400, 140), '#fff', { stroke: '#e23b3b', sw: 12 }); X.restore(); }
        p = scr(880, 900); bubble(t, T.vale, T.end, 'Vale.', p[0] - 200, p[1] - 60, 0.3, 80); sub(t, T.vale, T.end, 'Cool.');
      }
      X.restore();
      X.fillStyle = '#000'; X.fillRect(0, 0, W, 40); X.fillRect(0, H - 40, W, 40);
      if (t > T.end - 0.6) { X.fillStyle = `rgba(0,0,0,${lin(t, T.end - 0.6, T.end)})`; X.fillRect(0, 0, W, H); }
    },
  };
})();
