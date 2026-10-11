// 14 · "Tongue twisters, attempted" — DARK NEON KARAOKE · comic failure
window.ready = (async () => {
  await loadFonts();
  await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('14');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const YEL = '#e8ff3a', GRN = '#39ff88', RED = '#ff3355', BG = '#07090a', MAG = '#ff3fd0';
  const END = e(14) + 0.2, DUR = END + 1.3; window.DURATION = DUR;
  const R = [['SPANISH', 'Tres tristes tigres tragaban trigo en un trigal.', 'PASS?', YEL, 0.62], ['GERMAN', 'Fischers Fritz fischt frische Fische.', 'FAIL', RED, 0.15],
    ['FRENCH', "Les chaussettes de l'archiduchesse sont-elles sèches?", '…WHAT', MAG, 0.3], ['JAPANESE', 'Namamugi, namagome, namatamago.', '???', YEL, 0.5],
    ['ITALIAN', 'Trentatré trentini entrarono a Trento.', 'FAIL', RED, 0.12], ['DUTCH', 'De kat krabt de krullen van de trap.', 'ERROR', RED, 0.0]];
  const rounds = R.map((r, i) => ({ lang: r[0], words: r[1].split(' '), verdict: r[2], col: r[3], score: r[4], n0: s(2 + i * 2), a0: s(3 + i * 2), a1: e(3 + i * 2), v: e(3 + i * 2) + 0.08 }));
  const glitchAmt = (t) => { let g = 0; rounds.forEach((r, i) => { if (t > r.v && t < r.v + 0.45 && (r.verdict !== 'PASS?')) g = Math.max(g, i === 5 ? 1 : 0.5); }); if (rounds[5] && t > rounds[5].a0 + 0.8 && t < rounds[5].v + 0.9) g = Math.max(g, 0.35 + 0.65 * lin(t, rounds[5].a0, rounds[5].v)); return g; };
  function neon(text, x, y, f, col, opts = {}) {
    const g = opts.g || 0;
    if (g > 0) { X.save(); X.globalCompositeOperation = 'lighter'; txt(text, x - 10 * g, y, f, 'rgba(255,0,60,0.7)', opts); txt(text, x + 10 * g, y + 3 * g, f, 'rgba(0,220,255,0.7)', opts); X.restore(); }
    txt(text, x, y, f, '#fff', { ...opts, glow: col, gb: 36 }); txt(text, x, y, f, col, { ...opts, a: 0.45 });
  }
  function wave(t, on, col) {
    for (let i = 0; i < 48; i++) { const a = on ? 0.2 + 0.8 * Math.abs(Math.sin(t * 17 + i * 0.6) * Math.sin(t * 6.3 + i * 0.21)) : 0.04; const h = 130 * a;
      X.fillStyle = col; X.globalAlpha = 0.85; X.fillRect(40 + i * 21, 1790 - h / 2, 13, h); X.globalAlpha = 1; }
  }
  function meter(t, val, label) {
    const cx = 815, cy = 1500, r = 145;
    // a physical gauge: thick housing with a lit face
    const plate = () => { X.beginPath(); X.arc(cx, cy + 10, r + 40, Math.PI, Math.PI * 2); X.lineTo(cx + r + 40, cy + 60); X.lineTo(cx - r - 40, cy + 60); X.closePath(); };
    for (let i = 22; i > 0; i -= 2) { X.save(); X.translate(i * 0.4, i); plate(); X.fillStyle = i === 22 ? '#000' : '#16191a'; X.fill(); X.restore(); }
    plate(); const pg = X.createLinearGradient(0, cy - r - 40, 0, cy + 60); pg.addColorStop(0, '#2a2f31'); pg.addColorStop(1, '#0e1011'); X.fillStyle = pg; X.fill(); X.strokeStyle = '#3c4446'; X.lineWidth = 4; X.stroke();
    X.lineWidth = 16; X.lineCap = 'round';
    X.strokeStyle = RED; X.beginPath(); X.arc(cx, cy, r, Math.PI, Math.PI * 1.5); X.stroke();
    X.strokeStyle = GRN; X.beginPath(); X.arc(cx, cy, r, Math.PI * 1.5, Math.PI * 2); X.stroke();
    txt('FAIL', cx - r, cy + 40, font('mono', 700, 30), RED); txt('PASS', cx + r, cy + 40, font('mono', 700, 30), GRN);
    const a = Math.PI + Math.PI * cl(val); X.strokeStyle = '#fff'; X.lineWidth = 8; X.shadowColor = '#fff'; X.shadowBlur = 20;
    X.save(); X.shadowBlur = 0; X.strokeStyle = 'rgba(0,0,0,0.6)'; X.beginPath(); X.moveTo(cx + 6, cy + 10); X.lineTo(cx + 6 + Math.cos(a) * (r - 30), cy + 10 + Math.sin(a) * (r - 30)); X.stroke(); X.restore(); X.beginPath(); X.moveTo(cx, cy); X.lineTo(cx + Math.cos(a) * (r - 30), cy + Math.sin(a) * (r - 30)); X.stroke(); X.shadowBlur = 0;
    X.fillStyle = '#fff'; X.beginPath(); X.arc(cx, cy, 14, 0, 7); X.fill();
    if (label) txt(label, cx, cy - 80, font('mono', 700, 30), '#888');
  }
  const cues = [['neon', 0.05, 0.9], ['hum', 0.1, 0.5], ['neon', p(1, 2), 0.6]];
  rounds.forEach((r, i) => { cues.push(['neon', r.n0, 0.8], ['click', r.a0 - 0.1, 0.5]);
    if (r.verdict === 'PASS?') cues.push(['ding', r.v, 0.6], ['boing', r.v + 0.3, 0.4]);
    else if (r.verdict === 'FAIL') cues.push(['buzz', r.v, 0.9], ['fail', r.v + 0.05, 0.5]);
    else if (r.verdict === '…WHAT') cues.push(['glitch', r.v, 0.9], ['wahwah', r.v + 0.1, 0.4]);
    else if (r.verdict === '???') cues.push(['boing', r.v, 0.8], ['boing', r.v + 0.35, 0.5]);
    else cues.push(['glitch', r.v - 0.6, 0.6], ['glitch', r.v, 1], ['fail', r.v + 0.1, 0.8]); });
  const WT = []; rounds.forEach((r) => r.words.forEach((w, i) => WT.push(r.a0 + (i / r.words.length) * (r.a1 - r.a0))));
  WT.forEach((x) => cues.push(['tick', x, 0.7]));
  rounds.forEach((r) => cues.push(['whoosh', r.n0, 0.6], ['coin', r.v + 0.3, 0.35]));
  cues.push(['boing', 0.2, 0.5], ['pop', p(1, 3), 0.6]);
  cues.push(['neon', s(14), 0.9], ['pop', s(14) + 0.2, 0.6], ['neon', END, 0.7]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = rounds.map((r) => r.v);
  const REACT = [['Close enough?', '7/10', { mood: 'happy', armsUp: true }], ['Bless you.', '2/10', { mood: 'o', wide: true }], ['…what was that?', '3/10', { mood: 'o', tilt: 0.2 }],
    ['Nama-what?', '?/10', { mood: 'worried', tilt: -0.15 }], ['Mamma mia.', '1/10', { mood: 'worried', sweat: true }], ["Even I can't.", '0/10', { mood: 'o', wide: true, sweat: true, tilt: -0.2 }]];
  const beats = [{ t: 0, mood: 'happy', acc: ['bowtie', 'mic'] }, { t: p(1, 3), mood: 'happy', acc: ['bowtie', 'mic'], armsUp: true }];
  rounds.forEach((r, i) => { beats.push({ t: r.n0, mood: 'neutral', acc: ['bowtie', 'mic'], lookX: 1 }, { t: r.a0 + 0.3, mood: 'worried', wide: true, sweat: i > 0, acc: ['bowtie'] }, { t: r.v, ...REACT[i][2], acc: ['bowtie', 'card'], card: REACT[i][1] }); });
  beats.push({ t: s(14), mood: 'happy', acc: ['bowtie', 'mic'], point: true }, { t: p(14, 1), mood: 'happy', acc: ['bowtie', 'mic'], wink: true, point: true });
  function wipe(t, t0, col) { const k = lin(t, t0 - 0.05, t0 + 0.25); if (k <= 0 || k >= 1) return; X.save(); X.fillStyle = col; X.globalAlpha = 0.9; for (let i = 0; i < 5; i++) { const x = mix(-600, W + 600, eio(cl(k * 1.4 - i * 0.08))); X.beginPath(); X.moveTo(x - 60 + i * 90, 0); X.lineTo(x + i * 90, 0); X.lineTo(x - 300 + i * 90, H); X.lineTo(x - 360 + i * 90, H); X.fill(); } X.restore(); }

  window.SCENE = {
    frame(t) {
      X.fillStyle = BG; X.fillRect(0, 0, W, H);
      X.strokeStyle = 'rgba(232,255,58,0.06)'; X.lineWidth = 2; for (let y = 0; y < H; y += 60) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
      const g = glitchAmt(t);
      X.save(); camera(t, hits, rounds.map((r) => r.n0), 18);
      const pz = HOST.punch(t, WT, 0.025, 0.12); X.translate(W / 2, H / 2); X.scale(pz, pz); X.translate(-W / 2, -H / 2);
      if (g > 0.3) X.translate((hash(Math.floor(t * 40)) - 0.5) * 40 * g, 0);
      let ri = -1; rounds.forEach((r, i) => { if (t >= r.n0 - 0.1) ri = i; }); if (t >= s(14)) ri = 6;
      if (ri < 0) {
        neon('6 TONGUE', W / 2, 420, font('anton', 400, 170), YEL);
        neon('TWISTERS', W / 2, 600, font('anton', 400, 170), YEL);
        if (t > p(1, 1)) neon('6 LANGUAGES', W / 2, 820, font('anton', 400, 110), GRN);
        if (t > p(1, 2)) neon('1 BRITISH GUY', W / 2, 980, font('anton', 400, 110), MAG, { g: 0.3 * Math.abs(Math.sin(t * 20)) });
        meter(t, 0.5 + 0.1 * Math.sin(t * 3), 'CONFIDENCE');
      } else if (ri < 6) {
        const r = rounds[ri];
        neon(`ROUND ${ri + 1}/6`, W / 2, 200, font('mono', 700, 56), GRN);
        const k = back(lin(t, r.n0, r.n0 + 0.25)); X.save(); X.translate(W / 2, 340); X.scale(k, k); neon(r.lang, 0, 0, font('anton', 400, 150), YEL); X.restore();
        // karaoke words
        if (t >= r.a0) {
          const n = r.words.length, dur = r.a1 - r.a0; const lines = []; let cur = [];
          r.words.forEach((w) => { cur.push(w); if (cur.join(' ').length > 16) { lines.push(cur); cur = []; } }); if (cur.length) lines.push(cur);
          let wi = 0;
          lines.forEach((ln, li) => { const y = 520 + li * 130; X.font = font('anton', 400, 96); const full = ln.join(' '); let x = W / 2 - X.measureText(full).width / 2;
            ln.forEach((w) => { const tw = r.a0 + (wi / n) * dur; const on = t >= tw; const shake = on && t < r.v + 0.5 && r.verdict !== 'PASS?' ? (hash(Math.floor(t * 30) + wi) - 0.5) * 10 : 0;
              const ww = X.measureText(w + ' ').width;
              if (on) neon(w, x, y + shake, font('anton', 400, 96), wi % 2 ? YEL : GRN, { align: 'left', g: g });
              else txt(w, x, y, font('anton', 400, 96), 'rgba(255,255,255,0.12)', { align: 'left' });
              x += ww; wi++; X.font = font('anton', 400, 96); }); });
        }
        // meter value: wobbles during attempt, settles on the verdict
        let val = 0.5; if (t >= r.a0 && t < r.v) val = 0.5 + 0.35 * Math.sin((t - r.a0) * (ri === 3 ? 14 : 7)) * (ri === 5 ? 1.4 : 1);
        if (t >= r.v) val = ri === 3 ? 0.5 + 0.45 * Math.sin((t - r.v) * 16) : mix(0.5, r.score, eo(lin(t, r.v, r.v + 0.25)));
        meter(t, val, null);
        wave(t, t >= r.a0 && t <= r.a1, r.col);
        if (t >= r.v) { const kk = back(lin(t, r.v, r.v + 0.2), 3); X.save(); X.translate(W / 2, 990); X.rotate(-0.06); X.scale(kk, kk);
          X.strokeStyle = r.col; X.lineWidth = 12; X.shadowColor = r.col; X.shadowBlur = 30; X.font = font('anton', 400, 170); const ww = X.measureText(r.verdict).width + 80; rr(-ww / 2, -110, ww, 220, 26); X.stroke(); X.shadowBlur = 0;
          neon(r.verdict, 0, 0, font('anton', 400, 170), r.col, { g }); X.restore(); }
      } else {
        const b = Math.floor(t * 3) % 2;
        neon('YOUR', W / 2, 400, font('anton', 400, 230), b ? YEL : GRN);
        neon('TURN.', W / 2, 630, font('anton', 400, 230), b ? GRN : YEL);
        if (t > p(14, 1)) neon('WHICH ONE BROKE YOU?', W / 2, 880, font('anton', 400, 84), MAG);
        meter(t, 0.0, 'CONFIDENCE');
        if (t > END - 0.2) { const k = back(lin(t, END - 0.2, END + 0.15)); X.save(); X.translate(W / 2, 1010); X.scale(k, k); coin3d(-240, 0, 60, spin3d(t - END + 0.2), 1, { shadow: false, glow: GRN, gb: 30 }); neon('Borderless', 50, 0, font('inter', 900, 90), GRN); X.restore(); }
      }
      // the host: judge with scorecards
      { const st = HOST.state(t, beats); const ein = HOST.enter(t, 0.1, 0.4); X.save(); X.translate(mix(-400, 0, ein), 0); const gl = X.createRadialGradient(250, 1470, 20, 250, 1470, 330); gl.addColorStop(0, 'rgba(232,255,58,0.28)'); gl.addColorStop(1, 'rgba(232,255,58,0)'); X.fillStyle = gl; X.fillRect(-100, 1100, 700, 700);
        X.fillStyle = 'rgba(232,255,58,0.18)'; X.beginPath(); X.ellipse(250, 1640, 190, 34, 0, 0, 7); X.fill();
        HOST.draw(t, 250, 1460, 0.95, st); X.restore();
        let bub = null; if (t >= p(1, 3) && t < s(2)) bub = [p(1, 3), s(2), 'Good luck, Kirk.'];
        rounds.forEach((r, i) => { const nx = i < 5 ? rounds[i + 1].n0 + 0.2 : s(14); if (t >= r.v + 0.1 && t < nx) bub = [r.v + 0.1, nx, REACT[i][0]]; });
        if (t >= s(14)) bub = t < p(14, 1) ? [s(14), p(14, 1), 'Your go.'] : [p(14, 1), END + 1.5, 'Comment it.'];
        if (bub) HOST.say(t, bub[0], bub[1], bub[2], 470, 1135, { size: 56, maxw: 700, tail: -0.3 }); }
      X.restore();
      rounds.forEach((r, i) => wipe(t, r.n0, i % 2 ? GRN : YEL));
      if (g > 0.2) { // horizontal slice displacement
        for (let i = 0; i < 6; i++) { const y = hash(Math.floor(t * 30) * 7 + i) * H, h = 20 + hash(i * 3 + Math.floor(t * 30)) * 80; const dx = (hash(i + Math.floor(t * 30) * 13) - 0.5) * 120 * g;
          X.drawImage(X.canvas, 0, y, W, h, dx, y, W, h); }
      }
    },
  };
})();
