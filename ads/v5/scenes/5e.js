// 5E · "First day at a job abroad? Four sentences." — useful on its own, save-worthy; Borderless writes day two.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('5e');
  const s = (n) => L[n].start, e = (n) => L[n].end, w = (n, word) => wt(L, n, word), ph = (n, i) => L[n].phrases[i] ?? s(n);
  const END = e(9) + 0.2, DUR = END + 2.4; window.DURATION = DUR;
  const LANGS = ['SPANISH', 'FRENCH', 'GERMAN', 'ITALIAN', 'JAPANESE'];
  const PH = [
    ["I'm new here.", ['Soy nuevo aquí.', 'Je suis nouveau ici.', 'Ich bin neu hier.', 'Sono nuovo qui.', '新人です。']],
    ['Can you show me how?', ['¿Me enseñas cómo se hace?', 'Tu peux me montrer\ncomment faire ?', 'Kannst du mir zeigen,\nwie das geht?', 'Mi fai vedere come si fa?', 'やり方を\n教えてもらえますか？']],
    ['Sorry, a bit slower?', ['¿Puedes hablar más despacio?', 'Tu peux parler\nplus lentement ?', 'Kannst du langsamer\nsprechen?', 'Puoi parlare più piano?', 'もう少しゆっくり\n話してもらえますか？']],
    ['Where does this go?', ['¿Dónde pongo esto?', 'Je mets ça où ?', 'Wo kommt das hin?', 'Dove lo metto?', 'これはどこに\n置きますか？']],
  ];
  const segA = (k) => s(k + 2), segB = (k) => (k < 3 ? s(k + 3) : s(6)) - 0.05;
  const langAt = (k, i) => { const a = ph(k + 2, 1) - 0.1; return a + i * 0.16; };
  const cues = [['whoosh', 0.05, 0.5], ['pop', ph(1, 1), 0.5], ['impact', w(1, 'four sentences'), 0.7], ['hit', ph(1, 2), 0.6], ['page', ph(1, 2) + 0.1, 0.5], ['page', ph(1, 2) + 0.25, 0.5], ['scratch', ph(1, 2) + 0.5, 0.3]];
  PH.forEach((_, k) => { cues.push(['whoosh', segA(k) - 0.1, 0.6], ['pop', segA(k) + 0.05, 0.6]); for (let i = 0; i < 5; i++) cues.push(['pop', langAt(k, i), 0.35]); cues.push(['tick', segB(k) - 0.25, 0.7]); });
  cues.push(['stamp', s(6) + 0.6, 0.8], ['correct', s(6) + 0.65, 0.4], ['whoosh', s(7) - 0.1, 0.7], ['page', s(7) + 0.15, 0.6]);
  for (let t = ph(7, 1); t < ph(7, 1) + 1.2; t += 0.05) cues.push(['type', t, 0.4 + hash(t) * 0.3]);
  cues.push(['pop', ph(7, 2), 0.6], ['pop', ph(7, 3) || w(7, 'level'), 0.6], ['whoosh', s(8) - 0.1, 0.7], ['swell', w(8, 'one course'), 0.35], ['impact', w(8, 'one course'), 0.5], ['coin', s(9), 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const hits = [w(1, 'four sentences'), ph(1, 2), s(6) + 0.6, w(8, 'one course')];
  const beats = [s(1), ph(1, 1), ph(1, 2), ...[2, 3, 4, 5, 6, 7, 8].map(s), ph(7, 1), ph(7, 2), w(8, 'one course'), w(8, 'built')];

  function numDisc(x, y, r, n, k) { X.save(); X.translate(x, y); X.scale(k, k); X.fillStyle = P5.acc; X.beginPath(); X.arc(0, 0, r, 0, 7); X.fill(); txt(String(n), 0, 4, I5(900, r * 1.2), '#fff'); X.restore(); }
  function transCard(t, k) {
    const ent = back(lin(t, segA(k) - 0.05, segA(k) + 0.25), 1.6);
    X.save(); X.translate(540, 830); X.scale(ent, ent); X.translate(-540, -830);
    card(110, 450, 860, 760, {});
    for (let i = 0; i < 5; i++) { const t0 = langAt(k, i); if (t < t0) continue; const p = back(lin(t, t0, t0 + 0.2), 2); const y = 530 + i * 138;
      X.save(); X.translate(mix(140, 0, p), 0); X.globalAlpha *= cl((t - t0) * 6);
      txt(LANGS[i], 170, y, I5(800, 22), P5.acc, { align: 'left', ls: 3 });
      const str = PH[k][1][i].replace('\n', i === 4 ? '' : ' '); X.font = I5(800, 46); const tw = X.measureText(str).width; const sz = Math.min(46, Math.floor(46 * 760 / tw));
      txt(str, 170, y + 52, I5(800, sz), P5.ink, { align: 'left' });
      if (i < 4) { X.fillStyle = P5.line; X.fillRect(170, y + 100, 740, 2); }
      X.restore(); }
    X.restore();
  }
  function checklist(t, upto, y0 = 1400, a = 1) {
    X.save(); X.globalAlpha *= a; card(110, y0, 860, 430, {});
    txt('DAY ONE · SAVE THIS', 540, y0 + 58, I5(800, 28), P5.acc, { ls: 3 });
    PH.forEach(([en], k) => { const done = k < upto, cur = k === upto - 1 || (k === upto && false); const y = y0 + 130 + k * 78;
      X.fillStyle = done ? P5.acc : P5.line; X.beginPath(); X.arc(190, y, 24, 0, 7); X.fill();
      if (done) { X.strokeStyle = '#fff'; X.lineWidth = 6; X.lineCap = 'round'; X.beginPath(); X.moveTo(179, y); X.lineTo(188, y + 9); X.lineTo(203, y - 9); X.stroke(); }
      X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = I5(done ? 800 : 600, 40); X.fillStyle = done ? P5.ink : P5.ink3; X.fillText(en, 240, y + 2); });
    X.restore();
  }
  const props = [
    (t) => { X.fillStyle = '#fff'; rr(-130, -70, 260, 140, 18); X.fill(); X.strokeStyle = P5.acc; X.lineWidth = 6; X.stroke(); txt('HELLO, I AM', 0, -32, I5(800, 22), P5.acc); txt('NEW', 0, 22, I5(900, 64), P5.ink); },
    (t) => { X.strokeStyle = P5.ink; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-70, 40); X.lineTo(10, -40); X.lineTo(10, 0); X.moveTo(10, -40); X.lineTo(-30, -40); X.stroke(); X.fillStyle = P5.acc; X.beginPath(); X.arc(60 + Math.sin(t * 6) * 10, -60, 26, 0, 7); X.fill(); },
    (t) => { X.fillStyle = P5.ink; X.beginPath(); X.ellipse(0, 20, 70, 40, 0, Math.PI, 0); X.fill(); X.fillStyle = '#c9a36b'; X.beginPath(); X.arc(10, -20, 50, 0, 7); X.fill(); X.strokeStyle = '#8a6a3a'; X.lineWidth = 6; X.beginPath(); X.arc(10, -20, 30, 0, 5); X.stroke(); X.fillStyle = P5.ink; X.beginPath(); X.arc(-60, 0, 8, 0, 7); X.fill(); },
    (t) => { X.fillStyle = '#c99a5b'; rr(-90, -60, 180, 130, 10); X.fill(); X.fillStyle = '#b5844a'; X.fillRect(-90, -60, 180, 30); X.fillStyle = '#e8d3a6'; X.fillRect(-20, -60, 40, 130); txt('?', 110, -60, I5(900, 90), P5.acc); },
  ];

  window.SCENE = {
    frame(t) {
      X.save(); camera(t, hits, [], 14); punch5(t, beats, 0.02, 0.14);
      bg5(t);
      if (t < segA(0) - 0.05) { // hook
        hd(t, s(1), 'FIRST DAY AT A', 540, 250, 92, P5.ink); hd(t, s(1) + 0.45, 'JOB ABROAD?', 540, 360, 116, P5.acc);
        if (t < w(1, 'four sentences') - 0.05) { mascot(t, 540, 1100, 1.8, { mood: 'o', wide: true, sweat: true, seed: 1, extra: () => { X.save(); X.translate(30, 10); X.scale(0.5, 0.5); props[0](t); X.restore(); } }); }
        else {
          extrudeSlam(t, w(1, 'four sentences') - 0.05, '4', 250, 1000, I5(900, 520), P5.acc, P5.acc2, 30, { swing: 0.6 });
          hd(t, w(1, 'four sentences'), 'SENTENCES.', 440, 1000, 96, P5.ink, { align: 'left', from: 1.2 });
          if (t > ph(1, 2)) { // not 400: a pile of phrasebook pages, crossed out
            for (let i = 0; i < 16; i++) { const t0 = ph(1, 2) + i * 0.025; if (t < t0) continue; const p = eo(lin(t, t0, t0 + 0.25)); X.save(); X.translate(540 + (hash(i) - .5) * 600, mix(2200, 1640 + (hash(i + 3) - .5) * 160, p)); X.rotate((hash(i + 7) - .5) * 0.8);
              X.fillStyle = '#fff'; rr(-110, -140, 220, 280, 10); X.fill(); X.strokeStyle = P5.line; X.lineWidth = 2; X.stroke(); X.fillStyle = P5.line; for (let j = 0; j < 6; j++) { X.fillRect(-80, -100 + j * 36, 160 - (j % 3) * 30, 12); } X.restore(); }
            hd(t, ph(1, 2), 'NOT 400.', 540, 1330, 130, P5.ink, {});
            if (t > ph(1, 2) + 0.5) { const p = eo(lin(t, ph(1, 2) + 0.5, ph(1, 2) + 0.7)); X.strokeStyle = P5.red; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(230, 1330); X.lineTo(230 + 620 * p, 1330); X.stroke(); }
          }
        }
      } else if (t < s(6) - 0.05) { // the four sentences
        let k = 0; for (let j = 0; j < 4; j++) if (t >= segA(j) - 0.05) k = j;
        const t0 = segA(k); const ent = back(lin(t, t0 - 0.05, t0 + 0.25), 1.8);
        numDisc(150, 300, 80, k + 1, ent);
        X.save(); X.textAlign = 'left'; X.globalAlpha = cl((t - t0) * 6); X.font = I5(900, PH[k][0].length > 16 ? 76 : 90); X.fillStyle = P5.ink; X.textBaseline = 'middle';
        const tw = X.measureText(PH[k][0]).width; if (tw > 770) { X.font = I5(900, Math.floor((PH[k][0].length > 16 ? 76 : 90) * 770 / tw)); } X.fillText(PH[k][0], 260 - (1 - ent) * 60, 300); X.restore();
        transCard(t, k);
        checklist(t, k + (t > segB(k) - 0.25 ? 1 : 0), 1330);
      } else if (t < s(7) - 0.05) { // day one sorted
        hd(t, s(6), "THAT'S DAY ONE", 540, 300, 96, P5.ink); hd(t, s(6) + 0.6, 'SORTED.', 540, 420, 130, P5.acc);
        X.save(); X.translate(540, 960); X.scale(1.15, 1.15); X.translate(-540, -1615); checklist(t, 4); X.restore(); mascot(t, 540, 1560, 0.9, { mood: 'happy', armsUp: t > s(6) + 0.6, seed: 2, extra: () => { X.save(); X.translate(30, 10); X.scale(0.5, 0.5); props[0](t); X.restore(); } });
        stamp5(t, s(6) + 0.6, 'DAY 1 ✓', 800, 640, 80, P5.green, -0.15);
      } else if (t < s(8) - 0.05) { // day two: written for you
        hd(t, s(7), 'DAY TWO?', 540, 260, 120, P5.ink); hd(t, ph(7, 1), 'BORDERLESS WRITES IT.', 540, 390, 74, P5.acc);
        const k = back(lin(t, s(7) + 0.1, s(7) + 0.4), 1.6); X.save(); X.translate(540, 1100); X.scale(k, k); X.translate(-540, -1100);
        lessonCard(t, 540, 1100, 860, 900, { kicker: 'DAY 2 · LESSON 2 OF 50', title: 'Your first\nreal shift', ts: 84, titleTyped: lin(t, ph(7, 1), ph(7, 1) + 0.7), cursor: t < ph(7, 2),
          lines: ['Taking an order.', 'Asking a colleague for help.', "Saying you'll find out."], typed: lin(t, ph(7, 1) + 0.6, ph(7, 1) + 1.4) });
        X.restore();
        if (t > ph(7, 2)) chip('your job: café', 340, 1460, 36, '#fff', P5.acc, 1, back(lin(t, ph(7, 2), ph(7, 2) + 0.2), 2));
        const tl = ph(7, 3) || w(7, 'level'); if (t > tl) chip('your level: A2', 740, 1460, 36, '#fff', P5.ink, 1, back(lin(t, tl, tl + 0.2), 2));
      } else if (t < s(9) - 0.05) { // 74 languages
        const G = ['Hola', 'Bonjour', 'Hallo', 'Ciao', 'こんにちは', 'Olá', 'Merhaba', 'Hej', 'Привет', 'مرحبا', '안녕하세요', 'Cześć', 'Γεια', 'Sawubona', 'Xin chào', 'नमस्ते', 'Halo', 'Salut'];
        for (let r = 0; r < 9; r++) { const y = 200 + r * 190, dir = r % 2 ? -1 : 1, sp = 120 + r * 12; X.save(); X.globalAlpha = 0.22;
          for (let i = 0; i < 8; i++) { const x = ((i * 300 + dir * (t - s(8)) * sp) % 2400 + 2400) % 2400 - 300; txt(G[(r * 3 + i) % G.length], x, y, I5(800, 54), P5.acc); } X.restore(); }
        X.fillStyle = 'rgba(244,238,226,0.75)'; rr(90, 640, 900, 640, 50); X.fill();
        const n = Math.min(74, Math.floor(eo(lin(t, s(8), s(8) + 1.0)) * 74));
        txt(String(Math.max(1, n)), 540, 820, I5(900, 260), P5.acc); txt('LANGUAGES', 540, 980, I5(900, 56), P5.ink2, { ls: 6 });
        hd(t, w(8, 'one course'), 'ONE COURSE,', 540, 1120, 76, P5.ink); hd(t, w(8, 'built'), 'BUILT AROUND YOUR JOB.', 540, 1210, 60, P5.acc);
      }
      endCard(t, s(9), 'One course, built around your job.', { tagAt: 0.4 });
      X.restore();
      grain(t, 0.03);
    },
  };
})();
