// 06 · "74 departures" — NIGHT DEPARTURE BOARD · grand & epic
window.ready = (async () => {
  await loadFonts();
  await loadImages({ logo: 'app/logo512.png' });
  const LANGS = await (await fetch('v/06/langs.json')).json();
  const L = await loadTimeline('06');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const YEL = '#ffd43b', GRN = '#46e08a', NAVY1 = '#040915', NAVY2 = '#0c1a3d';
  const END = e(9) + 0.25, DUR = END + 1.5; window.DURATION = DUR;
  // hero words (line 2), spread by syllable weight over the spoken line
  const HERO = [['JAPANESE', '日本語', 3.2], ['KOREAN', '한국어', 3.2], ['SWAHILI', 'Kiswahili', 3.2], ['GREEK', 'Ελληνικά', 1.8], ['HINDI', 'हिन्दी', 2.4], ['DUTCH', 'Nederlands', 1.8]];
  const wsum = HERO.reduce((a, h) => a + h[2], 0); let acc = 0;
  const heroT = HERO.map((h) => { const v = s(2) + (acc / wsum) * (e(2) - s(2)) - 0.05; acc += h[2]; return v; });
  const PURP = ['WORK', 'LOVE', 'MOVE', 'TRIP', 'STUDY', 'ROOTS', 'FUN', 'EXAM', 'FOOD', 'MUSIC'];
  const LVL = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const tPurp = p(4, 1) - 0.05;

  function night(t) {
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, NAVY1); g.addColorStop(1, NAVY2); X.fillStyle = g; X.fillRect(0, 0, W, H);
    for (let i = 0; i < 90; i++) { const a = 0.25 + 0.5 * Math.abs(Math.sin(t * (0.8 + hash(i) * 2) + i)); X.fillStyle = `rgba(255,255,255,${a * 0.6})`; X.fillRect(hash(i * 7) * W, hash(i * 11) * H * 0.9, 3, 3); }
    // runway lights at the bottom, streaming
    for (let i = 0; i < 14; i++) { const u = ((i / 14 + t * 0.35) % 1); const y = 1700 + u * u * 260, sp = 40 + u * 520;
      X.fillStyle = `rgba(255,212,59,${0.25 + u * 0.6})`; X.beginPath(); X.arc(W / 2 - sp, y, 3 + u * 9, 0, 7); X.arc(W / 2 + sp, y, 3 + u * 9, 0, 7); X.fill(); }
  }
  function panel(x, y, w, h, title) {
    X.fillStyle = 'rgba(0,0,0,0.5)'; rr(x + 10, y + 16, w, h, 26); X.fill();
    X.fillStyle = '#07070a'; rr(x, y, w, h, 26); X.fill(); X.strokeStyle = 'rgba(255,212,59,0.18)'; X.lineWidth = 3; rr(x, y, w, h, 26); X.stroke();
    if (title) txt(title, x + 40, y + 46, font('bebas', 400, 50), YEL, { align: 'left', ls: 5 });
  }
  // accelerating phase: k-th switch time for phase a*u + b*u^2
  const switchT = (T0, a, b, k) => T0 + (-a + Math.sqrt(a * a + 4 * b * k)) / (2 * b);
  function churnRow(t, T0, r, x, y, cw, ch, n) {
    const a = 2.5, b = 2.2, u = Math.max(0, t - T0); const k = Math.floor(a * u + b * u * u);
    const t0 = k > 0 ? switchT(T0, a, b, k) : T0; const name = LANGS[(k * 5 + r * 11) % 74][0].padEnd(n).slice(0, n);
    flapRow(t, t0, name, x, y, cw, ch, { settle: 0.1, stagger: 0.008, seed: r * 3 + k, gap: 5 });
  }
  function hero(t) {
    panel(40, 250, 1000, 1000, 'DEPARTURES');
    // big top row
    let i = -1; heroT.forEach((v, j) => { if (t >= v) i = j; });
    const word = i < 0 ? '' : HERO[i][0];
    flapRow(t, i < 0 ? 99 : heroT[i], word.padEnd(11), 85, 340, 76, 130, { settle: 0.22, stagger: 0.015, seed: i + 5, gap: 6 });
    X.fillStyle = 'rgba(255,212,59,0.25)'; X.fillRect(85, 492, 910, 3);
    for (let r = 0; r < 9; r++) {
      const y = 530 + r * 76;
      if (t < s(2)) flapRow(t, 99, ''.padEnd(14), 85, y, 52, 64, { gap: 5 });
      else churnRow(t, s(2) + r * 0.06, r, 85, y, 52, 64, 14);
      flapRow(t, t < s(2) ? 99 : s(2) + r * 0.05, (r < 9 ? 'G' + (r * 7 % 40 + 1) : '').padEnd(3), 85 + 14 * 57 + 20, y, 34, 64, { gap: 4, settle: 0.4, fg: '#fff' });
    }
    if (i >= 0) { const k = eo(lin(t, heroT[i], heroT[i] + 0.2)); X.save(); X.globalAlpha = k; X.shadowColor = YEL; X.shadowBlur = 40;
      txt(HERO[i][1], W / 2, 1390 + (1 - k) * 40, font('inter', 900, 150), '#fff'); X.restore(); }
  }
  function wall(t, T0, rowsFn, opts = {}) {
    const { cols = 2, cw = 25, ch = 36, gap = 3, step = 45, y0 = 120, x0 = [52, 562], dimFn } = opts;
    const per = Math.ceil(74 / cols);
    for (let idx = 0; idx < 74; idx++) {
      const c = Math.floor(idx / per), r = idx % per; const x = x0[c], y = y0 + r * step;
      const [str, fg] = rowsFn(idx); const dark = dimFn ? dimFn(idx) : 1;
      X.save(); X.globalAlpha *= dark;
      flapRow(t, T0 + (r + c * 3) * 0.018 + hash(idx) * 0.15, str, x, y, cw, ch, { settle: 0.35, stagger: 0.012, seed: idx, gap, fg: fg || YEL });
      X.restore();
    }
  }
  function detail(t) {
    const k = eo(lin(t, tPurp - 0.05, tPurp + 0.25));
    X.save(); X.translate(0, (1 - k) * 900); X.globalAlpha *= k;
    panel(40, 220, 1000, 860, 'FLIGHT · BL 074');
    const rows = [['DESTINATION', [[tPurp - 0.05, 'JAPANESE']]], ['PURPOSE', [[tPurp + 0.15, 'WORK'], [tPurp + 0.38, 'LOVE'], [tPurp + 0.6, 'MOVE']]],
      ['LEVEL', [[s(5) + 0.35, 'A2']]], ['LESSONS', [[s(6) + 0.1, '50']]], ['STATUS', [[p(6, 2) - 0.1, 'BOARDING', GRN]]]];
    rows.forEach(([lab, segs], j) => {
      const y = 320 + j * 148; txt(lab, 80, y + 50, font('bebas', 400, 54), 'rgba(255,255,255,0.8)', { align: 'left', ls: 3 });
      let cur = null; segs.forEach((sg) => { if (t >= sg[0]) cur = sg; });
      flapRow(t, cur ? cur[0] : 99, (cur ? cur[1] : '').padEnd(8), 420, y, 66, 104, { settle: 0.2, stagger: 0.02, seed: j * 4 + (cur ? cur[1].length : 0), fg: cur && cur[2] ? cur[2] : YEL });
      if (cur && cur[2] && t > cur[0] + 0.3) { X.save(); X.globalAlpha *= 0.25 + 0.2 * Math.sin(t * 8); X.fillStyle = GRN; rr(410, y - 10, 600, 124, 14); X.fill(); X.restore(); }
    });
    X.restore();
  }

  const cues = [['hum', 0, 0.8], ['boom', 0.12, 0.9], ['whoosh', s(2) - 0.1, 0.5],
    ['flaplong', s(2), 0.45], ['flaplong', s(2) + 1.3, 0.6], ['flaplong', s(2) + 2.6, 0.8],
    ['whoosh', s(3), 0.8], ['impact', s(3) + 0.1, 1], ['flaplong', s(3), 1], ['flaplong', s(3) + 0.9, 1], ['flaplong', s(3) + 1.6, 0.9],
    ['hit', s(4), 1], ['whoosh', tPurp, 0.6], ['flap', tPurp + 0.15, 0.8], ['flap', tPurp + 0.38, 0.8], ['flap', tPurp + 0.6, 0.9],
    ['flap', s(5) + 0.35, 0.9], ['click', s(5) + 0.4, 0.6], ['click', s(5) + 0.5, 0.6], ['flap', s(6) + 0.1, 0.9], ['gong', p(6, 2) - 0.1, 0.9],
    ['whoosh', s(7), 0.7], ['flaplong', s(7), 0.9], ['flaplong', s(7) + 1.0, 0.8], ['swell', s(8), 0.7],
    ['boom', s(9), 1], ['flap', s(9), 1], ['flap', p(9, 1), 0.9], ['dingdong', END, 0.8]];
  HERO.forEach((h, i) => cues.push(['flap', heroT[i], 0.9]));
  for (let k = 0; k < 10; k++) cues.push(['tick', s(8) + 0.1 + k * (e(8) - s(8) - 0.2) / 10, 0.5]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.38 };
  const hits = [0.12, s(3) + 0.1, s(4), p(6, 2) - 0.1, s(9)];

  window.SCENE = {
    frame(t) {
      night(t);
      X.save(); camera(t, hits, [s(2), s(3), s(4), s(7), s(8), s(9)], 18);
      if (t < s(3)) {
        // tilt up onto the giant board
        const k = eo(lin(t, 0, 1.0)); X.save(); X.translate(W / 2, H / 2); X.scale(mix(1.35, 1, k), mix(1.35, 1, k)); X.translate(-W / 2, -H / 2 + mix(520, 0, k));
        hero(t); X.restore();
        if (t < s(2) + 0.1) slam(t, 0.2, 'WHERE ARE YOU FLYING?', W / 2, 1480, font('anton', 400, 104), '#fff', { glow: YEL });
      } else if (t < s(4)) {
        const k = eo(lin(t, s(3), s(3) + 0.55)); X.save(); X.translate(W / 2, H / 2); X.scale(mix(1.7, 1, k), mix(1.7, 1, k)); X.translate(-W / 2, -H / 2);
        wall(t, s(3) - 0.45, (i) => [LANGS[i][0].padEnd(13) + ' ' + String(i + 1).padStart(2, '0')]);
        X.restore();
        const g = X.createRadialGradient(W / 2, 900, 50, W / 2, 900, 620); g.addColorStop(0, 'rgba(4,9,21,0.92)'); g.addColorStop(1, 'rgba(4,9,21,0)'); X.fillStyle = g; X.fillRect(0, 200, W, 1400);
        slam(t, s(3) + 0.1, '74', W / 2, 860, font('anton', 400, 480), YEL, { glow: YEL, from: 2.2 });
        slam(t, s(3) + 0.45, 'LANGUAGES', W / 2, 1150, font('anton', 400, 120), '#fff', {});
        slam(t, p(3, 1), 'ONE BOARD.', W / 2, 1290, font('anton', 400, 120), '#fff', { stroke: '#000', sw: 10 });
      } else if (t < s(7)) {
        // silence: everything stops, one row lights up, then the flight detail board
        const wk = 1 - eo(lin(t, tPurp - 0.1, tPurp + 0.12));
        if (wk > 0) {
          const zk = eio(lin(t, s(4) + 0.05, s(4) + 0.4)), zs = mix(1, 2.1, zk);
          X.save(); X.globalAlpha = wk;
          X.translate(W / 2, mix(H / 2, 760, zk)); X.scale(zs, zs); X.translate(-mix(W / 2, 276, zk) - W / 2 + W / 2, -mix(H / 2, 723, zk));
          wall(t, -9, (i) => [LANGS[i][0].padEnd(13) + ' ' + String(i + 1).padStart(2, '0')], { dimFn: (i) => (i === 13 ? 1 : 0.3) });
          const pulse = 1 + 0.04 * Math.sin((t - s(4)) * 14); X.strokeStyle = YEL; X.lineWidth = 6; X.shadowColor = YEL; X.shadowBlur = 30;
          X.save(); X.translate(52 + 230, 120 + 13 * 45 + 18); X.scale(pulse, pulse); rr(-245, -32, 490, 64, 12); X.stroke(); X.restore();
          X.restore();
          slam(t, s(4) + 0.05, 'PICK ONE.', W / 2, 1450, font('anton', 400, 140), '#fff', { glow: YEL });
        }
        detail(t);
        if (t >= tPurp && t < s(5)) slam(t, tPurp, 'TELL IT WHY.', W / 2, 1300, font('anton', 400, 130), '#fff', { glow: YEL });
        else if (t >= s(5) && t < s(6)) { slam(t, s(5), 'A SHORT TEST', W / 2, 1260, font('anton', 400, 110), '#fff', {}); slam(t, p(5, 1), 'FINDS YOUR LEVEL.', W / 2, 1390, font('anton', 400, 110), YEL, {}); }
        else if (t >= s(6)) { slam(t, s(6) + 0.05, '50 LESSONS,', W / 2, 1260, font('anton', 400, 120), '#fff', {}); slam(t, p(6, 2) - 0.1, 'BUILT FOR THAT TRIP.', W / 2, 1390, font('anton', 400, 100), GRN, { glow: GRN }); }
      } else if (t < s(9)) {
        const k = eo(lin(t, s(7), s(7) + 0.5)); const scroll = (t - s(7)) * 60;
        X.save(); X.translate(W / 2, H / 2); X.scale(mix(1.8, 1, k), mix(1.8, 1, k)); X.translate(-W / 2, -H / 2 - scroll);
        const row = (i) => { const pu = PURP[Math.floor(hash(i * 3.1) * PURP.length)], lv = LVL[Math.floor(hash(i * 5.7) * 5)];
          return [LANGS[i][0].padEnd(13) + ' ' + pu.padEnd(5) + ' ' + lv, i === 13 ? GRN : YEL]; };
        const dark = (i) => (t < s(8) ? 1 : t > s(8) + 0.1 + hash(i * 9.3) * (e(8) - s(8) - 0.3) ? 0.06 : 1);
        for (let i = 0; i < 74; i++) {
          const y = 120 + i * 50; if (y - scroll < -60 || y - scroll > H + 60) continue;
          const [str, fg] = row(i); X.save(); X.globalAlpha *= dark(i);
          flapRow(t, s(7) - 0.2 + hash(i * 1.7) * 0.6, str, 60, y, 40, 42, { settle: 0.35, stagger: 0.01, seed: i + 50, gap: 2, fg });
          X.restore();
        }
        X.restore();
        X.fillStyle = 'rgba(4,9,21,0.8)'; X.fillRect(0, 760, W, 400);
        if (t < s(8)) { slam(t, s(7), 'SAME AIRPORT.', W / 2, 860, font('anton', 400, 120), '#fff', {}); slam(t, p(7, 3), '74 DIFFERENT FLIGHTS.', W / 2, 1030, font('anton', 400, 96), YEL, { glow: YEL }); }
        else { slam(t, s(8), 'NOBODY GETS', W / 2, 870, font('anton', 400, 120), '#fff', {}); slam(t, s(8) + 0.5, 'THE SAME COURSE.', W / 2, 1030, font('anton', 400, 110), YEL, {}); }
      } else {
        X.fillStyle = 'rgba(0,0,0,0.75)'; X.fillRect(0, 0, W, H);
        X.save(); const sc = back(lin(t, s(9) + 0.1, s(9) + 0.45)); X.translate(W / 2, 560); X.scale(sc, sc); logo(0, 0, 140); X.restore();
        panel(60, 800, 960, 420, null);
        flapRow(t, s(9), 'BORDERLESS', 90, 850, 84, 140, { settle: 0.35, stagger: 0.03, seed: 9, gap: 6 });
        flapRow(t, p(9, 1), 'DEPARTURES OPEN', 90, 1040, 54, 92, { settle: 0.3, stagger: 0.02, seed: 4, gap: 4, fg: GRN });
      }
      X.restore();
    },
  };
})();
