// v5.js — shared look for the v5 series: the vocabulary of video 1 (cream + terracotta, Inter 900, one idea per beat).
const P5 = {
  bg: '#f4eee2', bg2: '#eae2d3', paper: '#fffdf8', ink: '#1f1a14', ink2: '#5b5044', ink3: '#9a8f7e', line: '#e4dccd',
  acc: '#a8512b', acc2: '#8e4322', amber: '#ee8b47', sun: '#f0c04e', pass: '#6e1f2a', gold: '#e3b871', green: '#4faa72', red: '#c8442f', grey: '#cfc8bb', grey2: '#b9b1a3',
};
const I5 = (w, s) => font('inter', w, s);
function bg5(t, o = {}) {
  X.fillStyle = o.col || P5.bg; X.fillRect(0, 0, W, H);
  X.strokeStyle = o.grid || 'rgba(91,80,68,0.07)'; X.lineWidth = 2; const g0 = (t * (o.drift ?? 18)) % 60;
  for (let x = -60 + g0; x < W + 60; x += 60) { X.beginPath(); X.moveTo(x, 0); X.lineTo(x, H); X.stroke(); }
  for (let y = -60 + g0; y < H + 60; y += 60) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
  const g = X.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1300); g.addColorStop(0, 'rgba(244,238,226,0)'); g.addColorStop(1, o.vig || 'rgba(214,200,176,0.55)');
  X.fillStyle = g; X.fillRect(0, 0, W, H);
}
// headline word in the video-1 style
function hd(t, t0, text, x, y, size, color = P5.ink, o = {}) { slam(t, t0, text, x, y, I5(o.w || 900, size), color, { shadow: o.shadow === false ? null : 'rgba(31,26,20,0.12)', ...o }); }
function lb(text, x, y, size, color = P5.ink2, w = 700, o = {}) { txt(text, x, y, I5(w, size), color, o); }
function chip(text, x, y, size, fg, bgc, a = 1, s = 1, o = {}) { pill(text, x, y, I5(o.w || 700, size), fg, bgc, a, s, o); }
// soft white app card
function card(x, y, w, h, o = {}) {
  X.save(); X.globalAlpha *= o.a ?? 1;
  if (o.shadow !== false) { X.fillStyle = 'rgba(31,26,20,0.10)'; rr(x + 8, y + 16, w, h, o.r ?? 34); X.fill(); }
  X.fillStyle = o.fill || P5.paper; rr(x, y, w, h, o.r ?? 34); X.fill();
  if (o.border) { X.strokeStyle = o.border; X.lineWidth = o.bw || 4; if (o.dash) X.setLineDash(o.dash); X.stroke(); X.setLineDash([]); }
  X.restore();
}
// an app-style lesson card. o: kicker, title, lines[], typed (0..1 for the body), prog (0..1), vocab:[[pt,en]], vk (count shown)
function lessonCard(t, cx, cy, w, h, o = {}) {
  const x = cx - w / 2, y = cy - h / 2; card(x, y, w, h, o);
  X.save(); X.globalAlpha *= o.a ?? 1; X.textAlign = 'left'; X.textBaseline = 'alphabetic';
  let yy = y + 78;
  if (o.kicker) { X.font = I5(800, 30); X.letterSpacing = '3px'; X.fillStyle = P5.acc; X.fillText(o.kicker, x + 52, yy); X.letterSpacing = '0px'; yy += 70; }
  if (o.title) { const ts = o.ts || 64, lh = ts * 1.12; X.font = I5(800, ts); X.fillStyle = P5.ink; const tl = o.titleTyped != null ? o.title.slice(0, Math.floor(o.title.length * cl(o.titleTyped))) : o.title;
    const tls = tl.split('\n'); tls.forEach((l, i) => X.fillText(l, x + 52, yy + i * lh));
    if (o.cursor && Math.floor(t * 3) % 2 === 0) { const li = tls.length - 1, lw = X.measureText(tls[li]).width; X.fillStyle = P5.acc; X.fillRect(x + 58 + lw, yy + li * lh - ts * 0.78, 6, ts * 0.92); }
    yy += o.title.split('\n').length * lh + 10; }
  if (o.lines) { const all = o.lines.join('\n'); const shown = o.typed != null ? all.slice(0, Math.floor(all.length * cl(o.typed))) : all;
    X.font = I5(500, o.bs || 42); X.fillStyle = P5.ink2; shown.split('\n').forEach((l, i) => X.fillText(l, x + 52, yy + 30 + i * (o.bs || 42) * 1.45)); yy += o.lines.length * (o.bs || 42) * 1.45 + 40; }
  if (o.bars) { for (let i = 0; i < o.bars; i++) { const k = cl((o.barsK ?? 1) * o.bars - i); if (k <= 0) continue; X.fillStyle = P5.line; rr(x + 52, yy + i * 46, (w - 104) * (i % 3 === 2 ? 0.6 : 0.92) * eo(k), 22, 11); X.fill(); } yy += o.bars * 46 + 20; }
  if (o.prog != null) { X.fillStyle = P5.line; rr(x + 52, y + h - 70, w - 104, 14, 7); X.fill(); X.fillStyle = P5.acc; rr(x + 52, y + h - 70, (w - 104) * cl(o.prog), 14, 7); X.fill(); }
  X.restore();
  return yy;
}
// flat human character. o: skin, hair, hairCol, shirt, mood, talk, glasses, beard, stache, lookX, apron, s
function person(t, x, y, s, o = {}) {
  X.save(); X.translate(x, y + Math.sin(t * 2.2 + (o.seed || 0)) * 4); X.scale(s, s); X.rotate(o.tilt || 0);
  const skin = o.skin || '#e0a87e', hc = o.hairCol || '#3a2416', sh = o.shirt || P5.acc;
  // body
  X.fillStyle = sh; X.beginPath(); X.moveTo(-170, 420); X.quadraticCurveTo(-170, 120, 0, 110); X.quadraticCurveTo(170, 120, 170, 420); X.closePath(); X.fill();
  if (o.apron) { X.fillStyle = o.apron; rr(-90, 190, 180, 240, 20); X.fill(); X.strokeStyle = o.apron; X.lineWidth = 10; X.beginPath(); X.moveTo(-80, 195); X.lineTo(-40, 120); X.moveTo(80, 195); X.lineTo(40, 120); X.stroke(); }
  if (o.tie) { X.fillStyle = o.tie; X.beginPath(); X.moveTo(0, 125); X.lineTo(-22, 150); X.lineTo(0, 300); X.lineTo(22, 150); X.closePath(); X.fill(); }
  if (o.badge) { X.fillStyle = '#fff'; rr(40, 200, 110, 60, 10); X.fill(); X.font = I5(900, 28); X.fillStyle = P5.acc; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(o.badge, 95, 231); }
  X.fillStyle = skin; rr(-34, 70, 68, 60, 20); X.fill();
  // head
  const hy = -20; X.fillStyle = skin; X.beginPath(); X.ellipse(0, hy, 110, 122, 0, 0, 7); X.fill();
  X.beginPath(); X.ellipse(-108, hy + 10, 18, 26, 0, 0, 7); X.ellipse(108, hy + 10, 18, 26, 0, 0, 7); X.fill();
  // hair
  X.fillStyle = hc; const hs = o.hair || 'short';
  if (hs === 'short') { X.beginPath(); X.ellipse(0, hy - 70, 118, 70, 0, Math.PI, 0); X.fill(); rr(-118, hy - 80, 236, 40, 20); X.fill(); }
  if (hs === 'long') { X.beginPath(); X.ellipse(0, hy - 60, 126, 86, 0, Math.PI, 0); X.fill(); rr(-132, hy - 70, 52, 230, 26); X.fill(); rr(80, hy - 70, 52, 230, 26); X.fill(); }
  if (hs === 'bun') { X.beginPath(); X.arc(0, hy - 150, 52, 0, 7); X.fill(); X.beginPath(); X.ellipse(0, hy - 64, 120, 74, 0, Math.PI, 0); X.fill(); }
  if (hs === 'curly') { for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI; X.beginPath(); X.arc(Math.cos(a) * 100, hy - 40 + Math.sin(a) * 100, 46, 0, 7); X.fill(); } }
  if (hs === 'bald') { X.beginPath(); X.ellipse(-104, hy - 30, 24, 40, 0, 0, 7); X.ellipse(104, hy - 30, 24, 40, 0, 0, 7); X.fill(); }
  // face
  const lx = (o.lookX || 0) * 8;
  X.fillStyle = P5.ink; X.beginPath(); X.ellipse(-40 + lx, hy + 4, 11, o.wide ? 17 : 13, 0, 0, 7); X.ellipse(40 + lx, hy + 4, 11, o.wide ? 17 : 13, 0, 0, 7); X.fill();
  if (o.brows) { X.strokeStyle = hc; X.lineWidth = 9; X.lineCap = 'round'; X.beginPath(); const b = o.brows; X.moveTo(-62, hy - 34 + (b === 'angry' ? -8 : 0)); X.lineTo(-20, hy - 34 + (b === 'angry' ? 8 : b === 'up' ? -10 : 0)); X.moveTo(20, hy - 34 + (b === 'angry' ? 8 : b === 'up' ? -10 : 0)); X.lineTo(62, hy - 34 + (b === 'angry' ? -8 : 0)); X.stroke(); }
  if (o.glasses) { X.strokeStyle = P5.ink; X.lineWidth = 6; X.beginPath(); X.arc(-40, hy + 4, 30, 0, 7); X.moveTo(70, hy + 4); X.arc(40, hy + 4, 30, 0, 7); X.moveTo(-10, hy + 4); X.lineTo(10, hy + 4); X.stroke(); }
  if (o.cheeks) { X.fillStyle = 'rgba(214,96,90,0.35)'; X.beginPath(); X.arc(-68, hy + 44, 20, 0, 7); X.arc(68, hy + 44, 20, 0, 7); X.fill(); }
  if (o.stache) { X.fillStyle = hc; X.beginPath(); X.ellipse(-30, hy + 58, 38, 14, 0.2, 0, 7); X.ellipse(30, hy + 58, 38, 14, -0.2, 0, 7); X.fill(); }
  if (o.beard) { X.fillStyle = hc; X.beginPath(); X.ellipse(0, hy + 80, 96, 60, 0, 0, Math.PI); X.fill(); }
  const tk = o.talk || 0;
  if (tk > 0.05) { X.fillStyle = '#5a1a1a'; X.beginPath(); X.ellipse(0, hy + 76, 24, 6 + tk * 18, 0, 0, 7); X.fill(); }
  else { X.strokeStyle = P5.ink; X.lineWidth = 7; X.lineCap = 'round'; X.beginPath();
    if (o.mood === 'happy') X.arc(0, hy + 54, 30, 0.2 * Math.PI, 0.8 * Math.PI); else if (o.mood === 'sad') X.arc(0, hy + 100, 26, 1.2 * Math.PI, 1.8 * Math.PI); else if (o.mood === 'o') X.ellipse(0, hy + 78, 12, 16, 0, 0, 7); else { X.moveTo(-22, hy + 78); X.lineTo(22, hy + 78); } X.stroke(); }
  if (o.extra) o.extra(t);
  X.restore();
}
// speech bubble with an optional subtitle under it
function bub(t, t0, t1, text, x, y, o = {}) { HOST.say(t, t0, t1, text, x, y, { f: 'inter', size: o.size || 52, maxw: o.maxw || 760, tail: o.tail ?? -0.3, rot: o.rot ?? -0.02, bg: o.bg, fg: o.fg, ink: o.ink }); }
// time at a fraction of line n (by characters)
function wt(L, n, word) { const l = L[n]; const i = l.text.toLowerCase().indexOf(word.toLowerCase()); if (i < 0) return l.start; const fr = i / l.text.length;
  // snap to the nearest phrase onset if close
  const est = l.start + fr * (l.end - l.start); let best = est; for (const p of l.phrases) if (Math.abs(p - est) < 0.22 && Math.abs(p - est) < Math.abs(best - est) + 0.0001) best = p; return best; }
// end card: terracotta wipe, spinning coin, wordmark, tagline, price line
function endCard(t, t0, tag, o = {}) {
  if (t < t0 - 0.3) return;
  const k = eo(lin(t, t0 - 0.3, t0 + 0.15));
  X.save(); X.fillStyle = P5.acc; X.beginPath(); X.arc(W / 2, H / 2, 1200 * k, 0, 7); X.fill(); X.restore();
  if (t < t0) return;
  coinIn(t, t0, W / 2, 640, 170, { glow: 'rgba(240,192,78,0.45)', shadowCol: 'rgba(0,0,0,0.18)' });
  hd(t, t0 + 0.12, 'Borderless', W / 2, 920, 150, '#fff', { shadow: 'rgba(0,0,0,0.12)' });
  if (tag) { X.font = I5(700, 50); const tw = X.measureText(tag).width; } if (tag) txt(tag, W / 2, 1040, I5(700, Math.min(50, Math.floor(50 * 960 / Math.max(1, (X.font = I5(700, 50), X.measureText(tag).width))))), '#f6e3d3', { a: eo(lin(t, t0 + (o.tagAt ?? 0.5), t0 + (o.tagAt ?? 0.5) + 0.3)) });
  txt(o.price || '€9,99 per course · 74 languages', W / 2, 1130, I5(600, 36), 'rgba(255,255,255,0.75)', { a: eo(lin(t, t0 + 1.0, t0 + 1.4)) });
  const m = back(lin(t, t0 + 0.4, t0 + 0.75), 2);
  mascot(t, W / 2, mix(H + 300, 1500, m), 0.95, { mood: 'happy', wave: t > t0 + 0.8, seed: 2 });
}
// zoom punch on a list of beats (call inside a save/restore)
function punch5(t, beats, amt = 0.04, dur = 0.18) { const z = HOST.punch(t, beats, amt, dur); if (z !== 1) { X.translate(W / 2, H / 2); X.scale(z, z); X.translate(-W / 2, -H / 2); } }

// rubber stamp painted off-screen (no holes punched into the frame)
function stamp5(t, t0, text, x, y, size, color, rot, speck = 'rgba(250,246,238,0.95)') {
  if (t < t0) return; const p = (t - t0) / 0.16, sc = mix(2.2, 1, eo(p));
  X.save(); X.globalAlpha *= cl(p * 2) * 0.92; X.translate(x, y); X.rotate(rot); X.scale(sc, sc);
  X.font = I5(900, size); const w = X.measureText(text).width + size * 0.9, h = size * 1.45;
  X.strokeStyle = color; X.lineWidth = size * 0.09; rr(-w / 2, -h / 2, w, h, size * 0.18); X.stroke();
  X.fillStyle = color; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, size * 0.04);
  X.fillStyle = speck; for (let i = 0; i < 60; i++) { X.beginPath(); X.arc((hash(i + size) - .5) * w, (hash(i * 3.1 + size) - .5) * h, 1.2 + hash(i * 7.7) * 3, 0, 7); X.fill(); }
  X.restore();
}
