// 09 · "Borderless in 30 seconds" — black & white, moving walls of language names, real objects on top
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const LANGS = await (await fetch('v/06/langs.json')).json();
  const L = await loadTimeline('09');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const END = e(10) + 0.25, DUR = END + 1.8; window.DURATION = DUR;
  const ACC = '#ffd43b';
  // beats: every beat flips black/white
  const BEATS = [0, p(1, 2), s(2), p(2, 1), s(3), p(3, 1), p(3, 2), p(3, 3), s(4), p(4, 2), s(5), p(5, 1), p(5, 2), s(6), p(6, 1), p(6, 2), s(7), p(7, 1), p(7, 3), s(8), s(9), p(9, 1), s(10)];
  const beatIdx = (t) => { let k = 0; BEATS.forEach((b, i) => { if (t >= b) k = i; }); return k; };
  const cues = [['hum', 0, 0.3]];
  BEATS.forEach((b, i) => cues.push([i % 3 === 0 ? 'impact' : 'hit', b, i % 3 === 0 ? 0.9 : 0.7]));
  [p(3, 0), p(3, 1), p(3, 2), p(3, 3)].forEach((x) => cues.push(['whoosh', x, 0.5]));
  cues.push(['riser', s(8) + 0.9, 0.35], ['boom', s(8), 0.9], ['type', s(5) + 0.4, 0.6], ['correct', s(6) + 0.1, 0.8], ['page', p(6, 1), 0.6], ['coin', END, 0.7], ['ding', END + 0.4, 0.4]);
  for (let k = 0; k < 8; k++) cues.push(['tick', s(4) + 0.5 + k * 0.12, 0.5]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.4 };

  // ---------- the moving word walls ----------
  function wall(t, FG, a = 0.22, speed = 1, rows = 30) {
    X.save(); X.globalAlpha = a;
    for (let r = 0; r < rows; r++) {
      const y = 40 + r * 66, dir = r % 2 ? 1 : -1, sp = (90 + hash(r) * 160) * speed;
      let str = ''; for (let j = 0; j < 9; j++) str += LANGS[(r * 7 + j * 5) % 74][1] + '   ·   ';
      X.font = font('anton', 400, 52); const w = X.measureText(str).width; const off = ((t * sp * dir) % w + w) % w;
      txt(str, -off, y, font('anton', 400, 52), FG, { align: 'left' }); txt(str, -off + w, y, font('anton', 400, 52), FG, { align: 'left' });
    }
    X.restore();
  }
  function band(BG, y0, y1, a = 0.9) { const g = X.createLinearGradient(0, y0 - 120, 0, y1 + 120); const c = BG === '#000' ? '0,0,0' : '255,255,255';
    g.addColorStop(0, `rgba(${c},0)`); g.addColorStop(0.15, `rgba(${c},${a})`); g.addColorStop(0.85, `rgba(${c},${a})`); g.addColorStop(1, `rgba(${c},0)`); X.fillStyle = g; X.fillRect(0, y0 - 120, W, y1 - y0 + 240); }
  // ---------- objects ----------
  function stopwatch(t, x, y, r, FG, BG, k) {
    X.save(); X.translate(x, y); X.scale(k, k);
    X.fillStyle = FG; rr(-26, -r - 46, 52, 30, 8); X.fill(); X.fillRect(-10, -r - 20, 20, 24);
    X.beginPath(); X.arc(0, 0, r, 0, 7); X.fill(); X.fillStyle = BG; X.beginPath(); X.arc(0, 0, r - 16, 0, 7); X.fill();
    X.strokeStyle = FG; X.lineWidth = 6; for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; X.beginPath(); X.moveTo(Math.sin(a) * (r - 34), -Math.cos(a) * (r - 34)); X.lineTo(Math.sin(a) * (r - 22), -Math.cos(a) * (r - 22)); X.stroke(); }
    const a = Math.min(t, 30) / 30 * 6.283; X.strokeStyle = ACC; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(a) * (r - 40), -Math.cos(a) * (r - 40)); X.stroke();
    X.fillStyle = FG; X.beginPath(); X.arc(0, 0, 12, 0, 7); X.fill(); X.restore();
  }
  function icon(kind, FG) { // simple line icons, drawn around 0,0, ~120px
    X.save(); X.strokeStyle = FG; X.fillStyle = FG; X.lineWidth = 10; X.lineCap = 'round'; X.lineJoin = 'round';
    if (kind === 'job') { rr(-60, -30, 120, 80, 12); X.stroke(); rr(-24, -52, 48, 24, 8); X.stroke(); X.beginPath(); X.moveTo(-60, 4); X.lineTo(60, 4); X.stroke(); }
    if (kind === 'love') { X.beginPath(); X.moveTo(0, 50); X.bezierCurveTo(-80, -10, -40, -70, 0, -30); X.bezierCurveTo(40, -70, 80, -10, 0, 50); X.fill(); }
    if (kind === 'move') { X.beginPath(); X.moveTo(-60, 30); X.lineTo(60, -30); X.stroke(); X.beginPath(); X.moveTo(-10, 5); X.lineTo(-40, -40); X.stroke(); X.beginPath(); X.moveTo(20, -10); X.lineTo(40, 40); X.stroke(); X.beginPath(); X.moveTo(-60, 30); X.lineTo(-74, 10); X.stroke(); }
    if (kind === 'exam') { rr(-46, -60, 92, 120, 10); X.stroke(); for (let i = 0; i < 3; i++) { X.beginPath(); X.moveTo(-26, -28 + i * 26); X.lineTo(26, -28 + i * 26); X.stroke(); } }
    X.restore();
  }
  function reasonCard(t, t0, i, label, kind, FG, BG) {
    if (t < t0) return; const k = lin(t, t0, t0 + 0.35);
    const x = [290, 790, 290, 790][i], y = [800, 860, 1240, 1300][i];
    flipPlane(x, y, 440, 360, Math.PI * 0.5 * (1 - back(k, 1.4)) * (i % 2 ? -1 : 1), () => {
      X.fillStyle = BG; rr(10, 10, 420, 340, 34); X.fill(); X.strokeStyle = FG; X.lineWidth = 8; X.stroke();
      X.save(); X.translate(220, 140); icon(kind, FG); X.restore();
      txt(label, 220, 280, font('anton', 400, label.length > 12 ? 44 : 54), FG);
    }, null, { key: 'rc' + i, shadow: false, persp: 1600 });
  }
  function lessonCard(t, x, y, s0, n, title, typed0, FG, BG, o = {}) {
    X.save(); X.translate(x, y); X.scale(s0, s0);
    X.fillStyle = BG; rr(-230, -300, 460, 600, 36); X.fill(); X.strokeStyle = FG; X.lineWidth = 9; X.stroke();
    txt('LESSON ' + n, -190, -240, font('anton', 400, 46), FG, { align: 'left' });
    const ty = typed0 == null ? 1 : cl((t - typed0) / 1.1);
    const tt = title.slice(0, Math.floor(title.length * cl(ty / 0.4)));
    tt.split('\n').forEach((l, i) => txt(l, -190, -160 + i * 64, font('anton', 400, 58), FG, { align: 'left' }));
    for (let i = 0; i < 5; i++) { const q = lin(ty, 0.4 + i * 0.12, 0.52 + i * 0.12); if (q > 0) { X.fillStyle = FG; X.globalAlpha = 0.5; rr(-190, -10 + i * 52, 380 * [0.9, 0.7, 0.85, 0.6, 0.8][i] * q, 22, 11); X.fill(); X.globalAlpha = 1; } }
    if (o.check) { const c = back(lin(t, o.check, o.check + 0.25)); X.save(); X.translate(150, -230); X.scale(c, c); X.fillStyle = ACC; X.beginPath(); X.arc(0, 0, 70, 0, 7); X.fill();
      X.strokeStyle = '#000'; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(-28, 2); X.lineTo(-6, 26); X.lineTo(32, -22); X.stroke(); X.restore(); }
    if (o.tag) { X.fillStyle = ACC; rr(-190, 236, 300, 44, 22); X.fill(); txt(o.tag, -40, 259, font('anton', 400, 30), '#000'); }
    X.restore();
  }
  function ghost(x, y, s0, n, FG) { X.save(); X.translate(x, y); X.scale(s0, s0); X.setLineDash([22, 16]); X.strokeStyle = FG; X.globalAlpha = 0.5; X.lineWidth = 7; rr(-230, -300, 460, 600, 36); X.stroke(); X.setLineDash([]);
    txt(String(n), 0, 0, font('anton', 400, 160), FG); X.restore(); }

  window.SCENE = {
    frame(t) {
      const bi = beatIdx(t), inv = bi % 2 === 1;
      const BG = inv ? '#fff' : '#000', FG = inv ? '#000' : '#fff';
      X.fillStyle = BG; X.fillRect(0, 0, W, H);
      const fast = t >= s(8) && t < s(9) ? 3.2 : 1;
      wall(t, FG, t >= s(8) && t < s(9) ? 0.5 : 0.16, fast);
      X.save(); camera(t, BEATS, [], 20);
      const age = t - BEATS[bi], k = eo(lin(age, 0, 0.14));
      const BIG = (txts, y = H / 2, size = 300, opt = {}) => { band(BG, y - size * 0.55 * txts.length, y + size * 0.55 * txts.length, 0.85); const lh = size * 0.92; txts.forEach((l, i) => slam(t, BEATS[bi], l, W / 2, y + (i - (txts.length - 1) / 2) * lh, font('anton', 400, size), opt.col || FG, { from: 1.35, max: W * 0.94, ...opt })); };
      if (t < s(2)) {
        if (t < p(1, 2)) BIG(['BORDER', 'LESS.'], 820, 300);
        else BIG(['IN 30', 'SECONDS.'], 700, 230);
        stopwatch(t, W / 2, 1420, 170, FG, BG, back(lin(t, 0.25, 0.6)));
      } else if (t < s(3)) {
        if (t < p(2, 1)) { band(BG, 500, 1300); extrudeSlam(t, s(2), '1', W / 2, 900, font('anton', 400, 900), FG, inv ? '#999' : '#555', 46, { from: 1.6, shadow: false }); }
        else { BIG(['TELL IT', 'WHY.'], 760, 300); const q = back(lin(t, p(2, 1) + 0.15, p(2, 1) + 0.45)); X.save(); X.translate(W / 2, 1400); X.scale(q, q); X.rotate(Math.sin(t * 5) * 0.08); txt('?', 0, 0, font('anton', 400, 360), ACC); X.restore(); }
      } else if (t < s(4)) {
        band(BG, 560, 1520, 0.92);
        reasonCard(t, p(3, 0), 0, 'A NEW JOB', 'job', FG, BG); reasonCard(t, p(3, 1), 1, 'PARTNER’S FAMILY', 'love', FG, BG);
        reasonCard(t, p(3, 2), 2, 'A MOVE ABROAD', 'move', FG, BG); reasonCard(t, p(3, 3), 3, 'AN EXAM', 'exam', FG, BG);
        slam(t, s(3), 'YOUR REASON', W / 2, 360, font('anton', 400, 120), FG, { from: 1.3 });
      } else if (t < s(5)) {
        if (t < p(4, 2)) { band(BG, 500, 1300); extrudeSlam(t, s(4), '2', W / 2, 900, font('anton', 400, 900), FG, inv ? '#999' : '#555', 46, { from: 1.6, shadow: false }); }
        else {
          BIG(['SHORT', 'TEST.'], 620, 240);
          const bk = eio(lin(t, p(4, 2) + 0.1, p(4, 2) + 0.9)), lv = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
          X.strokeStyle = FG; X.lineWidth = 10; X.strokeRect(120, 1180, 840, 90); X.fillStyle = ACC; X.fillRect(135, 1195, 810 * 0.42 * bk, 60);
          lv.forEach((l, i) => txt(l, 160 + i * 152, 1330, font('anton', 400, 52), i === 2 && bk >= 1 ? ACC : FG));
          if (bk >= 1) slam(t, p(4, 2) + 0.9, 'LEVEL: B1', W / 2, 1500, font('anton', 400, 110), FG, { from: 1.4 });
        }
      } else if (t < s(6)) {
        if (t < p(5, 1)) { band(BG, 500, 1300); extrudeSlam(t, s(5), '3', W / 2, 900, font('anton', 400, 900), FG, inv ? '#999' : '#555', 46, { from: 1.6, shadow: false }); }
        else {
          band(BG, 560, 1600, 0.92);
          const sh = eo(lin(t, p(5, 2), p(5, 2) + 0.3));
          lessonCard(t, mix(W / 2, 330, sh), 1080, mix(1, 0.62, sh), 1, 'YOUR FIRST\nDAY', p(5, 1) + 0.1, FG, BG);
          if (t > p(5, 2)) for (let i = 1; i <= 3; i++) ghost(330 + i * 300, 1080, 0.62, i + 1, FG);
          if (t < p(5, 2)) slam(t, p(5, 1), 'WRITES LESSON 1', W / 2, 400, font('anton', 400, 110), FG, { from: 1.3 });
          else slam(t, p(5, 2), 'JUST ONE.', W / 2, 400, font('anton', 400, 170), ACC, { from: 1.5, stroke: FG, sw: 6 });
        }
      } else if (t < s(7)) {
        band(BG, 560, 1600, 0.92);
        const out = eio(lin(t, p(6, 1), p(6, 1) + 0.4));
        if (out < 1) lessonCard(t, mix(330, -300, out), 1080, 0.62, 1, 'YOUR FIRST\nDAY', null, FG, BG, { check: s(6) + 0.05 });
        const k2 = lin(t, p(6, 1), p(6, 1) + 0.5);
        if (t > p(6, 1)) flipPlane(mix(630, W / 2, eo(k2)), 1080, 480, 620, Math.PI * (1 - eio(k2)), () => { lessonCard(t, 240, 310, 1, 2, 'ON HOW\nYOU DID', p(6, 1) + 0.3, FG, BG, { tag: 'BUILT ON LESSON 1' }); }, () => { ghost(240, 310, 1, 2, FG); }, { key: 'l2', shadow: false });
        else for (let i = 1; i <= 3; i++) ghost(330 + i * 300, 1080, 0.62, i + 1, FG);
        if (t < p(6, 1)) slam(t, s(6), 'FINISH IT.', W / 2, 400, font('anton', 400, 160), FG, { from: 1.4 });
        else slam(t, p(6, 2), 'THE NEXT ONE\nFITS YOU.', W / 2, 400, font('anton', 400, 120), FG, { from: 1.3 });
      } else if (t < s(8)) {
        band(BG, 480, 1500, 0.9);
        extrudeSlam(t, s(7), '50', W / 2, 820, font('anton', 400, 620), FG, inv ? '#999' : '#555', 40, { from: 1.5, shadow: false });
        // fifty little stones appear one by one, a path that is written as you go
        const n = Math.floor(lin(t, s(7) + 0.3, e(7)) * 50);
        for (let i = 0; i < 50; i++) { const u = i / 49, x = 110 + (i % 10) * 95, y = 1220 + Math.floor(i / 10) * 70; X.fillStyle = i <= n ? (i === n ? ACC : FG) : 'rgba(128,128,128,0.25)'; rr(x, y, 70, 46, 12); X.fill(); }
        if (t > p(7, 1)) slam(t, p(7, 1), 'YOUR REASON.', W / 2, 360, font('anton', 400, 110), FG, { from: 1.3 });
        if (t > p(7, 3)) slam(t, p(7, 3), 'YOUR LEVEL.', W / 2, 1640, font('anton', 400, 110), ACC, { from: 1.3, stroke: FG, sw: 5 });
      } else if (t < s(9)) {
        band(BG, 640, 1360, 0.92);
        extrudeSlam(t, s(8), '74', W / 2, 900, font('anton', 400, 640), FG, inv ? '#999' : '#555', 40, { from: 2, shadow: false });
        if (t > s(8) + 0.4) slam(t, s(8) + 0.4, 'LANGUAGES.', W / 2, 1290, font('anton', 400, 180), FG, { from: 1.3 });
      } else if (t < s(10)) {
        if (t < p(9, 1)) BIG(['ONE', 'COURSE.'], 820, 300);
        else { BIG(['YOURS.'], 760, 330); mascot(t, W / 2, 1420, 0.9, { mood: 'happy', armsUp: true, seed: 2, squash: Math.max(0, 1 - (t - p(9, 1)) * 5) }); }
      } else {
        band(BG, 500, 1500, 0.95);
        coinIn(t, s(10), W / 2, 700, 150, { shadowCol: inv ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.12)' });
        txt('Borderless', W / 2, 1000, font('inter', 900, 170), FG);
        txt("THAT'S THE APP.", W / 2, 1160, font('anton', 400, 80), FG, { a: eo(lin(t, s(10) + 0.2, s(10) + 0.5)), ls: 6 });
        if (t > END) txt('€9,99 per course · borderlesslearn.com', W / 2, 1290, font('inter', 700, 40), FG, { a: eo(lin(t, END, END + 0.4)) });
      }
      X.restore();
      // stopwatch strip: counts to 30
      const tc = Math.min(t * 30 / e(10), 30); X.fillStyle = FG; X.fillRect(0, 0, W * tc / 30, 16);
      txt('0:' + tc.toFixed(1).padStart(4, '0'), W - 40, 66, font('mono', 700, 44), FG, { align: 'right' });
    },
  };
})();
