// 11a · "Guess the language — READ" — ARCADE GAMESHOW
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'arcade.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await loadWorld();
  const L = await loadTimeline('11a');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const END = e(9) + 0.2, DUR = END + 1.4; window.DURATION = DUR;
  const R = [['Tack så mycket', 'SWEDISH', 752, 16, 62, 9], ['Dziękuję', 'POLISH', 616, 19, 52, 22], ['Teşekkürler', 'TURKISH', 792, 35, 39, 11],
    ['Kiitos', 'FINNISH', 246, 26, 64, 10], ['Ευχαριστώ', 'GREEK', 300, 22, 39, 22], ['Asante sana', 'SWAHILI', 834, 35, -6, 15]];
  const rounds = R.map((r, i) => ({ word: r[0], name: r[1], id: r[2], lon: r[3], lat: r[4], z: r[5], show: e(i + 1) + 0.15, ans: s(i + 2) }));
  const cues = [['jingle', 0.05, 0.8], ['coin', 1.0, 0.5]];
  rounds.forEach((r) => { cues.push(['pop', r.show, 0.7]); for (let x = r.show + 0.3; x < r.ans - 0.1; x += 0.5) cues.push(['tick', x, 0.6]); cues.push(['correct', r.ans, 0.7], ['coin', r.ans + 0.25, 0.6]); });
  cues.push(['whoosh', s(8), 0.6], ['jingle', p(8, 1) || s(8) + 0.8, 0.8], ['fanfare', s(9), 0.8], ['coin', END, 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = rounds.map((r) => r.ans).concat([s(8), s(9)]);

  window.SCENE = {
    frame(t) {
      ARC.bg(t);
      X.save(); camera(t, hits, [], 14);
      { const PB = []; rounds.forEach((r) => { const d = (r.ans - r.show - 0.2) / 3; PB.push(r.show, r.show + 0.2 + d, r.show + 0.2 + 2 * d); }); const pz = HOST.punch(t, PB, 0.04, 0.16); X.translate(W / 2, H / 2); X.scale(pz, pz); X.translate(-W / 2, -H / 2); }
      let ri = -1; rounds.forEach((r, i) => { if (t >= r.show - 0.15) ri = i; }); if (t >= s(8)) ri = 6;
      const score = rounds.filter((r) => t >= r.ans + 0.25).length; const last = rounds.filter((r) => t >= r.ans + 0.25).map((r) => r.ans + 0.25).pop();
      ARC.title(t, t < s(8) ? 'READING ROUND' : null);
      ARC.score(t, score, last ?? null);
      ARC.panel(t);
      if (ri < 0) {
        const k = back(lin(t, 0.2, 0.5)); X.save(); X.translate(W / 2, 760); X.scale(k, k); txt('3 SECONDS', 0, 0, ARC.px(64), ARC.YEL, { stroke: '#000', sw: 10 }); X.restore();
        if (t > p(1, 2) || t > 2.4) txt('COUNT YOUR POINTS', W / 2, 920, ARC.px(36), ARC.WH);
        txt('INSERT COIN', W / 2, 1050, ARC.px(28), ARC.MAG, { a: Math.floor(t * 3) % 2 });
      } else if (ri < 6) {
        const r = rounds[ri]; ARC.round(ri + 1, 6);
        if (t < r.ans) {
          const k = back(lin(t, r.show, r.show + 0.25), 2.5); X.save(); X.translate(W / 2, 840); X.scale(k, k);
          X.font = font('inter', 900, 140); const w = X.measureText(r.word).width; const sz = Math.min(140, 140 * 820 / w);
          txt(r.word, 0, 0, font('inter', 900, sz), ARC.WH, { stroke: '#000', sw: 10 }); X.restore();
          txt('"' + '?' + '"', W / 2, 640, ARC.px(30), ARC.CYA, { a: 0.6 });
          ARC.timer(t, r.show + 0.2, r.ans);
        } else {
          ARC.country(t, r.ans, r.id, r.lon, r.lat, r.z, r.name);
          txt(r.word, W / 2, 1230, font('inter', 900, 60), ARC.WH, { a: 0.7 });
        }
      } else if (t < s(9)) {
        // plot twist: all six words in a grid → THANK YOU
        rounds.forEach((r, i) => { const t0 = s(8) + i * 0.08; if (t < t0) return; const kk = back(lin(t, t0, t0 + 0.2)); const x = 300 + (i % 2) * 480, y = 640 + Math.floor(i / 2) * 120;
          X.save(); X.translate(x, y); X.scale(kk, kk); txt(r.word, 0, 0, font('inter', 900, 50), ARC.WH); X.restore(); });
        const tt = p(8, 1) || s(8) + 0.8;
        if (t > tt) { const kk = back(lin(t, tt, tt + 0.3), 2.5); X.save(); X.translate(W / 2, 1040); X.scale(kk, kk); txt('= THANK YOU', 0, 0, ARC.px(64), ARC.GRN, { stroke: '#000', sw: 10 }); X.restore(); }
        txt('PLOT TWIST', W / 2, 1230, ARC.px(40), ARC.MAG, { a: Math.floor(t * 4) % 2 ? 1 : 0.4 });
      } else {
        txt('HIGH SCORES', W / 2, 640, ARC.px(48), ARC.YEL);
        [['1.', 'YOU', '?/6', ARC.GRN], ['2.', 'MUM', '2/6', ARC.WH], ['3.', 'CAT', '0/6', ARC.WH]].forEach(([n, who, sc, c], i) => {
          const y = 780 + i * 110; txt(n, 160, y, ARC.px(44), c, { align: 'left' }); txt(who, 300, y, ARC.px(44), c, { align: 'left' });
          txt(sc, 920, y, ARC.px(44), c, { align: 'right', a: i === 0 && Math.floor(t * 3) % 2 ? 0.3 : 1 }); });
        txt('COMMENT YOUR SCORE', W / 2, 1100, ARC.px(34), ARC.MAG);
      }
      // quizmaster
      { const R2 = ['Point!', 'Nice!', 'Too easy?', 'Kiitos!', 'Yes!', 'Asante!'];
        let txt0 = null, t0 = 0, st = { mood: 'happy', acc: ['bowtie', 'mic'] };
        if (ri < 0) { st.wave = true; if (t < p(1, 1)) { txt0 = "I'm your quizmaster."; t0 = 0.2; } else if (t < p(1, 3)) { txt0 = 'Three seconds each.'; t0 = p(1, 1); } else { txt0 = 'Count your points!'; t0 = p(1, 3); st.armsUp = true; } }
        else if (ri < 6) { const r = rounds[ri];
          if (t < r.ans) { const k = Math.min(2, Math.floor((t - r.show - 0.2) / ((r.ans - r.show - 0.2) / 3))); if (t >= r.show + 0.2) { txt0 = ['3…', '2…', '1…'][Math.max(0, k)]; t0 = r.show + 0.2 + Math.max(0, k) * (r.ans - r.show - 0.2) / 3; }
            st = { mood: k >= 1 ? 'worried' : 'neutral', wide: k >= 2, sweat: k >= 2, lookX: -0.6, lookY: -1, acc: ['bowtie', 'mic'] }; }
          else { txt0 = R2[ri]; t0 = r.ans; st = { mood: 'happy', armsUp: true, acc: ['bowtie', 'mic'], squash: Math.max(0, 1 - (t - r.ans) * 5) }; } }
        else if (t < s(9)) { const tt = p(8, 1) || s(8) + 0.8; if (t < tt) { txt0 = 'Plot twist…'; t0 = s(8); } else { txt0 = 'All six = THANK YOU!'; t0 = tt; } st = { mood: 'o', wide: true, acc: ['bowtie', 'mic'], armsUp: t > tt }; }
        else { const tt = p(9, 1) || s(9) + 1.2; if (t < tt) { txt0 = 'Six out of six?'; t0 = s(9); } else { txt0 = 'Comment it!'; t0 = tt; } st = { mood: 'happy', armsUp: true, wave: true, acc: ['bowtie', 'mic'] }; }
        const ein = HOST.enter(t, 0.0, 0.35); X.save(); X.translate(mix(-420, 0, ein), 0);
        const gl = X.createRadialGradient(230, 1440, 20, 230, 1440, 320); gl.addColorStop(0, 'rgba(255,225,77,0.30)'); gl.addColorStop(1, 'rgba(255,225,77,0)'); X.fillStyle = gl; X.fillRect(-100, 1100, 700, 700);
        HOST.draw(t, 235, 1440, 1.0, st); X.restore(); ARC.podium();
        if (txt0) HOST.say(t, t0, 1e9, txt0, 690, 1330, { size: 46, maxw: 700, tail: -0.42, f: 'pixel', fg: '#1a0b2e' }); }
      X.restore();
    },
  };
})();
