// 05 · "Your passport" — DEPARTURE BOARD · holiday excitement (sunny)
window.ready = (async () => {
  await loadFonts();
  await loadImages({ logo: 'app/logo512.png', pass: 'app/madrid_passport.png', df: 'app/madrid_dutyfree.png', df2: 'app/madrid_dutyfree_2.png' });
  const L = await loadTimeline('05');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const SKY1 = '#ffcf6e', SKY2 = '#ff8f4f', INK = '#1f1a14', CREAM = '#fff8ea', YEL = '#ffd43b';
  const END = e(9) + 0.15, DUR = END + 1.6; window.DURATION = DUR;
  const st4b = L[4].phrases.length > 2 ? L[4].phrases[2] : s(4) + 0.9;
  function sky(t) {
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, SKY1); g.addColorStop(1, SKY2); X.fillStyle = g; X.fillRect(0, 0, W, H);
    X.fillStyle = 'rgba(255,255,255,0.35)'; X.beginPath(); X.arc(820, 300, 150 + Math.sin(t * 2) * 6, 0, 7); X.fill();
    X.fillStyle = 'rgba(255,255,255,0.18)'; for (let i = 0; i < 4; i++) { const x = ((i * 380 + t * 60) % 1500) - 200; X.beginPath(); X.ellipse(x, 520 + i * 260, 160, 40, 0, 0, 7); X.fill(); }
  }
  function board(t, rows, y0 = 260) {
    X.fillStyle = '#0b0b0b'; rr(50, y0 - 40, W - 100, rows.length * 140 + 110, 30); X.fill();
    txt('DEPARTURES', 100, y0 + 10, font('bebas', 400, 58), YEL, { align: 'left', ls: 4 });
    rows.forEach(([t0, str, col], i) => flapRow(t, t0, str, 100, y0 + 70 + i * 140, 62, 110, { fg: col || YEL, seed: i + 1 }));
  }
  function boardingPass(t, t0) {
    const k = eo(lin(t, t0, t0 + 0.3)); X.save(); X.translate(W / 2, mix(H + 500, 1080, k)); X.rotate(mix(0.3, -0.04, k));
    X.fillStyle = 'rgba(0,0,0,0.2)'; rr(-430, -290, 880, 600, 40); X.fill();
    X.fillStyle = CREAM; rr(-440, -300, 880, 600, 40); X.fill();
    X.fillStyle = '#a8512b'; rr(-440, -300, 880, 110, [40, 40, 0, 0]); X.fill();
    txt('BOARDING PASS', -400, -245, font('bebas', 400, 64), '#fff', { align: 'left', ls: 3 }); logo(370, -245, 40);
    const F = [['PASSENGER', 'YOU', -400, -120], ['COURSE', 'SPANISH', 40, -120], ['LESSONS', '50', -400, 20], ['LEVEL', 'A2 → B1', 40, 20]];
    F.forEach(([lab, val, x, y], i) => { if (t > t0 + 0.2 + i * 0.12) { txt(lab, x, y, font('inter', 700, 30), '#8a7f70', { align: 'left' }); slam(t, t0 + 0.2 + i * 0.12, val, x, y + 62, font('bebas', 400, 92), INK, { align: 'left', from: 1.3 }); } });
    X.setLineDash([14, 12]); X.strokeStyle = '#d9cdb5'; X.lineWidth = 4; X.beginPath(); X.moveTo(-440, 150); X.lineTo(440, 150); X.stroke(); X.setLineDash([]);
    for (let i = 0; i < 46; i++) { X.fillStyle = INK; X.fillRect(-400 + i * 17, 185, hash(i) > 0.5 ? 8 : 4, 80); }
    X.restore();
  }
  function route(t, t0, t1) {
    const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([140 + u * 800, 1100 - Math.sin(u * Math.PI) * 380 + u * 120]); }
    X.save(); X.setLineDash([18, 16]); X.strokeStyle = '#fff'; X.lineWidth = 8; X.beginPath(); pts.forEach(([x, y], i) => (i ? X.lineTo(x, y) : X.moveTo(x, y))); X.stroke(); X.restore();
    const u = eio(lin(t, t0, t1)), idx = Math.min(59, Math.floor(u * 60)); const [x, y] = pts[idx], [x2, y2] = pts[idx + 1];
    [0.2, 0.45, 0.7, 0.95].forEach((q, i) => { const [sx, sy] = pts[Math.floor(q * 60)]; const on = u >= q; X.fillStyle = on ? '#fff' : 'rgba(255,255,255,0.4)'; X.beginPath(); X.arc(sx, sy, on ? 26 : 18, 0, 7); X.fill(); if (on) txt(String(i * 12 + 12), sx, sy - 60, font('bebas', 400, 54), '#fff'); });
    planeIcon(x, y, 1.5, Math.atan2(y2 - y, x2 - x), INK);
    txt('LESSON', 140, 1300, font('bebas', 400, 60), '#fff', { align: 'left' }); txt(String(Math.max(1, Math.round(u * 50))) + ' / 50', 140, 1370, font('bebas', 400, 110), '#fff', { align: 'left' });
  }
  function passportPage(t, stamps) {
    X.save(); X.translate(W / 2, 1060); X.rotate(-0.03);
    X.fillStyle = 'rgba(0,0,0,0.2)'; rr(-400, -520, 820, 1060, 30); X.fill();
    X.fillStyle = '#f6efe0'; rr(-410, -530, 820, 1060, 30); X.fill();
    X.strokeStyle = 'rgba(110,31,42,0.15)'; X.lineWidth = 2; for (let i = 0; i < 26; i++) { X.beginPath(); X.arc(0, 0, 40 + i * 22, 0, 7); X.stroke(); }
    txt('VISAS · STAMPS', -360, -470, font('bebas', 400, 50), '#6e1f2a', { align: 'left', ls: 4 });
    X.restore();
    stamps.forEach(([t0, a, b, x, y, col, rot, round]) => {
      if (t < t0) return; const pr = (t - t0) / 0.14, sc = mix(2.4, 1, eo(pr));
      X.save(); X.translate(x, y); X.rotate(rot); X.scale(sc, sc); X.globalAlpha = cl(pr * 2) * 0.92; X.strokeStyle = col; X.fillStyle = col; X.lineWidth = 10;
      if (round) { X.beginPath(); X.arc(0, 0, 150, 0, 7); X.stroke(); X.lineWidth = 4; X.beginPath(); X.arc(0, 0, 128, 0, 7); X.stroke(); }
      else { rr(-190, -110, 380, 220, 20); X.stroke(); }
      txt(a, 0, -25, font('bebas', 400, 96), col); txt(b, 0, 55, font('bebas', 400, 48), col);
      X.globalCompositeOperation = 'destination-out'; for (let i = 0; i < 60; i++) { X.beginPath(); X.arc((hash(i + x) - .5) * 360, (hash(i * 3 + y) - .5) * 260, 2 + hash(i * 5) * 5, 0, 7); X.fill(); }
      X.restore();
    });
  }
  const cues = [['dingdong', 0.0, 0.8], ['flaplong', 0.05, 0.9], ['whoosh', s(2) - 0.05, 0.7], ['page', s(2), 0.7], ['plane', s(3), 0.9],
    ['stamp', p(4, 1) + 0.05, 1], ['stamp', st4b + 0.35, 1], ['whoosh', s(5), 0.6], ['page', s(5) + 0.4, 0.6], ['kaching', s(6) + 0.3, 0.9], ['whoosh', p(6, 1), 0.6],
    ['stamp', s(7) + 0.5, 1], ['swell', s(8) + 0.9, 0.5], ['whoosh', p(8, 2) || s(8) + 1.6, 0.6], ['stamp', e(8) - 0.15, 1.1], ['flaplong', s(9), 0.9], ['dingdong', END, 0.9]];
  for (let k = 0; k < 6; k++) cues.push(['tick', s(5) + 0.3 + k * 0.1, 0.4]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [p(4, 1) + 0.05, st4b + 0.35, s(7) + 0.5, e(8) - 0.15];
  window.SCENE = {
    frame(t) {
      sky(t);
      X.save(); camera(t, hits, [s(2), s(3), s(4), s(5), s(6), s(7), s(8), s(9)], 20);
      if (t < s(2)) {
        board(t, [[0.0, 'MADRID   B12'], [0.15, 'SPANISH  NOW'], [0.3, 'BOARDING ·  ']]);
        const lit = Math.floor(t * 3) % 2 === 0; X.fillStyle = lit ? '#4cd964' : '#1d5c2b'; X.beginPath(); X.arc(980, 790, 22, 0, 7); X.fill();
        slam(t, 0.35, 'NOW BOARDING:', W / 2, 1180, font('anton', 400, 120), INK, {});
        slam(t, p(1, 1), 'YOUR SPANISH.', W / 2, 1330, font('anton', 400, 150), '#fff', { stroke: INK, sw: 14, rot: -0.08 });
      } else if (t < s(3)) {
        boardingPass(t, s(2));
        slam(t, s(2) + 0.05, 'YOUR COURSE =', W / 2, 420, font('anton', 400, 110), INK, {});
        slam(t, p(2, 2) || s(2) + 0.8, 'YOUR BOARDING PASS', W / 2, 560, font('anton', 400, 96), '#fff', { stroke: INK, sw: 12 });
      } else if (t < s(4)) {
        route(t, s(3), e(3) + 0.1);
        slam(t, s(3), 'EVERY LESSON', W / 2, 380, font('anton', 400, 120), INK, {});
        slam(t, p(3, 1), 'TAKES YOU FURTHER.', W / 2, 520, font('anton', 400, 96), '#fff', { stroke: INK, sw: 12 });
      } else if (t < s(5)) {
        passportPage(t, [[p(4, 1) + 0.05, '50', 'WORDS', W / 2 - 150, 850, '#a8512b', -0.2, true], [st4b + 0.35, '200', 'WORDS', W / 2 + 140, 1260, '#2f7fd0', 0.15, false]]);
        slam(t, s(4), 'STAMP.', W / 2, 330, font('anton', 400, 170), '#fff', { stroke: INK, sw: 16, fade: st4b + 0.2 });
        slam(t, st4b + 0.3, 'STAMP.', W / 2, 330, font('anton', 400, 170), INK, { rot: 0.1 });
      } else if (t < s(6)) {
        const k = eo(lin(t, s(5), s(5) + 0.3));
        phone(IMG.pass, W / 2, mix(H + 900, 1200, k), 600, { zoom: mix(1, 1.5, eo(lin(t, s(5) + 0.4, e(5)))), focus: [585, mix(1300, 1900, eo(lin(t, s(5) + 0.4, e(5))))], rot: -0.04 });
        slam(t, s(5) + 0.1, 'FILLS UP AS YOU', W / 2, 250, font('anton', 400, 100), INK, {});
        slam(t, p(5, 1) || s(5) + 0.9, 'ACTUALLY LEARN.', W / 2, 375, font('anton', 400, 110), '#fff', { stroke: INK, sw: 12 });
      } else if (t < s(7)) {
        const k = eo(lin(t, s(6), s(6) + 0.25)); const second = t > p(6, 1);
        phone(second ? IMG.df2 : IMG.df, W / 2 + mix(1100, 0, k), 1110, 640, { scrollY: second ? 100 + (t - p(6, 1)) * 200 : 300 + (t - s(6)) * 150, rot: 0.03 });
        const miles = Math.round(1900 * eo(lin(t, s(6) + 0.3, s(6) + 1.0)));
        pill('◆ ' + miles.toLocaleString('en') + ' miles', W / 2, 330, font('bebas', 400, 80), INK, YEL, 1, back(lin(t, s(6), s(6) + .2)));
        slam(t, p(6, 1), 'DUTY FREE', W / 2, 470, font('anton', 400, 110), '#fff', { stroke: INK, sw: 12 });
      } else if (t < s(8)) {
        phone(IMG.df2, W / 2, 1110, 640, { scrollY: 700, rot: 0.03, a: 0.9 });
        slam(t, s(7), 'NEW LOOKS ONLY.', W / 2, 380, font('anton', 400, 110), INK, {});
        X.save(); stampWord(t, s(7) + 0.5); X.restore();
      } else if (t < s(9)) {
        // the calm moment: empty page, one stamp lands slowly at the end of the line
        passportPage(t, [[e(8) - 0.15, 'LEARN', 'ONLY WAY IN', W / 2, 1060, '#6e1f2a', -0.12, true]]);
        slam(t, s(8) + 0.1, 'THE ONLY WAY TO FILL IT', W / 2, 340, font('anton', 400, 84), INK, { from: 1.1 });
        slam(t, p(8, 2) || s(8) + 1.6, 'IS TO LEARN.', W / 2, 460, font('anton', 400, 120), '#fff', { stroke: INK, sw: 12 });
        if (t < e(8) - 0.15) { X.save(); X.globalAlpha = 0.35 + 0.25 * Math.sin(t * 6); X.setLineDash([18, 14]); X.lineWidth = 6; X.strokeStyle = '#6e1f2a';
          X.translate(W / 2, 1060); X.rotate(t * 0.4); X.beginPath(); X.arc(0, 0, 150, 0, Math.PI * 2); X.stroke(); X.restore(); }
      } else {
        board(t, [[s(9), 'NEXT STAMP   '], [s(9) + 0.15, 'ON TIME  ·   '], [s(9) + 0.3, 'GATE: YOU    ']]);
        slam(t, s(9) + 0.3, 'YOUR NEXT STAMP', W / 2, 1180, font('anton', 400, 110), INK, {});
        slam(t, p(9, 1) || s(9) + 0.8, 'IS WAITING.', W / 2, 1320, font('anton', 400, 130), '#fff', { stroke: INK, sw: 14 });
      }
      X.restore();
      if (t > END) {
        const k = eo(lin(t, END, END + 0.3)); X.fillStyle = `rgba(31,26,20,${0.97 * k})`; X.fillRect(0, 0, W, H);
        X.save(); X.translate(W / 2, 820); const sc = back(lin(t, END, END + .35)); X.scale(sc, sc); logo(0, 0, 150); X.restore();
        slam(t, END + 0.15, 'Borderless', W / 2, 1080, font('inter', 900, 140), '#fff', {});
        slam(t, END + 0.45, 'Now boarding.', W / 2, 1230, font('bebas', 400, 90), YEL, { from: 1.3, ls: 4 });
      }
    },
  };
  function stampWord(t, t0) { stamp(t, t0, 'NO SHORTCUTS', W / 2, 1150, font('anton', 400, 130), '#d6455d', -0.14); }
})();
