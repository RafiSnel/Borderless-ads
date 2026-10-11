// 16 · "The bathroom lesson" — a short 2D story with 3D moments: boss speaks Italian, Pasito escapes to the toilet, today's lesson is exactly this.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('16n');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const END = e(12) + 0.2, DUR = END + 1.8; window.DURATION = DUR;
  const BRICK = '#8a3b26', WARM = '#f2c46b', CREAM = '#f6efe2', INK = '#1d1410', TERRA = '#c4622d', TILE = '#9cc7d6';
  const speaking = (n, t) => t >= s(n) && t <= e(n) ? 0.35 + 0.65 * Math.abs(Math.sin((t - s(n)) * 17)) : 0;
  const cues = [['guitar', 0.05, 0.6], ['pop', p(1, 1), 0.5], ['pop', p(1, 2), 0.5], ['impact', p(1, 3), 0.7], ['boing', s(2) - 0.3, 0.4],
    ['gasp', s(3) - 0.2, 0.5], ['wahwah', p(3, 1), 0.5], ['whoosh', e(4) + 0.05, 0.9], ['whoosh', e(4) + 0.3, 0.6], ['impact', s(5) - 0.15, 0.9],
    ['vibrate', s(6) + 0.1, 0.6], ['whoosh', s(6) + 0.5, 0.5], ['type', s(7), 0.6], ['stamp', p(7, 1) || s(7) + 0.9, 0.8], ['pop', p(8, 0), 0.6], ['pop', p(8, 3) || s(8) + 1.4, 0.6],
    ['click', s(9) - 1.0, 0.7], ['whoosh', s(9) - 0.9, 0.6], ['swell', s(9) - 0.6, 0.4], ['fanfare', s(10), 0.6], ['ding', s(11), 0.4], ['coin', END, 0.6]];
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [p(1, 3), s(5) - 0.15, s(10)];

  function speedLines(t, a = 0.5) { X.strokeStyle = `rgba(255,255,255,${a})`; X.lineWidth = 5; for (let i = 0; i < 26; i++) { const y = hash(i) * H, x = ((hash(i * 3) * W + t * 3000) % (W + 400)) - 200; X.beginPath(); X.moveTo(x, y); X.lineTo(x + 180, y); X.stroke(); } }
  // ---------- sets ----------
  function restaurant(t, dark = 0) {
    X.fillStyle = BRICK; X.fillRect(0, 0, W, H);
    for (let y = 0; y < 1300; y += 60) for (let x = (y / 60) % 2 ? -60 : 0; x < W; x += 120) { X.fillStyle = hash(x * 3 + y) > 0.5 ? '#94422c' : '#7d3422'; X.fillRect(x + 3, y + 3, 114, 54); }
    for (let i = 0; i < 3; i++) { const x = 200 + i * 340, sw = Math.sin(t * 1.2 + i) * 6; X.strokeStyle = '#2a1a12'; X.lineWidth = 4; X.beginPath(); X.moveTo(x, 0); X.lineTo(x + sw, 260); X.stroke();
      X.fillStyle = '#2a1a12'; X.beginPath(); X.moveTo(x + sw - 70, 330); X.lineTo(x + sw + 70, 330); X.lineTo(x + sw + 30, 260); X.lineTo(x + sw - 30, 260); X.fill();
      const g = X.createRadialGradient(x + sw, 340, 10, x + sw, 340, 420); g.addColorStop(0, 'rgba(255,214,140,0.55)'); g.addColorStop(1, 'rgba(255,214,140,0)'); X.fillStyle = g; X.fillRect(x - 450, 300, 900, 900); }
    X.fillStyle = '#4a2a1a'; X.fillRect(0, 1300, W, H - 1300); X.fillStyle = '#5a3420'; for (let x = 0; x < W; x += 140) X.fillRect(x, 1300, 6, H);
    X.fillStyle = CREAM; X.beginPath(); X.ellipse(860, 1330, 220, 40, 0, 0, 7); X.fill(); X.fillStyle = '#3a2416'; X.fillRect(850, 1340, 20, 260);
    if (dark) { X.fillStyle = `rgba(10,5,20,${dark})`; X.fillRect(0, 0, W, H); }
  }
  function toilet(t) {
    X.fillStyle = TILE; X.fillRect(0, 0, W, H); X.strokeStyle = 'rgba(255,255,255,0.5)'; X.lineWidth = 4;
    for (let x = 0; x < W; x += 120) { X.beginPath(); X.moveTo(x, 0); X.lineTo(x, H); X.stroke(); } for (let y = 0; y < H; y += 120) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    X.fillStyle = '#e8eef0'; X.fillRect(0, 1450, W, 470);
    X.fillStyle = '#ffffff'; rr(340, 1040, 400, 120, 40); X.fill(); rr(380, 1150, 320, 300, 60); X.fill(); X.fillStyle = '#dfe7ea'; rr(400, 820, 280, 230, 20); X.fill();
    const g = X.createRadialGradient(540, 200, 10, 540, 200, 700); g.addColorStop(0, 'rgba(255,255,255,0.5)'); g.addColorStop(1, 'rgba(255,255,255,0)'); X.fillStyle = g; X.fillRect(0, 0, W, 900);
  }
  function wcDoor(t, x, y, ang, label = true) { // the door to the WC swings on its hinge (3D)
    hingePlane(x, y, 420, 900, ang, () => { X.fillStyle = '#6b4a2e'; rr(0, 0, 420, 900, 10); X.fill(); X.fillStyle = '#7d5a3a'; rr(40, 60, 340, 340, 8); X.fill(); rr(40, 470, 340, 380, 8); X.fill();
      if (label) { X.fillStyle = CREAM; rr(130, 160, 160, 120, 14); X.fill(); txt('WC', 210, 222, font('anton', 400, 80), INK); } X.fillStyle = WARM; X.beginPath(); X.arc(370, 470, 18, 0, 7); X.fill(); },
      () => { X.fillStyle = '#5a3d25'; rr(0, 0, 420, 900, 10); X.fill(); }, { key: 'door', persp: 2000 });
  }
  function boss(t, x, y, sc, talk = 0, mood = 'neutral') {
    X.save(); X.translate(x, y + Math.sin(t * 2) * 4); X.scale(sc, sc);
    X.fillStyle = '#2b2b33'; rr(-120, 220, 100, 240, 30); X.fill(); rr(20, 220, 100, 240, 30); X.fill();
    X.fillStyle = '#ffffff'; rr(-210, -80, 420, 360, 110); X.fill(); X.fillStyle = '#d9d9d9'; for (let i = 0; i < 3; i++) { X.beginPath(); X.arc(-50, -10 + i * 70, 12, 0, 7); X.arc(50, -10 + i * 70, 12, 0, 7); X.fill(); }
    X.fillStyle = TERRA; X.fillRect(-140, 160, 280, 120);
    X.fillStyle = '#e0a87e'; X.beginPath(); X.arc(0, -190, 125, 0, 7); X.fill();
    X.fillStyle = '#ffffff'; rr(-110, -420, 220, 150, 50); X.fill(); X.beginPath(); X.arc(-70, -400, 70, 0, 7); X.arc(0, -430, 80, 0, 7); X.arc(70, -400, 70, 0, 7); X.fill();
    X.fillStyle = INK; X.beginPath(); X.arc(-45, -210, 12, 0, 7); X.arc(45, -210, 12, 0, 7); X.fill();
    X.lineWidth = 9; X.strokeStyle = INK; X.beginPath(); if (mood === 'happy') { X.moveTo(-70, -240); X.lineTo(-20, -250); X.moveTo(20, -250); X.lineTo(70, -240); } else { X.moveTo(-70, -250); X.lineTo(-20, -238); X.moveTo(20, -238); X.lineTo(70, -250); } X.stroke();
    X.fillStyle = '#3a2416'; X.beginPath(); X.ellipse(-38, -150, 52, 20, 0.2, 0, 7); X.ellipse(38, -150, 52, 20, -0.2, 0, 7); X.fill(); // moustache
    if (talk > 0.05) { X.fillStyle = '#5a1a1a'; X.beginPath(); X.ellipse(0, -118, 26, 8 + talk * 18, 0, 0, 7); X.fill(); }
    else { X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); if (mood === 'happy') X.arc(0, -135, 28, 0.2 * Math.PI, 0.8 * Math.PI); else { X.moveTo(-22, -118); X.lineTo(22, -118); } X.stroke(); }
    X.restore();
  }
  function bubble2(t, t0, t1, text, x, y, o = {}) { if (t < t0 || t > t1) return; HOST.say(t, t0, t1, text, x, y, { size: o.size || 58, maxw: o.maxw || 760, tail: o.tail ?? -0.3 }); }
  function subtitle(t, t0, t1, text) { if (t < t0 || t > t1) return; const a = eo(lin(t, t0, t0 + 0.2)) * (1 - lin(t, t1 - 0.15, t1)); X.save(); X.globalAlpha = a;
    X.font = font('inter', 800, 46); const w = X.measureText(text).width + 60; X.fillStyle = 'rgba(0,0,0,0.65)'; rr(W / 2 - w / 2, 1690, w, 84, 18); X.fill(); txt(text, W / 2, 1734, font('inter', 800, 46), '#fff'); X.restore(); }
  function phoneLesson(t, t0) { // the lesson card on Pasito's phone (drawn in Borderless style)
    return () => { X.fillStyle = '#1b1814'; rr(10, 10, 560, 1160, 70); X.fill(); X.fillStyle = CREAM; rr(30, 30, 520, 1120, 54); X.fill();
      txt("TODAY'S LESSON", 290, 140, font('inter', 800, 34), '#9a8f7e'); txt('Lesson 7 of 50', 290, 190, font('inter', 700, 30), TERRA);
      const title = 'Closing up for the night', n = Math.floor(title.length * cl((t - t0) / 0.9));
      X.font = font('inter', 900, 60); txt(title.slice(0, n).split(' ').slice(0, 2).join(' '), 290, 300, font('inter', 900, 60), INK); txt(title.slice(0, n).split(' ').slice(2).join(' '), 290, 370, font('inter', 900, 60), INK);
      txt('For: your restaurant job · A2', 290, 450, font('inter', 700, 30), '#9a8f7e');
      [['chiudere', 'to close', p(8, 0)], ['stasera', 'tonight', p(8, 3) || s(8) + 1.4], ['Certo!', 'sure!', s(9) - 1.4]].forEach(([a, b, tt], i) => { if (t < tt) return; const k = back(lin(t, tt, tt + 0.3), 2);
        X.save(); X.translate(290, 600 + i * 170); X.scale(k, k); X.fillStyle = i === 2 ? WARM : '#fff'; rr(-220, -60, 440, 120, 30); X.fill(); X.strokeStyle = '#e6dccb'; X.lineWidth = 4; X.stroke();
        txt(a, 0, -14, font('inter', 900, 50), TERRA); txt(b, 0, 34, font('inter', 700, 30), INK); X.restore(); });
    };
  }

  window.SCENE = {
    frame(t) {
      X.save(); camera(t, hits, [s(2), s(5), s(6), s(9) - 1.0, s(11)], 16);
      const inToilet = t >= s(5) - 0.15 && t < s(9) - 1.0;
      if (t < s(5) - 0.15) {
        // the restaurant: Pasito wipes a table, the boss arrives
        const push = t >= s(2) && t < s(4) ? eo(lin(t, s(2), s(2) + 2.5)) * 0.18 : 0;
        X.save(); X.translate(W / 2, H / 2); X.scale(1 + push, 1 + push); X.translate(-W / 2 - push * 300, -H / 2);
        restaurant(t);
        const bin = eo(lin(t, p(1, 2) - 0.2, p(1, 2) + 0.3));
        boss(t, mix(W + 400, 800, bin), 1180, 1.0, speaking(2, t), 'neutral');
        const flee = lin(t, e(4) + 0.05, e(4) + 0.5);
        mascot(t, mix(270, -400, ei(flee)), 1250, 1.35, { mood: t < s(3) ? 'happy' : 'worried', wide: t >= s(3), sweat: t >= s(3), talk: speaking(4, t), lookX: 1, seed: 2, walk: flee > 0 ? t * 30 : null });
        if (flee > 0) speedLines(t, 0.6 * (1 - flee));
        X.restore();
        if (t < s(2)) { slam(t, 0.2, 'FIRST WEEK.', W / 2, 260, font('anton', 400, 120), CREAM, {}); if (t > p(1, 1)) slam(t, p(1, 1), 'NEW BOSS.', W / 2, 400, font('anton', 400, 120), WARM, {}); if (t > p(1, 3)) slam(t, p(1, 3), 'ONLY SPEAKS ITALIAN.', W / 2, 540, font('anton', 400, 90), '#fff', { rot: -0.08 }); }
        bubble2(t, s(2), s(3) + 0.6, 'Senti… stasera chiudi tu?', 560, 520, { tail: 0.35 });
        subtitle(t, s(2), s(3) + 0.6, '?????');
        if (t >= s(3) && t < s(4)) { for (let i = 0; i < 3; i++) { const a = t * 3 + i * 2.1; X.save(); X.translate(300 + Math.cos(a) * 150, 880 + Math.sin(a) * 50); X.scale(Math.cos(t * 4 + i), 1); txt('?', 0, 0, font('anton', 400, 130), WARM); X.restore(); } slam(t, s(3), 'YOU UNDERSTOOD…', W / 2, 260, font('anton', 400, 100), CREAM, {}); if (t > p(3, 1)) slam(t, p(3, 1), 'NOTHING.', W / 2, 400, font('anton', 400, 150), WARM, { rot: -0.1 }); }
        bubble2(t, s(4), e(4) + 0.1, 'Ehm… scusi… il bagno?', 470, 850, { tail: -0.35 });
        subtitle(t, s(4), e(4) + 0.1, 'Uh… sorry… the bathroom?');
      } else if (inToilet) {
        if (t < s(6)) { // the WC door slams shut (3D)
          restaurant(t, 0.2); const a = Math.PI * 0.55 * (1 - eo(lin(t, s(5) - 0.15, s(5) + 0.15))); wcDoor(t, 330, 980, a);
          slam(t, s(5), 'CLASSIC.', W / 2, 360, font('anton', 400, 170), WARM, { rot: -0.1 });
        } else {
          toilet(t);
          mascot(t, 520, 1000, 1.25, { mood: t < s(7) ? 'o' : 'happy', wide: t < s(7), seed: 3, lookY: 1, lookX: 1 });
          // the phone flips up in front of him (3D) and fills more of the frame
          const k = lin(t, s(6) + 0.2, s(6) + 0.8), big = eo(lin(t, s(7) - 0.4, s(7) + 0.2));
          X.save(); X.translate(mix(780, W / 2, big), mix(1230, 980, big)); X.scale(mix(0.4, 1.12, big), mix(0.4, 1.12, big));
          flipPlane(0, 0, 580, 1180, (1 - eo(k)) * Math.PI * 0.9, phoneLesson(t, s(7)), () => { X.fillStyle = '#1b1814'; rr(10, 10, 560, 1160, 70); X.fill(); }, { key: 'ph16', persp: 1800, shadow: false });
          X.restore();
          if (t < s(7)) { slam(t, s(6) + 0.1, 'YOUR COURSE IS BUILT', W / 2, 200, font('anton', 400, 84), INK, {}); slam(t, p(6, 2) || s(6) + 1.4, 'AROUND THIS JOB.', W / 2, 300, font('anton', 400, 84), TERRA, {}); }
          else if (t < s(8)) slam(t, p(7, 1) || s(7) + 0.9, 'LITERALLY.', W / 2, 220, font('anton', 400, 140), TERRA, { rot: -0.1 });
        }
      } else if (t < s(11)) {
        restaurant(t);
        const back_ = eo(lin(t, s(9) - 1.0, s(9) - 0.3));
        wcDoor(t, -60, 980, Math.PI * 0.55 * (1 - eo(lin(t, s(9) - 0.2, s(9) + 0.5))) + 0.02, true);
        boss(t, 820, 1180, 1.0, speaking(10, t), t >= s(10) ? 'happy' : 'neutral');
        mascot(t, mix(-200, 290, back_), 1250, 1.35, { mood: 'happy', talk: speaking(9, t), seed: 4, acc: t > s(9) ? ['shades'] : [], walk: back_ < 1 ? t * 30 : null, armsUp: t > s(10) });
        bubble2(t, s(9), s(10) + 0.4, 'Certo! Stasera chiudo il ristorante.', 480, 820, { tail: -0.35, size: 52, maxw: 640 });
        subtitle(t, s(9), s(10) + 0.4, "Sure! I'll close the restaurant tonight.");
        bubble2(t, s(10), s(11) + 0.4, 'Bravo!', 720, 620, { tail: 0.3, size: 70 });
        confetti(t, s(10) + 0.05, W / 2, 800, 50);
      } else {
        restaurant(t, 0.6 * eo(lin(t, s(11), s(11) + 0.4)));
        if (t < s(12)) { slam(t, s(11), 'LESSONS FOR THE', W / 2, 720, font('anton', 400, 96), CREAM, {}); slam(t, s(11) + 0.4, 'CONVERSATIONS', W / 2, 850, font('anton', 400, 110), WARM, {}); slam(t, p(11, 1) || s(11) + 1.6, "YOU'RE ABOUT TO HAVE.", W / 2, 980, font('anton', 400, 96), CREAM, {}); }
        else { coinIn(t, s(12), W / 2, 740, 160, { glow: 'rgba(242,196,107,0.6)' }); slam(t, s(12) + 0.1, 'Borderless', W / 2, 1020, font('inter', 900, 150), '#fff', {});
          if (t > END) txt('€9,99 per course · borderlesslearn.com', W / 2, 1150, font('inter', 700, 38), CREAM, { a: eo(lin(t, END, END + 0.4)) }); }
      }
      X.restore();
      grain(t, 0.04);
    },
  };
})();
