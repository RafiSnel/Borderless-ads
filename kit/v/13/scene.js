// 13 · "Sound like a local in Spain" — v4: Spanish evening, cinematic. Each word is a tile that turns like a cube.
window.ready = (async () => {
  await loadFonts();
  await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('13');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const N1 = '#0e1730', N2 = '#3a1c2c', TERRA = '#c4622d', GOLD = '#f2c46b', CREAM = '#f6efe2', INK = '#1d1410';
  const END = e(12) + 0.2, DUR = END + 1.8; window.DURATION = DUR;
  // word tiles in order, with the time each one becomes the front face
  const TILES = [[s(1) + 0.3, 'Five words.', 'title'], [s(2), 'Vale'], [s(4), 'Tío · Tía'], [s(6), 'Guay'], [s(7), 'Venga'], [s(10), 'Qué fuerte'], [s(11), '…all five.', 'title']];
  const cues = [['swell', 0.4, 0.5], ['guitar', 0.1, 0.7]];
  TILES.forEach(([t0], i) => { if (i) cues.push(['whoosh', t0 - 0.05, 0.6], ['castanet', t0 + 0.25, 0.6]); });
  [p(2, 1), p(2, 2), p(2, 3), p(4, 3), p(4, 4), s(5) + 0.6, p(6, 1), p(6, 2), p(7, 1), s(8), p(9, 1), p(10, 1), p(10, 2)].forEach((x) => cues.push(['pop', x, 0.55]));
  for (let k = 0; k < 14; k++) cues.push(['tick', p(3, 1) + k * 0.08, 0.35]);
  cues.push(['gasp', p(10, 0) + 0.1, 0.6], ['impact', p(10, 1), 0.6], ['stamp', p(11, 1) + 0.2, 1], ['fanfare', p(11, 1) + 0.5, 0.4], ['guitar', s(12), 0.8], ['castanet', END, 0.8]);
  const PEEKS = [
    { t: p(5, 1) - 0.1, d: 1.3, side: 'R', y: 1720, s: 0.55, mood: 'happy', wink: true, say: 'Mate.' },
    { t: p(6, 2) + 0.2, d: 1.2, side: 'L', y: 1720, s: 0.55, mood: 'happy', acc: ['shades'], say: 'Guay.' },
    { t: p(10, 1), d: 1.3, side: 'R', y: 1720, s: 0.55, mood: 'o', wide: true, say: '¡¿Qué?!' },
    { t: s(12) + 0.3, d: 3.2, side: 'L', y: 1720, s: 0.55, mood: 'happy', wave: true, say: '¡Venga!' },
  ];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const hits = [p(10, 1), p(11, 1) + 0.2];

  // ---------- world: a Spanish street at dusk ----------
  const BOK = Array.from({ length: 26 }, (_, i) => [hash(i) * W, 200 + hash(i + 3) * 1500, 20 + hash(i + 7) * 60, hash(i + 11)]);
  function sky(t) {
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, N1); g.addColorStop(0.6, N2); g.addColorStop(1, '#5a2a22'); X.fillStyle = g; X.fillRect(0, 0, W, H);
    BOK.forEach(([x, y, r, h], i) => { const yy = y - ((t * (8 + h * 20)) % 300); const a = 0.06 + 0.08 * (0.5 + 0.5 * Math.sin(t * (0.8 + h) + i));
      const gg = X.createRadialGradient(x, yy, 0, x, yy, r); gg.addColorStop(0, `rgba(242,196,107,${a * 2})`); gg.addColorStop(1, 'rgba(242,196,107,0)'); X.fillStyle = gg; X.beginPath(); X.arc(x, yy, r, 0, 7); X.fill(); });
  }
  function street(t) { // balconies + string lights, slow parallax
    const off = (t * 14) % 360;
    for (let layer = 0; layer < 2; layer++) {
      const base = layer ? 1990 : 1900, col = layer ? '#160d14' : '#24121c', sp = layer ? 1.6 : 1;
      X.fillStyle = col;
      for (let i = -1; i < 5; i++) { const x = i * 360 - off * sp % 360 + layer * 120, h = 230 + hash(i + layer * 9) * 160; X.fillRect(x, base - h, 330, h + 400);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const lit = hash(i * 11 + r * 3 + c + layer) > 0.45; X.fillStyle = lit ? 'rgba(242,196,107,0.55)' : 'rgba(0,0,0,0.25)'; X.fillRect(x + 40 + c * 95, base - h + 50 + r * 90, 50, 60); X.fillStyle = col; }
        X.strokeStyle = 'rgba(0,0,0,0.5)'; X.lineWidth = 4; X.strokeRect(x + 30, base - h + 110, 270, 4); }
    }
    X.strokeStyle = 'rgba(255,230,180,0.35)'; X.lineWidth = 2; X.beginPath(); for (let x = -40; x <= W + 40; x += 20) X.lineTo(x, 1600 + Math.sin(x / 180) * 30 + 20 * Math.cos((x - off) / 300)); X.stroke();
    for (let x = 0; x < W; x += 90) { const y = 1600 + Math.sin(x / 180) * 30 + 20 * Math.cos((x - off) / 300) + 10; const a = 0.6 + 0.4 * Math.sin(t * 3 + x); X.fillStyle = `rgba(255,214,140,${a})`; X.beginPath(); X.arc(x, y, 7, 0, 7); X.fill(); }
  }
  function grainV(t) { grain(t, 0.06); const v = X.createRadialGradient(W / 2, H / 2, 380, W / 2, H / 2, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)'); X.fillStyle = v; X.fillRect(0, 0, W, H); }
  // ---------- the tile cube ----------
  function tileFace(word, kind) { return () => {
    X.fillStyle = CREAM; rr(10, 10, 840, 520, 36); X.fill();
    X.fillStyle = TERRA; rr(10, 10, 840, 22, [36, 36, 0, 0]); X.fill();
    X.strokeStyle = 'rgba(196,98,45,0.18)'; X.lineWidth = 3; for (let i = 0; i < 5; i++) { X.beginPath(); X.moveTo(60, 150 + i * 80); X.lineTo(800, 150 + i * 80); X.stroke(); }
    X.font = font('serif', 400, 200); const w = X.measureText(word).width, sz = Math.min(kind === 'title' ? 150 : 210, 210 * 740 / w);
    txt(word, 430, 285, font('serif', 400, sz), kind === 'title' ? INK : TERRA);
  }; }
  function cube(t, cx, cy) {
    let i = 0; TILES.forEach((x, j) => { if (t >= x[0]) i = j; });
    const t0 = TILES[i][0], k = i === 0 ? eo(lin(t, t0, t0 + 0.6)) : eio(lin(t, t0, t0 + 0.55));
    const w = 860, h = 540, half = w / 2;
    if (i === 0) { flipPlane(cx, cy, w, h, (1 - k) * Math.PI / 2, tileFace(TILES[0][1], 'title'), null, { key: 'c0', persp: 1800 }); return; }
    const th = k * Math.PI / 2; // old face swings out to the left, new one comes in from the right, like a cube
    const A = [cx - Math.sin(th) * half, th, TILES[i - 1]], B = [cx + Math.cos(th) * half, th - Math.PI / 2, TILES[i]];
    const order = th < Math.PI / 4 ? [B, A] : [A, B];
    order.forEach(([x, a, tl], j) => { if (Math.abs(Math.cos(a)) < 0.03) return; flipPlane(x, cy, w, h, a, tileFace(tl[1], tl[2]), null, { key: 'cube' + (tl === TILES[i] ? 'b' : 'a'), persp: 1800, shade: 0.55 }); });
  }
  function chip(t, t0, text, x, y, size, bg, fg, rot = 0) {
    if (t < t0) return; const k = lin(t, t0, t0 + 0.4);
    X.save(); X.translate(x, y + (1 - eo(k)) * 80); X.rotate(rot); X.globalAlpha = cl(k * 3);
    flipPlane(0, 0, Math.max(240, text.length * size * 0.62 + 80), size * 1.9, (1 - back(k, 1.6)) * -1.2, () => { const ww = Math.max(240, text.length * size * 0.62 + 80);
      X.fillStyle = 'rgba(0,0,0,0.25)'; rr(14, 18, ww - 22, size * 1.6, size * 0.8); X.fill(); X.fillStyle = bg; rr(6, 6, ww - 22, size * 1.6, size * 0.8); X.fill();
      txt(text, (ww - 16) / 2, 6 + size * 0.82, font('inter', 900, size), fg); }, null, { key: 'chip' + text, axis: 'x', persp: 1400, shadow: false });
    X.restore();
  }
  function caption(t, t0, text, y, size = 70, col = CREAM, f = 'caveat') { if (t < t0) return; txt(text, W / 2, y, font(f, 700, size), col, { a: eo(lin(t, t0, t0 + 0.3)) }); }
  // a three-card carousel for venga: come on / let's go / bye
  function carousel(t) {
    const steps = [p(7, 1) - 0.1, s(8), p(9, 1) - 0.1], labels = ["COME ON", "LET'S GO", 'BYE?!'];
    let idx = 0; steps.forEach((x, j) => { if (t >= x) idx = j; }); const k = eio(lin(t, steps[idx], steps[idx] + 0.45));
    const pos = idx === 0 ? 0 : idx - 1 + k, R = 330;
    const items = labels.map((l, j) => [l, (j - pos) * Math.PI * 2 / 3]);
    items.sort((u, v) => Math.cos(u[1]) - Math.cos(v[1]));
    items.forEach(([l, a]) => { const x = W / 2 + Math.sin(a) * R, z = Math.cos(a), sc = 0.8 + 0.4 * (z + 1) / 2;
      if (t < steps[labels.indexOf(l)]) return;
      X.save(); X.globalAlpha = 0.35 + 0.65 * (z + 1) / 2;
      flipPlane(x, 1250, 440 * sc, 170 * sc, -a * 0.9, () => { const ww = 440 * sc, hh = 170 * sc; X.fillStyle = l === 'BYE?!' ? GOLD : CREAM; rr(6, 6, ww - 12, hh - 12, 30 * sc); X.fill(); txt(l, ww / 2, hh / 2 + 4, font('inter', 900, 64 * sc), INK); }, null, { key: 'car' + l, persp: 1600, shadow: false });
      X.restore(); });
  }
  function sentence(t) {
    const parts = [['¡Venga, tío!', 0], ['¡Qué fuerte!', 0.45], ['Vale, guay.', 0.9]];
    parts.forEach(([w, d], i) => { const t0 = s(11) + 0.2 + d; if (t < t0) return; const k = lin(t, t0, t0 + 0.5);
      const y = 1080 + i * 150, x = W / 2;
      X.save(); X.translate(mix(i % 2 ? W + 400 : -400, x, eo(k)), y); X.rotate((1 - eo(k)) * (i % 2 ? 0.4 : -0.4));
      flipPlane(0, 0, 700, 130, (1 - eo(k)) * 1.3 * (i % 2 ? -1 : 1), () => { X.fillStyle = i === 1 ? GOLD : CREAM; rr(8, 8, 684, 114, 57); X.fill(); txt(w, 350, 68, font('serif', 400, 76), i === 1 ? INK : TERRA); }, null, { key: 'sent' + i, persp: 1500, shadow: false });
      X.restore(); });
    const tb = p(11, 1) + 0.2; if (t > tb) stamp(t, tb, 'BASICALLY LOCAL', W / 2, 1600, font('rubik', 900, 96), GOLD, -0.08);
  }

  window.SCENE = {
    frame(t) {
      sky(t);
      X.save(); camera(t, hits, TILES.map((x) => x[0]), 14); HOST.pp(t, L);
      street(t);
      const inEnd = t >= s(12);
      if (!inEnd) {
        const lift = Math.sin(t * 0.9) * 10;
        X.save(); X.translate(0, lift); cube(t, W / 2, 640); X.restore();
      }
      if (t < s(2)) {
        txt('Want to sound like', W / 2, 1060, font('serif', 400, 80), CREAM, { a: eo(lin(t, 0.2, 0.6)) });
        slam(t, p(1, 1), 'A LOCAL', W / 2, 1190, font('serif', 400, 160), GOLD, { from: 1.4 });
        caption(t, p(1, 2), 'in Spain', 1340, 90, CREAM);
      } else if (t < s(4)) {
        chip(t, p(2, 1), 'OKAY', 230, 1080, 80, CREAM, INK, -0.05); chip(t, p(2, 2), 'SURE', 540, 1140, 80, GOLD, INK, 0.04); chip(t, p(2, 3), 'DEAL', 850, 1080, 80, CREAM, INK, -0.03);
        if (t >= s(3)) { const n = Math.min(50, Math.max(1, Math.round(1 + 49 * eo(lin(t, p(3, 1), p(3, 1) + 1.2)))));
          caption(t, s(3), 'vales today:', 1290, 96); txt(String(n), W / 2, 1460, font('rubik', 900, 230), GOLD, { stroke: INK, sw: 10 });
          for (let i = 0; i < n; i++) { const a = hash(i) * 6.283, r = 380 + hash(i + 2) * 120; if (i > 20) continue; X.save(); X.globalAlpha = 0.7; txt('vale', W / 2 + Math.cos(a) * r, 1400 + Math.sin(a) * r * 0.5, font('caveat', 700, 44), CREAM); X.restore(); } }
      } else if (t < s(6)) {
        if (t >= p(4, 2)) caption(t, p(4, 2), 'literally:', 1000, 96);
        const real = t >= s(5) + 0.4;
        [['UNCLE', 300, p(4, 3)], ['AUNT', 780, p(4, 4)]].forEach(([w, x, t0]) => { if (t < t0) return; const k = lin(t, t0, t0 + 0.4), fl = lin(t, s(5) + 0.4, s(5) + 0.9);
          X.save(); X.translate(x, 1190); X.rotate((x < W / 2 ? -1 : 1) * 0.05);
          flipPlane(0, 0, 360, 220, (1 - back(k, 1.5)) * 1.4 + fl * Math.PI, () => { X.fillStyle = CREAM; rr(8, 8, 344, 204, 20); X.fill(); X.strokeStyle = GOLD; X.lineWidth = 8; X.stroke(); txt(w, 180, 112, font('serif', 400, 76), INK); },
            () => { X.fillStyle = GOLD; rr(8, 8, 344, 204, 20); X.fill(); txt('MATE', 180, 112, font('inter', 900, 84), INK); }, { key: 'fam' + w, persp: 1500, shadow: false });
          X.restore(); });
        if (t >= s(5)) caption(t, s(5), 'but really?', 1390, 96, GOLD);
        if (real) slam(t, p(5, 2) || s(5) + 0.9, 'MATE.', W / 2, 1530, font('inter', 900, 150), CREAM, { from: 1.6, rot: -0.1 });
      } else if (t < s(7)) {
        chip(t, p(6, 1), 'COOL', W / 2, 1060, 90, GOLD, INK, 0.06);
        if (t >= p(6, 2)) { caption(t, p(6, 2), 'say it like…', 1250, 96); slam(t, p(6, 3) || p(6, 2) + 0.7, 'g-WHY', W / 2, 1400, font('rubik', 900, 170), CREAM, { from: 1.5, stroke: INK, sw: 10 }); }
      } else if (t < s(10)) {
        carousel(t);
        if (t >= p(9, 1)) caption(t, p(9, 1) + 0.1, '(somehow, all of them)', 1500, 84, CREAM);
      } else if (t < s(11)) {
        if (t >= p(10, 1)) { const sh = Math.sin(t * 60) * 8 * (1 - lin(t, p(10, 1), p(10, 1) + 0.5)); X.save(); X.translate(sh, 0); chip(t, p(10, 1), 'NO WAY', 300, 1110, 90, CREAM, INK, -0.07); X.restore(); }
        chip(t, p(10, 2), "THAT'S CRAZY", 640, 1330, 80, GOLD, INK, 0.05);
      } else if (t < s(12)) {
        sentence(t);
      } else {
        const k = eo(lin(t, s(12), s(12) + 0.5));
        X.fillStyle = `rgba(14,10,20,${0.55 * k})`; X.fillRect(0, 0, W, H);
        coinIn(t, s(12) + 0.05, W / 2, 760, 160, { glow: 'rgba(242,196,107,0.6)' });
        slam(t, s(12) + 0.1, 'Borderless', W / 2, 1060, font('inter', 900, 140), CREAM, {});
        caption(t, p(12, 1), 'The Spanish people', 1190, 66, GOLD, 'serif');
        caption(t, p(12, 3) || p(12, 1) + 0.6, 'actually speak.', 1270, 66, GOLD, 'serif');
        if (t > END) txt('€9,99 per course · borderlesslearn.com', W / 2, 1380, font('inter', 700, 38), CREAM, { a: eo(lin(t, END, END + 0.4)) });
      }
      X.restore();
      HOST.peeks(t, PEEKS);
      grainV(t);
    },
  };
})();
