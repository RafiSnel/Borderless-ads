// 08 · "Top 5 easiest languages" — POP STICKERS + FLAT MAP · countdown
window.ready = (async () => {
  await loadFonts(); await loadWorld();
  await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('08');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const YEL = '#ffd84a', TQ = '#2ad1c4', PINK = '#ff5fa2', INK = '#141414', WH = '#ffffff', BLUE = '#4d7cff', ORG = '#ff8a3d';
  const END = e(10) + 0.2, DUR = END + 1.3; window.DURATION = DUR;
  const t1 = p(7, 2) || s(7) + 1.0;
  // map keys: [time, lon, lat, zoom, id, color]
  const KEYS = [[0, 10, 50, 13, 0, PINK], [s(2), 12.5, 42, 42, 380, TQ], [s(3), -3.7, 40, 44, 724, ORG], [s(5), 16, 62, 24, 752, BLUE],
    [s(6), 12, 63, 21, 578, PINK], [t1, 5.5, 52, 42, 528, ORG], [s(9), 10, 52, 13, 0, PINK]];
  const BGC = [[0, YEL], [s(2), TQ], [s(3), ORG], [s(5), BLUE], [s(6), PINK], [s(7), INK], [t1, YEL], [s(9), TQ], [s(10), YEL]];
  const at = (arr, t) => { let r = arr[0]; arr.forEach((a) => { if (t >= a[0]) r = a; }); return r; };
  function mapState(t) {
    let i = 0; KEYS.forEach((k, j) => { if (t >= k[0]) i = j; });
    const a = KEYS[Math.max(0, i - 1)], b = KEYS[i], k = i === 0 ? 1 : eio(lin(t, b[0], b[0] + 0.5));
    return { lon: mix(a[1], b[1], k), lat: mix(a[2], b[2], k), zoom: Math.exp(mix(Math.log(a[3]), Math.log(b[3]), k)), id: b[4], col: b[5], k, t0: b[0] };
  }
  const OUT = (w) => ({ stroke: INK, sw: w });
  function sticker(t, t0, text, x, y, size, bg, fg = INK, rot = 0, opts = {}) {
    if (t < t0) return; const k = back(lin(t, t0, t0 + 0.22), 2.4);
    X.save(); X.translate(x, y); X.rotate(rot + (1 - k) * 0.4); X.scale(k, k);
    X.font = font(opts.f || 'archivo', 400, size); X.letterSpacing = (opts.ls || 0) + 'px'; const w = X.measureText(text).width + size * 0.9, h = size * 1.45;
    X.fillStyle = INK; rr(-w / 2 + 10, -h / 2 + 12, w, h, h * 0.3); X.fill();
    X.fillStyle = WH; rr(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, h * 0.3 + 8); X.fill();
    X.fillStyle = bg; rr(-w / 2, -h / 2, w, h, h * 0.3); X.fill(); X.lineWidth = 6; X.strokeStyle = INK; X.stroke();
    txt(text, 0, size * 0.05, font(opts.f || 'archivo', 400, size), fg, { ls: opts.ls || 0 }); X.restore();
  }
  function bigNum(t, n, t0) {
    if (t < t0) return; const k = elastic(lin(t, t0, t0 + 0.6)); const bob = Math.sin((t - t0) * 5) * 6;
    X.save(); X.translate(160, 250 + bob); X.rotate(-0.08); X.scale(k, k);
    txt(String(n), 10, 14, font('archivo', 400, 300), INK); txt(String(n), 0, 0, font('archivo', 400, 300), WH, OUT(14)); X.restore();
  }
  function mapCard(t) {
    const m = mapState(t);
    X.save(); X.translate(10, 12); X.fillStyle = INK; rr(50, 130, 980, 880, 50); X.fill(); X.restore();
    X.save(); rr(50, 130, 980, 880, 50); X.clip(); X.fillStyle = '#bfe9ff'; X.fillRect(50, 130, 980, 880);
    for (let i = 0; i < 12; i++) { X.strokeStyle = 'rgba(255,255,255,0.5)'; X.lineWidth = 3; X.beginPath(); X.arc(540, 570, 80 + i * 70 + ((t * 30) % 70), 0, 7); X.stroke(); }
    X.translate(0, -390);
    drawWorld({ lon: m.lon, lat: m.lat, zoom: m.zoom, fill: '#fffaf0', stroke: INK, lw: 3 });
    if (m.id) {
      const pk = back(lin(t, m.t0 + 0.35, m.t0 + 0.6), 2.2); const cx = W / 2, cy = H / 2;
      X.save(); X.translate(cx, cy); X.scale(pk, pk); X.translate(-cx, -cy);
      X.save(); X.translate(12, 14); drawWorld({ lon: m.lon, lat: m.lat, zoom: m.zoom, hi: { [m.id]: INK }, only: true }); X.restore();
      drawWorld({ lon: m.lon, lat: m.lat, zoom: m.zoom, hi: { [m.id]: WH }, only: true, stroke: WH, lw: 22 });
      drawWorld({ lon: m.lon, lat: m.lat, zoom: m.zoom, hi: { [m.id]: m.col }, only: true, stroke: INK, lw: 5 });
      X.restore();
    }
    X.restore(); X.lineWidth = 8; X.strokeStyle = INK; rr(50, 130, 980, 880, 50); X.stroke();
  }
  function card(x, y, w, h, bg, k = 1) { X.save(); X.globalAlpha *= k; X.fillStyle = INK; rr(x + 10, y + 12, w, h, 30); X.fill(); X.fillStyle = bg; rr(x, y, w, h, 30); X.fill(); X.lineWidth = 6; X.strokeStyle = INK; X.stroke(); X.restore(); }

  const cues = [['riser', 0.9, 0.5], ['pop', 0.15, 0.8], ['pop', 0.5, 0.8], ['pop', 0.9, 0.7], ['boing', p(1, 3) || 2.9, 0.6],
    ['boom', s(2), 0.9], ['pop', s(2) + 0.4, 0.7], ['pop', p(2, 2) + 0.1, 0.6], ['pop', p(2, 2) + 0.35, 0.6], ['pop', p(2, 2) + 0.6, 0.6], ['correct', p(2, 4) || s(2) + 2.4, 0.6],
    ['boom', s(3), 0.9], ['pop', s(3) + 0.4, 0.7], ['whoosh', p(3, 3), 0.5], ['pop', p(4, 0), 0.8], ['pop', p(4, 1), 0.8], ['pop', p(4, 3), 0.8],
    ['boom', s(5), 0.9], ['pop', s(5) + 0.4, 0.7], ['ding', p(5, 3), 0.6], ['ding', p(5, 4) + 0.1, 0.6], ['ding', p(5, 5), 0.6],
    ['boom', s(6), 0.9], ['pop', s(6) + 0.4, 0.7], ['whoosh', p(6, 3), 0.6], ['click', p(6, 3) + 0.3, 0.6], ['click', p(6, 3) + 0.5, 0.6], ['click', p(6, 3) + 0.7, 0.6],
    ['swell', t1, 0.7], ['boom', t1, 1.3], ['pop', t1 + 0.4, 0.7],
    ['pop', p(8, 3), 0.8], ['pop', p(8, 4), 0.8], ['pop', p(8, 5), 0.8], ['whoosh', s(9), 0.5], ['boing', s(10), 0.7], ['pop', p(10, 2) || s(10) + 1.0, 0.8], ['jingle', END, 0.6]];
  for (let k = 0; k < 24; k++) cues.push(['tick', s(9) + 0.3 + k * 0.07, 0.4]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [s(2), s(3), s(5), s(6), t1, s(10)];

  window.SCENE = {
    frame(t) {
      X.fillStyle = at(BGC, t)[1]; X.fillRect(0, 0, W, H);
      // halftone dots
      X.fillStyle = 'rgba(0,0,0,0.07)'; for (let y = 0; y < H; y += 46) for (let x = (y / 46) % 2 ? 23 : 0; x < W; x += 46) { X.beginPath(); X.arc(x, y, 6, 0, 7); X.fill(); }
      X.save(); camera(t, hits, [s(2), s(3), s(5), s(6), s(9), s(10)], 18);
      const dark = t >= s(7) && t < t1;
      if (!dark && t < s(9)) mapCard(t);
      if (t < s(2)) {
        sticker(t, 0.12, 'TOP 5', W / 2 - 120, 1200, 150, PINK, WH, -0.08);
        sticker(t, 0.5, 'EASIEST', W / 2 + 40, 1420, 150, TQ, INK, 0.05);
        sticker(t, 0.9, 'FOR ENGLISH SPEAKERS', W / 2, 1610, 60, WH, INK, -0.03);
        if (t > (p(1, 3) || 2.9)) sticker(t, p(1, 3) || 2.9, '#1 IS CLOSER THAN YOU THINK', W / 2, 1780, 48, YEL, INK, 0.04);
      } else if (t < s(3)) {
        bigNum(t, 5, s(2)); sticker(t, s(2) + 0.35, 'ITALIAN', 640, 230, 100, WH, INK, 0.05);
        const syl = ['A', 'MO', 'RE']; card(90, 1100, 900, 520, WH, eo(lin(t, s(2) + 0.6, s(2) + 0.8)));
        if (t > s(2) + 0.6) {
          syl.forEach((sy, i) => { const t0 = p(2, 2) + 0.1 + i * 0.25; const on = t > t0; const x = 260 + i * 280;
            const kk = on ? back(lin(t, t0, t0 + 0.2)) : 1; X.save(); X.translate(x, 1300); X.scale(kk, kk); txt(sy, 0, 0, font('archivo', 400, 130), on ? PINK : '#ccc', on ? OUT(8) : {}); X.restore();
            if (i < 2) txt('·', x + 140, 1300, font('archivo', 400, 90), INK); });
          if (t > p(2, 2) + 0.9) { txt('= a-mo-re', W / 2, 1450, font('archivo', 400, 70), INK); }
          if (t > (p(2, 4) || s(2) + 2.4)) sticker(t, p(2, 4) || s(2) + 2.4, 'SPELLED = SAID ✓', W / 2, 1720, 64, YEL, INK, -0.04);
        }
      } else if (t < s(5)) {
        bigNum(t, 4, s(3)); sticker(t, s(3) + 0.35, 'SPANISH', 650, 230, 100, WH, INK, -0.04);
        sticker(t, p(3, 1) || s(3) + 0.6, 'SAME TRICK.', W / 2, 1140, 80, YEL, INK, 0.03);
        if (t > p(3, 3)) txt('WORDS YOU ALREADY KNOW:', W / 2, 1300, font('archivo', 400, 54), INK);
        [['HOSPITAL', p(4, 0), -0.06, 1440, TQ], ['CHOCOLATE', p(4, 1), 0.05, 1590, PINK], ['IDEA', p(4, 3), -0.03, 1740, YEL]].forEach(([w, t0, r, y, c]) => sticker(t, t0, w + ' ✓', W / 2, y, 84, c, INK, r));
      } else if (t < s(6)) {
        bigNum(t, 3, s(5)); sticker(t, s(5) + 0.35, 'SWEDISH', 650, 230, 100, WH, INK, 0.04);
        card(70, 1090, 940, 700, WH, eo(lin(t, s(5) + 0.5, s(5) + 0.7)));
        const rows = [['JAG', 'ÄR', 'I AM'], ['DU', 'ÄR', 'YOU ARE'], ['DE', 'ÄR', 'THEY ARE']];
        if (t > s(5) + 0.6) rows.forEach(([a, b, en], i) => { const y = 1230 + i * 200; const lit = t > p(5, 3 + i) + (i === 1 ? 0.1 : 0);
          txt(a, 140, y, font('archivo', 400, 100), INK, { align: 'left' });
          if (lit) { X.save(); const kk = back(lin(t, p(5, 3 + i), p(5, 3 + i) + 0.2)); X.translate(470, y); X.scale(kk, kk); X.fillStyle = YEL; rr(-110, -70, 220, 140, 30); X.fill(); X.lineWidth = 6; X.strokeStyle = INK; X.stroke(); X.restore(); }
          txt(b, 470, y, font('archivo', 400, 100), INK); txt(en, 960, y, font('archivo', 400, 56), '#777', { align: 'right' }); });
        if (t > p(5, 5) + 0.3) sticker(t, p(5, 5) + 0.3, 'NEVER CHANGES', W / 2, 1850, 54, PINK, WH, -0.03);
      } else if (t < s(7)) {
        bigNum(t, 2, s(6)); sticker(t, s(6) + 0.35, 'NORWEGIAN', 660, 230, 90, WH, INK, -0.04);
        const no = ['JEG', 'LIKER', 'KAFFE'], en = ['I', 'LIKE', 'COFFEE']; const t0 = p(6, 3);
        en.forEach((w, i) => { const x = 210 + i * 330; card(x - 150, 1450, 300, 140, WH); txt(w, x, 1520, font('archivo', 400, 64), INK); });
        no.forEach((w, i) => { const x = 210 + i * 330; const tt = t0 + 0.3 + i * 0.2; const kk = eo(lin(t, tt, tt + 0.25)); if (t < s(6) + 0.6) return;
          const y = mix(1190, 1290, kk); card(x - 150, y - 70, 300, 140, i % 2 ? TQ : YEL); txt(w, x, y, font('archivo', 400, 64), INK);
          if (kk >= 1) txt('↓', x, 1380, font('archivo', 400, 60), INK); });
        if (t > t0 + 1.0) sticker(t, t0 + 1.0, 'SAME ORDER', W / 2, 1740, 70, PINK, WH, 0.03);
      } else if (t < s(8)) {
        if (dark) { txt('AND NUMBER ONE…', W / 2, H / 2, font('archivo', 400, 90), WH); }
        else {
          bigNum(t, 1, t1); sticker(t, t1 + 0.3, 'DUTCH', 600, 230, 120, WH, INK, 0.05);
          confetti(t, t1, W / 2, 600, 60, [PINK, TQ, ORG, BLUE, WH], 1.6);
        }
      } else if (t < s(9)) {
        bigNum(t, 1, -9); sticker(t, -9, 'DUTCH', 600, 230, 120, WH, INK, 0.05);
        sticker(t, s(8) + 0.1, "ENGLISH'S CLOSE COUSIN", W / 2, 1100, 60, PINK, WH, -0.03);
        [['WATER', 'WATER', p(8, 3)], ['WARM', 'WARM', p(8, 4)], ['APPLE', 'APPEL', p(8, 5)]].forEach(([a, b, t0], i) => {
          if (t < t0) return; const kk = eo(lin(t, t0, t0 + 0.25)); const y = 1300 + i * 190;
          card(mix(-500, 80, kk), y - 70, 410, 140, WH); txt(a, mix(-500, 80, kk) + 205, y, font('archivo', 400, 70), INK);
          card(mix(1500, 590, kk), y - 70, 410, 140, YEL); txt(b, mix(1500, 590, kk) + 205, y, font('archivo', 400, 70), INK);
          if (kk >= 1) { txt('=', 540, y, font('archivo', 400, 80), INK); } });
      } else if (t < s(10) - 0.12) {
        const k = eo(lin(t, s(9) + 0.2, s(9) + 1.8)); const v = Math.round(600 * k);
        sticker(t, s(9), 'EACH OF THE 5', W / 2, 260, 70, WH, INK, -0.03);
        txt('≈' + v, W / 2 + 10, 560, font('archivo', 400, 280), INK); txt('≈' + v, W / 2, 545, font('archivo', 400, 280), WH, OUT(14));
        sticker(t, s(9) + 0.4, 'CLASS HOURS', W / 2, 780, 80, PINK, WH, 0.03);
        const tw = p(9, 1) || s(9) + 1.9;
        card(90, 940, 900, 760, WH, eo(lin(t, tw - 0.3, tw)));
        for (let i = 0; i < 24; i++) { const c = i % 6, r = Math.floor(i / 6); const x = 160 + c * 132, y = 1010 + r * 150; const on = t > tw + i * 0.05;
          X.fillStyle = on ? (i % 3 === 0 ? PINK : i % 3 === 1 ? TQ : YEL) : '#eee'; rr(x, y, 110, 120, 18); X.fill(); X.lineWidth = 4; X.strokeStyle = INK; X.stroke();
          if (on) txt(String(i + 1), x + 55, y + 62, font('archivo', 400, 44), INK); }
        if (t > tw + 1.3) sticker(t, tw + 1.3, '24 WEEKS', W / 2, 1610, 90, YEL, INK, -0.04);
      } else {
        const k = elastic(lin(t, s(10) - 0.12, s(10) + 0.7)); X.save(); X.translate(W / 2, 700 + Math.sin(t * 6) * 20); X.rotate(Math.sin(t * 3) * 0.08); X.scale(Math.max(0.4, k), Math.max(0.4, k));
        txt('?', 14, 18, font('archivo', 400, 620), INK); txt('?', 0, 0, font('archivo', 400, 620), PINK, OUT(20)); X.restore();
        sticker(t, s(10) + 0.3, "WHAT'S YOUR", W / 2, 1180, 100, WH, INK, -0.04);
        sticker(t, p(10, 2) || s(10) + 1.0, 'EXCUSE?', W / 2, 1360, 130, TQ, INK, 0.04);
        if (t > END - 0.1) { const kk = back(lin(t, END - 0.1, END + 0.2)); X.save(); X.translate(W / 2, 1620); X.scale(kk, kk); logo(-260, 0, 70); txt('Borderless', 60, 0, font('inter', 900, 100), INK); X.restore(); }
      }
      X.restore();
      txt('Based on US Foreign Service Institute estimates', W / 2, 1890, font('inter', 600, 28), 'rgba(0,0,0,0.55)');
    },
  };
})();
