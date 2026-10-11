// La Esquina · Ep. 3 — Viral
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep03');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'smug', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);
  const C = (t, x, y, s, m = {}) => carmen(t, x, y, s, { mood: 'neutral', ...m, talk: tk('carmen', t) });
  const words = [0.05, 1.6, 2.8, 4.2, 5.35].map((o) => Lt('f1') + o), cardsTxt = ['CERVEZA', 'THREE', 'FRIENDS', 'PAY', 'ME'];
  const cues = [['whoosh', M.selfies, 0.4]];
  for (let i = 0; i < 10; i++) cues.push(['shutter', M.selfies + 0.1 + i * 0.13, 0.35]);
  cues.push(['whoosh', M.hq, 0.4]); words.forEach((w) => cues.push(['flap', w - 0.05, 0.6]));
  cues.push(['wahwah', M.views + 0.6, 0.6], ['tick', M.views + 0.2, 0.3], ['whoosh', M.door, 0.4], ['impact', Lt('r2') + 0.6, 0.3], ['whoosh', M.toog, 0.3], ['vibrate', M.dm, 0.5], ['stamp', M.stamp + 0.55, 1], ['whoosh', M.photo, 0.3], ['tick', M.photo + 2, 0.4], ['tick', M.photo + 3, 0.4], ['impact', DUR - 1.3, 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.38 };
  const hits = [M.hq, M.bar, Lt('c2'), DUR - 1.3];
  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, hits, [], 10);
    if (t < M.hq) { // the street: recognised
      const sel = t > M.selfies; X.save(); keyCam(t, [[0, 540, 1050, 1.0], [M.selfies, 480, 1150, 1.25], [Lt('p1') - 0.2, 500, 1180, 1.9]]); streetDay(t);
      const tc = ['#5a4a7a', '#2f6b6a', '#8a3a4a', '#4a5a8a']; for (let i = 0; i < 4; i++) teen(t, mix(1300 + i * 140, 700 + i * 110, eo(lin(t, 1.8 + i * 0.15, 2.6 + i * 0.15))), 1280, 0.9, { col: tc[i], flash: sel });
      const hide = t > Le('p1'); P(t, 420, 1300, 0.9, { mood: sel ? 'worried' : 'happy', wide: sel, lookX: 1, sweat: sel, seed: 2 });
      X.save(); X.translate(hide ? 420 : 300, hide ? 1200 : 1280); X.rotate(hide ? 0 : -0.8); X.fillStyle = '#d9a441'; rr(-30, -170, 60, 340, 30); X.fill(); X.restore();
      if (sel && t < Le('p1')) { X.save(); X.translate(560, 1000); X.rotate(0.08); X.fillStyle = '#fff'; rr(-90, -60, 180, 120, 8); X.fill(); X.strokeStyle = '#6e1f2a'; X.lineWidth = 6; X.strokeRect(-40, -35, 60, 70); X.restore(); }
      X.restore(); if (sel && t < M.selfies + 1.5) { X.fillStyle = `rgba(255,255,255,${0.5 * Math.max(0, Math.sin(t * 40))})`; X.fillRect(0, 0, W, H); }
      say(t, 't1', 700, 640, { size: 52 }); say(t, 'p1', 420, 760, { size: 54 });
    } else if (t < M.bar) { // HQ: the video on the big screen
      X.save(); cam(540, 950, 1.05 + (t - M.hq) * 0.02); meetingRoom(t); X.fillStyle = '#000'; rr(140, 280, 800, 520, 10); X.fill();
      X.save(); X.beginPath(); X.rect(150, 290, 780, 500); X.clip(); X.translate(540, 540); X.scale(0.42, 0.42); X.translate(-540, -1050); bar(t); hero(t, 540, 1150, 0.9, { acc: ['shades', 'headband'], wink: true, mood: 'happy' }); X.restore();
      txt('⏸ 2,300,000 views', 540, 760, font('mono', 700, 40), '#ffd27a');
      R(t, 300, 1180, 0.85, { mood: 'neutral', point: true }); G(t, 600, 1290, 0.62, { mood: 'shock' }); F(t, 830, 1290, 0.6, { mood: 'neutral', lookX: -1 }); X.restore();
      say(t, 'r1', 540, 1640, { size: 52, tail: -0.35 });
    } else if (t < M.door) { // the failed remake
      if (t < M.views) { X.save(); keyCam(t, [[M.bar, 560, 1080, 1.4], [Lt('c1') - 0.1, 700, 1050, 1.9], [Lt('g1') - 0.2, 540, 1080, 1.2]]); bar(t);
          C(t, 860, 1000, 0.55, { mood: t > Lt('c1') ? 'neutral' : 'neutral', lookX: -1 });
          G(t, 260, 1150, 0.7, { mood: t > Lt('g1') ? 'neutral' : 'happy', acc: true }); X.save(); X.translate(340, 1090); X.fillStyle = '#111'; rr(-26, -46, 52, 92, 8); X.fill(); X.fillStyle = '#e02424'; X.beginPath(); X.arc(0, -30, 6, 0, 7); X.fill(); X.restore();
          let ci = -1; words.forEach((w, i) => { if (t >= w - 0.05) ci = i; });
          F(t, 560, 1140, 0.75, { mood: 'smug', point: ci >= 0 && t < Le('f1') });
          if (ci >= 0 && t < Le('f1') + 0.4) { const k = back(lin(t, words[ci] - 0.05, words[ci] + 0.12), 3); X.save(); X.translate(660, 900); X.scale(k, k); X.rotate(-0.05); X.fillStyle = '#fff'; rr(-150, -70, 300, 140, 12); X.fill(); X.strokeStyle = '#e04848'; X.lineWidth = 4; X.beginPath(); X.moveTo(-150, -40); X.lineTo(150, -40); X.stroke(); txt(cardsTxt[ci], 0, 14, font('anton', 400, 64), '#3a5bd0'); X.restore(); }
          if (t > Le('c1')) { [[440, 1250], [540, 1250], [640, 1250]].forEach(([x, y]) => { X.fillStyle = 'rgba(200,230,255,0.7)'; rr(x - 22, y, 44, 80, 8); X.fill(); }); X.fillStyle = '#fff'; rr(720, 1290, 120, 60, 6); X.fill(); txt('€14', 780, 1322, font('mono', 700, 36), INK); }
          table(t, true); X.restore();
          say(t, 'c1', 760, 640, { size: 56, tail: 0.25 }); say(t, 'g1', 330, 760, { size: 54 }); }
      else { X.fillStyle = '#2a1d16'; X.fillRect(0, 0, W, H); phoneUI(t, W / 2, 940, 620, (w, h) => { X.fillStyle = '#fff'; X.fillRect(-w, -h, 2 * w, 2 * h); X.fillStyle = '#ddd'; rr(-w / 2 + 30, -h / 2 + 110, w - 60, 560, 16); X.fill();
          txt('▶', 0, -h / 2 + 390, font('inter', 900, 120), '#999'); X.textAlign = 'left'; X.font = font('inter', 800, 40); X.fillStyle = INK; X.fillText('👁 3 views', -w / 2 + 40, -h / 2 + 740); X.font = font('inter', 500, 36); X.fillStyle = '#666'; X.fillText('@user123: is this an ad?', -w / 2 + 40, -h / 2 + 820); X.textAlign = 'center'; }); }
    } else if (t < M.toog) { // the door: applause
      X.save(); keyCam(t, [[M.door, 540, 1000, 1.0], [Lt('r2') - 0.3, 240, 1090, 2.2]]); bar(t);
      P(t, mix(1250, 860, eo(lin(t, M.door, M.door + 1.2))), 1150, 0.8, { mood: 'worried', walk: t < M.door + 1.2 ? t * 6 : undefined, lookX: -1, seed: 4 });
      R(t, 230, 1150, 0.78, { mood: 'neutral' }); G(t, 440, 1130, 0.75, { mood: 'happy', point: t > M.door + 1.6 && t < M.door + 2.4 }); F(t, 650, 1140, 0.72, { mood: 'neutral' }); table(t, true);
      for (let i = 0; i < 10; i++) { const k = ((t * 3 + i / 10) % 1); X.fillStyle = `rgba(255,255,255,${0.6 * (1 - k)})`; txt('👏', 100 + hash(i) * 880, 900 - k * 200, font('inter', 400, 60), '#fff'); }
      if (t > Lt('r2') + 0.5) { X.strokeStyle = '#e0a060'; X.lineWidth = 10; X.beginPath(); X.moveTo(300, 960); X.lineTo(330, 1000); X.moveTo(340, 960); X.lineTo(310, 1000); X.stroke(); }
      X.restore(); say(t, 'r2', 300, 640, { size: 58 });
    } else if (t < M.dm) { // at the counter with Carmen
      const shotC = t > Lt('c3') - 0.2 && t < Le('c3') + 0.3;
      X.save(); keyCam(t, [[M.toog, 540, 1100, 1.0], [Lt('c3') - 0.2, 660, 900, 1.9], [Lt('p3') - 0.1, 400, 1100, 1.6], [Lt('c4') - 0.1, 540, 1050, 1.1]]); toog(t);
      C(t, 680, 950, 0.75, { mood: shotC ? 'sad' : 'warm', lookX: -1 }); P(t, 360, 1250, 0.95, { mood: t > Lt('c2') ? 'happy' : 'neutral', lookX: 1, wide: t > Lt('c3'), seed: 3 });
      if (t > Lt('c2') - 0.2) { const k = eo(lin(t, Lt('c2') - 0.2, Lt('c2') + 0.3)); X.save(); X.translate(mix(700, 520, k), 1180); X.fillStyle = 'rgba(255,255,255,0.6)'; rr(-30, -50, 60, 100, 10); X.fill(); X.fillStyle = '#f2c14e'; rr(-26, -30, 52, 76, 8); X.fill(); X.fillStyle = '#fff'; rr(-28, -48, 56, 22, 8); X.fill(); X.restore(); }
      X.restore(); say(t, 'c2', 680, 600, { size: 58, tail: 0.2 }); say(t, 'p2', 380, 760, { size: 56 }); say(t, 'c3', 600, 560, { size: 58, tail: 0.2 }); say(t, 'p3', 380, 760, { size: 60 }); say(t, 'c4', 640, 600, { size: 58, tail: 0.2 });
    } else if (t < M.looks) { // the DM
      X.fillStyle = '#2a1d16'; X.fillRect(0, 0, W, H); phoneUI(t, W / 2, 900, 600, (w, h) => { X.fillStyle = '#f6efe2'; X.fillRect(-w, -h, 2 * w, 2 * h); X.textAlign = 'left';
          X.font = font('inter', 800, 40); X.fillStyle = INK; X.fillText('Messages', -w / 2 + 40, -h / 2 + 140); X.fillStyle = '#fff'; rr(-w / 2 + 30, -h / 2 + 200, w - 60, 330, 30); X.fill();
          X.fillStyle = '#c4622d'; X.beginPath(); X.arc(-w / 2 + 90, -h / 2 + 260, 34, 0, 7); X.fill(); X.font = font('inter', 800, 34); X.fillStyle = INK; X.fillText('A language app', -w / 2 + 140, -h / 2 + 272);
          X.font = font('inter', 500, 32); X.fillStyle = '#4a4038'; ['We loved your video.', 'Want to be the face of', 'our next campaign?'].forEach((l, i) => X.fillText(l, -w / 2 + 60, -h / 2 + 350 + i * 46)); X.textAlign = 'center'; });
      if (t > Lt('p4') - 0.2) { X.fillStyle = 'rgba(0,0,0,0.5)'; X.fillRect(0, 0, W, H); P(t, 540, 1500, 1.4, { mood: 'o', wide: true, seed: 2 }); }
      say(t, 'p4', 540, 1060, { size: 64 });
    } else if (t < M.stamp) { // looks across the bar
      X.save(); cam(540, 1060, 1.05); bar(t); R(t, 230, 1150, 0.78, { mood: 'neutral', lookX: 1 }); G(t, 440, 1130, 0.75, { mood: 'happy', lookX: 1, point: t > M.looks + 1.0 && t < M.looks + 1.6 }); F(t, 650, 1140, 0.72, { mood: 'neutral', lookX: 1 }); table(t, true);
      P(t, 900, 1180, 0.75, { mood: 'neutral', lookX: -1, seed: 3 }); X.restore();
      if (t > M.looks + 1.6) { X.strokeStyle = '#e0601c'; X.lineWidth = 16; X.lineCap = 'round'; X.beginPath(); X.moveTo(300, 1150); X.lineTo(400, 1080); X.stroke(); }
    } else if (t < M.photo) { passportShot(t, M.stamp, 1, 1); }
    else { // after closing: the photo
      X.save(); cam(600, 1000, 1.3 + (t - M.photo) * 0.06); toog(t); X.fillStyle = 'rgba(10,5,20,0.65)'; X.fillRect(-500, -500, W + 1000, H + 1000);
      C(t, 640, 960, 0.75, { mood: 'sad', lookX: t > DUR - 3 ? -1 : 0 });
      const k = eo(lin(t, M.photo + 0.8, M.photo + 1.8)) * (1 - eo(lin(t, DUR - 1.4, DUR - 1.0)));
      if (k > 0) { X.save(); X.translate(560, mix(1300, 1120, k)); X.rotate(-0.06); X.fillStyle = '#e8dcc0'; rr(-170, -120, 340, 240, 8); X.fill(); X.strokeStyle = '#b8a888'; X.lineWidth = 4; X.strokeRect(-150, -100, 300, 200); txt('Madrid, 2006', 0, 10, font('caveat', 700, 56), '#5a4030'); X.restore(); }
      X.restore(); if (t > DUR - 1.4) { X.fillStyle = `rgba(255,255,255,${0.15 * (1 - lin(t, DUR - 1.4, DUR - 1.1))})`; X.fillRect(0, 0, W, H); }
    }
    X.restore(); titleCard(t, 3, 'Viral'); letterbox(); fadeEnd(t, DUR, 0.7);
  } };
})();
