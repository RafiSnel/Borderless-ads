// 09 · "Borderless in 30 seconds" — Kinetic Type Reel. A 30-second clock runs the whole video; one orange dot becomes every step.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('09k');
  const s = (n) => L[n].start, e = (n) => L[n].end, ph = (n, i) => L[n].phrases[i] ?? L[n].start;
  const tEnd = e(10) + 0.1, DUR = tEnd + 2.6; window.DURATION = DUR;
  const { K, OR, BL, CR, WH, GR } = KN;
  const S2 = s(2) - 0.12, S3 = ph(3, 0) - 0.06, S4 = s(4) - 0.12, S5 = s(5) - 0.15, S6 = s(6) - 0.1, S7 = s(7) - 0.1, S8 = s(8) - 0.1, S9 = s(9) - 0.08, S10 = s(10) - 0.06;
  const RS = [[ph(3, 0), 'A NEW JOB.', BL, 'drop'], [ph(3, 1), "A PARTNER'S\nFAMILY.", CR, 'spin'], [ph(3, 2), 'A MOVE\nABROAD.', OR, 'stretch'], [ph(3, 3), 'AN EXAM.', K, 'snap']];
  const cues = [['tick', 0.1, 0.5]];
  for (let i = 1; i < 28; i++) cues.push(['tick', i, 0.12]);
  cues.push(['pop', ph(1, 3), 0.4], ['whoosh', S2, 0.6]); for (let i = 0; i < 6; i++) cues.push(['type', ph(2, 1) + i * 0.06, 0.4]);
  RS.forEach(([t0]) => cues.push(['whoosh', t0 - 0.06, 0.5], ['hit', t0, 0.35]));
  cues.push(['whoosh', S4, 0.6]); for (let i = 0; i < 3; i++) cues.push(['tick', ph(4, 4) - 0.4 + i * 0.13, 0.6]); cues.push(['ding', ph(4, 4), 0.4]);
  cues.push(['whoosh', S5, 0.7]); for (let i = 0; i < 10; i++) cues.push(['type', ph(5, 1) + i * 0.06, 0.4]); cues.push(['impact', ph(5, 2), 0.5]);
  cues.push(['stamp', ph(6, 0), 0.6], ['glitch', ph(6, 1), 0.3], ['whoosh', ph(6, 1) + 0.1, 0.5], ['pop', ph(6, 2), 0.5]);
  for (let i = 0; i < 6; i++) cues.push(['pop', S7 + 0.1 + i * 0.18, 0.3]); cues.push(['whoosh', S8, 0.5], ['boom', S8 + 0.05, 0.4]);
  cues.push(['whoosh', S9, 0.6], ['impact', ph(9, 2), 0.6], ['hit', S10 + 0.05, 0.4], ['coin', tEnd + 0.3, 0.5]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const SEC = [[0, '00 · 30 SECONDS'], [S2, '01 · YOUR REASON'], [S4, '02 · YOUR LEVEL'], [S5, '03 · YOUR FIRST LESSON'], [S6, '04 · THE NEXT ONE'], [S7, '05 · 50 LESSONS'], [S8, '06 · 74 LANGUAGES'], [S9, '07 · YOURS'], [tEnd, 'BORDERLESS']];
  const clock = (t) => Math.max(0, 30 * (1 - t / tEnd));
  function bigClock(t, x, y, size, col) { const c = clock(t); const sec = Math.floor(c), cs = Math.floor((c % 1) * 100); kword(String(sec).padStart(2, '0') + '.' + String(cs).padStart(2, '0') + 's', x, y, KF(900, size), col, null, { ls: -size * 0.02 }); }

  function s1(t) {
    kcard(K); bigClock(t, 540, 1000, 300, WH); kcap('SECONDS LEFT', 540, 1180, GR, Math.min(1, t * 3), 30);
    const w = kword('BORDERLESS', 540, 520, KF(900, 140), WH, (j) => { const k = ksp(t, 0.12 + j * 0.025, 0.45); return { dy: (1 - k) * 140, a: k * 2 }; }, {});
    // the orange dot: the full stop that will become everything
    if (t > ph(1, 3) - 0.1) { const k = ksp(t, ph(1, 3) - 0.1, 0.4); X.fillStyle = OR; X.beginPath(); X.arc(540 + w / 2 + 30, 560, 22 * k, 0, 7); X.fill(); }
    if (t > ph(1, 1)) kin(t, ph(1, 1), 'IN 30 SECONDS', 540, 660, KF(900, 80), OR, 'rise');
  }
  const dotX = 540 + 450, dotY = 560;
  function s2(t) {
    kcard(OR); kwall(t, 'WHY?', { size: 160, col: 'rgba(11,10,10,0.06)', speed: 220 });
    kcap('STEP 1', 540, 420, K, 1, 32);
    kin(t, S2 + 0.05, 'TELL IT', 540, 560, KF(900, 160), K, 'rise'); kin(t, ph(2, 1), 'WHY.', 540, 740, KF(900, 260), WH, 'snap');
    const q = ksp(t, ph(2, 1) + 0.1, 0.45); if (q > 0) { X.save(); X.translate(540, 1200); X.scale(q, q); X.fillStyle = K; rr(-380, -110, 760, 220, 110); X.fill(); X.beginPath(); X.moveTo(-200, 100); X.lineTo(-260, 170); X.lineTo(-130, 100); X.fill();
      const txtS = typed(t, ph(2, 1) + 0.15, 'Why are you learning?', 30); X.font = KF(700, 52); X.fillStyle = WH; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(txtS, 0, 4); X.restore(); }
  }
  function s3(t) {
    let i = 0; for (let j = 0; j < 4; j++) if (t >= RS[j][0] - 0.06) i = j; const [t0, w, bg, mode] = RS[i]; const ink = kink(bg);
    kcard(bg); kwall(t, w.replace('\n', ' '), { size: 120, col: ink === WH ? 'rgba(255,255,255,0.06)' : 'rgba(11,10,10,0.06)', speed: 300 });
    w.split('\n').forEach((ln, j, arr) => kin(t, t0 + j * 0.08, ln, 540, 940 + (j - (arr.length - 1) / 2) * 190, KF(900, 180), ink, mode, { max: 980 }));
    kcap('REASON ' + (i + 1) + ' / ∞', 540, 1260, ink, 0.7, 28);
  }
  function s4(t) {
    kcard(K); kwall(t, ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], { size: 150, col: 'rgba(255,255,255,0.04)', speed: 160 });
    kcap('STEP 2', 540, 380, OR, 1, 32); kin(t, S4 + 0.05, 'A SHORT TEST', 540, 520, KF(900, 110), WH, 'rise', { max: 980 }); if (t > ph(4, 3)) kin(t, ph(4, 3), 'FINDS YOUR LEVEL.', 540, 660, KF(900, 96), OR, 'snap', { max: 980 });
    level(t, ph(4, 4));
  }
  function level(t, tHit) {
    const labs = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], lit = Math.floor(eo(lin(t, S4 + 0.3, tHit)) * 3.0);
    labs.forEach((l, i) => { const x = 140 + i * 160, on = i < lit || (i === 2 && t >= tHit); const k = ksp(t, S4 + 0.05 + i * 0.05, 0.4);
      X.save(); X.translate(x, 1050 + (1 - k) * 200); X.fillStyle = on ? (i === 2 ? OR : CR) : '#1f1c1a'; rr(-64, -110, 128, 220, 16); X.fill();
      X.font = KF(900, 54); X.fillStyle = on ? K : '#57514c'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(l, 0, 2); X.restore(); });
  }
  const BODY = ['Your first shift. Taking an order,', 'asking a colleague, saying you', "will find out. At B1."];
  function card1(t, t0, opts = {}) { X.save(); X.translate(540, opts.y ?? 1080); const sc = opts.s ?? 1; X.scale(sc, sc);
    X.fillStyle = 'rgba(0,0,0,0.4)'; rr(-400 + 10, -300 + 20, 800, 600, 36); X.fill(); X.fillStyle = CR; rr(-400, -300, 800, 600, 36); X.fill();
    X.font = KM(28); X.fillStyle = OR; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(opts.kick || 'LESSON 01 / 50', -340, -230);
    X.font = KF(900, 78); X.fillStyle = K; X.fillText(typed(t, t0, opts.title || 'Your first shift', 26), -340, -130);
    X.font = KF(500, 36); X.fillStyle = 'rgba(11,10,10,0.7)'; const all = BODY.join('\n'); typed(t, t0 + 0.6, all, 60).split('\n').forEach((l, i) => X.fillText(l, -340, -20 + i * 54));
    if (opts.check) { const q = ksp(t, opts.check, 0.35); X.save(); X.translate(290, 200); X.scale(q, q); X.fillStyle = KN.OR; X.beginPath(); X.arc(0, 0, 70, 0, 7); X.fill(); X.strokeStyle = WH; X.lineWidth = 14; X.lineCap = 'round'; X.beginPath(); X.moveTo(-30, 0); X.lineTo(-6, 26); X.lineTo(34, -24); X.stroke(); X.restore(); }
    X.restore(); }
  function s5(t) {
    kcard(K); kcap('STEP 3', 540, 380, OR, 1, 32); if (t < ph(5, 1)) kin(t, S5 + 0.05, 'STEP 3.', 540, 560, KF(900, 160), WH, 'snap');
    kin(t, ph(5, 1), 'IT WRITES', 540, 520, KF(900, 120), WH, 'rise'); kin(t, ph(5, 1) + 0.3, 'YOUR FIRST LESSON.', 540, 650, KF(900, 88), WH, 'rise', { max: 980 });
    if (t > ph(5, 2)) { // ghosts of the other 49: not written yet
      for (let i = 0; i < 12; i++) { const k = eo(lin(t, ph(5, 2) + i * 0.03, ph(5, 2) + 0.3 + i * 0.03)); X.save(); X.globalAlpha = 0.35 * k; X.strokeStyle = GR; X.lineWidth = 3; X.setLineDash([14, 12]);
        const a = i / 12 * Math.PI * 2; rr(540 + Math.cos(a) * 520 - 120, 1080 + Math.sin(a) * 600 - 80, 240, 160, 18); X.stroke(); X.restore(); }
      kin(t, ph(5, 2), 'JUST ONE.', 540, 1560, KF(900, 150), OR, 'snap'); }
    card1(t, ph(5, 1) + 0.1, { s: 0.85 });
  }
  function s6(t) {
    kcard(K);
    const br = eo(lin(t, ph(6, 1), ph(6, 1) + 0.5)), re = eo(lin(t, ph(6, 1) + 0.5, ph(6, 1) + 1.0));
    if (t < ph(6, 1)) { card1(t, -10, { s: 0.85, check: ph(6, 0) }); kin(t, ph(6, 0), 'FINISH IT.', 540, 450, KF(900, 150), WH, 'snap'); }
    else { // card 1 shatters into tiles that rebuild card 2
      const a = kpaint('c1', () => { kcard(K); card1(t, -10, { s: 0.85, check: -10 }); });
      const b = kpaint('c2', () => { kcard(K); card1(t, ph(6, 1) + 0.7, { s: 0.85, kick: 'LESSON 02 / 50', title: 'The second shift' }); });
      const ts = 60;
      for (let y = 780; y < 1380; y += ts) for (let x = 180; x < 900; x += ts) { const hsh = hash(x * 0.37 + y * 0.11); const fly = Math.sin(br * Math.PI) * (1 - re);
        const dx = (hsh - 0.5) * 500 * fly, dy = (hash(y + x) - 0.5) * 500 * fly, rot = (hsh - 0.5) * 2 * fly;
        X.save(); X.translate(x + ts / 2 + dx, y + ts / 2 + dy); X.rotate(rot); X.drawImage(br < 0.5 ? a : b, x, y, ts, ts, -ts / 2, -ts / 2, ts, ts); X.restore(); }
      kin(t, ph(6, 1), 'THE NEXT ONE', 540, 400, KF(900, 120), WH, 'rise'); if (t > ph(6, 2)) kin(t, ph(6, 2), 'IS BUILT ON HOW YOU DID.', 540, 530, KF(900, 76), OR, 'rise', { max: 980 });
      if (t > ph(6, 2) + 0.2) [['✓ orders', 200], ['✓ colleagues', 500], ['✗ "I\'ll find out"', 840]].forEach(([c, x], i) => { const q = ksp(t, ph(6, 2) + 0.2 + i * 0.12, 0.4); X.save(); X.translate(x, 1520); X.scale(q, q); chip(c, 0, 0, 32, i === 2 ? WH : K, i === 2 ? OR : CR, 1, 1, { shadow: false }); X.restore(); });
    }
  }
  function s7(t) {
    kcard(K); const k = lin(t, S7 + 0.1, S7 + 1.6); const n = [1, 2, 4, 8, 16, 32, 50][Math.min(6, Math.floor(k * 7))];
    const cols = Math.ceil(Math.sqrt(n * 0.6)), rows = Math.ceil(n / cols); const cw = Math.min(260, 900 / cols), chh = cw * 0.7;
    for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); const x = 540 + (c - (cols - 1) / 2) * (cw + 12), y = 1030 + (r - (rows - 1) / 2) * (chh + 12);
      X.fillStyle = i === 0 ? OR : i % 7 === 3 ? BL : CR; rr(x - cw / 2, y - chh / 2, cw, chh, Math.max(4, cw * 0.08)); X.fill();
      if (cw > 90) { X.font = KM(Math.floor(cw * 0.12)); X.fillStyle = K; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('L' + String(i + 1).padStart(2, '0'), x, y); } }
    kword(String(n).padStart(2, '0'), 540, 330, KF(900, 200), WH, null, {}); kcap('LESSONS', 540, 450, OR, 1, 30);
    if (t > ph(7, 1)) { X.fillStyle = 'rgba(11,10,10,0.85)'; X.fillRect(0, 1560, W, 200); kin(t, ph(7, 1), t < ph(7, 3) ? 'ABOUT YOUR REASON,' : 'AT YOUR LEVEL.', 540, 1660, KF(900, 84), t < ph(7, 3) ? WH : OR, 'rise', { max: 980 }); }
  }
  const G = ['Hola', 'Bonjour', 'Ciao', 'Hallo', 'Olá', 'Hej', 'Merhaba', 'Ahoj', 'Cześć', 'Szia', 'Salut', 'Hei', 'Tere', 'Labas', 'Zdravo', 'Halo', 'Xin chào', 'Kamusta', 'Jambo', 'Salam', 'Shalom', 'Namaste', 'Aloha', 'Privet', 'Yassou', 'Moien', 'Servus', 'Hoi', 'Selam', 'Barev'];
  function s8(t, col = 0) {
    kcard(K); const cols = 5, rows = 8, ts = 180;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c; const d = Math.hypot(c - 2, r - 3.5); const q = cl((t - S8 - d * 0.05) / 0.3);
      let x = 540 + (c - 2) * ts, y = 1180 + (r - 3.5) * ts * 0.9; x = mix(x, 540, col); y = mix(y, 1180, col); const sz = (ts - 14) * mix(1, 0.3, col);
      X.save(); X.translate(x, y); X.scale(Math.max(0.02, Math.abs(Math.sin(q * Math.PI / 2))), 1); const bg = [OR, BL, CR, '#1d1b1a'][(i * 7 + 3) % 4];
      X.fillStyle = q < 0.5 ? CR : bg; rr(-sz / 2, -sz * 0.42, sz, sz * 0.84, 14); X.fill(); if (q >= 0.5 && col < 0.5) { X.font = KF(800, 30); X.fillStyle = kink(bg); X.textAlign = 'center'; X.textBaseline = 'middle'; const g = G[i % G.length]; X.fillText(g, 0, 2); }
      X.restore(); }
    const n = Math.min(74, Math.max(1, Math.floor(eo(lin(t, S8, S8 + 1.2)) * 74)));
    X.fillStyle = 'rgba(11,10,10,0.0)'; kword(String(n), 540, 300, KF(900, 230), WH, null, {}); kcap('LANGUAGES', 540, 430, OR, 1, 30);
  }
  function s9(t) {
    const col = eio(lin(t, S9, S9 + 0.6)); if (col < 1) { s8(t, col); return; }
    kcard(K);
    const q = ksp(t, S9 + 0.6, 0.5); X.save(); X.translate(540, 1080); X.scale(q, q); X.fillStyle = OR; X.beginPath(); X.arc(0, 0, 160, 0, 7); X.fill(); X.restore();
    kin(t, S9 + 0.1, 'ONE COURSE.', 540, 520, KF(900, 140), WH, 'rise', { max: 980 });
    if (t > ph(9, 2)) { const k = ksp(t, ph(9, 2), 0.35, 0.3, 18); X.save(); X.translate(540, 1560); X.scale(mix(2.5, 1, k), mix(2.5, 1, k)); kword('YOURS.', 0, 0, KF(900, 260), OR, null, {}); X.restore(); }
  }
  function s10(t) { kcard(OR); kin(t, S10 + 0.04, "THAT'S", 540, 820, KF(900, 200), K, 'snap'); kin(t, S10 + 0.25, 'THE APP.', 540, 1030, KF(900, 200), WH, 'snap'); }
  window.SCENE = {
    frame(t) {
      X.save();
      if (t < S2) s1(t);
      else if (t < S2 + 0.4) kIris((t - S2) / 0.4, () => s1(t), () => s2(t), dotX - 10, dotY);
      else if (t < S3) s2(t);
      else if (t < S4) s3(t);
      else if (t < S4 + 0.35) kStripes((t - S4) / 0.35, () => s3(S4 - 0.01), () => s4(t));
      else if (t < S5) s4(t);
      else if (t < S5 + 0.32) kZoom((t - S5) / 0.32, () => s4(S5), () => s5(t), 140 + 2 * 160, 1050);
      else if (t < S6) s5(t);
      else if (t < S7) s6(t);
      else if (t < S7 + 0.3) kTiles((t - S7) / 0.3, () => s6(S7 - 0.01), () => s7(t), { ox: 540, oy: 1080 });
      else if (t < S8) s7(t);
      else if (t < S9) s8(t);
      else if (t < S10) s9(t);
      else if (t < tEnd) s10(t);
      else kend(t, tEnd, 'One course, built around you.');
      kflash(t, [S2, S3, S4, S5, S7, S8, S10, tEnd]);
      // the clock never stops: small in the HUD after the intro
      if (t > S2 && t < tEnd) { X.save(); X.globalAlpha = 0.9; const dark = (t >= S2 && t < S3) || (t >= S3 && t < S4 && [CR, OR].includes(RS[Math.max(0, RS.filter((r) => t >= r[0] - 0.06).length - 1)][2])) || (t >= S10); bigClock(t, 540, 150, 64, dark ? K : WH); X.restore(); }
      const light = (t >= S2 && t < S3) || (t >= S3 && t < S4 && [CR, OR].includes(RS[Math.max(0, RS.filter((r) => t >= r[0] - 0.06).length - 1)][2])) || (t >= S10 && t < tEnd);
      khud(t, SEC, { title: 'BORDERLESS — 30 SECONDS', right: 'HOW IT WORKS', dur: DUR, col: light ? 'rgba(11,10,10,0.55)' : 'rgba(255,255,255,0.55)' });
      X.restore();
      grain(t, 0.035);
    },
  };
})();
