// 14 · "Tongue twisters, attempted" — Kinetic Type Reel karaoke. Words light up as he says them; the type strains, then breaks.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('14k');
  const s = (n) => L[n].start, e = (n) => L[n].end, ph = (n, i) => L[n].phrases[i] ?? L[n].start;
  const tEnd = e(16) + 0.15, DUR = tEnd + 2.6; window.DURATION = DUR;
  const { K, OR, BL, CR, WH, GR, LIME } = KN;
  const R = [['SPANISH', 'Tres tristes tigres tragaban trigo en un trigal.', 'PASS', 0.85], ['GERMAN', 'Fischers Fritz fischt frische Fische.', 'PASS', 0.72],
    ['FRENCH', "Les chaussettes de l'archi… l'archidu… duchesse… sont-elles… sèches? Archi… sèches? Non.", '…WHAT', 0.3], ['JAPANESE', 'Namamugi… nama… gome… nama-tama-gomago? Namago. No.', 'FAIL', 0.2],
    ['ITALIAN', 'Trentatré trentini entrarono a Trento.', 'NOT BAD', 0.6], ['DUTCH', 'De krat… kat… krapt de krullen… van de… trap? De trap krabt de kat!', '???', 0.1],
    ['ENGLISH', 'She sells seashells by the seashore. She shells… sea sells… by the she… sea… sure. Sea shore. Sorry.', 'ERROR', 0.0]];
  const CARD = [CR, BL, OR, K, CR, BL, OR];
  const rounds = R.map((r, i) => { const n0 = s(2 + i * 2), a0 = s(3 + i * 2), a1 = e(3 + i * 2); const words = r[1].split(' ');
    const tot = words.reduce((a, w) => a + w.length + 1, 0); let acc = 0; const wt = words.map((w) => { const t = a0 + (a1 - a0) * (acc / tot); acc += w.length + 1; return t; });
    return { lang: r[0], words, wt, verdict: r[2], score: r[3], n0, a0, a1, v: a1 + 0.08, card: CARD[i], good: r[2] === 'PASS' || r[2] === 'NOT BAD' }; });
  const tOut = s(16) - 0.1;
  const cues = [['whoosh', 0.1, 0.4], ['hit', ph(1, 1), 0.4], ['hit', ph(1, 2), 0.4], ['boom', ph(1, 3), 0.4]];
  rounds.forEach((r, i) => { cues.push(['whoosh', r.n0 - 0.06, 0.6], ['hit', r.n0 + 0.02, 0.4]); r.wt.forEach((x, j) => { if (j % 2 === 0) cues.push(['tick', x, 0.18]); });
    if (r.good) cues.push(['correct', r.v, 0.5], ['ding', r.v + 0.1, 0.3]); else if (r.verdict === 'FAIL') cues.push(['buzz', r.v, 0.6], ['fail', r.v + 0.05, 0.4]); else if (r.verdict === '…WHAT') cues.push(['glitch', r.v, 0.6], ['wahwah', r.v + 0.1, 0.3]); else if (r.verdict === '???') cues.push(['boing', r.v, 0.6], ['boing', r.v + 0.35, 0.4]); else cues.push(['glitch', r.v, 0.8], ['buzz', r.v + 0.1, 0.5]); });
  cues.push(['whoosh', tOut, 0.6]); for (let i = 0; i < 7; i++) cues.push(['pop', tOut + 0.2 + i * 0.1, 0.35]); cues.push(['impact', ph(16, 1), 0.5], ['coin', tEnd + 0.3, 0.5]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const SEC = [[0, '00 · THE RULES'], ...rounds.map((r, i) => [r.n0, `0${i + 1} · ${r.lang}`]), [tOut, '— · RESULTS'], [tEnd, 'BORDERLESS']];
  const totalScore = (t) => rounds.reduce((a, r) => a + (t >= r.v ? r.score * 10 : 0), 0);

  function intro(t) {
    const steps = [[0.12, '7', 'TONGUE TWISTERS.', K, WH], [ph(1, 1), '7', 'LANGUAGES.', OR, K], [ph(1, 2), '1', 'BRITISH GUY.', CR, K], [ph(1, 3), '', "LET'S GO.", BL, WH]];
    let i = 0; steps.forEach((st, j) => { if (t >= st[0] - 0.05) i = j; }); const [t0, n, w, bg, ink] = steps[i];
    kcard(bg); kwall(t, ['TRES TRISTES TIGRES', 'FISCHERS FRITZ', 'NAMAMUGI', 'SHE SELLS SEASHELLS'], { size: 110, col: ink === WH ? 'rgba(255,255,255,0.06)' : 'rgba(11,10,10,0.06)' });
    if (n) { X.save(); X.translate(540, 760); const q = ksp(t, t0, 0.5, 0.3, 14); X.scale(mix(3, 1, q), mix(3, 1, q)); extrude(n, 0, 0, KF(900, 520), ink, ink === WH ? '#2a2624' : 'rgba(11,10,10,0.25)', 30, { shadow: false }); X.restore(); }
    kin(t, t0 + 0.05, w, 540, n ? 1240 : 960, KF(900, n ? 120 : 220), ink, n ? 'rise' : 'snap', { max: 980 });
  }
  function label(t, r, i) {
    kcard(r.card); const ink = kink(r.card); kwall(t, r.lang, { size: 150, col: ink === WH ? 'rgba(255,255,255,0.07)' : 'rgba(11,10,10,0.07)', speed: 320 });
    kin(t, r.n0, r.lang + '.', 540, 900, KF(900, 190), ink, ['snap', 'stretch', 'drop', 'spin', 'snap', 'stretch', 'drop'][i], { max: 980 });
    kcap('ROUND ' + (i + 1) + ' / 7', 540, 1100, ink, 0.75, 32);
  }
  // karaoke layout
  function layout(words, size) { X.font = KF(900, size); const lines = [[]]; let lw = 0; const maxW = 940; words.forEach((w, i) => { const ww = X.measureText(w + ' ').width; if (lw + ww > maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push([w, i, lw]); lw += ww; }); return lines; }
  const LAY = rounds.map((r) => { let size = r.words.length > 10 ? 104 : 140; X.font = KF(900, size); const mw = Math.max(...r.words.map((w) => X.measureText(w).width)); if (mw > 900) size = Math.floor(size * 900 / mw); return { size, lines: layout(r.words, size) }; });
  function attempt(t, r, i) {
    kcard(K); const { size, lines } = LAY[i]; const lh = size * 1.18;
    let cur = 0; r.wt.forEach((x, j) => { if (t >= x) cur = j; }); const done = t >= r.v;
    let curLine = 0; lines.forEach((ln, li) => ln.forEach(([, idx]) => { if (idx === cur) curLine = li; }));
    const scroll = Math.max(0, curLine - 3) * lh; const sm = scroll; // jump-free enough: lines are slow
    const strain = r.good ? 0.25 : 1; const g = !r.good && done ? eo(lin(t, r.v, r.v + 0.6)) : 0;
    lines.forEach((ln, li) => { const y = 640 + li * lh - sm; if (y < 330 || y > 1500) return;
      ln.forEach(([w, idx, x0]) => { const said = t >= r.wt[idx], now = idx === cur && !done; const age = t - r.wt[idx];
        X.save(); X.font = KF(900, size); X.textBaseline = 'middle'; X.textAlign = 'left';
        let dx = 70 + x0, dy = y;
        if (said) { const wob = strain * Math.max(0, 1 - age * 1.5) * 10; dy += Math.sin(t * 40 + idx) * wob; }
        if (g > 0) { dy += g * g * (300 + hash(idx) * 900); dx += (hash(idx * 3) - 0.5) * 300 * g; X.translate(dx, dy); X.rotate((hash(idx * 7) - 0.5) * 2 * g); dx = 0; dy = 0; }
        X.fillStyle = now ? OR : said ? WH : 'rgba(255,255,255,0.18)';
        if (now) { const q = ksp(t, r.wt[idx], 0.3); X.translate(dx, dy); X.scale(mix(1.25, 1, Math.min(1, q)), mix(1.25, 1, Math.min(1, q))); dx = 0; dy = 0; }
        X.fillText(w, dx, dy); X.restore(); }); });
    // the strain meter (bottom) settles on the score
    const u = lin(t, r.a0, r.a1), during = mix(0.5, mix(0.5, r.score, 0.7), eio(u)) + 0.03 * Math.sin(t * 11) * (done ? 0 : 1);
    let val = during; if (done) { const d = t - r.v, vv = mix(0.5, r.score, 0.7); val = r.score + (vv - r.score) * Math.exp(-d * 5) * Math.cos(d * 14); }
    const mx = 90, mw = 900, my = 1560; X.fillStyle = '#1f1c1a'; rr(mx, my, mw, 40, 20); X.fill(); X.fillStyle = val > 0.55 ? CR : val > 0.35 ? BL : OR; rr(mx, my, mw * cl(val), 40, 20); X.fill();
    X.font = KM(24); X.fillStyle = GR; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('TONGUE STATUS', mx, my - 30); X.textAlign = 'right'; X.fillText((Math.max(0, val) * 10).toFixed(1) + ' / 10', mx + mw, my - 30);
    kcap(r.lang + ' · ROUND ' + (i + 1) + ' / 7', 540, 420, GR, 1, 28);
    if (done) { const c = r.good ? (r.verdict === 'PASS' ? LIME : CR) : OR; stamp5(t, r.v, r.verdict, 540, 1350, 120, c, -0.08, 'rgba(11,10,10,0.9)'); }
  }
  function results(t) {
    kcard(K);
    const order = rounds.map((r, i) => [r, i]).sort((a, b) => b[0].score - a[0].score);
    order.forEach(([r, i], k) => { const t0 = tOut + 0.2 + k * 0.1, q = ksp(t, t0, 0.45); if (t < t0) return; const y = 560 + k * 140, wv = 820 * Math.max(0.03, r.score) * Math.min(1, q);
      X.fillStyle = r.lang === 'ENGLISH' ? OR : r.good ? CR : '#2a2624'; rr(130, y - 50, Math.max(60, wv), 100, 14); X.fill();
      X.font = KF(900, 52); X.fillStyle = r.lang === 'ENGLISH' ? WH : r.good ? K : WH; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(r.lang, 160, y + 2);
      X.font = KM(30); X.fillStyle = GR; X.textAlign = 'right'; X.fillText((r.score * 10).toFixed(1), 1000, y); });
    kin(t, tOut + 0.05, '7 LANGUAGES.', 540, 360, KF(900, 110), WH, 'rise');
    if (t > ph(16, 1)) { X.fillStyle = OR; X.fillRect(0, 1560, W, 170); kin(t, ph(16, 1), 'MY OWN WAS THE WORST.', 540, 1645, KF(900, 80), K, 'snap', { max: 980 }); }
  }
  window.SCENE = {
    frame(t) {
      X.save();
      let ri = -1; rounds.forEach((r, i) => { if (t >= r.n0 - 0.06) ri = i; });
      if (t >= tEnd) kend(t, tEnd, 'One course, built around you.');
      else if (t >= tOut) { if (t < tOut + 0.32) kTiles((t - tOut) / 0.32, () => attempt(tOut - 0.01, rounds[6], 6), () => results(t), { ox: 540, oy: 900 }); else results(t); }
      else if (ri < 0) intro(t);
      else { const r = rounds[ri];
        if (t < r.a0 - 0.05) { if (t < r.n0 + 0.28) kStripes((t - r.n0 + 0.06) / 0.34, () => (ri ? attempt(r.n0 - 0.07, rounds[ri - 1], ri - 1) : intro(r.n0 - 0.07)), () => label(t, r, ri)); else label(t, r, ri); }
        else if (t < r.a0 + 0.2) kTiles((t - r.a0 + 0.05) / 0.25, () => label(r.a0 - 0.06, r, ri), () => attempt(t, r, ri), { ox: 540, oy: 900, size: 180 });
        else attempt(t, r, ri); }
      const onCard = ri >= 0 && t < (rounds[ri] || {}).a0 && [CR, OR].includes(rounds[ri].card) && t < tOut;
      const introLight = ri < 0 && t >= ph(1, 1) - 0.05 && t < ph(1, 3) - 0.05;
      khud(t, SEC, { title: 'BORDERLESS — TONGUE TWISTERS', right: 'SCORE ' + totalScore(t).toFixed(1), dur: DUR, col: onCard || introLight ? 'rgba(11,10,10,0.55)' : 'rgba(255,255,255,0.55)' });
      X.restore();
      grain(t, 0.035);
    },
  };
})();
