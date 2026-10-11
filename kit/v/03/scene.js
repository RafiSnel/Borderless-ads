// 03 · "Tell it the truth" — CHAT · fast & funny
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png', mwords: 'app/madrid_words.png' });
  const L = await loadTimeline('03');
  const s = (n) => L[n].start, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const th = { me: '#1f1a14', them: '#ffffff', meText: '#ffffff', themText: '#1f1a14', cardAcc: '#a8512b', size: 50, maxw: 700, top: 240, bottom: 1730, reactBg: '#ffffff', sub: '#8a7f70' };
  const M = [
    { t: 0.0, text: 'Hey 👋 new here?' },
    { t: p(1, 1), text: 'Before we start…' },
    { t: p(1, 2), text: 'be honest with me 🙏' },
    { t: L[1].end, kind: 'typing', until: s(2) + 0.3 },
    { t: s(2) + 0.3, text: 'Why are you learning Spanish? 👀' },
    { t: p(3, 0), me: true, text: 'honestly?' },
    { t: p(3, 1), me: true, text: 'kitchen internship' },
    { t: p(3, 2), me: true, text: 'in Madrid' },
    { t: p(3, 3), me: true, text: 'in 3 weeks 😬', react: { t: L[3].end - 0.1, e: '😳' } },
    { t: s(4) + 0.05, text: 'No judgement. Quick level test 👇' },
    { t: p(4, 1), me: true, text: '✅ ✅ ❌ ✅' },
    { t: s(5) - 0.15, text: 'Level: A2. Building your course…' },
    { t: p(5, 1), kind: 'card', num: 1, text: 'First day in the kitchen', sub: 'Lesson 1 of 50' },
    { t: p(5, 1) + 0.45, kind: 'card', num: 2, text: 'Taking an order', sub: 'Lesson 2 of 50' },
    { t: p(5, 1) + 0.9, kind: 'card', num: 3, text: 'Can you repeat that?', sub: 'Lesson 3 of 50' },
    { t: s(6) + 0.05, text: '🐱 The cat drinks milk', strike: s(6) + 0.45, del: p(6, 1) + 0.4 },
    { t: p(6, 1), text: '🎨 Name ten colours', strike: p(6, 1) + 0.3, del: L[6].end + 0.05 },
    { t: s(7), kind: 'img', img: 'mwords', h: 700, w: 600, fy: 330 },
    { t: s(8) + 0.05, me: true, text: 'ok this is actually useful 😳', react: { t: s(8) + 0.6, e: '❤️' } },
  ];
  // key words over the chat
  const KW = [[s(1) + 1.0, 'THE TRUTH.'], [p(3, 1), 'KITCHEN.'], [p(5, 0), '50 LESSONS.'], [s(6), 'NO CARTOON\nANIMALS.'], [s(7), 'YOUR WORDS.'], [p(7, 1), 'YOUR KITCHEN.'], [p(7, 3), 'YOUR MADRID.']];
  const END = s(8) + 0.9, DUR = END + 1.9;
  window.DURATION = DUR;
  // sound cues
  const cues = [];
  M.forEach((m) => { if (m.kind === 'typing') { for (let k = 0; k < 6; k++) cues.push(['type', m.t + k * 0.09, 0.6]); } else if (m.kind === 'img') cues.push(['shutter', m.t, 1]); else cues.push([m.me ? 'pop' : 'plop', m.t, 0.9]);
    if (m.react) cues.push(['boing', m.react.t, 0.7]); if (m.strike) cues.push(['scratch', m.strike, 0.9]); if (m.del) cues.push(['whoosh', m.del, 0.6]); });
  KW.forEach(([t]) => cues.push(['impact', t, 0.55]));
  [0, 1, 2, 3].forEach((k) => cues.push(['tick', p(4, 1) + k * 0.12, 1]));
  cues.push(['kaching', p(5, 1) + 1.3, 0.9], ['whoosh', 0.02, 0.7], ['swell', END, 0.5], ['ding', END, 0.8]);
  const PEEKS = [
  { t: p(3, 1) + 0.05, d: 1.2, side: 'R', y: 1300, mood: 'o', wide: true, say: 'A kitchen?!' },
  { t: p(3, 4) - 0.05, d: 1.1, side: 'L', y: 1380, mood: 'worried', sweat: true, say: '3 WEEKS?' },
  { t: p(5, 3) - 0.6, d: 1.0, side: 'R', y: 1350, mood: 'happy', armsUp: true, say: 'Fifty!' },
  { t: s(6) + 0.1, d: 2.6, side: 'R', y: 1350, mood: 'o', says: [[s(6) + 0.1, 'Excuse me?'], [p(6, 1) + 0.15, "I'm a passport.", { mood: 'worried' }]] },
  { t: s(8) + 0.95, d: 4, side: 'B', x: W / 2, y: 1600, s: 0.75, mood: 'happy', wave: true, say: 'Tell me everything.' },
];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const hits = KW.map((k) => k[0]);
  window.SCENE = {
    frame(t) {
      X.fillStyle = '#efe9df'; X.fillRect(0, 0, W, H);
      X.fillStyle = 'rgba(168,81,43,0.05)';
      for (let i = 0; i < 40; i++) { X.beginPath(); X.arc((i % 5) * 240 + 100, Math.floor(i / 5) * 260 + 120, 26, 0, 7); X.fill(); }
      X.save(); camera(t, hits, [0], 14); HOST.pp(t, L);
      // phone-sized chat fills the frame
      CHAT.draw(t, M, th);
      // header with the app
      X.fillStyle = '#fff'; X.fillRect(0, 0, W, 230); X.fillStyle = 'rgba(0,0,0,0.08)'; X.fillRect(0, 228, W, 2);
      logo(150, 140, 54); txt('Borderless', 230, 118, font('inter', 800, 48), '#1f1a14', { align: 'left' });
      const typing = M[3].t <= t && t < M[3].until;
      txt(typing ? 'typing…' : 'online', 230, 172, font('inter', 500, 32), typing ? '#a8512b' : '#4faa72', { align: 'left' });
      txt('‹', 60, 140, font('inter', 400, 80), '#1f1a14');
      // input bar
      const myTyping = t > p(3, 0) - 0.4 && t < p(3, 0) ? typed(t, p(3, 0) - 0.4, 'honestly?', 30) : '';
      CHAT.inputBar(t, { head: '#fff', inputBg: '#f1ece4', send: '#a8512b', cardAcc: '#a8512b', inputText: '#1f1a14' }, myTyping);
      // 50/50 counter badge during the course build
      if (t > p(5, 0) && t < s(6)) {
        const n = Math.max(1, Math.round(50 * eo(lin(t, p(5, 1), p(5, 1) + 1.3))));
        pill(`${n}/50 lessons`, W - 230, 330, font('inter', 800, 40), '#fff', '#a8512b', 1, back(lin(t, p(5, 0), p(5, 0) + .2)));
      }
      // POV caption at the very start (first frame already full)
      if (t < s(2)) {
        const a = 1 - lin(t, s(2) - 0.2, s(2));
        pill('POV: you tell a language app', W / 2, 520, font('inter', 900, 50), '#fff', '#1f1a14', a, back(lin(t, 0, 0.18), 2));
        pill('the truth 😳', W / 2, 640, font('inter', 900, 62), '#1f1a14', '#ffd65c', a, back(lin(t, 0.9, 1.1), 2), { rot: -0.04 });
      }
      // key words
      KW.forEach(([t0, w], i) => {
        const next = KW[i + 1] ? KW[i + 1][0] : END;
        if (i === 0) return;
        slam(t, t0, w, W / 2, 470, font('anton', 400, w.includes('\n') ? 130 : 150), '#a8512b', { fade: Math.min(next, t0 + 1.2) - 0.1, stroke: '#fff', sw: 18, rot: -0.1, max: 980 });
      });
      X.restore();
      // end card
      if (t > END) {
        const e = t - END; const k = eo(e / 0.35);
        X.fillStyle = `rgba(31,26,20,${0.85 * k})`; X.fillRect(0, 0, W, H);
        coinIn(t, t - e, W / 2, 820, 150);
        slam(t, END + 0.15, 'Borderless', W / 2, 1080, font('inter', 900, 140), '#fff', {});
        slam(t, END + 0.45, 'Tell it the truth.', W / 2, 1230, font('inter', 700, 64), '#ee8b47', { from: 1.3 });
      }
      HOST.peeks(t, PEEKS);
    },
  };
})();
