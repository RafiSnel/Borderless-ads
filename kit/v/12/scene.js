// 12 · "Same app. Different course." — CREAM SPLIT SCREEN · comparing & surprising
window.ready = (async () => {
  await loadFonts();
  await loadImages({ logo: 'app/logo512.png', mo: 'app/madrid_overview.png', to: 'app/tokio_overview.png', ml: 'app/madrid_lesson_0.png', tl: 'app/tokio_lesson_0.png',
    mp: 'app/madrid_path_full_s.jpg', tp: 'app/tokio_path_full_s.jpg', mpp: 'app/madrid_passport.png', tpp: 'app/tokio_passport.png' });
  const L = await loadTimeline('12');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const CREAM = '#f6efe2', TERRA = '#c4622d', BORD = '#7a1f35', INK = '#2a2420';
  const END = e(8) + 0.2, DUR = END + 1.3; window.DURATION = DUR;
  const his4 = p(4, 3), his5 = p(5, 2), his6 = p(6, 2);
  // screen states per side: [time, img, opts]
  const LEFT = [[0, 'mo', { focus: [585, 380], zoom: 1.0 }], [s(2), 'ml', { focus: [585, 1150], zoom: 1.25 }], [s(4), 'mo', { focus: [480, 1120], zoom: 1.3 }],
    [s(5), 'mp', { scroll: [500, 900], zoom: 1.4 }], [s(6), 'mpp', { focus: [585, 1950], zoom: 1.45 }]];
  const RIGHT = [[0, 'to', { focus: [585, 380], zoom: 1.0 }], [s(3), 'tl', { focus: [585, 1150], zoom: 1.25 }], [his4, 'to', { focus: [480, 1120], zoom: 1.3 }],
    [his5, 'tp', { scroll: [1250, 1550], zoom: 1.4 }], [his6, 'tpp', { focus: [585, 1950], zoom: 1.45 }]];
  const at = (arr, t) => { let i = 0; arr.forEach((a, j) => { if (t >= a[0]) i = j; }); return [arr[i], i]; };
  function side(t, arr, cx, col, tag) {
    const [st, i] = at(arr, t); const flip = i > 0 ? eio(lin(t, st[0], st[0] + 0.34)) : 1;
    const sx = flip < 0.5 && i > 0 ? Math.abs(Math.cos(flip * Math.PI)) : Math.abs(Math.cos(flip * Math.PI)) || 0.02;
    const cur = flip < 0.5 && i > 0 ? arr[i - 1] : st;
    const intro = eo(lin(t, -0.25, 0.4)); const yy = mix(H + 700, 1060, intro);
    const sp = t > s(7) ? eio(lin(t, s(7), s(7) + 0.5)) : 0;
    X.save(); X.translate(cx + (cx < W / 2 ? -1 : 1) * sp * 60, yy); X.rotate((cx < W / 2 ? -1 : 1) * sp * 0.08);
    const drawState = (stt) => () => { X.translate(250, 500); const o = stt[2], img = IMG[stt[1]];
      if (o.scroll) { const u = lin(t, stt[0], stt[0] + 3.2); phone(img, 0, 0, 430, { scrollY: mix(o.scroll[0], o.scroll[1], u), zoom: o.zoom, frame: col }); }
      else phone(img, 0, 0, 430, { focus: o.focus, zoom: o.zoom, frame: col }); };
    // the phone turns over in 3D to show the next screen
    const turning = i > 0 && flip < 1, prev = i > 0 ? arr[i - 1] : st;
    flipPlane(0, 0, 500, 1000, turning ? flip * Math.PI * (cx < W / 2 ? 1 : -1) : 0, drawState(turning ? prev : st), drawState(st), { key: 'ph' + tag, persp: 2000, shadow: false });
    X.restore();
    txt(tag, cx, 300, font('serif', 400, 76), col, { a: intro });
  }
  function label(t, t0, lines, cx, col) {
    if (t < t0) return; const k = back(lin(t, t0, t0 + 0.25), 2);
    X.save(); X.translate(cx, 1640); X.scale(k, k);
    X.fillStyle = col; rr(-250, -95, 500, 190, 26); X.fill();
    lines.forEach((l, i) => { let sz = i ? 52 : 40; X.font = font('archivo', 400, sz); const w = X.measureText(l).width; if (w > 430) sz *= 430 / w;
      txt(l, 0, -36 + i * 72 + (lines.length === 1 ? 36 : 0), font('archivo', 400, sz), '#fff'); });
    X.restore();
  }
  const caps = (t) => {
    if (t < s(2)) return [[0.4, ['SAME APP'], TERRA], [0.4, ['SAME APP'], BORD]];
    if (t < s(4)) return [[s(2) + 0.2, ['KITCHEN INTERNSHIP', 'MADRID'], TERRA], [s(3) + 0.2, ['FIRST OFFICE JOB', 'TOKYO'], BORD]];
    if (t < s(5)) return [[s(4) + 0.1, ['TODAY', 'EXPLAINING THE MENU'], TERRA], [his4, ['TODAY', 'MAKING A REQUEST'], BORD]];
    if (t < s(6)) return [[s(5) + 0.1, ['HER WORLD', 'A SPANISH TOWN'], TERRA], [his5, ['HIS WORLD', 'TOKYO STREETS'], BORD]];
    if (t < s(7)) return [[s(6) + 0.1, ['PASSPORT', 'HISPANIDAD'], TERRA], [his6, ['PASSPORT', 'NIHON'], BORD]];
    return null;
  };
  const cues = [['click', 0.15, 0.7], ['click', 0.3, 0.7], ['guitar', s(2) + 0.1, 0.8], ['bell', s(3) + 0.1, 0.6],
    ['guitar', s(4), 0.8], ['bell', his4, 0.6], ['guitar', s(5), 0.8], ['bell', his5, 0.6], ['guitar', s(6), 0.8], ['bell', his6, 0.6],
    ['guitar', s(7), 0.7], ['bell', s(7), 0.5], ['impact', p(7, 1) || s(7) + 0.7, 1], ['whoosh', s(8) - 0.05, 0.6], ['impact', s(8) + 0.1, 0.8], ['ding', END, 0.5]];
  [s(2), s(3), s(4), his4, s(5), his5, s(6), his6].forEach((x) => cues.push(['page', x, 0.35]));
  const PEEKS = [
  { t: 0.3, d: s(7) - 0.6, side: 'T', x: W / 2, y: 175, s: 0.38, mood: 'happy', noTilt: true, size: 40, maxw: 380, says: [[0.35, 'Same app.'], [p(2, 1), 'Madrid!', { lookX: -1 }], [p(3, 1), 'Tokyo!', { lookX: 1 }],
    [p(4, 1), 'Menus.', { lookX: -1 }], [p(4, 3), 'Requests.', { lookX: 1 }], [p(5, 1), 'Spain…', { lookX: -1 }], [p(5, 3), '…or Tokyo.', { lookX: 1 }],
    [p(6, 1), 'Hispanidad.', { lookX: -1 }], [p(6, 3), 'Nihon.', { lookX: 1 }]] },
  { t: s(8) + 0.2, d: 3, side: 'B', x: W / 2, y: 1640, s: 0.62, mood: 'happy', wave: true, say: "That's me." },
];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [p(7, 1) || s(7) + 0.7, s(8) + 0.1];

  window.SCENE = {
    frame(t) {
      // split background
      X.fillStyle = CREAM; X.fillRect(0, 0, W, H);
      X.fillStyle = 'rgba(196,98,45,0.10)'; X.fillRect(0, 0, W / 2, H); X.fillStyle = 'rgba(122,31,53,0.10)'; X.fillRect(W / 2, 0, W / 2, H);
      X.save(); camera(t, hits, [], 16); HOST.pp(t, L);
      if (t < s(8)) {
        side(t, LEFT, 270, TERRA, 'Her'); side(t, RIGHT, 810, BORD, 'His');
        const c = caps(t); if (c) { label(t, c[0][0], c[0][1], 270, c[0][2]); label(t, c[1][0], c[1][1], 810, c[1][2]); }
        // centre line → ≠
        const nk = eo(lin(t, p(7, 1) || s(7) + 0.7, (p(7, 1) || s(7) + 0.7) + 0.35));
        X.strokeStyle = INK; X.lineWidth = 4; X.beginPath(); X.moveTo(W / 2, 120); X.lineTo(W / 2, mix(H - 120, 120, nk)); X.stroke();
        if (t > s(7)) { slam(t, s(7), 'SAME APP.', W / 2, 160, font('archivo', 400, 90), INK, {}); }
        if (nk > 0) { X.save(); X.translate(W / 2, 1060); const sc = mix(0.2, 1, back(nk)); X.scale(sc, sc);
          X.fillStyle = CREAM; X.beginPath(); X.arc(0, 0, 230, 0, 7); X.fill(); X.strokeStyle = INK; X.lineWidth = 8; X.stroke();
          txt('≠', 0, 10, font('inter', 900, 330), INK); X.restore();
          slam(t, (p(7, 1) || s(7) + 0.7) + 0.15, 'NOT ONE LESSON', W / 2, 1470, font('archivo', 400, 84), INK, {});
          slam(t, (p(7, 1) || s(7) + 0.7) + 0.4, 'IN COMMON.', W / 2, 1580, font('archivo', 400, 84), TERRA, {}); }
      } else {
        coinIn(t, s(8), W / 2, 820, 150);
        slam(t, s(8) + 0.15, "That's", W / 2, 1060, font('serif', 400, 110), INK, {});
        slam(t, s(8) + 0.35, 'Borderless.', W / 2, 1200, font('inter', 900, 140), INK, {});
        X.fillStyle = TERRA; X.fillRect(W / 2 - 240, 1300, 230, 10); X.fillStyle = BORD; X.fillRect(W / 2 + 10, 1300, 230, 10);
      }
      X.restore();
      HOST.peeks(t, PEEKS);
    },
  };
})();
