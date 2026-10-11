// La Esquina · Ep. 9 — La Página
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep09');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'neutral', day: 'DAY ----', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);
  const C = (t, x, y, s, m = {}) => carmen(t, x, y, s, { mood: 'warm', ...m, talk: tk('carmen', t) });

  // ---------- La Esquina after closing ----------
  function closed(t, dim = 0.55) { toog(t);
    // window with rain on the left wall
    X.fillStyle = '#0d1424'; rr(60, 360, 300, 420, 16); X.fill(); X.save(); X.beginPath(); rr(60, 360, 300, 420, 16); X.clip(); X.translate(0, 0); X.strokeStyle = 'rgba(170,190,255,0.5)'; X.lineWidth = 2; for (let i = 0; i < 30; i++) { const x = 60 + (hash(i) * 300 + t * 60) % 300, y = 360 + ((hash(i * 7) * 420 + t * 900) % 420); X.beginPath(); X.moveTo(x, y); X.lineTo(x - 6, y + 30); X.stroke(); } X.restore();
    X.strokeStyle = '#3a1a0c'; X.lineWidth = 10; rr(60, 360, 300, 420, 16); X.stroke(); X.beginPath(); X.moveTo(210, 360); X.lineTo(210, 780); X.moveTo(60, 570); X.lineTo(360, 570); X.stroke();
    // door on the right
    X.fillStyle = '#3a1a0c'; X.fillRect(860, 560, 220, 680); X.fillStyle = '#ffd98a'; X.beginPath(); X.arc(890, 920, 10, 0, 7); X.fill();
    X.fillStyle = `rgba(8,4,16,${dim})`; X.fillRect(-500, -500, W + 1000, H + 1000);
    // one lamp
    X.fillStyle = '#2a1408'; X.fillRect(538, 0, 4, 300); X.fillStyle = '#c47a2a'; X.beginPath(); X.moveTo(480, 340); X.lineTo(600, 340); X.lineTo(570, 290); X.lineTo(510, 290); X.fill();
    const g = X.createRadialGradient(540, 360, 20, 540, 1200, 900); g.addColorStop(0, 'rgba(255,214,140,0.55)'); g.addColorStop(0.5, 'rgba(255,190,110,0.18)'); g.addColorStop(1, 'rgba(255,190,110,0)'); X.fillStyle = g; X.beginPath(); X.moveTo(500, 340); X.lineTo(580, 340); X.lineTo(1100, 1700); X.lineTo(-20, 1700); X.closePath(); X.fill(); }
  function stackedChairs(x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#4a2410'; X.beginPath(); X.ellipse(0, 0, 160, 34, 0, 0, 7); X.fill(); X.fillRect(-10, 0, 20, 220);
    X.strokeStyle = '#3a1a0c'; X.lineWidth = 10; X.beginPath(); X.moveTo(-90, -10); X.lineTo(-90, -150); X.lineTo(-10, -150); X.moveTo(-60, -10); X.lineTo(-60, -110); X.moveTo(90, -10); X.lineTo(90, -150); X.lineTo(10, -150); X.moveTo(60, -10); X.lineTo(60, -110); X.stroke(); X.restore(); }
  function stool(x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#8a4e2a'; X.beginPath(); X.ellipse(0, 0, 70, 18, 0, 0, 7); X.fill(); X.strokeStyle = '#5a2e14'; X.lineWidth = 10; X.beginPath(); X.moveTo(-40, 10); X.lineTo(-55, 170); X.moveTo(40, 10); X.lineTo(55, 170); X.stroke(); X.restore(); }
  function drips(t, x, y, s) { X.fillStyle = 'rgba(160,200,255,0.8)'; for (let i = 0; i < 6; i++) { const k = (t * 1.3 + hash(i)) % 1; X.beginPath(); X.ellipse(x + (hash(i * 5) - 0.5) * 180 * s, y + k * 240 * s, 6, 10, 0, 0, 7); X.fill(); } }
  function churros(x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#f2ead8'; X.beginPath(); X.ellipse(0, 0, 130, 30, 0, 0, 7); X.fill(); X.strokeStyle = '#c47a2a'; X.lineWidth = 22; X.lineCap = 'round'; for (let i = 0; i < 4; i++) { X.beginPath(); X.moveTo(-90 + i * 12, -10 - i * 10); X.lineTo(80 + i * 6, -30 - i * 12); X.stroke(); } X.restore(); }
  function bravas(x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#f2ead8'; X.beginPath(); X.ellipse(0, 0, 120, 30, 0, 0, 7); X.fill(); for (let i = 0; i < 9; i++) { X.fillStyle = '#e8b84a'; X.fillRect(-70 + (i % 3) * 45, -40 + Math.floor(i / 3) * 14 - 10, 36, 30); } X.fillStyle = '#d8401f'; X.beginPath(); X.ellipse(-10, -40, 60, 14, 0, 0, 7); X.fill(); X.restore(); }
  function famPhoto(cx, cy, s, sepia = 1) { X.save(); X.translate(cx, cy); X.scale(s, s); X.fillStyle = '#e8dcc0'; rr(-300, -220, 600, 440, 12); X.fill(); X.fillStyle = '#c9a878'; rr(-270, -190, 540, 330, 6); X.fill();
    X.fillStyle = '#a8784a'; X.beginPath(); X.ellipse(0, 110, 230, 40, 0, 0, 7); X.fill(); // the table
    X.fillStyle = sepia ? '#5a6a8a' : '#2f4f8c'; rr(-200, -120, 120, 190, 16); X.fill(); X.fillStyle = sepia ? '#8a5a4a' : '#8c2a2a'; rr(80, -120, 120, 190, 16); X.fill();
    X.fillStyle = sepia ? '#7a4a3a' : '#6e1f2a'; rr(-30, -20, 60, 90, 10); X.fill();
    [-140, 140].forEach((x) => { X.fillStyle = '#f6efe2'; X.beginPath(); X.arc(x - 20, -50, 10, 0, 7); X.arc(x + 20, -50, 10, 0, 7); X.fill(); X.strokeStyle = '#3a2a20'; X.lineWidth = 5; X.beginPath(); X.arc(x, -20, 22, 0.2, Math.PI - 0.2); X.stroke(); });
    X.fillStyle = '#f6efe2'; X.beginPath(); X.arc(-8, 10, 6, 0, 7); X.arc(8, 10, 6, 0, 7); X.fill();
    X.strokeStyle = '#3a2a20'; X.lineWidth = 6; X.beginPath(); X.moveTo(-80, -20); X.lineTo(-30, 10); X.moveTo(80, -20); X.lineTo(30, 10); X.stroke();
    txt('La Esquina · verano 2006', 0, 185, font('caveat', 700, 44), '#5a4030'); X.fillStyle = 'rgba(120,80,30,0.18)'; X.fillRect(-300, -220, 600, 440); X.restore(); }
  // the torn page arriving and fitting the passport's ragged edge
  function pageFit(t, t0, t1) { const k = eo(lin(t, t0, t1)); passportShot(t, -10, 5, null, { photo: t > t1 });
    if (t <= t1) { X.save(); X.translate(W / 2, 980); X.translate(mix(700, 0, k), mix(200, 0, k)); X.rotate(mix(0.3, 0, k)); X.fillStyle = '#efe0bc'; X.beginPath(); X.moveTo(-470, -610); X.lineTo(-10, -610); X.lineTo(-10, 610); X.lineTo(-470, 610); for (let i = 24; i >= 0; i--) X.lineTo(-470 + (i % 2 ? 24 : 0) + 6, -610 + i * 51); X.closePath(); X.fill();
      X.fillStyle = '#d8c39a'; rr(-400, -420, 320, 260, 10); X.fill(); X.fillStyle = '#2f4f8c'; rr(-370, -380, 90, 130, 14); X.fill(); X.fillStyle = '#8c2a2a'; rr(-210, -380, 90, 130, 14); X.fill(); X.fillStyle = '#6e1f2a'; rr(-268, -320, 46, 70, 8); X.fill(); txt('Madrid, 2006', -240, -120, font('caveat', 700, 44), '#5a4030');
      X.save(); X.translate(-240, 120); X.rotate(-0.2); X.strokeStyle = '#a8512b'; X.lineWidth = 7; X.beginPath(); X.arc(0, 0, 100, 0, 7); X.stroke(); txt('LA ESQUINA', 0, 0, font('anton', 400, 38), '#a8512b'); X.restore(); X.restore(); }
    else if (t < t1 + 1.0) { const a = 1 - (t - t1); X.fillStyle = `rgba(255,236,170,${0.5 * a})`; X.fillRect(0, 0, W, H); X.save(); X.translate(W / 2 - 240, 980); X.strokeStyle = `rgba(255,220,120,${a})`; X.lineWidth = 14; X.beginPath(); X.moveTo(-230, -610); X.lineTo(-230, 610); X.stroke(); X.restore(); } }

  // ---------- timing ----------
  const cues = [['flap', 1.9, 0.3], ['hit', M.knock, 0.5], ['hit', M.knock + 0.3, 0.5], ['dingdong', M.knock + 0.8, 0.4], ['flap', M.knock + 1.2, 0.3], ['page', Lt('f2') - 0.6, 0.4], ['scratch', Lt('p1') + 0.3, 0.3],
    ['pop', M.badge + 0.4, 0.5], ['click', M.machine + 0.2, 0.6], ['hum', M.machine, 0.3], ['page', M.photo - 0.3, 0.4], ['page', M.page, 0.5], ['ding', M.fit, 0.6], ['swell', M.fit - 0.4, 0.4], ['stamp', M.stamp + 0.55, 0.7],
    ['hit', M.knock2, 0.9], ['hit', M.knock2 + 0.35, 0.9], ['hit', M.knock2 + 0.7, 0.9], ['flap', M.door2, 0.4], ['boom', Le('r1') + 0.3, 0.9]];
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [M.knock, M.knock2, M.knock2 + 0.35, M.knock2 + 0.7];

  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, hits, [M.photo, M.page], 8);
    if (t < M.montage) { // ---- arrival, Ficha at the door, the stool ----
      const inK = eo(lin(t, 1.6, 2.8)); const fIn = eo(lin(t, M.knock + 1.2, M.knock + 2.2)); const freeze = t > M.knock && t < M.knock + 1.2;
      const cur = t < Lt('g1') - 0.2 ? 'w' : t < M.knock ? 'g' : t < Lt('f2') - 0.3 ? 'w' : t < Le('f2') ? 'f' : t < Lt('p1') - 0.1 ? 'w' : 'p';
      const ws = { w: [540, 1050, 1.0], g: [600, 1100, 1.5], f: [860, 1150, 1.8], p: [420, 1150, 1.6] };
      X.save(); cam(...ws[cur]); closed(t);
      stackedChairs(140, 1300, 0.6); C(t, 760, 1000, 0.55, { mood: freeze ? 'sad' : 'warm' }); X.fillStyle = '#5a2e14'; X.fillRect(-500, 1150, 1080, 80);
      if (t > Lt('g1') + 0.8) planta(t, 620, 1110, 0.35);
      P(t, mix(-150, 380, inK), 1290, 0.7, { walk: inK < 1, mood: freeze ? 'o' : (t > Lt('p1') ? 'neutral' : 'worried'), wide: freeze, calm: t > Lt('p1'), seed: 8, lookX: t > M.knock ? 1 : 0 });
      G(t, mix(-300, 600, inK), 1300, 0.45, { mood: freeze ? 'shock' : 'neutral', lookX: t > M.knock ? 1 : 0 }); if (t < Lt('g1') + 0.8) planta(t, mix(-300, 600, inK) + 60, 1190, 0.28);
      const open = eo(lin(t, M.knock + 0.9, M.knock + 1.4)); if (open > 0) { X.fillStyle = '#0d1424'; X.fillRect(860, 560, 220 * open, 680); rain(t, 0.3); }
      if (fIn > 0) { const fx = mix(1000, 850, fIn); const shy = t < Le('f2'); F(t, fx, 1290, 0.5, { mood: 'worried', lookY: shy ? 0.6 : 0 }); drips(t, fx, 1150, 0.5); if (t < Lt('f2') - 0.2) { X.fillStyle = '#c47a2a'; rr(fx - 150, 1230, 70, 90, 8); X.fill(); } else if (t < Lt('f2') + 0.8) { X.save(); X.translate(fx - 90, 1180); X.rotate(-0.2); X.fillStyle = '#fffdf6'; rr(-60, -40, 120, 80, 8); X.fill(); txt('lo siento', 0, 5, font('caveat', 700, 30), '#3a5bd0'); X.restore(); } }
      if (t > Lt('p1') + 0.3) stool(mix(560, 680, eo(lin(t, Lt('p1') + 0.3, Lt('p1') + 0.9))), 1300, 0.6);
      X.restore(); say(t, 'c1', 760, 640, { size: 54 }); say(t, 'g1', 600, 760, { size: 52 }); say(t, 'f1', 860, 760, { size: 56 }); say(t, 'f2', 860, 780, { size: 60 }); say(t, 'p1', 420, 760, { size: 52 }); }
    else if (t < M.machine) { // ---- at the table: bravas, churros, laughing, then the page ----
      const laugh = t > Le('g2') - 0.1 && t < M.badge + 1.4; const turn = t > M.turn;
      X.save(); keyCam(t, [[M.montage, 540, 1100, 1.15], [Lt('g2') - 0.1, 400, 1150, 1.5], [Le('g2'), 540, 1100, 1.1], [M.turn, 600, 1150, 1.35], [Lt('p2') - 0.1, 420, 1150, 1.6]]); closed(t, 0.5);
      table(t); bravas(420, 1330, 0.6); churros(660, 1340, 0.55); planta(t, 540, 1260, 0.3);
      if (t > M.badge + 0.4) { X.save(); X.translate(560, 1230); X.fillStyle = '#ffd23d'; X.beginPath(); X.arc(0, 0, 18, 0, 7); X.fill(); txt('★', 0, 2, font('inter', 900, 22), '#b5841a'); X.restore(); }
      G(t, 330, 1180, 0.45, { mood: laugh ? 'laugh' : 'neutral', shades: false });
      if (t > Lt('g2') - 0.4 && t < Le('g2') + 0.2) { X.fillStyle = '#111'; rr(330 - 32, 1176 - 18, 28, 18, 6); X.fill(); rr(330 + 4, 1176 - 18, 28, 18, 6); X.fill(); }
      P(t, 560, 1170, 0.55, { mood: laugh ? 'happy' : (turn ? 'worried' : 'neutral'), wink: laugh && Math.floor(t * 4) % 2 === 0, seed: 9, lookY: turn && t > Lt('p2') ? 1 : 0 }, t > Lt('p2') ? { brows: 'sad' } : {});
      F(t, 790, 1180, 0.45, { mood: laugh ? 'laugh' : (turn ? 'worried' : 'neutral'), point: turn && t < Le('f3') });
      X.restore(); say(t, 'g2', 360, 780, { size: 54 }); say(t, 'g3', 360, 800, { size: 58 }); say(t, 'lf', 790, 760, { size: 46 }); say(t, 'f3', 760, 780, { size: 52 }); say(t, 'p2', 520, 760, { size: 48 }); }
    else if (t < M.page) { // ---- Carmen, the photo, the parents ----
      const off = t > M.machine + 0.3; const ins = t > M.photo && t < Lt('p3') - 0.3; const close = t >= Lt('p3') - 0.3 && t < Lt('c3') - 0.2;
      if (ins) { X.fillStyle = '#1a0f08'; X.fillRect(0, 0, W, H); const k = eo(lin(t, M.photo, M.photo + 0.8)); famPhoto(W / 2, 960, mix(1.1, 1.35, lin(t, M.photo, Lt('p3'))), 1); X.fillStyle = `rgba(0,0,0,${1 - k})`; X.fillRect(0, 0, W, H); }
      else if (close) { X.save(); cam(540, 1100, 2.2); closed(t, 0.6); P(t, 540, 1220, 0.75, { mood: 'o', seed: 9, lookY: 1 }, { tear: t > Lt('p3') + 0.4, brows: 'sad' }); X.restore(); }
      else { X.save(); keyCam(t, [[M.machine, 640, 1000, 1.3], [Lt('c2') - 0.1, 640, 1050, 1.5], [Lt('c3') - 0.2, 560, 1050, 1.25]]); closed(t, off ? 0.62 : 0.5);
        C(t, 760, 1000, 0.6, { mood: t > Lt('c3') ? 'sad' : 'warm', dim: off }); X.fillStyle = '#5a2e14'; X.fillRect(-500, 1150, 1080, 80);
        if (!off) for (let i = 0; i < 5; i++) { const k = (t * 0.7 + i * 0.2) % 1; X.fillStyle = `rgba(255,255,255,${0.3 * (1 - k)})`; X.beginPath(); X.arc(900 + Math.sin(i + t) * 20, 760 - k * 200, 20 + k * 30, 0, 7); X.fill(); }
        const pk = eo(lin(t, Lt('c2'), Lt('c2') + 1.0)); if (pk > 0) { X.save(); X.translate(mix(760, 470, pk), 1140); X.rotate(-0.08); X.scale(0.3, 0.3); famPhoto(0, 0, 1, 1); X.restore(); }
        P(t, 330, 1270, 0.65, { mood: t > Lt('c3') ? 'worried' : 'neutral', seed: 9, lookX: 1 }, t > Lt('c3') + 2 ? { brows: 'sad', tear: true } : {}); G(t, 130, 1290, 0.4, { mood: 'neutral', lookX: 1 }); F(t, 560, 1300, 0.4, { mood: 'worried', lookX: 1 });
        X.restore(); }
      say(t, 'c2', 760, 640, { size: 54 }); say(t, 'p3', 540, 700, { size: 66 }); say(t, 'c3', 700, 620, { size: 46 }); }
    else if (t < M.stamp) { // ---- the page; Gema's stamp ----
      if (t < M.fit + 0.5) { if (t < Lt('c4') + 0.9) { X.save(); cam(700, 1050, 1.5); closed(t, 0.62); C(t, 760, 1000, 0.6, { mood: 'warm', dim: true }); const k = eo(lin(t, M.page, M.page + 0.8)); X.save(); X.translate(mix(760, 640, k), mix(1100, 1000, k)); X.rotate(-0.15); X.fillStyle = '#efe0bc'; rr(-70, -100, 140, 200, 6); X.fill(); X.fillStyle = '#d8c39a'; rr(-50, -80, 100, 80, 4); X.fill(); X.restore(); X.restore(); }
        else pageFit(t, Lt('c4') + 0.9, M.fit); }
      else { X.save(); keyCam(t, [[M.fit + 0.5, 540, 1100, 1.2], [Lt('g4') - 0.1, 360, 1150, 1.6]]); closed(t, 0.5); table(t); planta(t, 540, 1260, 0.3);
        G(t, 330, 1180, 0.45, { mood: 'happy', raise: t > Lt('g4') }); if (t > Lt('g4') - 0.4) { X.save(); X.translate(330 + 90, 1060); X.fillStyle = '#5a3a1a'; rr(-20, -80, 40, 70, 10); X.fill(); X.fillStyle = '#2a1d16'; rr(-50, -14, 100, 30, 10); X.fill(); X.restore(); }
        P(t, 560, 1170, 0.55, { mood: 'happy', seed: 9 }, { tear: true }); F(t, 790, 1180, 0.45, { mood: 'happy' }); X.restore(); }
      say(t, 'c4', 760, 640, { size: 56, until: Math.min(Le('c4') + 0.45, Lt('c4') + 0.9) }); say(t, 'g4', 360, 760, { size: 58 }); }
    else if (t < M.knock2) { passportShot(t, M.stamp, 5, 5, { photo: true }); }
    else { // ---- hook: the knock, Racha in the doorway ----
      const open = eo(lin(t, M.door2, M.door2 + 0.6)); const z = mix(1.0, 1.7, eo(lin(t, M.door2 + 0.4, Le('r1'))));
      X.save(); cam(mix(540, 940, eo(lin(t, M.door2 + 0.4, Lt('r1')))), 1000, z); closed(t, 0.6); stackedChairs(140, 1300, 0.6);
      X.fillStyle = '#05070f'; X.fillRect(860, 560, 220 * open, 680); if (open > 0) { X.save(); X.beginPath(); X.rect(860, 560, 220, 680); X.clip(); rain(t, 0.5); R(t, 970, 1170, 0.75, { mood: 'sad', out: M.door2 - 3 }); drips(t, 970, 1000, 0.5); X.restore(); }
      P(t, 380, 1290, 0.7, { mood: 'o', wide: true, seed: 8, lookX: 1 }); G(t, 600, 1300, 0.45, { mood: 'shock', lookX: 1 }); F(t, 200, 1300, 0.45, { mood: 'shock', lookX: 1 });
      X.restore(); say(t, 'r1', 860, 720, { size: 56 });
      const ft = Le('r1') + 0.3; if (t > ft) { if (t < ft + 0.25) { X.fillStyle = 'rgba(230,240,255,0.85)'; X.fillRect(0, 0, W, H); } else { X.fillStyle = '#000'; X.fillRect(0, 0, W, H); } } }
    X.restore(); titleCard(t, 9, 'La Página', '#2a1810'); letterbox(); fadeEnd(t, DUR, 0.4);
  } };
})();
