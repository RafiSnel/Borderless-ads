// 09 · "Borderless in 20 seconds" — BLACK & WHITE TYPE · hard and rhythmic
window.ready = (async () => {
  await loadFonts();
  const LANGS = await (await fetch('v/06/langs.json')).json();
  const L = await loadTimeline('09');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const END = e(8) + 0.2, DUR = END + 1.6; window.DURATION = DUR;
  const STOP = s(8);
  // beats: [time, lines[], size, flip?, kind]
  const B = [
    [0, ['BORDER', 'LESS.'], 300, 0], [p(1, 1), ['IN 20', 'SECONDS.'], 230, 1],
    [s(2), ['1'], 1100, 1], [p(2, 1), ['TELL IT', 'WHY.'], 300, 1],
    [p(3, 0), ['WORK.'], 330, 1], [p(3, 1), ['LOVE.'], 360, 1], [p(3, 2), ['A', 'MOVE.'], 330, 1], [p(3, 4), ['AN', 'EXAM.'], 330, 1],
    [s(4), ['2'], 1100, 1], [p(4, 1), ['SHORT', 'TEST.'], 300, 1, 'bar'],
    [s(5), ['3'], 1100, 1], [p(5, 1), ['50'], 1250, 1, 'fifty'], [p(5, 2), ['FOR THAT', 'REASON.'], 230, 1], [p(5, 3), ['AT THAT', 'LEVEL.'], 250, 1],
    [s(6), ['74'], 900, 1, 'langs'], [s(7), ['ONE', 'COURSE.'], 300, 1], [p(7, 1), ['YOURS.'], 330, 1],
    [STOP, ['Borderless'], 200, 1, 'end'],
  ];
  let flips = 0; B.forEach((b) => { flips += b[3]; b[4] = b[4] || null; b[5] = flips; });
  const cur = (t) => { let r = null; B.forEach((b) => { if (t >= b[0]) r = b; }); return r; };
  const cues = [['hum', 0, 0.3]];
  B.forEach((b, i) => cues.push([b[2] >= 900 ? 'boom' : i % 2 ? 'hit' : 'impact', b[0], b[2] >= 900 ? 0.9 : 1]));
  for (let x = 0.62; x < STOP - 0.1; x += 0.5) cues.push(['tick', x, 0.55]);
  cues.push(['whoosh', s(6), 0.8], ['riser', s(6) + 0.9, 0.4], ['click', p(4, 3) || s(4) + 1.4, 0.8], ['shutter', STOP, 0.9], ['ding', END + 0.2, 0.4]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.4 };
  const hits = B.map((b) => b[0]);
  function fitFont(lines, size, maxW) {
    let sz = size; X.font = font('anton', 400, sz); const w = Math.max(...lines.map((l) => X.measureText(l).width)); if (w > maxW) sz *= maxW / w; return sz;
  }
  window.SCENE = {
    frame(t) {
      const b = cur(t); const inv = b ? b[5] % 2 === 1 : false;
      const BG = inv ? '#fff' : '#000', FG = inv ? '#000' : '#fff';
      X.fillStyle = BG; X.fillRect(0, 0, W, H);
      X.save(); camera(t, hits, [], 26);
      if (b) {
        const age = t - b[0]; const k = eo(lin(age, 0, 0.12));
        const [_, lines, size, , kind] = b;
        if (kind === 'langs') {
          X.save(); X.globalAlpha = 0.5;
          for (let r = 0; r < 26; r++) { const y = 60 + r * 72; const dir = r % 2 ? 1 : -1; const sp = 900 + hash(r) * 1400; let str = '';
            for (let j = 0; j < 8; j++) str += LANGS[(r * 5 + j * 3) % 74][0] + '  ';
            X.font = font('anton', 400, 56); const w = X.measureText(str).width; const off = ((age * sp * dir) % w + w) % w;
            txt(str, -off, y, font('anton', 400, 56), FG, { align: 'left' }); txt(str, -off + w, y, font('anton', 400, 56), FG, { align: 'left' }); }
          X.restore();
          X.fillStyle = BG; X.fillRect(0, 620, W, 760);
          txt('74', W / 2, 900, font('anton', 400, 620 * mix(1.3, 1, k)), FG);
          if (age > 0.4) txt('LANGUAGES.', W / 2, 1260, font('anton', 400, 190), FG);
        } else if (kind === 'end') {
          txt('Borderless', W / 2, H / 2 - 40, font('inter', 900, 190), FG);
          txt("THAT'S THE APP.", W / 2, H / 2 + 140, font('anton', 400, 80), FG, { a: eo(lin(age, 0.3, 0.6)), ls: 6 });
        } else {
          const sz = fitFont(lines, size, kind === 'fifty' ? W * 1.25 : W * 1.04) * mix(1.35, 1, k);
          const lh = sz * 0.92; const y0 = H / 2 - ((lines.length - 1) * lh) / 2 + (kind === 'bar' ? -150 : 0);
          X.save(); X.translate(W / 2, H / 2); X.transform(1, 0, mix(-0.25, 0, k), 1, 0, 0); X.translate(-W / 2, -H / 2);
          lines.forEach((l, i) => txt(l, W / 2, y0 + i * lh + sz * 0.04, font('anton', 400, sz), FG));
          X.restore();
          if (kind === 'bar') { const bk = eio(lin(age, 0.2, 1.1)); X.strokeStyle = FG; X.lineWidth = 10; X.strokeRect(120, 1300, 840, 90); X.fillStyle = FG; X.fillRect(135, 1315, 810 * bk, 60);
            if (bk >= 1) txt('LEVEL FOUND.', W / 2, 1480, font('anton', 400, 90), FG); }
          if (kind === 'fifty') txt('LESSONS', W / 2, 1600, font('anton', 400, 170), BG, { stroke: FG, sw: 6 });
        }
      }
      X.restore();
      // stopwatch strip
      const tc = Math.min(t, STOP); const fr = tc / 20;
      X.fillStyle = FG; X.fillRect(0, 0, W * fr, 18);
      txt('0:' + tc.toFixed(1).padStart(4, '0'), W - 40, 70, font('mono', 700, 44), FG, { align: 'right' });
      if (t >= STOP) txt('■', 50, 70, font('mono', 700, 40), FG, { align: 'left' }); else txt('●', 50, 70, font('mono', 700, 40), FG, { align: 'left', a: Math.floor(t * 2) % 2 ? 1 : 0.3 });
    },
  };
})();
