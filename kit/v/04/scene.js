// 04 · "Words English doesn't have" — NOTEBOOK · playful + relatable
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('04');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const INK = '#1d2433', BLUE = '#3b5bdb', RED = '#d6455d';
  const HL = ['#ffe066', '#ffa8c5', '#b2f2bb', '#a5d8ff', '#ffc078', '#d0bfff'];
  const END = e(8) + 0.2, DUR = END + 1.6;
  window.DURATION = DUR;
  // words: [line, word, lang, meaning]
  const WORDS = [
    [2, 'Tsundoku', 'Japanese', 'buying books…\nand never reading them'],
    [3, 'Sobremesa', 'Spanish', 'staying at the table\nlong after dinner, just talking'],
    [4, 'Gezellig', 'Dutch', 'warm, cosy, good company'],
    [5, 'Saudade', 'Portuguese', 'missing something you\nmight never get back'],
    [6, 'Schadenfreude', 'German', "enjoying someone else's\nbad luck. a little."],
    [7, "L'esprit de l'escalier", 'French', 'the perfect comeback…\non the stairs. way too late.'],
  ];
  // write-on: reveal text left→right with a pen tip
  function write(t, t0, dur, str, x, y, f, col, opts = {}) {
    if (t < t0) return;
    const pr = cl((t - t0) / dur);
    X.save(); X.font = f; X.textAlign = opts.align || 'left'; X.textBaseline = 'middle';
    const lines = str.split('\n'); const size = parseFloat(f.match(/(\d+)px/)[1]); const lh = size * 1.15;
    const total = lines.reduce((a, l) => a + l.length, 0); let budget = pr * total;
    lines.forEach((l, i) => {
      const n = Math.min(l.length, Math.max(0, budget)); budget -= l.length; if (n <= 0) return;
      const w = X.measureText(l).width; const x0 = opts.align === 'center' ? x - w / 2 : x;
      const shown = X.measureText(l.slice(0, Math.ceil(n))).width;
      X.save(); X.beginPath(); X.rect(x0 - 10, y + i * lh - size, shown + 14, size * 2); X.clip();
      X.fillStyle = col; X.textAlign = 'left'; X.fillText(l, x0, y + i * lh); X.restore();
      if (n < l.length) { X.fillStyle = col; X.beginPath(); X.arc(x0 + shown + 6, y + i * lh + size * 0.2, 6, 0, 7); X.fill(); }
    });
    X.restore();
  }
  // stroke a polyline progressively (doodles)
  function doodle(t, t0, dur, pts, col = INK, lw = 9) {
    if (t < t0) return; const pr = cl((t - t0) / dur);
    let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    X.save(); X.strokeStyle = col; X.lineWidth = lw; X.lineCap = 'round'; X.lineJoin = 'round';
    X.setLineDash([len * pr, len]); X.beginPath(); pts.forEach(([x, y], i) => (i ? X.lineTo(x, y) : X.moveTo(x, y))); X.stroke(); X.restore();
  }
  const circle = (cx, cy, r, n = 40, wob = 0.04, seed = 1) => Array.from({ length: n + 1 }, (_, i) => { const a = i / n * Math.PI * 2.08; const rr2 = r * (1 + (hash(i + seed) - .5) * wob); return [cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2]; });
  const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
  function highlight(t, t0, x, y, w, h, col) { if (t < t0) return; const pr = eo(lin(t, t0, t0 + 0.25)); X.save(); X.globalAlpha = 0.75; X.fillStyle = col; X.fillRect(x, y, w * pr, h); X.restore(); }
  function paper(t, shift = 0, rot = 0) {
    X.save(); X.translate(W / 2 + shift, H / 2); X.rotate(rot); X.translate(-W / 2, -H / 2);
    X.fillStyle = 'rgba(0,0,0,0.25)'; X.fillRect(30, 40, W - 40, H - 40);
    X.fillStyle = '#fbf7ec'; X.fillRect(20, 20, W - 40, H - 40);
    X.strokeStyle = 'rgba(59,91,219,0.18)'; X.lineWidth = 3; for (let y = 200; y < H - 40; y += 70) { X.beginPath(); X.moveTo(20, y); X.lineTo(W - 20, y); X.stroke(); }
    X.strokeStyle = 'rgba(214,69,93,0.45)'; X.lineWidth = 4; X.beginPath(); X.moveTo(130, 20); X.lineTo(130, H - 20); X.stroke();
    for (let i = 0; i < 9; i++) { X.fillStyle = '#e8e1d2'; X.beginPath(); X.arc(70, 160 + i * 200, 18, 0, 7); X.fill(); }
    X.restore();
  }
  function wordPage(t, idx) {
    const [n, word, lang, meaning] = WORDS[idx]; const t0 = s(n), col = HL[idx];
    X.font = font('marker', 400, 100); const wf = Math.min(150, Math.floor(820 / X.measureText(word).width * 100));
    X.font = font('marker', 400, wf); const ww = X.measureText(word).width;
    highlight(t, t0 + 0.05, 170, 370 - wf * 0.36, ww + 20, wf * 0.62, col);
    write(t, t0, 0.35, word, 180, 370, font('marker', 400, wf), INK);
    write(t, p(n, 1), 0.25, '— ' + lang, 190, 500, font('caveat', 700, 74), RED);
    write(t, Math.max(p(n, 2), p(n, 1) + 0.45), 0.7, meaning, 190, 1520, font('caveat', 700, 76), INK);
    const k = t - t0;
    if (idx === 0) { // book stack that falls over
      const fall = t > p(n, 2) + 0.4 ? eio(lin(t, p(n, 2) + 0.4, p(n, 2) + 0.75)) : 0;
      X.save(); X.translate(640, 1330); X.rotate(-fall * 1.25 + Math.sin(t * 9) * 0.03 * (1 - fall));
      for (let b = 0; b < 7; b++) { const tb = t0 + 0.2 + b * 0.09; doodle(t, tb, 0.15, rect(-150 + (b % 2) * 20, -95 - b * 95, 300 - (b % 3) * 30, 90), INK, 8); if (t > tb + 0.15) { X.fillStyle = HL[b % 6]; X.globalAlpha = 0.6; X.fillRect(-140 + (b % 2) * 20, -85 - b * 95, 270 - (b % 3) * 30, 70); X.globalAlpha = 1; } }
      X.restore();
      if (fall > 0.9) { write(t, p(n, 2) + 0.8, 0.2, 'me.', 760, 880, font('caveat', 700, 110), RED); doodle(t, p(n, 2) + 0.8, 0.2, [[780, 930], [660, 1080]], RED, 7); }
    } else if (idx === 1) { // table, plates, clock spinning
      doodle(t, t0 + 0.2, 0.25, [[200, 1250], [880, 1250]]); doodle(t, t0 + 0.3, 0.2, [[260, 1250], [260, 1400]]); doodle(t, t0 + 0.3, 0.2, [[820, 1250], [820, 1400]]);
      doodle(t, t0 + 0.4, 0.2, circle(400, 1220, 55, 30, 0.05, 2)); doodle(t, t0 + 0.45, 0.2, circle(680, 1220, 55, 30, 0.05, 3));
      doodle(t, t0 + 0.5, 0.3, circle(540, 860, 150, 40, 0.03, 4));
      const ang = (t - t0) * 9; X.save(); X.translate(540, 860); X.strokeStyle = RED; X.lineWidth = 9; X.lineCap = 'round';
      X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.cos(ang) * 110, Math.sin(ang) * 110); X.stroke(); X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.cos(ang / 12) * 70, Math.sin(ang / 12) * 70); X.stroke(); X.restore();
      write(t, p(n, 2), 0.3, '3 hrs later…', 640, 1080, font('caveat', 700, 64), RED);
    } else if (idx === 2) { // candle + two people on a sofa; cosy? nice? crossed out
      doodle(t, t0 + 0.15, 0.3, [[300, 1200], [300, 1050], [780, 1050], [780, 1200], [230, 1200], [230, 1100], [300, 1100]]);
      doodle(t, t0 + 0.3, 0.2, circle(440, 940, 50, 30, 0.06, 5)); doodle(t, t0 + 0.35, 0.2, circle(640, 940, 50, 30, 0.06, 6));
      doodle(t, t0 + 0.4, 0.25, rect(860, 1000, 50, 200)); const fl = 1 + Math.sin(t * 20) * 0.1;
      if (t > t0 + 0.6) { X.save(); X.translate(885, 975); X.scale(1, fl); X.fillStyle = '#ffa94d'; X.beginPath(); X.ellipse(0, 0, 18, 30, 0, 0, 7); X.fill(); X.restore(); }
      if (t > t0 + 0.7) { X.fillStyle = RED; X.font = font('caveat', 700, 80); X.textAlign = 'center'; X.fillText('♥', 540, 860 - eo(lin(t, t0 + .7, t0 + 1.2)) * 60); }
      const c1 = L[n].phrases[5] ?? t0 + 2.4; write(t, c1, 0.2, 'cosy?', 300, 1680, font('caveat', 700, 80), INK); doodle(t, c1 + 0.3, 0.15, [[290, 1680], [470, 1680]], RED, 8);
      write(t, c1 + 0.45, 0.2, 'nice?', 560, 1680, font('caveat', 700, 80), INK); doodle(t, c1 + 0.7, 0.15, [[550, 1680], [720, 1680]], RED, 8);
      write(t, c1 + 0.85, 0.2, 'nope.', 780, 1680, font('caveat', 700, 80), RED);
    } else if (idx === 3) { // horizon, small figure, ink bleed (the calm one)
      doodle(t, t0 + 0.2, 0.8, [[160, 1150], [920, 1150]], INK, 6);
      doodle(t, t0 + 0.5, 0.4, [[300, 1150], [300, 1060], [270, 1100], [300, 1060], [330, 1100], [300, 1060], [300, 1010]], INK, 7); doodle(t, t0 + 0.6, 0.25, circle(300, 985, 25, 20, 0.05, 7), INK, 7);
      const r = 40 + eo(lin(t, t0 + 0.6, e(n))) * 160; const g = X.createRadialGradient(800, 1060, 5, 800, 1060, r);
      g.addColorStop(0, 'rgba(59,91,219,0.55)'); g.addColorStop(1, 'rgba(59,91,219,0)'); X.fillStyle = g; X.beginPath(); X.arc(800, 1060, r, 0, 7); X.fill();
    } else if (idx === 4) { // banana slip + grinning reader
      const slip = lin(t, p(n, 2), p(n, 2) + 0.35);
      doodle(t, t0 + 0.15, 0.2, [[340, 1240], [380, 1210], [420, 1240]], '#e0a800', 10);
      X.save(); X.translate(420, 1180); X.rotate(-eio(slip) * 1.4);
      doodle(t, t0 + 0.25, 0.3, [[0, 0], [0, -120], [-40, -60], [0, -120], [40, -60], [0, -120], [0, -170]], INK, 8); doodle(t, t0 + 0.3, 0.2, circle(0, -200, 30, 20, 0.05, 8), INK, 8);
      X.restore();
      doodle(t, t0 + 0.4, 0.25, rect(660, 1000, 180, 120), INK, 8); doodle(t, t0 + 0.45, 0.2, circle(750, 940, 45, 24, 0.05, 9), INK, 8);
      if (slip > 0.5) { write(t, p(n, 2) + 0.2, 0.15, '😏', 720, 920, '80px "Noto Color Emoji"', INK); write(t, p(n, 2) + 0.2, 0.15, 'oops', 300, 1000, font('caveat', 700, 70), RED); }
    } else if (idx === 5) { // stairs + lightbulb too late
      const st = []; for (let i = 0; i < 6; i++) st.push([180 + i * 120, 1300 - i * 90], [300 + i * 120, 1300 - i * 90]); doodle(t, t0 + 0.2, 0.5, st, INK, 8);
      const up = eo(lin(t, t0 + 0.4, e(n) - 0.8)); const fx = mix(240, 800, up), fy = mix(1240, 820, up);
      doodle(t, t0 + 0.4, 0.2, [[fx, fy], [fx, fy - 90]], INK, 8); doodle(t, t0 + 0.4, 0.2, circle(fx, fy - 115, 24, 20, 0.05, 10), INK, 8);
      const tb = e(n) - 0.6;
      if (t > tb) { const b = back(lin(t, tb, tb + 0.25)); X.save(); X.translate(fx + 110, fy - 250); X.scale(b, b); X.fillStyle = '#ffe066'; X.beginPath(); X.arc(0, 0, 55, 0, 7); X.fill(); X.strokeStyle = INK; X.lineWidth = 6; X.stroke(); X.restore(); write(t, tb + 0.2, 0.2, '!!', fx + 190, fy - 260, font('caveat', 700, 80), RED); }
    }
  }
  const cues = [['page', 0, 0.8], ['scratch', 0.05, 0.7], ['scratch', 0.9, 0.6]];
  WORDS.forEach(([n], i) => { cues.push(['page', s(n) - 0.05, 0.9], ['scratch', s(n), 0.8], ['scratch', p(n, 1), 0.5], ['scratch', p(n, 2), 0.6]); });
  cues.push(['impact', p(2, 2) + 0.75, 0.6], ['tick', s(3) + 0.5, 0.6], ['tick', s(3) + 0.8, 0.6], ['tick', s(3) + 1.1, 0.6], ['pop', s(4) + 0.7, 0.6],
    ['scratch', (L[4].phrases[5] ?? s(4) + 2.4) + 0.3, 0.8], ['scratch', (L[4].phrases[5] ?? s(4) + 2.4) + 0.7, 0.8], ['boing', p(6, 2), 0.9], ['ding', e(7) - 0.6, 0.8],
    ['page', s(8) - 0.05, 0.9], ['scratch', s(8) + 0.4, 0.8], ['ding', END, 0.6]);
  const PEEKS = [
  { t: p(1, 3), d: 1.1, side: 'R', y: 1560, mood: 'happy', say: 'Agreed.' },
  { t: p(2, 3) + 0.2, d: 1.5, side: 'L', y: 1560, mood: 'worried', sweat: true, say: '…guilty.' },
  { t: p(4, 2), d: 1.8, side: 'R', y: 1560, mood: 'happy', armsUp: true, say: 'Dutch! My favourite.' },
  { t: p(5, 3), d: 1.2, side: 'L', y: 1560, mood: 'worried', say: 'Oof. Feelings.' },
  { t: p(6, 4) - 0.2, d: 1.1, side: 'R', y: 1560, mood: 'happy', wink: true, say: 'Hehe.' },
  { t: p(7, 5), d: 1.6, side: 'L', y: 1560, mood: 'o', wide: true, say: 'Every. Single. Time.' },
  { t: s(8) + 0.1, d: 4, side: 'R', y: 1560, mood: 'happy', armsUp: true, point: true, say: 'Which one are you?' },
];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  window.SCENE = {
    frame(t) {
      X.fillStyle = '#c9b99a'; X.fillRect(0, 0, W, H);
      // which page?
      let pageIdx = -1; WORDS.forEach(([n], i) => { if (t >= s(n) - 0.12) pageIdx = i; }); if (t >= s(8) - 0.12) pageIdx = 99;
      const pageStart = pageIdx === -1 ? 0 : pageIdx === 99 ? s(8) - 0.12 : s(WORDS[pageIdx][0]) - 0.12;
      const flip = lin(t, pageStart, pageStart + 0.2);
      X.save(); camera(t, [p(2, 2) + 0.75, p(6, 2)], [], 12); HOST.pp(t, L);
      if (flip < 1 && pageIdx !== -1) { paper(t, 0, 0); X.save(); X.translate(-W * eio(flip) * 1.1, 0); X.rotate(-eio(flip) * 0.15); paper(t, 0, 0); X.restore(); }
      else paper(t, 0, 0);
      if (flip >= 1 || pageIdx === -1) {
        if (pageIdx === -1) {
          write(t, 0.0, 0.5, 'Words English', 180, 620, font('marker', 400, 120), INK);
          write(t, 0.35, 0.4, "doesn't have", 180, 780, font('marker', 400, 120), INK);
          doodle(t, 0.8, 0.2, [[180, 870], [900, 860]], RED, 10); doodle(t, 1.0, 0.2, [[200, 900], [880, 895]], RED, 8);
          write(t, p(1, 1) || 1.6, 0.3, '(it should.)', 560, 1080, font('caveat', 700, 90), RED);
          doodle(t, 1.2, 0.5, [[300, 1300], [360, 1250], [420, 1300], [480, 1250], [540, 1300], [600, 1250], [660, 1300]], BLUE, 8);
        } else if (pageIdx === 99) {
          WORDS.forEach(([, w, l], i) => { const y = 420 + i * 170; highlight(t, s(8) + i * 0.05, 170, y - 50, Math.min(640, w.length * (w.length > 14 ? 26 : 44)), 90, HL[i]); txt(w, 180, y, font('marker', 400, w.length > 14 ? 46 : 80), INK, { align: 'left' }); txt(l, 920, y, font('caveat', 700, 56), RED, { align: 'right' }); });
          write(t, s(8) + 0.1, 0.4, 'which one are you?', 540, 1560, font('caveat', 700, 96), INK, { align: 'center' });
          const ci = 2; doodle(t, s(8) + 0.4, 0.45, circle(400, 420 + ci * 170, 280, 50, 0.08, 11).map(([x, y]) => [x, (y - (420 + ci * 170)) * 0.4 + 420 + ci * 170]), RED, 8);
          if (t > END) { logo(900, 1760, 60, eo(lin(t, END, END + .3))); txt('Borderless', 820, 1760, font('caveat', 700, 60), INK, { align: 'right', a: eo(lin(t, END, END + .3)) }); }
        } else wordPage(t, pageIdx);
      }
      X.restore();
      HOST.peeks(t, PEEKS);
    },
  };
})();
