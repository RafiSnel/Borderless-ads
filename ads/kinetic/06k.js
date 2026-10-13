// 06 · "74 departures" — Kinetic Type Reel. A departures board that becomes your course.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const LANGS = await (await fetch('v/06k/langs.json')).json();
  const L = await loadTimeline('06k');
  const s = (n) => L[n].start, e = (n) => L[n].end, ph = (n, i) => L[n].phrases[i] ?? L[n].start;
  const END = e(9) + 0.25, DUR = END + 2.2; window.DURATION = DUR;
  const { K, OR, BL, CR, WH, GR } = KN;
  const LS = [['日本語', 'JA · NIHONGO', OR, 'drop'], ['한국어', 'KO · HANGUGEO', K, 'snap'], ['Kiswahili', 'SW', CR, 'stretch'], ['Ελληνικά', 'EL · ELLINIKÁ', BL, 'spin'], ['हिन्दी', 'HI · HINDĪ', OR, 'snap'], ['Nederlands', 'NL', CR, 'rise']];
  const tL = [0, 1, 2, 3, 4, 5].map((i) => ph(2, i));
  const tBoard = s(3) - 0.1, tPick = ph(4, 0), tWhy = ph(4, 1), tLvl = s(5) - 0.15, tLes = s(6) - 0.1, tAir = s(7) - 0.15, tDiff = ph(7, 4), tNob = s(8) - 0.1, tEnd = s(9);
  // ---------- sound ----------
  const cues = [['flap', 0.1, 0.5]];
  tL.forEach((x) => cues.push(['whoosh', x - 0.06, 0.45], ['hit', x, 0.35]));
  cues.push(['flaplong', tBoard + 0.1, 0.5], ['boom', tBoard, 0.4], ['impact', ph(3, 1), 0.4], ['click', tPick, 0.6], ['whoosh', tWhy - 0.25, 0.7], ['pop', tWhy + 0.15, 0.5], ['pop', tWhy + 0.3, 0.5], ['pop', tWhy + 0.45, 0.5],
    ['whoosh', tLvl, 0.6]); for (let i = 0; i < 3; i++) cues.push(['tick', ph(5, 1) - 0.4 + i * 0.13, 0.6]); cues.push(['ding', ph(5, 1), 0.4]);
  for (let i = 0; i < 8; i++) cues.push(['page', tLes + 0.1 + i * 0.23, 0.35]);
  cues.push(['whoosh', tAir, 0.6], ['plane', tAir + 0.3, 0.5], ['impact', tDiff, 0.5], ['whoosh', tNob, 0.6], ['riser', tEnd, 0.35], ['coin', tEnd + 0.3, 0.5]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const SEC = [[0, '01 · DEPARTURES'], [tBoard, '02 · 74 LANGUAGES'], [tPick, '03 · YOUR REASON'], [tLvl, '04 · YOUR LEVEL'], [tLes, '05 · 50 LESSONS'], [tAir, '06 · YOUR FLIGHT'], [tEnd, '07 · BORDERLESS']];

  // ---------- scenes ----------
  function intro(t) {
    kcard(K); kwall(t, 'DEPARTURES', { size: 120, col: 'rgba(255,255,255,0.05)', speed: 200 });
    // split-flap style letters: each letter flips into place
    kin(t, 0.08, 'WHERE ARE YOU', 540, 860, KF(900, 96), WH, 'flip', { stagger: 0.03, max: 980 });
    kin(t, 0.45, 'FLYING?', 540, 1000, KF(900, 210), OR, 'flip', { stagger: 0.045, max: 980 });
    kcap('GATE 01 — BOARDING', 540, 1150, GR, Math.min(1, (t - 0.6) * 4));
  }
  function langCard(t) {
    let i = 0; for (let j = 0; j < 6; j++) if (t >= tL[j] - 0.06) i = j; const [w, lab, bg, mode] = LS[i]; const ink = kink(bg);
    kcard(bg); kwall(t, w, { size: 130, col: ink === WH ? 'rgba(255,255,255,0.07)' : 'rgba(11,10,10,0.07)', speed: 300 });
    kin(t, tL[i], w, 540, 940, KF(900, 230), ink, mode, { max: 960 });
    kcap(lab, 540, 1150, ink, Math.min(1, (t - tL[i] - 0.1) * 6) * 0.75, 30);
  }
  // the board: rows of flap tiles
  const ROWS = 11;
  function boardRow(t, r, y, hi = 0, t0 = tBoard) {
    const idx = (r * 5 + 3) % LANGS.length; const [name] = LANGS[idx]; const code = name.slice(0, 3);
    const flipK = cl((t - t0 - r * 0.035) / 0.25);
    X.save(); X.translate(0, y); X.scale(1, Math.max(0.02, Math.abs(Math.sin(flipK * Math.PI / 2))));
    X.fillStyle = hi ? OR : '#1a1716'; rr(60, -46, 960, 92, 10); X.fill();
    X.fillStyle = 'rgba(0,0,0,0.35)'; X.fillRect(60, -1, 960, 2);
    const ink = hi ? K : WH;
    X.font = KM(30); X.fillStyle = hi ? K : '#f0c04e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(String(9 + (r * 7) % 14).padStart(2, '0') + ':' + String((r * 17) % 60).padStart(2, '0'), 90, 2);
    X.font = KF(800, 40); X.fillStyle = ink; X.fillText(name, 230, 2);
    X.font = KM(28); X.fillStyle = hi ? K : GR; X.textAlign = 'right'; X.fillText('G' + (r + 3) + '   ' + (hi ? 'BOARDING' : 'ON TIME'), 990, 2);
    X.restore();
  }
  function board(t, hiRow = -1, t0 = tBoard) {
    kcard(K);
    const n = Math.min(74, Math.max(1, Math.floor(eo(lin(t, t0, t0 + 1.4)) * 74)));
    kword(String(n), 540, 300, KF(900, 230), WH, null, {}); kcap('LANGUAGES', 540, 430, OR, 1, 30);
    for (let r = 0; r < ROWS; r++) boardRow(t, r, 560 + r * 100, r === hiRow ? 1 : 0, t0);
    if (t > ph(3, 1)) { X.fillStyle = 'rgba(11,10,10,0.82)'; X.fillRect(0, 1620, W, 150); kin(t, ph(3, 1), 'ON ONE BOARD.', 540, 1695, KF(900, 96), WH, 'rise', { max: 980 }); }
  }
  function why(t) {
    kcard(OR); kwall(t, ['WORK', 'LOVE', 'MOVE', 'EXAM', 'FAMILY'], { size: 120, col: 'rgba(11,10,10,0.07)', speed: 240 });
    kin(t, tWhy - 0.05, 'TELL IT', 540, 640, KF(900, 150), K, 'rise'); kin(t, tWhy + 0.1, 'WHY.', 540, 800, KF(900, 260), WH, 'snap');
    [['a new job', 1060], ['her family', 1180], ['moving abroad', 1300]].forEach(([c, y], i) => { const t0 = tWhy + 0.15 + i * 0.15; if (t < t0) return; const k = ksp(t, t0, 0.45);
      X.save(); X.translate(mix(i % 2 ? 1400 : -400, 540, k), y); X.rotate((i - 1) * 0.04); chip(c, 0, 0, 46, WH, K, 1, 1, { shadow: false, w: 800 }); X.restore(); });
  }
  function level(t) {
    kcard(K); kwall(t, ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], { size: 150, col: 'rgba(255,255,255,0.04)', speed: 160 });
    kin(t, tLvl + 0.1, 'A SHORT TEST', 540, 520, KF(900, 110), WH, 'rise', { max: 980 });
    kin(t, ph(5, 1), 'YOUR LEVEL.', 540, 660, KF(900, 140), OR, 'snap', { max: 980 });
    const labs = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], lit = Math.floor(eo(lin(t, tLvl + 0.3, ph(5, 1))) * 3.0);
    labs.forEach((l, i) => { const x = 140 + i * 160, on = i < lit || (i === 2 && t >= ph(5, 1)); const k = ksp(t, tLvl + 0.05 + i * 0.05, 0.4);
      X.save(); X.translate(x, 1050 + (1 - k) * 200); X.fillStyle = on ? (i === 2 ? OR : CR) : '#1f1c1a'; rr(-64, -110, 128, 220, 16); X.fill();
      X.font = KF(900, 54); X.fillStyle = on ? K : '#57514c'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(l, 0, 2); X.restore(); });
    if (t > ph(5, 1)) { const p = ksp(t, ph(5, 1), 0.4); X.save(); X.translate(140 + 2 * 160, 870 - 20 * Math.sin(Math.min(1, p) * Math.PI)); X.fillStyle = WH; X.beginPath(); X.moveTo(-26, -20); X.lineTo(26, -20); X.lineTo(0, 16); X.fill(); X.restore(); kcap('TESTED, NOT GUESSED', 540, 1260, GR, Math.min(1, (t - ph(5, 1)) * 4)); }
  }
  const TITLES = ['Ordering at the gate', 'Your first week', 'Asking for directions', 'Small talk', 'Your new job', 'The landlord', 'A night out', 'Meeting the family'];
  function lessons(t) {
    kcard(K);
    const step = 0.23, n = Math.min(8, Math.floor((t - tLes) / step) + 1);
    for (let i = 0; i < n; i++) { const ti = tLes + i * step, k = kspring((t - ti) / 0.45); const depth = n - 1 - i;
      X.save(); X.translate(mix(1500, 540, k), 1080 - depth * 24); X.rotate((i % 2 ? 0.04 : -0.035) * depth + (1 - k) * 0.3); const sc = 1 - depth * 0.03; X.scale(sc, sc);
      // a boarding pass that is a lesson
      X.fillStyle = 'rgba(0,0,0,0.45)'; rr(-370, -210, 740, 440, 30); X.fill(); X.fillStyle = CR; rr(-380, -230, 760, 440, 30); X.fill();
      X.fillStyle = OR; rr(-380, -230, 760, 80, [30, 30, 0, 0]); X.fill(); X.font = KM(26); X.fillStyle = K; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('BOARDING PASS · LESSON ' + String(i + 1).padStart(2, '0') + ' / 50', -340, -190);
      X.font = KF(900, 66); X.fillText(TITLES[i], -340, -70); X.setLineDash([10, 10]); X.strokeStyle = 'rgba(11,10,10,0.3)'; X.lineWidth = 3; X.beginPath(); X.moveTo(180, -150); X.lineTo(180, 210); X.stroke(); X.setLineDash([]);
      X.font = KM(24); X.fillStyle = 'rgba(11,10,10,0.6)'; X.fillText('LEVEL B1', -340, 30); X.fillText('SEAT: YOURS', -340, 80); for (let j = 0; j < 18; j++) X.fillRect(210 + j * 8, 0 + (j % 3) * 4, j % 4 ? 3 : 6, 140);
      X.restore(); }
    const c = Math.min(50, Math.max(1, Math.floor(eo(lin(t, tLes, tLes + 1.8)) * 50)));
    kword(String(c).padStart(2, '0') + ' / 50', 540, 360, KF(900, 170), WH, null, {}); kcap('LESSONS', 540, 480, OR, 1, 30);
    if (t > ph(6, 2)) { X.fillStyle = 'rgba(11,10,10,0.85)'; X.fillRect(0, 1450, W, 170); kin(t, ph(6, 2), 'BUILT FOR THAT TRIP.', 540, 1535, KF(900, 84), WH, 'rise', { max: 980 }); }
  }
  // same airport: 74 routes leave one dot
  const ROUTES = Array.from({ length: 74 }, (_, i) => { const a = hash(i * 3.7) * Math.PI * 2, d = 500 + hash(i * 1.9) * 900; return { a, d, t0: hash(i * 5.3) * 0.9, c: [OR, BL, CR, WH][i % 4] }; });
  function airport(t) {
    kcard(K); const cx = 540, cy = 1040;
    ROUTES.forEach((r) => { const k = eo(lin(t, tAir + 0.2 + r.t0, tAir + 1.2 + r.t0)); if (k <= 0) return; const ex = cx + Math.cos(r.a) * r.d, ey = cy + Math.sin(r.a) * r.d * 0.9;
      const mx = (cx + ex) / 2 + Math.cos(r.a + 1.57) * 160, my = (cy + ey) / 2 + Math.sin(r.a + 1.57) * 160;
      X.strokeStyle = r.c; X.globalAlpha = 0.75; X.lineWidth = 3; X.beginPath(); X.moveTo(cx, cy);
      for (let j = 1; j <= 24; j++) { const u = j / 24 * k; const x = (1 - u) * (1 - u) * cx + 2 * (1 - u) * u * mx + u * u * ex, y = (1 - u) * (1 - u) * cy + 2 * (1 - u) * u * my + u * u * ey; X.lineTo(x, y); } X.stroke(); X.globalAlpha = 1;
      if (k >= 1) { X.fillStyle = r.c; X.beginPath(); X.arc(ex, ey, 7, 0, 7); X.fill(); } });
    X.fillStyle = OR; X.beginPath(); X.arc(cx, cy, 26 + 4 * Math.sin(t * 8), 0, 7); X.fill();
    X.fillStyle = 'rgba(11,10,10,0.8)'; X.fillRect(0, 230, W, 330);
    kin(t, tAir + 0.05, 'SAME AIRPORT.', 540, 330, KF(900, 120), WH, 'rise', { max: 980 });
    if (t > tDiff) kin(t, tDiff, '74 DIFFERENT FLIGHTS.', 540, 470, KF(900, 84), OR, 'snap', { max: 980 });
  }
  const COURSE = ['Calling your landlord', 'Saying no to a second drink', 'Your first shift', 'Meeting her parents', 'The job interview', 'Ordering for the table', 'Reading the menu', 'Booking the doctor', 'Small talk at work', 'Your visa appointment', 'Complimenting Nonna', 'Asking for a raise'];
  function nobody(t) {
    kcard(K); X.save(); X.globalAlpha = 0.9; kwall(t, COURSE, { size: 72, rows: 22, col: 'rgba(255,255,255,0.10)', speed: 360, y0: 60 }); X.restore();
    X.fillStyle = 'rgba(11,10,10,0.0)';
    X.fillStyle = OR; X.fillRect(0, 760, W, 420);
    kin(t, tNob + 0.05, 'NOBODY GETS', 540, 880, KF(900, 120), K, 'rise', { max: 980 });
    kin(t, ph(8, 0) + 0.7, 'THE SAME COURSE.', 540, 1060, KF(900, 112), WH, 'snap', { max: 980 });
  }
  window.SCENE = {
    frame(t) {
      X.save();
      if (t < tL[0] - 0.06) intro(t);
      else if (t < tBoard) langCard(t);
      else if (t < tBoard + 0.45) kTiles((t - tBoard) / 0.45, () => langCard(tBoard - 0.01), () => board(t), { ox: 540, oy: 940 });
      else if (t < tWhy - 0.3) board(t, t > tPick ? 6 : -1);
      else if (t < tWhy) kZoom((t - (tWhy - 0.3)) / 0.3, () => board(t, 6), () => why(t), 540, 560 + 6 * 100);
      else if (t < tLvl) why(t);
      else if (t < tLvl + 0.4) kStripes((t - tLvl) / 0.4, () => why(t), () => level(t));
      else if (t < tLes) level(t);
      else if (t < tLes + 0.35) kTiles((t - tLes) / 0.35, () => level(tLes - 0.01), () => lessons(t), { ox: 540, oy: 1050 });
      else if (t < tAir) lessons(t);
      else if (t < tAir + 0.45) kIris((t - tAir) / 0.45, () => lessons(t), () => airport(t), 540, 1040);
      else if (t < tNob) airport(t);
      else if (t < tNob + 0.35) kStripes((t - tNob) / 0.35, () => airport(t), () => nobody(t), [OR, K, OR, K]);
      else if (t < tEnd) nobody(t);
      else kend(t, tEnd, 'Departures are open.');
      kflash(t, [tL[0], tBoard, tWhy, tLvl, tLes, tAir, tNob, tEnd]);
      const light = t >= tL[0] - 0.06 && t < tBoard && [OR, CR].includes(LS[Math.max(0, tL.filter((x) => t >= x - 0.06).length - 1)][2]) || (t >= tWhy && t < tLvl + 0.2);
      khud(t, SEC, { title: 'BORDERLESS — DEPARTURES', right: 'GATE 74', dur: DUR, col: light ? 'rgba(11,10,10,0.55)' : 'rgba(255,255,255,0.55)' });
      X.restore();
      grain(t, 0.035);
    },
  };
})();
