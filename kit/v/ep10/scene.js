// La Esquina · Ep. 10 — Día 1
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep10');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const dayTxt = (t) => t < M.zero ? 'DAY 1216' : (t < M.day1 ? 'DAY 0' : 'DAY 1');
  // Racha's flame shrinks to a match after midnight and grows back through the night
  const sz = (t) => t < M.zero ? 1 : t < M.flamenco ? 0.55 : t < M.metro ? mix(0.55, 0.85, eo(lin(t, M.flamenco, M.flamenco + 4))) : t < M.day1 ? 0.8 : mix(0.8, 1.05, eo(lin(t, M.day1, M.day1 + 1)));
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s * sz(t), { shades: true, noLids: true, mood: 'neutral', day: dayTxt(t), ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);

  const cues = [['tick', M.clock + 0.2, 0.5], ['tick', M.clock + 0.7, 0.5], ['tick', M.clock + 1.2, 0.5], ['gong', M.zero, 0.5], ['fail', M.zero + 0.5, 0.5], ['whoosh', Lt('p1') - 0.3, 0.3],
    ['whoosh', M.churro, 0.3], ['castanet', M.flamenco + 0.2, 0.4], ['whoosh', M.metro, 0.3], ['guitar', M.busk + 0.1, 0.4], ['whoosh', M.roof, 0.3], ['ding', M.day1, 0.6], ['swell', M.day1 - 0.3, 0.3], ['stamp', M.stamp + 0.55, 0.9], ['scratch', M.stamp + 0.65, 0.3],
    ['glitch', M.hook, 0.6], ['buzz', M.hook + 0.4, 0.5], ['vibrate', M.hook + 0.8, 0.6], ['bell', M.hook + 1.0, 0.6], ['bell', M.hook + 1.6, 0.6], ['bell', M.hook + 2.1, 0.6], ['vibrate', M.hook + 2.4, 0.6], ['boom', Le('d1') + 0.2, 0.8]];
  for (let x = M.flamenco + 0.8; x < M.metro - 0.4; x += 0.5) cues.push(['castanet', x, 0.2]);
  for (let x = M.hook + 2.6; x < Le('d1'); x += 0.12) cues.push(['dingdong', x, 0.08]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };

  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, [M.zero, Le('d1') + 0.2], [M.churro, M.flamenco, M.metro, M.busk, M.roof, M.hook], 10);
    if (t < M.clock) { // ---- La Esquina: Racha dripping in the doorway ----
      X.save(); keyCam(t, [[0, 540, 1050, 1.0], [Lt('f1') - 0.1, 620, 1100, 1.35]]); closedBar(t, 0.55, 1);
      R(t, 960, 1250, 0.55, { mood: 'sad', lookY: 1 }); dripsAt(t, 960, 1100, 0.6);
      P(t, 240, 1300, 0.6, { mood: 'worried', seed: 10, lookX: 1 }); F(t, 480, 1290, 0.48, { mood: 'neutral', lookX: 1 }); G(t, 660, 1300, 0.45, { mood: 'shock', lookX: 1, raise: t > Lt('g1') });
      X.restore(); say(t, 'f1', 480, 780, { size: 58 }); say(t, 'g1', 660, 780, { size: 60 }); }
    else if (t < Lt('r1') - 0.3) { // ---- midnight ----
      const z = t < M.zero + 0.8; X.fillStyle = '#1a0e08'; X.fillRect(0, 0, W, H);
      if (z) { const mm = t < M.zero ? 59 : 0, hh = t < M.zero ? 23 : 0; wallClock(t, 540, 900, 1.6, hh, mm + (t < M.zero ? lin(t, M.clock, M.zero) * 0.99 : 0)); txt(t < M.zero ? '23:59' : '00:00', 540, 1420, font('bebas', 400, 120), t < M.zero ? '#f6efe2' : '#e8322f'); }
      else { const f = lin(t, M.zero + 0.8, M.zero + 1.4); X.save(); cam(540, 960, 1.0); dayBadge(540, 960, 6, f < 0.5 ? 'DAY 1216' : 'DAY 0', f, f < 0.5 ? '#e0601c' : '#9a9a9a'); X.restore(); } }
    else if (t < M.churro) { // ---- "And now I'm zero" / one night, no counting ----
      const cur = t < Le('r1') ? 'r' : t < Lt('g2') - 0.1 ? 'p' : t < Lt('p2') - 0.1 ? 'g' : 'p';
      const ws = { r: [900, 1150, 2.0], p: [380, 1150, 1.5], g: [640, 1150, 1.6] };
      const go0 = eo(lin(t, Lt('p2') + 1.0, Le('p2'))); X.save(); if (t > Lt('p2') - 0.1) cam(mix(380, 760, go0), 1150, mix(1.5, 1.3, go0)); else cam(...ws[cur]); closedBar(t, 0.6, 1); R(t, 960, 1250, 0.55, { mood: 'sad', lookY: 1 }); dripsAt(t, 960, 1170, 0.35);
      const go = eo(lin(t, Lt('p2') + 1.0, Le('p2'))); P(t, mix(380, 820, go), 1300, 0.6, { mood: 'neutral', calm: true, seed: 10, lookX: 1, walk: go > 0 && go < 1 });
      F(t, 520, 1290, 0.48, { mood: 'worried' }); G(t, 680, 1300, 0.45, { mood: 'worried', point: t > Lt('g2') && t < Le('g2') });
      X.restore(); say(t, 'r1', 860, 800, { size: 48 }); say(t, 'p1', 400, 760, { size: 54 }); say(t, 'g2', 660, 780, { size: 60 }); say(t, 'p2', 420, 740, { size: 50 }); }
    else if (t < M.flamenco) { // ---- churrería, 04:00 ----
      X.save(); keyCam(t, [[M.churro, 540, 1050, 1.0], [Lt('r2') - 0.1, 500, 1100, 1.3], [Lt('p3') - 0.1, 400, 1100, 1.5]]); churreria(t); baker(t, 760, 1060, 0.6, {});
      X.fillStyle = '#9a6a3a'; X.fillRect(-500, 1150, W + 1000, 60); cupChoc(300, 1130, 0.7); cupChoc(520, 1130, 0.7);
      R(t, 560, 1290, 0.6, { mood: t < Le('r2') ? 'shock' : 'neutral', point: t > Lt('r2') && t < Le('r2') }); P(t, 300, 1310, 0.6, { mood: 'happy', calm: true, seed: 10, lookX: 1 });
      if (t > Lt('r2') + 0.6 && t < Le('r2')) { const n = Math.floor((t - Lt('r2')) * 1.5) % 2 ? '4?' : '2?'; X.save(); X.translate(640, 1000); txt(n, 0, 0, font('anton', 400, 90), '#e0601c'); X.restore(); }
      X.restore(); say(t, 'r2', 560, 760, { size: 50 }); say(t, 'p3', 320, 780, { size: 58 }); }
    else if (t < M.metro) { // ---- the flamenco cellar ----
      const d = t - M.flamenco; const on = eo(lin(d, 1.0, 2.2));
      X.save(); keyCam(t, [[M.flamenco, 540, 1050, 1.0], [M.flamenco + 3.0, 560, 1050, 1.15], [M.metro - 2.5, 540, 1000, 1.25]]); tablao(t);
      dancer(t, mix(260, 360, on), 1060, 0.6); const stomp = Math.abs(Math.sin(t * 7)) * -30 * on; X.save(); X.translate(mix(900, 680, on), 1180 + stomp); X.rotate(Math.sin(t * 6) * 0.2 * on); R(t, 0, 0, 0.6, { mood: on > 0.5 ? 'laugh' : 'shock', raise: on > 0.5 }); X.restore();
      P(t, 820, 1470, 0.45, { mood: 'happy', calm: true, seed: 11, wink: Math.floor(t * 3) % 2 === 0 });
      if (on > 0.5) for (let i = 0; i < 6; i++) { const k = (t * 0.8 + i / 6) % 1; X.fillStyle = `rgba(255,${160 + i * 10},60,${0.8 * (1 - k)})`; X.beginPath(); X.arc(mix(900, 680, on) + Math.sin(i * 2 + t * 3) * 120, 1080 - k * 400, 14 * (1 - k) + 4, 0, 7); X.fill(); }
      X.restore(); }
    else if (t < M.busk) { // ---- empty metro car, a reflection without a number ----
      X.save(); keyCam(t, [[M.metro, 540, 1000, 1.0], [Lt('r3') - 0.1, 700, 900, 1.6], [Lt('p4') - 0.1, 540, 1000, 1.2]]); metroInside(t);
      X.save(); X.globalAlpha = 0.35; X.translate(700, 700); X.scale(-1, 1); flame(t, 0, 0, 0.45, { shades: true, noLids: true, mood: 'sad', day: '', t }); X.restore();
      R(t, 700, 1000, 0.6, { mood: 'sad', lookX: -0.6, lookY: -0.8 }); P(t, 350, 1010, 0.6, { mood: 'neutral', calm: true, seed: 11, lookX: 1 });
      X.restore(); say(t, 'r3', 720, 520, { size: 52 }); say(t, 'p4', 350, 700, { size: 58 }); }
    else if (t < M.roof) { // ---- the busker: corazón de… coliflor ----
      const lol = t > Lt('lp') - 0.2;
      X.save(); keyCam(t, [[M.busk, 540, 1050, 1.0], [Lt('r4') - 0.1, 640, 1100, 1.3]]); streetNight(t); busker(t, 240, 1200, 0.7);
      P(t, 500, 1300, 0.6, { mood: lol ? 'happy' : 'happy', wink: lol && Math.floor(t * 4) % 2 === 0, seed: 12, armsUp: !lol && t < Le('p5') }); R(t, 780, 1290, 0.6, { mood: lol ? 'laugh' : (t > Lt('r4') ? 'smug' : 'neutral') });
      if (t > M.busk + 0.5 && t < Le('r4')) for (let i = 0; i < 4; i++) { const k = (t * 0.6 + i / 4) % 1; txt('♪', 300 + i * 120 + Math.sin(t * 3 + i) * 30, 1000 - k * 300, font('inter', 900, 60), `rgba(255,236,170,${1 - k})`); }
      X.restore(); say(t, 'p5', 500, 780, { size: 50 }); say(t, 'r4', 780, 760, { size: 50 }); }
    else if (t < M.stamp) { // ---- rooftop at dawn ----
      const k = lin(t, M.roof, M.stamp); const cur = t < Lt('r5') - 0.1 ? 'w' : t < Lt('p6') - 0.1 ? 'r' : t < Lt('r7') - 0.6 ? 'w2' : t < Lt('r8') - 0.1 ? 'r' : 'w2';
      const ws = { w: [540, 1000, 1.0], r: [680, 1080, 1.8], w2: [560, 1050, 1.3] };
      X.save(); cam(...ws[cur]); dawnRoof(t, k); P(t, 420, 1180, 0.6, { mood: t > Lt('p7') ? 'happy' : 'neutral', calm: true, seed: 12, lookX: 1 });
      R(t, 680, 1180, 0.6, { mood: t > Lt('r7') - 0.3 && t < Le('r7') + 0.6 ? 'laugh' : (t > Le('r7') ? 'smug' : 'neutral'), day: dayTxt(t) });
      if (t > M.day1 - 0.2 && t < M.day1 + 1.5) { const a = 1 - lin(t, M.day1, M.day1 + 1.5); X.strokeStyle = `rgba(255,236,170,${a})`; X.lineWidth = 8; X.beginPath(); X.arc(680, 1180 + 134 * 0.6, 60 + (t - M.day1) * 120, 0, 7); X.stroke(); }
      if (t > Lt('r8')) { X.save(); X.translate(560, 1150); X.fillStyle = '#6e1f2a'; rr(-50, -70, 100, 140, 10); X.fill(); X.restore(); }
      X.restore(); say(t, 'r5', 640, 640, { size: 44 }); say(t, 'p6', 420, 760, { size: 56 }); say(t, 'r6', 680, 760, { size: 60 }); say(t, 'p7', 420, 760, { size: 66 }); say(t, 'r7', 680, 760, { size: 66 }); say(t, 'r8', 680, 760, { size: 56 }); }
    else if (t < M.hook) { passportShot(t, M.stamp, 6, 6, { photo: true }); if (t > M.stamp + 0.6) for (let i = 0; i < 6; i++) { const k = ((t - M.stamp - 0.6) * 0.7 + i / 6) % 1; X.fillStyle = `rgba(255,255,255,${0.35 * (1 - k)})`; X.beginPath(); X.arc(W / 2 + 130 + Math.sin(i * 3 + t * 2) * 50, 980 + 250 - k * 300, 20 + k * 40, 0, 7); X.fill(); } }
    else { // ---- hook: the whole city turns red ----
      const k = lin(t, M.hook + 0.3, M.hook + 2.0); X.save(); keyCam(t, [[M.hook, 540, 960, 1.0], [Le('d1'), 540, 900, 1.25]]); redCity(t, k, ['PASSPORT. 24 HOURS.', 'OR LA ESQUINA CLOSES.']); X.restore();
      if (t > M.hook + 2.4) { const n = Math.floor((t - M.hook - 2.4) * 14); for (let i = 0; i < Math.min(n, 30); i++) { X.save(); X.translate(hash(i * 3) * W, 1150 + hash(i * 7) * 600); X.rotate((hash(i) - 0.5) * 0.4); X.fillStyle = '#fff'; rr(-170, -40, 340, 80, 18); X.fill(); X.fillStyle = '#e8322f'; X.beginPath(); X.arc(-130, 0, 22, 0, 7); X.fill(); txt('24:00:00', 20, 3, font('anton', 400, 36), '#c0182a'); X.restore(); } }
      say(t, 'd1', 540, 1500, { size: 52, bg: '#2a0505', fg: '#ff9a9a', nosub: true });
      if (t > Le('d1') + 0.2) { X.fillStyle = '#000'; X.fillRect(0, 0, W, H); } }
    X.restore(); titleCard(t, 10, 'Día 1', '#2a2440'); letterbox(); fadeEnd(t, DUR, 0.4);
  } };
})();
