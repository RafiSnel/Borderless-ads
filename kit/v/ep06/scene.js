// La Esquina · Ep. 6 — Código Rojo
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep06');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'neutral', day: 'DAY 1215', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);
  const users = (t) => Math.max(71004118, 98412233 - Math.pow(lin(t, 1.6, M.top), 0.6) * 27408115);
  const cues = [['buzz', 1.7, 0.5], ['buzz', 2.6, 0.5], ['buzz', 3.5, 0.5], ['impact', Lt('s1') - 0.2, 0.6], ['ding', M.tv, 0.4], ['impact', Lt('r1') + 2.2, 0.7], ['dingdong', M.lift + 0.6, 0.6], ['hum', M.top, 0.6], ['boom', M.top + 1.2, 0.8], ['boom', Lt('d3'), 1.0], ['glitch', Lt('d3'), 0.7], ['swell', M.ficha + 0.2, 0.4], ['whoosh', M.bar, 0.3], ['tick', M.walk + 1.5, 0.3], ['tick', M.walk + 2.5, 0.3], ['whoosh', M.walk + 3.1, 0.5], ['hum', M.van, 0.5]];
  window.CUES = { dur: DUR, cues, sfx_gain: 0.38 };
  const hits = [Lt('s1') - 0.2, M.top + 1.2, Lt('d3')];
  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, hits, [], 14);
    if (t < M.tv) { X.save(); keyCam(t, [[0, 540, 900, 1.0], [Lt('s1') - 0.2, 640, 1150, 1.6]]); office(t, users(t), 1);
      R(t, 220, 1250, 0.6, { mood: 'shock' }); G(t, 400, 1260, 0.55, { mood: 'shock' }); F(t, 560, 1260, 0.52, { mood: 'shock' });
      const run = eo(lin(t, Lt('s1') - 0.8, Lt('s1'))); stagiair(t, mix(1250, 800, run), 1240, 0.75, { mood: 'shock', talk: tk('stagiair', t) }); X.restore(); say(t, 's1', 700, 760, { size: 52, tail: 0.25 }); }
    else if (t < M.react) { X.fillStyle = '#4a1414'; X.fillRect(0, 0, W, H); newsTV(t, W / 2, 900, 940, (w, h) => { streetDay(t); X.save(); X.translate(0, 0); X.fillStyle = '#222'; rr(-w / 2 + 120, -h / 2 + 40, w - 240, h - 160, 10); X.fill();
        X.save(); X.beginPath(); X.rect(-w / 2 + 130, -h / 2 + 50, w - 260, h - 180); X.clip(); X.fillStyle = '#f6efe2'; X.fillRect(-w, -h, 2 * w, 2 * h); hero(t, -80, -10, 0.55, { mood: 'happy', wink: true }); txt('Speak the real thing.', 150, -40, font('serif', 400, 40), '#6e1f2a'); X.restore(); X.restore(); });
      say(t, 'n1', 540, 1500, { size: 44, maxw: 940, nosub: true }); }
    else if (t < M.lift) { const who = t < Lt('f1') - 0.1 ? 'g' : t < Lt('r1') - 0.1 ? 'f' : 'r'; const sh = { g: [400, 1180, 2.2], f: [560, 1180, 2.2], r: [240, 1180, 2.0] }[who];
      X.save(); cam(...sh); office(t, users(t), 1); R(t, 240, 1250, 0.6, { mood: who === 'r' ? 'neutral' : 'shock', day: t > Lt('r1') + 2.0 ? '' : 'DAY 1215' }); G(t, 400, 1260, 0.55, { mood: 'shock' }); F(t, 560, 1260, 0.52, { mood: 'shock' });
      if (t > Lt('r1') + 2.0) { X.fillStyle = '#fff'; X.save(); X.translate(300, 1360); X.rotate(0.3); rr(-60, -18, 120, 36, 14); X.fill(); X.restore(); } X.restore();
      say(t, 'g1', 540, 760, { size: 60 }); say(t, 'f1', 540, 760, { size: 60 }); say(t, 'r1', 540, 760, { size: 56 }); }
    else if (t < M.top) { X.save(); cam(540, 900, 1.0 + (t - M.lift) * 0.04); lift(t, t > M.lift + 0.6); R(t, 380, 1500, 0.55, { mood: 'neutral' }); G(t, 540, 1510, 0.5, { mood: 'shock' }); F(t, 700, 1510, 0.48, { mood: 'shock' }); stagiair(t, 920, 1510, 0.55, { mood: 'shock', talk: tk('stagiair', t) }); X.restore(); say(t, 's2', 760, 760, { size: 54, tail: 0.3 }); }
    else if (t < M.bar) { const rev = eo(lin(t, M.top, M.top + 1.6)); const dz = mix(0.5, 0.95, rev);
      const sp = (id) => t >= Lt(id) - 0.1 && t <= Le(id) + 0.2; const tc = sp('d1') || sp('d2') || sp('d3') ? 0.5 + 0.5 * Math.abs(Math.sin(t * 17)) : 0;
      X.save(); keyCam(t, [[M.top, 540, 960, 1.0], [Lt('r2') - 0.1, 300, 1450, 2.2], [Lt('d2') - 0.1, 540, 900, 1.15], [Lt('g2') - 0.1, 540, 1450, 2.2], [Lt('d3') - 0.05, 540, 860, 1.4], [M.ficha, 720, 1450, 2.4]]); topFloor(t);
      directie(t, 540, 700, dz, { talk: tc }); if (t > Lt('d3') && t < Lt('d3') + 0.3) { X.fillStyle = 'rgba(255,0,0,0.35)'; X.fillRect(-500, -500, W + 1000, H + 1000); }
      R(t, 330, 1520, 0.45, { mood: 'neutral', lookY: -1 }); G(t, 540, 1530, 0.42, { mood: t > Lt('d3') ? 'shock' : 'neutral', lookY: -1 }); F(t, 720, 1530, 0.4, { mood: 'neutral', lookY: t > M.ficha ? 1 : -1 });
      X.restore();
      if (t > M.ficha + 0.5) { const k = lin(t, M.ficha + 0.5, M.ficha + 0.9) * (1 - lin(t, M.bar - 0.4, M.bar)); X.save(); X.globalAlpha = 0.6 * k; X.translate(540, 700); X.scale(0.5, 0.5); X.translate(-600, -1150); restaurant(t); bigPlant(t, 270, 1230, 0.9); hero(t, 110, 1190, 0.6, { mood: 'happy', armsUp: true }); X.restore(); }
      say(t, 'd1', 540, 1300, { size: 50, bg: '#2a0505', fg: '#ff9a9a', nosub: true }); say(t, 'r2', 400, 1150, { size: 56 }); say(t, 'd2', 540, 1300, { size: 60, bg: '#2a0505', fg: '#ff9a9a' }); say(t, 'g2', 540, 1150, { size: 50 }); say(t, 'd3', 540, 1250, { size: 110, bg: '#2a0505', fg: '#ff4040' }); }
    else if (t < M.walk) { X.save(); keyCam(t, [[M.bar, 520, 1100, 1.0], [Lt('c1') - 0.1, 680, 950, 1.8]]); toog(t); C2(t); X.restore(); say(t, 'p1', 380, 760, { size: 54 }); say(t, 'c1', 640, 560, { size: 50, tail: 0.2 }); }
    else if (t < M.van) { const d = t - M.walk; X.save(); cam(540, 1000, 1.05); street(t); P(t, mix(900, 520, lin(d, 0, 3.0)), 1340, 0.85, { mood: 'worried', walk: d < 3.0 || d > 3.6 ? t * 6 : undefined, lookX: d > 3.0 && d < 3.6 ? 1 : -0.4, seed: 3 }); X.restore(); rain(t, 0.2); }
    else { const d = t - M.van; if (d < 1.4) { X.save(); cam(540, 1050, 1.0); street(t); X.fillStyle = '#e8e8e8'; rr(560, 1120, 460, 260, 30); X.fill(); X.fillStyle = '#1a2440'; rr(860, 1150, 130, 90, 10); X.fill(); X.fillStyle = '#222'; X.beginPath(); X.arc(650, 1385, 40, 0, 7); X.arc(940, 1385, 40, 0, 7); X.fill(); X.restore(); }
      else { X.fillStyle = '#0b0b10'; X.fillRect(0, 0, W, H); balaclava(t, 250, 1000, 1.1, 'f'); balaclava(t, 540, 960, 1.25, 'r'); balaclava(t, 830, 1000, 1.1, 'g'); say(t, 'r3', 540, 640, { size: 70 }); } }
    X.restore(); titleCard(t, 6, 'Código Rojo', '#5a0a0a'); letterbox(); fadeEnd(t, DUR, 0.6);
  } };
  function C2(t) { carmen(t, 680, 950, 0.75, { mood: 'sad', lookX: -1, talk: tk('carmen', t) }); heroX(t, 360, 1250, 0.95, { mood: 'worried', lookX: 1, talk: tk('hero', t), seed: 3 });
    X.save(); X.translate(820, 640); X.fillStyle = '#111'; rr(-150, -100, 300, 200, 12); X.fill(); X.fillStyle = t > Lt('c1') + 1 ? '#111' : '#f6efe2'; rr(-138, -88, 276, 176, 8); X.fill(); if (t < Lt('c1') + 1) hero(t, -40, 0, 0.3, { mood: 'happy', wink: true }); X.restore(); }
})();
