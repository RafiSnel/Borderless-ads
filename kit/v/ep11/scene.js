// La Esquina · Ep. 11 — El Asalto
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep11');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'neutral', day: t > Lt('r3') + 2.5 ? 'DAY 2' : 'DAY 1', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);
  const C = (t, x, y, s, m = {}) => carmen(t, x, y, s, { mood: 'warm', ...m, talk: speaking('carmen', t) ? 0.3 + 0.3 * Math.abs(Math.sin(t * 18)) : tk('carmen', t) });

  function napkin(x, y, s, rot, draw) { X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s); X.fillStyle = '#fbf7ee'; rr(-200, -200, 400, 400, 6); X.fill(); X.strokeStyle = 'rgba(0,0,0,0.08)'; X.lineWidth = 3; X.strokeRect(-180, -180, 360, 360); if (draw) draw(); X.restore(); }
  function plan(k) { X.strokeStyle = '#2a4ab0'; X.lineWidth = 6; X.lineCap = 'round'; const segs = [[-140, 140, -140, -120], [-140, -120, 0, -170], [0, -170, 140, -120], [140, -120, 140, 140], [-140, 140, 140, 140], [-140, 40, 140, 40], [-140, -40, 140, -40], [0, -170, 0, 140]];
    const n = Math.floor(k * segs.length); for (let i = 0; i < n; i++) { const s = segs[i]; X.beginPath(); X.moveTo(s[0], s[1]); X.lineTo(s[2], s[3]); X.stroke(); } if (k > 0.9) { X.fillStyle = '#c0392b'; X.beginPath(); X.arc(0, -150, 14, 0, 7); X.fill(); txt('X', 0, -100, font('caveat', 700, 60), '#c0392b'); } }
  function freeze(t, t0, name, role, col, draw) { const k = eo(lin(t, t0, t0 + 0.25)); X.fillStyle = col; X.fillRect(0, 0, W, H); for (let i = 0; i < 14; i++) { X.fillStyle = 'rgba(255,255,255,0.06)'; X.fillRect(-200 + i * 120 + (t - t0) * 60, 0, 50, H); }
    X.save(); X.translate(540, 1000); X.scale(mix(1.2, 1, k), mix(1.2, 1, k)); draw(); X.restore();
    X.save(); X.translate(mix(-600, 0, k), 0); X.fillStyle = '#111'; X.fillRect(40, 1380, 760, 200); txt(name, 420, 1450, font('bungee', 400, 80), '#fff'); txt(role, 420, 1530, font('anton', 400, 48), col); X.restore(); }
  function guardPost(t) { X.fillStyle = '#2a2e38'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#3a404c'; X.fillRect(-500, 1300, W + 1000, 900); X.fillStyle = '#5a6270'; rr(500, 900, 600, 400, 12); X.fill(); X.fillStyle = '#0d1424'; rr(560, 940, 220, 150, 8); X.fill(); X.fillStyle = '#2a6ad0'; rr(570, 950, 200, 130, 6); X.fill(); X.fillStyle = '#e8e2d0'; rr(800, 950, 240, 140, 8); X.fill(); txt('SEGURIDAD', 920, 1030, font('anton', 400, 36), '#c0392b'); }
  function vent(t) { X.fillStyle = '#4a4f58'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#5a606a'; for (let i = 0; i < 20; i++) X.fillRect(200, (i * 140 + t * 80) % 2400 - 300, 680, 12); X.fillStyle = '#3a3f48'; X.fillRect(-500, -500, 700, H + 1000); X.fillRect(880, -500, 800, H + 1000);
    X.save(); X.translate(540, 300); X.rotate(t * 8); X.fillStyle = '#2a2e36'; for (let i = 0; i < 4; i++) { X.rotate(Math.PI / 2); X.beginPath(); X.ellipse(0, -80, 40, 90, 0, 0, 7); X.fill(); } X.restore(); }
  function terminal(t, k) { X.fillStyle = '#0d1018'; X.fillRect(-500, -500, W + 1000, H + 1000); X.fillStyle = '#1a2030'; rr(160, 500, 760, 560, 24); X.fill(); X.fillStyle = '#05080e'; rr(200, 540, 680, 480, 12); X.fill();
    txt('PASSWORD', 540, 640, font('anton', 400, 52), '#7ad0ff'); X.fillStyle = '#122030'; rr(260, 700, 560, 100, 10); X.fill();
    const word = 'el gato'; const n = Math.floor(k * (word.length + 0.99)); txt(word.slice(0, n) + (Math.floor(t * 3) % 2 ? '|' : ''), 540, 752, font('inter', 800, 56), '#fff'); }
  function airportPhoto(cx, cy, s) { X.save(); X.translate(cx, cy); X.scale(s, s); X.fillStyle = '#cfd8e0'; X.fillRect(-120, -90, 240, 180); X.fillStyle = '#9fb6c9'; X.fillRect(-120, -90, 240, 70); X.fillStyle = '#fff'; X.beginPath(); X.moveTo(-60, -50); X.lineTo(40, -60); X.lineTo(60, -54); X.lineTo(-40, -44); X.fill();
    X.fillStyle = '#2f4f8c'; rr(-80, -20, 50, 80, 8); X.fill(); X.fillStyle = '#8c2a2a'; rr(30, -20, 50, 80, 8); X.fill(); X.fillStyle = '#d0a020'; X.fillRect(-60, 64, 20, 10); X.fillRect(50, 64, 20, 10); X.fillStyle = 'rgba(255,40,40,0.18)'; X.fillRect(-120, -90, 240, 180); X.restore(); }

  const hits = [M.s2 + 2.4, Lt('r4'), M.top + 0.6];
  const cues = [['scratch', Lt('r1') + 0.2, 0.4], ['scratch', Lt('r1') + 1.6, 0.4], ['stamp', M.roles, 0.6], ['stamp', Lt('g1') - 0.2, 0.6], ['stamp', Lt('f1') - 0.2, 0.6], ['stamp', Lt('p1') - 0.2, 0.6], ['stamp', M.lookout, 0.6], ['whoosh', M.hq, 0.4],
    ['whoosh', M.s1, 0.3], ['whoosh', M.s2, 0.3], ['glitch', M.s2 + 1.6, 0.4], ['pop', M.s2 + 2.4, 0.7], ['pop', M.s2 + 2.9, 0.7], ['pop', M.s2 + 3.4, 0.7], ['whoosh', M.s3, 0.3], ['hum', M.s3 + 0.2, 0.5], ['whoosh', M.s4, 0.3], ['correct', M.granted, 0.8],
    ['whoosh', M.lift, 0.3], ['ding', Le('r4') + 0.6, 0.6], ['buzz', M.van, 0.3], ['shutter', M.top + 0.4, 0.6], ['hum', M.top + 0.8, 0.6], ['stamp', M.stamp + 0.55, 0.7], ['glitch', M.screens, 0.6], ['gong', M.eyes + 0.6, 0.6]];
  for (let x = M.s4 + 0.6; x < M.granted - 0.4; x += 0.2) cues.push(['type', x, 0.15]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };

  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, hits, [M.hq, M.s1, M.s2, M.s3, M.s4, M.lift, M.top], 10);
    if (t < M.roles) { // ---- the napkin plan ----
      X.save(); cam(540, 1150, 1.4); closedBar(t, 0.5); table(t); napkin(540, 1300, 0.6, -0.05, () => plan(lin(t, Lt('r1'), Le('r1')))); napkin(320, 1330, 0.4, 0.2); napkin(760, 1320, 0.4, -0.15);
      R(t, 540, 1110, 0.45, { mood: 'smug', point: true }); P(t, 280, 1150, 0.42, { mood: 'neutral', seed: 13, lookY: 1 }); G(t, 800, 1160, 0.36, { mood: 'neutral', lookY: 1 }); F(t, 940, 1170, 0.34, { lookY: 1 });
      X.restore(); say(t, 'r1', 540, 820, { size: 54 }); }
    else if (t < M.hq) { // ---- four freeze frames + Planta ----
      if (t < Lt('g1') - 0.2) freeze(t, M.roles, 'RACHA', 'THE VENTS', '#e0601c', () => R(t, 0, 0, 1.0, { mood: 'smug' }));
      else if (t < Lt('f1') - 0.2) freeze(t, Lt('g1') - 0.2, 'GEMA', 'THE BADGE-BOTS', '#5a2a8a', () => G(t, 0, 0, 0.95, { mood: 'happy' }));
      else if (t < Lt('p1') - 0.2) freeze(t, Lt('f1') - 0.2, 'FICHA', 'THE PASSWORD', '#3a5bd0', () => F(t, 0, 0, 0.95, { mood: 'smug' }));
      else if (t < M.lookout) freeze(t, Lt('p1') - 0.2, 'PASITO', 'THE GUARD', '#6e1f2a', () => P(t, 0, 40, 1.0, { mood: 'happy', calm: true, seed: 13 }));
      else freeze(t, M.lookout, 'PLANTA', 'LOOKOUT', '#3aa35b', () => { planta(t, 0, 80, 1.2); X.fillStyle = '#222'; rr(110, -60, 50, 110, 10); X.fill(); X.fillRect(126, -120, 8, 60); });
      say(t, 'r2', 540, 560, { size: 54 }); say(t, 'g1', 540, 560, { size: 56 }); say(t, 'f1', 540, 560, { size: 56 }); say(t, 'p1', 540, 560, { size: 60 }); }
    else if (t < M.s1) { // ---- HQ at night, Carmen drives ----
      const d = t - M.hq; if (d < 2.0) { X.save(); cam(540, 960, 1.0 + d * 0.03); hqExterior(t); X.fillStyle = 'rgba(5,8,30,0.62)'; X.fillRect(-500, -500, W + 1000, H + 1000); const p = (Math.sin(t * 4) + 1) / 2; X.fillStyle = `rgba(255,60,60,${0.3 + 0.5 * p})`; X.beginPath(); X.arc(540, 300, 60 + p * 20, 0, 7); X.fill(); X.restore(); }
      else { X.save(); cam(560, 1050, 1.3); vanInside(t, 1); C(t, 560, 950, 0.5, {}); X.fillStyle = '#111'; rr(470, 880, 80, 40, 10); X.fill(); rr(570, 880, 80, 40, 10); X.fill(); X.fillRect(540, 892, 40, 8);
        X.strokeStyle = '#222'; X.lineWidth = 16; X.beginPath(); X.arc(560, 1160, 90, 0, 7); X.stroke(); planta(t, 860, 1250, 0.4); X.restore(); }
      say(t, 'c1', 560, 660, { size: 58 }); }
    else if (t < M.lift) { // ---- the split screens ----
      const which = t < M.s2 ? 0 : t < M.s3 ? 1 : t < M.s4 ? 2 : 3; const k = eo(lin(t, [M.s1, M.s2, M.s3, M.s4][which], [M.s1, M.s2, M.s3, M.s4][which] + 0.4));
      const scenes = [
        () => { X.save(); cam(700, 1100, 1.3); guardPost(t); paco(t, 820, 1150, 0.55, { mood: t > Lt('k1') ? 'laugh' : 'neutral', talk: tk('paco', t) }); if (t > Lt('k1') + 1.6) { X.save(); X.translate(700, 1000); X.rotate(-0.1); X.fillStyle = '#fff'; rr(-70, -50, 140, 100, 6); X.fill(); X.fillStyle = '#d8c39a'; rr(-60, -40, 120, 70, 4); X.fill(); X.restore(); } P(t, 460, 1220, 0.55, { mood: 'happy', seed: 13, lookX: 1 }); X.restore(); },
        () => { X.save(); cam(540, 1100, 1.2); office(t, 0, 1); const pop = (i) => M.s2 + 2.4 + i * 0.5; for (let i = 0; i < 3; i++) { const x = 640 + i * 170; if (t < pop(i)) { badgeBot(t, x, 1250, 0.6); if (t > pop(i) - 1.0) { X.fillStyle = '#ffd23d'; X.beginPath(); X.arc(x, 1200, 20, 0, 7); X.fill(); } } else if (t < pop(i) + 1.2) { const d = t - pop(i); for (let j = 0; j < 14; j++) { X.fillStyle = ['#ffd23d', '#ff9af0', '#9af0ff'][j % 3]; X.fillRect(x + Math.cos(j) * d * 400, 1220 + Math.sin(j * 1.7) * d * 300 + d * d * 600, 14, 14); } } }
          G(t, 440, 1260, 0.5, { mood: 'happy', point: t > Lt('g2') && t < Le('g2') }); X.restore(); },
        () => { X.save(); cam(540, 1000, 1.1); vent(t); const up = lin(t, M.s3, M.s4); R(t, 540, mix(1500, 1050, up), 0.55, { mood: 'neutral', lookY: -1 }); X.fillStyle = '#111'; rr(760, 440, 220, 110, 12); X.fill(); txt('HEAT  OK', 870, 496, font('anton', 400, 40), '#3aa35b'); X.restore(); },
        () => { X.save(); cam(540, 950, 1.0); terminal(t, lin(t, M.s4 + 0.6, M.granted - 0.3)); if (t > M.granted) { X.fillStyle = '#123a1a'; rr(200, 860, 680, 120, 12); X.fill(); txt('ACCESS GRANTED', 540, 922, font('anton', 400, 64), '#5aff8a'); } F(t, 860, 1340, 0.55, { mood: t > M.granted ? 'smug' : 'neutral', lookX: -1 }); X.restore(); }];
      // show the current panel, with the previous ones as a shrinking strip on top
      X.save(); X.translate(540, 960); X.scale(mix(1.08, 1, k), mix(1.08, 1, k)); X.translate(-540, -960); scenes[which](); X.restore();
      for (let i = 0; i < which; i++) { X.save(); X.translate(40 + i * 240, 70); X.scale(0.2, 0.2); X.beginPath(); X.rect(0, 0, W, H); X.clip(); scenes[i](); X.restore(); X.strokeStyle = '#f6efe2'; X.lineWidth = 6; X.strokeRect(40 + i * 240, 70, 216, 384); }
      say(t, 'p2', 460, 760, { size: 46 }); say(t, 'k1', 760, 720, { size: 46 }); say(t, 'g2', 480, 760, { size: 52 }); say(t, 'r3', 540, 700, { size: 54 }); say(t, 'f2', 640, 1150, { size: 46 }); }
    else if (t < M.van) { // ---- the lift ----
      X.save(); cam(540, 1000, 1.0 + (t - M.lift) * 0.03); lift(t, t > Le('r4') + 0.4 && Math.floor(t * 6) % 3 !== 0); R(t, 330, 1500, 0.5, {}); G(t, 500, 1510, 0.45, { mood: 'worried' }); F(t, 660, 1510, 0.43, {}); P(t, 820, 1520, 0.5, { mood: 'neutral', calm: true, seed: 14 });
      X.restore(); say(t, 'g3', 500, 1150, { size: 54 }); say(t, 'r4', 330, 1150, { size: 56 }); }
    else if (t < M.top) { // ---- Planta in the van, walkie crackles ----
      X.save(); cam(640, 1150, 1.6); vanInside(t); C(t, 520, 950, 0.5, { mood: 'warm' }); planta(t, 780, 1260, 0.45); X.fillStyle = '#222'; rr(880, 1150, 50, 110, 10); X.fill(); X.fillRect(896, 1090, 8, 60); if (Math.floor(t * 8) % 2) { X.fillStyle = '#3aff6a'; X.beginPath(); X.arc(905, 1170, 8, 0, 7); X.fill(); }
      X.restore(); say(t, 'c2', 560, 760, { size: 50 }); }
    else if (t < M.screens) { // ---- top floor ----
      const open = eo(lin(t, M.top + 0.4, M.top + 1.4)); const stampIns = t > M.stamp && t < M.stamp + 2.6;
      if (stampIns) { X.fillStyle = '#2a1d16'; X.fillRect(0, 0, W, H); napkin(540, 960, 2.0, -0.04, () => { plan(1); const ts = M.stamp + 0.55; if (t > ts) { const s = mix(2.4, 1, eo(lin(t, ts, ts + 0.12))); X.save(); X.translate(80, 80); X.rotate(-0.25); X.scale(s, s); X.globalAlpha = cl((t - ts) / 0.06); X.strokeStyle = STAMP_COL[7]; X.lineWidth = 7; X.beginPath(); X.arc(0, 0, 80, 0, 7); X.stroke(); txt('EQUIPO', 0, 0, font('anton', 400, 40), STAMP_COL[7]); txt('★ 8 ★', 0, 42, font('bebas', 400, 24), STAMP_COL[7]); X.restore(); } }); }
      else { X.save(); keyCam(t, [[M.top, 540, 960, 1.0], [Lt('p3') - 0.2, 540, 1300, 1.5], [Le('p3'), 540, 1100, 1.1]]); topFloor(t); directie(t, 540, 660, 0.38 * open + 0.01, { talk: speaking('directie', t) });
        X.fillStyle = '#c9ced6'; X.fillRect(-500 - 600 * open, -500, 1040, H + 1000); X.fillRect(540 + 600 * open, -500, 1040, H + 1000);
        R(t, 300, 1500, 0.5, { mood: 'shock' }); G(t, 760, 1510, 0.45, { mood: 'shock' }); F(t, 900, 1510, 0.42, { mood: 'shock' }); P(t, 540, mix(1520, 1460, eo(lin(t, Lt('p3') - 0.6, Lt('p3')))), 0.55, { mood: 'neutral', calm: true, seed: 14 });
        X.restore(); say(t, 'd1', 540, 1200, { size: 48, bg: '#2a0505', fg: '#ff9a9a', nosub: true }); say(t, 'p3', 540, 1100, { size: 50 }); } }
    else if (t < M.eyes) { // ---- every screen: the parents at an airport ----
      X.save(); cam(540, 960, 1.0 + (t - M.screens) * 0.02); topFloor(t); for (let r = -3; r <= 3; r++) for (let c = -2; c <= 2; c++) { const x = 540 + c * 200, y = 760 + r * 160; X.fillStyle = '#0c0c12'; rr(x - 95, y - 75, 190, 150, 8); X.fill(); if (lin(t, M.screens, M.screens + 0.8) > hash(r * 7 + c * 3 + 20)) airportPhoto(x, y, 0.72); }
      P(t, 540, 1560, 0.55, { mood: 'o', wide: true, seed: 14 }); X.restore(); say(t, 'd2', 540, 1300, { size: 50, bg: '#2a0505', fg: '#ff9a9a', nosub: true }); }
    else { const k = lin(t, M.eyes, M.eyes + 1.4); if (k < 1) { X.save(); cam(540, 1050, mix(3.2, 4.2, k)); X.fillStyle = '#05050a'; X.fillRect(-500, -500, W + 1000, H + 1000); P(t, 540, 1160, 0.75, { mood: 'o', wide: true, seed: 14 }); X.restore(); X.fillStyle = `rgba(0,0,0,${eo(k)})`; X.fillRect(0, 0, W, H); } }
    X.restore(); titleCard(t, 11, 'El Asalto', '#1a2a20'); letterbox(); fadeEnd(t, DUR, 0.4);
  } };
})();
