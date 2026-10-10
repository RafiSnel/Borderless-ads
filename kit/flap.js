// Split-flap (departure board) helpers
const FLAP_CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·-→';
// draw one row of flap cells; each cell cycles through characters until it settles at its target
function flapRow(t, t0, str, x, y, cw, ch, opts = {}) {
  const { bg = '#141414', fg = '#ffd43b', settle = 0.5, stagger = 0.04, gap = 6, seed = 1, f = 'bebas' } = opts;
  const s = String(str).toUpperCase();
  for (let i = 0; i < s.length; i++) {
    const cx = x + i * (cw + gap);
    X.fillStyle = bg; rr(cx, y, cw, ch, 8); X.fill();
    X.fillStyle = 'rgba(255,255,255,0.05)'; X.fillRect(cx, y, cw, ch / 2);
    const tSettle = t0 + settle + i * stagger;
    let c;
    if (t < t0) c = ' ';
    else if (t >= tSettle) c = s[i];
    else { const k = Math.floor((t - t0) * 28 + hash(i * 13 + seed) * 20); c = FLAP_CH[k % FLAP_CH.length]; }
    if (c !== ' ') {
      const flipping = t >= t0 && t < tSettle;
      X.save(); X.beginPath(); X.rect(cx, y, cw, ch); X.clip();
      const sq = flipping ? 0.85 + 0.15 * Math.abs(Math.cos((t - t0) * 90)) : 1;
      X.translate(cx + cw / 2, y + ch / 2); X.scale(1, sq);
      X.font = font(f, 400, ch * 0.82); X.fillStyle = fg; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(c, 0, ch * 0.04);
      X.restore();
    }
    X.fillStyle = 'rgba(0,0,0,0.6)'; X.fillRect(cx, y + ch / 2 - 1.5, cw, 3);
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
