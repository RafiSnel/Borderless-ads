// La Esquina · Ep. 4 — La Playa
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep04');
  const DUR = EP.dur; window.DURATION = DUR; const M = EP.M; const tk = talk;
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'smug', day: (t > M.blink && t < M.blink + 0.9 && Math.floor(t * 8) % 2) ? 'DAY ????' : 'DAY 1210', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);
  function ring(x, y, s) { X.save(); X.translate(x, y); X.scale(s, s); X.lineWidth = 46; X.strokeStyle = '#ff6f8a'; X.beginPath(); X.ellipse(0, 0, 150, 60, 0, 0, 7); X.stroke(); X.strokeStyle = '#fff'; X.lineWidth = 46; X.setLineDash([60, 90]); X.beginPath(); X.ellipse(0, 0, 150, 60, 0, 0, 7); X.stroke(); X.setLineDash([]); X.restore(); }
  function ember(t, x, y, s, glow = 1) { const g = X.createRadialGradient(x, y, 4, x, y, 160 * s); g.addColorStop(0, `rgba(255,170,60,${0.6 * glow})`); g.addColorStop(1, 'rgba(255,170,60,0)'); X.fillStyle = g; X.fillRect(x - 200, y - 200, 400, 400);
    X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#ff7a1a'; X.beginPath(); X.moveTo(0, -60 + Math.sin(t * 20) * 6); X.quadraticCurveTo(40, -10, 30, 20); X.arc(0, 20, 30, 0, Math.PI); X.quadraticCurveTo(-40, -10, 0, -60 + Math.sin(t * 20) * 6); X.fill();
    X.fillStyle = '#111'; X.fillRect(-24, -6, 18, 10); X.fillRect(6, -6, 18, 10); X.restore(); }
  const cues = [['whoosh', M.beach, 0.4]];
  cues.push(['shimmer' in {} ? 'hum' : 'hum', M.gags + 0.1, 0.4], ['plop', M.gags + 1.5, 0.4], ['flap', Lt('f1') - 0.3, 0.4], ['ding', M.flag + 0.2, 0.4], ['whoosh', M.edge, 0.3], ['shutter', Lt('r4') + 2.6, 0.6],
    ['boom', M.wave + 0.1, 0.9], ['whoosh', M.wave, 0.8], ['gasp', M.panic, 0.5], ['whoosh', M.dive, 0.6], ['plop', M.dive + 0.4, 0.8], ['heart', M.rescue + 1, 0.5], ['heart', M.rescue + 2, 0.5], ['heart', M.rescue + 3, 0.5],
    ['swell', M.shore + 1.2, 0.5], ['pop', M.shore + 2.0, 0.6], ['tick', M.blink + 0.3, 0.6], ['tick', M.blink + 0.9, 0.6], ['coin', M.gift + 0.8, 0.5], ['stamp', M.stamp + 0.55, 1], ['buzz', DUR - 1.6, 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.38 };
  const hits = [M.wave + 0.1, M.dive, DUR - 1.6];
  window.SCENE = { frame(t) {
    X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.save(); camera(t, hits, [], 14);
    if (t < M.beach) { X.save(); cam(540, 1000, 1.05); busInside(t); G(t, 230, 1150, 0.6, { mood: 'happy' }); F(t, 880, 1150, 0.58, { mood: 'neutral' });
      txt('la playa = the beach', 880, 900, font('caveat', 700, 40), '#3a5bd0'); R(t, 540, 1170, 0.8, { point: t > Lt('r1') + 3 }); ring(540, 1300, 0.7); X.restore(); say(t, 'r1', 540, 560, { size: 50 }); }
    else if (t < M.gags) { X.save(); keyCam(t, [[M.beach, 540, 1150, 1.0], [Lt('g1') - 0.2, 420, 1250, 1.5]]); beach(t);
      ['#e23b3b', '#ffd23d', '#2f7fd0'].forEach((c, i) => { X.fillStyle = c; rr(120 + i * 150, 1340, 130, 60, 10); X.fill(); });
      R(t, 180, 1300, 0.55, { lookX: 1 }); G(t, 330, 1290, 0.5, { mood: 'shock', lookX: 1 }); F(t, 470, 1300, 0.48, { lookX: 1 });
      X.fillStyle = '#f6efe2'; rr(790, 1380, 190, 60, 10); X.fill(); P(t, 880, 1320, 0.5, { mood: 'happy', calm: true, seed: 3 }); X.fillStyle = '#e8c48a'; X.beginPath(); X.ellipse(880, 1225, 110, 26, 0, 0, 7); X.fill(); rr(830, 1170, 100, 60, 20); X.fill();
      X.restore(); say(t, 'g1', 330, 760); say(t, 'r2', 200, 760); }
    else if (t < M.flag) { const d = t - M.gags;
      if (d < 1.45) { X.save(); cam(540, 1150, 1.8); beach(t); G(t, 540, 1250, 0.8, { mood: 'happy' }); X.restore(); const k = Math.sin(lin(d, 0, 1.45) * Math.PI); X.fillStyle = `rgba(255,255,255,${0.9 * k})`; X.fillRect(0, 0, W, H); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28 + t; X.strokeStyle = `rgba(160,220,255,${k})`; X.lineWidth = 20; X.beginPath(); X.moveTo(540, 900); X.lineTo(540 + Math.cos(a) * 900, 900 + Math.sin(a) * 900); X.stroke(); } txt('✨', 540, 500, font('inter', 400, 160), '#fff'); }
      else if (d < 2.95) { X.save(); cam(540, 1100, 1.0); beach(t); R(t, 300, 1320, 0.6, { mood: 'neutral', lookX: 1 }); X.strokeStyle = '#fff'; X.lineWidth = 6; X.setLineDash([16, 12]); X.beginPath(); X.moveTo(380, 1360); X.lineTo(820, 1140); X.stroke(); X.setLineDash([]); X.restore(); txt('3.00 m', 600, 1180, font('mono', 700, 60), '#fff', { stroke: INK, sw: 8 }); }
      else { X.save(); cam(540, 1100, 1.9); beach(t); F(t, 540, 1200, 0.9, { mood: t > Lt('f1') ? 'shock' : 'neutral' });
        const drip = lin(t, M.gags + 3.2, M.flag); X.fillStyle = '#3a5bd0'; for (let i = 0; i < 6; i++) { X.globalAlpha = drip; X.fillRect(470 + i * 22, 1080, 8, 40 + drip * (80 + hash(i) * 120)); } X.globalAlpha = 1; X.restore(); say(t, 'f1', 540, 640, { size: 60 }); } }
    else if (t < M.edge) { if (t < Lt('p1') - 0.3) { X.save(); cam(760, 900, 1.9); beach(t, t > M.flag + 0.3); lifeguard(t, 760, 760, 0.55, { mood: 'neutral', talk: tk('lifeguard', t) }); X.restore(); say(t, 'l1', 540, 520, { size: 56, tail: 0.2 }); }
      else { X.save(); cam(380, 1250, 1.5); beach(t, true); R(t, 200, 1300, 0.6, { mood: 'smug', lookX: 1 }); G(t, 360, 1290, 0.55, { lookX: 1 }); F(t, 500, 1300, 0.52, { lookX: 1 }); P(t, 640, 1320, 0.62, { mood: 'neutral', lookX: -1, seed: 3 }); X.restore();
        say(t, 'p1', 640, 720, { size: 52, tail: 0.3 }); say(t, 'r3', 300, 760, { size: 52 }); } }
    else if (t < M.wave) { X.save(); cam(560, 1180, 1.6); beach(t, true); R(t, 560, 1160, 0.7, { mood: 'laugh' }); X.save(); X.translate(680, 1060); X.rotate(-0.3); X.fillStyle = '#111'; rr(-26, -46, 52, 92, 8); X.fill(); X.restore();
      X.fillStyle = 'rgba(255,255,255,0.8)'; X.beginPath(); X.ellipse(590, 1300, 70, 14, 0, 0, 7); X.fill();
      if (t > Lt('r4') + 2.6) { X.fillStyle = `rgba(255,255,255,${1 - lin(t, Lt('r4') + 2.6, Lt('r4') + 2.9)})`; X.fillRect(-500, -500, W + 1000, H + 1000); }
      const wk = lin(t, M.wave - 1.2, M.wave + 0.2); if (wk > 0) { X.fillStyle = '#2a86c8'; X.beginPath(); X.moveTo(-500, H + 500); X.lineTo(-500, mix(1400, 600, wk)); X.quadraticCurveTo(300, mix(1300, 300, wk), mix(1600, 900, wk), mix(1100, 700, wk)); X.lineTo(W + 500, H + 500); X.fill(); }
      X.restore(); say(t, 'r4', 540, 620, { size: 52 }); }
    else if (t < M.panic) { X.save(); cam(540, 960, 1.0 + (t - M.wave) * 0.08); sea(t, 1.6); const dx = mix(540, 760, lin(t, M.wave, M.panic));
      X.fillStyle = '#8a6a40'; X.save(); X.translate(dx, 1000 + Math.sin(t * 3) * 30); X.rotate(Math.sin(t * 2) * 0.2); rr(-120, 0, 240, 34, 16); X.fill(); X.restore();
      ember(t, dx, 960 + Math.sin(t * 3) * 30, 1.2); X.restore(); say(t, 'r5', dx, 700, { size: 48 }); }
    else if (t < M.dive) { X.save(); keyCam(t, [[M.panic, 450, 1250, 1.6], [Lt('p2') - 0.2, 640, 1250, 1.8]]); beach(t, true); G(t, 300, 1270, 0.65, { mood: 'shock', lookX: 1 }); F(t, 470, 1280, 0.6, { mood: 'shock', lookX: 1 });
      const run = lin(t, Le('p2'), M.dive); P(t, mix(660, 900, run), 1300, 0.7, { mood: 'neutral', lookY: t < Lt('p2') + 0.8 ? 1 : 0, walk: run > 0 ? t * 14 : undefined, seed: 3 }, { brows: 'angry' }); X.restore();
      say(t, 'g2', 300, 760, { size: 56 }); say(t, 'f2', 470, 760, { size: 56 }); say(t, 'p2', 640, 720, { size: 54, tail: 0.25 }); }
    else if (t < M.shore) { X.save(); cam(540, 1000, 1.25); sea(t, 1.4); const sx = 600 + Math.sin(t * 1.3) * 20, sy = 1000 + Math.sin(t * 3) * 26;
      ember(t, sx, sy - 40, 0.8, 0.8 + Math.sin(t * 7) * 0.2); const open = eo(lin(t, M.rescue, M.rescue + 0.8));
      X.save(); X.translate(sx, sy - 160); X.fillStyle = '#6e1f2a'; rr(-170, -40, 340, 40, 14); X.fill(); X.restore();
      P(t, sx - 10, sy + 160, 0.75, { mood: 'neutral', armsUp: true, wave: true, lookY: -1, seed: 3 }, { brows: 'angry' });
      X.fillStyle = 'rgba(255,255,255,0.6)'; for (let i = 0; i < 8; i++) { X.beginPath(); X.arc(sx - 200 + hash(i) * 400, sy + 240 + ((t * 80 + i * 30) % 60), 10, 0, 7); X.fill(); } X.restore(); say(t, 'p3', 540, 520, { size: 56 }); }
    else if (t < M.gift) { X.save(); keyCam(t, [[M.shore, 540, 1250, 1.6], [M.blink, 560, 1250, 2.6], [M.blink + 0.9, 500, 1250, 1.5]]); beach(t, true); const grow = eo(lin(t, M.shore + 1.8, M.shore + 2.8));
      for (let i = 0; i < 10; i++) { X.fillStyle = '#fff'; X.beginPath(); X.arc(200 + hash(i) * 700, 1150 + hash(i * 3) * 60, 30, 0, 7); X.fill(); }
      if (grow < 0.05) ember(t, 560, 1340, 0.7, 0.5); else R(t, 560, 1300, mix(0.25, 0.6, grow), { mood: 'neutral', lookX: t > M.blink + 0.9 ? 0.8 : 0 });
      if (t > M.shore + 2.0) for (let i = 0; i < 4; i++) { const k = ((t - M.shore) * 0.8 + i * 0.25) % 1; X.fillStyle = `rgba(160,160,160,${0.5 * (1 - k)})`; X.beginPath(); X.arc(560 + Math.sin(i * 2 + t) * 30, 1180 - k * 260, 24 + k * 40, 0, 7); X.fill(); }
      P(t, 760, 1320, 0.6, { mood: 'neutral', lookX: -1, seed: 3, sweat: true });
      
      X.restore(); say(t, 'r6', 400, 760, { size: 54 }); }
    else if (t < M.stamp) { X.save(); cam(640, 1250, 1.8); beach(t, true); P(t, 760, 1320, 0.6, { mood: 'happy', lookX: -1, seed: 3 }); G(t, 560, 1290, 0.55, { mood: 'happy', lookX: 1, point: true });
      if (t > M.gift + 0.8) { const k = back(lin(t, M.gift + 0.8, M.gift + 1.1), 3); X.save(); X.translate(680, 1230); X.scale(k, k); X.fillStyle = '#ffd23d'; X.beginPath(); X.arc(0, 0, 34, 0, 7); X.fill(); txt('HERO', 0, 4, font('anton', 400, 22), '#7a4a00'); X.restore(); }
      X.restore(); say(t, 'g3', 560, 760, { size: 52 }); }
    else if (t < M.hq) passportShot(t, M.stamp, 2, 2);
    else { const u = 98412233 - Math.pow(lin(t, M.hq + 0.6, DUR), 2) * 2600000; X.save(); cam(540, 700, 1.25); office(t, u, t > DUR - 1.6 ? 1 : 0); X.restore();
      X.save(); X.globalAlpha = 0.9; txt('▼', 900, 300, font('inter', 900, 80), '#ff5050'); X.restore(); }
    X.restore(); titleCard(t, 4, 'La Playa'); letterbox(); fadeEnd(t, DUR, 0.7);
  } };
})();
