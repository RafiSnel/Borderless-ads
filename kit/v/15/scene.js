// 15 · "How the world types 'haha'" — DARK GROUP CHAT · busy & cosy
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('15');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const th = { me: '#3a7bff', them: '#23262d', meText: '#ffffff', themText: '#f2f2f2', size: 50, maxw: 780, top: 240, bottom: 1720, reactBg: '#23262d', strikeCol: '#ff5a5a' };
  const C = { es: '#ffb020', fr: '#5aa0ff', jp: '#ff6b8a', kr: '#9b7bff', th: '#3fd0a0', br: '#7ddc3c', en: '#bbbbbb' };
  const M = [
    { t: 0.0, name: 'Sam', nameCol: '#ff9f43', text: 'why was the grammar book sad' },
    { t: p(1, 1) - 0.4 || 1.4, name: 'Sam', nameCol: '#ff9f43', text: 'too many tenses 😭' },
    { t: s(2) + 0.25, name: 'Lucía · Madrid', nameCol: C.es, text: 'jajajajaja' },
    { t: p(3, 1), name: 'Théo · Lyon', nameCol: C.fr, text: 'mdr' },
    { t: p(4, 1), name: 'Yui · Osaka', nameCol: C.jp, text: 'wwwwwwww' },
    { t: s(5) + 0.15, name: 'Minji · Seoul', nameCol: C.kr, text: 'ㅋㅋㅋ' },
    { t: s(5) + 0.5, name: 'Minji · Seoul', nameCol: C.kr, text: 'ㅋㅋㅋㅋㅋㅋㅋ' },
    { t: p(6, 1), name: 'Ploy · Bangkok', nameCol: C.th, text: '55555555' },
    { t: p(7, 1), name: 'Lucas · Recife', nameCol: C.br, text: 'kkkkkkkkkkkkkk' },
    { t: p(7, 1) + 0.25, name: 'Lucas · Recife', nameCol: C.br, text: 'KKKKKKKKKKKKKKKKKKK' },
    { t: p(7, 1) + 0.45, name: 'Lucas · Recife', nameCol: C.br, text: 'kkkkkkkkk 💀' },
    { t: p(8, 1), me: true, text: 'lol', react: { t: p(8, 2), e: '😐' } },
  ];
  const CAP = [[s(2), 'SPAIN', 'jajaja', C.es], [s(3), 'FRANCE', 'mdr', C.fr], [s(4), 'JAPAN', 'www', C.jp], [s(5), 'KOREA', 'ㅋㅋㅋ', C.kr], [s(6), 'THAILAND', '555', C.th], [s(7), 'BRAZIL', 'kkkk', C.br], [s(8), 'ENGLISH', 'lol', C.en]];
  const END = e(8) + 0.5, DUR = END + 1.4; window.DURATION = DUR;
  const cues = [];
  M.forEach((m) => { cues.push([m.me ? 'pop' : 'plop', m.t, 0.9]); if (!m.me) cues.push(['vibrate', m.t, 0.25]); if (m.react) cues.push(['tick', m.react.t, 1]); });
  CAP.forEach(([t0]) => cues.push(['whoosh', t0, 0.35]));
  cues.push(['laugh', s(2) + 0.35, 0.35], ['page', p(3, 2), 0.5], ['pop', p(3, 4), 0.6], ['scratch', p(4, 1) + 0.2, 0.3], ['pop', p(4, 2), 0.6], ['pop', s(5) + 0.8, 0.6], ['pop', p(6, 2), 0.6], ['ding', p(6, 3), 0.5]);
  for (let k = 0; k < 10; k++) cues.push(['plop', p(7, 1) + 0.6 + k * 0.09, 0.5]);
  cues.push(['ding', END, 0.6]);
  const PEEKS = [
  { t: p(1, 1) + 0.1, d: 0.85, side: 'R', y: 1520, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'neutral', say: 'Ha. Ha.' },
  { t: p(4, 1) + 0.2, d: 1.3, side: 'L', y: 1520, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'o', wide: true, say: 'Grass?' },
  { t: p(6, 2), d: 1.4, side: 'R', y: 1520, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'happy', say: '555!' },
  { t: p(7, 1) + 0.1, d: 1.3, side: 'L', y: 1520, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'o', wide: true, sweat: true, say: 'KKKKKK' },
  { t: p(8, 2), d: 1.2, side: 'R', y: 1520, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'neutral', say: 'lol.' },
  { t: END + 0.3, d: 3, side: 'B', x: W / 2, y: 1600, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'happy', wave: true, say: 'jajaja' },
];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  function grass(t, t0) { // 'w' grows like grass
    if (t < t0) return; const k = lin(t, t0, t0 + 1.2);
    for (let i = 0; i < 70; i++) { const x = hash(i) * W, gy = 1720 - hash(i * 3) * 80; const h = eo(cl(k * 2 - hash(i * 7))) * (90 + hash(i * 5) * 120);
      txt('w', x, gy - h, font('inter', 900, 40 + hash(i * 9) * 60), i % 2 ? '#7ddc3c' : '#4fbf3a', { a: 0.85 }); }
  }
  window.SCENE = {
    frame(t) {
      X.fillStyle = '#0f1115'; X.fillRect(0, 0, W, H);
      // vibration on each incoming message
      let vib = 0; M.forEach((m) => { if (!m.me && t > m.t && t < m.t + 0.18) vib = 1 - (t - m.t) / 0.18; });
      X.save(); X.translate((hash(Math.floor(t * 60)) - 0.5) * 16 * vib, (hash(Math.floor(t * 60) + 9) - 0.5) * 10 * vib); HOST.pp(t, L);
      if (t > p(4, 1) + 0.2 && t < s(5) + 0.2) grass(t, p(4, 1) + 0.2);
      CHAT.draw(t, M, th);
      // header
      X.fillStyle = '#181b21'; X.fillRect(0, 0, W, 230); X.fillStyle = 'rgba(255,255,255,0.06)'; X.fillRect(0, 228, W, 2);
      X.fillStyle = '#2b3a55'; X.beginPath(); X.arc(150, 140, 54, 0, 7); X.fill(); txt('🌍', 150, 142, font('inter', 400, 62), '#fff');
      txt('International crew', 230, 118, font('inter', 800, 46), '#fff', { align: 'left' });
      const typers = M.filter((m) => !m.me && t > m.t - 0.6 && t < m.t).map((m) => m.name.split(' ')[0]);
      txt(typers.length ? typers[0] + ' is typing…' : 'Lucía, Théo, Yui, Minji, Ploy, Lucas, you', 230, 172, font('inter', 500, 30), typers.length ? '#3fd0a0' : '#888', { align: 'left' });
      txt('‹', 60, 140, font('inter', 400, 80), '#fff');
      const unread = M.filter((m) => !m.me && t >= m.t).length;
      if (unread > 2) { X.fillStyle = '#ff4d5e'; X.beginPath(); X.arc(W - 80, 140, 40, 0, 7); X.fill(); txt(String(unread), W - 80, 142, font('inter', 900, 40), '#fff'); }
      CHAT.inputBar(t, { head: '#181b21', inputBg: '#23262d', send: '#3a7bff', cardAcc: '#3a7bff', inputText: '#fff' }, t > p(8, 1) - 0.4 && t < p(8, 1) ? 'lol' : '');
      X.restore();
      // captions over the chat
      let ci = -1; CAP.forEach((c, i) => { if (t >= c[0]) ci = i; });
      if (t < s(2)) pill('someone drops a joke…', W / 2, 420, font('inter', 900, 56), '#0f1115', '#ffd65c', 1 - lin(t, s(2) - 0.15, s(2)), back(lin(t, 0, 0.2), 2), { rot: -0.03 });
      if (ci >= 0 && t < END) {
        const [t0, country, laugh, col] = CAP[ci]; const k = back(lin(t, t0, t0 + 0.22), 2);
        X.save(); X.translate(W / 2, 400); X.scale(k, k); X.rotate(-0.03);
        X.fillStyle = col; rr(-330, -80, 660, 160, 30); X.fill(); X.fillStyle = '#0f1115'; rr(-322, -72, 644, 144, 26); X.fill();
        txt(country, 0, -30, font('anton', 400, 52), col, { ls: 6 }); txt(laugh, 0, 36, font('inter', 900, 66), '#fff'); X.restore();
        // explanations
        const ex = (t1, a, b, c2) => { if (t < t1) return; const kk = back(lin(t, t1, t1 + 0.2), 2); X.save(); X.translate(W / 2, 590); X.scale(kk, kk);
          X.fillStyle = '#fff'; rr(-430, -60, 860, 120, 60); X.fill(); txt(a, 0, 0, font('inter', 800, 46), '#0f1115'); X.restore(); };
        if (ci === 1) { ex(p(3, 2), 'mort de rire'); if (t > p(3, 4)) pill('= dying of laughter 💀', W / 2, 730, font('inter', 900, 46), '#fff', C.fr, 1, back(lin(t, p(3, 4), p(3, 4) + 0.2), 2)); }
        if (ci === 2) ex(p(4, 2), '笑う · warau = to laugh');
        if (ci === 3) ex(s(5) + 0.8, 'ㅋ sounds like “k” → kekeke');
        if (ci === 4) { ex(p(6, 2), 'ห้า · “hâ” = five'); if (t > p(6, 3)) pill('555 = hahaha', W / 2, 730, font('inter', 900, 52), '#0f1115', C.th, 1, back(lin(t, p(6, 3), p(6, 3) + 0.2), 2)); }
        if (ci === 6 && t > p(8, 2)) pill('(not laughing at all)', W / 2, 590, font('inter', 900, 50), '#0f1115', '#ffffff', 1, back(lin(t, p(8, 2), p(8, 2) + 0.2), 2));
      }
      if (t > END) {
        const k = eo(lin(t, END, END + 0.3)); X.fillStyle = `rgba(15,17,21,${0.92 * k})`; X.fillRect(0, 0, W, H);
        coinIn(t, END, W / 2, 820, 150);
        slam(t, END + 0.15, 'Borderless', W / 2, 1080, font('inter', 900, 140), '#fff', {});
        slam(t, END + 0.4, 'jajaja · mdr · www · ㅋㅋ · 555 · kkk', W / 2, 1220, font('inter', 800, 46), '#ffd65c', { from: 1.3 });
      }
      HOST.peeks(t, PEEKS);
    },
  };
})();
