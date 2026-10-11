// HOST — the Borderless passport mascot as recurring host / quizmaster / guide.
// HOST.draw(t, x, y, s, st) with st like mascot() plus: acc:['bowtie','mic','shades','card'], card:'7/10', point:true
// HOST.say(t, t0, t1, text, x, y, opts) — comic speech bubble with a tail pointing at (opts.tx, opts.ty)
// HOST.state(t, beats, base) — pick the latest beat {t, ...st} and add a squash pop on each change
const HOST = {
  draw(t, x, y, s, st = {}) {
    const acc = st.acc || [];
    const extra = (tt) => {
      if (acc.includes('bowtie')) {
        X.fillStyle = '#e8b62c'; X.beginPath(); X.moveTo(0, 18); X.lineTo(-38, -2); X.lineTo(-38, 38); X.closePath(); X.fill();
        X.beginPath(); X.moveTo(0, 18); X.lineTo(38, -2); X.lineTo(38, 38); X.closePath(); X.fill();
        X.fillStyle = '#b5841a'; X.beginPath(); X.arc(0, 18, 10, 0, 7); X.fill();
      }
      if (acc.includes('shades')) {
        X.fillStyle = '#111'; rr(-76, -86, 68, 46, 14); X.fill(); rr(10, -86, 68, 46, 14); X.fill(); X.fillRect(-10, -72, 22, 8);
        X.fillStyle = 'rgba(255,255,255,0.35)'; X.fillRect(-64, -80, 18, 6); X.fillRect(22, -80, 18, 6);
      }
      if (acc.includes('mic')) {
        const up = st.armsUp ? 90 : 0; const hx = 150, hy = 40 - up;
        X.save(); X.translate(hx, hy); X.rotate(-0.5);
        X.fillStyle = '#222'; rr(-9, -10, 18, 70, 8); X.fill();
        X.fillStyle = '#9aa3ad'; X.beginPath(); X.arc(0, -26, 22, 0, 7); X.fill();
        X.strokeStyle = '#6c757d'; X.lineWidth = 2; for (let i = -2; i <= 2; i++) { X.beginPath(); X.moveTo(-20, -26 + i * 7); X.lineTo(20, -26 + i * 7); X.stroke(); }
        X.restore();
      }
      if (acc.includes('card') && st.card) {
        const up = st.armsUp ? 90 : 0; X.save(); X.translate(-150, -60 - up); X.rotate(-0.12);
        X.fillStyle = '#5a3a1a'; X.fillRect(-6, 40, 12, 90);
        X.fillStyle = '#fff'; rr(-90, -70, 180, 120, 16); X.fill(); X.strokeStyle = '#111'; X.lineWidth = 5; X.stroke();
        X.font = font('anton', 400, 78); X.fillStyle = '#111'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(st.card, 0, -8); X.restore();
      }
      if (st.point) { X.fillStyle = st.body || '#6e1f2a'; X.beginPath(); X.arc(150 + Math.sin(tt * 10) * 4, -30, 20, 0, 7); X.fill(); }
    };
    mascot(t, x, y, s, { ...st, extra });
  },
  state(t, beats, base = {}) {
    let cur = null; for (const b of beats) if (t >= b.t) cur = b;
    if (!cur) return { ...base };
    const d = t - cur.t; const squash = d < 0.25 ? (1 - d / 0.25) * 1.2 : 0;
    return { ...base, ...cur, squash };
  },
  // slide-in offset helper: returns 0..1 with overshoot
  enter(t, t0, dur = 0.35) { return back(lin(t, t0, t0 + dur), 2.2); },
  say(t, t0, t1, text, x, y, opts = {}) {
    if (t < t0 || t > t1) return;
    const k = back(lin(t, t0, t0 + 0.18), 2.4) * (1 - lin(t, t1 - 0.12, t1));
    let size = opts.size || 50; X.font = font(opts.f || 'archivo', 400, size); const mw = (opts.maxw || 620) - size * 1.1; const tw0 = X.measureText(text).width; if (tw0 > mw) size *= mw / tw0;
    const f = font(opts.f || 'archivo', 400, size);
    X.save(); X.translate(x, y); X.rotate(opts.rot || -0.03); X.scale(k, k);
    X.font = f; const w = Math.min(opts.maxw || 620, X.measureText(text).width + size * 1.1), h = size * 1.7;
    const bg = opts.bg || '#ffffff', fg = opts.fg || '#111', ink = opts.ink || '#111';
    const tx = (opts.tail ?? -0.3) * w; // tail x offset relative to centre
    const tail = (dx, dy) => { X.beginPath(); X.moveTo(tx - 24 + dx, h / 2 - 6 + dy); X.lineTo(tx - 44 + dx, h / 2 + 48 + dy); X.lineTo(tx + 28 + dx, h / 2 - 6 + dy); X.closePath(); };
    X.fillStyle = ink; rr(-w / 2 + 8, -h / 2 + 10, w, h, h / 2); X.fill(); tail(8, 10); X.fill();
    X.lineWidth = 6; X.strokeStyle = ink; X.fillStyle = bg; tail(0, 0); X.fill(); X.stroke();
    rr(-w / 2, -h / 2, w, h, h / 2); X.fill(); X.stroke();
    X.fillRect(tx - 22, h / 2 - 9, 46, 12);
    txt(text, 0, size * 0.04, f, fg); X.restore();
  },
  // zoom punch for a list of beat times (multiply into camera)
  punch(t, beats, amt = 0.035, dur = 0.16) { let s = 1; for (const b of beats) { const d = t - b; if (d >= 0 && d < dur) s = Math.max(s, 1 + (1 - d / dur) * amt); } return s; },
};

// PEEKS — the host pops in from an edge, reacts, says something, and leaves.
// item: {t, d, side:'L'|'R'|'B'|'T', x, y, s, say:'..' | says:[[t,text,{st}]], glow:'#rgba', ...mascot st}
HOST.peeks = function (t, list) {
  for (const p of list) {
    if (t < p.t - 0.05 || t > p.t + p.d + 0.35) continue;
    const kin = back(lin(t, p.t, p.t + 0.28), 2.0), kout = ei(lin(t, p.t + p.d, p.t + p.d + 0.3)); const pos = kin * (1 - kout);
    const side = p.side || 'L'; const s = (p.s || 0.7) * (side === 'T' ? 1 : 1.2); let x, y = p.y || 1600, tilt = 0;
    if (side === 'L') { x = mix(-280 * s / 0.7, 175 * s / 0.7, pos); tilt = 0.14; }
    else if (side === 'R') { x = mix(W + 280 * s / 0.7, W - 175 * s / 0.7, pos); tilt = -0.14; }
    else if (side === 'B') { x = p.x ?? W / 2; y = mix(H + 300, y, pos); }
    else { x = p.x ?? W / 2; y = mix(-300, y, pos); }
    let st = { mood: p.mood, wide: p.wide, sweat: p.sweat, armsUp: p.armsUp, wave: p.wave, wink: p.wink, point: p.point, lookX: p.lookX, lookY: p.lookY, acc: p.acc, card: p.card, seed: p.seed };
    let say = p.say, sayT = p.t + 0.12;
    if (p.says) { for (const [tt, tx, ov] of p.says) if (t >= tt) { say = tx; sayT = tt; if (ov) st = { ...st, ...ov }; } }
    const lastChange = p.says ? sayT : p.t;
    st.squash = Math.max(0, 1 - (t - lastChange) * 4) * 0.9;
    st.tilt = (st.tilt || 0) + tilt * (p.noTilt ? 0 : 1);
    if (p.glow) { const g = X.createRadialGradient(x, y, 10, x, y, 300 * s / 0.7); g.addColorStop(0, p.glow); g.addColorStop(1, 'rgba(0,0,0,0)'); X.fillStyle = g; X.fillRect(x - 400, y - 400, 800, 800); }
    HOST.draw(t, x, y, s, st);
    if (say && pos > 0.6) {
      const bw = Math.min(p.maxw || 540, 60 + say.length * (p.size || 46) * 0.62) / 2;
      const bx = side === 'L' ? x + 120 * s / 0.7 + bw : side === 'R' ? x - 120 * s / 0.7 - bw : side === 'T' ? x + 300 : x;
      const by = side === 'T' ? y - 10 : side === 'B' ? y - 245 * s / 0.7 : y - 150 * s / 0.7;
      const tail = side === 'L' ? -0.35 : side === 'R' ? 0.3 : side === 'T' ? -0.45 : 0;
      HOST.say(t, sayT, p.t + p.d + 0.05, say, bx, by, { size: p.size || 46, maxw: p.maxw || 540, tail, rot: side === 'R' ? 0.03 : -0.03 });
    }
  }
};
// phrase punch: a small zoom on every spoken phrase onset (call right after camera())
HOST.pp = function (t, L, amt = 0.018) { const b = []; Object.values(L).forEach((l) => l.phrases.forEach((x) => b.push(x))); const z = HOST.punch(t, b, amt, 0.14); if (z !== 1) { X.translate(W / 2, H / 2); X.scale(z, z); X.translate(-W / 2, -H / 2); } };
// cue helper: entrance sounds for peeks
HOST.cues = function (list) { const c = []; list.forEach((p) => { c.push(['boing', p.t, 0.35], ['pop', p.t + 0.12, 0.5]); (p.says || []).forEach(([tt]) => c.push(['pop', tt, 0.45])); }); return c; };
