// 5C · "Your language app has never been to your job" — sterile flashcards vs. the sentences real life throws at you.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('5c');
  const s = (n) => L[n].start, e = (n) => L[n].end, w = (n, word) => wt(L, n, word);
  const END = e(10) + 0.2, DUR = END + 2.6; window.DURATION = DUR;
  const GREY = '#dcd9d3', GREY2 = '#c4c0b8', GINK = '#8c877e';
  const tJob = w(1, 'job'), tShift = w(9, 'shift'), tBoiler = w(9, 'boiler'), tMil = w(9, 'future');
  const cues = [['whoosh', 0.05, 0.5], ['boing', tJob - 0.05, 0.6], ['impact', tJob, 0.5]];
  [2, 4, 6].forEach((n) => cues.push(['ding', s(n) + 0.1, 0.35], ['correct', e(n) - 0.15, 0.4]));
  [3, 5, 7].forEach((n) => cues.push(['scratch', s(n) - 0.12, 0.45], ['impact', s(n) - 0.05, 0.6], ['plop', s(n) + 0.9, 0.6], ['gasp', e(n) + 0.05, 0.35]));
  cues.push(['wahwah', e(7) + 0.1, 0.35], ['whoosh', s(8) - 0.1, 0.7], ['plop', s(8) + 0.2, 0.6], ['click', s(8) + 1.0, 0.6], ['click', s(8) + 1.3, 0.6], ['click', s(8) + 1.6, 0.6], ['impact', w(8, 'first'), 0.6],
    ['whoosh', tShift - 0.1, 0.6], ['pop', tShift, 0.6], ['whoosh', tBoiler - 0.1, 0.6], ['pop', tBoiler, 0.6], ['whoosh', tMil - 0.1, 0.6], ['pop', tMil, 0.6], ['impact', w(10, 'of your'), 0.6], ['whoosh', e(10), 0.6], ['coin', e(10) + 0.15, 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const hits = [tJob, s(3) - 0.05, s(5) - 0.05, s(7) - 0.05, w(8, 'first')];
  const beats = [s(1), tJob, ...[2, 3, 4, 5, 6, 7, 8].map(s), ...[2, 3, 4, 5, 6, 7].map((n) => L[n].phrases[1] ?? s(n) + 1), tShift, tBoiler, tMil];
  const talking = (n, t, a, b) => (t >= a && t <= b ? 0.35 + 0.65 * Math.abs(Math.sin((t - a) * 15)) : 0);

  // ---------- the flashcard world (sterile, grey) ----------
  function greyWorld(t) { X.fillStyle = GREY; X.fillRect(0, 0, W, H); X.fillStyle = 'rgba(255,255,255,0.25)'; for (let i = 0; i < 9; i++) { X.beginPath(); X.arc(hash(i) * W, hash(i + 4) * H, 120 + hash(i + 9) * 160, 0, 7); X.fill(); } }
  function flashcard(t, n, text, art) {
    greyWorld(t);
    const t0 = s(n), k = back(lin(t, t0 - 0.05, t0 + 0.25), 1.8);
    txt('IT TEACHES YOU:', 540, 300, I5(900, 66), GINK, { a: cl((t - t0) * 5) });
    X.save(); X.translate(540, 1030); X.scale(k, k); X.rotate(Math.sin(t * 1.3) * 0.01);
    X.fillStyle = 'rgba(0,0,0,0.12)'; rr(-392, -452, 800, 920, 46); X.fill(); X.fillStyle = '#fff'; rr(-400, -470, 800, 920, 46); X.fill();
    X.save(); X.translate(0, -140); art(t); X.restore();
    const ta = L[n].phrases[1] ?? t0 + 1; if (t > ta - 0.1) txt(text, 0, 200, '400 66px Georgia, serif', '#55524c');
    // generic praise bar
    if (t > e(n) - 0.2) { const p = back(lin(t, e(n) - 0.2, e(n) + 0.1), 2); X.save(); X.translate(0, 360); X.scale(p, p); X.fillStyle = '#9bbf8a'; rr(-300, -50, 600, 100, 50); X.fill(); txt('Correct! +10', 0, 2, I5(800, 48), '#fff'); X.restore(); }
    X.restore();
  }
  const artApple = () => { X.fillStyle = '#d24a3c'; X.beginPath(); X.arc(-70, 20, 130, 0, 7); X.arc(70, 20, 130, 0, 7); X.fill(); X.fillStyle = '#6b4a2e'; X.fillRect(-8, -150, 16, 70); X.fillStyle = '#6fae4f'; X.beginPath(); X.ellipse(50, -130, 60, 26, -0.4, 0, 7); X.fill(); X.fillStyle = 'rgba(255,255,255,0.4)'; X.beginPath(); X.ellipse(-110, -20, 26, 50, -0.4, 0, 7); X.fill(); };
  const artCat = (t) => { X.fillStyle = '#e59a4c'; X.beginPath(); X.ellipse(-40, 60, 170, 110, 0, 0, 7); X.fill(); X.beginPath(); X.arc(-200, -40, 90, 0, 7); X.fill();
    X.beginPath(); X.moveTo(-270, -100); X.lineTo(-250, -190); X.lineTo(-200, -120); X.moveTo(-190, -125); X.lineTo(-140, -190); X.lineTo(-130, -100); X.fill();
    X.fillStyle = '#2b2620'; X.beginPath(); X.arc(-230, -50, 10, 0, 7); X.arc(-170, -50, 10, 0, 7); X.fill(); X.strokeStyle = '#e59a4c'; X.lineWidth = 26; X.lineCap = 'round'; X.beginPath(); X.moveTo(120, 50); X.quadraticCurveTo(220, -20 + Math.sin(t * 5) * 20, 180, -120); X.stroke();
    X.fillStyle = '#6fa3d8'; X.beginPath(); X.ellipse(-250, 140, 110, 34, 0, 0, 7); X.fill(); X.fillStyle = '#fff'; X.beginPath(); X.ellipse(-250, 128, 90, 18, 0, 0, 7); X.fill(); };
  const artBoy = () => { X.strokeStyle = '#55524c'; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.arc(0, -140, 70, 0, 7); X.moveTo(0, -70); X.lineTo(0, 100); X.moveTo(0, -20); X.lineTo(-110, 40); X.moveTo(0, -20); X.lineTo(110, 40); X.moveTo(0, 100); X.lineTo(-80, 220); X.moveTo(0, 100); X.lineTo(80, 220); X.stroke(); };

  const WHO = { boss: { hair: 'short', hairCol: '#5a4030', glasses: true, shirt: '#ffffff', tie: P5.red, skin: '#e8b48e' }, landlord: { hair: 'bald', hairCol: '#4a3426', beard: true, shirt: '#3d4a5c', skin: '#d9a07a' }, mum: { hair: 'bun', hairCol: '#9a948c', glasses: true, shirt: '#2f4f73', cheeks: true, skin: '#e3a887' } };
  // ---------- real life (warm, loud) ----------
  function realSet(t, kind) {
    const col = { boss: '#2f6f73', landlord: '#6b4fa0', mum: '#a8512b' }[kind];
    X.fillStyle = col; X.fillRect(0, 0, W, H);
    X.fillStyle = 'rgba(255,255,255,0.06)'; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * 0.15; X.beginPath(); X.moveTo(540, 900); X.arc(540, 900, 1600, a, a + 0.16); X.closePath(); X.fill(); }
    X.fillStyle = 'rgba(0,0,0,0.18)'; X.fillRect(0, 1480, W, H - 1480);
  }
  function realLife(t, n, kind, title, foreign, english) {
    realSet(t, kind); const t0 = s(n), ta = L[n].phrases[1] ?? t0 + 1;
    const enter = back(lin(t, t0 - 0.05, t0 + 0.3), 1.6);
    hd(t, t0, title, 540, 230, 92, '#fff', { shadow: 'rgba(0,0,0,0.15)', max: 960 });
    // props
    if (kind === 'boss') { X.save(); X.translate(850, 800); X.rotate(0.06); X.scale(0.8, 0.8); X.fillStyle = '#fff'; rr(-130, -150, 260, 300, 22); X.fill(); X.fillStyle = P5.red; rr(-130, -150, 260, 80, [22, 22, 0, 0]); X.fill(); txt('SAT', 0, -110, I5(900, 50), '#fff'); txt('14', 0, 40, I5(900, 140), P5.ink); X.restore(); }
    if (kind === 'landlord') { X.save(); X.translate(830, 760); X.fillStyle = '#e8e4dc'; rr(-120, -220, 240, 380, 26); X.fill(); X.fillStyle = '#c8c2b6'; X.beginPath(); X.arc(0, -40, 60, 0, 7); X.fill(); X.fillStyle = P5.red; X.beginPath(); X.arc(0, -40, 18, 0, 7); X.fill();
      for (let i = 0; i < 5; i++) { const p = ((t * 0.9 + i / 5) % 1); X.fillStyle = `rgba(255,255,255,${0.5 * (1 - p)})`; X.beginPath(); X.arc(Math.sin(i * 2 + t) * 40, -230 - p * 300, 40 + p * 60, 0, 7); X.fill(); } X.restore(); }
    if (kind === 'mum') { X.fillStyle = '#7a3a1e'; X.fillRect(0, 1380, W, 120); X.fillStyle = '#fff'; X.beginPath(); X.ellipse(300, 1390, 130, 30, 0, 0, 7); X.fill(); X.ellipse(780, 1390, 130, 30, 0, 0, 7); X.fill();
      X.fillStyle = '#e8c06a'; X.beginPath(); X.ellipse(300, 1380, 80, 20, 0, 0, 7); X.fill(); }
    // the speaker
    const who = WHO[kind]; const _unused = { boss: { hair: 'short', hairCol: '#5a4030', glasses: true, shirt: '#ffffff', tie: P5.red, skin: '#e8b48e' }, landlord: { hair: 'bald', hairCol: '#4a3426', beard: true, shirt: '#3d4a5c', skin: '#d9a07a' }, mum: { hair: 'bun', hairCol: '#9a948c', glasses: true, shirt: '#2f4f73', cheeks: true, skin: '#e3a887' } }[kind];
    person(t, mix(-300, 360, enter), 1100, 1.25, { ...who, talk: talking(n, t, ta - 0.05, e(n)), mood: 'happy', brows: kind === 'mum' ? 'up' : null, lookX: 1, seed: n });
    // you: the mascot, slowly melting
    const sw = lin(t, ta, e(n) + 0.4);
    mascot(t, mix(W + 300, 860, enter), 1330, 0.95, { mood: sw > 0.3 ? 'worried' : 'o', wide: true, sweat: sw > 0.2, lookX: -1, seed: n + 1, squash: Math.max(0, 1 - (t - ta) * 4) * 0.6 });
    { const ya = eo(lin(t, t0 + 0.2, t0 + 0.4)); if (ya > 0) chip('you', mix(W + 300, 860, enter), 1110, 30, '#fff', P5.ink, ya, ya); }
    if (t > ta - 0.1) { bub(t, ta - 0.1, 99, foreign, 500, 470, { size: 54, maxw: 900, tail: -0.2 });
      const sa = eo(lin(t, ta + 0.25, ta + 0.5)); X.save(); X.globalAlpha = sa; X.fillStyle = 'rgba(0,0,0,0.55)'; rr(110, 1600, 860, 100, 24); X.fill(); txt(english, 540, 1652, I5(700, 42), '#fff'); X.restore(); }
    if (t > e(n) - 0.05) { const p = back(lin(t, e(n) - 0.05, e(n) + 0.2), 2.2); X.save(); X.translate(880, 1050); X.scale(p, p); txt('?!', 0, 0, I5(900, 150), '#fff', { stroke: P5.ink, sw: 14 }); X.restore(); }
  }

  window.SCENE = {
    frame(t) {
      X.save(); camera(t, hits, [], 18); punch5(t, beats, 0.022, 0.14);
      if (t < s(2) - 0.05) { // hook: the app is not allowed in
        bg5(t);
        hd(t, s(1), 'YOUR LANGUAGE APP', 540, 250, 84, P5.ink); hd(t, L[1].phrases[1] ?? s(1) + 0.9, 'HAS NEVER BEEN', 540, 360, 84, P5.ink); hd(t, tJob, 'TO YOUR JOB.', 540, 480, 110, P5.acc, { from: 1.3 }); X.save(); X.translate(540, 1250); X.scale(1.2, 1.2); X.translate(-540, -1180);
        // the staff door
        X.fillStyle = '#6b4a2e'; rr(560, 760, 400, 860, 14); X.fill(); X.fillStyle = '#7d5a3a'; rr(600, 820, 320, 300, 10); X.fill(); rr(600, 1170, 320, 400, 10); X.fill();
        X.fillStyle = '#f6efe2'; rr(640, 900, 240, 110, 12); X.fill(); txt('STAFF', 760, 935, I5(900, 40), P5.ink); txt('ONLY', 760, 980, I5(900, 40), P5.red); X.fillStyle = P5.gold; X.beginPath(); X.arc(910, 1230, 18, 0, 7); X.fill();
        // the generic app phone hops towards it and bounces off
        const hop = lin(t, 0.2, tJob), bounce = t > tJob ? eo(lin(t, tJob, tJob + 0.5)) : 0;
        const px = mix(160, 450, eio(hop)) - bounce * 180, py = 1300 - Math.abs(Math.sin(hop * Math.PI * 3)) * 120 * (1 - bounce) - Math.sin(bounce * Math.PI) * 140;
        X.save(); X.translate(px, py); X.rotate(-bounce * 0.4 + Math.sin(t * 9) * 0.03);
        X.fillStyle = '#1b1814'; rr(-110, -220, 220, 440, 34); X.fill(); X.fillStyle = GREY; rr(-98, -206, 196, 412, 26); X.fill();
        X.fillStyle = '#fff'; rr(-76, -150, 152, 180, 16); X.fill(); txt('apple', 0, -60, '400 30px Georgia, serif', '#55524c'); X.fillStyle = '#9bbf8a'; rr(-76, 70, 152, 50, 25); X.fill();
        X.restore();
        if (t > tJob) { X.save(); X.translate(px + 40, py - 290); X.scale(back(lin(t, tJob, tJob + 0.2), 2), back(lin(t, tJob, tJob + 0.2), 2)); txt('!', 0, 0, I5(900, 110), P5.red); X.restore(); }
        X.restore();
      } else if (t < s(3) - 0.12) flashcard(t, 2, 'The apple is red.', artApple);
      else if (t < s(4) - 0.05) realLife(t, 3, 'boss', 'YOUR BOSS:', 'Kannst du Samstag übernehmen?', 'Can you cover Saturday?');
      else if (t < s(5) - 0.12) flashcard(t, 4, 'The cat drinks milk.', artCat);
      else if (t < s(6) - 0.05) realLife(t, 5, 'landlord', 'YOUR LANDLORD:', 'La chaudière est encore en panne.', "The boiler's broken. Again.");
      else if (t < s(7) - 0.12) flashcard(t, 6, 'I am a boy.', artBoy);
      else if (t < s(8) - 0.1) realLife(t, 7, 'mum', "YOUR PARTNER'S MUM:", '¿Y la boda para cuándo?', "So… when's the wedding?");
      else if (t < tShift - 0.1) { // Borderless asks first
        bg5(t);
        hd(t, s(8), 'BORDERLESS ASKS', 540, 250, 96, P5.ink); hd(t, L[8].phrases[0] + 0.5, 'WHY.', 540, 370, 120, P5.acc); hd(t, w(8, 'first'), 'FIRST.', 540, 1690, 130, P5.ink);
        const k = back(lin(t, s(8), s(8) + 0.3), 1.6); X.save(); X.translate(540, 1050); X.scale(k, k);
        card(-430, -500, 860, 1000, {}); bub(t, s(8) + 0.2, 99, 'Why are you learning?', 0, -360, { size: 54, tail: -0.3 });
        [['Work: café shifts', s(8) + 1.0], ['My flat (and its boiler)', s(8) + 1.3], ["My partner's family", s(8) + 1.6]].forEach(([o, t0], i) => {
          const sel = t > t0; const y = -150 + i * 170; X.fillStyle = sel ? 'rgba(168,81,43,0.12)' : '#f3ede2'; rr(-360, y - 60, 720, 120, 30); X.fill(); if (sel) { X.strokeStyle = P5.acc; X.lineWidth = 5; X.stroke(); }
          X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = I5(700, 42); X.fillStyle = P5.ink; X.fillText(o, -300, y);
          X.fillStyle = sel ? P5.acc : '#fff'; X.beginPath(); X.arc(300, y, 30, 0, 7); X.fill(); if (sel) { X.strokeStyle = '#fff'; X.lineWidth = 7; X.lineCap = 'round'; X.beginPath(); X.moveTo(286, y); X.lineTo(297, y + 12); X.lineTo(316, y - 10); X.stroke(); } });
        X.restore();
      } else if (t < s(10) - 0.05) { // every lesson is about your life
        bg5(t);
        hd(t, tShift - 0.1, 'EVERY LESSON', 540, 230, 100, P5.ink);
        const word = t < tBoiler ? 'YOUR SHIFT.' : t < tMil ? 'YOUR BOILER.' : 'YOUR FUTURE\nMOTHER-IN-LAW.';
        hd(t, t < tBoiler ? tShift : t < tMil ? tBoiler : tMil, word, 540, t < tMil ? 360 : 400, t < tMil ? 100 : 86, P5.acc, { from: 1.4 });
        const CARDS = [[tShift, 'GERMAN · LESSON 12', 'Covering a\nSaturday shift', ['Kannst du…? Ja, kann ich.', 'Days, times, swapping shifts.']],
          [tBoiler, 'FRENCH · LESSON 9', 'Reporting\na broken boiler', ['La chaudière ne marche pas.', 'Calling, explaining, following up.']],
          [tMil, 'SPANISH · LESSON 21', 'Dinner with\nthe in-laws', ['¡Qué rica está la paella!', 'Compliments, questions, dodging.']]];
        CARDS.forEach(([t0, k, ti, ls], i) => { if (t < t0) return; const p = back(lin(t, t0, t0 + 0.3), 1.5); const later = CARDS.filter((c) => t >= c[0]).length - 1 - i;
          X.save(); X.translate(mix(1400, 540 - later * 40, p), 1150 - later * 70); X.rotate(-later * 0.05 + (1 - p) * 0.3); X.scale(1 - later * 0.06, 1 - later * 0.06);
          lessonCard(t, 0, 0, 860, 900, { kicker: k, title: ti, ts: 76, lines: ls, bs: 38, prog: 0.0 + 0.3 * i });
          X.save(); X.beginPath(); X.arc(320, -330, 78, 0, 7); X.fillStyle = ['#2f6f73', '#6b4fa0', P5.acc][i]; X.fill(); X.clip(); person(t, 320, -290, 0.45, { ...WHO[['boss', 'landlord', 'mum'][i]], mood: 'happy' }); X.restore();
          X.restore(); });
      } else { bg5(t); hd(t, s(10), 'LEARN THE LANGUAGE', 540, 360, 92, P5.ink); hd(t, w(10, 'of your'), 'OF YOUR LIFE.', 540, 490, 130, P5.acc);
        ['boss', 'landlord', 'mum'].forEach((k, i) => { const p = back(lin(t, s(10) + 0.1 + i * 0.12, s(10) + 0.4 + i * 0.12), 2); const x = 220 + i * 320; X.save(); X.translate(x, 900); X.scale(p, p);
          X.beginPath(); X.arc(0, 0, 130, 0, 7); X.fillStyle = ['#2f6f73', '#6b4fa0', P5.acc][i]; X.fill(); X.clip(); person(t, 0, 60, 0.75, { ...WHO[k], mood: 'happy' }); X.restore(); });
        mascot(t, 540, 1400, 1.2, { mood: 'happy', armsUp: true, seed: 5, squash: Math.max(0, 1 - (t - w(10, 'of your')) * 4) }); }
      endCard(t, e(10) + 0.1, 'Learn the language of your life.', { tagAt: 0.3 });
      X.restore();
      grain(t, 0.035);
    },
  };
})();
