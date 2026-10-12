// 5A · "This lesson didn't exist yesterday" — one lesson, written last night, for one person.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' }); await loadWorld();
  const L = await loadTimeline('5a');
  const s = (n) => L[n].start, e = (n) => L[n].end, w = (n, word) => wt(L, n, word);
  const END = e(10) + 0.2, DUR = END + 2.2; window.DURATION = DUR;
  const tYest = w(1, 'yesterday'), tDidnt = w(1, "didn't"), tYears = w(2, 'years'), tEvery = L[2].phrases[1], tLast = w(3, 'last'), tOne = L[3].phrases[1];
  const tMoving = L[4].phrases[1], tLisbon = L[4].phrases[2], tLevel = L[4].phrases[3], tSix = w(5, 'six'), tSeven = w(7, 'seven'), tAround = w(7, 'around');
  const tFlat = L[8].phrases[0], tLand = L[8].phrases[2] ?? w(8, 'landlord'), tRent = L[8].phrases[3] ?? w(8, 'rent'), tYet = L[9].phrases[1] ?? w(9, "doesn't");
  const cues = [];
  const typing = (t0, t1, step = 0.055) => { for (let t = t0; t < t1; t += step) cues.push(['type', t, 0.5 + hash(t * 99) * 0.3]); };
  typing(0.15, 2.3, 0.045); cues.push(['pop', tDidnt, 0.5], ['impact', tYest, 0.7], ['whoosh', s(2), 0.8], ['stamp', tYears, 0.8], ['boom', tEvery, 0.7],
    ['swell', s(3) + 0.2, 0.5], ['whoosh', s(3) + 0.15, 0.6], ['ding', tLast + 0.05, 0.5], ['impact', tOne, 0.6], ['whoosh', s(4) - 0.05, 0.6], ['pop', s(4) + 0.05, 0.6], ['pop', tMoving, 0.5], ['plop', tLisbon, 0.5],
    ['tick', tLevel, 0.6], ['tick', tLevel + 0.1, 0.6], ['tick', tLevel + 0.2, 0.6], ['ding', tLevel + 0.32, 0.4], ['whoosh', s(5) - 0.05, 0.7]);
  for (let i = 0; i < 5; i++) cues.push(['tick', s(5) + 0.15 + i * 0.16, 0.6]);
  cues.push(['correct', tSix + 0.05, 0.6], ['stamp', tSix + 0.3, 0.6], ['whoosh', s(6) - 0.05, 0.5]);
  for (let i = 0; i < 5; i++) cues.push([i >= 2 ? 'buzz' : 'click', s(6) + 0.2 + i * 0.28, i >= 2 ? 0.25 : 0.6]);
  cues.push(['boing', s(6) + 0.55, 0.35], ['whoosh', s(7) + 0.05, 0.8], ['whoosh', s(7) + 0.2, 0.6]); typing(s(7) + 0.4, s(7) + 2.2, 0.045);
  cues.push(['impact', tSeven, 0.6], ['pop', tAround, 0.5], ['pop', tFlat, 0.7], ['pop', tLand, 0.7], ['hit', tRent, 0.8], ['whoosh', s(9) - 0.1, 0.7], ['hum', s(9) + 0.3, 0.5], ['glitch', tYet, 0.4], ['impact', tYet + 0.05, 0.5], ['coin', s(10), 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const hits = [tYest, tEvery, tOne, tSix + 0.3, tRent, tYet];
  const beats = [s(1), tDidnt, tYest, s(2), tYears, tEvery, s(3), tLast, tOne, s(4), tMoving, tLevel, s(5), tSix, s(6), s(7), tSeven, tAround, tFlat, tLand, tRent, s(9), tYet];

  // ---------- props ----------
  function oldBook(x, y, sc, a = 1, dusty = 1) {
    X.save(); X.translate(x, y); X.scale(sc, sc); X.globalAlpha *= a;
    X.fillStyle = 'rgba(31,26,20,0.15)'; rr(-150, -190, 310, 400, 18); X.fill();
    X.fillStyle = '#c9c2b5'; rr(-160, -200, 310, 400, 18); X.fill(); X.fillStyle = '#b4ad9f'; rr(-160, -200, 36, 400, [18, 0, 0, 18]); X.fill();
    X.fillStyle = '#e2dccf'; rr(-100, -150, 210, 70, 8); X.fill(); X.font = I5(900, 30); X.fillStyle = '#8f8778'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('LANGUAGE', 5, -125); X.font = I5(700, 22); X.fillText('BOOK 1', 5, -98);
    X.fillStyle = '#b4ad9f'; for (let i = 0; i < 4; i++) { rr(-90, -30 + i * 44, 190 - (i % 2) * 50, 16, 8); X.fill(); }
    X.font = I5(700, 22); X.fillStyle = '#9a9283'; X.fillText('© 2011', 5, 170);
    if (dusty) { X.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 26; i++) { X.beginPath(); X.arc((hash(i) - .5) * 300, (hash(i + 7) - .5) * 390, 2 + hash(i * 3) * 4, 0, 7); X.fill(); } }
    X.restore();
  }
  const BODY = ['Your heating stopped working.', 'Call Sr. Costa and explain it,', 'politely, in Portuguese.'];
  const card7 = (t, o = {}) => { const y = lessonCard(t, 540, o.cy ?? 1150, 840, o.h ?? 860, { kicker: 'LESSON 7 OF 50', title: 'Calling your\nlandlord', ts: 78, lines: BODY, ...o });
    if (o.foot !== false) { const fa = o.footA ?? 1; if (fa > 0) { X.save(); X.globalAlpha *= fa; chip('Built from: lesson 6', 330, (o.cy ?? 1150) + (o.h ?? 860) / 2 - 130, 28, P5.acc, 'rgba(168,81,43,0.12)', 1, 1, { shadow: false }); chip('Lisbon · A2', 660, (o.cy ?? 1150) + (o.h ?? 860) / 2 - 130, 28, P5.acc, 'rgba(168,81,43,0.12)', 1, 1, { shadow: false }); X.restore(); } } return y; };
  function moon(x, y, r) { X.save(); X.fillStyle = P5.sun; X.beginPath(); X.arc(x, y, r, 0, 7); X.fill(); X.fillStyle = P5.bg; X.beginPath(); X.arc(x + r * 0.45, y - r * 0.3, r * 0.85, 0, 7); X.fill(); X.restore(); }
  function pin(x, y, sc, col = P5.acc) { X.save(); X.translate(x, y); X.scale(sc, sc); X.fillStyle = col; X.beginPath(); X.arc(0, -40, 30, Math.PI, 0); X.lineTo(0, 10); X.closePath(); X.fill(); X.beginPath(); X.arc(0, -40, 30, 0, 7); X.fill(); X.fillStyle = '#fff'; X.beginPath(); X.arc(0, -40, 12, 0, 7); X.fill(); X.restore(); }
  const maya = (t, x, y, sc, o = {}) => person(t, x, y, sc, { hair: 'long', hairCol: '#2c1b12', skin: '#c98c64', shirt: '#2f6f73', mood: 'happy', seed: 1, ...o });
  function levelBar(t, x, y, w, k) {
    const labs = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    X.fillStyle = P5.line; rr(x, y, w, 20, 10); X.fill(); X.fillStyle = P5.acc; rr(x, y, w * k, 20, 10); X.fill();
    labs.forEach((l, i) => txt(l, x + w * (i + 0.5) / 6, y + 60, I5(700, 30), i === 1 && k > 0.2 ? P5.acc : P5.ink3));
    const mx = x + w * k; X.fillStyle = P5.ink; X.beginPath(); X.moveTo(mx - 18, y - 40); X.lineTo(mx + 18, y - 40); X.lineTo(mx, y - 12); X.closePath(); X.fill();
  }
  // the lesson path (nodes 1..8 along a wave), camera-x in world units
  const nodeX = (i) => 300 + (i - 1) * 250, nodeY = (i) => 1120 + Math.sin(i * 1.3) * 110;
  function path(t, camX, done6, ready7) {
    X.save(); X.translate(-camX, 0);
    X.strokeStyle = P5.grey; X.lineWidth = 14; X.setLineDash([2, 30]); X.lineCap = 'round'; X.beginPath();
    for (let i = 1; i <= 8; i++) i === 1 ? X.moveTo(nodeX(i), nodeY(i)) : X.lineTo(nodeX(i), nodeY(i)); X.stroke(); X.setLineDash([]);
    for (let i = 1; i <= 8; i++) {
      const x = nodeX(i), y = nodeY(i); const done = i < 6 ? cl((t - s(5) - 0.15 - (i - 1) * 0.16) * 6) : i === 6 ? done6 : 0;
      if (i === 8) { // the ghost: doesn't exist yet
        const fl = 0.55 + 0.25 * Math.sin(t * 9) * Math.sin(t * 3.3); X.save(); X.globalAlpha *= fl; X.strokeStyle = P5.ink3; X.lineWidth = 6; X.setLineDash([16, 14]); X.beginPath(); X.arc(x, y, 78, 0, 7); X.stroke(); X.setLineDash([]); txt('?', x, y + 4, I5(900, 70), P5.ink3); X.restore(); continue;
      }
      if (i === 7 && !ready7) { X.strokeStyle = P5.grey2; X.lineWidth = 6; X.setLineDash([16, 14]); X.beginPath(); X.arc(x, y, 78, 0, 7); X.stroke(); X.setLineDash([]); txt('7', x, y + 4, I5(900, 56), P5.grey2); continue; }
      X.fillStyle = 'rgba(31,26,20,0.12)'; X.beginPath(); X.arc(x + 6, y + 12, 80, 0, 7); X.fill();
      const sc = 1 + Math.max(0, 1 - Math.abs(done - 0.6) * 3) * 0.15;
      X.fillStyle = i === 7 ? P5.paper : (done > 0.5 ? P5.acc : P5.paper); X.beginPath(); X.arc(x, y, 78 * sc, 0, 7); X.fill();
      if (i === 7) { X.strokeStyle = P5.acc; X.lineWidth = 8; X.stroke(); txt('7', x, y + 4, I5(900, 60), P5.acc); }
      else if (done > 0.5) { X.strokeStyle = '#fff'; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(x - 28, y + 2); X.lineTo(x - 6, y + 24); X.lineTo(x + 32, y - 22); X.stroke(); }
      else txt(String(i), x, y + 4, I5(900, 56), P5.ink3);
    }
    X.restore();
  }
  function resultRow(t, t0, y, label, sub, ok) {
    if (t < t0) return; const k = back(lin(t, t0, t0 + 0.2), 2);
    X.save(); X.translate(mix(80, 0, k), 0); X.globalAlpha *= cl((t - t0) * 6);
    X.fillStyle = ok ? 'rgba(79,170,114,0.12)' : 'rgba(200,68,47,0.12)'; rr(170, y - 46, 740, 92, 22); X.fill();
    X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = I5(800, 40); X.fillStyle = P5.ink; X.fillText(label, 210, y - 2);
    X.font = I5(500, 28); X.fillStyle = P5.ink3; X.textAlign = 'right'; X.fillText(sub, 800, y);
    X.fillStyle = ok ? P5.green : P5.red; X.beginPath(); X.arc(855, y, 26, 0, 7); X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 7; X.lineCap = 'round'; X.beginPath();
    if (ok) { X.moveTo(843, y + 1); X.lineTo(852, y + 10); X.lineTo(868, y - 9); } else { X.moveTo(846, y - 9); X.lineTo(864, y + 9); X.moveTo(864, y - 9); X.lineTo(846, y + 9); } X.stroke();
    X.restore();
  }
  function vocabRow(t, t0, y, pt, en, icon) {
    if (t < t0) return; const k = back(lin(t, t0, t0 + 0.24), 2.2);
    X.save(); X.translate(540, y); X.scale(mix(1.5, 1, k), mix(1.5, 1, k)); X.globalAlpha *= cl((t - t0) * 6);
    X.fillStyle = 'rgba(168,81,43,0.10)'; rr(-370, -56, 740, 112, 26); X.fill();
    X.fillStyle = P5.acc; X.beginPath(); X.arc(-300, 0, 38, 0, 7); X.fill(); X.save(); X.translate(-300, 0); X.strokeStyle = '#fff'; X.fillStyle = '#fff'; X.lineWidth = 6; X.lineCap = 'round'; X.lineJoin = 'round'; icon(); X.restore();
    X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = I5(800, 44); X.fillStyle = P5.ink; X.fillText(pt, -236, -12); X.font = I5(600, 30); X.fillStyle = P5.acc; X.fillText(en, -236, 30);
    X.restore();
  }
  const icHouse = () => { X.beginPath(); X.moveTo(-18, 2); X.lineTo(0, -16); X.lineTo(18, 2); X.moveTo(-12, -2); X.lineTo(-12, 16); X.lineTo(12, 16); X.lineTo(12, -2); X.stroke(); };
  const icKey = () => { X.beginPath(); X.arc(-8, -4, 10, 0, 7); X.moveTo(2, -4); X.lineTo(20, -4); X.moveTo(14, -4); X.lineTo(14, 6); X.stroke(); };
  const icEuro = () => { X.font = I5(900, 40); X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('€', 0, 2); };

  window.SCENE = {
    frame(t) {
      X.save(); camera(t, hits, [], 16); punch5(t, beats, 0.022, 0.14);
      bg5(t);
      if (t < s(2)) { // a lesson writing itself
        const k = back(lin(t, 0, 0.3), 1.6);
        X.save(); X.translate(540, 1150); X.scale(k, k); X.translate(-540, -1150);
        card7(t, { titleTyped: lin(t, 0.15, 1.1), cursor: t < 1.6, typed: lin(t, 1.0, 2.3), footA: lin(t, 1.9, 2.1) });
        X.restore();
        if (t > 1.0) chip('Written 23:14 · last night', 540, 680, 32, '#fff', P5.ink, cl((t - 1.0) * 4), back(lin(t, 1.0, 1.2), 2));
        hd(t, s(1), 'THIS LESSON', 540, 250, 108, P5.ink); hd(t, tDidnt, "DIDN'T EXIST", 540, 370, 108, P5.acc); hd(t, tYest, 'YESTERDAY.', 540, 490, 108, P5.ink);
      } else if (t < s(3) + 0.05) { // the old, everyone-course
        const grid = eo(lin(t, tEvery, tEvery + 0.35));
        if (grid < 1) oldBook(540, 1180, mix(1.55, 0.55, grid) * back(lin(t, s(2), s(2) + 0.25), 1.6), 1);
        if (grid > 0) for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { const i = r * 4 + c; const d = cl(grid * 3 - hash(i) * 2); if (d <= 0) continue; oldBook(150 + c * 260, 760 + r * 240, 0.55 * back(d, 1.6), 0.9, 0); }
        if (t > tYears) stamp5(t, tYears, 'WRITTEN 2011', 540, 1000, 64, P5.red, -0.08);
        if (grid < 0.5) { hd(t, s(2), 'MOST COURSES', 540, 260, 104, P5.ink); hd(t, tYears, 'YEARS AGO.', 540, 380, 120, P5.acc); }
        else { hd(t, tEvery, 'FOR', 540, 250, 96, P5.ink); hd(t, tEvery + 0.12, 'EVERYONE.', 540, 370, 140, P5.ink); }
      } else if (t < s(4)) { // one book turns into one lesson
        const fl = eo(lin(t, s(3) + 0.05, s(3) + 0.75));
        for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { const i = r * 4 + c; if (i === 9) continue; const dr = ei(lin(t, s(3) + 0.1 + hash(i + 3) * 0.4, s(3) + 0.9 + hash(i + 3) * 0.4)); oldBook(150 + c * 260 + (hash(i * 5) - .5) * 200 * dr, 760 + r * 240 + dr * 1500, 0.55, 0.9 * (1 - dr * 0.3), 0); }
        const grow = eio(lin(t, s(3) + 0.3, s(3) + 1.1));
        X.save(); X.translate(mix(670, 540, grow), mix(1240, 1180, grow)); X.scale(mix(0.62, 1, grow), mix(0.62, 1, grow));
        flipPlane(0, 0, 840, 860, fl * Math.PI, () => { X.save(); X.translate(420, 430); X.scale(2.1, 2.1); oldBook(0, 0, 1, 1, 0); X.restore(); },
          () => { X.save(); X.translate(-120, -720); card7(t, { shadow: false }); X.restore(); }, { key: 'flip5a', persp: 2200 });
        X.restore();
                if (t > tLast) { moon(120, 290, 52 * back(lin(t, tLast, tLast + 0.25), 2)); }
        hd(t, tLast, 'LAST NIGHT.', 600, 290, 120, P5.ink);
        if (t > tOne) hd(t, tOne, 'FOR ONE PERSON.', 540, 420, 96, P5.acc);
      } else if (t < s(5)) { // Maya
        const k = back(lin(t, s(4) - 0.05, s(4) + 0.25), 1.8);
        X.save(); X.translate(540, 1080); X.scale(k, k);
        card(-420, -560, 840, 1120, {});
        X.save(); X.beginPath(); X.arc(0, -330, 170, 0, 7); X.fillStyle = '#e8d9c4'; X.fill(); X.clip(); maya(t, 0, -300, 0.95); X.restore();
        hd(t, s(4), 'Maya', 0, -80, 110, P5.ink);
        if (t > tMoving) { const a = back(lin(t, tMoving, tMoving + 0.22), 2); X.save(); X.globalAlpha *= cl((t - tMoving) * 5); X.translate(0, 70); X.scale(a, a); pin(-210, 30, 0.9); X.textAlign = 'left'; X.textBaseline = 'middle';
          X.font = I5(600, 44); X.fillStyle = P5.ink2; X.fillText('Moving to', -160, 0); if (t > tLisbon - 0.15) { X.font = I5(900, 54); X.fillStyle = P5.acc; X.fillText('Lisbon', 60, 0); } X.restore(); }
        if (t > tLevel - 0.15) { X.save(); X.globalAlpha *= cl((t - tLevel + 0.15) * 5); levelBar(t, -330, 300, 660, (1.5 / 6) * eo(lin(t, tLevel, tLevel + 0.4))); txt('Tested, not guessed', 0, 450, I5(600, 32), P5.ink3); X.restore(); }
        X.restore();
        hd(t, s(4) + 0.05, 'ONE PERSON.', 540, 260, 92, P5.acc, { shadow: false });
      } else if (t < s(7)) { // her path, lesson 6 done; how it went
        const camX = mix(nodeX(3) - 540, nodeX(6) - 540, eio(lin(t, s(5), s(5) + 1.2)));
        const up = eo(lin(t, s(6), s(6) + 0.35));
        X.save(); X.translate(0, -up * 560); X.translate(540, 1120); X.scale(mix(1.35, 1, up), mix(1.35, 1, up)); X.translate(-540, -1120); path(t, camX, cl((t - tSix) * 5), false); X.restore();
        if (t < s(6)) { hd(t, s(5), 'YESTERDAY:', 540, 300, 96, P5.ink); hd(t, tSix, 'LESSON 6. DONE.', 540, 420, 100, P5.acc); if (t > tSix + 0.3) stamp5(t, tSix + 0.3, 'DONE', nodeX(6) - camX + 40, nodeY(6) - 150, 54, P5.green, -0.12); }
        else {
          hd(t, s(6), 'HOW DID IT GO?', 540, 260, 92, P5.ink);
          const ck = back(lin(t, s(6), s(6) + 0.3), 1.6); X.save(); X.translate(540, 1180); X.scale(ck, ck); X.translate(-540, -1180);
          card(130, 760, 820, 860, {}); X.textAlign = 'left'; X.font = I5(800, 30); X.fillStyle = P5.acc; X.letterSpacing = '3px'; X.fillText('LESSON 6 · RESULTS', 180, 840); X.letterSpacing = '0px';
          resultRow(t, s(6) + 0.2, 930, 'Greetings', '5 of 5', true); resultRow(t, s(6) + 0.48, 1050, 'Numbers', '4 of 5', true);
          resultRow(t, s(6) + 0.76, 1170, 'o senhorio', '1 of 4', false); resultRow(t, s(6) + 1.04, 1290, 'a renda', '1 of 3', false); resultRow(t, s(6) + 1.32, 1410, 'Asking for a repair', '0 of 2', false);
          X.restore();
          // scanning line
          const sy = 860 + ((t - s(6)) * 900) % 640; X.fillStyle = 'rgba(168,81,43,0.18)'; X.fillRect(150, sy, 780, 8);
          HOST.peeks(t, [{ t: s(6) + 0.55, d: 1.3, side: 'R', y: 1720, s: 0.62, say: 'Renting. Noted.', mood: 'happy', size: 40 }]);
        }
      } else if (t < s(9)) { // lesson 7 written around her
        const k = back(lin(t, s(7) + 0.05, s(7) + 0.35), 1.6);
        // the three weak spots fly into the new lesson
        for (let i = 0; i < 3; i++) { const p = eio(lin(t, s(7), s(7) + 0.45)); if (p >= 1) continue; X.save(); X.globalAlpha = 1 - p; chip(['o senhorio', 'a renda', 'a repair'][i], mix(400, 540, p), mix(1180 + i * 120, 1000, p), 36, '#fff', P5.red, 1, 1 - p * 0.5); X.restore(); }
        X.save(); X.translate(540, 1150); X.scale(k, k); X.translate(-540, -1150);
        const yy = card7(t, { cy: 1180, h: 1100, titleTyped: lin(t, s(7) + 0.4, s(7) + 1.2), cursor: t < s(8), typed: t < s(8) ? lin(t, s(7) + 1.1, s(7) + 2.2) : 1, lines: t < s(8) ? BODY : [], foot: false });
        vocabRow(t, tFlat, 1150, 'o apartamento', 'her flat', icHouse); vocabRow(t, tLand, 1310, 'o senhorio', 'her landlord', icKey); vocabRow(t, tRent, 1470, 'a renda', 'her rent', icEuro);
        X.restore();
        if (t < s(8)) { if (t < tSeven) hd(t, s(7) + 0.05, 'AND WROTE…', 540, 300, 110, P5.ink); hd(t, tSeven, 'LESSON 7.', 540, 260, 120, P5.ink); hd(t, tAround, 'AROUND HER.', 540, 390, 104, P5.acc); }
        else { const word = t < tLand ? 'HER FLAT.' : t < tRent ? 'HER LANDLORD.' : 'HER RENT.'; const t0 = t < tLand ? tFlat : t < tRent ? tLand : tRent; hd(t, t0, word, 540, 320, 120, t >= tRent ? P5.acc : P5.ink, { from: 1.5 }); }
      } else if (t < s(10)) { // lesson 8: doesn't exist yet
        const camX = mix(nodeX(6) - 540, nodeX(7) - 470, eio(lin(t, s(9) - 0.1, s(9) + 0.7)));
        X.save(); X.translate(540, 1000); X.scale(1.3, 1.3); X.translate(-540, -1120); path(t, camX, 1, true); X.restore();
        const ga = eo(lin(t, tYet - 0.1, tYet + 0.3));
        if (ga > 0) { X.save(); X.globalAlpha = ga * (0.75 + 0.2 * Math.sin(t * 11)); X.strokeStyle = P5.ink3; X.lineWidth = 6; X.setLineDash([22, 16]); rr(170, 1300, 740, 330, 36); X.stroke(); X.setLineDash([]);
          txt('LESSON 8 OF 50', 540, 1380, I5(800, 32), P5.ink3, { ls: 3 }); txt('Written when', 540, 1460, I5(800, 54), P5.ink3); txt('you get there.', 540, 1530, I5(800, 54), P5.ink3); X.restore(); }
        hd(t, s(9), 'LESSON 8?', 540, 300, 130, P5.ink); hd(t, tYet, "DOESN'T EXIST YET.", 540, 440, 88, P5.acc);
      }
      endCard(t, s(10), 'Written for you, as you go.', { tagAt: w(10, 'written') - s(10) });
      X.restore();
      grain(t, 0.035);
    },
  };
})();
