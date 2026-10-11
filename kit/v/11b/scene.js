// 11b · "Guess the language — LISTEN" — ARCADE GAMESHOW (audio round)
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'arcade.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await loadWorld();
  const L = await loadTimeline('11b');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const END = e(15) + 0.2, DUR = END + 1.4; window.DURATION = DUR;
  const R = [['Obrigado', 'PORTUGUESE', 620, -8, 39.6, 30], ['Grazie mille', 'ITALIAN', 380, 12.5, 42, 20], ['Danke schön', 'GERMAN', 276, 10.4, 51, 24],
    ['ありがとうございます', 'JAPANESE', 392, 137, 37, 15], ['Merci beaucoup', 'FRENCH', 250, 2.5, 46.5, 22], ['Muchas gracias', 'SPANISH', 724, -3.7, 40, 22]];
  const rounds = R.map((r, i) => ({ word: r[0], name: r[1], id: r[2], lon: r[3], lat: r[4], z: r[5], c0: s(2 + i * 2), c1: e(2 + i * 2), ans: s(3 + i * 2) }));
  const cues = [['jingle', 0.05, 0.8], ['scratch', p(1, 1) || 0.9, 0.4]];
  rounds.forEach((r) => { cues.push(['click', r.c0 - 0.25, 0.6]); for (let x = r.c1 + 0.3; x < r.ans - 0.1; x += 0.5) cues.push(['tick', x, 0.6]); cues.push(['correct', r.ans, 0.7], ['coin', r.ans + 0.25, 0.6]); });
  cues.push(['wahwah', p(14, 2) || s(14) + 1.9, 0.7], ['fanfare', s(15), 0.8], ['coin', END, 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const hits = rounds.map((r) => r.ans).concat([s(14), s(15)]);
  function speaker(t, on) {
    X.save(); X.translate(250, 840);
    X.fillStyle = ARC.WH; X.fillRect(-60, -45, 50, 90); X.beginPath(); X.moveTo(-10, -45); X.lineTo(60, -110); X.lineTo(60, 110); X.lineTo(-10, 45); X.fill();
    if (on) for (let i = 1; i <= 3; i++) { X.strokeStyle = ARC.CYA; X.lineWidth = 12; X.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 9 - i)); X.beginPath(); X.arc(60, 0, 40 + i * 35, -0.7, 0.7); X.stroke(); }
    X.restore();
  }
  function wave(t, on, a = 1) {
    for (let i = 0; i < 26; i++) { const amp = on ? (0.25 + 0.75 * Math.abs(Math.sin(t * 13 + i * 0.9) * Math.sin(t * 5 + i * 0.37))) : 0.06;
      const h = 260 * amp; X.fillStyle = i % 2 ? ARC.MAG : ARC.CYA; X.globalAlpha = a; X.fillRect(450 + i * 20, 840 - h / 2, 12, h); X.globalAlpha = 1; }
  }
  window.SCENE = {
    frame(t) {
      ARC.bg(t);
      X.save(); camera(t, hits, [], 14);
      { const PB = []; rounds.forEach((r) => { const d = (r.ans - r.c1 - 0.1) / 3; PB.push(r.c0, r.c1 + 0.1, r.c1 + 0.1 + d, r.c1 + 0.1 + 2 * d); }); const pz = HOST.punch(t, PB, 0.04, 0.16); X.translate(W / 2, H / 2); X.scale(pz, pz); X.translate(-W / 2, -H / 2); }
      let ri = -1; rounds.forEach((r, i) => { if (t >= r.c0 - 0.35) ri = i; }); if (t >= s(14)) ri = 6;
      const done = rounds.filter((r) => t >= r.ans + 0.25); const score = done.length; const last = done.length ? done[done.length - 1].ans + 0.25 : null;
      ARC.title(t, t < s(14) ? 'LISTENING ROUND' : null);
      ARC.score(t, score, last);
      ARC.panel(t);
      if (ri < 0) {
        // eyes crossed out, ear on
        const k = back(lin(t, 0.3, 0.55)); X.save(); X.translate(W / 2 - 200, 820); X.scale(k, k);
        X.strokeStyle = ARC.WH; X.lineWidth = 14; X.beginPath(); X.ellipse(0, 0, 120, 70, 0, 0, 7); X.stroke(); X.fillStyle = ARC.WH; X.beginPath(); X.arc(0, 0, 34, 0, 7); X.fill();
        if (t > (p(1, 1) || 0.9)) { X.strokeStyle = ARC.RED; X.lineWidth = 22; X.beginPath(); X.moveTo(-140, -110); X.lineTo(140, 110); X.stroke(); }
        X.restore();
        if (t > (p(1, 2) || 1.5)) { const k2 = back(lin(t, p(1, 2) || 1.5, (p(1, 2) || 1.5) + 0.25)); X.save(); X.translate(W / 2 + 220, 820); X.scale(k2, k2); txt('👂', 0, 0, font('inter', 400, 220), '#fff'); X.restore(); }
        txt('NO TEXT. ONLY SOUND.', W / 2, 1060, ARC.px(30), ARC.YEL);
      } else if (ri < 6) {
        const r = rounds[ri]; ARC.round(ri + 1, 6);
        if (t < r.ans) { const on = t >= r.c0 && t <= r.c1 + 0.05; speaker(t, on); wave(t, on);
          txt(on ? 'LISTEN…' : t < r.c0 ? 'GET READY' : 'WHICH LANGUAGE?', W / 2, 640, ARC.px(32), on ? ARC.GRN : ARC.CYA, { a: Math.floor(t * 4) % 2 || on ? 1 : 0.5 });
          if (t > r.c1) ARC.timer(t, r.c1 + 0.1, r.ans); }
        else { ARC.country(t, r.ans, r.id, r.lon, r.lat, r.z, r.name); txt('"' + r.word + '"', W / 2, 1230, font('inter', 900, 56), ARC.WH, { a: 0.75 }); }
      } else if (t < s(15)) {
        txt('WAS IT…', W / 2, 650, ARC.px(44), ARC.WH);
        const t1 = p(14, 1) || s(14) + 0.75, t2 = p(14, 2) || s(14) + 1.9;
        if (t > t1) { X.fillStyle = ARC.CYA; X.fillRect(140, 760, 360, 140); txt('THE', 320, 805, ARC.px(30), '#000'); txt('LANGUAGE', 320, 855, ARC.px(30), '#000'); }
        if (t > t2) { const k = back(lin(t, t2, t2 + 0.25), 3); X.save(); X.translate(760, 830); X.scale(k, k); X.fillStyle = ARC.MAG; X.fillRect(-180, -70, 360, 140); txt('MY', 0, -25, ARC.px(30), '#000'); txt('ACCENT', 0, 25, ARC.px(30), '#000'); X.restore();
          X.save(); X.translate(760, 990); X.rotate(-0.1); txt('◄ PROBABLY', 0, 0, ARC.px(30), ARC.YEL, { a: Math.floor(t * 4) % 2 ? 1 : 0.4 }); X.restore(); }
        txt('BE HONEST', W / 2, 1080, ARC.px(30), ARC.WH, { a: 0.6 });
      } else {
        txt('YOUR SCORE?', W / 2, 700, ARC.px(56), ARC.YEL);
        txt('?/6', W / 2, 870, ARC.px(120), ARC.GRN, { a: Math.floor(t * 3) % 2 ? 1 : 0.35 });
        txt('COMMENT IT', W / 2, 1060, ARC.px(38), ARC.MAG);
      }
      // quizmaster
      { const R2 = ['Obrigado!', 'Grazie!', 'Danke!', 'Arigatou!', 'Merci!', '¡Gracias!'];
        let txt0 = null, t0 = 0, st = { mood: 'happy', acc: ['bowtie', 'mic'] };
        if (ri < 0) { st.wave = true; if (t < (p(1, 1) || 0.9)) { txt0 = 'Same game…'; t0 = 0.2; } else { txt0 = 'Ears only!'; t0 = p(1, 1) || 0.9; st = { mood: 'happy', acc: ['bowtie', 'mic'], wink: true }; } }
        else if (ri < 6) { const r = rounds[ri];
          if (t < r.c1 + 0.1) { txt0 = 'Listen…'; t0 = r.c0 - 0.3; st = { mood: 'o', lookX: -1, lookY: -1, acc: ['bowtie', 'mic'] }; }
          else if (t < r.ans) { const d = (r.ans - r.c1 - 0.1) / 3; const k = Math.min(2, Math.floor((t - r.c1 - 0.1) / d)); txt0 = ['3…', '2…', '1…'][k]; t0 = r.c1 + 0.1 + k * d;
            st = { mood: k >= 1 ? 'worried' : 'neutral', wide: k >= 2, sweat: k >= 2, lookY: -1, acc: ['bowtie', 'mic'] }; }
          else { txt0 = R2[ri]; t0 = r.ans; st = { mood: 'happy', armsUp: true, acc: ['bowtie', 'mic'] }; } }
        else if (t < s(15)) { const tt = p(14, 2) || s(14) + 1.9; if (t < tt) { txt0 = 'My accent? Never.'; t0 = s(14); st = { mood: 'neutral', acc: ['bowtie', 'mic'], lookX: 1 }; } else { txt0 = 'OK… maybe.'; t0 = tt; st = { mood: 'worried', sweat: true, acc: ['bowtie', 'mic'] }; } }
        else { txt0 = 'Comment your score!'; t0 = s(15); st = { mood: 'happy', armsUp: true, wave: true, acc: ['bowtie', 'mic'] }; }
        st.squash = Math.max(0, 1 - (t - t0) * 4) * 0.8;
        const ein = HOST.enter(t, 0.0, 0.35); X.save(); X.translate(mix(-420, 0, ein), 0);
        const gl = X.createRadialGradient(230, 1440, 20, 230, 1440, 320); gl.addColorStop(0, 'rgba(255,225,77,0.30)'); gl.addColorStop(1, 'rgba(255,225,77,0)'); X.fillStyle = gl; X.fillRect(-100, 1100, 700, 700);
        HOST.draw(t, 235, 1440, 1.0, st); X.restore(); ARC.podium();
        if (txt0) HOST.say(t, t0, 1e9, txt0, 690, 1330, { size: 46, maxw: 700, tail: -0.42, f: 'pixel', fg: '#1a0b2e' }); }
      X.restore();
    },
  };
})();
