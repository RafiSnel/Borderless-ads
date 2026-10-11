// depth.js — 3D accents drawn in the 2D canvas (no 3D engine): coin, flips, hinges, globe, extruded type.
// Rule: the logo is always upright. Things may turn around their vertical axis, never tilt sideways.

// ---------- the Borderless coin ----------
// spins around its vertical axis like a real coin; ang = turn angle (radians)
function coin3d(x, y, r, ang, a = 1, opts = {}) {
  if (r <= 0.5) return;
  const c = Math.cos(ang), sx = Math.max(0.03, Math.abs(c)), side = Math.sin(ang), d = r * 0.16;
  X.save(); X.globalAlpha *= a; X.translate(x, y);
  if (opts.shadow !== false) { X.fillStyle = opts.shadowCol || 'rgba(0,0,0,0.22)'; X.beginPath(); X.ellipse(0, r * 1.2, r * 0.85 * (0.6 + 0.4 * sx), r * 0.11, 0, 0, 7); X.fill(); }
  if (opts.glow) { X.shadowColor = opts.glow; X.shadowBlur = opts.gb || 50; X.fillStyle = '#c9953f'; X.beginPath(); X.ellipse(0, 0, r * sx, r, 0, 0, 7); X.fill(); X.shadowBlur = 0; }
  const steps = 14; // the gold rim: ellipses stacked between back and front face
  for (let i = steps; i >= 0; i--) { const o = (i / steps - 0.5) * d * side; X.fillStyle = i % 2 ? '#c9953f' : '#b88332'; X.beginPath(); X.ellipse(o, 0, r * sx, r, 0, 0, 7); X.fill(); }
  X.translate(-0.5 * d * side, 0);
  const g = X.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#f6d58a'); g.addColorStop(0.5, '#e3b871'); g.addColorStop(1, '#b88332');
  X.fillStyle = g; X.beginPath(); X.ellipse(0, 0, r * sx, r, 0, 0, 7); X.fill();
  X.save(); X.scale(sx, 1); X.beginPath(); X.arc(0, 0, r * 0.88, 0, 7); X.clip();
  if (IMG.logo) X.drawImage(IMG.logo, -r * 0.88, -r * 0.88, r * 1.76, r * 1.76);
  const sh = side * r * 1.6, sg = X.createLinearGradient(sh - r * 0.5, -r, sh + r * 0.5, r);
  sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(0.5, 'rgba(255,255,255,0.3)'); sg.addColorStop(1, 'rgba(255,255,255,0)'); X.fillStyle = sg; X.fillRect(-r, -r, 2 * r, 2 * r);
  X.restore(); X.restore();
}
// spin angle for e seconds after the coin appears: fast turns easing out into a gentle sway
const spin3d = (e, turns = 3) => (1 - eo(lin(e, 0, 1.1))) * Math.PI * 2 * turns + Math.sin(e * 1.6) * 0.35 * eo(lin(e, 0.6, 1.2));
// end-card coin: pops in at t0, spins, settles
function coinIn(t, t0, x, y, r, opts = {}) { if (t < t0) return; const e = t - t0; coin3d(x, y, r * back(lin(e, 0, 0.35)), spin3d(e, opts.turns || 3), 1, opts); }

// ---------- planes in perspective ----------
const _off = {}; function offCanvas(key, w, h) { let c = _off[key]; if (!c || c.width !== w || c.height !== h) { c = document.createElement('canvas'); c.width = w; c.height = h; _off[key] = c; } const g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h); return [c, g]; }
// draw(ctx, w, h) paints a face. Renders it with the global X redirected so all kit helpers work on it.
function paintFace(key, w, h, draw, dark = 0) { const [c, g] = offCanvas(key, Math.ceil(w), Math.ceil(h)); const keep = X; X = g; try { draw(g, w, h); } finally { X = keep; }
  if (dark > 0.01) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-atop'; g.fillStyle = `rgba(0,0,0,${dark})`; g.fillRect(0, 0, c.width, c.height); g.restore(); } return c; }
// a w x h plane centred at (cx, cy), turned by ang around its vertical axis (axis 'y') or horizontal axis (axis 'x'),
// with perspective. front/back: draw functions. shade darkens it as it turns away.
function flipPlane(cx, cy, w, h, ang, front, back_, opts = {}) {
  const D = opts.persp || 2200, n = opts.strips || 60, axisX = opts.axis === 'x';
  const c = Math.cos(ang), s = Math.sin(ang), showBack = c < 0;
  const face = paintFace(opts.key || 'flip', w, h, showBack ? (back_ || front) : front, (opts.shade ?? 0.35) * (1 - Math.abs(c)));
  X.save(); X.globalAlpha *= opts.a ?? 1;
  if (opts.shadow !== false && Math.abs(c) > 0.25) { X.fillStyle = `rgba(0,0,0,${0.16 * (Math.abs(c) - 0.25) / 0.75})`; if (axisX) { rr(cx - w / 2 + 10, cy - h / 2 * Math.abs(c) + 20, w, h * Math.abs(c), 30); } else { rr(cx - w / 2 * Math.abs(c) + 10, cy - h / 2 + 20, w * Math.abs(c), h, 30); } X.fill(); }
  for (let i = 0; i < n; i++) {
    const u0 = i / n - 0.5, u1 = (i + 1) / n - 0.5, um = (u0 + u1) / 2;
    const L = axisX ? h : w;
    const z = um * L * s, f = D / (D + z);
    const p0 = u0 * L * c * (D / (D + u0 * L * s)), p1 = u1 * L * c * (D / (D + u1 * L * s));
    const src = showBack ? (n - 1 - i) : i; // back face is seen mirrored
    if (axisX) {
      const y0 = Math.min(p0, p1), hh = Math.abs(p1 - p0) + 0.8, ww = w * f;
      X.drawImage(face, 0, src * (h / n), w, h / n, cx - ww / 2, cy + y0, ww, hh);
    } else {
      const x0 = Math.min(p0, p1), ww = Math.abs(p1 - p0) + 0.8, hh = h * f;
      X.drawImage(face, src * (w / n), 0, w / n, h, cx + x0, cy - hh / 2, ww, hh);
    }
  }
  X.restore();
}
// a plane hinged on its left edge at hx (like a book cover). ang 0 = lying flat to the right of the hinge, PI = folded to the left.
function hingePlane(hx, cy, w, h, ang, front, back_, opts = {}) {
  const D = opts.persp || 2400, n = opts.strips || 60, c = Math.cos(ang), s = Math.sin(ang), showBack = c < 0;
  const face = paintFace(opts.key || 'hinge', w, h, showBack ? (back_ || front) : front, (opts.shade ?? 0.3) * Math.abs(s) * 0.6);
  X.save(); X.globalAlpha *= opts.a ?? 1;
  for (let i = 0; i < n; i++) {
    const u0 = i / n, u1 = (i + 1) / n, um = (u0 + u1) / 2;
    const z = -um * w * s, f = D / (D + z); // lifts towards the camera
    const x0 = u0 * w * c * (D / (D - u0 * w * s)), x1 = u1 * w * c * (D / (D - u1 * w * s));
    const src = showBack ? (n - 1 - i) : i, hh = h * f;
    X.drawImage(face, src * (w / n), 0, w / n, h, hx + Math.min(x0, x1), cy - hh / 2, Math.abs(x1 - x0) + 0.8, hh);
  }
  X.restore();
}

// ---------- globe (orthographic projection of the world atlas) ----------
function globe(cx, cy, R, lon0, lat0, opts = {}) {
  if (!WORLD) return;
  const { ocean = '#0d1530', land = '#2a3352', hi = {}, glow = 0, grid = 'rgba(255,255,255,0.06)', rim = null, edge = null } = opts;
  const rad = Math.PI / 180, p0 = lat0 * rad, sp0 = Math.sin(p0), cp0 = Math.cos(p0);
  const proj = (lon, lat) => { const l = (lon - lon0) * rad, p = lat * rad, cp = Math.cos(p), spp = Math.sin(p);
    let x = cp * Math.sin(l), y = cp0 * spp - sp0 * cp * Math.cos(l); const vis = sp0 * spp + cp0 * cp * Math.cos(l);
    if (vis < 0) { const m = Math.hypot(x, y) || 1; x /= m; y /= m; } return [cx + x * R, cy - y * R, vis]; };
  X.save();
  if (rim) { X.shadowColor = rim; X.shadowBlur = 80; }
  const g = X.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R); g.addColorStop(0, opts.ocean2 || '#1c2a55'); g.addColorStop(1, ocean);
  X.fillStyle = g; X.beginPath(); X.arc(cx, cy, R, 0, 7); X.fill(); X.shadowBlur = 0;
  X.beginPath(); X.arc(cx, cy, R, 0, 7); X.clip();
  // graticule
  X.strokeStyle = grid; X.lineWidth = 2;
  for (let lo = -180; lo < 180; lo += 30) { X.beginPath(); let on = false; for (let la = -90; la <= 90; la += 5) { const [x, y, v] = proj(lo, la); if (v > 0) { on ? X.lineTo(x, y) : X.moveTo(x, y); on = true; } else on = false; } X.stroke(); }
  for (let la = -60; la <= 60; la += 30) { X.beginPath(); let on = false; for (let lo = -180; lo <= 180; lo += 5) { const [x, y, v] = proj(lo, la); if (v > 0) { on ? X.lineTo(x, y) : X.moveTo(x, y); on = true; } else on = false; } X.stroke(); }
  for (const f of WORLD) {
    const id = +f.id, h = hi[id];
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    X.beginPath(); let any = false;
    for (const poly of polys) for (const ring of poly) {
      let vis = 0; const pts = ring.map((p) => { const q = proj(p[0], p[1]); if (q[2] > 0) vis++; return q; });
      if (!vis) continue; any = true;
      pts.forEach(([x, y], i) => (i ? X.lineTo(x, y) : X.moveTo(x, y))); X.closePath();
    }
    if (!any) continue;
    if (h) { X.shadowColor = h; X.shadowBlur = glow; X.fillStyle = h; X.fill(); X.shadowBlur = 0; } else { X.fillStyle = land; X.fill(); }
    if (edge) { X.strokeStyle = edge; X.lineWidth = 1.5; X.stroke(); }
  }
  // shading: lit from the top left, dark limb
  const sh = X.createRadialGradient(cx - R * 0.4, cy - R * 0.45, R * 0.2, cx, cy, R * 1.05);
  sh.addColorStop(0, 'rgba(255,255,255,0.10)'); sh.addColorStop(0.55, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.55)');
  X.fillStyle = sh; X.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  X.restore();
}

// ---------- extruded type ----------
// text with a solid side, like a thick 3D letter. turn = sway around the vertical axis (radians, small).
function extrude(s, x, y, f, face, side, depth = 26, opts = {}) {
  const turn = opts.turn || 0, dx = (opts.dx ?? 0.55) + Math.sin(turn) * 0.9, dy = opts.dy ?? 0.85, sxs = Math.cos(turn);
  X.save(); X.translate(x, y); X.scale(sxs * (opts.s ?? 1), opts.s ?? 1); X.font = f; X.textAlign = 'center'; X.textBaseline = 'middle';
  if (opts.ls) X.letterSpacing = opts.ls + 'px';
  if (opts.shadow !== false) { X.fillStyle = 'rgba(0,0,0,0.22)'; X.fillText(s, dx * depth + 14, dy * depth + 24); }
  for (let i = depth; i > 0; i -= 2) { X.fillStyle = side; X.fillText(s, dx * i, dy * i); }
  if (opts.edge) { X.strokeStyle = opts.edge; X.lineWidth = 4; X.strokeText(s, 0, 0); }
  X.fillStyle = face; X.fillText(s, 0, 0);
  X.restore();
}
// extruded key word that pops in and swings round to face the camera
function extrudeSlam(t, t0, s, x, y, f, face, side, depth = 30, opts = {}) {
  if (t < t0) return; const p = (t - t0) / 0.25, sc = mix(opts.from ?? 1.6, 1, back(p, 1.4));
  const turn = (1 - eo(lin(t, t0, t0 + 0.9))) * (opts.swing ?? 0.8) + Math.sin((t - t0) * 1.3) * 0.08;
  X.save(); X.globalAlpha *= cl(0.35 + p * 3); extrude(s, x, y, f, face, side, depth, { ...opts, turn, s: sc }); X.restore();
}
function globePt(cx, cy, R, lon0, lat0, lon, lat) { const rad = Math.PI / 180, p0 = lat0 * rad, l = (lon - lon0) * rad, p = lat * rad;
  return [cx + R * Math.cos(p) * Math.sin(l), cy - R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)]; }
