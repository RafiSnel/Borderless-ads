// La Esquina · Ep. 2 — Het Hoofdkantoor
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts();
  await epLoad('ep02');
  const DUR = EP.dur; window.DURATION = DUR;
  const M = EP.M;
  const tk = (who, t) => talk(who, t);
  const R = (t, x, y, s, m = {}) => flame(t, x, y, s, { shades: true, noLids: true, mood: 'smug', day: t > 5.0 ? 'DAY 1205' : 'DAY 1204', ...m, talk: tk('racha', t) });
  const G = (t, x, y, s, m = {}) => gem(t, x, y, s, { mood: 'neutral', ...m, talk: tk('gema', t) });
  const F = (t, x, y, s, m = {}) => card(t, x, y, s, { mood: 'neutral', lid: '#fffdf6', ...m, talk: tk('ficha', t) });
  const P = (t, x, y, s, st = {}, fx = {}) => heroX(t, x, y, s, { talk: tk('hero', t), ...st }, fx);

  // ---------- cues ----------
  const cues = [];
  [1.6, 2.6, 3.6].forEach((x) => cues.push(['ding', x, 0.35]));
  cues.push(['buzz', 4.45, 0.5], ['tick', 5.0, 0.6], ['coin', 5.05, 0.5]);
  [0, 1.1, 2.4].forEach((o) => cues.push(['pop', Lt('g1') + o, 0.6], ['coin', Lt('g1') + o + 0.05, 0.4]));
  for (let x = Lt('f1') - 0.6; x < Le('f1'); x += 0.12) cues.push(['type', x, 0.25]);
  cues.push(['whoosh', M.meeting, 0.4], ['type', Lt('g2') + 0.1, 0.3], ['type', Lt('f2') + 0.1, 0.3], ['tick', Lt('r3') + 0.4, 0.6]);
  cues.push(['whoosh', M.window, 0.4], ['swell', M.window + 0.2, 0.4], ['whoosh', M.apt, 0.3], ['bell', M.bakery + 0.1, 0.5]);
  cues.push(['whoosh', M.montage, 0.5], ['page', M.evening + 1.6, 0.4], ['hum', M.night, 0.4]);
  for (let i = 0, x = M.phone + 0.2; x < Lt('r5'); i++, x += Math.max(0.09, 0.5 - i * 0.05)) cues.push(['pop', x, 0.35]);
  cues.push(['impact', Lt('r5') + 0.1, 0.5], ['tick', M.stamp + 1.4, 0.4]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.38 };
  const hits = [M.office, M.meeting, Lt('r5')];

  window.SCENE = {
    frame(t) {
      X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
      X.save(); camera(t, hits, [], 10);
      if (t < 4.4) { // HQ exterior
        X.save(); cam(540, mix(1300, 700, eio(lin(t, 0.8, 4.3))), mix(1.0, 1.25, lin(t, 0.8, 4.3))); hqExterior(t); X.restore();
      } else if (t < M.office) { // split screen morning
        const k = mix(0.5, 0.5, 0);
        split(t, () => { X.save(); apartment(t); X.fillStyle = 'rgba(224,36,36,0.10)'; X.fillRect(0, 0, W, H); X.fillStyle = '#fff'; rr(400, 420, 280, 200, 10); X.fill(); txt("DON'T", 540, 480, font('anton', 400, 54), '#e02424'); txt('BREAK THE', 540, 535, font('anton', 400, 40), '#e02424'); txt('CHAIN', 540, 590, font('anton', 400, 54), '#e02424');
            const up = eo(lin(t, 4.45, 4.75)); R(t, 540, mix(1420, 1180, up), 0.95, { mood: 'smug', point: true }); const flip = t > 5.0;
            txt(flip ? 'DAY 1205 ✓' : 'DAY 1204', 540, 1560, font('anton', 400, 64), '#fff', { stroke: '#e0601c', sw: 10 }); X.restore(); },
          () => { X.save(); apartment(t); planta(t, 860, 1250, 0.7); const wake = t > 5.6; P(t, 420, 1290, 0.8, { mood: wake ? 'neutral' : 'neutral', wink: !wake, lookX: wake ? 0.6 : 0, seed: 2, armsUp: t > 6.4 && t < 7.4, calm: true, tilt: wake ? 0 : -1.4 }); X.restore(); });
        txt('07:00', W * 0.25, 160, font('mono', 700, 64), '#fff', { stroke: INK, sw: 8 }); txt('07:00', W * 0.75, 160, font('mono', 700, 64), '#fff', { stroke: INK, sw: 8 });
        say(t, 'r0', 300, 760, { size: 46, maxw: 480, tail: 0 });
      } else if (t < M.meeting) { // office: badges + cats
        const ficha = t > Lt('f1') - 0.7;
        if (!ficha || t > Lt('f1') + 1.4) { X.save(); keyCam(t, [[M.office, 540, 1000, 1.0], [Lt('f1') + 1.4, 760, 1100, 2.0]]); office(t, 98412233 + (t - M.office) * 37);
            // coffee machine + chair that get badges
            X.fillStyle = '#3a3a3a'; rr(80, 860, 160, 250, 16); X.fill(); X.fillStyle = '#c0392b'; X.beginPath(); X.arc(160, 930, 20, 0, 7); X.fill();
            X.fillStyle = '#2f2f2f'; rr(330, 1180, 150, 30, 10); X.fill(); X.fillRect(395, 1210, 20, 110); rr(340, 1050, 130, 140, 20); X.fill();
            const b = (i) => t > Lt('g1') + [0, 1.1, 2.4][i]; [[160, 1000], [700, 1140], [405, 1120]].forEach(([x, y], i) => { if (b(i)) { const s = back(lin(t, Lt('g1') + [0, 1.1, 2.4][i], Lt('g1') + [0, 1.1, 2.4][i] + 0.2), 3); X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = '#ffd23d'; X.beginPath(); X.arc(0, 0, 34, 0, 7); X.fill(); txt('★', 0, 2, font('inter', 900, 40), '#b5841a'); X.restore(); } });
            const gx = t < Lt('g1') + 1.1 ? 250 : t < Lt('g1') + 2.4 ? 600 : 470; G(t, gx, 1150, 0.7, { mood: 'laugh', point: true });
            F(t, 820, 1150, 0.6, { mood: t > Le('f1') ? 'smug' : 'neutral' }); X.restore();
            say(t, 'g1', 540, 640, { size: 52, maxw: 860 }); say(t, 'f1', 640, 760, { size: 50, tail: 0.3 }); }
        else { // Ficha's screen
          X.fillStyle = '#1f2a44'; X.fillRect(0, 0, W, H); X.fillStyle = '#f6efe2'; rr(90, 260, 900, 1200, 30); X.fill();
          const cards = ['el gato = the cat', 'la gata = the cat (girl)', 'el gatito = the cat (small)', 'los gatos = the cats', 'el gatazo = the cat (big)'];
          cards.forEach((c, i) => { const ct = Lt('f1') - 0.7 + i * 0.25; if (t < ct) return; const k = back(lin(t, ct, ct + 0.18), 2.5); X.save(); X.translate(540, 400 + i * 200); X.scale(k, k); X.fillStyle = '#fff'; rr(-380, -70, 760, 140, 18); X.fill(); X.strokeStyle = '#e04848'; X.lineWidth = 4; X.beginPath(); X.moveTo(-380, -40); X.lineTo(380, -40); X.stroke(); txt(c, 0, 14, font('caveat', 700, 60), '#3a5bd0'); X.restore(); });
          txt('CATS TODAY: ' + (290 + Math.min(10, Math.floor((t - Lt('f1') + 0.7) * 6))), 540, 1560, font('mono', 700, 50), '#7dffb0');
          say(t, 'f1', 540, 1700, { size: 50 }); }
      } else if (t < M.window) { // the streak meeting
        const who = [['r1', 'r'], ['g2', 'g'], ['r2', 'r'], ['f2', 'f'], ['r3', 'r']]; let cur = 'w'; who.forEach(([id, w]) => { if (t >= Lt(id) - 0.15) cur = w; });
        const shotK = { w: [540, 900, 1.0], r: [380, 1000, 1.45], g: [600, 1060, 1.5], f: [760, 1060, 1.5] }[t < Lt('r1') + 0.8 ? 'w' : cur];
        X.save(); cam(...shotK); meetingRoom(t);
        // whiteboard lines appear as they are said
        [['g2', '"Your streak misses you."', 'WEAK'], ['f2', '"We noticed you\'re gone. Again."', '✓ MORE GUILT']].forEach(([id, s, mark], i) => { if (t < Lt(id) + 0.2) return; txt(typed(t, Lt(id) + 0.2, s, 26), 540, 470 + i * 140, font('caveat', 700, 46), '#1f2a44');
          const mt = i ? Lt('r3') + 0.4 : Lt('r2'); if (t > mt) { if (i) { txt(mark, 780, 560 + 70, font('anton', 400, 46), '#3aa35b'); } else { X.strokeStyle = '#e02424'; X.lineWidth = 8; X.beginPath(); X.moveTo(200, 470); X.lineTo(880, 470); X.stroke(); } } });
        R(t, 280, 1180, 0.8, { mood: 'smug', point: t > Lt('r1') && t < Le('r1') }); G(t, 560, 1290, 0.62, { mood: t > Lt('r2') && t < Lt('f2') ? 'shock' : 'neutral', lookX: -1 }); F(t, 820, 1290, 0.6, { mood: t > Le('r3') ? 'smug' : 'neutral', lookX: -1 }); X.restore();
        const sp = { r1: [330, 900], g2: [560, 1000], r2: [330, 900], f2: [700, 1000], r3: [330, 900] }; Object.keys(sp).forEach((id) => { if (cur === 'w' || true) say(t, id, 540, 1640, { size: 52, tail: id[0] === 'r' ? -0.35 : 0.25 }); });
      } else if (t < M.apt) { // Racha at the window; the two whisper
        const whisper = t > Lt('g3') - 0.4;
        if (!whisper) { X.fillStyle = '#9fc3e8'; X.fillRect(0, 0, W, H); X.save(); cam(540, 900, 1.3 + (t - M.window) * 0.05); X.fillStyle = '#c9d6e3'; for (let i = 0; i < 6; i++) X.fillRect(-100 + i * 220, 600 - hash(i) * 200, 180, 1200);
            // reflection: the bar scene, ghostly
            X.save(); X.globalAlpha = 0.35 + 0.1 * Math.sin(t * 6); bar(t); hero(t, 540, 1150, 0.9, { acc: ['shades', 'headband'], wink: true, mood: 'happy' }); X.restore();
            X.strokeStyle = '#5b7a99'; X.lineWidth = 30; X.strokeRect(60, 200, 960, 1500); X.restore();
            X.save(); X.translate(200, 1500); R(t, 0, 0, 1.4, { mood: 'neutral', lookX: 1, lookY: -0.6 }); X.restore();
            if (t > Lt('r4') + 0.6) { const tw = Math.sin(t * 40) > 0.6; if (tw) { X.strokeStyle = INK; X.lineWidth = 6; X.beginPath(); X.moveTo(240, 1430); X.lineTo(270, 1420); X.stroke(); } }
            say(t, 'r4', 560, 1150, { size: 50, tail: -0.4 }); }
        else { X.save(); cam(560, 1080, 1.7); office(t, 98412233 + (t - M.office) * 37); G(t, 450, 1200, 0.8, { mood: 'neutral', lookX: 1 }); F(t, 700, 1210, 0.75, { mood: 'neutral', lookX: -1 }); X.restore();
          say(t, 'g3', 380, 760, { size: 50 }); say(t, 'f3', 640, 800, { size: 48, tail: 0.3 }); }
      } else if (t < M.bakery) { // apartment: watering Planta
        X.save(); keyCam(t, [[M.apt, 540, 1000, 1.0], [Lt('p1') + 2.5, 640, 1150, 1.6]]); apartment(t); planta(t, 800, 1200, 0.85);
        P(t, 470, 1280, 0.85, { mood: 'happy', lookX: 1, seed: 2 });
        // watering can
        X.save(); X.translate(640, 1080); X.rotate(-0.5 - Math.sin(t * 3) * 0.05); X.fillStyle = '#4a7ad0'; rr(-60, -40, 120, 80, 16); X.fill(); X.fillRect(50, -20, 90, 14); X.restore();
        for (let i = 0; i < 6; i++) { const k = ((t * 2 + i / 6) % 1); X.fillStyle = '#8fd0f0'; X.beginPath(); X.arc(745 + k * 20, 1050 + k * 140, 6, 0, 7); X.fill(); }
        X.restore(); say(t, 'p1', 540, 700, { size: 52, maxw: 900 });
      } else if (t < M.montage) { // bakery
        X.save(); keyCam(t, [[M.bakery, 540, 1050, 1.0], [Lt('b1'), 760, 1000, 1.7], [Lt('p3') - 0.2, 360, 1150, 1.8]]); bakery(t);
        baker(t, 760, 1000, 0.85, { mood: 'laugh', talk: tk('baker', t), t });
        const loaves = t > Lt('p3') + 0.3 ? 3 : 0; P(t, 330, 1300, 0.85, { mood: t > Lt('b1') + 1 ? 'worried' : 'neutral', wide: t > Lt('b1') + 0.6, sweat: t > Lt('b1') + 1.5, lookX: 1, seed: 2 });
        for (let i = 0; i < loaves; i++) { X.save(); X.translate(260 + i * 50, 1260 - i * 30); X.rotate(-0.9 + i * 0.2); X.fillStyle = '#d9a441'; rr(-22, -120, 44, 240, 22); X.fill(); X.restore(); }
        X.restore(); say(t, 'p2', 360, 760, { size: 56 }); say(t, 'b1', 540, 560, { size: 50, maxw: 900, tail: 0.25 }); say(t, 'p3', 360, 760, { size: 56 });
      } else if (t < M.evening) { // split montage: his loud day vs. his quiet day
        const k = 0.5 + Math.sin((t - M.montage) * 1.2) * 0.08;
        split(t, () => { X.save(); office(t, 98412233 + (t - M.office) * 37); R(t, 540, 1180, 0.8, { mood: 'laugh', point: true }); for (let i = 0; i < 8; i++) { const kk = ((t * 1.4 + i / 8) % 1); X.fillStyle = '#ffd23d'; X.beginPath(); X.arc(200 + hash(i) * 700, 1300 - kk * 900, 26, 0, 7); X.fill(); } X.restore(); },
          () => { X.save(); park(t); P(t, 540, 1220, 0.75, { mood: 'neutral', acc: ['phone'], phoneGlow: '#ffe7b0', lookX: -0.8, lookY: 0.5, calm: true, seed: 3 }); X.save(); X.translate(700, 1260); X.rotate(-0.4); X.fillStyle = '#d9a441'; rr(-20, -100, 40, 200, 20); X.fill(); X.restore(); X.restore(); }, k);
      } else if (t < M.night) { // evening, the torn page
        if (t < M.evening + 1.6) { X.save(); cam(500, 1200, 1.3); apartment(t, 1); planta(t, 820, 1250, 0.7); P(t, 470, 1300, 0.85, { mood: 'neutral', lookY: 1, calm: true, seed: 4 }); X.restore(); }
        else { passportShot(t, M.evening + 1.6, 1, null); const k = lin(t, M.evening + 2.6, M.night - 0.4); if (k > 0 && k < 1) { X.fillStyle = '#6e1f2a'; X.beginPath(); X.ellipse(70 + 0, mix(400, 1500, k), 60, 90, 0.2, 0, 7); X.fill(); } }
      } else if (t < M.phone) { X.fillStyle = '#0a0d18'; X.fillRect(0, 0, W, H); office(t, 98412233); X.fillStyle = 'rgba(5,8,20,0.82)'; X.fillRect(0, 0, W, H); R(t, 540, 1250, 0.9, { mood: 'neutral', lookY: 1 });
        const g = X.createRadialGradient(540, 1150, 10, 540, 1150, 400); g.addColorStop(0, 'rgba(160,200,255,0.4)'); g.addColorStop(1, 'rgba(160,200,255,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
      } else if (t < M.stamp) { // the phone
        if (t < Lt('r5') - 0.15) { X.fillStyle = '#0a0d18'; X.fillRect(0, 0, W, H);
          phoneUI(t, W / 2, 960, 720, (w, h) => { X.fillStyle = '#000'; X.fillRect(-w, -h, 2 * w, 2 * h); X.save(); X.translate(-W / 2, -760); X.scale(1, 1); bar(t); hero(t, 540, 1150, 0.9, { acc: ['shades', 'headband'], wink: Math.floor(t * 2) % 2 === 0, mood: 'happy' }); X.restore();
            X.fillStyle = 'rgba(0,0,0,0.6)'; X.fillRect(-w / 2, h / 2 - 330, w, 330); X.textAlign = 'left'; X.font = font('inter', 800, 40); X.fillStyle = '#fff'; X.fillText('Passport orders for', -w / 2 + 40, h / 2 - 240); X.fillText('the whole bar 😂', -w / 2 + 40, h / 2 - 190);
            const v = 2.3 + Math.pow(lin(t, M.phone, Lt('r5')), 2) * 1.9; X.font = font('mono', 700, 44); X.fillStyle = '#ffd27a'; X.fillText('👁 ' + v.toFixed(1) + 'M views', -w / 2 + 40, h / 2 - 110); X.textAlign = 'center'; }); }
        else { X.save(); cam(540, 1150, 2.2); office(t, 98412233); X.fillStyle = 'rgba(5,8,20,0.8)'; X.fillRect(-500, -500, W + 1000, H + 1000); const pk = lin(t, Lt('r5') + 0.2, Lt('r5') + 0.9);
          X.save(); X.filter = 'none'; R(t, 540, 1220, 0.9, { mood: 'neutral', lookY: 0.4 }); X.globalCompositeOperation = 'hue'; X.fillStyle = `rgba(140,60,220,${pk})`; X.beginPath(); X.arc(540, 1100, 220, 0, 7); X.fill(); X.restore(); X.restore();
          say(t, 'r5', 400, 700, { size: 64 }); }
      } else { passportShot(t, M.stamp, 1, null, { empty: true }); }
      X.restore();
      titleCard(t, 2, 'Het Hoofdkantoor');
      letterbox(); fadeEnd(t, DUR, 0.8);
    },
  };
})();
