// Split-flap (departure board) helpers
const FLAP_CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·-→';
// draw one row of flap cells; each cell cycles through characters until it settles at its target
function flapRow(t, t0, str, x, y, cw, ch, opts = {}) {
  const { bg = '#141414', fg = '#ffd43b', settle = 0.5, stagger = 0.04, gap = 6, seed = 1, f = 'bebas' } = opts;
  const s = String(str).toUpperCase(), RATE = 15, hh = ch / 2;
  const glyph = (c, top) => { // one half of a character card
    X.save(); X.beginPath(); X.rect(-cw / 2, top ? -hh : 0, cw, hh); X.clip();
    const g = X.createLinearGradient(0, -hh, 0, hh); g.addColorStop(0, '#2a2a2a'); g.addColorStop(0.5, bg); g.addColorStop(1, '#050505');
    X.fillStyle = g; rr(-cw / 2, -hh, cw, ch, 8); X.fill();
    if (c && c !== ' ') { X.font = font(f, 400, ch * 0.82); X.fillStyle = fg; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(c, 0, ch * 0.04); }
    X.restore(); };
  for (let i = 0; i < s.length; i++) {
    const cx = x + i * (cw + gap) + cw / 2, cy = y + hh;
    X.fillStyle = 'rgba(0,0,0,0.45)'; rr(cx - cw / 2 + 3, y + 8, cw, ch, 8); X.fill(); // depth under the cell
    const tSettle = t0 + settle + i * stagger;
    const at = (tt) => { if (tt < t0) return ' '; if (tt >= tSettle) return s[i]; const k = Math.floor((tt - t0) * RATE + hash(i * 13 + seed) * 20); return FLAP_CH[k % FLAP_CH.length]; };
    // which flip is in progress: flips happen every 1/RATE s while spinning, plus the final one at tSettle
    let cur = at(t), prev = cur, ph = 1;
    if (t >= t0 && t < tSettle + 1 / RATE) {
      const base = t >= tSettle ? tSettle : t0 + (Math.floor((t - t0) * RATE + hash(i * 13 + seed) * 20) - hash(i * 13 + seed) * 20) / RATE;
      ph = cl((t - base) * RATE); prev = at(base - 0.001); cur = at(base + 0.0001);
      if (t >= tSettle) { prev = at(tSettle - 0.001); cur = s[i]; }
    }
    X.save(); X.translate(cx, cy);
    if (ph >= 1 || prev === cur) { glyph(cur, true); glyph(cur, false); }
    else {
      glyph(cur, true); glyph(prev, false); // behind: new top, old bottom
      if (ph < 0.5) { const k = Math.cos(ph * Math.PI); X.save(); X.scale(1, k); glyph(prev, true); X.fillStyle = `rgba(0,0,0,${0.5 * (1 - k)})`; X.fillRect(-cw / 2, -hh, cw, hh); X.restore(); }
      else { const k = -Math.cos(ph * Math.PI); X.save(); X.scale(1, k); glyph(cur, false); X.fillStyle = `rgba(255,255,255,${0.12 * (1 - k)})`; X.fillRect(-cw / 2, 0, cw, hh); X.restore(); }
    }
    X.fillStyle = 'rgba(0,0,0,0.75)'; X.fillRect(-cw / 2, -1.5, cw, 3); // the split
    X.fillStyle = '#3a3a3a'; X.fillRect(-cw / 2 - 2, -5, 5, 10); X.fillRect(cw / 2 - 3, -5, 5, 10); // hinge pins
    X.restore();
  }
}
function flapDone(t0, str, settle = 0.5, stagger = 0.04) { return t0 + settle + String(str).length * stagger; }
function planeIcon(x, y, s, rot, col = '#1f1a14') {
  X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s); X.fillStyle = col;
  X.beginPath(); X.moveTo(60, 0); X.quadraticCurveTo(70, -8, 60, -10); X.lineTo(-50, -8); X.lineTo(-60, -30); X.lineTo(-72, -30); X.lineTo(-66, -6);
  X.lineTo(-66, 6); X.lineTo(-72, 30); X.lineTo(-60, 30); X.lineTo(-50, 8); X.lineTo(60, 10); X.quadraticCurveTo(70, 8, 60, 0); X.fill();
  X.beginPath(); X.moveTo(10, -8); X.lineTo(-20, -60); X.lineTo(-5, -60); X.lineTo(30, -8); X.fill();
  X.beginPath(); X.moveTo(10, 8); X.lineTo(-20, 60); X.lineTo(-5, 60); X.lineTo(30, 8); X.fill();
  X.restore();
}
