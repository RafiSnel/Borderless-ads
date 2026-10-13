// 13 · "Sound like a local (Spain)" — Kinetic Type Reel. Five words; a strip of five slots fills as we go.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('13k');
  const s = (n) => L[n].start, e = (n) => L[n].end, ph = (n, i) => L[n].phrases[i] ?? L[n].start;
  const tEnd = s(12) - 0.05, DUR = e(12) + 1.6; window.DURATION = DUR;
  const { K, OR, BL, CR, WH, GR } = KN;
  const W1 = ph(2, 0) - 0.08, W50 = ph(3, 0) - 0.08, W2 = ph(4, 0) - 0.08, W3 = ph(6, 0) - 0.08, W4 = ph(7, 0) - 0.08, W5 = ph(10, 0) - 0.08, WS = ph(11, 0) - 0.08;
  const WORDS = [['VALE', OR], ['TÍO', BL], ['GUAY', CR], ['VENGA', OR], ['QUÉ FUERTE', K]];
  const filled = (t) => [W1, W2, W3, W4, W5].filter((x) => t >= x + 0.2).length;
  const cues = [['whoosh', 0.05, 0.4]]; for (let i = 0; i < 5; i++) cues.push(['pop', ph(1, 3) + i * 0.1, 0.35]);
  [W1, W2, W3, W4, W5].forEach((x) => cues.push(['whoosh', x - 0.05, 0.6], ['hit', x + 0.08, 0.4], ['ding', x + 0.25, 0.2]));
  [ph(2, 2), ph(2, 3), ph(2, 4)].forEach((x) => cues.push(['pop', x, 0.5])); for (let i = 0; i < 16; i++) cues.push(['tick', W50 + 0.1 + i * 0.07, 0.3]);
  cues.push(['pop', ph(4, 1), 0.5], ['pop', ph(4, 3), 0.4], ['pop', ph(4, 4), 0.4], ['scratch', ph(5, 1), 0.3], ['stamp', ph(5, 2), 0.8], ['pop', ph(6, 1), 0.5], ['boing', ph(6, 3), 0.5],
    ['flap', ph(7, 1), 0.3], ['flap', s(8), 0.3], ['flap', ph(9, 1), 0.3], ['glitch', W5 + 0.1, 0.3], ['pop', ph(10, 1), 0.5], ['pop', ph(10, 2), 0.5], ['whoosh', WS, 0.6]);
  for (let i = 0; i < 5; i++) cues.push(['pop', WS + 0.2 + i * 0.15, 0.4]); cues.push(['stamp', ph(11, 1), 0.8], ['coin', tEnd + 0.3, 0.5]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const SEC = [[0, '00 · SPAIN'], [W1, '01 · VALE'], [W2, '02 · TÍO'], [W3, '03 · GUAY'], [W4, '04 · VENGA'], [W5, '05 · QUÉ FUERTE'], [WS, '— · ALL FIVE'], [tEnd, 'BORDERLESS']];
  // the strip of five slots (top), fills as we go
  function strip(t, dark) {
    const n = filled(t), a = Math.min(1, (t - ph(1, 3)) * 4); if (a <= 0) return;
    for (let i = 0; i < 5; i++) { const x = 140 + i * 200, y = 170; const on = i < n; const t0 = ph(1, 3) + i * 0.1; const q = ksp(t, t0, 0.4);
      X.save(); X.globalAlpha = a; X.translate(x, y); X.scale(q, q);
      if (on) { X.fillStyle = WORDS[i][1] === K ? (dark ? '#2a2624' : K) : WORDS[i][1]; rr(-88, -34, 176, 68, 12); X.fill(); X.strokeStyle = dark ? 'rgba(11,10,10,0.6)' : 'rgba(255,255,255,0.6)'; X.lineWidth = 3; X.stroke(); X.font = KF(900, 26); X.fillStyle = kink(WORDS[i][1] === K ? K : WORDS[i][1]); X.textAlign = 'center'; X.textBaseline = 'middle'; const w = WORDS[i][0]; X.fillText(w.length > 6 ? 'QUÉ F.' : w, 0, 2); }
      else { X.strokeStyle = dark ? 'rgba(11,10,10,0.4)' : 'rgba(255,255,255,0.35)'; X.lineWidth = 3; X.setLineDash([10, 8]); rr(-88, -34, 176, 68, 12); X.stroke(); X.setLineDash([]); X.font = KM(24); X.fillStyle = dark ? 'rgba(11,10,10,0.5)' : 'rgba(255,255,255,0.5)'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(String(i + 1), 0, 2); }
      X.restore(); }
  }
  function meanings(t, list, y0, ink, opts = {}) { list.forEach(([w, t0], i) => { if (t < t0) return; const q = ksp(t, t0, 0.45); X.save(); X.translate(540 + (1 - q) * (i % 2 ? 600 : -600), y0 + i * (opts.gap ?? 150)); kword(w, 0, 0, KF(900, opts.size ?? 110), ink, null, { max: 960 }); X.restore(); }); }
  function intro(t) {
    kcard(K); kwall(t, ['VALE', 'TÍO', 'GUAY', 'VENGA', 'QUÉ FUERTE'], { size: 120, col: 'rgba(255,255,255,0.05)' });
    kin(t, 0.14, 'SOUND LIKE YOU', 540, 700, KF(900, 100), WH, 'rise', { max: 980 }); kin(t, ph(1, 1), 'ACTUALLY LIVE', 540, 830, KF(900, 100), WH, 'rise', { max: 980 });
    kin(t, ph(1, 2), 'IN SPAIN.', 540, 990, KF(900, 170), OR, 'snap', { max: 980 });
    if (t > ph(1, 3)) kin(t, ph(1, 3), 'FIVE WORDS.', 540, 1320, KF(900, 120), CR, 'rise');
  }
  function vale(t) {
    kcard(OR); kwall(t, 'VALE', { size: 160, col: 'rgba(11,10,10,0.07)', speed: 300 });
    kin(t, W1 + 0.08, 'VALE.', 540, 620, KF(900, 300), K, 'snap'); kcap('/ BA·LE /', 540, 790, K, Math.min(1, (t - W1 - 0.3) * 4), 32);
    meanings(t, [['OKAY.', ph(2, 2)], ['SURE.', ph(2, 3)], ['DEAL.', ph(2, 4)]], 1000, WH);
  }
  function fifty(t) {
    kcard(K); const k = lin(t, W50 + 0.1, W50 + 1.2); const n = Math.max(1, Math.floor(eo(k) * 50)); const cols = 5, cw = 190, chh = 100;
    for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); const q = ksp(t, W50 + 0.1 + i * 0.022, 0.35); X.save(); X.translate(160 + c * 190, 560 + r * 118); X.scale(q, q); X.fillStyle = i % 9 === 0 ? CR : OR; rr(-cw / 2 + 6, -chh / 2, cw - 12, chh, 14); X.fill(); X.font = KF(900, 44); X.fillStyle = K; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('VALE', 0, 3); X.restore(); }
    X.fillStyle = 'rgba(11,10,10,0.85)'; X.fillRect(0, 280, W, 230); kword(n + '×', 540, 380, KF(900, 180), WH, null, {}); kcap('A DAY. MINIMUM.', 540, 480, OR, 1, 28);
  }
  function tio(t) {
    kcard(BL); const really = t >= ph(5, 0);
    kin(t, W2 + 0.08, 'TÍO.', 300, 640, KF(900, 230), WH, 'drop'); if (t > ph(4, 1)) kin(t, ph(4, 1), 'TÍA.', 780, 640, KF(900, 230), CR, 'drop');
    if (t > ph(4, 2)) kin(t, ph(4, 2), 'LITERALLY:', 540, 900, KF(900, 70), WH, 'rise');
    if (t > ph(4, 3)) { kin(t, ph(4, 3), 'UNCLE.', 300, 1040, KF(900, 96), WH, 'rise'); }
    if (t > ph(4, 4)) { kin(t, ph(4, 4), 'AUNT.', 780, 1040, KF(900, 96), CR, 'rise'); }
    if (really) { const k = eo(lin(t, ph(5, 0), ph(5, 0) + 0.25)); X.strokeStyle = OR; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(140, 1045); X.lineTo(140 + 800 * k, 1045); X.stroke();
      kin(t, ph(5, 1), 'BUT REALLY?', 540, 1260, KF(900, 90), WH, 'rise');
      if (t > ph(5, 2)) { const q = ksp(t, ph(5, 2), 0.35, 0.3, 18); X.save(); X.translate(540, 1500); X.rotate(-0.06); X.scale(mix(3, 1, q), mix(3, 1, q)); X.fillStyle = OR; rr(-330, -130, 660, 260, 26); X.fill(); kword('MATE.', 0, 6, KF(900, 210), K, null, {}); X.restore(); } }
  }
  function guay(t) {
    kcard(CR); kwall(t, 'GUAY', { size: 160, col: 'rgba(11,10,10,0.06)', speed: 260 });
    if (t < ph(6, 3)) { kin(t, W3 + 0.08, 'GUAY.', 540, 640, KF(900, 300), K, 'stretch'); if (t > ph(6, 1)) kin(t, ph(6, 1), 'COOL.', 540, 960, KF(900, 160), OR, 'snap'); if (t > ph(6, 2)) kin(t, ph(6, 2), 'SAY IT LIKE…', 540, 1260, KF(900, 90), K, 'rise'); }
    else { // GU|AY splits into G - WHY
      const k = ksp(t, ph(6, 3), 0.5); kword('G', 540 - mix(60, 330, Math.min(1, k)), 760, KF(900, 260), K, null, {});
      X.save(); X.translate(540 + mix(60, 130, Math.min(1, k)), 760); X.scale(mix(0.5, 1, Math.min(1, k)), mix(0.5, 1, Math.min(1, k))); kword('WHY?', 0, 0, KF(900, 260), OR, null, { max: 640 }); X.restore();
      kcap('G · WHY', 540, 1000, K, 1, 40); kin(t, ph(6, 3) + 0.15, 'COOL.', 540, 1260, KF(900, 160), K, 'rise'); }
  }
  function venga(t) {
    kcard(OR); kwall(t, 'VENGA', { size: 160, col: 'rgba(11,10,10,0.07)', speed: 320 });
    const b = Math.abs(Math.sin((t - W4) * 7)) * 40 * Math.exp(-(t - W4) * 0.6);
    X.save(); X.translate(0, -b); kin(t, W4 + 0.08, 'VENGA.', 540, 620, KF(900, 260), K, 'drop'); X.restore();
    // the meaning flips in place, flap style
    const M = [[ph(7, 1), 'COME ON.'], [s(8), "LET'S GO."], [ph(9, 1), '…ALSO BYE.']]; let i = -1; M.forEach(([x], j) => { if (t >= x) i = j; });
    if (i >= 0) { const q = cl((t - M[i][0]) / 0.18); X.save(); X.translate(540, 1000); X.scale(1, Math.max(0.02, Math.sin(q * Math.PI / 2))); X.fillStyle = K; rr(-440, -110, 880, 220, 20); X.fill(); kword(M[i][1], 0, 4, KF(900, 120), i === 2 ? OR : WH, null, { max: 820 }); X.restore();
      kcap(['1 OF 3', '2 OF 3', '3 OF 3'][i], 540, 1170, K, 0.8, 28); }
    if (t > ph(9, 0) && t < ph(9, 1)) kin(t, ph(9, 0), 'AND SOMEHOW…', 540, 1320, KF(900, 80), K, 'rise');
  }
  function fuerte(t) {
    kcard(K); const p = t - W5; const sh = Math.max(0, 1 - p / 0.5);
    kword('QUÉ', 540 + Math.sin(p * 80) * 22 * sh, 560, KF(900, 230), WH, (j) => ({ rot: Math.sin(p * 50 + j) * 0.12 * sh }), {});
    X.save(); X.translate(540, 780); const q = ksp(t, W5 + 0.25, 0.4); X.scale(mix(2.5, 1, q), mix(2.5, 1, q)); kword('FUERTE.', 0, 0, KF(900, 230), OR, null, { max: 980 }); X.restore();
    meanings(t, [['NO WAY.', ph(10, 1)], ["THAT'S CRAZY.", ph(10, 2)]], 1120, CR, { size: 120 });
  }
  function sentence(t) {
    kcard(K);
    const words = [['Vale', OR], ['tío,', BL], ['qué fuerte…', WH], ['¡venga,', OR], ['guay!', CR]];
    const pos = [[300, 640], [760, 640], [540, 830], [300, 1020], [800, 1020]];
    words.forEach(([w, c], i) => { const t0 = WS + 0.2 + i * 0.15; const q = ksp(t, t0, 0.5); if (t < t0) return; const from = [140 + i * 200, 170];
      const x = mix(from[0], pos[i][0], Math.min(1, q)), y = mix(from[1], pos[i][1], Math.min(1, q)); X.save(); X.translate(x, y); const sc = mix(0.3, 1, Math.min(1, q)); X.scale(sc, sc);
      X.font = KF(900, 104); const tw = X.measureText(w).width; X.fillStyle = c === WH ? '#2a2624' : c; rr(-tw / 2 - 26, -72, tw + 52, 144, 20); X.fill(); kword(w, 0, 4, KF(900, 104), kink(c === WH ? K : c), null, {}); X.restore(); });
    kin(t, WS + 0.05, 'ALL FIVE. ONE SENTENCE.', 540, 400, KF(900, 76), WH, 'rise', { max: 980 });
    if (t > ph(11, 1)) { kin(t, ph(11, 1), "YOU'RE BASICALLY", 540, 1300, KF(900, 90), WH, 'rise'); stamp5(t, ph(11, 1) + 0.35, 'LOCAL ✓', 540, 1500, 130, OR, -0.08, 'rgba(11,10,10,0.9)'); }
  }
  window.SCENE = {
    frame(t) {
      X.save();
      const seq = [[0, intro], [W1, vale], [W50, fifty], [W2, tio], [W3, guay], [W4, venga], [W5, fuerte], [WS, sentence], [tEnd, null]];
      let i = 0; for (let j = 0; j < seq.length; j++) if (t >= seq[j][0]) i = j; const [t0, fn] = seq[i]; const prev = i ? seq[i - 1][1] : null;
      const tr = [kTiles, kStripes, kTiles, kStripes, kTiles, kStripes, kTiles][(i - 1) % 7];
      if (!fn) kend(t, tEnd, 'The Spanish people actually speak.');
      else if (prev && t < t0 + 0.32) { const k = (t - t0) / 0.32; if (tr === kTiles) kTiles(k, () => prev(t0 - 0.01), () => fn(t), { ox: 540, oy: 700 }); else kStripes(k, () => prev(t0 - 0.01), () => fn(t)); }
      else fn(t);
      const light = fn === vale || fn === guay || fn === venga || (fn === tio && false);
      if (fn && t > ph(1, 3)) strip(t, light);
      kflash(t, [W1, W50, W2, W3, W4, W5, WS, tEnd]);
      khud(t, SEC, { title: 'BORDERLESS — SPANISH, ACTUALLY', right: 'ES · SPAIN', dur: DUR, col: light ? 'rgba(11,10,10,0.55)' : 'rgba(255,255,255,0.55)' });
      X.restore();
      grain(t, 0.035);
    },
  };
})();
