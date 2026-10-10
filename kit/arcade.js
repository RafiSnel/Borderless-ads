// Shared retro-gameshow helpers for 11a / 11b
const ARC = { BG: '#1a0b2e', PUR: '#3b1a6b', MAG: '#ff3fa4', YEL: '#ffe14d', CYA: '#3ff0ff', GRN: '#4dff7a', RED: '#ff4d4d', WH: '#ffffff' };
ARC.px = (s) => font('pixel', 400, s);
ARC.vt = (s) => font('vt', 400, s);
ARC.bg = function (t) {
  X.fillStyle = ARC.BG; X.fillRect(0, 0, W, H);
  // scanline grid
  X.fillStyle = 'rgba(255,255,255,0.03)'; for (let y = 0; y < H; y += 8) X.fillRect(0, y, W, 3);
  // spotlight beams
  for (let i = 0; i < 2; i++) { const a = Math.sin(t * 1.3 + i * 2) * 0.35; X.save(); X.translate(i ? W - 120 : 120, 0); X.rotate(a + (i ? 0.3 : -0.3));
    const g = X.createLinearGradient(0, 0, 0, 1500); g.addColorStop(0, 'rgba(255,225,77,0.18)'); g.addColorStop(1, 'rgba(255,225,77,0)'); X.fillStyle = g; X.beginPath(); X.moveTo(-30, 0); X.lineTo(30, 0); X.lineTo(260, 1500); X.lineTo(-260, 1500); X.fill(); X.restore(); }
  // floor checker
  for (let r = 0; r < 6; r++) for (let c = 0; c < 14; c++) { X.fillStyle = (r + c) % 2 ? '#2a1250' : '#140826'; X.fillRect(c * 80 - ((r * 20) % 80), 1700 + r * 40, 80, 40); }
};
ARC.bulbs = function (t, x, y, w, h, n = 16) {
  const per = 2 * (w + h); for (let i = 0; i < n * 4; i++) { const d = (i / (n * 4)) * per; let bx, by;
    if (d < w) { bx = x + d; by = y; } else if (d < w + h) { bx = x + w; by = y + d - w; } else if (d < 2 * w + h) { bx = x + w - (d - w - h); by = y + h; } else { bx = x; by = y + h - (d - 2 * w - h); }
    const on = (i + Math.floor(t * 8)) % 3 === 0; X.fillStyle = on ? ARC.YEL : '#5a3d1a'; if (on) { X.shadowColor = ARC.YEL; X.shadowBlur = 14; } X.fillRect(bx - 7, by - 7, 14, 14); X.shadowBlur = 0; }
};
ARC.title = function (t, sub) {
  const b = Math.floor(t * 4) % 2;
  txt('GUESS THE', W / 2, 150, ARC.px(56), b ? ARC.YEL : ARC.MAG, { stroke: '#000', sw: 10 });
  txt('LANGUAGE', W / 2, 240, ARC.px(72), ARC.CYA, { stroke: '#000', sw: 12 });
  if (sub) txt(sub, W / 2, 320, ARC.px(28), ARC.WH, { a: 0.85 });
};
ARC.score = function (t, score, lastInc) {
  X.fillStyle = '#000'; X.fillRect(700, 370, 330, 110); X.strokeStyle = ARC.MAG; X.lineWidth = 6; X.strokeRect(700, 370, 330, 110);
  txt('SCORE', 760, 425, ARC.vt(56), ARC.MAG, { align: 'left' });
  const k = lastInc != null ? back(lin(t, lastInc, lastInc + 0.25), 3) : 1; X.save(); X.translate(975, 425); X.scale(k, k); txt(String(score), 0, 4, ARC.vt(96), ARC.YEL); X.restore();
};
ARC.round = function (n, tot) { X.fillStyle = '#000'; X.fillRect(50, 370, 330, 110); X.strokeStyle = ARC.CYA; X.lineWidth = 6; X.strokeRect(50, 370, 330, 110); txt(`ROUND ${n}/${tot}`, 215, 428, ARC.vt(60), ARC.CYA); };
ARC.panel = function (t) { X.fillStyle = 'rgba(0,0,0,0.85)'; X.fillRect(70, 540, 940, 600); ARC.bulbs(t, 70, 540, 940, 600, 18); };
ARC.timer = function (t, t0, t1) {
  if (t < t0) return; const f = 1 - cl((t - t0) / (t1 - t0)); const col = f > 0.5 ? ARC.GRN : f > 0.25 ? ARC.YEL : ARC.RED;
  X.fillStyle = '#000'; X.fillRect(100, 1190, 880, 70); X.strokeStyle = ARC.WH; X.lineWidth = 5; X.strokeRect(100, 1190, 880, 70);
  const seg = 20; for (let i = 0; i < seg; i++) if (i / seg < f) { X.fillStyle = col; X.fillRect(110 + i * 43.5, 1200, 38, 50); }
  if (t < t1) txt(String(Math.ceil((t1 - t) / ((t1 - t0) / 3))), W / 2, 1320, ARC.px(48), col);
};
ARC.country = function (t, t0, id, lon, lat, z, name, cx = W / 2, cy = 860) {
  if (t < t0) return; const k = back(lin(t, t0, t0 + 0.3), 2.5);
  X.save(); X.translate(cx, cy - 130); X.scale(k, k); X.translate(-W / 2, -H / 2);
  drawWorld({ lon, lat, zoom: z, hi: { [id]: ARC.GRN }, only: true, stroke: '#000', lw: 6, glow: 30 }); X.restore();
  X.save(); X.translate(cx, cy + 170); X.scale(k, k); txt(name, 0, 0, ARC.px(64), ARC.YEL, { stroke: '#000', sw: 10 }); X.restore();
  if (t < t0 + 0.6) txt('CORRECT!', cx, cy - 330 - (t - t0) * 80, ARC.px(40), ARC.GRN, { a: 1 - (t - t0) / 0.6 });
};
// 12x12 pixel host: a little passport with eyes. mood: 'idle' | 'cheer' | 'guilty'
ARC.host = function (t, x, y, mood = 'idle', s = 14) {
  const bob = Math.round(Math.sin(t * 6) * 2) * (mood === 'cheer' ? 3 : 1);
  const P = (c, gx, gy, w = 1, h = 1) => { X.fillStyle = c; X.fillRect(x + gx * s, y + (gy + bob) * s, w * s, h * s); };
  P('#000', -1, -1, 12, 15); P('#8a1f35', 0, 0, 10, 13); P('#b33a52', 0, 0, 10, 1); P('#e6c36a', 3, 9, 4, 1); P('#e6c36a', 4, 2, 2, 2);
  const blink = Math.floor(t * 2.3) % 7 === 0; P('#fff', 2, 5, 2, blink ? 1 : 2); P('#fff', 6, 5, 2, blink ? 1 : 2);
  if (!blink) { const lx = mood === 'guilty' ? 0 : 1; P('#000', 2 + lx, 6, 1, 1); P('#000', 6 + lx, 6, 1, 1); }
  if (mood === 'cheer') { P('#000', -3, -3 - (Math.floor(t * 8) % 2), 2, 6); P('#000', 11, -3 - ((Math.floor(t * 8) + 1) % 2), 2, 6); P('#fff', 3, 8, 4, 1); }
  else if (mood === 'guilty') { P('#000', -2, 7, 2, 4); P('#000', 10, 7, 2, 4); P('#fff', 4, 8, 2, 1); P(ARC.CYA, 10, -2 + ((t * 3) % 2), 1, 2); }
  else { P('#000', -2, 6, 2, 5); P('#000', 10, 4, 2, 5); P('#fff', 4, 8, 2, 1); }
  P('#000', 1, 13, 3, 2); P('#000', 6, 13, 3, 2);
};
ARC.bubble = function (t, t0, text, x, y) {
  if (t < t0) return; const k = back(lin(t, t0, t0 + 0.2)); X.save(); X.translate(x, y); X.scale(k, k);
  X.font = ARC.px(30); const w = X.measureText(text).width + 60; X.fillStyle = '#fff'; X.fillRect(0, -50, w, 100); X.fillRect(-20, 20, 40, 20); X.strokeStyle = '#000'; X.lineWidth = 6; X.strokeRect(0, -50, w, 100);
  txt(text, w / 2, 4, ARC.px(30), '#000'); X.restore();
};
ARC.podium = function () { X.fillStyle = '#5b2a9b'; X.fillRect(60, 1610, 300, 120); X.fillStyle = ARC.MAG; X.fillRect(60, 1610, 300, 18); txt('HOST', 210, 1680, ARC.px(28), ARC.YEL); };
