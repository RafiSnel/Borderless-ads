// 5D · Speedrun: "Any% — surviving dinner with your partner's Italian family". HUD, splits, a final boss called Nonna.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('5d');
  const s = (n) => L[n].start, e = (n) => L[n].end, w = (n, word) => wt(L, n, word), ph = (n, i) => L[n].phrases[i] ?? s(n);
  const END = e(11) + 0.2, DUR = END + 2.2; window.DURATION = DUR;
  const HUD = 'rgba(22,17,13,0.92)', GR = '#5fe08a', GO = '#f0c04e', RD = '#ff6b5a', PX = (sz) => font('pixel', 400, sz), VT = (sz) => font('vt', 400, sz);
  const tGo = s(2) - 0.15, tBoss = s(7), tPB = s(10);
  // splits: [label, done-time (video t), time text, delta text, colour]
  const SP = [
    ['Tell the app why', e(2) - 0.2, '0:00:41', '-0:12', GR],
    ['Level test: A1', ph(3, 5) - 0.1, '0:12:05', '+0:30', RD],
    ['L1  Hello', e(4) - 0.2, '1d 02:11', '-1:05', GR],
    ['L9  The food', e(5) - 0.2, '9d 19:40', '-0:48', GR],
    ['L14 Nonna', e(6) - 0.2, '14d 20:15', '-2:10', GR],
    ['FINAL BOSS', s(10) - 0.15, '21d 19:30', '-3:02', GO],
  ];
  // in-game clock in seconds, keyed to video time
  const KEYS = [[tGo, 0], [e(2), 41], [e(3), 725], [s(4), 3600 * 5], [e(4), 86400 + 7931], [e(5), 9 * 86400 + 70800], [e(6), 14 * 86400 + 72900], [s(7), 21 * 86400], [tPB, 21 * 86400 + 70200]];
  function clock(t) { if (t < tGo) return 0; for (let i = 1; i < KEYS.length; i++) if (t < KEYS[i][0]) { const [a, va] = KEYS[i - 1], [b, vb] = KEYS[i]; return mix(va, vb, (t - a) / (b - a)); } return KEYS[KEYS.length - 1][1]; }
  function fmt(sec) { const d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60), ss = Math.floor(sec % 60), cs = Math.floor(sec * 100 % 100);
    const p2 = (n) => String(n).padStart(2, '0'); return (d ? d + 'd ' : '') + p2(h) + ':' + p2(m) + ':' + p2(ss) + (d ? '' : '.' + p2(cs)); }
  const cues = [['tick', 1.0, 0.6], ['tick', 2.0, 0.6], ['tick', 3.0, 0.6], ['fanfare', tGo, 0.35], ['ding', tGo, 0.5]];
  SP.forEach((r, i) => cues.push([i === 1 ? 'fail' : i === 5 ? 'jingle' : 'correct', r[1], i === 1 ? 0.4 : 0.5]));
  cues.push(['plop', s(2) + 0.5, 0.5], ['type', s(2) + 0.9, 0.4], ['type', s(2) + 1.0, 0.4], ['type', s(2) + 1.1, 0.4], ['type', s(2) + 1.2, 0.4], ['type', s(2) + 1.3, 0.4],
    ['tick', s(3) + 0.5, 0.5], ['tick', s(3) + 0.6, 0.5], ['wahwah', ph(3, 5), 0.3], ['whoosh', s(4) - 0.1, 0.6], ['boing', w(4, 'without') + 0.2, 0.5], ['hit', w(4, 'without') + 0.25, 0.5], ['correct', w(4, 'cheek') + 0.3, 0.4],
    ['whoosh', s(5) - 0.1, 0.6], ['impact', w(5, 'loudly'), 0.8], ['whoosh', s(6) - 0.1, 0.6], ['glitch', s(6) + 0.6, 0.3], ['ding', w(6, 'mostly'), 0.4],
    ['boom', tBoss, 0.9], ['gong', w(7, 'final'), 0.5], ['impact', w(7, 'final'), 0.7], ['plop', s(8), 0.5], ['plop', s(9), 0.5], ['heart', ph(9, 1), 0.6], ['heart', ph(9, 1) + 0.3, 0.6], ['fanfare', tPB, 0.6], ['whoosh', s(11) - 0.2, 0.7], ['coin', s(11), 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const hits = [tGo, w(4, 'without') + 0.25, w(5, 'loudly'), tBoss, w(7, 'final'), tPB];
  const beats = [s(1), ph(1, 1), ph(1, 2), ...[2, 3, 4, 5, 6, 7, 8, 9, 10].map(s), ph(3, 3), ph(3, 5), w(4, 'hello'), w(5, 'loudly'), w(6, 'mostly')];
  const talking = (a, b, t) => (t >= a && t <= b ? 0.35 + 0.65 * Math.abs(Math.sin((t - a) * 16)) : 0);
  const NONNA = { hair: 'bun', hairCol: '#b9b3aa', glasses: true, shirt: '#3a3550', cheeks: true, skin: '#e3a887', apron: '#f1ece2' };

  // ---------- HUD ----------
  function hudTop(t) {
    X.fillStyle = HUD; rr(30, 40, 1020, 230, 26); X.fill();
    X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = PX(26); X.fillStyle = GO; X.fillText('ANY%', 70, 98);
    X.font = PX(15); X.fillStyle = '#d8d0c4'; X.fillText('DINNER WITH', 70, 140); X.fillText('THE FAMILY', 70, 168); X.fillStyle = '#8a8178'; X.fillText('category: Italian', 70, 205);
    const run = t >= tGo && t < tPB; const pb = t >= tPB;
    const col = pb ? (Math.floor(t * 6) % 2 ? GO : '#fff6c9') : run ? GR : '#d8d0c4';
    X.textAlign = 'right'; X.font = VT(104); X.fillStyle = col; X.fillText(fmt(clock(t)), 1010, 165);
    if (pb) { X.font = PX(18); X.fillStyle = GO; X.fillText('PERSONAL BEST', 1010, 238); }
    else { X.font = PX(16); X.fillStyle = '#8a8178'; X.fillText('PB 34d 03:12', 1010, 238); }
  }
  function hudSplits(t) {
    const y0 = 1500; X.fillStyle = HUD; rr(30, y0, 1020, 390, 26); X.fill();
    let cur = SP.findIndex((r) => t < r[1]); if (cur < 0) cur = SP.length;
    SP.forEach((r, i) => {
      const y = y0 + 52 + i * 58, done = t >= r[1], active = i === cur && t >= tGo;
      if (active) { X.fillStyle = 'rgba(95,224,138,0.14)'; X.fillRect(44, y - 27, 992, 54); }
      X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = PX(20); X.fillStyle = done ? '#d8d0c4' : active ? '#fff' : '#6d655c'; X.fillText(r[0], 70, y + 2);
      X.textAlign = 'right'; X.font = VT(52);
      if (done) { const k = eo(lin(t, r[1], r[1] + 0.2)); X.fillStyle = r[4]; X.globalAlpha = k; X.fillText(r[3], 800, y); X.globalAlpha = 1; X.fillStyle = '#d8d0c4'; X.fillText(r[2], 1010, y); }
      else { X.fillStyle = '#6d655c'; X.fillText('-', 1010, y); }
    });
  }
  // ---------- stage (the middle) ----------
  function stage(t) {
    const cy = 900;
    if (t < s(2) - 0.15) { // title + countdown
      ['NONNA', 'PAPÀ', 'MAMMA', 'ZIO'].forEach((n, i) => { const x = 210 + i * 220, k = back(lin(t, 0.3 + i * 0.15, 0.6 + i * 0.15), 2);
        X.save(); X.translate(x, 1120); X.scale(k, k); person(t, 0, 0, 0.42, i === 0 ? NONNA : [{ hair: 'short', hairCol: '#2a1d14', stache: true, shirt: '#2f6f73' }, { hair: 'long', hairCol: '#3a2416', shirt: P5.acc }, { hair: 'bald', hairCol: '#3a2416', beard: true, shirt: '#6b4fa0' }][i - 1]);
        X.restore(); txt(n, x, 1340, PX(18), P5.ink2, { a: k }); });
      X.fillStyle = '#7a3a1e'; X.fillRect(80, 1240, 920, 40);
      if (t < ph(1, 1)) { slam(t, 0.1, 'ANY%', 540, 520, PX(110), P5.acc, { stroke: '#fff', sw: 10 }); hd(t, 0.5, 'SPEEDRUN', 540, 680, 120, P5.ink); }
      else hd(t, ph(1, 1), 'SURVIVING', 540, 520, 96, P5.ink); if (t > ph(1, 1)) hd(t, ph(1, 2), 'DINNER', 540, 640, 130, P5.acc); txt("with your partner's Italian family", 540, 760, I5(700, 40), P5.ink2, { a: cl((t - ph(1, 2) - 0.2) * 4) });
      const n = 3 - Math.floor(t - 1.0); if (t > 1.0 && n >= 1) { const f = (t - 1.0) % 1; txt(String(n), 900, 400, PX(80), P5.ink, { a: 1 - f * 0.6 }); }
    } else if (t < s(3) - 0.05) { // split 1
      if (t < tGo + 0.5) txt('GO!', 540, 900, PX(130), GR, { stroke: P5.ink, sw: 16, a: 1 - lin(t, tGo + 0.3, tGo + 0.5) });
      hd(t, s(2) + 0.05, 'SPLIT 1', 540, 420, 70, P5.ink3); hd(t, w(2, 'tell'), 'TELL THE APP WHY.', 540, 520, 82, P5.ink);
      const k = back(lin(t, s(2) + 0.3, s(2) + 0.6), 1.6); X.save(); X.translate(540, 1050); X.scale(k, k);
      card(-420, -330, 840, 660, {}); bub(t, s(2) + 0.5, 99, 'Why are you learning?', 0, -200, { size: 46 });
      X.fillStyle = 'rgba(168,81,43,0.10)'; rr(-360, -60, 720, 300, 26); X.fill();
      const ans = "Dinner with my partner's\nfamily. In three weeks.\nThey're Italian. I'm not."; const sh = typed(t, s(2) + 0.9, ans, 38);
      X.textAlign = 'left'; X.textBaseline = 'alphabetic'; X.font = I5(700, 40); X.fillStyle = P5.ink; sh.split('\n').forEach((l, i) => X.fillText(l, -320, 10 + i * 66));
      X.restore();
    } else if (t < s(4) - 0.05) { // split 2: level test
      hd(t, s(3), 'SPLIT 2', 540, 420, 70, P5.ink3); hd(t, ph(3, 2), 'LEVEL TEST.', 540, 520, 96, P5.ink);
      const k = eo(lin(t, s(3) + 0.4, ph(3, 3))) * 0.5 / 6; const x = 160, y = 940, wd = 760;
      X.fillStyle = P5.line; rr(x, y, wd, 26, 13); X.fill(); X.fillStyle = RD; rr(x, y, wd * Math.max(0.02, k), 26, 13); X.fill();
      ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach((l, i) => txt(l, x + wd * (i + 0.5) / 6, y + 76, I5(800, 38), i === 0 && t > ph(3, 3) ? RD : P5.ink3));
      const mx = x + wd * k; X.fillStyle = P5.ink; X.beginPath(); X.moveTo(mx - 22, y - 50); X.lineTo(mx + 22, y - 50); X.lineTo(mx, y - 14); X.closePath(); X.fill();
      if (t > ph(3, 3)) hd(t, ph(3, 3), 'A1.', 540, 760, 120, RD);
      mascot(t, 540, 1290, 0.7, { mood: t > ph(3, 5) ? 'worried' : 'o', sweat: t > ph(3, 5), seed: 3 });
      if (t > ph(3, 5)) stamp5(t, ph(3, 5), 'ROUGH START', 780, 1210, 46, RD, 0.12);
    } else if (t < s(5) - 0.05) { // lesson 1: the cheek
      hd(t, s(4), 'LESSON 1', 540, 420, 70, P5.ink3); hd(t, w(4, 'hello'), '"CIAO!"', 540, 530, 110, P5.acc);
      const tb = w(4, 'without') + 0.25; const lean = t < tb ? eio(lin(t, s(4) + 0.4, tb)) : t < tb + 0.5 ? 1 - eo(lin(t, tb, tb + 0.3)) * 0.6 : 0.4 + eio(lin(t, tb + 0.5, tb + 1.0)) * 0.55;
      const wrong = t < tb + 0.5; const dy = wrong ? 0 : 1;
      X.save(); X.translate(mix(250, 440, lean), 1150); X.rotate(lean * 0.25); mascot(t, 0, 0, 0.75, { mood: t > tb + 1 ? 'happy' : wrong && t > tb ? 'worried' : 'o', wide: t > tb && wrong, seed: 4, lookX: 1 }); X.restore();
      X.save(); X.translate(mix(830, 660, lean), 1110); X.rotate(-lean * 0.2 * (wrong ? 1 : -1)); person(t, 0, 0, 0.6, { hair: 'long', hairCol: '#3a2416', shirt: P5.acc, mood: t > tb + 1 ? 'happy' : 'o', lookX: -1 }); X.restore();
      if (t > tb && t < tb + 0.6) { txt('BONK', 540, 900, PX(50), RD, { stroke: '#fff', sw: 10 }); }
      if (t > tb + 0.4) txt(t < tb + 1 ? '✗ wrong cheek' : '✓ right cheek first', 540, 1420, I5(800, 44), t < tb + 1 ? RD : P5.green);
    } else if (t < s(6) - 0.05) { // lesson 9: the food, loudly
      hd(t, s(5), 'LESSON 9', 540, 420, 70, P5.ink3); hd(t, ph(5, 1), 'COMPLIMENT THE FOOD.', 540, 520, 70, P5.ink);
      X.fillStyle = '#fff'; X.beginPath(); X.ellipse(540, 1300, 300, 70, 0, 0, 7); X.fill(); X.fillStyle = '#e9c46a'; for (let i = 0; i < 40; i++) { X.beginPath(); X.arc(540 + (hash(i) - .5) * 360, 1270 + (hash(i + 5) - .5) * 70, 26, 0, 7); X.fill(); }
      X.fillStyle = '#c8442f'; X.beginPath(); X.ellipse(540, 1255, 110, 30, 0, 0, 7); X.fill();
      const lo = w(5, 'loudly'); const vol = t < lo ? 0.3 + 0.2 * Math.abs(Math.sin(t * 8)) : Math.min(1, 0.6 + (t - lo) * 3);
      mascot(t, 540, 960, 0.6, { mood: 'happy', talk: t > lo ? 0.9 : 0.4 * Math.abs(Math.sin(t * 10)), armsUp: t > lo, seed: 5 });
      for (let i = 0; i < 12; i++) { const on = i / 12 < vol; X.fillStyle = on ? (i > 9 ? RD : i > 6 ? GO : GR) : 'rgba(31,26,20,0.12)'; rr(940, 1340 - i * 40, 70, 30, 6); X.fill(); }
      if (t > lo) { const sh = (Math.random() - 0.5) * 0; slam(t, lo, 'BUONISSIMO!', 520, 730, PX(64), P5.acc, { stroke: '#fff', sw: 12, rot: -0.1 }); }
    } else if (t < s(7) - 0.05) { // lesson 14: nonna at full speed
      hd(t, s(6), 'LESSON 14', 540, 420, 70, P5.ink3); hd(t, ph(6, 1), 'UNDERSTANDING NONNA.', 540, 520, 70, P5.ink);
      person(t, 300, 1130, 0.8, { ...NONNA, talk: talking(s(6) + 0.3, 99, t), lookX: 1 });
      const fast = 'Allora, la pasta la fai così, prima l\'acqua, poi il sale, tanto sale, e non rompere gli spaghetti, mai!';
      X.save(); X.fillStyle = '#fff'; rr(470, 700, 560, 340, 30); X.fill(); X.strokeStyle = P5.ink; X.lineWidth = 6; X.stroke(); X.beginPath(); X.rect(490, 715, 520, 310); X.clip();
      X.textAlign = 'left'; X.textBaseline = 'alphabetic'; X.font = I5(700, 36); X.fillStyle = P5.ink;
      const WR = []; { let ln = ''; for (const wd of [fast, fast, fast, fast, fast, fast].join(' ').split(' ')) { if (ln && X.measureText(ln + wd).width > 480) { WR.push(ln); ln = ''; } ln += wd + ' '; } WR.push(ln); }
      const off = (t - s(6)) * 170; WR.forEach((l, i) => { const yy = 770 + i * 50 - off; if (yy > 700 && yy < 1060) X.fillText(l, 500, yy); }); X.restore();
      const und = Math.min(0.82, eo(lin(t, s(6) + 0.4, w(6, 'mostly'))) * 0.82);
      X.fillStyle = 'rgba(31,26,20,0.12)'; rr(490, 1120, 520, 40, 20); X.fill(); X.fillStyle = P5.green; rr(490, 1120, 520 * und, 40, 20); X.fill();
      txt('understood: ' + Math.round(und * 100) + '%', 750, 1210, PX(22), P5.ink2);
      if (t > w(6, 'mostly')) hd(t, w(6, 'mostly'), 'MOSTLY.', 750, 1330, 90, P5.acc);
    } else if (t < tPB - 0.05) { // final boss
      const dark = eo(lin(t, tBoss - 0.1, tBoss + 0.2)); X.fillStyle = `rgba(60,10,16,${0.92 * dark})`; X.fillRect(0, 0, W, H);
      for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2 + t * 0.3; X.fillStyle = 'rgba(255,90,60,0.06)'; X.beginPath(); X.moveTo(540, 1000); X.arc(540, 1000, 1500, a, a + 0.15); X.closePath(); X.fill(); }
      hd(t, tBoss, 'DAY 21', 540, 400, 70, '#f6e3d3', { shadow: false }); if (t > w(7, 'final')) slam(t, w(7, 'final'), 'FINAL BOSS', 540, 520, PX(70), RD, { stroke: '#2a0a0e', sw: 12 });
      const ent = back(lin(t, w(7, 'final'), w(7, 'final') + 0.4), 1.6);
      X.save(); X.translate(380, mix(1700, 1130, ent)); person(t, 0, 0, 0.95, { ...NONNA, talk: talking(s(8), e(8), t), brows: t < s(9) ? 'angry' : 'up', mood: t > ph(9, 1) ? 'happy' : null, lookX: 1,
        extra: () => { X.save(); X.translate(190, 160); X.rotate(-0.4 + Math.sin(t * 3) * 0.1); X.fillStyle = '#b5b0a6'; X.fillRect(-10, -200, 20, 220); X.beginPath(); X.ellipse(0, -220, 50, 34, 0, 0, 7); X.fill(); X.restore(); } }); X.restore();
      mascot(t, 830, 1240, 0.78, { mood: t > ph(9, 1) ? 'happy' : 'o', talk: talking(s(9), e(9), t), sweat: t < s(9), seed: 6, lookX: -1 });
      // boss bar: affection
      const hb = t < ph(9, 1) ? 0.15 : Math.min(1, 0.15 + (t - ph(9, 1)) * 1.6);
      X.fillStyle = '#2a0a0e'; rr(100, 650, 880, 70, 14); X.fill(); X.fillStyle = hb > 0.9 ? GO : '#ff5a7a'; rr(112, 662, 856 * hb, 46, 10); X.fill();
      X.textAlign = 'left'; X.font = PX(20); X.fillStyle = '#fff'; X.textBaseline = 'middle'; X.fillText('NONNA', 120, 630); X.textAlign = 'right'; X.fillText('AFFECTION', 960, 630);
      if (t > ph(9, 1)) for (let i = 0; i < 6; i++) { const p = ((t - ph(9, 1)) * 0.9 + i / 6) % 1; txt('♥', 180 + hash(i) * 120 + Math.sin(p * 9 + i) * 30, 1100 - p * 300, I5(900, 60), '#ff5a7a', { a: 1 - p }); }
      bub(t, s(8) - 0.05, s(9) - 0.1, 'Ancora pasta?', 520, 860, { size: 60, tail: -0.25 });
      if (t > s(8) && t < s(9)) { X.fillStyle = 'rgba(0,0,0,0.55)'; rr(220, 1380, 640, 90, 24); X.fill(); txt('More pasta?', 540, 1425, I5(700, 42), '#fff'); }
      bub(t, s(9) - 0.05, tPB, 'Sì, grazie! È buonissima!', 560, 900, { size: 54, tail: 0.3 });
      if (t > s(9)) { X.fillStyle = 'rgba(0,0,0,0.55)'; rr(150, 1380, 780, 90, 24); X.fill(); txt("Yes, thanks! It's delicious!", 540, 1425, I5(700, 42), '#fff'); }
    } else { // personal best
      X.fillStyle = P5.ink; X.fillRect(0, 0, W, H);
      for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2 + t * 0.4; X.fillStyle = 'rgba(240,192,78,0.10)'; X.beginPath(); X.moveTo(540, 900); X.arc(540, 900, 1500, a, a + 0.15); X.closePath(); X.fill(); }
      slam(t, tPB, 'NEW', 540, 640, PX(80), '#fff', {}); slam(t, tPB + 0.15, 'PERSONAL', 540, 780, PX(80), GO, {}); slam(t, tPB + 0.3, 'BEST', 540, 920, PX(110), GO, { stroke: '#7a4a10', sw: 12 });
      txt('21 days. Nonna approves.', 540, 1080, I5(800, 48), '#f6e3d3', { a: cl((t - tPB - 0.5) * 4) });
      mascot(t, 540, 1330, 0.75, { mood: 'happy', armsUp: true, acc: [], seed: 8 }); confetti(t, tPB, 540, 700, 70);
    }
  }
  window.SCENE = {
    frame(t) {
      X.save(); camera(t, hits, [], 16); punch5(t, beats, 0.02, 0.14);
      bg5(t, { drift: t < tGo ? 18 : 60 });
      stage(t); hudTop(t); if (t < tPB) hudSplits(t);
      X.restore();
      endCard(t, s(11), "Lessons for the dinner you're actually going to.", { tagAt: 0.45 });
      grain(t, 0.035);
    },
  };
})();
