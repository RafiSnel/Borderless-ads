// 17 · "The Comeback" — a movie trailer. Same message as before (a 400-day streak can't order a coffee; two weeks of Borderless can), told as cinema.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('17n');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const END = e(13) + 0.3, DUR = END + 2.0; window.DURATION = DUR;
  const GOLD = '#e9c46a', GOLD2 = '#7a5a1e', CREAM = '#f6efe2', INK = '#140d08', ORANGE = '#ff7a2f';
  const speaking = (n, t) => t >= s(n) && t <= e(n) ? 0.35 + 0.65 * Math.abs(Math.sin((t - s(n)) * 17)) : 0;
  const CUT = [0, s(2) - 0.15, s(3) - 0.1, s(4) - 0.6, s(6) - 0.3, s(7) - 0.2, s(9) - 0.1, s(10) - 0.15, s(11) - 0.9, s(13) - 0.1];
  const cues = [['hum', 0, 0.6], ['boom', 0.1, 0.9], ['swell', 1.6, 0.5], ['boom', s(2) - 0.1, 1], ['impact', p(2, 3) || s(2) + 1.2, 0.8], ['boom', s(3) - 0.05, 0.9],
    ['whoosh', s(4) - 0.6, 0.6], ['bell', s(4) - 0.4, 0.4], ['gasp', p(5, 1) || s(5) + 1.0, 0.4], ['scratch', s(6) - 0.25, 1], ['laugh', s(6) + 0.2, 0.7],
    ['boom', s(7) - 0.15, 0.9], ['riser', s(8) + 0.6, 0.6], ['impact', s(8) + 0.2, 0.9], ['whoosh', s(9), 0.6], ['whoosh', p(9, 1) || s(9) + 1.3, 0.6], ['whoosh', p(9, 2) || s(9) + 1.8, 0.6], ['hit', p(9, 3) || s(9) + 2.6, 0.8],
    ['type', s(10), 0.7], ['boom', s(11) - 0.85, 0.8], ['bell', s(11) - 0.6, 0.4], ['gasp', s(12) + 0.3, 0.5], ['boom', s(13) - 0.05, 1], ['gong', s(13) + 0.6, 0.7], ['coin', END, 0.7]];
  window.CUES = { dur: DUR, cues, sfx_gain: 0.42 };

  // ---------- cinema chrome ----------
  function bars() { X.fillStyle = '#000'; X.fillRect(0, 0, W, 210); X.fillRect(0, H - 210, W, 210); }
  function rays(t, x, y, a = 0.25, col = '255,214,150') { X.save(); X.globalCompositeOperation = 'lighter'; for (let i = 0; i < 9; i++) { const ang = Math.PI / 2 + (i - 4) * 0.13 + Math.sin(t * 0.4 + i) * 0.03;
    const g = X.createLinearGradient(x, y, x + Math.cos(ang) * 1900, y + Math.sin(ang) * 1900); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); X.fillStyle = g;
    X.beginPath(); X.moveTo(x, y); X.lineTo(x + Math.cos(ang - 0.04) * 1900, y + Math.sin(ang - 0.04) * 1900); X.lineTo(x + Math.cos(ang + 0.04) * 1900, y + Math.sin(ang + 0.04) * 1900); X.fill(); } X.restore(); }
  function dust(t, a = 0.5) { for (let i = 0; i < 70; i++) { const x = (hash(i) * W + Math.sin(t * 0.3 + i) * 30), y = ((hash(i + 3) * H - t * (10 + hash(i) * 30)) % H + H) % H; X.fillStyle = `rgba(255,230,190,${a * (0.3 + 0.7 * hash(i + 7))})`; X.beginPath(); X.arc(x, y, 1.5 + hash(i + 9) * 2.5, 0, 7); X.fill(); } }
  function flare(t, x, y, k) { X.save(); X.globalCompositeOperation = 'lighter'; const g = X.createRadialGradient(x, y, 0, x, y, 300 * k); g.addColorStop(0, `rgba(255,240,200,${0.7 * k})`); g.addColorStop(1, 'rgba(255,240,200,0)'); X.fillStyle = g; X.fillRect(x - 400, y - 400, 800, 800);
    X.fillStyle = `rgba(255,230,180,${0.5 * k})`; X.fillRect(0, y - 2, W, 4); X.restore(); }
  function title(t, t0, text, y, size, o = {}) { if (t < t0) return; const k = lin(t, t0, t0 + 0.9), a = cl(k * 2) * (o.out ? 1 - lin(t, o.out - 0.2, o.out) : 1); if (a <= 0) return;
    X.save(); X.globalAlpha = a; extrude(text, W / 2, y, font('serif', 400, size), o.face || GOLD, o.side || GOLD2, o.depth ?? 14, { s: mix(1.12, 1, eo(k)), shadow: false, turn: (1 - eo(k)) * 0.15, ls: o.ls }); X.restore();
    if (k < 0.6) flare(t, W / 2 + (k - 0.3) * 1600, y, 1 - k / 0.6); }
  function flameGuy(t, x, y, sc, mood = 'smug') { // the streak flame: sunglasses, smug (never named)
    X.save(); X.translate(x, y); X.scale(sc, sc * (1 + Math.sin(t * 20) * 0.03));
    const g = X.createLinearGradient(0, -260, 0, 160); g.addColorStop(0, '#ffd23d'); g.addColorStop(1, ORANGE); X.fillStyle = g;
    X.beginPath(); X.moveTo(0, -270); X.bezierCurveTo(130, -120, 190, 10, 140, 110); X.bezierCurveTo(100, 180, -100, 180, -140, 110); X.bezierCurveTo(-190, 10, -100, -80, -40, -130); X.bezierCurveTo(-20, -60, 30, -80, 0, -270); X.fill();
    X.fillStyle = '#1a1a1a'; rr(-100, -40, 90, 50, 18); X.fill(); rr(10, -40, 90, 50, 18); X.fill(); X.fillRect(-12, -26, 24, 10);
    X.strokeStyle = '#7a2a0a'; X.lineWidth = 9; X.lineCap = 'round'; X.beginPath();
    if (mood === 'laugh') { X.arc(0, 50, 46, 0, Math.PI); X.closePath(); X.fillStyle = '#7a2a0a'; X.fill(); } else if (mood === 'shock') { X.ellipse(0, 70, 26, 38, 0, 0, 7); X.fillStyle = '#7a2a0a'; X.fill(); } else { X.moveTo(-40, 60); X.quadraticCurveTo(10, 85, 50, 50); X.stroke(); }
    X.restore(); }
  function barista(t, x, y, sc, talk = 0) {
    X.save(); X.translate(x, y + Math.sin(t * 2) * 3); X.scale(sc, sc);
    X.fillStyle = '#2d3a4a'; rr(-170, -60, 340, 420, 90); X.fill(); X.fillStyle = '#7a4a2a'; rr(-120, 40, 240, 320, 30); X.fill();
    X.fillStyle = '#c98e65'; X.beginPath(); X.arc(0, -170, 105, 0, 7); X.fill();
    X.fillStyle = '#2a1810'; X.beginPath(); X.arc(0, -200, 112, Math.PI * 1.02, Math.PI * 1.98); X.fill(); X.beginPath(); X.arc(95, -150, 48, 0, 7); X.fill();
    X.fillStyle = INK; X.beginPath(); X.arc(-38, -170, 10, 0, 7); X.arc(38, -170, 10, 0, 7); X.fill();
    if (talk > 0.05) { X.fillStyle = '#5a1a1a'; X.beginPath(); X.ellipse(0, -112, 20, 6 + talk * 14, 0, 0, 7); X.fill(); } else { X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); X.arc(0, -125, 22, 0.2 * Math.PI, 0.8 * Math.PI); X.stroke(); }
    X.restore(); }
  function cafe(t, push, k2 = 0) { // three depth layers with parallax: shelves (back), barista + Pasito (mid), counter (front)
    const z = 1 + push * 0.12, px = Math.sin(t * 0.3) * 20;
    X.save(); X.translate(W / 2, H / 2); X.scale(z * 0.98, z * 0.98); X.translate(-W / 2 + px * 0.4, -H / 2);
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2a160e'); g.addColorStop(1, '#5a3220'); X.fillStyle = g; X.fillRect(-200, 0, W + 400, H);
    for (let r = 0; r < 4; r++) { X.fillStyle = '#3a2216'; X.fillRect(-100, 330 + r * 190, W + 200, 16); for (let i = 0; i < 14; i++) { const x = -60 + i * 85 + (r % 2) * 40; X.fillStyle = ['#6e8f5a', '#9c3a2a', '#d9b26a', '#3d5a7a'][(i + r) % 4]; X.globalAlpha = 0.55; rr(x, 230 + r * 190, 40, 100, 10); X.fill(); X.globalAlpha = 1; } }
    for (let i = 0; i < 4; i++) { const lx = 160 + i * 260; const gg = X.createRadialGradient(lx, 260, 5, lx, 260, 260); gg.addColorStop(0, 'rgba(255,200,120,0.45)'); gg.addColorStop(1, 'rgba(255,200,120,0)'); X.fillStyle = gg; X.fillRect(lx - 260, 0, 520, 520); }
    X.restore();
    X.save(); X.translate(W / 2, H / 2); X.scale(z, z); X.translate(-W / 2 + px, -H / 2);
    barista(t, 300, 1060, 1.05, speaking(4, t) || speaking(12, t));
    X.restore();
    return z;
  }
  function counter(t, push) { const z = 1 + push * 0.12, px = Math.sin(t * 0.3) * 20; X.save(); X.translate(W / 2, H / 2); X.scale(z * 1.04, z * 1.04); X.translate(-W / 2 + px * 1.6, -H / 2);
    X.fillStyle = '#4a2a18'; X.fillRect(-200, 1360, W + 400, 600); X.fillStyle = '#6b3d22'; X.fillRect(-200, 1340, W + 400, 40);
    X.fillStyle = CREAM; X.beginPath(); X.ellipse(540, 1338, 70, 16, 0, 0, 7); X.fill(); X.restore(); }
  function sub(t, t0, t1, text) { if (t < t0 || t > t1 || !text) return; X.save(); X.globalAlpha = eo(lin(t, t0, t0 + 0.2)) * (1 - lin(t, t1 - 0.15, t1));
    const f = font('inter', 800, 42); X.font = f; const words = text.split(' '), lines = []; let cur = ''; words.forEach((w) => { const c2 = cur ? cur + ' ' + w : w; if (X.measureText(c2).width > 900 && cur) { lines.push(cur); cur = w; } else cur = c2; }); lines.push(cur);
    lines.forEach((l, i) => txt(l, W / 2, H - 300 - (lines.length - 1 - i) * 54, f, '#fff', { stroke: '#000', sw: 8 })); X.restore(); }
  function grade(a) { if (a <= 0) return; X.save(); X.globalCompositeOperation = 'saturation'; X.fillStyle = `rgba(128,128,128,${a})`; X.fillRect(0, 0, W, H); X.restore(); }

  window.SCENE = {
    frame(t) {
      X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
      X.save(); camera(t, [p(2, 3) || s(2) + 1.2, s(8) + 0.2, s(13)], CUT, 12);
      if (t < s(2) - 0.15) { // in a world…
        rays(t, W / 2, 260, 0.18); dust(t, 0.6);
        X.save(); X.globalAlpha = 0.35 + 0.15 * Math.sin(t * 2); flameGuy(t, W / 2, 1150 + Math.sin(t) * 10, 2.2); X.restore();
        X.fillStyle = 'rgba(0,0,0,0.35)'; X.fillRect(0, 0, W, H);
        title(t, 0.2, 'IN A WORLD…', 760, 110);
        title(t, p(1, 2) || 1.4, 'WHERE STREAKS', 920, 96, { face: CREAM, side: '#6b5a48' }); title(t, (p(1, 2) || 1.4) + 0.3, 'MEAN EVERYTHING', 1050, 96, { face: CREAM, side: '#6b5a48' });
      } else if (t < s(3) - 0.1) { // one passport, 400 days
        rays(t, 760, 220, 0.22); dust(t, 0.5);
        const k = eo(lin(t, s(2) - 0.15, s(2) + 0.8));
        extrude('400', W / 2 + 60, 760, font('anton', 400, 520), GOLD, GOLD2, 34, { turn: (1 - k) * 0.8 + Math.sin(t) * 0.05, s: mix(1.3, 1, k), shadow: false });
        mascot(t, 300, 1350, 1.5, { mood: 'happy', seed: 1, armsUp: t > (p(2, 3) || s(2) + 1.2) });
        flameGuy(t, 800, 1330, 0.9, 'laugh'); if (t > (p(2, 3) || s(2) + 1.2)) HOST.say(t, p(2, 3) || s(2) + 1.2, s(3), '400 DAYS!!', 760, 1000, { size: 56, tail: 0.3 });
        title(t, s(2) + 0.1, 'ONE PASSPORT.', 1630, 80, { face: CREAM, side: '#6b5a48', depth: 8 });
      } else if (t < s(4) - 0.6) { // one simple mission
        rays(t, W / 2, 300, 0.3); dust(t, 0.4);
        const k = eo(lin(t, s(3) - 0.1, s(4))); X.save(); X.translate(W / 2, 1150); X.scale(mix(0.9, 1.15, k), mix(0.9, 1.15, k));
        X.fillStyle = '#2a2420'; X.beginPath(); X.ellipse(0, 230, 320, 60, 0, 0, 7); X.fill(); X.fillStyle = '#3a322c'; X.fillRect(-300, 120, 600, 110); X.fillStyle = '#4a4038'; X.beginPath(); X.ellipse(0, 120, 300, 56, 0, 0, 7); X.fill();
        X.fillStyle = CREAM; X.beginPath(); X.moveTo(-120, -60); X.lineTo(120, -60); X.lineTo(95, 100); X.quadraticCurveTo(0, 130, -95, 100); X.closePath(); X.fill(); X.strokeStyle = CREAM; X.lineWidth = 16; X.beginPath(); X.ellipse(150, 10, 42, 50, 0, -1.4, 1.4); X.stroke();
        X.fillStyle = '#6b4226'; X.beginPath(); X.ellipse(0, -60, 120, 22, 0, 0, 7); X.fill();
        X.strokeStyle = 'rgba(255,255,255,0.45)'; X.lineWidth = 7; X.lineCap = 'round'; for (let i = 0; i < 3; i++) { X.beginPath(); const sx = -50 + i * 50, ph = t * 2 + i; X.moveTo(sx, -90); X.bezierCurveTo(sx + 20 * Math.sin(ph), -140, sx - 20 * Math.sin(ph), -180, sx, -230); X.stroke(); }
        X.restore();
        title(t, s(3), 'ONE SIMPLE MISSION.', 640, 92);
      } else if (t < s(6) - 0.3) { // the café, first time
        const push = lin(t, s(4) - 0.6, s(6)); cafe(t, push);
        mascot(t, 720, 1230, 1.25, { mood: t < s(5) ? 'neutral' : 'worried', wide: t >= s(5), sweat: t >= s(5), talk: speaking(5, t), lookX: -1, seed: 2 });
        counter(t, push);
        HOST.say(t, s(4), s(5) + 0.2, '¿Qué te pongo?', 360, 700, { size: 56, tail: -0.2 }); sub(t, s(4), s(5) + 0.2, 'What can I get you?');
        HOST.say(t, s(5), s(6) - 0.3, 'Un… coffee… por favor?', 660, 860, { size: 52, tail: 0.25 }); sub(t, s(5), s(6) - 0.3, '');
      } else if (t < s(7) - 0.2) { // record scratch: frozen, desaturated, the flame laughs
        cafe(s(6) - 0.31, 1); mascot(s(6) - 0.31, 720, 1230, 1.25, { mood: 'worried', wide: true, sweat: true, lookX: -1, seed: 2 }); counter(s(6) - 0.31, 1);
        grade(0.85); X.fillStyle = 'rgba(0,0,0,0.45)'; X.fillRect(0, 0, W, H);
        const k = back(lin(t, s(6) - 0.2, s(6) + 0.2)); flameGuy(t, 830, 820, 0.85 * k, 'laugh');
        title(t, s(6), '400 DAYS.', 620, 150, { face: CREAM, side: '#555' });
        if (t > (p(6, 2) || s(6) + 1.3)) title(t, p(6, 2) || s(6) + 1.3, 'FOR THAT.', 1500, 150, { face: ORANGE, side: '#7a2a0a' });
      } else if (t < s(9) - 0.1) { // this autumn… he switched apps
        rays(t, W / 2, 200, 0.15); dust(t, 0.3);
        title(t, s(7) - 0.1, 'THIS AUTUMN…', 520, 110, { face: CREAM, side: '#6b5a48' });
        if (t > s(8) - 0.2) { const k = eo(lin(t, s(8) - 0.2, s(8) + 0.4)); X.save(); X.translate(W / 2, mix(1900, 1150, k));
          phone(null, 0, 0, 420, { screen: '#0d0b14', shadow: false, draw: () => { const kk = lin(t, s(8) + 0.1, s(8) + 0.6); flipPlane(0, 0, 260, 260, Math.PI * (1 - eio(kk)), () => { X.fillStyle = '#f6efe2'; rr(10, 10, 240, 240, 54); X.fill(); logo(130, 130, 90); }, () => { X.fillStyle = '#3a3550'; rr(10, 10, 240, 240, 54); X.fill(); txt('?', 130, 140, font('inter', 900, 140), 'rgba(255,255,255,0.4)'); }, { key: 'icon17', persp: 1100, shadow: false }); } });
          X.restore(); if (t > s(8) + 0.3) flare(t, W / 2, 1150, 1 - lin(t, s(8) + 0.3, s(8) + 1.0)); }
        if (t > s(8) + 0.2) title(t, s(8) + 0.2, 'HE SWITCHED APPS.', 760, 100);
      } else if (t < s(10) - 0.15) { // the montage: lessons written one at a time
        rays(t, W / 2, 200, 0.2); dust(t, 0.5);
        const marks = [s(9), p(9, 1) || s(9) + 1.3, p(9, 2) || s(9) + 1.8, p(9, 3) || s(9) + 2.6];
        for (let i = 0; i < 6; i++) { const t0 = s(9) + i * 0.55; if (t < t0) continue; const k = lin(t, t0, t0 + 0.6);
          const x = W / 2 + (i % 2 ? 1 : -1) * mix(700, 180 - i * 12, eo(k)), y = 1080 + (i - 2.5) * 30;
          flipPlane(x, y, 380, 480, (1 - eo(k)) * Math.PI * 0.8 * (i % 2 ? -1 : 1), () => { X.fillStyle = CREAM; rr(10, 10, 360, 460, 30); X.fill(); X.fillStyle = '#c4622d'; rr(10, 10, 360, 18, [30, 30, 0, 0]); X.fill();
            txt('LESSON ' + (i + 1), 190, 80, font('inter', 900, 40), INK); for (let j = 0; j < 4; j++) { X.fillStyle = '#cfc8bb'; rr(40, 140 + j * 60, 300 * [0.9, 0.7, 0.85, 0.6][j], 24, 12); X.fill(); }
            X.fillStyle = '#3aa35b'; X.beginPath(); X.arc(300, 400, 36, 0, 7); X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 9; X.lineCap = 'round'; X.beginPath(); X.moveTo(284, 401); X.lineTo(296, 413); X.lineTo(318, 388); X.stroke(); }, null, { key: 'ml' + i, persp: 1500, shadow: false }); }
        mascot(t, 860, 1560, 0.8, { mood: 'happy', seed: 5, lookY: -1 });
        title(t, marks[0], 'FIFTY LESSONS.', 470, 100);
        if (t > marks[1]) title(t, marks[1], 'WRITTEN FOR HIM.', 600, 80, { face: CREAM, side: '#6b5a48', depth: 10 });
        if (t > marks[3]) title(t, marks[3], 'ONE AT A TIME.', 1600, 90, { face: ORANGE, side: '#7a2a0a' });
      } else if (t < s(11) - 0.9) { // two weeks later
        const n = Math.floor((t - s(10)) * 18); txt('TWO WEEKS LATER'.slice(0, Math.max(0, n)), W / 2, H / 2, font('mono', 700, 72), CREAM, { ls: 8 });
        if (Math.floor(t * 3) % 2 && n < 15) X.fillRect(W / 2 + 290, H / 2 - 36, 30, 72);
      } else if (t < s(13) - 0.1) { // the comeback at the café
        const push = lin(t, s(11) - 0.9, s(13)); cafe(t, push);
        mascot(t, 720, 1230, 1.25, { mood: 'happy', talk: speaking(11, t), lookX: -1, seed: 2, extra: () => { X.fillStyle = '#111'; rr(-90, -86, 80, 44, 14); X.fill(); rr(6, -86, 80, 44, 14); X.fill(); X.fillRect(-14, -74, 24, 8); } });
        counter(t, push);
        flameGuy(t, 960, mix(1500, 1240, eo(lin(t, s(12), s(12) + 0.4))), 0.5, t > s(12) ? 'shock' : 'smug');
        HOST.say(t, s(11), s(12), 'Dos cafés con leche, por favor. Y para mí, uno solo.', 600, 820, { size: 46, maxw: 720, tail: 0.25 }); sub(t, s(11), s(12), 'Two white coffees, please. And an espresso for me.');
        HOST.say(t, s(12), s(13), '¡Marchando!', 360, 700, { size: 60, tail: -0.2 }); sub(t, s(12), s(13), 'Coming right up!');
      } else { // title
        rays(t, W / 2, 260, 0.25); dust(t, 0.6);
        coinIn(t, s(13), W / 2, 700, 150, { glow: 'rgba(233,196,106,0.7)', shadowCol: 'rgba(0,0,0,0)' });
        title(t, s(13), 'BORDERLESS', 1000, 130, { depth: 18, ls: 6 });
        title(t, p(13, 1) || s(13) + 1.1, 'THE COMEBACK', 1150, 80, { face: CREAM, side: '#6b5a48', depth: 8, ls: 10 });
        if (t > END) txt('€9,99 per course · borderlesslearn.com', W / 2, 1290, font('inter', 700, 38), CREAM, { a: eo(lin(t, END, END + 0.4)) });
      }
      X.restore();
      // cut flashes
      CUT.forEach((c) => { if (t >= c && t < c + 0.08 && c > 0) { X.fillStyle = `rgba(255,255,255,${0.5 * (1 - (t - c) / 0.08)})`; X.fillRect(0, 0, W, H); } });
      grain(t, 0.07); const v = X.createRadialGradient(W / 2, H / 2, 400, W / 2, H / 2, 1200); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.5)'); X.fillStyle = v; X.fillRect(0, 0, W, H);
      bars();
    },
  };
})();
