// SERIES — shared characters, sets and helpers for "La Esquina" (extracted from the short film, then extended).
// Loaded by each episode scene: await SER_LOAD (see bottom).
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
  else if (m.mood === 'happy') { X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); X.moveTo(-26, ey + 44); X.quadraticCurveTo(0, ey + 70, 26, ey + 44); X.stroke(); }
  else if (m.mood === 'sad') { X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); X.moveTo(-22, ey + 62); X.quadraticCurveTo(0, ey + 44, 22, ey + 62); X.stroke(); }
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
  X.fillStyle = '#fff'; rr(-62, 116, 124, 34, 17); X.fill(); txt(m.day || 'DAY 1204', 0, 134, font('anton', 400, 24), '#e0601c');
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
function sub(t, t0, t1, text) { if (t < t0 || t > t1) return; const f = font('inter', 800, 42); const ls = [].concat(...text.split('\n').map((p) => wrapText(p, f, 920))); X.font = f; const w = Math.min(1000, Math.max(...ls.map((l) => X.measureText(l).width)) + 50); const h = 62 * ls.length + 12, y0 = 1772 - h;
  X.fillStyle = 'rgba(0,0,0,0.72)'; rr(W / 2 - w / 2, y0, w, h, 14); X.fill(); ls.forEach((l, i) => txt(l, W / 2, y0 + 37 + i * 62, f, '#fff')); }
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
let CAM = [540, 960, 1];
const scr = (wx, wy) => [W / 2 + (wx - CAM[0]) * CAM[2], H / 2 + (wy - CAM[1]) * CAM[2]];
function cam(cx, cy, z) { X.translate(W / 2, H / 2); X.scale(z, z); X.translate(-cx, -cy); }
function keyCam(t, keys) { let k = keys[0]; for (const x of keys) if (t >= x[0]) k = x; const z = k[3] * (1 + (t - k[0]) * 0.03); cam(k[1], k[2], z); }
const interp = (t, K) => { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) return mix(K[i - 1][1], K[i][1], lin(t, K[i - 1][0], K[i][0])); return K[K.length - 1][1]; };

// ======================= EPISODE FRAMEWORK =======================
const EP = { L: {}, M: {}, lips: {}, dur: 60 };
async function epLoad(ep) {
  const tl = await (await fetch(`v/${ep}/timeline.json`)).json(); EP.L = tl.lines; EP.M = tl.marks; EP.dur = tl.dur;
  EP.lips = await (await fetch(`v/${ep}/lips.json`)).json(); return tl;
}
function talk(who, t) { for (const [t0, v] of (EP.lips[who] || [])) { const f = (t - t0) * 30, i = Math.floor(f); if (i >= 0 && i < v.length - 1) return mix(v[i], v[i + 1], f - i); } return 0; }
const Lt = (id) => EP.L[id].t, Le = (id) => EP.L[id].t + EP.L[id].d, Mk = (m) => EP.M[m];
// speech bubble for a line, shown while it is spoken (+ a little), with its subtitle
function wrapText(text, f, maxw) { X.font = f; const words = text.split(' '); const out = []; let cur = '';
  for (const w of words) { const tryS = cur ? cur + ' ' + w : w; if (X.measureText(tryS).width > maxw && cur) { out.push(cur); cur = w; } else cur = tryS; } if (cur) out.push(cur); return out; }
// multi-line comic bubble; tail points down toward (x + tail*w, y + h/2 + 50)
function bub(t, t0, t1, text, x, y, o = {}) { if (t < t0 || t > t1) return; const size = o.size || 52, maxw = o.maxw || 760, f = font(o.f || 'archivo', 400, size);
  const ls = wrapText(text, f, maxw - size); X.font = f; const w = Math.min(maxw, Math.max(...ls.map((l) => X.measureText(l).width)) + size * 1.2), lh = size * 1.18, h = ls.length * lh + size * 0.8;
  const k = back(lin(t, t0, t0 + 0.18), 2.4) * (1 - lin(t, t1 - 0.12, t1)); const bx = cl(x, w / 2 + 30, W - w / 2 - 30), tx = cl((o.tail ?? -0.25) * w, -w / 2 + 40, w / 2 - 40) + (x - bx) * 0.5;
  X.save(); X.translate(bx, y); X.rotate(o.rot ?? -0.02); X.scale(k, k);
  const tail = (dx, dy) => { X.beginPath(); X.moveTo(tx - 26 + dx, h / 2 - 8 + dy); X.lineTo(tx - 40 + dx, h / 2 + 50 + dy); X.lineTo(tx + 30 + dx, h / 2 - 8 + dy); X.closePath(); };
  X.fillStyle = '#111'; rr(-w / 2 + 8, -h / 2 + 10, w, h, Math.min(46, h / 2)); X.fill(); tail(8, 10); X.fill();
  X.lineWidth = 6; X.strokeStyle = '#111'; X.fillStyle = o.bg || '#fff'; tail(0, 0); X.fill(); X.stroke(); rr(-w / 2, -h / 2, w, h, Math.min(46, h / 2)); X.fill(); X.stroke(); X.fillRect(tx - 24, h / 2 - 11, 50, 12);
  ls.forEach((l, i) => txt(l, 0, -h / 2 + size * 0.4 + lh * (i + 0.5) + size * 0.04, f, o.fg || '#111')); X.restore(); }
// speech bubble for a line while it is spoken, with its subtitle
function say(t, id, x, y, o = {}) { const l = EP.L[id]; if (!l) return; const t1 = o.until ?? (l.t + l.d + 0.45);
  bub(t, l.t - 0.06, t1, o.text || l.text, x, y, o); if (l.sub && !o.nosub) sub(t, l.t, t1, l.sub); }
function titleCard(t, ep, title, col = '#7a1f35') { if (t > 1.35) return; const a = 1 - lin(t, 1.05, 1.35);
  X.save(); X.globalAlpha = a; X.fillStyle = col; X.fillRect(0, 0, W, H);
  for (let i = 0; i < 18; i++) { const x = -160 + i * 80; X.fillStyle = 'rgba(246,239,226,0.10)'; X.fillRect(x, 1300, 76, 76); }
  const k = back(lin(t, 0.0, 0.3), 2.2); X.translate(W / 2, 860); X.scale(k, k);
  X.shadowColor = '#ff6a9a'; X.shadowBlur = 30; txt('LA ESQUINA', 0, 0, font('bungee', 400, 128), '#ffd1df'); X.shadowBlur = 0;
  txt('EP. ' + ep, 0, 150, font('anton', 400, 70), '#f6efe2'); txt(title, 0, 240, font('serif', 400, 66), '#f6efe2'); X.restore(); }
// the passport: left page = photo page (torn or restored), right page = stamps so far + the new one slamming in
const STAMPS = ['Primera caña', 'Famoso', 'Valencia', 'Cupido', 'Libre', 'Familia', 'Madrid de noche', 'Equipo', 'Amigos'];
const STAMP_COL = ['#a8512b', '#2f7fd0', '#3aa35b', '#d8506a', '#6e1f2a', '#c4622d', '#4a3a8c', '#1f7a6a', '#b5841a'];
function passportShot(t, t0, have, add = null, o = {}) {
  X.fillStyle = '#2a1d16'; X.fillRect(0, 0, W, H);
  const k = eo(lin(t, t0, t0 + 0.4)); X.save(); X.translate(W / 2, 980); X.scale(mix(0.85, 1, k), mix(0.85, 1, k));
  X.fillStyle = '#6e1f2a'; rr(-500, -640, 1000, 1280, 40); X.fill();
  X.fillStyle = '#f3ead6'; rr(-470, -610, 460, 1220, 20); X.fill(); rr(10, -610, 460, 1220, 20); X.fill();
  X.strokeStyle = 'rgba(110,31,42,0.12)'; X.lineWidth = 2; for (let i = 0; i < 30; i++) { X.beginPath(); X.moveTo(-470, -600 + i * 41); X.lineTo(-10, -600 + i * 41); X.stroke(); }
  // left page: torn edge, or (restored) the photo
  if (o.photo) { X.fillStyle = '#d8c39a'; rr(-400, -420, 320, 260, 10); X.fill(); X.fillStyle = '#2f4f8c'; rr(-370, -380, 90, 130, 14); X.fill(); X.fillStyle = '#8c2a2a'; rr(-210, -380, 90, 130, 14); X.fill(); X.fillStyle = '#6e1f2a'; rr(-268, -320, 46, 70, 8); X.fill(); txt('Madrid, 2006', -240, -120, font('caveat', 700, 44), '#5a4030'); }
  else { X.fillStyle = '#2a1d16'; X.beginPath(); X.moveTo(-470, -610); for (let i = 0; i <= 24; i++) X.lineTo(-470 + (i % 2 ? 24 : 0) + 6, -610 + i * 51); X.lineTo(-480, 610); X.closePath(); X.fill(); }
  txt('PASITO', -240, 360, font('anton', 400, 64), '#6e1f2a'); txt('Madrid', -240, 430, font('serif', 400, 44), '#8a6a50');
  // right page: stamp grid 2 x 5
  const slot = (i) => [130 + (i % 2) * 230, -470 + Math.floor(i / 2) * 240];
  const drawStamp = (i, a = 1, sc = 1) => { const [x, y] = slot(i); X.save(); X.translate(x, y); X.rotate((hash(i * 7) - 0.5) * 0.4); X.scale(sc, sc); X.globalAlpha = a;
    X.strokeStyle = STAMP_COL[i]; X.lineWidth = 8; X.beginPath(); X.arc(0, 0, 100, 0, 7); X.stroke(); X.lineWidth = 3; X.beginPath(); X.arc(0, 0, 84, 0, 7); X.stroke();
    let fs = 40; X.font = font('anton', 400, fs); const w = X.measureText(STAMPS[i].toUpperCase()).width; if (w > 150) fs *= 150 / w; txt(STAMPS[i].toUpperCase(), 0, 0, font('anton', 400, fs), STAMP_COL[i]);
    txt('★ ' + (i + 1) + ' ★', 0, 52, font('bebas', 400, 28), STAMP_COL[i]); X.restore(); };
  for (let i = 0; i < have; i++) drawStamp(i, 0.9);
  if (add != null) { const ts = t0 + 0.55; if (t >= ts) { const s = mix(2.6, 1, eo(lin(t, ts, ts + 0.12))); drawStamp(add, cl((t - ts) / 0.06), s); }
    else { const hy = mix(-900, 0, ei(lin(t, t0 + 0.2, ts))); const [x, y] = slot(add); X.save(); X.translate(x, y + hy - 160); X.fillStyle = '#5a3a1a'; rr(-30, -200, 60, 150, 14); X.fill(); X.fillStyle = '#2a1d16'; rr(-90, -60, 180, 60, 14); X.fill(); X.restore(); } }
  if (o.empty) { const [x, y] = slot(have); const hy = Math.sin(lin(t, t0 + 0.3, t0 + 1.6) * Math.PI) * -60; X.save(); X.translate(x, y - 160 + hy); X.globalAlpha = 0.8; X.fillStyle = '#5a3a1a'; rr(-30, -200, 60, 150, 14); X.fill(); X.fillStyle = '#2a1d16'; rr(-90, -60, 180, 60, 14); X.fill(); X.restore(); }
  X.restore(); }
function letterbox() { X.fillStyle = '#000'; X.fillRect(0, 0, W, 40); X.fillRect(0, H - 40, W, 40); }
function fadeEnd(t, dur, len = 0.6) { if (t > dur - len) { X.fillStyle = `rgba(0,0,0,${lin(t, dur - len, dur)})`; X.fillRect(0, 0, W, H); } }
function cutFlash(t, t0, len = 0.12) { if (t >= t0 && t < t0 + len) { X.fillStyle = `rgba(255,255,255,${0.35 * (1 - (t - t0) / len)})`; X.fillRect(0, 0, W, H); } }
// split screen: draws fnL clipped left and fnR clipped right, with a moving divider
function split(t, fnL, fnR, k = 0.5, tilt = 0.06) { const x = W * k;
  X.save(); X.beginPath(); X.moveTo(0, 0); X.lineTo(x + H * tilt / 2, 0); X.lineTo(x - H * tilt / 2, H); X.lineTo(0, H); X.closePath(); X.clip(); X.translate(x / 2 - W / 2, 0); fnL(); X.restore();
  X.save(); X.beginPath(); X.moveTo(x + H * tilt / 2, 0); X.lineTo(W, 0); X.lineTo(W, H); X.lineTo(x - H * tilt / 2, H); X.closePath(); X.clip(); X.translate((x + W) / 2 - W / 2, 0); fnR(); X.restore();
  X.strokeStyle = '#f6efe2'; X.lineWidth = 12; X.beginPath(); X.moveTo(x + H * tilt / 2, 0); X.lineTo(x - H * tilt / 2, H); X.stroke(); }

// ======================= MORE CHARACTERS =======================
function planta(t, x, y, s, m = {}) { X.save(); X.translate(x, y); X.scale(s, s); X.rotate(Math.sin(t * 1.3) * 0.03 + (m.tilt || 0));
  X.fillStyle = '#c4622d'; X.beginPath(); X.moveTo(-70, 0); X.lineTo(70, 0); X.lineTo(52, 120); X.lineTo(-52, 120); X.closePath(); X.fill(); X.fillStyle = '#a8512b'; X.fillRect(-78, -10, 156, 26);
  X.fillStyle = '#4faa72'; for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.38 + Math.sin(t * 1.7 + i) * 0.05; X.save(); X.rotate(a + Math.PI / 2); X.beginPath(); X.ellipse(0, -110, 26, 90, 0, 0, 7); X.fill(); X.restore(); }
  if (m.badges) for (let i = 0; i < m.badges; i++) { X.fillStyle = '#ffd23d'; X.beginPath(); X.arc(-50 + (i % 5) * 25, 40 + Math.floor(i / 5) * 26, 10, 0, 7); X.fill(); }
  X.restore(); }
function baker(t, x, y, s, m = {}) { m.t = t; X.save(); X.translate(x, y + Math.sin(t * 5) * 3); X.scale(s, s); arms('#d9a441', m, 70);
  X.fillStyle = '#d9a441'; rr(-80, -230, 160, 420, 80); X.fill(); X.strokeStyle = '#b5841a'; X.lineWidth = 8; for (let i = 0; i < 4; i++) { X.beginPath(); X.moveTo(-50, -170 + i * 90); X.lineTo(40, -140 + i * 90); X.stroke(); }
  X.fillStyle = '#fff'; rr(-90, 20, 180, 170, 20); X.fill(); X.fillStyle = '#fff'; rr(-70, -300, 140, 80, 30); X.fill(); X.beginPath(); X.arc(-40, -300, 40, 0, 7); X.arc(0, -320, 46, 0, 7); X.arc(40, -300, 40, 0, 7); X.fill();
  face({ ...m, t }, 30, -110); X.restore(); }
// Carmen: copper espresso machine with steam curls for hair
function carmen(t, x, y, s, m = {}) { m.t = t; X.save(); X.translate(x, y); X.scale(s, s);
  X.fillStyle = 'rgba(0,0,0,0.25)'; X.beginPath(); X.ellipse(0, 160, 220, 26, 0, 0, 7); X.fill();
  const g = X.createLinearGradient(-200, 0, 200, 0); g.addColorStop(0, '#9a5a2a'); g.addColorStop(0.5, '#e0a060'); g.addColorStop(1, '#9a5a2a'); X.fillStyle = g; rr(-200, -200, 400, 360, 50); X.fill();
  X.fillStyle = '#5a3418'; rr(-200, 100, 400, 60, 20); X.fill(); X.fillStyle = '#d9d2c4'; rr(-150, 60, 60, 50, 10); X.fill(); rr(90, 60, 60, 50, 10); X.fill();
  X.fillStyle = '#e8c48a'; X.beginPath(); X.arc(0, -200, 70, Math.PI, 0); X.fill();
  for (let i = 0; i < 5; i++) { const k = ((t * 0.4 + i / 5) % 1); X.strokeStyle = `rgba(255,255,255,${0.6 * (1 - k)})`; X.lineWidth = 12; X.beginPath(); const bx = -120 + i * 60; for (let j = 0; j < 12; j++) X.lineTo(bx + Math.sin(j * 0.8 + t * 2 + i) * 18, -260 - j * 14 - k * 80); X.stroke(); }
  const e = m.mood === 'sad' ? 1 : 0; face({ ...m, mood: m.mood === 'sad' ? 'neutral' : m.mood }, 60, -70);
  if (m.mood === 'sad' || m.mood === 'warm') { X.strokeStyle = INK; X.lineWidth = 7; X.beginPath(); X.moveTo(-95, -118); X.lineTo(-30, -108); X.moveTo(30, -108); X.lineTo(95, -118); X.stroke(); }
  X.fillStyle = '#d8506a'; X.globalAlpha = 0.35; X.beginPath(); X.arc(-110, -20, 22, 0, 7); X.arc(110, -20, 22, 0, 7); X.fill(); X.globalAlpha = 1;
  X.restore(); }
// the Directie: a wall of screens that together form a red notification bell
function directie(t, cx, cy, s, m = {}) { const pulse = 1 + (m.talk || 0) * 0.08 + Math.sin(t * 3) * 0.01; X.save(); X.translate(cx, cy); X.scale(s * pulse, s * pulse);
  for (let r = -4; r <= 4; r++) for (let c = -3; c <= 3; c++) { X.fillStyle = '#0c0c12'; rr(c * 150 - 70, r * 150 - 70, 140, 140, 10); X.fill(); }
  X.save(); X.beginPath(); for (let r = -4; r <= 4; r++) for (let c = -3; c <= 3; c++) X.rect(c * 150 - 64, r * 150 - 64, 128, 128); X.clip();
  const red = m.dim ? '#5a1010' : '#e02424'; X.fillStyle = red; X.beginPath(); X.moveTo(-300, 300); X.quadraticCurveTo(-300, -380, 0, -420); X.quadraticCurveTo(300, -380, 300, 300); X.lineTo(380, 380); X.lineTo(-380, 380); X.closePath(); X.fill();
  X.beginPath(); X.arc(0, 470, 90, 0, 7); X.fill(); X.beginPath(); X.arc(0, -450, 50, 0, 7); X.fill();
  X.fillStyle = 'rgba(255,255,255,0.18)'; for (let i = 0; i < 40; i++) X.fillRect(-600, -650 + i * 34 + (t * 60 % 34), 1200, 4);
  // an eye-like slit that opens when it talks
  const o = 10 + (m.talk || 0) * 60; X.fillStyle = '#ffe9e9'; X.beginPath(); X.ellipse(0, 40, 200, o, 0, 0, 7); X.fill();
  X.restore(); X.restore(); }
function stagiair(t, x, y, s, m = {}) { m.t = t; X.save(); X.translate(x, y + bounce(m)); X.scale(s, s); arms('#f2a0b0', m, 80);
  X.fillStyle = '#f2a0b0'; rr(-90, -120, 180, 200, 30); X.fill(); X.fillStyle = '#4a7ad0'; rr(-90, 40, 180, 70, 20); X.fill(); face(m, 32, -40); X.restore(); }
function marisol(t, x, y, s, m = {}) { m.t = t; X.save(); X.translate(x, y + Math.sin(t * 2) * 4); X.scale(s, s);
  X.strokeStyle = '#c4622d'; X.lineWidth = 6; X.beginPath(); X.moveTo(0, -260); X.quadraticCurveTo(30, -320, 10, -380); X.stroke(); X.fillStyle = '#c4622d'; for (let i = 0; i < 6; i++) X.fillRect(2 + i * 3, -390, 3, 40);
  X.fillStyle = '#2f7a6a'; X.beginPath(); X.moveTo(-90, -260); X.lineTo(90, -260); X.lineTo(90, 200); X.lineTo(0, 150); X.lineTo(-90, 200); X.closePath(); X.fill();
  X.strokeStyle = '#e3b871'; X.lineWidth = 4; X.strokeRect(-70, -240, 140, 340); arms('#2f7a6a', m, 85);
  face(m, 30, -150); X.fillStyle = INK; [-30, 30].forEach((ex) => { X.fillRect(ex - 20, -186, 8, 8); X.fillRect(ex + 12, -186, 8, 8); });
  X.fillStyle = '#d8506a'; X.globalAlpha = 0.4; X.beginPath(); X.arc(-55, -110, 14, 0, 7); X.arc(55, -110, 14, 0, 7); X.fill(); X.restore(); }
function paco(t, x, y, s, m = {}) { m.t = t; X.save(); X.translate(x, y); X.scale(s, s); arms('#9aa3ad', m, 80);
  X.strokeStyle = '#9aa3ad'; X.lineWidth = 22; X.beginPath(); X.arc(0, -40, 120, 0, 7); X.stroke();
  ['#c9a84a', '#9aa3ad', '#b87333'].forEach((c, i) => { X.save(); X.rotate(0.5 + i * 0.35 + Math.sin(t * 2 + i) * 0.05); X.fillStyle = c; rr(-14, 70, 28, 150, 8); X.fill(); X.restore(); });
  X.fillStyle = '#1f2a44'; rr(-130, -210, 260, 60, 20); X.fill(); rr(-60, -250, 160, 60, 30); X.fill(); X.fillStyle = '#e3b871'; X.beginPath(); X.arc(20, -215, 14, 0, 7); X.fill();
  face(m, 40, -50); X.fillStyle = '#ddd'; rr(-50, 6, 100, 18, 8); X.fill(); X.restore(); }
function badgeBot(t, x, y, s, m = {}) { X.save(); X.translate(x, y + Math.abs(Math.sin(t * 6 + x)) * -8); X.scale(s, s);
  X.fillStyle = '#bfc6d0'; X.beginPath(); X.arc(0, 0, 90, 0, 7); X.fill(); X.fillStyle = '#ffd23d'; X.beginPath(); X.arc(0, -10, 50, 0, 7); X.fill(); txt('★', 0, -6, font('inter', 900, 60), '#b5841a');
  X.fillStyle = '#6c757d'; rr(-60, 80, 30, 50, 8); X.fill(); rr(30, 80, 30, 50, 8); X.fill(); X.restore(); }

// ======================= MORE SETS =======================
function hqExterior(t) { const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#9fc3e8'); g.addColorStop(1, '#e8eef5'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
  X.fillStyle = '#c9d6e3'; for (let i = 0; i < 6; i++) X.fillRect(-300 + i * 300, 1100 - hash(i) * 300, 220, 900);
  X.fillStyle = '#5b7a99'; X.beginPath(); X.moveTo(250, 1700); X.lineTo(250, 330); X.lineTo(830, 330); X.lineTo(830, 1700); X.fill();
  X.fillStyle = '#7fa4c6'; for (let r = 0; r < 20; r++) for (let c = 0; c < 6; c++) { X.globalAlpha = 0.5 + 0.5 * hash(r * 9 + c); X.fillRect(280 + c * 92, 360 + r * 66, 76, 50); } X.globalAlpha = 1;
  const pulse = 1 + 0.06 * Math.max(0, Math.sin(t * Math.PI * 2)); X.save(); X.translate(540, 250); X.scale(pulse, pulse); X.fillStyle = '#e02424'; X.beginPath(); X.moveTo(-120, 60); X.quadraticCurveTo(-120, -110, 0, -120); X.quadraticCurveTo(120, -110, 120, 60); X.lineTo(150, 90); X.lineTo(-150, 90); X.closePath(); X.fill(); X.beginPath(); X.arc(0, 110, 34, 0, 7); X.fill(); X.restore();
  X.fillStyle = '#3a4250'; X.fillRect(-500, 1700, W + 1000, 600); X.fillStyle = '#e8eef5'; rr(300, 1560, 480, 110, 14); X.fill(); txt('HET HOOFDKANTOOR', 540, 1600, font('anton', 400, 52), '#1f2a44'); txt("DON'T BREAK THE CHAIN", 540, 1648, font('bebas', 400, 34), '#e02424', { ls: 4 }); }
function office(t, users, alarm = 0) { X.fillStyle = alarm ? '#4a1414' : '#e9edf2'; X.fillRect(-500, -500, W + 1000, H + 1000);
  X.fillStyle = alarm ? '#2a0a0a' : '#1f2a44'; rr(140, 180, 800, 220, 20); X.fill(); txt(Math.floor(users).toLocaleString('de-DE') + ' USERS', 540, 300, font('mono', 700, 74), alarm ? '#ff5050' : '#7dffb0');
  X.fillStyle = alarm ? '#5a1c1c' : '#d4dbe4'; X.fillRect(-500, 1300, W + 1000, 900);
  for (let i = 0; i < 4; i++) { const x = 60 + i * 280; X.fillStyle = alarm ? '#3a1010' : '#b8c2cf'; rr(x, 1120, 220, 26, 8); X.fill(); X.fillStyle = '#222'; rr(x + 50, 980, 120, 90, 10); X.fill(); X.fillStyle = alarm ? '#ff6060' : '#9fc3e8'; rr(x + 58, 988, 104, 74, 6); X.fill(); }
  if (alarm) { const a = Math.max(0, Math.sin(t * 8)); X.fillStyle = `rgba(255,0,0,${0.25 * a})`; X.fillRect(0, 0, W, H); } }
function meetingRoom(t) { X.fillStyle = '#e3e7ee'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#fff'; rr(120, 260, 840, 560, 16); X.fill(); X.strokeStyle = '#9aa3ad'; X.lineWidth = 8; X.strokeRect(120, 260, 840, 560);
  txt('STREAK MEETING', 540, 330, font('anton', 400, 64), '#e02424'); X.fillStyle = '#7a5230'; X.beginPath(); X.ellipse(540, 1420, 620, 120, 0, 0, 7); X.fill(); X.fillStyle = '#8f6440'; X.beginPath(); X.ellipse(540, 1400, 600, 100, 0, 0, 7); X.fill(); }
function apartment(t, eve = 0) { const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, eve ? '#3a3550' : '#efe6d6'); g.addColorStop(1, eve ? '#2a2638' : '#e2d6c0'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
  X.fillStyle = eve ? '#1a2440' : '#bfe0f5'; rr(620, 330, 340, 460, 10); X.fill(); X.strokeStyle = eve ? '#4a4560' : '#fff'; X.lineWidth = 16; X.strokeRect(620, 330, 340, 460); X.beginPath(); X.moveTo(790, 330); X.lineTo(790, 790); X.moveTo(620, 560); X.lineTo(960, 560); X.stroke();
  if (eve) { X.fillStyle = '#f2c66a'; for (let i = 0; i < 8; i++) X.fillRect(640 + hash(i) * 290, 360 + hash(i * 3) * 400, 18, 24); }
  X.fillStyle = eve ? '#3a3448' : '#cdbb9c'; X.fillRect(-500, 1350, W + 1000, 900);
  X.fillStyle = eve ? '#5a5070' : '#f7f2ea'; rr(80, 1330, 460, 70, 20); X.fill(); X.fillStyle = eve ? '#6a6080' : '#fff'; rr(100, 1300, 120, 50, 20); X.fill();
  X.strokeStyle = eve ? '#5a5070' : '#8a7a60'; X.lineWidth = 4; X.beginPath(); X.moveTo(540, 0); X.lineTo(540, 160); X.stroke(); X.fillStyle = eve ? '#ffd27a' : '#fff6d0'; X.beginPath(); X.arc(540, 180, 26, 0, 7); X.fill();
  if (eve) { const lg = X.createRadialGradient(540, 200, 10, 540, 400, 700); lg.addColorStop(0, 'rgba(255,214,140,0.35)'); lg.addColorStop(1, 'rgba(255,214,140,0)'); X.fillStyle = lg; X.fillRect(0, 0, W, H); } }
function bakery(t) { X.fillStyle = '#f2d9b0'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#c4622d'; for (let i = 0; i < 14; i++) { X.fillStyle = i % 2 ? '#c4622d' : '#f6efe2'; X.fillRect(-200 + i * 100, 120, 100, 120); }
  X.fillStyle = '#8a5a30'; X.fillRect(-500, 520, W + 1000, 20); for (let i = 0; i < 9; i++) { X.save(); X.translate(40 + i * 120, 470); X.rotate(-0.3); X.fillStyle = '#d9a441'; rr(-20, -90, 40, 180, 20); X.fill(); X.restore(); }
  txt('PANADERÍA', 540, 360, font('bungee', 400, 80), '#7a3a1a'); X.fillStyle = '#7a4a2a'; X.fillRect(-500, 1200, W + 1000, 900); X.fillStyle = '#9a6a40'; X.fillRect(-500, 1180, W + 1000, 40); }
function park(t) { const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#a8d8f0'); g.addColorStop(1, '#e8f4e0'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
  X.fillStyle = '#7cbf6a'; X.fillRect(-500, 1200, W + 1000, 900); for (let i = 0; i < 4; i++) { const x = 100 + i * 300; X.fillStyle = '#7a5230'; X.fillRect(x - 15, 700, 30, 520); X.fillStyle = '#4faa72'; X.beginPath(); X.arc(x, 650, 150, 0, 7); X.fill(); }
  X.fillStyle = '#8a5a30'; rr(240, 1300, 600, 30, 10); X.fill(); X.fillRect(270, 1330, 20, 120); X.fillRect(790, 1330, 20, 120); rr(240, 1180, 600, 26, 10); X.fill(); }
function phoneUI(t, cx, cy, w, draw) { const h = w * 2.05; X.save(); X.translate(cx, cy); X.fillStyle = '#111'; rr(-w / 2 - 18, -h / 2 - 18, w + 36, h + 36, 60); X.fill(); X.save(); rr(-w / 2, -h / 2, w, h, 44); X.clip(); draw(w, h); X.restore(); X.fillStyle = '#111'; rr(-70, -h / 2 + 10, 140, 34, 17); X.fill(); X.restore(); }
function streetDay(t) { const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#8fc8ee'); g.addColorStop(1, '#f6e7cc'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
  const cols = ['#e8b98a', '#f2d2a0', '#d98c6a', '#efc9a0', '#e3a87a', '#f0dcb8'];
  for (let i = 0; i < 7; i++) { const x = -200 + i * 230, h = 900 + hash(i) * 300; X.fillStyle = cols[i % 6]; X.fillRect(x, 1350 - h, 220, h);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 2; c++) { X.fillStyle = '#3a4f6c'; X.fillRect(x + 40 + c * 90, 1350 - h + 80 + r * 170, 56, 100); X.fillStyle = '#7a3a1a'; X.fillRect(x + 30 + c * 90, 1350 - h + 180 + r * 170, 76, 10); } }
  X.fillStyle = '#d9c3a0'; X.fillRect(-500, 1350, W + 1000, 900); X.fillStyle = '#c9b190'; for (let i = 0; i < 20; i++) X.fillRect(-200 + i * 80, 1360 + (i % 2) * 40, 70, 30); }
function teen(t, x, y, s, m = {}) { X.save(); X.translate(x, y + Math.abs(Math.sin(t * 10 + x)) * -12); X.scale(s, s);
  X.fillStyle = m.col || '#5a4a7a'; rr(-60, -100, 120, 240, 50); X.fill(); X.beginPath(); X.arc(0, -150, 56, 0, 7); X.fill();
  X.fillStyle = '#111'; X.save(); X.translate(70, -120); X.rotate(-0.3); rr(-22, -40, 44, 80, 8); X.fill(); X.restore();
  if (m.flash && Math.floor(t * 8 + x) % 3 === 0) { X.fillStyle = 'rgba(255,255,255,0.9)'; X.beginPath(); X.arc(80, -150, 40, 0, 7); X.fill(); } X.restore(); }
function toog(t) { X.fillStyle = '#5a1f14'; X.fillRect(-500, -500, W + 1000, H + 1000); bar(t); X.fillStyle = '#5a2e14'; X.fillRect(-500, 1230, W + 1000, 90); X.fillStyle = '#7a4420'; X.fillRect(-500, 1320, W + 1000, 700); X.fillStyle = '#8a5428'; X.fillRect(-500, 1230, W + 1000, 20); }
function busInside(t) { X.fillStyle = '#d9d2c4'; X.fillRect(-500, -500, W + 1000, H + 1000); const sh = Math.sin(t * 9) * 4;
  for (let i = 0; i < 3; i++) { X.fillStyle = '#87b8de'; rr(60 + i * 340, 300 + sh, 300, 380, 30); X.fill(); X.fillStyle = '#5a8a3a'; X.fillRect(60 + i * 340, 560 + sh, 300, 120); }
  X.fillStyle = '#e02424'; rr(140, 140, 800, 110, 14); X.fill(); txt('MANDATORY FUN DAY', 540, 198, font('anton', 400, 64), '#fff');
  X.fillStyle = '#3a5a8c'; for (let i = 0; i < 3; i++) { rr(80 + i * 330, 1150, 280, 260, 30); X.fill(); } X.fillStyle = '#6c757d'; X.fillRect(-500, 1500, W + 1000, 800); }
function beach(t, flag = false) { const g = X.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, '#6fc0f0'); g.addColorStop(1, '#cdeeff'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, 1500);
  X.fillStyle = '#fff6b0'; X.beginPath(); X.arc(860, 260, 90, 0, 7); X.fill();
  X.fillStyle = '#2a86c8'; X.fillRect(-500, 820, W + 1000, 300); for (let i = 0; i < 18; i++) { const x = ((i * 120 + t * 60) % 1500) - 200; X.strokeStyle = 'rgba(255,255,255,0.7)'; X.lineWidth = 6; X.beginPath(); X.arc(x, 880 + (i % 3) * 60, 40, Math.PI * 1.1, Math.PI * 1.9); X.stroke(); }
  X.fillStyle = '#7fd0f0'; X.beginPath(); X.moveTo(-500, 1120); for (let x = -500; x <= W + 500; x += 40) X.lineTo(x, 1110 + Math.sin(x * 0.02 + t * 2) * 14); X.lineTo(W + 500, 1160); X.lineTo(-500, 1160); X.fill();
  X.fillStyle = '#f2dca0'; X.fillRect(-500, 1150, W + 1000, 1000);
  [[160, 1180, '#e23b3b'], [900, 1210, '#2f7fd0']].forEach(([x, y, c]) => { X.fillStyle = '#8a6a40'; X.fillRect(x - 5, y - 260, 10, 280); X.fillStyle = c; X.beginPath(); X.moveTo(x - 150, y - 250); X.quadraticCurveTo(x, y - 380, x + 150, y - 250); X.closePath(); X.fill(); });
  // lifeguard tower
  X.fillStyle = '#c9a070'; X.fillRect(700, 880, 12, 260); X.fillRect(820, 880, 12, 260); X.fillStyle = '#e02424'; rr(680, 820, 170, 90, 10); X.fill(); X.fillStyle = '#5a4030'; X.fillRect(840, 640, 8, 190);
  X.fillStyle = flag ? '#e02424' : '#3aa35b'; X.beginPath(); X.moveTo(848, 640); X.lineTo(848 + 90 + Math.sin(t * 8) * 8, 670); X.lineTo(848, 700); X.fill(); }
function sea(t, rough = 1) { const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#4a90c8'); g.addColorStop(1, '#0c3a6a'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
  for (let r = 0; r < 9; r++) { X.fillStyle = r % 2 ? 'rgba(255,255,255,0.10)' : 'rgba(0,30,70,0.25)'; X.beginPath(); X.moveTo(-500, 300 + r * 200); for (let x = -500; x <= W + 500; x += 30) X.lineTo(x, 300 + r * 200 + Math.sin(x * 0.012 + t * 3 + r) * 40 * rough); X.lineTo(W + 500, H + 500); X.lineTo(-500, H + 500); X.fill(); } }
function lifeguard(t, x, y, s, m = {}) { m.t = t; X.save(); X.translate(x, y); X.scale(s, s); arms('#e8b48a', m, 70); X.fillStyle = '#e8b48a'; rr(-70, -160, 140, 260, 60); X.fill(); X.fillStyle = '#e02424'; rr(-70, 40, 140, 80, 20); X.fill();
  X.fillStyle = '#222'; rr(-60, -110, 120, 30, 10); X.fill(); face(m, 28, -60); X.fillStyle = '#ffd23d'; X.save(); X.translate(90, -60); X.rotate(-0.3); X.beginPath(); X.moveTo(0, -20); X.lineTo(90, -60); X.lineTo(90, 60); X.lineTo(0, 20); X.fill(); X.restore(); X.restore(); }
function alley(t) { X.fillStyle = '#141a2a'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#2a2230'; X.fillRect(-500, 200, 700, 1300); X.fillRect(880, 200, 700, 1300);
  for (let r = 0; r < 14; r++) for (let c = 0; c < 6; c++) { X.strokeStyle = 'rgba(0,0,0,0.3)'; X.lineWidth = 2; X.strokeRect(-500 + c * 120 + (r % 2) * 60, 200 + r * 60, 120, 60); }
  X.fillStyle = '#5a3a2a'; rr(160, 900, 220, 420, 10); X.fill(); X.fillStyle = '#ffd27a'; X.fillRect(170, 910, 200, 4); const lg = X.createRadialGradient(270, 880, 10, 270, 1100, 500); lg.addColorStop(0, 'rgba(255,210,122,0.35)'); lg.addColorStop(1, 'rgba(255,210,122,0)'); X.fillStyle = lg; X.fillRect(-200, 500, 1000, 1200);
  X.fillStyle = '#3a4a3a'; rr(700, 1120, 200, 200, 14); X.fill(); X.fillStyle = '#2a3a2a'; rr(690, 1100, 220, 40, 10); X.fill(); X.fillStyle = '#1e1e26'; X.fillRect(-500, 1320, W + 1000, 900); }
function restaurant(t) { X.fillStyle = '#3a1a1a'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#5a2626'; X.fillRect(-500, 0, W + 1000, 1250);
  for (let i = 0; i < 8; i++) { X.fillStyle = 'rgba(255,214,140,0.10)'; X.beginPath(); X.arc(80 + i * 140, 300, 60, 0, 7); X.fill(); X.fillStyle = '#ffd27a'; X.beginPath(); X.arc(80 + i * 140, 300, 8, 0, 7); X.fill(); }
  X.fillStyle = '#7a3a2a'; X.fillRect(-500, 1250, W + 1000, 900); X.fillStyle = '#f6efe2'; X.beginPath(); X.ellipse(600, 1260, 330, 70, 0, 0, 7); X.fill(); X.fillStyle = '#e8dcc0'; X.fillRect(270, 1260, 660, 180);
  [[600, 1210]].forEach(([x, y]) => { X.fillStyle = '#f6efe2'; X.fillRect(x - 6, y - 70, 12, 70); X.fillStyle = '#ffb040'; X.beginPath(); X.ellipse(x, y - 84 + Math.sin(t * 9) * 2, 9, 16, 0, 0, 7); X.fill(); const g = X.createRadialGradient(x, y - 84, 4, x, y - 84, 200); g.addColorStop(0, 'rgba(255,190,90,0.35)'); g.addColorStop(1, 'rgba(255,190,90,0)'); X.fillStyle = g; X.fillRect(x - 200, y - 280, 400, 400); });
  X.fillStyle = '#fff'; X.beginPath(); X.ellipse(470, 1250, 70, 20, 0, 0, 7); X.ellipse(730, 1250, 70, 20, 0, 0, 7); X.fill(); X.fillStyle = '#e04a2a'; X.beginPath(); X.ellipse(470, 1246, 50, 12, 0, 0, 7); X.ellipse(730, 1246, 50, 12, 0, 0, 7); X.fill(); }
function bigPlant(t, x, y, s, shake = 0) { X.save(); X.translate(x, y); X.scale(s, s); X.rotate(Math.sin(t * 30) * 0.04 * shake); X.fillStyle = '#7a4a2a'; rr(-90, 0, 180, 160, 16); X.fill();
  X.fillStyle = '#3f8a5a'; for (let i = 0; i < 11; i++) { const a = -Math.PI / 2 + (i - 5) * 0.28; X.save(); X.rotate(a + Math.PI / 2); X.beginPath(); X.ellipse(0, -260, 50, 220, 0, 0, 7); X.fill(); X.restore(); } X.restore(); }
// talking while a line by `who` is playing (for voices with fx, where no lip data exists)
function speaking(who, t) { for (const k in EP.L) { const l = EP.L[k]; if (l.who === who && t >= l.t && t <= l.t + l.d) return 0.5 + 0.5 * Math.abs(Math.sin(t * 17)); } return 0; }
function newsTV(t, x, y, w, inner) { const h = w * 0.62; X.save(); X.translate(x, y); X.fillStyle = '#111'; rr(-w / 2 - 20, -h / 2 - 20, w + 40, h + 40, 20); X.fill(); X.save(); rr(-w / 2, -h / 2, w, h, 8); X.clip(); inner(w, h); X.restore();
  X.fillStyle = '#c0392b'; X.fillRect(-w / 2, h / 2 - 70, w, 70); txt('BREAKING · USERS SWITCH APPS', 0, h / 2 - 34, font('anton', 400, 38), '#fff'); X.restore(); }
function lift(t, lit) { X.fillStyle = '#c9ced6'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#9aa3ad'; rr(240, 400, 600, 1100, 10); X.fill(); X.strokeStyle = '#6c757d'; X.lineWidth = 8; X.beginPath(); X.moveTo(540, 400); X.lineTo(540, 1500); X.stroke();
  X.fillStyle = '#222'; rr(380, 220, 320, 120, 16); X.fill(); txt('TOP FLOOR', 540, 282, font('anton', 400, 56), lit ? '#ff4040' : '#333'); if (lit) { X.fillStyle = 'rgba(255,64,64,0.25)'; X.beginPath(); X.arc(540, 280, 260, 0, 7); X.fill(); } X.fillStyle = '#d4dbe4'; X.fillRect(-500, 1500, W + 1000, 700); }
function topFloor(t) { X.fillStyle = '#05050a'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#0d0d16'; X.fillRect(-500, 1450, W + 1000, 800); const g = X.createRadialGradient(540, 700, 50, 540, 700, 900); g.addColorStop(0, 'rgba(255,40,40,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000); }
function balaclava(t, x, y, s, kind) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#1a1a1a'; X.beginPath(); X.ellipse(0, 0, 120, 140, 0, 0, 7); X.fill();
  X.fillStyle = '#e8d8c0'; rr(-80, -40, 160, 50, 25); X.fill(); X.fillStyle = INK; X.beginPath(); X.arc(-36, -15, 12, 0, 7); X.arc(36, -15, 12, 0, 7); X.fill();
  if (kind === 'r') { const g = X.createRadialGradient(0, -100, 10, 0, -40, 220); g.addColorStop(0, `rgba(255,120,30,${0.5 + 0.2 * Math.sin(t * 9)})`); g.addColorStop(1, 'rgba(255,120,30,0)'); X.fillStyle = g; X.beginPath(); X.ellipse(0, 0, 130, 150, 0, 0, 7); X.fill(); }
  if (kind === 'g') for (let i = 0; i < 6; i++) { if ((Math.floor(t * 6) + i) % 3) continue; X.fillStyle = '#bfe6ff'; X.beginPath(); X.arc(-90 + hash(i) * 180, -120 + hash(i * 3) * 220, 6, 0, 7); X.fill(); }
  if (kind === 'f') { X.strokeStyle = INK; X.lineWidth = 7; X.beginPath(); X.arc(-36, -15, 26, 0, 7); X.stroke(); X.beginPath(); X.arc(36, -15, 26, 0, 7); X.stroke(); }
  X.restore(); }
function vanInside(t, bump = 0) { const sh = Math.sin(t * 20) * 6 * bump; X.save(); X.translate(0, sh); X.fillStyle = '#2a2e38'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#3a404c'; X.fillRect(-500, 1350, W + 1000, 900);
  X.fillStyle = '#4a5260'; rr(60, 300, 960, 120, 20); X.fill(); X.fillStyle = '#1a2440'; rr(100, 330, 200, 60, 10); X.fill(); rr(780, 330, 200, 60, 10); X.fill(); X.restore(); }
function whiteboard(t, x, y, s, k = 1) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#fff'; rr(-260, -180, 520, 360, 14); X.fill(); X.strokeStyle = '#9aa3ad'; X.lineWidth = 10; X.strokeRect(-260, -180, 520, 360);
  X.strokeStyle = '#1f2a44'; X.lineWidth = 6; const seg = (a, b, c, d, p) => { if (k < p) return; X.beginPath(); X.moveTo(a, b); X.lineTo(c, d); X.stroke(); };
  X.strokeRect(-220, -120, 120, 100); seg(-100, -70, -10, -70, 0.2); txt('ZAK', 60, -70, font('caveat', 700, 50), '#1f2a44'); seg(110, -70, 170, 40, 0.5); txt('HQ', 190, 90, font('anton', 400, 60), '#e02424'); X.restore(); }
function cellar(t) { X.fillStyle = '#20232a'; X.fillRect(-500, -500, W + 1000, H + 1000); for (let r = 0; r < 20; r++) for (let c = 0; c < 8; c++) { X.strokeStyle = 'rgba(0,0,0,0.35)'; X.lineWidth = 3; X.strokeRect(-200 + c * 200 + (r % 2) * 100, r * 100, 200, 100); }
  X.fillStyle = '#16181d'; X.fillRect(-500, 1400, W + 1000, 800); X.strokeStyle = '#555'; X.lineWidth = 4; X.beginPath(); X.moveTo(540, 0); X.lineTo(540, 300); X.stroke();
  X.fillStyle = '#444'; X.beginPath(); X.moveTo(470, 300); X.lineTo(610, 300); X.lineTo(650, 360); X.lineTo(430, 360); X.fill(); const g = X.createLinearGradient(540, 360, 540, 1500); g.addColorStop(0, 'rgba(255,240,190,0.45)'); g.addColorStop(1, 'rgba(255,240,190,0.05)'); X.fillStyle = g; X.beginPath(); X.moveTo(440, 360); X.lineTo(640, 360); X.lineTo(900, 1500); X.lineTo(180, 1500); X.fill(); }
function chair(x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#5a5a5a'; X.fillRect(-120, -260, 20, 300); X.fillRect(100, -260, 20, 300); rr(-130, 20, 260, 30, 8); X.fill(); X.fillRect(-120, 50, 16, 120); X.fillRect(104, 50, 16, 120); X.restore(); }
function eraser(t, x, y, s, k) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#6c757d'; X.fillRect(-14, -1400, 28, 1400 - 120); X.fillStyle = '#9aa3ad'; rr(-80, -140, 160, 40, 10); X.fill();
  X.fillStyle = '#f2a0b0'; rr(-150, -110, 300, 140, 20); X.fill(); X.fillStyle = '#4a7ad0'; rr(-150, -110, 120, 140, [20, 0, 0, 20]); X.fill(); if (k > 0) { X.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 6; i++) X.fillRect(-150 + hash(Math.floor(t * 30) + i) * 300, 30, 6, 20); } X.restore(); }

// ======================= SEASON 1, ACT 3 SETS (ep 9–12) =======================
function closedBar(t, dim = 0.55, doorOpen = 0) { toog(t);
  X.fillStyle = '#0d1424'; rr(60, 360, 300, 420, 16); X.fill(); X.save(); X.beginPath(); rr(60, 360, 300, 420, 16); X.clip(); X.strokeStyle = 'rgba(170,190,255,0.5)'; X.lineWidth = 2; for (let i = 0; i < 30; i++) { const x = 60 + (hash(i) * 300 + t * 60) % 300, y = 360 + ((hash(i * 7) * 420 + t * 900) % 420); X.beginPath(); X.moveTo(x, y); X.lineTo(x - 6, y + 30); X.stroke(); } X.restore();
  X.strokeStyle = '#3a1a0c'; X.lineWidth = 10; rr(60, 360, 300, 420, 16); X.stroke(); X.beginPath(); X.moveTo(210, 360); X.lineTo(210, 780); X.moveTo(60, 570); X.lineTo(360, 570); X.stroke();
  X.fillStyle = '#3a1a0c'; X.fillRect(860, 560, 220, 680); X.fillStyle = '#ffd98a'; X.beginPath(); X.arc(890, 920, 10, 0, 7); X.fill(); if (doorOpen > 0) { X.fillStyle = '#05070f'; X.fillRect(860, 560, 220 * doorOpen, 680); }
  X.fillStyle = `rgba(8,4,16,${dim})`; X.fillRect(-500, -500, W + 1000, H + 1000);
  X.fillStyle = '#2a1408'; X.fillRect(538, 0, 4, 300); X.fillStyle = '#c47a2a'; X.beginPath(); X.moveTo(480, 340); X.lineTo(600, 340); X.lineTo(570, 290); X.lineTo(510, 290); X.fill();
  const g = X.createRadialGradient(540, 360, 20, 540, 1200, 900); g.addColorStop(0, 'rgba(255,214,140,0.55)'); g.addColorStop(0.5, 'rgba(255,190,110,0.18)'); g.addColorStop(1, 'rgba(255,190,110,0)'); X.fillStyle = g; X.beginPath(); X.moveTo(500, 340); X.lineTo(580, 340); X.lineTo(1100, 1700); X.lineTo(-20, 1700); X.closePath(); X.fill(); }
function dripsAt(t, x, y, s) { X.fillStyle = 'rgba(160,200,255,0.8)'; for (let i = 0; i < 6; i++) { const k = (t * 1.3 + hash(i)) % 1; X.beginPath(); X.ellipse(x + (hash(i * 5) - 0.5) * 180 * s, y + k * 240 * s, 6, 10, 0, 0, 7); X.fill(); } }
function wallClock(t, cx, cy, s, hh, mm) { X.save(); X.translate(cx, cy); X.scale(s, s); X.fillStyle = '#f6efe2'; X.beginPath(); X.arc(0, 0, 200, 0, 7); X.fill(); X.strokeStyle = '#3a1a0c'; X.lineWidth = 18; X.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; X.fillStyle = INK; X.fillRect(Math.cos(a) * 160 - 5, Math.sin(a) * 160 - 5, 10, 10); }
  const am = mm / 60 * Math.PI * 2 - Math.PI / 2, ah = (hh % 12 + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2; X.strokeStyle = INK; X.lineCap = 'round'; X.lineWidth = 14; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.cos(ah) * 100, Math.sin(ah) * 100); X.stroke(); X.lineWidth = 8; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.cos(am) * 150, Math.sin(am) * 150); X.stroke(); X.fillStyle = '#c0392b'; X.beginPath(); X.arc(0, 0, 14, 0, 7); X.fill(); X.restore(); }
function dayBadge(cx, cy, s, text, flip = 0, col = '#e0601c') { X.save(); X.translate(cx, cy); X.scale(s, s * Math.abs(Math.cos(flip * Math.PI))); X.fillStyle = '#fff'; rr(-62, -17, 124, 34, 17); X.fill(); txt(text, 0, 1, font('anton', 400, 24), col); X.restore(); }
function churreria(t) { X.fillStyle = '#e8efe6'; X.fillRect(-500, -500, W + 1000, H + 1000); for (let r = 0; r < 14; r++) for (let c = 0; c < 12; c++) { X.strokeStyle = 'rgba(40,110,80,0.25)'; X.lineWidth = 3; X.strokeRect(-100 + c * 110, 200 + r * 80, 110, 80); }
  X.fillStyle = '#2a7a5a'; X.fillRect(-500, 140, W + 1000, 90); txt('CHOCOLATERÍA · 24 H', 540, 190, font('anton', 400, 56), '#f6efe2');
  X.fillStyle = '#1a2a3a'; rr(700, 300, 300, 260, 12); X.fill(); X.fillStyle = '#ffd98a'; for (let i = 0; i < 4; i++) X.fillRect(730 + i * 70, 340 + hash(i) * 120, 30, 40); txt('04:00', 850, 520, font('bebas', 400, 50), '#ffd98a');
  X.fillStyle = '#9a6a3a'; X.fillRect(-500, 1150, W + 1000, 60); X.fillStyle = '#c9b190'; X.fillRect(-500, 1210, W + 1000, 900); X.fillStyle = '#d9d0c0'; X.fillRect(-500, 1360, W + 1000, 900); }
function cupChoc(x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#fff'; rr(-50, -40, 100, 80, 14); X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 10; X.beginPath(); X.arc(56, 0, 22, -1.2, 1.2); X.stroke(); X.fillStyle = '#5a2e14'; X.beginPath(); X.ellipse(0, -38, 46, 10, 0, 0, 7); X.fill(); X.restore(); }
function tablao(t, beat) { X.fillStyle = '#1a0806'; X.fillRect(-500, -500, W + 1000, H + 1000); const g = X.createRadialGradient(540, 900, 50, 540, 900, 800); g.addColorStop(0, 'rgba(255,120,60,0.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
  X.fillStyle = '#5a1a10'; X.fillRect(-500, 300, W + 1000, 40); for (let i = 0; i < 9; i++) { X.fillStyle = i % 2 ? '#8a1a14' : '#6e140f'; X.beginPath(); X.moveTo(-200 + i * 180, 340); X.quadraticCurveTo(-110 + i * 180, 520, -20 + i * 180, 340); X.fill(); }
  X.fillStyle = '#6b3a1e'; X.fillRect(-500, 1260, W + 1000, 50); X.fillStyle = '#4a2410'; X.fillRect(-500, 1310, W + 1000, 900);
  for (let i = 0; i < 9; i++) { const x = -60 + i * 140, up = Math.sin(t * 10 + i) > 0.3 ? -20 : 0; X.fillStyle = '#0d0403'; X.beginPath(); X.arc(x, 1560, 70, 0, 7); X.fill(); X.fillRect(x - 70, 1560, 140, 400); X.beginPath(); X.arc(x - 30, 1480 + up, 18, 0, 7); X.arc(x + 30, 1480 - up, 18, 0, 7); X.fill(); } }
function dancer(t, x, y, s, spin = 1) { X.save(); X.translate(x, y); X.scale(s, s); const sw = Math.sin(t * 6) * 0.25 * spin; X.rotate(sw * 0.3);
  X.fillStyle = '#c0182a'; X.beginPath(); X.moveTo(-60, -120); X.lineTo(60, -120); X.quadraticCurveTo(200 + sw * 140, 120, 160, 190); X.quadraticCurveTo(0, 230, -160, 190); X.quadraticCurveTo(-200 + sw * 140, 120, -60, -120); X.fill();
  X.fillStyle = '#fff'; for (let i = 0; i < 14; i++) { X.beginPath(); X.arc(-120 + hash(i) * 240, -60 + hash(i * 3) * 220, 8, 0, 7); X.fill(); }
  X.fillStyle = '#f2c9a0'; X.beginPath(); X.arc(0, -190, 70, 0, 7); X.fill(); X.fillStyle = '#1a0a08'; X.beginPath(); X.arc(0, -210, 74, Math.PI, 0); X.fill(); X.beginPath(); X.arc(0, -280, 30, 0, 7); X.fill(); X.fillStyle = '#e8322f'; X.beginPath(); X.arc(56, -250, 20, 0, 7); X.fill();
  face({ mood: 'happy', t }, 26, -190, 0.6); X.strokeStyle = '#f2c9a0'; X.lineWidth = 14; X.lineCap = 'round'; X.beginPath(); X.moveTo(-50, -100); X.lineTo(-120, -200 + sw * 80); X.moveTo(50, -100); X.lineTo(130, -220 - sw * 80); X.stroke(); X.restore(); }
function metroInside(t, rock = 1) { const sh = Math.sin(t * 13) * 3 * rock; X.fillStyle = '#c9ced6'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#e8e8ec'; X.fillRect(-500, 160 + sh, W + 1000, 80);
  X.fillStyle = '#0a0d14'; rr(40, 380 + sh, 1000, 520, 30); X.fill(); X.fillStyle = 'rgba(255,220,140,0.6)'; for (let i = 0; i < 4; i++) { const x = ((i * 400 - t * 1400) % 1600 + 1600) % 1600 - 300; X.fillRect(x, 600 + sh, 160, 8); }
  X.strokeStyle = '#9aa3ad'; X.lineWidth = 10; X.beginPath(); X.moveTo(-500, 300 + sh); X.lineTo(W + 500, 300 + sh); X.stroke(); for (let i = 0; i < 6; i++) { X.beginPath(); X.moveTo(-40 + i * 230, 300 + sh); X.lineTo(-40 + i * 230, 350 + sh); X.stroke(); X.beginPath(); X.arc(-40 + i * 230, 370 + sh, 20, 0, 7); X.stroke(); }
  X.fillStyle = '#c0392b'; rr(-100, 1040, 1280, 120, 30); X.fill(); X.fillStyle = '#9a2a1f'; X.fillRect(-100, 1150, 1280, 60); X.fillStyle = '#7a8088'; X.fillRect(-500, 1300, W + 1000, 900); }
function streetNight(t) { X.fillStyle = '#121626'; X.fillRect(-500, -500, W + 1000, H + 1000); const cols = ['#2a2438', '#302a40', '#262036'];
  for (let i = -1; i < 7; i++) { const x = -200 + i * 230, h = 900 + hash(i + 3) * 300; X.fillStyle = cols[(i + 3) % 3]; X.fillRect(x, 1350 - h, 220, h); for (let r = 0; r < 5; r++) for (let c = 0; c < 2; c++) { X.fillStyle = hash(i * 17 + r * 3 + c) > 0.6 ? '#ffd98a' : '#1a1a2a'; X.fillRect(x + 40 + c * 90, 1350 - h + 80 + r * 170, 56, 100); } }
  X.fillStyle = '#2a2d36'; X.fillRect(-500, 1350, W + 1000, 900); X.fillStyle = '#222'; X.fillRect(150, 700, 14, 660); X.fillStyle = '#ffe9a8'; X.beginPath(); X.arc(157, 700, 24, 0, 7); X.fill(); const g = X.createRadialGradient(157, 700, 10, 157, 1200, 600); g.addColorStop(0, 'rgba(255,220,140,0.3)'); g.addColorStop(1, 'rgba(255,220,140,0)'); X.fillStyle = g; X.fillRect(-500, 600, 1300, 1000); }
function busker(t, x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#3a5a8a'; rr(-80, -100, 160, 260, 40); X.fill(); X.fillStyle = '#f2c9a0'; X.beginPath(); X.arc(0, -160, 66, 0, 7); X.fill(); X.fillStyle = '#5a3a1a'; X.beginPath(); X.ellipse(0, -214, 90, 22, 0, 0, 7); X.fill(); X.beginPath(); X.arc(0, -220, 50, Math.PI, 0); X.fill();
  face({ mood: 'happy', t }, 24, -160, 0.6); X.save(); X.translate(10, 40); X.rotate(-0.5); X.fillStyle = '#c47a2a'; X.beginPath(); X.ellipse(0, 0, 90, 70, 0, 0, 7); X.fill(); X.fillStyle = '#3a1a0c'; X.beginPath(); X.arc(0, 0, 22, 0, 7); X.fill(); X.fillStyle = '#5a3a1a'; X.fillRect(80, -10, 200, 20); X.restore();
  X.strokeStyle = '#f2c9a0'; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(-60, -40); X.lineTo(0, 30 + Math.sin(t * 20) * 10); X.stroke(); X.restore(); }
function dawnRoof(t, k) { const g = X.createLinearGradient(0, 0, 0, 1400); g.addColorStop(0, '#3a3a6e'); g.addColorStop(0.45, '#e88a7a'); g.addColorStop(0.8, '#ffd59a'); g.addColorStop(1, '#fff0c8'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
  X.fillStyle = 'rgba(255,240,180,0.9)'; X.beginPath(); X.arc(760, 1040 - k * 80, 110, 0, 7); X.fill();
  X.fillStyle = '#5a4060'; for (let i = 0; i < 12; i++) { const x = -200 + i * 130, h = 140 + hash(i + 7) * 260; X.fillRect(x, 1150 - h, 120, h + 10); }
  X.beginPath(); X.arc(300, 1000, 90, Math.PI, 0); X.fill(); X.fillRect(210, 1000, 180, 160); X.fillRect(296, 860, 8, 60); X.fillRect(620, 820, 70, 340); X.beginPath(); X.moveTo(610, 820); X.lineTo(655, 740); X.lineTo(700, 820); X.fill();
  X.fillStyle = '#7a5040'; X.fillRect(-500, 1150, W + 1000, 900); X.fillStyle = '#b26a4a'; for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) { X.beginPath(); X.arc(-100 + c * 110 + (r % 2) * 55, 1200 + r * 70, 52, Math.PI, 0); X.fill(); }
  X.fillStyle = '#c9a080'; X.fillRect(-500, 1150, W + 1000, 40); }
function redCity(t, k, msg) { X.fillStyle = '#0a0a12'; X.fillRect(-500, -500, W + 1000, H + 1000);
  for (let i = -1; i < 7; i++) { const x = -200 + i * 230, h = 1000 + hash(i + 11) * 400; X.fillStyle = '#16161f'; X.fillRect(x, 1500 - h, 220, h); for (let r = 0; r < 7; r++) for (let c = 0; c < 2; c++) { const on = hash(i * 13 + r * 5 + c) > 0.45, red = k > hash(i * 7 + r + c * 3); X.fillStyle = on ? (red ? '#e8322f' : '#ffd98a') : '#0e0e16'; X.fillRect(x + 40 + c * 90, 1500 - h + 80 + r * 150, 56, 90); } }
  const bk = cl(k * 1.4); X.save(); X.translate(540, 700); X.fillStyle = '#111'; rr(-420, -230, 840, 460, 20); X.fill(); X.fillStyle = bk > 0.5 ? '#c0182a' : '#2a6ad0'; rr(-400, -210, 800, 420, 12); X.fill();
  if (bk > 0.5) { bellIconBig(0, -60, 1.1); txt(msg[0], 0, 110, font('anton', 400, 64), '#fff'); txt(msg[1], 0, 180, font('anton', 400, 46), '#ffd1d1'); } else { txt('BUY ONE GET ONE', 0, 20, font('anton', 400, 70), '#fff'); } X.restore();
  if (k > 0.3) { X.fillStyle = `rgba(255,20,20,${0.12 * (Math.sin(t * 8) + 1) * cl((k - 0.3) * 2)})`; X.fillRect(-500, -500, W + 1000, H + 1000); } }
function bellIconBig(x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#ffd23d'; X.beginPath(); X.moveTo(-60, 40); X.quadraticCurveTo(-60, -80, 0, -80); X.quadraticCurveTo(60, -80, 60, 40); X.lineTo(76, 56); X.lineTo(-76, 56); X.closePath(); X.fill(); X.beginPath(); X.arc(0, 70, 16, 0, 7); X.fill(); X.restore(); }
