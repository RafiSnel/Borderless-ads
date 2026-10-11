// Borderless video kit — shared engine. Every frame is a pure function of t. 1080x1920.
const W = 1080, H = 1920;
const C = document.getElementById('c'); let X = C.getContext('2d');
// ---------- math ----------
const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lin = (t, a, b) => cl((t - a) / (b - a));
const eo = (p) => 1 - Math.pow(1 - cl(p), 3);
const ei = (p) => Math.pow(cl(p), 3);
const eio = (p) => { p = cl(p); return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; };
const back = (p, s = 1.9) => { p = cl(p); return 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2); };
const elastic = (p) => { p = cl(p); if (p === 0 || p === 1) return p; return Math.pow(2, -10 * p) * Math.sin((p * 10 - .75) * (2 * Math.PI / 3)) + 1; };
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const mix = (a, b, p) => a + (b - a) * p;
const pick = (arr, t, step) => arr[Math.floor(t / step) % arr.length];
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
const FONT = {
  inter: 'Inter', anton: 'Anton', archivo: '"Archivo Black"', bebas: '"Bebas Neue"', bungee: 'Bungee', caveat: 'Caveat',
  serif: '"DM Serif Display"', marker: '"Permanent Marker"', pixel: '"Press Start 2P"', rubik: 'Rubik', mono: '"Space Mono"', vt: 'VT323',
};
const FALLBACK = ', "Noto Sans CJK JP", "Noto Sans CJK KR", "Noto Sans Arabic", "Noto Sans Thai", "Noto Sans Devanagari", "Noto Sans Hebrew", Inter, sans-serif';
const font = (fam, w, s) => `${w} ${s}px ${FONT[fam] || fam}${FALLBACK}`;
// ---------- assets ----------
const IMG = {};
function loadImages(map) {
  return Promise.all(Object.entries(map).map(([k, s]) => new Promise((r) => { const i = new Image(); i.onload = () => { IMG[k] = i; r(); }; i.onerror = () => { console.error('img fail ' + s); r(); }; i.src = s; })));
}
async function loadFonts() {
  const fams = ['900 50px Inter', '400 50px Anton', '400 50px "Archivo Black"', '400 50px "Bebas Neue"', '400 50px Bungee', '700 50px Caveat', '400 50px "DM Serif Display"',
    '400 50px "Permanent Marker"', '400 50px "Press Start 2P"', '900 50px Rubik', '800 50px Rubik', '500 50px Rubik', '700 50px "Space Mono"', '400 50px VT323', '700 50px "Noto Sans Arabic"', '700 50px "Noto Sans Thai"', '700 50px "Noto Sans Devanagari"', '700 50px "Noto Sans Hebrew"'];
  await Promise.all(fams.map((f) => document.fonts.load(f, 'aAbB12ابกขहिשל').catch(() => {})));
}
let WORLD = null;
async function loadWorld() {
  const topo = await (await fetch('node_modules/world-atlas/countries-110m.json')).json();
  WORLD = topojson.feature(topo, topo.objects.countries).features;
}
// equirectangular projection centred on (lon, lat) with zoom (px per degree)
function drawWorld(opts) {
  if (!WORLD) return;
  const { lon = 10, lat = 20, zoom = 3, fill = '#333', stroke = null, lw = 2, hi = {}, glow = 0, alpha = 1, only = false } = opts;
  const px = (p) => [W / 2 + (p[0] - lon) * zoom, H / 2 - (p[1] - lat) * zoom * 1.15];
  X.save(); X.globalAlpha = alpha;
  for (const f of WORLD) {
    const id = +f.id; const h = hi[id]; if (only && !h) continue;
    X.beginPath();
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) for (const ring of poly) {
      ring.forEach((p, i) => { const [x, y] = px(p); (i && Math.abs(p[0] - ring[i - 1][0]) < 170) ? X.lineTo(x, y) : X.moveTo(x, y); }); X.closePath();
    }
    if (h) { X.shadowColor = h; X.shadowBlur = glow; X.fillStyle = h; X.fill(); X.shadowBlur = 0; }
    else { X.fillStyle = fill; X.fill(); }
    if (stroke) { X.strokeStyle = stroke; X.lineWidth = lw; X.stroke(); }
  }
  X.restore();
}
// ---------- text ----------
function txt(s, x, y, f, color, opts = {}) {
  X.save(); X.globalAlpha *= (opts.a ?? 1); X.font = f; X.textAlign = opts.align || 'center'; X.textBaseline = 'middle';
  if (opts.ls) X.letterSpacing = opts.ls + 'px';
  if (opts.stroke) { X.lineWidth = opts.sw || 10; X.strokeStyle = opts.stroke; X.lineJoin = 'round'; X.strokeText(s, x, y); }
  if (opts.glow) { X.shadowColor = opts.glow; X.shadowBlur = opts.gb || 30; }
  X.fillStyle = color; X.fillText(s, x, y); X.restore();
}
// Big key word: pops in on t0 with overshoot. opts: from, rot, tilt, fade (time), shadow, glow, stroke, lh, align, max (fit width)
function slam(t, t0, text, x, y, f, color, opts = {}) {
  if (t < t0) return;
  const p = (t - t0) / (opts.dur || 0.22);
  let s = mix(opts.from ?? 1.8, 1, back(p, opts.bs ?? 1.4));
  const a = cl(0.35 + p * 3) * (opts.fade ? 1 - lin(t, opts.fade, opts.fade + 0.12) : 1);
  if (a <= 0) return;
  X.save(); X.globalAlpha = a; X.translate(x, y); X.rotate((opts.rot || 0) * (1 - eo(p)) + (opts.tilt || 0));
  X.font = f; X.textAlign = opts.align || 'center'; X.textBaseline = 'middle';
  if (opts.ls) X.letterSpacing = opts.ls + 'px';
  const lines = text.split('\n'); const size = parseFloat(f.match(/(\d+)px/)[1]); const lh = size * (opts.lh || 0.98);
  if (opts.max) { const w = Math.max(...lines.map((l) => X.measureText(l).width)); if (w > opts.max) s *= opts.max / w; }
  X.scale(s, s);
  lines.forEach((l, i) => {
    const yy = (i - (lines.length - 1) / 2) * lh;
    if (opts.shadow) { X.fillStyle = opts.shadow; X.fillText(l, 6, yy + 10); }
    if (opts.stroke) { X.lineWidth = opts.sw || 12; X.strokeStyle = opts.stroke; X.lineJoin = 'round'; X.strokeText(l, 0, yy); }
    if (opts.glow) { X.shadowColor = opts.glow; X.shadowBlur = opts.gb || 40; X.fillStyle = color; X.fillText(l, 0, yy); X.shadowBlur = 0; }
    X.fillStyle = color; X.fillText(l, 0, yy);
  });
  X.restore();
}
// typewriter: reveal characters at cps from t0
function typed(t, t0, s, cps = 40) { return s.slice(0, Math.max(0, Math.floor((t - t0) * cps))); }
// ---------- shapes / props ----------
function pill(text, x, y, f, fg, bgc, a = 1, s = 1, opts = {}) {
  X.save(); X.globalAlpha *= a; X.translate(x, y); X.scale(s, s); X.rotate(opts.rot || 0); X.font = f;
  const size = parseFloat(f.match(/(\d+)px/)[1]);
  const w = X.measureText(text).width + size * 1.4, h = size * 2;
  if (opts.shadow !== false) { X.fillStyle = 'rgba(0,0,0,0.14)'; rr(-w / 2 + 4, -h / 2 + 8, w, h, opts.r ?? h / 2); X.fill(); }
  X.fillStyle = bgc; rr(-w / 2, -h / 2, w, h, opts.r ?? h / 2); X.fill();
  if (opts.border) { X.strokeStyle = opts.border; X.lineWidth = opts.bw || 5; X.stroke(); }
  X.fillStyle = fg; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 2); X.restore();
}
function stamp(t, t0, text, x, y, f, color, rot) {
  if (t < t0) return;
  const p = (t - t0) / 0.16, s = mix(2.2, 1, eo(p));
  const size = parseFloat(f.match(/(\d+)px/)[1]);
  X.save(); X.globalAlpha = cl(p * 2) * 0.95; X.translate(x, y); X.rotate(rot); X.scale(s, s);
  X.font = f; const w = X.measureText(text).width + size * 0.9, h = size * 1.45;
  X.strokeStyle = color; X.lineWidth = size * 0.09; rr(-w / 2, -h / 2, w, h, size * 0.18); X.stroke();
  X.fillStyle = color; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, size * 0.04);
  X.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 70; i++) { X.beginPath(); X.arc((hash(i + size) - .5) * w, (hash(i * 3.1 + size) - .5) * h, 2 + hash(i * 7.7) * 5, 0, 7); X.fill(); }
  X.restore();
}
function phone(img, cx, cy, w, opts = {}) {
  const h = w * 2.164, r = w * 0.13, bez = w * 0.035;
  X.save(); X.translate(cx, cy); X.rotate(opts.rot || 0); const s = opts.scale ?? 1; X.scale(s, s); X.globalAlpha = opts.a ?? 1;
  if (opts.shadow !== false) { X.fillStyle = 'rgba(0,0,0,0.25)'; rr(-w / 2 + 14, -h / 2 + 30, w, h, r); X.fill(); }
  X.fillStyle = opts.frame || '#1b1814'; rr(-w / 2, -h / 2, w, h, r); X.fill();
  const sw = w - bez * 2, sh = h - bez * 2;
  X.save(); rr(-sw / 2, -sh / 2, sw, sh, r - bez); X.clip();
  X.fillStyle = opts.screen || '#f4eee2'; X.fillRect(-sw / 2, -sh / 2, sw, sh);
  if (img) {
    const z = opts.zoom || 1, k = sw / img.width * z, ih = img.height * k, iw = img.width * k;
    if (opts.focus) { const [fx, fy] = opts.focus; X.drawImage(img, -fx * k, -fy * k, iw, ih); }
    else { const sy = opts.scrollY ? opts.scrollY * k : 0; X.drawImage(img, -iw / 2, -sh / 2 - sy, iw, ih); }
  }
  if (opts.draw) opts.draw(sw, sh);
  X.restore();
  X.fillStyle = opts.frame || '#1b1814'; rr(-w * 0.14, -h / 2 + bez * 0.7, w * 0.28, w * 0.07, w * 0.035); X.fill();
  X.restore();
}
// the Borderless passport mascot
function mascot(t, x, y, s, st = {}) {
  const P = { pass: st.body || '#6e1f2a', pass2: '#571722', gold: '#e3b871', ink: '#1f1a14', white: '#fff' };
  X.save(); X.translate(x, y);
  const bob = Math.sin(t * 7) * 6 * (st.calm ? 0.4 : 1), sq = st.squash || 0;
  X.translate(0, bob); X.rotate(st.tilt || 0); X.scale(s * (1 + sq * 0.12), s * (1 - sq * 0.12));
  X.fillStyle = P.ink; { const wf = st.walk != null ? Math.sin(st.walk) : 0; rr(-62, 150 - Math.max(0, wf) * 22, 44, 22, 11); X.fill(); rr(18, 150 - Math.max(0, -wf) * 22, 44, 22, 11); X.fill(); }
  X.fillStyle = 'rgba(0,0,0,0.18)'; rr(-112, -150, 230, 310, 30); X.fill();
  X.fillStyle = P.pass; rr(-118, -160, 230, 310, 30); X.fill();
  X.fillStyle = P.pass2; rr(-118, -160, 26, 310, [30, 0, 0, 30]); X.fill();
  X.strokeStyle = 'rgba(227,184,113,0.55)'; X.lineWidth = 3; rr(-84, -134, 170, 258, 16); X.stroke();
  X.strokeStyle = P.gold; X.lineWidth = 5;
  X.beginPath(); X.arc(1, 72, 34, 0, 7); X.stroke(); X.beginPath(); X.ellipse(1, 72, 14, 34, 0, 0, 7); X.stroke();
  X.beginPath(); X.moveTo(-33, 72); X.lineTo(35, 72); X.stroke();
  X.strokeStyle = P.pass; X.lineWidth = 18; X.lineCap = 'round';
  const wave = st.wave ? Math.sin(t * 18) * 0.5 : 0;
  X.beginPath(); X.moveTo(-112, 0); X.lineTo(-150, 40 - (st.armsUp ? 90 : 0)); X.stroke();
  X.beginPath(); X.moveTo(108, 0); X.lineTo(150 + wave * 20, 40 - (st.armsUp ? 90 : 0) - wave * 60); X.stroke();
  const blink = st.wink ? 0 : (((t * 0.9 + (st.seed || 0)) % 2.6) < 0.09 ? 0.1 : 1);
  const lookX = (st.lookX || 0) * 8, lookY = (st.lookY || 0) * 8;
  [[-42], [44]].forEach(([ex], i) => {
    X.save(); X.translate(ex, -62);
    const closed = (i === 1 && st.wink) || blink < 1;
    if (closed && !(i === 0 && st.wink)) { X.strokeStyle = P.white; X.lineWidth = 7; X.beginPath(); X.arc(0, 4, 18, Math.PI * 1.1, Math.PI * 1.9); X.stroke(); }
    else {
      X.fillStyle = P.white; X.beginPath(); X.ellipse(0, 0, 26, st.wide ? 34 : 30, 0, 0, 7); X.fill();
      X.fillStyle = P.ink; X.beginPath(); X.arc(lookX, lookY + 4, st.wide ? 11 : 13, 0, 7); X.fill();
      X.fillStyle = P.white; X.beginPath(); X.arc(lookX + 4, lookY - 1, 4, 0, 7); X.fill();
    }
    X.restore();
  });
  if (st.talk > 0.04) { X.fillStyle = '#2a0c12'; X.strokeStyle = P.gold; X.lineWidth = 5; X.beginPath(); X.ellipse(2, -16, 15 + st.talk * 5, 3 + st.talk * 17, 0, 0, 7); X.fill(); X.stroke(); X.fillStyle = '#d9606e'; X.beginPath(); X.ellipse(2, -16 + (3 + st.talk * 17) * 0.45, 9, 3 + st.talk * 5, 0, 0, 7); X.fill(); X.beginPath(); }
  else {
  X.strokeStyle = P.gold; X.lineWidth = 6; X.lineCap = 'round'; X.beginPath();
  if (st.mood === 'happy') X.arc(2, -22, 20, 0.15 * Math.PI, 0.85 * Math.PI);
  else if (st.mood === 'worried') { X.moveTo(-16, -8); X.quadraticCurveTo(0, -20, 18, -8); }
  else if (st.mood === 'o') X.ellipse(2, -14, 9, 12, 0, 0, 7);
  else { X.moveTo(-14, -14); X.lineTo(18, -14); }
  X.stroke();
  }
  if (st.sweat) { X.save();
    const sp = (t * 1.4) % 1; X.fillStyle = '#7fc4e8'; X.globalAlpha = 1 - sp * 0.6;
    X.beginPath(); const sx = 92, sy = -130 + sp * 40;
    X.moveTo(sx, sy - 22); X.quadraticCurveTo(sx + 16, sy, sx, sy + 10); X.quadraticCurveTo(sx - 16, sy, sx, sy - 22); X.fill();
  X.restore(); }
  if (st.extra) st.extra(t);
  X.restore();
}
function confetti(t, t0, cx, cy, n = 40, cols = ['#a8512b', '#ee8b47', '#f0c04e', '#4faa72', '#6e1f2a'], dur = 1.4) {
  if (t < t0 || t > t0 + dur) return;
  const k = t - t0;
  for (let i = 0; i < n; i++) {
    const ang = hash(i) * Math.PI * 2, sp = 500 + hash(i + 9) * 900;
    const x = cx + Math.cos(ang) * sp * k, y = cy + Math.sin(ang) * sp * k + 900 * k * k;
    X.save(); X.translate(x, y); X.rotate(k * 9 * (hash(i + 3) - .5)); X.globalAlpha = 1 - k / dur;
    X.fillStyle = cols[i % cols.length]; X.fillRect(-9, -5, 18, 10); X.restore();
  }
}
function logo(x, y, r, a = 1) {
  if (!IMG.logo) return;
  X.save(); X.globalAlpha = a; X.translate(x, y); X.beginPath(); X.arc(0, 0, r, 0, 7); X.clip(); X.drawImage(IMG.logo, -r, -r, r * 2, r * 2); X.restore();
}
function grain(t, amount = 0.05) {
  X.save(); X.globalAlpha = amount; const s = Math.floor(t * 30);
  for (let i = 0; i < 260; i++) { X.fillStyle = hash(i + s) > 0.5 ? '#fff' : '#000'; X.fillRect(hash(i * 3 + s) * W, hash(i * 7 + s) * H, 3, 3); }
  X.restore();
}
// ---------- camera ----------
function camera(t, hits = [], starts = [], amp = 22) {
  let a = 0; for (const h of hits) { const d = t - h; if (d >= 0 && d < 0.25) a = Math.max(a, (1 - d / 0.25) * amp); }
  let s = 1; for (const st of starts) { const d = t - st; if (d >= 0 && d < 0.18) s = 1 + (1 - d / 0.18) * 0.06; }
  X.translate(W / 2 + Math.sin(t * 91) * a, H / 2 + Math.cos(t * 77) * a); X.scale(s, s); X.translate(-W / 2, -H / 2);
}
// ---------- render loop ----------
const ACC = document.createElement('canvas'); ACC.width = W; ACC.height = H; const AX = ACC.getContext('2d');
window.renderAt = function (t, fps = 30, sub = 3) {
  AX.clearRect(0, 0, W, H);
  for (let i = 0; i < sub; i++) {
    X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.shadowBlur = 0;
    window.SCENE.frame(Math.max(0, t - (i / sub) * (0.5 / fps)));
    X.restore();
    AX.globalAlpha = 1 / (i + 1); AX.drawImage(C, 0, 0);
  }
  X.globalAlpha = 1; X.drawImage(ACC, 0, 0);
};
// helper for scenes: T from timeline json (line starts) + phrase onsets
async function loadTimeline(v) {
  const tl = await (await fetch(`v/${v}/timeline.json`)).json();
  const L = {}; tl.forEach((l) => { L[l.n] = l; });
  return L;
}
