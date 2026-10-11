// 12 · "Same app. Different course." — v4: space → earth → city → someone on a bench → into their phone. Then the other side of the world.
window.ready = (async () => {
  await loadFonts(); await loadWorld();
  await loadImages({ logo: 'app/logo512.png', ml: 'app/madrid_lesson_0.png', mw: 'app/madrid_words.png', mp: 'app/madrid_passport.png',
    tl: 'app/tokio_lesson_0.png', tw: 'app/tokio_words.png', tp: 'app/tokio_passport.png' });
  const L = await loadTimeline('12');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const END = e(12) + 0.25, DUR = END + 1.7; window.DURATION = DUR;
  const ES = { lon: -3.7, lat: 40.4 }, JP = { lon: 139.7, lat: 35.7 };
  const TERRA = '#c4622d', CREAM = '#f6efe2', INK = '#1d1410', CYAN = '#4fd6ff', GOLD = '#f2c46b';
  // the story beats
  const A0 = 0, B0 = s(2) - 0.1, B1 = s(3) - 0.05, C1 = s(6) - 0.85, D1 = C1 + 1.4, E1 = s(7) - 0.05, F1 = s(8) - 0.05, G1 = s(11) - 0.3, H1 = G1 + 1.1;
  const cues = [['hum', 0, 0.5], ['swell', 1.2, 0.5], ['riser', B1 - 0.2, 0.5], ['whoosh', B0, 0.7], ['whoosh', B0 + 1.2, 0.5], ['whoosh', B0 + 2.2, 0.6], ['click', B1 - 0.1, 0.6],
    ['page', s(4) - 0.1, 0.6], ['page', s(5) - 0.1, 0.6], ['whoosh', C1, 0.8], ['whoosh', C1 + 0.7, 0.6], ['plane', D1, 0.7],
    ['whoosh', E1, 0.7], ['whoosh', E1 + 1.2, 0.5], ['whoosh', E1 + 2.2, 0.6], ['riser', F1 - 0.2, 0.5], ['click', F1 - 0.1, 0.6], ['page', s(9) - 0.1, 0.6], ['page', s(10) - 0.1, 0.6],
    ['whoosh', G1, 0.8], ['swell', H1, 0.5], ['impact', p(11, 1) || s(11) + 0.8, 0.9], ['ding', END, 0.5]];
  [p(4, 2), p(4, 3), p(4, 4), p(9, 2), p(9, 3), p(9, 4)].forEach((x) => cues.push(['pop', x, 0.6]));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };

  // ---------- layers ----------
  const STARS = Array.from({ length: 220 }, (_, i) => [hash(i) * W, hash(i + 5) * H, 0.6 + hash(i + 9) * 2.2, hash(i + 13)]);
  function space(t, a = 1) { X.fillStyle = '#03040b'; X.fillRect(0, 0, W, H); X.save(); X.globalAlpha = a;
    STARS.forEach(([x, y, r, h]) => { X.fillStyle = `rgba(255,255,255,${0.35 + 0.5 * Math.abs(Math.sin(t * (0.6 + h) + h * 9))})`; X.beginPath(); X.arc(x, y, r, 0, 7); X.fill(); }); X.restore(); }
  function earth(t, R, lon, lat, pins = []) {
    globe(W / 2, H / 2 - 80, R, lon, lat, { ocean: '#0a1f44', ocean2: '#1d4a86', land: '#3f7a4d', edge: 'rgba(255,255,255,0.18)', grid: 'rgba(255,255,255,0.05)', rim: 'rgba(120,190,255,0.5)' });
    pins.forEach(([pl, col]) => { const [x, y, v] = globePt(W / 2, H / 2 - 80, R, lon, lat, pl.lon, pl.lat); if (v <= 0) return; const r = 14 + 6 * Math.sin(t * 6);
      X.fillStyle = col; X.shadowColor = col; X.shadowBlur = 30; X.beginPath(); X.arc(x, y, r, 0, 7); X.fill(); X.shadowBlur = 0; X.strokeStyle = col; X.lineWidth = 3; X.beginPath(); X.arc(x, y, r + 16 + (t * 30 % 30), 0, 7); X.stroke(); });
  }
  // top-down city around a park; style: 'es' warm roofs, 'jp' night grey + neon
  function city(t, sc, style) {
    X.save(); X.translate(W / 2, H / 2 - 80); X.scale(sc, sc);
    X.fillStyle = style === 'es' ? '#c9b08a' : '#2b2f3a'; X.fillRect(-4000, -4000, 8000, 8000);
    const B = 300;
    for (let gx = -12; gx <= 12; gx++) for (let gy = -12; gy <= 12; gy++) {
      const x = gx * B - B / 2, y = gy * B - B / 2;
      if (gx === 0 && gy === 0) { // the park
        X.fillStyle = style === 'es' ? '#6f9a52' : '#2f5a44'; X.fillRect(x + 20, y + 20, B - 40, B - 40);
        X.strokeStyle = style === 'es' ? '#e6d2a8' : '#8892a6'; X.lineWidth = 10; X.beginPath(); X.moveTo(x + 20, y + B / 2); X.lineTo(x + B - 20, y + B / 2); X.stroke();
        for (let i = 0; i < 7; i++) { X.fillStyle = style === 'es' ? '#3f6b31' : '#1d3b2c'; X.beginPath(); X.arc(x + 50 + hash(i) * (B - 100), y + 50 + hash(i + 4) * 80, 22, 0, 7); X.fill(); }
        X.fillStyle = '#6b4a2e'; X.fillRect(-26, 8, 52, 12); // the bench
        X.fillStyle = style === 'es' ? '#f6efe2' : '#e8eef8'; X.beginPath(); X.arc(0, 4, 7, 0, 7); X.fill(); // someone on it
        continue;
      }
      const h = hash(gx * 31 + gy * 17 + (style === 'es' ? 0 : 99));
      for (let k = 0; k < 4; k++) { const bx = x + 20 + (k % 2) * (B / 2 - 20), by = y + 20 + Math.floor(k / 2) * (B / 2 - 20), bw = B / 2 - 30, bh = B / 2 - 30;
        X.fillStyle = style === 'es' ? ['#b5562e', '#c66b3d', '#a24a28', '#d08a5a'][Math.floor(hash(k + h * 10) * 4)] : ['#3d4352', '#474e60', '#363b48', '#525a6e'][Math.floor(hash(k + h * 10) * 4)];
        X.fillRect(bx, by, bw, bh);
        if (style === 'jp' && hash(k + h) > 0.6) { X.fillStyle = ['#ff3fa4', '#3ff0ff', '#ffe14d'][k % 3]; X.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5 + k + h * 9); X.fillRect(bx + 8, by + 8, bw * 0.4, 8); X.globalAlpha = 1; } }
    }
    X.restore();
  }
  // a person on a bench, holding a phone up in front of them (side-front view). origin = phone centre.
  function benchScene(t, sc, style, appImg) {
    X.save(); X.translate(W / 2, H / 2 - 80); X.scale(sc, sc);
    // backdrop
    if (style === 'es') { const g = X.createLinearGradient(0, -900, 0, 600); g.addColorStop(0, '#f2a65e'); g.addColorStop(1, '#f7d8a8'); X.fillStyle = g; }
    else { const g = X.createLinearGradient(0, -900, 0, 600); g.addColorStop(0, '#0d1230'); g.addColorStop(1, '#2a1f4a'); X.fillStyle = g; }
    X.fillRect(-2000, -2000, 4000, 4000);
    if (style === 'es') { for (let i = 0; i < 5; i++) { const x = -900 + i * 450; X.fillStyle = '#6b4a2e'; X.fillRect(x - 12, -60, 24, 300); X.fillStyle = '#4f7f3a'; X.beginPath(); X.arc(x, -120, 150, 0, 7); X.fill();
        for (let j = 0; j < 6; j++) { X.fillStyle = '#f39a2b'; X.beginPath(); X.arc(x - 90 + hash(i * 7 + j) * 180, -190 + hash(j + i) * 140, 13, 0, 7); X.fill(); } } }
    else { for (let i = 0; i < 6; i++) { const x = -1000 + i * 380, h = 500 + hash(i) * 400; X.fillStyle = '#161a33'; X.fillRect(x, 200 - h, 300, h);
        for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) if (hash(i * 31 + r * 3 + c) > 0.4) { X.fillStyle = 'rgba(255,230,160,0.6)'; X.fillRect(x + 30 + c * 90, 240 - h + r * 60, 50, 30); }
        X.fillStyle = ['#ff3fa4', '#3ff0ff', '#ffe14d'][i % 3]; X.globalAlpha = 0.7 + 0.3 * Math.sin(t * 4 + i); X.fillRect(x + 40, 260 - h, 22, 160); X.globalAlpha = 1; } }
    X.fillStyle = style === 'es' ? '#d9c39a' : '#1a1d2c'; X.fillRect(-2000, 330, 4000, 2000);
    // bench
    X.fillStyle = '#6b4a2e'; for (let i = 0; i < 3; i++) X.fillRect(-330, 120 + i * 34, 660, 24); X.fillRect(-340, 230, 680, 30);
    X.fillStyle = '#3a2a1c'; X.fillRect(-300, 260, 26, 110); X.fillRect(274, 260, 26, 110);
    // person (centred a little left of the phone)
    const ox = -40, oy = 0;
    X.save(); X.translate(ox, oy);
    const cloth = style === 'es' ? '#ffffff' : '#e8eef8', legs = style === 'es' ? '#2b2b33' : '#20263a';
    X.fillStyle = legs; rr(-120, 210, 110, 60, 20); X.fill(); rr(10, 210, 110, 60, 20); X.fill(); rr(-110, 250, 60, 160, 20); X.fill(); rr(30, 250, 60, 160, 20); X.fill();
    X.fillStyle = '#1a1a1a'; rr(-125, 395, 85, 34, 14); X.fill(); rr(25, 395, 85, 34, 14); X.fill();
    X.fillStyle = cloth; rr(-150, -70, 300, 300, 70); X.fill();
    if (style === 'es') { X.fillStyle = '#c9c9c9'; for (let i = 0; i < 3; i++) { X.beginPath(); X.arc(-40, -10 + i * 60, 9, 0, 7); X.fill(); X.beginPath(); X.arc(40, -10 + i * 60, 9, 0, 7); X.fill(); } }
    else { X.fillStyle = '#23305a'; X.beginPath(); X.moveTo(-14, -60); X.lineTo(14, -60); X.lineTo(24, 120); X.lineTo(0, 150); X.lineTo(-24, 120); X.closePath(); X.fill(); }
    X.fillStyle = '#e8b48a'; X.fillRect(-28, -110, 56, 50);
    X.beginPath(); X.arc(0, -190, 95, 0, 7); X.fill();
    X.fillStyle = style === 'es' ? '#3a2416' : '#151515';
    if (style === 'es') { X.beginPath(); X.arc(0, -215, 100, Math.PI, 0); X.fill(); X.beginPath(); X.arc(70, -275, 48, 0, 7); X.fill(); }
    else { X.beginPath(); X.arc(0, -220, 98, Math.PI * 1.05, Math.PI * 1.95); X.fill(); X.fillRect(-98, -230, 196, 34); }
    X.fillStyle = INK; X.beginPath(); X.arc(-34, -180, 9, 0, 7); X.arc(34, -180, 9, 0, 7); X.fill(); // looking down at the phone
    X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); X.arc(0, -140, 22, 0.2 * Math.PI, 0.8 * Math.PI); X.stroke();
    X.restore();
    // arms holding the phone up (phone centre at 0,0 → drawn at ( 40, -20 ) relative to body so that phone is origin)
    X.strokeStyle = cloth; X.lineWidth = 56; X.lineCap = 'round';
    X.beginPath(); X.moveTo(-170, 0); X.quadraticCurveTo(-140, 120, -20, 60); X.stroke(); X.beginPath(); X.moveTo(90, 0); X.quadraticCurveTo(140, 120, 40, 60); X.stroke();
    X.restore();
    // the phone itself, at screen position of the hands (drawn last so it can become the whole screen)
    X.save(); X.translate(W / 2 - 10 * sc, H / 2 - 80 + 0 * sc); X.scale(sc, sc);
    X.fillStyle = 'rgba(0,0,0,0.25)'; rr(-40 + 6, -86 + 10, 80, 172, 12); X.fill();
    phone(appImg, 0, 0, 80, { focus: [585, 380], zoom: 1, shadow: false });
    X.fillStyle = '#e8b48a'; X.beginPath(); X.ellipse(-44, 48, 9, 16, 0, 0, 7); X.ellipse(44, 48, 9, 16, 0, 0, 7); X.fill(); // fingers at the edges
    X.restore();
  }
  const PH_W = 80; // phone width in bench-scene units
  // z: 0 = globe, 1 = city, 2 = bench, 3 = inside the phone
  function dive(t, z, place, style, appImg, lonOverride) {
    const sm = (a, b) => cl((z - a) / (b - a));
    if (z < 1.2) { space(t, 1); earth(t, 380 * Math.exp(z * 2.15), lonOverride ?? place.lon, place.lat, [[place, style === 'es' ? GOLD : CYAN]]); }
    if (z > 0.85 && z < 2.25) { X.save(); X.globalAlpha = sm(0.85, 1.15) * (1 - sm(1.95, 2.25)); city(t, 0.32 * Math.exp((z - 0.85) * 2.55), style); X.restore(); }
    if (z > 1.95) { X.save(); X.globalAlpha = sm(1.95, 2.25); benchScene(t, 0.55 * Math.exp((z - 2) * 3.05), style, appImg); X.restore(); }
  }
  function inPhone(t, img, o = {}) { // the phone fills the screen: a big phone frame with the real app
    phone(img, W / 2, H / 2 - 80, 900, { focus: o.focus, zoom: o.zoom || 1, scrollY: o.scrollY, shadow: false });
  }
  function screens(t, list) { // [[t0, img, opts]] with 3D page turns between them
    let i = 0; list.forEach((x, j) => { if (t >= x[0]) i = j; });
    const k = i > 0 ? eio(lin(t, list[i][0], list[i][0] + 0.4)) : 1;
    const draw = (x) => () => { X.translate(-W / 2 + 500, -H / 2 + 960); inPhone(t, IMG[x[1]], x[2]); };
    if (k < 1) flipPlane(W / 2, H / 2, 1000, 1920, k * Math.PI * -1, draw(list[i - 1]), draw(list[i]), { key: 'scr', persp: 2600, shadow: false });
    else inPhone(t, IMG[list[i][1]], list[i][2]);
  }
  function title(t, t0, l1, l2, col) { if (t < t0) return; X.save(); X.fillStyle = 'rgba(0,0,0,0.45)'; X.fillRect(0, 0, W, 330); X.restore();
    slam(t, t0, l1, W / 2, 120, font('archivo', 400, 64), '#fff', { from: 1.2 }); if (l2) slam(t, t0 + 0.15, l2, W / 2, 230, font('archivo', 400, 86), col, { from: 1.3, max: 980 }); }
  function wordChips(t, items, col) { items.forEach(([t0, a, b], i) => { if (t < t0) return; const k = back(lin(t, t0, t0 + 0.3), 2); X.save(); X.translate(W / 2, 1180 + i * 170); X.scale(k, k); X.rotate((i - 1) * 0.03);
    X.fillStyle = 'rgba(0,0,0,0.3)'; rr(-372, -62, 760, 136, 68); X.fill(); X.fillStyle = col; rr(-380, -70, 760, 136, 68); X.fill(); txt(a, 0, -14, font('inter', 900, 54), INK); txt(b, 0, 38, font('inter', 700, 32), 'rgba(0,0,0,0.6)'); X.restore(); }); }

  window.SCENE = {
    frame(t) {
      X.save(); camera(t, [p(11, 1) || s(11) + 0.8], [B1, F1, H1], 14);
      if (t < B0) { // space: the whole earth, two dots
        space(t); const lon = mix(60, ES.lon + 25, eio(lin(t, 0, B0)));
        earth(t, 380 * mix(0.85, 1, eo(lin(t, 0, 0.8))), lon, 30, [[ES, GOLD], [JP, CYAN]]);
        slam(t, 0.15, 'TWO PEOPLE.', W / 2, 1520, font('archivo', 400, 110), '#fff', {}); slam(t, p(1, 1) || 0.9, 'SAME APP.', W / 2, 1660, font('archivo', 400, 110), GOLD, { from: 1.4 });
      } else if (t < B1) { // dive into Spain
        const u = lin(t, B0, B1), z = 3 * mix(eio(u), u, 0.25);
        dive(t, z, ES, 'es', IMG.ml, mix(ES.lon + 25, ES.lon, eo(lin(t, B0, B0 + 0.8))));
        if (z > 2.05 && z < 2.75) { const k = back(lin(z, 2.05, 2.3)); X.save(); X.translate(W / 2, 330); X.scale(k, k); pill('KITCHEN JOB · SPAIN', 0, 0, font('archivo', 400, 54), '#fff', TERRA); X.restore(); }
      } else if (t < C1) { // inside her phone
        X.fillStyle = '#f2a65e'; X.fillRect(0, 0, W, H);
        screens(t, [[B1, 'ml', { focus: [585, 1150], zoom: 1.2 }], [s(4) - 0.1, 'mw', { scrollY: 200 + (t - s(4)) * 60 }], [s(5) - 0.1, 'mp', { focus: [585, 1950], zoom: 1.4 }]]);
        if (t < s(4) - 0.1) title(t, s(3), 'HER FIRST LESSON', 'EXPLAINING THE MENU', GOLD);
        else if (t < s(5) - 0.1) { title(t, s(4), 'HER WORDS', null, GOLD); wordChips(t, [[p(4, 2), 'la comanda', 'the order'], [p(4, 3), 'la sartén', 'the frying pan'], [p(4, 4), 'marchando', 'coming right up']], CREAM); }
        else title(t, s(5), 'HER PASSPORT', 'HISPANIDAD', GOLD);
      } else if (t < D1) { // back out, all the way to space
        const z = 3 * (1 - eio(lin(t, C1, D1))); dive(t, z, ES, 'es', IMG.mp);
      } else if (t < E1) { // the earth turns east
        space(t); const k = eio(lin(t, D1, E1 - 0.1));
        earth(t, 380, mix(ES.lon, JP.lon, k), mix(ES.lat, JP.lat, k), [[ES, GOLD], [JP, CYAN]]);
        const km = Math.round(10000 * eo(lin(t, D1 + 0.1, E1 - 0.2)) / 100) * 100;
        slam(t, D1 + 0.1, km.toLocaleString('en') + ' KM', W / 2, 1520, font('archivo', 400, 130), '#fff', { from: 1.2 }); slam(t, D1 + 0.5, 'EAST', W / 2, 1670, font('archivo', 400, 110), CYAN, {});
      } else if (t < F1) { // dive into Tokyo
        const u = lin(t, E1, F1), z = 3 * mix(eio(u), u, 0.25);
        dive(t, z, JP, 'jp', IMG.tl);
        if (z > 2.05 && z < 2.75) { const k = back(lin(z, 2.05, 2.3)); X.save(); X.translate(W / 2, 330); X.scale(k, k); pill('FIRST OFFICE JOB · TOKYO', 0, 0, font('archivo', 400, 54), INK, CYAN); X.restore(); }
      } else if (t < G1) { // inside his phone
        X.fillStyle = '#161a33'; X.fillRect(0, 0, W, H);
        screens(t, [[F1, 'tl', { focus: [585, 1150], zoom: 1.2 }], [s(9) - 0.1, 'tw', { scrollY: 200 + (t - s(9)) * 60 }], [s(10) - 0.1, 'tp', { focus: [585, 1950], zoom: 1.4 }]]);
        if (t < s(9) - 0.1) title(t, s(8), 'HIS FIRST LESSON', 'MAKING A REQUEST', CYAN);
        else if (t < s(10) - 0.1) { title(t, s(9), 'HIS WORDS', null, CYAN); wordChips(t, [[p(9, 2), 'お願いします', 'onegaishimasu · please'], [p(9, 3), '会議', 'kaigi · meeting'], [p(9, 4), '資料', 'shiryō · documents']], CREAM); }
        else title(t, s(10), 'HIS PASSPORT', 'NIHON', CYAN);
      } else if (t < H1) {
        const z = 3 * (1 - eio(lin(t, G1, H1))); dive(t, z, JP, 'jp', IMG.tp);
      } else if (t < s(12)) { // both, from space
        space(t); const k = eio(lin(t, H1, H1 + 1.0)), lon = mix(JP.lon, 68, k), lat = mix(JP.lat, 40, k), R = 400;
        earth(t, R, lon, lat, [[ES, GOLD], [JP, CYAN]]);
        const arc = eo(lin(t, H1 + 0.4, H1 + 1.4)); X.strokeStyle = 'rgba(255,255,255,0.8)'; X.setLineDash([12, 12]); X.lineWidth = 4; X.beginPath(); let on = false;
        for (let i = 0; i <= 60 * arc; i++) { const u = i / 60, [x, y, v] = globePt(W / 2, H / 2 - 80, R * (1 + 0.15 * Math.sin(u * Math.PI)), lon, lat, mix(ES.lon, JP.lon, u), mix(ES.lat, JP.lat, u) + Math.sin(u * Math.PI) * 18); if (v > 0) { on ? X.lineTo(x, y) : X.moveTo(x, y); on = true; } }
        X.stroke(); X.setLineDash([]);
        slam(t, s(11), 'SAME APP.', W / 2, 1460, font('archivo', 400, 120), '#fff', {});
        slam(t, p(11, 1) || s(11) + 0.8, 'NOT ONE LESSON', W / 2, 1600, font('archivo', 400, 96), GOLD, { from: 1.4 }); slam(t, (p(11, 1) || s(11) + 0.8) + 0.2, 'IN COMMON.', W / 2, 1720, font('archivo', 400, 96), GOLD, { from: 1.4 });
      } else {
        space(t); const k = eo(lin(t, s(12), s(12) + 0.4));
        earth(t, 400 * mix(1, 0.6, k), 68 + (t - s(12)) * 8, 40, []);
        X.fillStyle = `rgba(3,4,11,${0.55 * k})`; X.fillRect(0, 0, W, H);
        coinIn(t, s(12), W / 2, 760, 160, { glow: 'rgba(242,196,107,0.6)', shadowCol: 'rgba(0,0,0,0)' });
        slam(t, s(12) + 0.1, "That's", W / 2, 1010, font('serif', 400, 90), CREAM, {});
        slam(t, s(12) + 0.3, 'Borderless.', W / 2, 1140, font('inter', 900, 140), '#fff', {});
        if (t > END) txt('€9,99 per course · borderlesslearn.com', W / 2, 1270, font('inter', 700, 38), CREAM, { a: eo(lin(t, END, END + 0.4)) });
      }
      X.restore();
    },
  };
})();
