// 07 · "The five hardest languages" — Kinetic Type Reel. A countdown, each language gets its own mechanic.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('07k');
  const s = (n) => L[n].start, e = (n) => L[n].end, ph = (n, i) => L[n].phrases[i] ?? L[n].start;
  const tEnd = e(13) + 0.15, DUR = tEnd + 2.6; window.DURATION = DUR;
  const { K, OR, BL, CR, WH, GR } = KN;
  const T5 = s(2) - 0.08, T4 = s(4) - 0.08, T3 = s(6) - 0.08, T2 = s(8) - 0.08, T1 = s(9) - 0.08, TH = s(11) - 0.1, TY = s(12) - 0.08, TA = s(13) - 0.08;
  const cues = [['whoosh', 0.05, 0.4]]; for (let i = 0; i < 5; i++) cues.push(['pop', ph(1, 1) + 0.15 + i * 0.12, 0.35]);
  [[T5, 5], [T4, 4], [T3, 3], [T2, 2], [T1, 1]].forEach(([t0, n]) => cues.push(['whoosh', t0 - 0.05, 0.6], ['boom', t0 + 0.02, 0.5], ['hit', t0 + 0.55, 0.3]));
  for (let i = 0; i < 5; i++) cues.push(['type', ph(3, 0) + 0.1 + i * 0.12, 0.5]); for (let i = 0; i < 4; i++) cues.push(['click', ph(3, 4) + i * 0.15, 0.5]);
  cues.push(['pop', ph(5, 0) + 0.2, 0.5], ['pop', ph(5, 0) + 0.4, 0.5], ['impact', ph(5, 0) + 0.65, 0.4]); for (let i = 0; i < 3; i++) cues.push(['stamp', ph(5, 2) + 0.15 + i * 0.3, 0.4]);
  for (let i = 0; i < 6; i++) cues.push(['tick', ph(6, 3) + i * 0.12, 0.5]); cues.push(['swell', ph(7, 1) - 0.4, 0.3], ['ding', ph(7, 1), 0.35]);
  for (let i = 0; i < 4; i++) cues.push(['pop', ph(8, 2) + i * 0.15, 0.45]); for (let i = 0; i < 12; i++) cues.push(['tick', ph(8, 4) + i * 0.05, 0.3]);
  cues.push(['whoosh', ph(10, 0), 0.5], ['whoosh', ph(10, 0) + 0.2, 0.5], ['whoosh', ph(10, 0) + 0.4, 0.5], ['pop', ph(10, 2) + 0.2, 0.4], ['pop', ph(10, 2) + 0.6, 0.4], ['pop', ph(10, 2) + 1.0, 0.4]);
  for (let i = 0; i < 20; i++) cues.push(['tick', TH + 0.2 + i * 0.07, 0.3]); cues.push(['impact', ph(11, 2), 0.5]);
  cues.push(['hit', ph(12, 1), 0.5], ['stamp', ph(12, 3), 0.8], ['whoosh', TA, 0.6], ['coin', tEnd + 0.3, 0.5]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const SEC = [[0, '00 · THE LIST'], [T5, '05 · ARABIC'], [T4, '04 · KOREAN'], [T3, '03 · CANTONESE'], [T2, '02 · MANDARIN'], [T1, '01 · JAPANESE'], [TH, '— · 2,200 HOURS'], [tEnd, 'BORDERLESS']];

  // giant countdown numeral, extruded, slams then hangs back
  function numeral(t, t0, n, bg, name, tName) {
    kcard(bg); const ink = kink(bg); const p = t - t0; const k = ksp(t, t0, 0.55, 0.32, 14);
    kwall(t, name, { size: 140, col: ink === WH ? 'rgba(255,255,255,0.06)' : 'rgba(11,10,10,0.06)', speed: 260 });
    X.save(); X.translate(540, 820); X.scale(mix(3, 1, k), mix(3, 1, k)); X.rotate((1 - k) * 0.3);
    extrude(String(n), 0, 0, KF(900, 700), ink, bg === K ? '#2a2624' : 'rgba(11,10,10,0.25)', 34, { turn: Math.sin(p * 1.4) * 0.12, shadow: false }); X.restore();
    if (t > tName) kin(t, tName, name, 540, 1380, KF(900, 150), ink, 'rise', { max: 960 });
  }
  function intro(t) {
    kcard(K); kwall(t, ['ARABIC', 'KOREAN', 'CANTONESE', 'MANDARIN', 'JAPANESE'], { size: 120, col: 'rgba(255,255,255,0.05)' });
    kin(t, -0.2, 'THE 5 HARDEST', 540, 380, KF(900, 120), WH, 'rise', { max: 980 }); kin(t, 0.6, 'LANGUAGES', 540, 520, KF(900, 150), OR, 'snap', { max: 980 });
    kin(t, 1.3, 'FOR ENGLISH SPEAKERS', 540, 640, KF(900, 60), CR, 'rise');
    // ranking bars grow
    for (let i = 0; i < 5; i++) { const t0 = ph(1, 1) + 0.15 + i * 0.12; const k = ksp(t, t0, 0.6); const h = (240 + i * 130) * Math.max(0, k);
      const x = 180 + i * 180; X.fillStyle = [CR, BL, CR, BL, OR][i]; rr(x - 70, 1560 - h, 140, h, 14); X.fill();
      if (k > 0.2) { X.font = KF(900, 64); X.fillStyle = kink([CR, BL, CR, BL, OR][i]); X.textAlign = 'center'; X.textBaseline = 'middle'; X.globalAlpha = Math.min(1, k); X.fillText(String(5 - i), x, 1560 - h + 60); X.globalAlpha = 1; } }
    kcap('SOURCE: FOREIGN SERVICE INSTITUTE · US STATE DEPT.', 540, 1650, GR, Math.min(1, (t - ph(1, 1)) * 4), 24);
  }
  function arabic(t) {
    if (t < ph(3, 0) - 0.05) return numeral(t, T5, 5, OR, 'ARABIC', ph(2, 1));
    kcard(K);
    if (t < ph(3, 4) - 0.05) { // right to left, letter by letter
      kin(t, ph(3, 0), 'RIGHT TO LEFT.', 540, 420, KF(900, 120), WH, 'rise', { max: 980 });
      const word = 'مرحبا'; const k = lin(t, ph(3, 0) + 0.1, ph(3, 0) + 0.8); const shown = word.slice(0, Math.ceil(k * word.length));
      X.save(); X.font = '700 330px "Noto Sans Arabic"'; X.fillStyle = OR; X.textAlign = 'right'; X.textBaseline = 'middle'; X.direction = 'rtl'; X.fillText(shown, 900, 960); X.restore();
      const ax = mix(900, 160, eo(lin(t, ph(3, 0) + 0.1, ph(3, 0) + 1.0))); X.strokeStyle = WH; X.lineWidth = 8; X.beginPath(); X.moveTo(900, 1200); X.lineTo(ax, 1200); X.moveTo(ax + 40, 1170); X.lineTo(ax, 1200); X.lineTo(ax + 40, 1230); X.stroke();
      kcap('MARHABA · "HELLO"', 540, 1300, GR, Math.min(1, (t - ph(3, 0) - 0.6) * 4));
    } else { // one letter, four shapes
      kin(t, ph(3, 4), 'LETTERS CHANGE SHAPE.', 540, 400, KF(900, 92), WH, 'rise', { max: 980 });
      const forms = [['ع', 'ALONE'], ['عـ', 'START'], ['ـعـ', 'MIDDLE'], ['ـع', 'END']];
      forms.forEach(([f, lab], i) => { const t0 = ph(3, 4) + i * 0.15; const q = Math.min(1, ksp(t, t0, 0.45)); const x = 160 + (i % 2) * 380 + 190 - 190, y = 900 + Math.floor(i / 2) * 420;
        const cx = i % 2 ? 730 : 350; X.save(); X.translate(cx, y); X.scale(Math.max(0.02, Math.abs(Math.sin(q * Math.PI / 2))), 1); X.fillStyle = [OR, CR, BL, CR][i]; rr(-170, -170, 340, 340, 26); X.fill();
        X.font = '700 200px "Noto Sans Arabic"'; X.fillStyle = kink([OR, CR, BL, CR][i]); X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(f, 0, -10); X.font = KM(24); X.fillText(lab, 0, 130); X.restore(); });
    }
  }
  function korean(t) {
    if (t < ph(5, 0) - 0.05) return numeral(t, T4, 4, BL, 'KOREAN', ph(4, 1));
    kcard(K);
    if (t < ph(5, 2) - 0.05) { // jamo assemble into a syllable block
      kin(t, ph(5, 0), 'THE ALPHABET:', 540, 400, KF(900, 110), WH, 'rise', { max: 980 });
      const k = eio(lin(t, ph(5, 0) + 0.15, ph(5, 0) + 0.7));
      const parts = [['ㅎ', -300, -200, -70, -40], ['ㅏ', 300, -200, 70, -40], ['ㄴ', 0, 260, 0, 90]];
      if (k < 1) parts.forEach(([c, x0, y0, x1, y1]) => { X.save(); X.font = '700 200px "Noto Sans KR", "Noto Sans CJK KR"'; X.fillStyle = WH; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(c, 540 + mix(x0, x1, k), 960 + mix(y0, y1, k)); X.restore(); });
      else { const q = ksp(t, ph(5, 0) + 0.7, 0.4); X.save(); X.translate(540, 960); X.scale(mix(0.7, 1, q), mix(0.7, 1, q)); X.font = '700 380px "Noto Sans KR", "Noto Sans CJK KR"'; X.fillStyle = OR; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('한', 0, 0); X.restore(); }
      if (t > ph(5, 0) + 0.8) kin(t, ph(5, 0) + 0.8, 'EASY.', 540, 1350, KF(900, 160), CR, 'snap');
    } else { // politeness: a staircase
      kin(t, ph(5, 2), 'POLITENESS LEVELS:', 540, 360, KF(900, 92), WH, 'rise', { max: 980 }); if (t > ph(5, 4)) kin(t, ph(5, 4), 'NOT.', 540, 500, KF(900, 160), OR, 'snap');
      [['고마워', 'FRIENDS', CR], ['고마워요', 'POLITE', BL], ['감사합니다', 'FORMAL', OR]].forEach(([w, lab, c], i) => { const t0 = ph(5, 2) + 0.15 + i * 0.3; const q = ksp(t, t0, 0.45); if (t < t0) return;
        const y = 1500 - i * 260, x = 220 + i * 140; X.save(); X.translate(x + (1 - q) * 600, y); X.fillStyle = c; rr(-140, -110, 820 - i * 140, 220, 20); X.fill();
        X.font = '700 96px "Noto Sans KR", "Noto Sans CJK KR"'; X.fillStyle = kink(c); X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(w, -100, -10); X.font = KM(24); X.fillText(lab + ' · "THANK YOU"', -100, 70); X.restore(); });
    }
  }
  const SI = [['詩', 'POEM'], ['史', 'HISTORY'], ['試', 'TRY'], ['時', 'TIME'], ['市', 'CITY'], ['是', 'YES']];
  function cantonese(t) {
    if (t < ph(6, 3) - 0.05) return numeral(t, T3, 3, CR, 'CANTONESE', ph(6, 1));
    kcard(K);
    // six tone contours on a pitch graph (like a curve editor)
    const gx = 90, gy = 600, gw = 900, gh = 720;
    X.strokeStyle = 'rgba(255,255,255,0.12)'; X.lineWidth = 2; for (let i = 0; i <= 5; i++) { X.beginPath(); X.moveTo(gx, gy + i * gh / 5); X.lineTo(gx + gw, gy + i * gh / 5); X.stroke(); }
    kcap('PITCH', gx + 40, gy - 30, GR, 1, 22);
    const C = [[0.92, 0.92], [0.45, 0.95], [0.62, 0.62], [0.32, 0.05], [0.18, 0.5], [0.3, 0.3]]; // start/end pitch (0 low .. 1 high)
    const hi = t > s(7) ? Math.min(5, Math.floor(lin(t, s(7) + 0.2, e(7)) * 6)) : -1;
    C.forEach(([a, b], i) => { const t0 = ph(6, 3) + i * 0.12; const k = eo(lin(t, t0, t0 + 0.5)); if (k <= 0) return;
      const col = hi === -1 ? [OR, BL, CR, OR, BL, CR][i] : (i === hi ? OR : 'rgba(255,255,255,0.18)'); X.strokeStyle = col; X.lineWidth = i === hi ? 20 : 12; X.lineCap = 'round'; X.beginPath();
      const x0 = gx + 30 + i * 145, x1 = x0 + 120; for (let j = 0; j <= 20; j++) { const u = j / 20 * k; const y = gy + gh * (1 - mix(a, b, u * u * (3 - 2 * u) * 0.6 + u * 0.4)); const x = mix(x0, x1, u); j ? X.lineTo(x, y) : X.moveTo(x, y); } X.stroke();
      X.font = '700 88px "Noto Sans CJK JP"'; X.fillStyle = i === hi || hi === -1 ? WH : 'rgba(255,255,255,0.3)'; X.textAlign = 'center'; X.fillText(SI[i][0], x0 + 60, gy + gh + 100);
      X.font = KM(24); X.fillText(SI[i][1], x0 + 60, gy + gh + 170); });
    if (t < s(7)) kin(t, ph(6, 3), 'SIX TONES.', 540, 400, KF(900, 150), WH, 'snap');
    else { kin(t, s(7), 'SAME "SI".', 540, 360, KF(900, 120), WH, 'rise'); const w = hi >= 0 ? SI[hi][1] : ''; if (hi >= 0) { const tt = s(7) + 0.2 + hi * (e(7) - s(7) - 0.2) / 6; kin(t, tt, '= ' + w, 540, 500, KF(900, 110), OR, 'snap', { max: 980 }); } }
  }
  function mandarin(t) {
    if (t < ph(8, 2) - 0.05) return numeral(t, T2, 2, OR, 'MANDARIN', ph(8, 1));
    kcard(K);
    if (t < ph(8, 4) - 0.05) {
      kin(t, ph(8, 2), 'FOUR TONES.', 540, 380, KF(900, 140), WH, 'snap');
      [['mā', 'MOTHER'], ['má', 'HEMP'], ['mǎ', 'HORSE'], ['mà', 'SCOLD']].forEach(([w, m], i) => { const t0 = ph(8, 2) + 0.1 + i * 0.15; if (t < t0) return; const q = ksp(t, t0, 0.45);
        const y = 700 + i * 250; X.save(); X.translate(540 + (1 - q) * (i % 2 ? 700 : -700), y); X.fillStyle = [OR, CR, BL, CR][i]; rr(-400, -100, 800, 200, 24); X.fill();
        X.font = KF(900, 130); X.fillStyle = kink([OR, CR, BL, CR][i]); X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(w, -350, 0); X.font = KM(30); X.textAlign = 'right'; X.fillText(m, 350, 0); X.restore(); });
    } else { // thousands of characters: tiles multiply
      const CH = '的一是不了人我在有他这中大来上个国到说们为子和你地出会时要就可也得里后自以家年看能过下天对生小么心多都然好学用还起没当只看见经头'.split('');
      const k = lin(t, ph(8, 4), e(8) + 0.2); const n = Math.min(14, Math.floor(1 + eo(k) * 14)); const ts = W / n;
      for (let r = 0; r < Math.ceil(H / ts); r++) for (let c = 0; c < n; c++) { const i = r * n + c; X.fillStyle = (i * 7) % 11 === 0 ? OR : (i * 3) % 13 === 0 ? BL : '#1c1918'; X.fillRect(c * ts + 1, r * ts + 1, ts - 2, ts - 2);
        if (ts > 22) { X.font = '700 ' + Math.floor(ts * 0.6) + 'px "Noto Sans CJK JP"'; X.fillStyle = WH; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(CH[i % CH.length], c * ts + ts / 2, r * ts + ts / 2); } }
      X.fillStyle = 'rgba(11,10,10,0.85)'; X.fillRect(0, 760, W, 400);
      kword(Math.round(eo(k) * 3000).toLocaleString('en') + (k >= 1 ? '+' : ''), 540, 900, KF(900, 200), WH, null, {}); kin(t, ph(8, 4), 'CHARACTERS TO READ.', 540, 1060, KF(900, 76), OR, 'rise', { max: 980 });
    }
  }
  function japanese(t) {
    if (t < s(10) - 0.05) return numeral(t, T1, 1, K, 'JAPANESE', ph(9, 1));
    kcard(K);
    if (t < ph(10, 2) - 0.05) { // three writing systems as three stripes
      kin(t, s(10), 'THREE WRITING SYSTEMS.', 540, 360, KF(900, 84), WH, 'rise', { max: 980 });
      [['ひらがな', 'HIRAGANA', OR], ['カタカナ', 'KATAKANA', BL], ['漢字', 'KANJI', CR]].forEach(([w, lab, c], i) => { const t0 = s(10) + 0.1 + i * 0.2; const q = ksp(t, t0, 0.5); if (t < t0) return;
        X.save(); X.translate((1 - q) * (i % 2 ? W : -W), 0); X.fillStyle = c; X.fillRect(0, 560 + i * 380, W, 340); X.font = '700 190px "Noto Sans CJK JP"'; X.fillStyle = kink(c); X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(w, 540, 720 + i * 380); X.font = KM(26); X.fillText(lab, 540, 850 + i * 380); X.restore(); });
    } else { // the same word, three people
      kin(t, ph(10, 2), 'IT DEPENDS WHO', 540, 360, KF(900, 100), WH, 'rise', { max: 980 }); kin(t, ph(10, 3), "YOU'RE TALKING TO.", 540, 480, KF(900, 88), OR, 'rise', { max: 980 });
      [['食べる?', 'TO A FRIEND', CR], ['食べますか?', 'TO A STRANGER', BL], ['召し上がりますか?', 'TO YOUR BOSS', OR]].forEach(([w, lab, c], i) => { const t0 = ph(10, 2) + 0.2 + i * 0.4; const q = ksp(t, t0, 0.45); if (t < t0) return;
        X.save(); X.translate(540, 820 + i * 300); X.scale(mix(0.3, 1, Math.min(1, q)), mix(0.3, 1, Math.min(1, q))); X.fillStyle = c; rr(-440, -120, 880, 240, 26); X.fill(); X.font = '700 96px "Noto Sans CJK JP"'; X.fillStyle = kink(c); X.textAlign = 'center'; X.textBaseline = 'middle'; const tw = X.measureText(w).width; if (tw > 800) X.font = '700 ' + Math.floor(96 * 800 / tw) + 'px "Noto Sans CJK JP"'; X.fillText(w, 0, -20); X.font = KM(24); X.fillText(lab + ' · "WILL YOU EAT?"', 0, 75); X.restore(); });
    }
  }
  function hours(t) {
    kcard(K); const k = eo(lin(t, TH + 0.2, ph(11, 2))); const n = Math.round(k * 2200);
    X.strokeStyle = 'rgba(255,255,255,0.12)'; X.lineWidth = 24; X.beginPath(); X.arc(540, 960, 380, 0, 7); X.stroke(); X.strokeStyle = OR; X.lineCap = 'butt'; X.beginPath(); X.arc(540, 960, 380, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); X.stroke();
    kword(n.toLocaleString('en'), 540, 940, KF(900, 230), WH, null, { max: 700 }); kcap('CLASS HOURS · EACH', 540, 1080, OR, 1, 30);
    kin(t, TH + 0.05, 'EACH ONE:', 540, 360, KF(900, 110), WH, 'rise');
    if (t > ph(11, 2)) kin(t, ph(11, 2), '≈ 88 WEEKS, FULL TIME.', 540, 1560, KF(900, 70), CR, 'rise', { max: 980 });
  }
  function hardNo(t) {
    const no = t >= ph(12, 2) - 0.05; kcard(no ? OR : K);
    if (!no) { kin(t, TY, 'HARD?', 540, 760, KF(900, 220), WH, 'snap'); if (t > ph(12, 1)) kin(t, ph(12, 1), 'YES.', 540, 1000, KF(900, 220), OR, 'drop'); }
    else { kin(t, ph(12, 2), 'IMPOSSIBLE?', 540, 760, KF(900, 160), K, 'snap', { max: 980 }); if (t > ph(12, 3)) { const q = ksp(t, ph(12, 3), 0.35, 0.3, 18); X.save(); X.translate(540, 1050); X.scale(mix(3, 1, q), mix(3, 1, q)); X.rotate(-0.08); kword('NO.', 0, 0, KF(900, 360), WH, null, {}); X.restore(); } }
  }
  function allFive(t) {
    kcard(K);
    ['ARABIC', 'KOREAN', 'CANTONESE', 'MANDARIN', 'JAPANESE'].forEach((w, i) => { const t0 = TA + i * 0.1; const q = ksp(t, t0, 0.45); if (t < t0) return; const c = [OR, BL, CR, OR, BL][i];
      X.save(); X.translate(540 + (1 - q) * (i % 2 ? 900 : -900), 560 + i * 170); X.fillStyle = c; rr(-420, -70, 840, 140, 20); X.fill(); X.font = KF(900, 80); X.fillStyle = kink(c); X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(w, 0, 4); X.restore(); });
    if (t > ph(13, 1)) kin(t, ph(13, 1), 'ALL ON BORDERLESS.', 540, 1520, KF(900, 90), WH, 'rise', { max: 980 });
  }
  window.SCENE = {
    frame(t) {
      X.save();
      const seq = [[0, intro], [T5, arabic], [T4, korean], [T3, cantonese], [T2, mandarin], [T1, japanese], [TH, hours], [TY, hardNo], [TA, allFive], [tEnd, null]];
      let i = 0; for (let j = 0; j < seq.length; j++) if (t >= seq[j][0]) i = j;
      const [t0, fn] = seq[i]; const prev = i > 0 ? seq[i - 1][1] : null;
      if (!fn) kend(t, tEnd, 'All five. And 69 more.');
      else if (prev && t < t0 + 0.32 && [T5, T4, T3, T2, T1].includes(t0)) kTiles((t - t0) / 0.32, () => prev(t0 - 0.01), () => fn(t), { ox: 540, oy: 820 });
      else if (prev && t < t0 + 0.3) kStripes((t - t0) / 0.3, () => prev(t0 - 0.01), () => fn(t));
      else fn(t);
      kflash(t, [T5, T4, T3, T2, T1, TH, TY, TA, tEnd]);
      const light = (t >= T3 && t < ph(6, 3) - 0.05) || (t >= ph(12, 2) - 0.05 && t < TA);
      khud(t, SEC, { title: 'BORDERLESS — FSI LIST', right: 'FSI · CATEGORY IV', dur: DUR, col: light ? 'rgba(11,10,10,0.55)' : 'rgba(255,255,255,0.55)' });
      X.restore();
      grain(t, 0.035);
    },
  };
})();
