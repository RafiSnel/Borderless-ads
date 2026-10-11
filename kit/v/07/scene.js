// 07 · "Top 5 hardest languages" — DARK NEON + WORLD MAP · suspense countdown
window.ready = (async () => {
  await loadFonts(); await loadWorld();
  await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('07');
  const s = (n) => L[n].start, e = (n) => L[n].end, p = (n, i) => L[n].phrases[i] ?? L[n].start;
  const PINK = '#ff2fb3', CYAN = '#29e6ff', VIO = '#9b5cff', BG = '#05040b';
  const END = e(13) + 0.2, DUR = END + 1.4; window.DURATION = DUR;
  const ARAB = [682, 818, 784, 400, 12, 504, 368, 760, 434, 788, 512, 887, 729, 414, 634, 422, 478];
  const t1 = Math.max(p(9, 1), s(9) + 0.55); // "number one" → reveal
  // map keys: [time, lon, lat, zoom, ids, color]
  const KEYS = [[0, 40, 25, 3.6, [], CYAN], [s(2), 32, 25, 9, ARAB, PINK], [s(4), 127.6, 36.3, 44, [410], CYAN], [s(6), 113.5, 23.5, 34, [], VIO],
    [s(8), 104, 34, 9.5, [156, 158], PINK], [t1, 137.5, 37.5, 24, [392], CYAN], [s(11), 75, 30, 4.2, [], CYAN], [s(13), 75, 30, 4.2, [...ARAB, 410, 156, 158, 392], PINK]];
  function mapState(t) {
    let i = 0; KEYS.forEach((k, j) => { if (t >= k[0]) i = j; });
    const a = KEYS[Math.max(0, i - 1)], b = KEYS[i], k = i === 0 ? 1 : eio(lin(t, b[0], b[0] + 0.55));
    return { lon: mix(a[1], b[1], k), lat: mix(a[2], b[2], k), zoom: Math.exp(mix(Math.log(a[3]), Math.log(b[3]), k)), ids: b[4], col: b[5], k };
  }
  const flick = (t, t0) => (t < t0 ? 0 : t - t0 > 0.35 ? 1 : hash(Math.floor((t - t0) * 32) + t0 * 10) > 0.45 ? 1 : 0.15);
  function neon(text, x, y, size, col, t, t0, opts = {}) {
    const a = flick(t, t0); if (!a) return;
    X.save(); X.globalAlpha *= a; txt(text, x, y, font(opts.f || 'anton', 400, size), '#fff', { glow: col, gb: 40, align: opts.align || 'center' });
    txt(text, x, y, font(opts.f || 'anton', 400, size), col, { a: 0.55, glow: col, gb: 12, align: opts.align || 'center' }); X.restore();
  }
  function header(t, n, name, nat, t0, col) {
    const k = back(lin(t, t0, t0 + 0.3));
    X.save(); X.translate(180, 300); X.scale(k, k); txt(String(n), 0, 0, font('anton', 400, 330), col, { glow: col, gb: 60 }); txt(String(n), 0, 0, font('anton', 400, 330), '#fff', { a: 0.35 }); X.restore();
    neon(name, 330, 250, 130, col, t, t0 + 0.15, { align: 'left' });
    if (nat) neon(nat, 335, 380, 84, '#ffffff', t, t0 + 0.3, { align: 'left', f: 'inter' });
  }
  function grid(t) {
    X.fillStyle = BG; X.fillRect(0, 0, W, H);
    X.strokeStyle = 'rgba(155,92,255,0.12)'; X.lineWidth = 2;
    for (let i = 0; i < 14; i++) { const y = 1300 + Math.pow(i / 14, 2) * 640 + ((t * 40) % 40) * (i / 14); X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    for (let i = -8; i <= 8; i++) { X.beginPath(); X.moveTo(W / 2 + i * 30, 1300); X.lineTo(W / 2 + i * 220, H); X.stroke(); }
  }
  function map(t, alpha = 1) {
    const m = mapState(t); const hi = {}; m.ids.forEach((id) => (hi[id] = m.col));
    X.save(); X.beginPath(); X.rect(0, 0, W, 1150); X.clip(); X.translate(0, -230);
    drawWorld({ lon: m.lon, lat: m.lat, zoom: m.zoom, fill: '#11142a', stroke: 'rgba(41,230,255,0.35)', lw: 1.5, hi, glow: 40, alpha });
    // Hong Kong dot (too small in 110m data)
    if (t >= s(6) && t < s(8)) { const x = W / 2 + (114.17 - m.lon) * m.zoom, y = H / 2 - (22.3 - m.lat) * m.zoom * 1.15; const r = 18 + 6 * Math.sin(t * 10);
      X.fillStyle = VIO; X.shadowColor = VIO; X.shadowBlur = 40; X.beginPath(); X.arc(x, y, r, 0, 7); X.fill(); X.shadowBlur = 0; txt('HONG KONG', x, y + 60, font('bebas', 400, 54), '#fff', { glow: VIO }); }
    X.restore();
    const g = X.createLinearGradient(0, 900, 0, 1150); g.addColorStop(0, 'rgba(5,4,11,0)'); g.addColorStop(1, BG); X.fillStyle = g; X.fillRect(0, 900, W, 260); X.fillStyle = BG; X.fillRect(0, 1150, W, 150);
  }
  function box(x, y, w, h, col, a = 1) { X.save(); X.globalAlpha *= a; X.strokeStyle = col; X.lineWidth = 5; X.shadowColor = col; X.shadowBlur = 25; rr(x, y, w, h, 22); X.stroke(); X.restore(); }

  const cues = [['neon', 0.05, 0.9], ['hum', 0.1, 0.5], ['neon', 0.6, 0.6], ['riser', s(2), 0.7],
    ['boom', s(2), 1], ['whoosh', p(3, 0), 0.6], ['pop', s(3) + 0.9, 0.5], ['pop', s(3) + 1.1, 0.5], ['pop', s(3) + 1.3, 0.5], ['pop', s(3) + 1.5, 0.5],
    ['riser', s(4), 0.5], ['boom', s(4), 1], ['click', s(5) + 0.1, 0.8], ['click', s(5) + 0.3, 0.8], ['click', s(5) + 0.5, 0.8],
    ['riser', s(6), 0.5], ['boom', s(6), 1], ['whoosh', s(7) + 0.3, 0.6], ['glitch', s(7) + 0.5, 0.6],
    ['riser', s(8), 0.6], ['boom', s(8), 1], ['scratch', p(8, 3) || s(8) + 2.0, 0.6], ['swell', t1, 0.8], ['boom', t1, 1.3],
    ['impact', s(10), 0.8], ['impact', s(10) + 0.3, 0.8], ['impact', s(10) + 0.6, 0.8], ['pop', p(10, 1) || s(10) + 1.4, 0.5], ['pop', (p(10, 1) || s(10) + 1.4) + 0.3, 0.5], ['pop', (p(10, 1) || s(10) + 1.4) + 0.6, 0.5],
    ['impact', s(12), 0.7], ['buzz', p(12, 1) || s(12) + 0.5, 0.4], ['neon', p(12, 2) || s(12) + 0.9, 0.8], ['impact', p(12, 3) || s(12) + 1.3, 0.9],
    ['whoosh', s(13), 0.7], ['neon', s(13) + 0.1, 1], ['ding', END, 0.7]];
  for (let k = 0; k < 6; k++) cues.push(['pop', s(6) + 1.0 + k * 0.12, 0.45]);
  for (let k = 0; k < 14; k++) cues.push(['tick', s(11) + 0.1 + k * 0.08, 0.5]);
  const PEEKS = [
  { t: 0.3, d: 1.7, side: 'R', y: 1700, s: 0.62, glow: 'rgba(255,255,255,0.22)', mood: 'o', wide: true, say: 'Uh oh.' },
  { t: p(5, 1) + 0.1, d: 1.5, side: 'L', y: 1720, s: 0.6, glow: 'rgba(255,255,255,0.22)', mood: 'worried', sweat: true, say: 'How polite?!' },
  { t: p(8, 3) + 0.1, d: 1.4, side: 'R', y: 1720, s: 0.6, glow: 'rgba(255,255,255,0.22)', mood: 'o', wide: true, say: 'THOUSANDS?' },
  { t: p(9, 1) + 0.25, d: 0.75, side: 'L', y: 1720, s: 0.6, glow: 'rgba(255,255,255,0.22)', mood: 'happy', say: 'Called it.' },
  { t: p(12, 3) + 0.05, d: 1.3, side: 'R', y: 1720, s: 0.6, glow: 'rgba(255,255,255,0.22)', mood: 'happy', armsUp: true, say: "Let's go!" },
  { t: s(13) + 0.3, d: 3.5, side: 'L', y: 1740, s: 0.6, glow: 'rgba(255,255,255,0.22)', mood: 'happy', wave: true, say: 'All five.' },
];
  cues.push(...HOST.cues(PEEKS));
  window.CUES = { dur: DUR, cues, sfx_gain: 0.36 };
  const hits = [s(2), s(4), s(6), s(8), t1, s(10), s(13)];

  window.SCENE = {
    frame(t) {
      grid(t);
      X.save(); camera(t, hits, [s(2), s(4), s(6), s(8), s(11), s(12), s(13)], 22); HOST.pp(t, L);
      // black-out before number one
      const black = t > s(9) && t < t1 ? 1 : 0;
      if (!black) map(t, t >= s(11) && t < s(13) ? 0.35 : 1);
      if (t < s(2)) {
        neon('TOP 5', W / 2, 1270, 260, PINK, t, 0.05);
        neon('HARDEST', W / 2, 1490, 170, CYAN, t, 0.55);
        neon('LANGUAGES', W / 2, 1640, 110, '#fff', t, 0.9);
      } else if (t < s(4)) {
        header(t, 5, 'ARABIC', 'العربية', s(2), PINK);
        if (t > s(3)) {
          const ak = eo(lin(t, s(3), s(3) + 0.6)); X.save(); X.strokeStyle = PINK; X.lineWidth = 12; X.shadowColor = PINK; X.shadowBlur = 30; X.lineCap = 'round';
          X.beginPath(); X.moveTo(980, 1240); X.lineTo(mix(980, 100, ak), 1240); X.stroke(); X.beginPath(); X.moveTo(mix(980, 100, ak) + 40, 1200); X.lineTo(mix(980, 100, ak), 1240); X.lineTo(mix(980, 100, ak) + 40, 1280); X.stroke(); X.restore();
          txt('RIGHT → LEFT', W / 2, 1180, font('bebas', 400, 56), '#fff', { a: ak, ls: 6 });
          const forms = [['ع', 'ALONE'], ['عـ', 'START'], ['ـعـ', 'MIDDLE'], ['ـع', 'END']];
          forms.forEach(([f, lab], i) => { const t0 = s(3) + 0.9 + i * 0.2; if (t < t0) return; const kk = back(lin(t, t0, t0 + 0.25)); const x = 150 + i * 260;
            X.save(); X.translate(x, 1480); X.scale(kk, kk); box(-110, -150, 220, 260, i % 2 ? CYAN : PINK); txt(f, 0, -30, font('"Noto Sans Arabic"', 700, 130), '#fff', { glow: i % 2 ? CYAN : PINK });
            txt(lab, 0, 75, font('bebas', 400, 46), '#fff', { ls: 3 }); X.restore(); });
        }
      } else if (t < s(6)) {
        header(t, 4, 'KOREAN', '한국어', s(4), CYAN);
        if (t > s(5)) {
          // jamo click together
          const parts = ['ㅎ', 'ㅏ', 'ㄴ']; const done = t > s(5) + 0.6;
          if (!done) parts.forEach((j, i) => { const t0 = s(5) + 0.05 + i * 0.2; if (t < t0) return; const kk = eo(lin(t, t0, t0 + 0.18)); txt(j, mix(W / 2 + (i - 1) * 600, W / 2 + (i - 1) * 230, kk), 1420, font('inter', 900, 200), '#fff', { glow: CYAN }); });
          else if (t < p(5, 1) || t < s(5) + 1.1) { const kk = back(lin(t, s(5) + 0.6, s(5) + 0.85)); X.save(); X.translate(W / 2, 1420); X.scale(kk, kk); txt('한', 0, 0, font('inter', 900, 300), '#fff', { glow: CYAN, gb: 60 }); X.restore(); txt('EASY.', W / 2, 1640, font('anton', 400, 90), CYAN, { glow: CYAN }); }
          else {
            // politeness ladder that never ends
            const t0 = Math.max(p(5, 1), s(5) + 1.1); const lv = ['해', '해요', '합니다', '하십니다', '하시옵니다', '???', '?????'];
            const sc = (t - t0) * 260;
            X.save(); X.beginPath(); X.rect(0, 1140, W, 700); X.clip();
            lv.forEach((w, i) => { const y = 1760 - i * 150 + sc; const x = 200 + i * 110; if (y < 1100 || y > 1900) return;
              X.strokeStyle = i % 2 ? PINK : CYAN; X.lineWidth = 8; X.shadowColor = X.strokeStyle; X.shadowBlur = 25; X.beginPath(); X.moveTo(x - 140, y + 50); X.lineTo(x + 230, y + 50); X.lineTo(x + 230, y - 100); X.stroke(); X.shadowBlur = 0;
              txt(w, x + 40, y, font('inter', 900, 76), '#fff'); });
            X.restore(); neon('POLITENESS LEVELS', W / 2, 1180, 80, PINK, t, t0);
          }
        }
      } else if (t < s(8)) {
        header(t, 3, 'CANTONESE', '粵語', s(6), VIO);
        const tones = [['詩', 'POEM', 0.0], ['史', 'HISTORY', 0.5], ['試', 'TRY', 0.3], ['時', 'TIME', 0.9], ['市', 'MARKET', 0.7], ['事', 'MATTER', 0.6]];
        if (t > s(6) + 0.9) {
          neon(t < s(7) ? 'SIX TONES' : 'ONE SYLLABLE: SI', W / 2, 1180, 72, VIO, t, s(6) + 0.9);
          tones.forEach(([c, m, h], i) => { const t0 = s(6) + 1.0 + i * 0.12; if (t < t0) return; const kk = eo(lin(t, t0, t0 + 0.2));
            let y = 1310 + h * 420; const move = i === 2 && t > s(7) + 0.3; if (move) y = mix(y, 1310, eo(lin(t, s(7) + 0.3, s(7) + 0.6)));
            const x = 90 + i * 155; const col = i === 2 && t > s(7) ? PINK : i % 2 ? CYAN : VIO;
            X.save(); X.globalAlpha *= kk; X.strokeStyle = col; X.lineWidth = 12; X.lineCap = 'round'; X.shadowColor = col; X.shadowBlur = 25; X.beginPath(); X.moveTo(x, y); X.lineTo(x + 110, y); X.stroke(); X.restore();
            if (t > s(7) && i === 2) { const flip = t > s(7) + 0.6; txt(flip ? '詩' : '試', x + 55, y - 60, font('inter', 900, 80), '#fff', { glow: PINK }); txt(flip ? 'POEM' : 'TRY', x + 55, y + 50, font('bebas', 400, 48), PINK); }
            else if (t < s(7)) { txt(c, x + 55, y - 55, font('inter', 900, 64), '#fff', { a: kk }); txt(m, x + 55, y + 45, font('bebas', 400, 38), '#cfd', { a: kk }); }
          });
          if (t > s(7) + 0.6) neon('TRY → POEM', W / 2, 1830, 70, PINK, t, s(7) + 0.6);
        }
      } else if (t < s(9)) {
        header(t, 2, 'MANDARIN', '普通话', s(8), PINK);
        const tones = [['mā', 'MOTHER'], ['má', 'HEMP'], ['mǎ', 'HORSE'], ['mà', 'SCOLD']];
        const tr = p(8, 3) || s(8) + 2.0;
        if (t > s(8) + 0.6 && t < tr + 0.5) tones.forEach(([w, m], i) => { const t0 = s(8) + 0.6 + i * 0.12; if (t < t0) return; const kk = back(lin(t, t0, t0 + 0.2)); const x = 160 + i * 253;
          X.save(); X.translate(x, 1420); X.scale(kk, kk); box(-115, -140, 230, 260, i % 2 ? CYAN : PINK); txt(w, 0, -30, font('inter', 900, 110), '#fff'); txt(m, 0, 70, font('bebas', 400, 46), '#fff'); X.restore(); });
        if (t > tr) { const chars = '的一是不了人我在有他这为之大来以个中上们到说国和地也子时道出而要于就下得可你年生自会那后能对着事其里所去行过家十用发天如然作方成者多日都三小军二无同么经法当起与好看学进种将还分此心前面又定见只主没公从'.split('');
          X.save(); X.beginPath(); X.rect(0, 1150, W, 770); X.clip();
          for (let i = 0; i < 60; i++) { const sp = 700 + hash(i) * 900; const y = 1100 + (((t - tr) * sp + hash(i * 3) * 900) % 900) - (t - tr < 0.6 ? (0.6 - (t - tr)) * 1500 : 0); const x = hash(i * 7) * W; if (y < 1100 || y > 1950) continue;
            txt(chars[i % chars.length], x, y, font('inter', 900, 50 + hash(i * 5) * 70), hash(i * 9) > 0.5 ? PINK : CYAN, { glow: '#fff', gb: 10 }); }
          X.restore(); neon('THOUSANDS OF CHARACTERS', W / 2, 1520, 74, '#fff', t, tr + 0.2); }
      } else if (t < s(11)) {
        if (t < t1) { neon('AND NUMBER ONE…', W / 2, H / 2, 110, '#fff', t, s(9)); }
        else {
          header(t, 1, 'JAPANESE', '日本語', t1, CYAN);
          if (t > s(10)) {
            const sys = [['あ', 'HIRAGANA', PINK], ['ア', 'KATAKANA', CYAN], ['漢', 'KANJI', VIO]];
            const tp = p(10, 1) || s(10) + 1.4;
            if (t < tp + 0.1) sys.forEach(([c, lab, col], i) => { const t0 = s(10) + i * 0.3; if (t < t0) return; const kk = back(lin(t, t0, t0 + 0.22)); const x = 200 + i * 340;
              X.save(); X.translate(x, 1450); X.scale(kk, kk); box(-140, -170, 280, 330, col); txt(c, 0, -30, font('inter', 900, 190), '#fff', { glow: col }); txt(lab, 0, 110, font('bebas', 400, 50), '#fff', { ls: 3 }); X.restore(); });
            else { const rows = [['FRIEND', '食べる', CYAN], ['STRANGER', '食べます', PINK], ['YOUR BOSS', '召し上がる', VIO]];
              rows.forEach(([who, w, col], i) => { const t0 = tp + i * 0.3; if (t < t0) return; const kk = eo(lin(t, t0, t0 + 0.2)); const y = 1250 + i * 200;
                X.save(); X.globalAlpha *= kk; X.translate((1 - kk) * 300, 0); box(80, y - 75, 920, 150, col); txt(who, 120, y, font('bebas', 400, 64), col, { align: 'left' }); txt(w, 960, y, font('inter', 900, 80), '#fff', { align: 'right' }); X.restore(); });
              neon('"TO EAT"', W / 2, 1830, 60, '#fff', t, tp); }
          }
        }
      } else if (t < s(12)) {
        const k = eo(lin(t, s(11) + 0.1, s(11) + 1.3)); const v = Math.round(2200 * k);
        neon('EACH ONE', W / 2, 520, 110, CYAN, t, s(11));
        txt('≈' + v.toLocaleString('en'), W / 2, 820, font('anton', 400, 300), '#fff', { glow: PINK, gb: 50 });
        neon('CLASS HOURS', W / 2, 1080, 120, PINK, t, s(11) + 0.3);
        if (t > s(11) + 1.3) txt('vs ≈600 for Spanish', W / 2, 1230, font('bebas', 400, 70), '#bbb', { a: eo(lin(t, s(11) + 1.3, s(11) + 1.6)) });
      } else if (t < s(13)) {
        neon('HARD?', 330, 600, 190, PINK, t, s(12)); if (t > (p(12, 1) || s(12) + 0.5)) neon('YES.', 780, 600, 190, '#fff', t, p(12, 1) || s(12) + 0.5);
        neon('IMPOSSIBLE?', W / 2, 900, 150, CYAN, t, p(12, 2) || s(12) + 0.9);
        if (t > (p(12, 3) || s(12) + 1.3)) { const kk = back(lin(t, p(12, 3) || s(12) + 1.3, (p(12, 3) || s(12) + 1.3) + 0.25)); X.save(); X.translate(W / 2, 1250); X.scale(kk, kk); txt('NO.', 0, 0, font('anton', 400, 360), '#fff', { glow: CYAN, gb: 70 }); X.restore(); }
      } else {
        neon('ALL FIVE', W / 2, 1240, 150, CYAN, t, s(13) + 0.05);
        neon('ARE ON', W / 2, 1400, 110, '#fff', t, s(13) + 0.25);
        const kk = back(lin(t, s(13) + 0.4, s(13) + 0.75)); X.save(); X.translate(W / 2, 1620); X.scale(kk, kk); X.shadowColor = PINK; X.shadowBlur = 60; logo(-310, 0, 70); X.shadowBlur = 0; X.restore();
        neon('Borderless', W / 2 + 50, 1620, 130, PINK, t, s(13) + 0.45, { f: 'inter' });
      }
      X.restore();
      // source line, always visible after the intro
      txt('Based on US Foreign Service Institute estimates', W / 2, 1880, font('inter', 600, 28), 'rgba(255,255,255,0.55)');
      HOST.peeks(t, PEEKS);
    },
  };
})();
