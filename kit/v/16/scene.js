// 16 · "Message from the chef" — CHAT · panic → hero (+ cringe)
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('16');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const th = { me: '#2f6f57', them: '#ffffff', meText: '#ffffff', themText: '#1d1d1d', size: 52, maxw: 760, top: 240, bottom: 1720, reactBg: '#ffffff' };
  const RED = '#e5484d', GRN = '#2fbf71';
  const M = [
    { t: 0.55, name: 'Chef Marta', nameCol: '#c0392b', text: '¿Puedes cubrir el turno de mañana?' },
    { t: s(5) + 0.05, me: true, text: '¿Me lo repites, por favor? 🙏' },
    { t: s(6) - 0.35, kind: 'typing', until: s(6) + 0.1 },
    { t: s(6) + 0.1, name: 'Chef Marta', nameCol: '#c0392b', text: 'Mañana. Turno de mañana. ¿Puedes?' },
    { t: s(7) + 0.02, me: true, text: '¡Claro! ¿A qué hora?', react: { t: e(7) - 0.05, e: '👍' } },
    { t: e(7) + 0.25, name: 'Chef Marta', nameCol: '#c0392b', text: 'A las 7. ¡Gracias, crack! 🙌' },
  ];
  // typing/deleting in the input bar
  const drafts = [['yes!!', p(3, 0) - 0.15, p(3, 1)], ['sí señor 🫡', p(3, 2) - 0.1, p(3, 3)], ['que?', p(3, 3) + 0.3, e(3) + 0.25], ['¿Me lo repites, por favor? 🙏', s(5) - 0.7, s(5) + 0.05], ['¡Claro! ¿A qué hora?', s(7) - 0.45, s(7) + 0.02]];
  function draft(t) { for (const [txt0, t0, t1] of drafts) { if (t >= t0 && t < t1) { const typedLen = Math.floor((t - t0) * 32); const delStart = t1 - 0.25;
    if (t > delStart && !txt0.startsWith('¿') && !txt0.startsWith('¡')) return txt0.slice(0, Math.max(0, Math.round(txt0.length * (1 - (t - delStart) / 0.25))));
    return txt0.slice(0, typedLen); } } return ''; }
  const END = e(8) + 0.3, DUR = END + 1.2; window.DURATION = DUR;
  const redness = (t) => (t < 0.4 ? 0 : t < s(4) ? cl((t - 0.4) / 1.5) : t < p(4, 1) ? 1 - 0.6 * lin(t, s(4), p(4, 1)) : t < s(7) ? 0.4 - 0.4 * lin(t, p(4, 1), p(4, 1) + 0.6) : 0);
  const green = (t) => (t > e(7) - 0.05 ? eo(lin(t, e(7) - 0.05, e(7) + 0.4)) : 0);
  const cues = [['buzz', 0.3, 0.9], ['plop', 0.55, 0.9], ['heart', s(2), 1], ['heart', s(2) + 0.6, 1], ['heart', s(3) + 0.4, 0.8]];
  for (let x = 0.6; x < s(4); x += 0.5) cues.push(['tick', x, 0.7]);
  drafts.forEach(([s0, t0, t1], i) => { for (let k = 0; k < Math.min(s0.length, 10); k++) cues.push(['type', t0 + k * 0.05, 0.5]); if (i < 3) cues.push(['back', t1 - 0.25, 0.7], ['back', t1 - 0.12, 0.7]); });
  cues.push(['ding', p(4, 1), 0.8], ['page', s(4) + 0.1, 0.5], ['whoosh', s(5) + 0.05, 0.7], ['plop', s(6) + 0.1, 0.9], ['pop', p(6, 1), 0.6], ['whoosh', s(7) + 0.02, 0.7],
    ['boing', e(7) - 0.05, 0.6], ['jingle', e(7) + 0.1, 0.6], ['plop', e(7) + 0.25, 0.8], ['whoosh', s(8), 0.5], ['ding', END, 0.6]);
  const PEEKS = [
  { t: s(2), d: 1.0, side: 'L', y: 1520, s: 0.65, mood: 'worried', wide: true, sweat: true, say: 'AAAH.' },
  { t: p(4, 1) + 0.05, d: 0.9, side: 'R', y: 1640, s: 0.6, mood: 'o', wide: true, say: 'Lesson 3!' },
  { t: s(7) + 0.3, d: 0.9, side: 'L', y: 1520, s: 0.62, mood: 'happy', armsUp: true, acc: ['shades'], say: 'Nailed it.' },
  { t: s(8) + 0.4, d: 3, side: 'B', x: W / 2, y: 1690, s: 0.6, mood: 'happy', wave: true, say: '¡Claro!' },
];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [0.55, s(2), p(4, 1), e(7)];
  window.SCENE = {
    frame(t) {
      X.fillStyle = '#ebe6dc'; X.fillRect(0, 0, W, H);
      X.fillStyle = 'rgba(0,0,0,0.035)'; for (let i = 0; i < 60; i++) { X.font = '50px "Noto Color Emoji"'; }
      for (let y = 300; y < 1700; y += 160) for (let x = 60; x < W; x += 180) { X.globalAlpha = 0.05; txt((x + y) % 3 ? '🍳' : '🔪', x + ((y / 160) % 2) * 90, y, font('inter', 400, 50), '#000'); } X.globalAlpha = 1;
      const panic = t > s(2) && t < s(4) ? 1 : 0; const panicTxt = t > s(2) && t < s(3);
      X.save(); camera(t, hits, [], 14); HOST.pp(t, L);
      if (panic) X.translate((hash(Math.floor(t * 40)) - 0.5) * 18, (hash(Math.floor(t * 40) + 3) - 0.5) * 12);
      if (t < s(8)) {
        CHAT.draw(t, M, th);
        // header
        X.fillStyle = '#fff'; X.fillRect(0, 0, W, 230); X.fillStyle = 'rgba(0,0,0,0.08)'; X.fillRect(0, 228, W, 2);
        X.fillStyle = '#c0392b'; X.beginPath(); X.arc(150, 140, 54, 0, 7); X.fill(); txt('👨‍🍳', 150, 142, font('inter', 400, 60), '#fff');
        txt('Chef Marta', 230, 118, font('inter', 800, 48), '#1d1d1d', { align: 'left' });
        const typ = t > s(6) - 0.35 && t < s(6) + 0.1; txt(typ ? 'typing…' : 'Cocina · URSO', 230, 172, font('inter', 500, 32), typ ? GRN : '#888', { align: 'left' });
        // ticking clock
        X.save(); X.translate(W - 110, 140); X.strokeStyle = redness(t) > 0.3 ? RED : '#1d1d1d'; X.lineWidth = 7; X.beginPath(); X.arc(0, 0, 46, 0, 7); X.stroke();
        X.rotate(Math.floor(t * 2) * 0.5236); X.beginPath(); X.moveTo(0, 0); X.lineTo(0, -34); X.stroke(); X.restore();
        CHAT.inputBar(t, { head: '#fff', inputBg: '#f1ede6', send: '#2f6f57', cardAcc: '#2f6f57', inputText: '#1d1d1d' }, draft(t));
        // translation chip under the chef's second message
        if (t > p(6, 1) && t < s(8)) pill('= Can you cover tomorrow morning’s shift?', W / 2, 400, font('inter', 800, 40), '#fff', '#1d1d1d', 1, back(lin(t, p(6, 1), p(6, 1) + 0.2), 2));
        if (t > 0.3 && t < 0.55) { const k = eo(lin(t, 0.3, 0.45)); X.save(); X.translate(0, mix(-200, 0, k)); X.fillStyle = 'rgba(30,30,30,0.95)'; rr(40, 30, W - 80, 170, 34); X.fill();
          txt('Chef Marta', 90, 85, font('inter', 800, 40), '#fff', { align: 'left' }); txt('¿Puedes cubrir el turno de mañana?', 90, 145, font('inter', 500, 38), '#ddd', { align: 'left' }); X.restore(); }
        // the lesson flashback
        if (t >= s(4) && t < s(5)) {
          const k = back(lin(t, s(4) + 0.05, s(4) + 0.35), 1.8); X.save(); X.translate(W / 2, 980); X.rotate(-0.03); X.scale(k, k);
          X.fillStyle = 'rgba(0,0,0,0.2)'; rr(-420, -330, 860, 680, 40); X.fill(); X.fillStyle = '#f6efe2'; rr(-430, -340, 860, 680, 40); X.fill();
          txt('YESTERDAY · LESSON 3', -370, -260, font('inter', 800, 32), '#a8512b', { align: 'left', ls: 2 });
          txt('Can you repeat that?', -370, -180, font('serif', 400, 76), '#1f1a14', { align: 'left' });
          X.fillStyle = '#fff'; rr(-370, -90, 740, 150, 30); X.fill(); txt('¿Me lo repites, por favor?', 0, -15, font('inter', 800, 50), '#a8512b');
          txt('When someone speaks too fast — ask,', -370, 130, font('inter', 500, 36), '#6b5f50', { align: 'left' }); txt('don’t guess.', -370, 180, font('inter', 500, 36), '#6b5f50', { align: 'left' });
          if (t > p(4, 1)) { const kk = back(lin(t, p(4, 1), p(4, 1) + 0.2), 2.5); X.save(); X.translate(300, -300); X.scale(kk, kk); txt('💡', 0, 0, font('inter', 400, 120), '#000'); X.restore(); }
          logo(340, -250, 40); X.restore();
        }
      }
      X.restore();
      // red panic tint & green relief
      const r = redness(t); if (r > 0) { const g = X.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1200); g.addColorStop(0, 'rgba(229,72,77,0)'); g.addColorStop(1, `rgba(229,72,77,${0.55 * r})`); X.fillStyle = g; X.fillRect(0, 0, W, H); X.fillStyle = `rgba(229,72,77,${0.08 * r})`; X.fillRect(0, 0, W, H); }
      const gr = green(t); if (gr > 0 && t < s(8)) { const g = X.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1200); g.addColorStop(0, 'rgba(47,191,113,0)'); g.addColorStop(1, `rgba(47,191,113,${0.45 * gr})`); X.fillStyle = g; X.fillRect(0, 0, W, H); }
      if (panicTxt) { slam(t, s(2), 'PANIC.', W / 2, 1000, font('anton', 400, 220), RED, { stroke: '#fff', sw: 16, rot: -0.08 }); }
      if (t > s(3) && t < s(4)) { const w = t < p(3, 1) ? 'TYPE.' : t < p(3, 2) ? 'DELETE.' : t < p(3, 3) ? 'TYPE.' : 'DELETE.'; const t0 = t < p(3, 1) ? s(3) : t < p(3, 2) ? p(3, 1) : t < p(3, 3) ? p(3, 2) : p(3, 3);
        slam(t, t0, w, W / 2, 700, font('anton', 400, 170), w === 'DELETE.' ? RED : '#1d1d1d', { stroke: '#fff', sw: 14, rot: w === 'DELETE.' ? 0.06 : -0.06 }); }
      if (gr > 0 && t < s(8)) slam(t, e(7), 'HERO.', W / 2, 700, font('anton', 400, 200), GRN, { stroke: '#fff', sw: 16, rot: -0.06 });
      if (t >= s(8)) {
        X.fillStyle = '#1f1a14'; X.fillRect(0, 0, W, H);
        coinIn(t, s(8) - 0.05, W / 2, 700, 140);
        slam(t, s(8), 'Lessons for the', W / 2, 980, font('serif', 400, 84), '#fff', {});
        slam(t, p(8, 1), 'conversations', W / 2, 1090, font('serif', 400, 96), '#ee8b47', {});
        slam(t, p(8, 2) + 0.2, 'you’re actually', W / 2, 1200, font('serif', 400, 84), '#fff', {});
        slam(t, p(8, 2) + 0.55, 'about to have.', W / 2, 1300, font('serif', 400, 84), '#fff', {});
        slam(t, END - 0.2, 'Borderless', W / 2, 1540, font('inter', 900, 110), '#fff', {});
      }
      HOST.peeks(t, PEEKS);
    },
  };
})();
