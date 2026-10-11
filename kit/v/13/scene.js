// 13 · "Sound like a local in Spain" — SUNNY POSTER + FLASHCARDS · summer with a dry joke per word
window.ready = (async () => {
  await loadFonts();
  await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('13');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const RED = '#e63b2e', YEL = '#ffcc33', CREAM = '#fff4dc', INK = '#2b1a12', ORG = '#ff8a2a';
  const END = e(8) + 0.2, DUR = END + 1.3; window.DURATION = DUR;
  const BG = [[0, RED], [s(2), YEL], [s(3), RED], [s(4), YEL], [s(5), RED], [s(6), YEL], [s(7), RED], [s(8), YEL]];
  const bgAt = (t) => { let c = BG[0][1]; BG.forEach((b) => { if (t >= b[0]) c = b[1]; }); return c; };
  function sun(t, cx, cy, r, col, rays = 18) {
    X.save(); X.translate(cx, cy); X.rotate(t * 0.25); X.fillStyle = col;
    for (let i = 0; i < rays; i++) { X.rotate((Math.PI * 2) / rays); X.beginPath(); X.moveTo(-r * 0.12, r * 1.05); X.lineTo(r * 0.12, r * 1.05); X.lineTo(0, r * 1.6); X.fill(); }
    X.beginPath(); X.arc(0, 0, r, 0, 7); X.fill(); X.restore();
  }
  // flashcard: flips in around Y axis
  function card(t, t0, word, sub, col) {
    // the flashcard turns over in 3D: back first, then the word
    const k = lin(t, t0, t0 + 0.55); const ang = Math.PI * (1 - back(k, 1.3));
    const wob = Math.sin((t - t0) * 3) * 0.02;
    X.save(); X.translate(W / 2, 640); X.rotate(-0.03 + wob);
    flipPlane(0, 0, 880, 580, ang, () => { X.translate(440, 290);
      X.fillStyle = CREAM; rr(-420, -280, 840, 540, 40); X.fill(); X.strokeStyle = INK; X.lineWidth = 6; X.stroke();
      X.strokeStyle = 'rgba(230,59,46,0.25)'; X.lineWidth = 3; for (let i = 0; i < 6; i++) { X.beginPath(); X.moveTo(-380, -150 + i * 70); X.lineTo(380, -150 + i * 70); X.stroke(); }
      X.font = font('serif', 400, 200); const w = X.measureText(word).width; const sz = Math.min(200, 200 * 720 / w);
      txt(word, 0, -10, font('serif', 400, sz), col || RED);
      if (sub) txt(sub, 0, 175, font('caveat', 700, 64), INK);
    }, () => { X.translate(440, 290);
      X.fillStyle = ORG; rr(-420, -280, 840, 540, 40); X.fill(); X.strokeStyle = INK; X.lineWidth = 6; X.stroke();
      sun(0, 0, 0, 90, YEL, 16); txt('?', 0, 8, font('serif', 400, 150), INK);
    }, { key: 'card13', persp: 1700 });
    X.restore();
  }
  function chip(t, t0, text, x, y, bg, fg = INK, rot = 0, size = 64) {
    if (t < t0) return; const k = back(lin(t, t0, t0 + 0.22), 2.3);
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(k, k); X.font = font('rubik', 900, size); const w = X.measureText(text).width + size;
    X.fillStyle = INK; rr(-w / 2 + 8, -size * 0.75 + 10, w, size * 1.5, size * 0.75); X.fill();
    X.fillStyle = bg; rr(-w / 2, -size * 0.75, w, size * 1.5, size * 0.75); X.fill(); X.lineWidth = 5; X.strokeStyle = INK; X.stroke();
    txt(text, 0, 3, font('rubik', 900, size), fg); X.restore();
  }
  function emo(t, t0, e, x, y, size, rot = 0) { if (t < t0) return; const k = back(lin(t, t0, t0 + 0.25), 2.5); X.save(); X.translate(x, y); X.rotate(rot + Math.sin((t - t0) * 5) * 0.06); X.scale(k, k); txt(e, 0, 0, font('inter', 400, size), '#000'); X.restore(); }
  function cross(t, t0, x, y, r) { if (t < t0) return; const k = eo(lin(t, t0, t0 + 0.2)); X.save(); X.strokeStyle = RED; X.lineWidth = 22; X.lineCap = 'round';
    X.beginPath(); X.moveTo(x - r, y - r); X.lineTo(x - r + 2 * r * k, y - r + 2 * r * k); X.stroke(); if (k >= 1) { const k2 = eo(lin(t, t0 + 0.2, t0 + 0.35)); X.beginPath(); X.moveTo(x + r, y - r); X.lineTo(x + r - 2 * r * k2, y - r + 2 * r * k2); X.stroke(); } X.restore(); }
  const cues = [['castanet', 0.05, 0.8], ['whoosh', 0.3, 0.4], ['stamp', p(1, 3) || 2.48, 0.8]];
  [2, 3, 4, 5, 6].forEach((n) => cues.push(['guitar', s(n), 0.9], ['page', s(n), 0.4]));
  cues.push(['pop', p(2, 1), 0.6], ['pop', p(2, 1) + 0.2, 0.6], ['pop', p(2, 1) + 0.4, 0.6]);
  for (let k = 0; k < 12; k++) cues.push(['tick', p(2, 3) + k * 0.12, 0.5]);
  cues.push(['ding', p(2, 3) + 1.45, 0.5], ['pop', p(3, 2), 0.6], ['fail', p(3, 4), 0.4], ['boing', p(3, 5), 0.7], ['pop', p(4, 1), 0.7], ['pop', p(4, 3), 0.7],
    ['pop', p(5, 1), 0.7], ['pop', p(5, 3), 0.7], ['pop', p(5, 5), 0.7], ['gasp', p(6, 1), 0.9], ['impact', p(6, 2), 0.6],
    ['castanet', s(7), 0.7], ['pop', s(7) + 0.4, 0.6], ['pop', s(7) + 0.9, 0.6], ['pop', s(7) + 1.4, 0.6], ['stamp', p(7, 2) || s(7) + 2.4, 1], ['fanfare', p(7, 2) + 0.3 || s(7) + 2.7, 0.5],
    ['castanet', s(8), 0.8], ['castanet', END, 0.8]);
  const PEEKS = [
  { t: p(1, 3), d: 1.0, side: 'R', y: 1730, s: 0.6, mood: 'happy', say: 'Ready?' },
  { t: p(2, 5), d: 1.1, side: 'L', y: 1730, s: 0.6, mood: 'o', say: 'Vale. Vale. Vale.' },
  { t: p(3, 5) + 0.1, d: 1.1, side: 'R', y: 1730, s: 0.6, mood: 'happy', wink: true, say: '¡Tío!' },
  { t: p(4, 1), d: 1.6, side: 'L', y: 1730, s: 0.6, mood: 'happy', acc: ['shades'], say: 'Guay.' },
  { t: p(6, 1), d: 1.4, side: 'R', y: 1730, s: 0.6, mood: 'o', wide: true, say: '¡¿QUÉ?!' },
  { t: p(7, 2) + 0.15, d: 1.3, side: 'L', y: 1730, s: 0.6, mood: 'happy', armsUp: true, say: 'Olé.' },
  { t: s(8) + 0.3, d: 3, side: 'R', y: 1730, s: 0.6, mood: 'happy', wave: true, say: '¡Venga!' },
];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [p(1, 3) || 2.48, p(3, 4), p(6, 1), p(7, 2) || s(7) + 2.4];

  window.SCENE = {
    frame(t) {
      const bg = bgAt(t); X.fillStyle = bg; X.fillRect(0, 0, W, H);
      sun(t, W - 120, 160, 110, bg === RED ? YEL : RED);
      X.fillStyle = 'rgba(255,255,255,0.14)'; for (let i = 0; i < 9; i++) { X.beginPath(); X.arc((i * 170 + t * 30) % 1300 - 100, 1860 + Math.sin(i) * 20, 120, 0, 7); X.fill(); }
      X.save(); camera(t, hits, [s(2), s(3), s(4), s(5), s(6), s(7), s(8)], 16); HOST.pp(t, L);
      if (t < s(2)) {
        const k = eo(lin(t, 0, 0.5)); sun(t, W / 2, mix(1400, 900, k), 260, YEL, 22);
        slam(t, 0.1, 'SOUND LIKE', W / 2, 380, font('serif', 400, 120), CREAM, { shadow: true });
        slam(t, 0.45, 'A LOCAL', W / 2, 520, font('serif', 400, 150), CREAM, {});
        txt('in Spain', W / 2, 900, font('caveat', 700, 120), RED, { a: eo(lin(t, 0.9, 1.2)) });
        if (t > (p(1, 3) || 2.48)) stamp(t, p(1, 3) || 2.48, '5 WORDS', W / 2, 1450, font('rubik', 900, 130), CREAM, -0.08);
      } else if (t < s(3)) {
        card(t, s(2), 'Vale', 'say: BAH-leh', RED);
        chip(t, p(2, 1), 'OKAY', 250, 1080, CREAM, INK, -0.06); chip(t, p(2, 1) + 0.2, 'SURE', 540, 1110, CREAM, INK, 0.04); chip(t, p(2, 1) + 0.4, 'DEAL', 830, 1080, CREAM, INK, -0.03);
        if (t > p(2, 3)) { const n = Math.min(50, Math.max(1, Math.round(1 + 49 * eo(lin(t, p(2, 3), p(2, 3) + 1.45)))));
          txt('vales today:', W / 2, 1330, font('caveat', 700, 80), INK); txt(String(n), W / 2, 1500, font('rubik', 900, 220), CREAM, { stroke: INK, sw: 12 }); }
      } else if (t < s(4)) {
        card(t, s(3), 'Tío · Tía', null, RED);
        if (t > p(3, 2)) { txt('literally:', 300, 1050, font('caveat', 700, 70), CREAM); emo(t, p(3, 2), '👨‍👩‍👧', 300, 1240, 190); txt('uncle / aunt', 300, 1420, font('rubik', 900, 50), CREAM, { a: eo(lin(t, p(3, 2) + 0.2, p(3, 2) + 0.4)) }); }
        cross(t, p(3, 4), 300, 1240, 120);
        if (t > p(3, 5)) { txt('actually:', 780, 1050, font('caveat', 700, 70), CREAM); emo(t, p(3, 5), '🤝', 780, 1240, 190); chip(t, p(3, 5) + 0.1, 'MATE ✓', 780, 1440, YEL, INK, 0.05, 70); }
      } else if (t < s(5)) {
        card(t, s(4), 'Guay', null, RED);
        if (t > p(4, 1)) { emo(t, p(4, 1), '😎', W / 2, 1200, 260); chip(t, p(4, 1) + 0.15, 'COOL', W / 2 + 270, 1080, RED, CREAM, 0.1, 64); }
        if (t > p(4, 3)) chip(t, p(4, 3), 'say: g-WHY', W / 2, 1520, CREAM, RED, -0.04, 90);
      } else if (t < s(6)) {
        card(t, s(5), '¡Venga!', null, RED);
        [[p(5, 1), '🏃', 'COME ON', 200], [p(5, 3), '💃', "LET'S GO", 540], [p(5, 5), '👋', 'BYE?!', 880]].forEach(([t0, em, lab, x], i) => {
          emo(t, t0, em, x, 1220, 170, (i - 1) * 0.08); chip(t, t0 + 0.1, lab, x, 1440, i === 2 ? YEL : CREAM, INK, (i - 1) * 0.05, 46); });
        if (t > p(5, 5)) txt('(somehow, all of them)', W / 2, 1620, font('caveat', 700, 64), CREAM, { a: eo(lin(t, p(5, 5) + 0.2, p(5, 5) + 0.5)) });
      } else if (t < s(7)) {
        card(t, s(6), '¡Qué fuerte!', null, RED);
        if (t > p(6, 1)) { const sh = Math.sin(t * 60) * 6 * (1 - lin(t, p(6, 1), p(6, 1) + 0.5)); X.save(); X.translate(sh, 0); emo(t, p(6, 1), '😱', W / 2, 1230, 300); X.restore();
          chip(t, p(6, 1) + 0.1, 'NO WAY', 220, 1520, CREAM, INK, -0.08, 60); }
        if (t > p(6, 2)) chip(t, p(6, 2), "THAT'S CRAZY", 760, 1560, RED, CREAM, 0.06, 56);
        if (t > p(6, 1)) txt('!!!', 860, 1060, font('rubik', 900, 150), RED, { a: Math.floor(t * 8) % 2 ? 1 : 0.4 });
      } else if (t < s(8)) {
        txt('all five, one sentence:', W / 2, 330, font('caveat', 700, 90), CREAM);
        chip(t, s(7) + 0.4, '¡Venga, tío!', W / 2, 560, CREAM, RED, -0.04, 96);
        chip(t, s(7) + 0.9, '¡Qué fuerte!', W / 2, 790, YEL, INK, 0.03, 96);
        chip(t, s(7) + 1.4, 'Vale, guay.', W / 2, 1020, CREAM, RED, -0.02, 96);
        const tb = p(7, 2) || s(7) + 2.4; if (t > tb) stamp(t, tb, 'MADRILEÑO', W / 2, 1380, font('rubik', 900, 120), CREAM, -0.1);
        if (t > tb + 0.3) txt('(basically)', W / 2, 1560, font('caveat', 700, 80), CREAM, { a: eo(lin(t, tb + 0.3, tb + 0.6)) });
      } else {
        sun(t, W / 2, 820, 230, RED, 22);
        coinIn(t, s(8), W / 2, 820, 150);
        slam(t, s(8) + 0.1, 'Borderless', W / 2, 1260, font('inter', 900, 130), INK, {});
        if (t > p(8, 1)) txt('The Spanish people', W / 2, 1420, font('serif', 400, 80), RED, { a: eo(lin(t, p(8, 1), p(8, 1) + 0.3)) });
        if (t > p(8, 3)) txt('actually speak.', W / 2, 1520, font('serif', 400, 80), RED, { a: eo(lin(t, p(8, 3), p(8, 3) + 0.3)) });
      }
      X.restore();
      HOST.peeks(t, PEEKS);
    },
  };
})();
