// kin.js — "Kinetic Type Reel" toolkit for Borderless (see borderless-ads/CATALOGUS.md).
// Dark base, signal orange + cobalt + cream as full-frame colour cards, heavy grotesk type that moves per letter,
// seamless transitions (tile flips, stripe wipes, iris through a shape), a thin HUD layer, real 3D only as accents.
const KN = { K: '#0b0a0a', K2: '#161413', OR: '#ff4a1c', BL: '#2b3bff', CR: '#f2ede4', WH: '#ffffff', GR: '#8f8a84', LIME: '#c6f13a' };
const KF = (w, s) => font('inter', w, s), KM = (s) => font('mono', 700, s);
const kspring = (p, z = 0.38, w = 15) => { p = Math.max(0, p); return 1 - Math.exp(-z * w * p) * Math.cos(w * Math.sqrt(1 - z * z) * p); };
const ksp = (t, t0, dur = 0.5, z, w) => kspring((t - t0) / dur, z, w);
const kink = (bg) => (bg === KN.CR || bg === KN.WH || bg === KN.LIME ? KN.K : bg === KN.OR ? KN.K : KN.WH); // text colour on a card
// ---------- type ----------
// word with per-letter transforms: fn(i, n) → {dx, dy, sx, sy, rot, a, col}
function kword(s, x, y, f, col, fn, opts = {}) {
  X.save(); X.font = f; X.textBaseline = 'middle'; X.textAlign = 'left'; const ls = opts.ls ?? -0.04 * parseFloat(f.match(/(\d+)px/)[1]);
  const chars = /[\u0590-\u08FF\u0900-\u0DFF\u0E00-\u0EFF\u1000-\u109F]/.test(s) ? [s] : [...s]; const widths = chars.map((c) => X.measureText(c).width); const total = widths.reduce((a, c) => a + c, 0) + ls * (chars.length - 1);
  let sc = 1; if (opts.max && total > opts.max) sc = opts.max / total;
  X.translate(x, y); X.scale(sc, sc); let cx = opts.align === 'left' ? 0 : -total / 2;
  chars.forEach((c, i) => { const o = fn ? fn(i, chars.length) : {}; X.save(); X.translate(cx + widths[i] / 2 + (o.dx || 0), o.dy || 0); X.rotate(o.rot || 0); X.scale(o.sx ?? 1, o.sy ?? 1); X.globalAlpha *= Math.max(0, Math.min(1, o.a ?? 1));
    if (opts.stroke) { X.lineWidth = opts.sw || 8; X.strokeStyle = opts.stroke; X.lineJoin = 'round'; X.textAlign = 'center'; X.strokeText(c, 0, 0); }
    X.fillStyle = o.col || col; X.textAlign = 'center'; X.fillText(c, 0, 0); X.restore(); cx += widths[i] + ls; });
  X.restore();
  return total * sc;
}
// entrance presets (per letter): 'rise' | 'drop' | 'spin' | 'stretch' | 'snap' | 'flip'
function kin(t, t0, s, x, y, f, col, mode = 'rise', opts = {}) {
  if (t < t0) return; const p = t - t0, st = opts.stagger ?? 0.025;
  if (mode === 'stretch') { const k = ksp(t, t0, 0.5); X.save(); X.translate(x, y); X.scale(mix(3, 1, k), mix(0.2, 1, Math.min(1, k * 1.3))); kword(s, 0, 0, f, col, null, opts); X.restore(); return; }
  if (mode === 'snap') { const k = ksp(t, t0, 0.35, 0.45, 20); X.save(); X.translate(x, y); X.scale(mix(2.2, 1, k), mix(2.2, 1, k)); X.globalAlpha *= Math.min(1, p * 10); kword(s, 0, 0, f, col, null, opts); X.restore(); return; }
  kword(s, x, y, f, col, (i) => { const k = ksp(t, t0 + i * st, 0.5); const q = Math.min(1, k);
    if (mode === 'drop') return { dy: (1 - k) * -700, a: p * 8 };
    if (mode === 'spin') return { rot: (1 - k) * (i % 2 ? 1.1 : -1.1), dy: (1 - k) * (i % 2 ? -200 : 200), a: q * 2 };
    if (mode === 'flip') return { sy: Math.max(0.02, Math.abs(Math.cos((1 - q) * Math.PI / 2))), a: q > 0 ? 1 : 0 };
    return { dy: (1 - k) * 140, a: q * 2 }; }, opts);
}
// a row of repeated text sliding (background texture / word walls)
function kwall(t, words, opts = {}) {
  const rows = opts.rows ?? 12, size = opts.size ?? 150, col = opts.col ?? 'rgba(255,255,255,0.07)', sp = opts.speed ?? 260;
  X.save(); X.font = KF(900, size); X.fillStyle = col; X.textBaseline = 'middle'; X.textAlign = 'left';
  for (let r = 0; r < rows; r++) { const line = (Array.isArray(words) ? words.map((w, i) => words[(i + r * 3) % words.length]).join('  ·  ') : words) + '  ·  ';
    const lw = X.measureText(line).width; const dir = r % 2 ? 1 : -1; let off = ((dir * t * sp * (0.8 + (r % 3) * 0.15)) % lw + lw) % lw;
    const y = (opts.y0 ?? 80) + r * (size * 1.05); for (let x = -off; x < W; x += lw) X.fillText(line, x, y); }
  X.restore();
}
// ---------- full-frame colour card ----------
function kcard(bg) { X.fillStyle = bg; X.fillRect(0, 0, W, H); }
// ---------- transitions (draw prev() and next() — both full-frame) ----------
const _kt = {};
function koff(key) { let c = _kt[key]; if (!c) { c = document.createElement('canvas'); c.width = W; c.height = H; _kt[key] = c; } return c; }
function kpaint(key, draw) { const c = koff(key); const g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); const keep = X; X = g; try { draw(); } finally { X = keep; } return c; }
// tiles flip from A to B in a wave starting at (ox, oy); k = 0..1
function kTiles(k, A, B, opts = {}) {
  const ts = opts.size ?? 135, cols = Math.ceil(W / ts), rows = Math.ceil(H / ts), ox = opts.ox ?? W / 2, oy = opts.oy ?? H / 2;
  const a = kpaint('tA', A), b = kpaint('tB', B); const maxD = Math.hypot(W, H) * 0.6;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = c * ts, y = r * ts, d = Math.hypot(x + ts / 2 - ox, y + ts / 2 - oy) / maxD; const q = cl((k * 1.6 - d * 0.6) / 1.0);
    const ang = q * Math.PI, sx = Math.abs(Math.cos(ang)); const src = ang < Math.PI / 2 ? a : b;
    X.save(); X.translate(x + ts / 2, y + ts / 2); X.scale(Math.max(0.02, sx), 1);
    X.drawImage(src, x, y, ts, ts, -ts / 2, -ts / 2, ts, ts);
    if (q > 0 && q < 1) { X.fillStyle = `rgba(0,0,0,${0.35 * Math.sin(ang)})`; X.fillRect(-ts / 2, -ts / 2, ts, ts); }
    X.restore(); }
}
// coloured stripes sweep across and reveal B; k = 0..1
function kStripes(k, A, B, cols = [KN.OR, KN.BL, KN.CR, KN.K]) {
  const n = 7, h = H / n;
  if (k < 0.5) A(); else B();
  for (let i = 0; i < n; i++) { const d = i % 2 ? 0.08 : 0; const q = cl((k - d) / 0.92); // stripe enters then leaves
    const x0 = mix(-W * 1.2, W * 1.2, eio(q)); X.fillStyle = cols[i % cols.length];
    X.fillRect(x0 - W * 0.6, i * h, W * 1.2, h + 1); X.globalAlpha = 0.25; X.fillRect(x0 - W * 0.6 - 120, i * h, 120, h + 1); X.globalAlpha = 1; }
}
// iris: B grows out of a circle at (x, y) — e.g. from the dot of a letter, a ball, a pin
function kIris(k, A, B, x, y, opts = {}) {
  A(); if (k <= 0) return; const r = Math.pow(k, opts.pow ?? 2.2) * Math.hypot(W, H) * 1.05 + (opts.r0 ?? 0);
  X.save(); X.beginPath(); X.arc(x, y, r, 0, 7); X.clip(); B(); X.restore();
}
// zoom-through: A scales up around (x, y) until it fills, then B appears (with zoom blur)
function kZoom(k, A, B, x, y) {
  if (k < 0.5) { const s = Math.pow(1 + k * 2 * 9, 1); const a = kpaint('zA', A); for (let j = 0; j < 4; j++) { X.save(); X.globalAlpha = j ? 0.25 : 1; const ss = s * (1 + j * 0.04 * k); X.translate(x, y); X.scale(ss, ss); X.translate(-x, -y); X.drawImage(a, 0, 0); X.restore(); } }
  else { const s = mix(1.6, 1, eo((k - 0.5) * 2)); const b = kpaint('zB', B); X.save(); X.translate(W / 2, H / 2); X.scale(s, s); X.translate(-W / 2, -H / 2); X.drawImage(b, 0, 0); X.restore(); }
}
// ---------- the HUD layer ----------
function khud(t, sections, opts = {}) {
  const col = opts.col || 'rgba(255,255,255,0.55)'; X.save(); X.globalAlpha = Math.min(1, t * 3) * (opts.a ?? 1);
  X.font = KM(22); X.fillStyle = col; X.textBaseline = 'middle';
  X.textAlign = 'left'; X.fillText(opts.title || 'BORDERLESS', 48, 70);
  const f = Math.floor(t * 30); X.textAlign = 'right'; X.fillText(`00:${String(Math.floor(t)).padStart(2, '0')}:${String(f % 30).padStart(2, '0')}   F ${String(f).padStart(3, '0')}`, W - 48, 70);
  let sec = sections[0][1]; for (const [s0, n] of sections) if (t >= s0) sec = n;
  X.textAlign = 'left'; X.fillText(sec, 48, H - 70); if (opts.right) { X.textAlign = 'right'; X.fillText(opts.right, W - 48, H - 70); }
  X.fillRect(48, H - 110, (W - 96) * Math.min(1, t / (opts.dur || 30)), 3); X.globalAlpha *= 0.3; X.fillRect(48, H - 110, W - 96, 3);
  X.restore();
}
// a small mono caption
function kcap(text, x, y, col = KN.GR, a = 1, size = 28) { X.save(); X.globalAlpha *= a; X.font = KM(size); X.fillStyle = col; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, x, y); X.restore(); }
// ---------- end lockup with the 3D coin (needs R3 via ?mod=r3d.js) ----------
function kend(t, t0, tag, sub = '74 LANGUAGES · €9,99 PER COURSE') {
  const e = t - t0; kcard(KN.K);
  const drop = kspring(e / 0.7, 0.35, 12); const ang = (1 - eo(lin(e, 0, 1.6))) * Math.PI * 6 + Math.sin(e * 1.5) * 0.25 * eo(lin(e, 1.2, 2));
  if (window.R3) X.drawImage(R3.coin(t, ang, { x: 0, y: mix(8, 2.2, drop), s: 1.55, bloom: 0.22 }), 0, 0); else coinIn(t, t0, W / 2, 640, 220);
  if (e > 0.35) kword('Borderless.', 540, 1250, KF(900, 150), KN.WH, (j) => { const k = kspring((e - 0.35 - j * 0.025) / 0.45); return { dy: (1 - k) * 120, a: k * 2, col: j === 10 ? KN.OR : null }; }, { max: 980 });
  if (e > 0.9 && tag) { X.save(); X.globalAlpha = Math.min(1, (e - 0.9) * 4); X.font = KF(700, 48); const tw = X.measureText(tag).width; X.font = KF(700, Math.min(48, 48 * 960 / tw)); X.fillStyle = KN.CR; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(tag, 540, 1380); X.restore(); }
  if (e > 1.2) kcap(sub, 540, 1450, 'rgba(242,237,228,0.6)', Math.min(1, (e - 1.2) * 4));
}
function kflash(t, times, a = 0.16) { for (const tb of times) { const d = t - tb; if (d >= 0 && d < 0.05) { X.fillStyle = `rgba(255,255,255,${a})`; X.fillRect(0, 0, W, H); } } }
