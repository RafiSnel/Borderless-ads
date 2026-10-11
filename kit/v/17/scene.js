// 17 · "The group chat roast" — CHAT · roast → comeback
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('17');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const th = { me: '#7c4dff', them: '#2a2140', meText: '#ffffff', themText: '#f1ecff', size: 52, maxw: 780, top: 240, bottom: 1720, reactBg: '#2a2140', voiceHi: '#ffd24d' };
  const J = '#ff8fb1', K = '#5ee0c1', D = '#ffb84d';
  const sent3 = e(3) + 0.05, quiet = s(5), later = s(6), vn = p(6, 1) || s(6) + 1.0;
  const M = [
    { t: 0.25, me: true, text: '400 day streak 🔥🔥🔥', react: { t: 1.3, e: '👀' } },
    { t: s(2), name: 'Jaz', nameCol: J, text: 'order us a coffee in spanish then ☕' },
    { t: sent3, me: true, text: 'un… coffee… por favor?' },
    { t: sent3 + 0.35, name: 'Kai', nameCol: K, kind: 'text', text: '💀💀💀' },
    { t: s(4) + 0.05, name: 'Dani', nameCol: D, text: '400 DAYS 😭' },
    { t: p(4, 2) || s(4) + 1.2, name: 'Jaz', nameCol: J, text: 'for THAT' },
    { t: vn, me: true, kind: 'voice', play: s(7) - 0.05, len: e(7) - s(7) + 0.1 },
    { t: s(8) - 0.1, name: 'Jaz', nameCol: J, text: 'wait' },
    { t: s(8) + 0.2, name: 'Kai', nameCol: K, text: 'WHICH APP IS THAT' },
    { t: s(8) + 0.5, name: 'Dani', nameCol: D, text: '???' },
  ];
  const END = e(9) + 0.3, DUR = END + 1.3; window.DURATION = DUR;
  const cues = [['pop', 0.25, 0.9], ['boing', 1.3, 0.4], ['plop', s(2), 0.9]];
  for (let k = 0; k < 9; k++) cues.push(['type', s(3) + k * 0.19, 0.6]);
  cues.push(['pop', sent3, 0.9], ['laugh', sent3 + 0.3, 0.8], ['plop', sent3 + 0.35, 0.8], ['laugh', s(4) + 0.2, 0.6], ['plop', s(4) + 0.05, 0.8], ['plop', p(4, 2) || s(4) + 1.2, 0.8], ['boing', (p(4, 2) || s(4) + 1.2) + 0.1, 0.7]);
  for (let k = 0; k < 14; k++) cues.push(['pop', sent3 + 0.4 + k * 0.11, 0.35]);
  cues.push(['whoosh', quiet, 0.5], ['click', p(5, 1) || quiet + 1.0, 0.8], ['whoosh', (p(5, 1) || quiet + 1.0) + 0.05, 0.6], ['swell', later, 0.4], ['plop', vn, 0.9], ['click', s(7) - 0.1, 0.6],
    ['plop', s(8) - 0.1, 0.8], ['plop', s(8) + 0.2, 0.8], ['plop', s(8) + 0.5, 0.8], ['micdrop', s(9), 1.1]);
  const PEEKS = [
  { t: 0.9, d: 1.6, side: 'R', y: 1480, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'happy', acc: ['shades'], say: '400 days!' },
  { t: e(3) + 0.3, d: 1.2, side: 'L', y: 1480, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'worried', sweat: true, say: 'Oof.' },
  { t: p(7, 1), d: 1.4, side: 'R', y: 1480, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'o', wide: true, say: 'That accent!' },
  { t: p(8, 1), d: 0.85, side: 'L', y: 1480, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'happy', wink: true, say: 'Me.' },
  { t: s(9) + 0.55, d: 3, side: 'B', x: W / 2, y: 1640, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'happy', armsUp: true, say: 'Comeback.' },
];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [sent3 + 0.35, p(4, 2) || s(4) + 1.2, s(9)];
  function skulls(t, t0, t1) {
    if (t < t0 || t > t1 + 1.5) return;
    for (let i = 0; i < 46; i++) { const st = t0 + hash(i) * (t1 - t0); if (t < st) continue; const u = t - st; const x = hash(i * 7) * W; const y = -100 + u * (700 + hash(i * 3) * 600);
      X.save(); X.translate(x, y); X.rotate(u * (hash(i * 5) - 0.5) * 6); txt('💀', 0, 0, font('inter', 400, 70 + hash(i * 9) * 90), '#000'); X.restore(); }
  }
  window.SCENE = {
    frame(t) {
      const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1b1030'); g.addColorStop(1, '#0d0818'); X.fillStyle = g; X.fillRect(0, 0, W, H);
      X.save(); camera(t, hits, [], 16); HOST.pp(t, L);
      const dark = t >= quiet && t < later + 0.9;
      const drop = t >= s(9) ? ei(lin(t, s(9), s(9) + 0.45)) : 0;
      X.save(); if (drop > 0) { X.translate(W / 2, H / 2); X.rotate(drop * 0.6); X.translate(-W / 2, -H / 2 + drop * 2200); }
      CHAT.draw(t, M, th);
      // circle around the cringe message
      const ct = (p(4, 2) || s(4) + 1.2) + 0.15; if (t > ct && t < quiet) { const k = eo(lin(t, ct, ct + 0.3)); X.save(); X.strokeStyle = '#ff3b3b'; X.lineWidth = 10; X.beginPath(); X.ellipse(W - 300, 1040, 300, 90, -0.05, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); X.stroke(); X.restore(); }
      // header
      X.fillStyle = '#20163a'; X.fillRect(0, 0, W, 230); X.fillStyle = 'rgba(255,255,255,0.06)'; X.fillRect(0, 228, W, 2);
      X.fillStyle = '#3b2a66'; X.beginPath(); X.arc(150, 140, 54, 0, 7); X.fill(); txt('☕', 150, 142, font('inter', 400, 56), '#fff');
      txt('the group 🫠', 230, 118, font('inter', 800, 46), '#fff', { align: 'left' });
      const many = t > s(8) - 0.3 && t < s(8) + 0.6; txt(many ? 'Jaz, Kai and Dani are typing…' : 'Jaz, Kai, Dani, you', 230, 172, font('inter', 500, 30), many ? K : '#9a8fb8', { align: 'left' });
      txt('‹', 60, 140, font('inter', 400, 80), '#fff');
      const typing = t > s(3) && t < sent3 ? 'un… coffee… por favor?'.slice(0, Math.floor((t - s(3)) / (sent3 - s(3)) * 22)) : '';
      CHAT.inputBar(t, { head: '#20163a', inputBg: '#2a2140', send: '#7c4dff', cardAcc: '#7c4dff', inputText: '#fff' }, typing);
      X.restore();
      skulls(t, sent3 + 0.4, sent3 + 1.9);
      // subtitles for the voice note
      if (t > s(7) && t < s(8)) { const half = p(7, 2) || s(7) + 1.6; pill(t < half ? 'Dos cafés con leche, por favor.' : 'Y para mí, uno solo.', W / 2, 420, font('inter', 800, 48), '#1b1030', '#ffd24d', 1, back(lin(t, t < half ? s(7) : half, (t < half ? s(7) : half) + 0.2), 2)); }
      if (t > sent3 + 0.4 && t < quiet) slam(t, s(4), '400 DAYS. FOR THAT.', W / 2, 470, font('anton', 400, 110), '#fff', { stroke: '#ff3b3b', sw: 14, rot: -0.05, max: 980 });
      X.restore();
      if (dark) { const k = t < later ? eo(lin(t, quiet, quiet + 0.3)) : 1 - eo(lin(t, later + 0.5, later + 0.9)); X.fillStyle = `rgba(5,3,10,${0.96 * k})`; X.fillRect(0, 0, W, H);
        if (t < later) { txt('last seen 2 weeks ago', W / 2, 760, font('inter', 700, 64), '#9a8fb8', { a: eo(lin(t, quiet + 0.2, quiet + 0.5)) }); if (t < (p(5, 1) || quiet + 1.0)) { const kq = back(lin(t, quiet + 0.1, quiet + 0.4), 2); X.save(); X.translate(W / 2, 1080); X.scale(kq, kq); txt('🔕', 0, 0, font('inter', 400, 220), '#fff'); X.restore(); }
          const ts = p(5, 1) || quiet + 1.0; if (t > ts) { const kk = back(lin(t, ts, ts + 0.3), 2); X.save(); X.translate(W / 2, 1100); X.scale(kk, kk); flipPlane(0, 0, 360, 360, Math.PI * (1 - eio(lin(t, ts + 0.15, ts + 0.65))), () => { X.fillStyle = '#f6efe2'; rr(10, 10, 340, 340, 70); X.fill(); logo(180, 180, 120); }, () => { X.fillStyle = '#3a3550'; rr(10, 10, 340, 340, 70); X.fill(); txt('?', 180, 190, font('inter', 900, 180), 'rgba(255,255,255,0.5)'); }, { key: 'icon17', persp: 1400 }); X.restore();
            txt('*switches apps*', W / 2, 1340, font('caveat', 700, 70), '#fff', { a: eo(lin(t, ts + 0.2, ts + 0.5)) }); } }
        else { slam(t, later, '2 WEEKS LATER', W / 2, H / 2, font('anton', 400, 150), '#ffd24d', {}); } }
      if (t >= s(9)) {
        coinIn(t, s(9) + 0.2, W / 2, 860, 160);
        slam(t, s(9) + 0.3, 'Borderless', W / 2, 1140, font('inter', 900, 150), '#fff', {});
        slam(t, s(9) + 0.6, 'POV: the comeback.', W / 2, 1290, font('inter', 700, 56), '#ffd24d', { from: 1.3 });
      }
      HOST.peeks(t, PEEKS);
    },
  };
})();
