// 5B · "What €9,99 actually gets you" — a receipt prints, line by line, everything that's in it.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const L = await loadTimeline('5b');
  const s = (n) => L[n].start, e = (n) => L[n].end, w = (n, word) => wt(L, n, word);
  const END = e(10) + 0.2, DUR = END + 2.2; window.DURATION = DUR;
  const tPaid = e(9) - 0.35;
  // receipt lines: [print time, left, right, sub]
  const RL = [
    [s(2) + 0.1, '1 × COURSE', '€9,99', 'any of 74 languages'],
    [s(3) + 0.05, 'INTRO CHAT', 'incl.', 'why you are learning'],
    [s(4) + 0.05, 'LEVEL TEST', 'incl.', 'start where you are'],
    [s(5) + 0.1, '50 LESSONS', 'incl.', 'written one at a time'],
    [s(6) + 0.05, 'PASSPORT', 'incl.', 'fills up as you learn'],
    [s(7) + 0.05, 'FIRST 14 DAYS', '€0,00', 'of lessons'],
    [s(8) + 0.1, 'THEN, PER MONTH', '€5,99', 'for all your courses'],
    [s(9) + 0.05, 'YOUR LESSONS', 'kept', 'forever'],
    [tPaid - 0.45, 'TODAY', '€9,99', null],
  ];
  const LH = 132, SLOT = 1210, HD = 3.0;
  const cues = [];
  const printSnd = (t0, d = 0.32) => { for (let t = t0; t < t0 + d; t += 0.028) cues.push(['tick', t, 0.5 + hash(t * 37) * 0.3]); };
  cues.push(['impact', 0.1, 0.7], ['whoosh', s(1) + 0.02, 0.5], ['pop', w(1, 'actually'), 0.4]); printSnd(0.15, 0.6);
  RL.forEach((r) => printSnd(r[0]));
  const langT = (i) => s(2) + 0.65 + i * 0.2;
  for (let i = 0; i < 12; i++) cues.push(['pop', langT(i), 0.3]);
  cues.push(['plop', s(3) + 0.25, 0.6], ['plop', s(3) + 0.7, 0.5], ['click', s(3) + 1.3, 0.6], ['tick', s(4) + 0.4, 0.5], ['tick', s(4) + 0.55, 0.5], ['tick', s(4) + 0.7, 0.5], ['stamp', w(4, 'hello'), 0.7]);
  for (let i = 0; i < 7; i++) cues.push(['page', s(5) + 0.35 + i * 0.36, 0.5]);
  for (let i = 0; i < 4; i++) cues.push(['stamp', s(6) + 0.4 + i * 0.32, 0.55]);
  for (let i = 0; i < 14; i++) cues.push(['tick', s(7) + 0.3 + i * 0.08, 0.6]);
  cues.push(['ding', w(7, 'included'), 0.5], ['pop', s(8) + 0.2, 0.5], ['pop', w(8, 'all'), 0.5], ['pop', w(8, 'all') + 0.18, 0.5], ['pop', w(8, 'all') + 0.36, 0.5], ['swell', w(9, 'forever'), 0.4], ['impact', w(9, 'forever'), 0.5],
    ['stamp', tPaid, 0.9], ['kaching', tPaid + 0.05, 0.6], ['scratch', s(10) - 0.35, 0.3], ['whoosh', s(10) - 0.2, 0.8], ['coin', s(10), 0.6]);
  window.CUES = { dur: DUR, cues, sfx_gain: 0.34 };
  const hits = [w(1, 'nine'), w(4, 'hello'), tPaid];
  const beats = [s(1), w(1, 'nine'), ...RL.map((r) => r[0]), w(2, 'any'), w(5, 'written'), w(7, 'included'), w(8, 'all'), w(9, 'forever')];

  // ---------- the receipt ----------
  function printed(t) { let n = 0, k = 0; for (const r of RL) { if (t >= r[0]) { n++; k = eo(lin(t, r[0], r[0] + 0.32)); } } return (n ? n - 1 + k : 0) + HD * eo(lin(t, 0.1, 0.8)); } // lines out incl. header
  function receipt(t) {
    const out = printed(t);
    const hx = 190, rw = 700, top = SLOT - 30;
    X.save(); X.beginPath(); X.rect(0, SLOT, W, H - SLOT); X.clip();
    const y0 = SLOT + out * LH - HD * LH; // y of the header top on paper; lines printed later are nearer the slot
    // paper: from the slot down to the header (end of the paper) + zigzag bottom
    const bottom = SLOT + out * LH + 40;
    X.fillStyle = 'rgba(31,26,20,0.12)'; X.fillRect(hx + 10, SLOT, rw, bottom - SLOT + 10);
    X.fillStyle = '#fffefa'; X.beginPath(); X.moveTo(hx, SLOT); X.lineTo(hx + rw, SLOT); X.lineTo(hx + rw, bottom);
    for (let i = 0; i <= 20; i++) X.lineTo(hx + rw - i * rw / 20, bottom + (i % 2 ? 16 : 0)); X.closePath(); X.fill();
    X.fillStyle = 'rgba(0,0,0,0.04)'; for (let i = 0; i < 40; i++) X.fillRect(hx, SLOT + ((i * 97) % 900), rw, 1);
    // header (printed first, so lowest)
    const hy = bottom - HD * LH;
    logo(hx + rw / 2, hy + 100, 54); txt('BORDERLESS', hx + rw / 2, hy + 200, font('mono', 700, 52), P5.ink, { ls: 6 });
    txt('one course · built around you', hx + rw / 2, hy + 255, font('mono', 400, 28), P5.ink3);
    txt('- - - - - - - - - - - - - - - - - - -', hx + rw / 2, hy + 330, font('mono', 700, 30), P5.ink3);
    RL.forEach((r, i) => {
      if (t < r[0]) return;
      const y = bottom - HD * LH - (i + 1) * LH;
      X.save(); X.textBaseline = 'middle';
      if (i === RL.length - 1) { X.fillStyle = P5.ink; X.fillRect(hx + 40, y + 16, rw - 80, 4); }
      X.font = font('mono', 700, i === RL.length - 1 ? 58 : 44); X.fillStyle = P5.ink; X.textAlign = 'left'; X.fillText(r[1], hx + 44, y + (r[3] ? 52 : 70));
      X.textAlign = 'right'; X.fillStyle = r[2].startsWith('€') ? P5.acc : P5.ink2; X.fillText(r[2], hx + rw - 44, y + (r[3] ? 52 : 70));
      if (r[3]) { X.font = font('mono', 400, 30); X.fillStyle = P5.ink3; X.textAlign = 'left'; X.fillText(r[3], hx + 44, y + 98); }
      X.restore();
    });
    if (t > tPaid) stamp5(t, tPaid, 'PAID', hx + rw / 2 + 20, bottom - HD * LH - 9 * LH + 140, 96, P5.red, -0.14);
    X.restore();
    // the printer
    X.fillStyle = 'rgba(31,26,20,0.18)'; rr(110, SLOT - 120 + 14, 860, 140, 40); X.fill();
    X.fillStyle = '#2a2420'; rr(100, SLOT - 120, 880, 140, 40); X.fill(); X.fillStyle = '#3a332d'; rr(100, SLOT - 120, 880, 60, [40, 40, 0, 0]); X.fill();
    X.fillStyle = '#0d0b0a'; rr(170, SLOT - 18, 740, 22, 11); X.fill();
    const busy = RL.some((r) => t >= r[0] && t < r[0] + 0.35) || t < 0.75; X.fillStyle = busy ? '#6fe08f' : '#3d6a4a'; X.beginPath(); X.arc(920, SLOT - 88, 12, 0, 7); X.fill();
    X.font = font('mono', 700, 24); X.fillStyle = '#8a8178'; X.textAlign = 'left'; X.fillText('RECEIPT', 150, SLOT - 82);
  }
  // ---------- the top half, one illustration per line ----------
  const GREET = ['Hola', 'Bonjour', 'Ciao', 'こんにちは', 'Olá', 'Merhaba', 'Hej', 'Привет', 'مرحبا', '안녕하세요', 'Hallo', 'Γεια σου'];
  function top(t) {
    const cy = 690;
    if (t < s(2)) {
      hd(t, 0.12, "HERE'S WHAT", 540, 280, 76, P5.ink2);
      extrudeSlam(t, 0.08, '€9,99', 540, 560, I5(900, 230), P5.acc, P5.acc2, 26, { swing: 0.7 });
      hd(t, w(1, 'actually'), 'ACTUALLY GETS YOU.', 540, 850, 80, P5.ink, { from: 1.15 });
    } else if (t < s(3)) {
      const roll = Math.min(74, Math.floor(eo(lin(t, w(2, 'any'), w(2, 'any') + 1.2)) * 74));
      GREET.forEach((g, i) => { if (t < langT(i)) return; const a = i / GREET.length * Math.PI * 2 + t * 0.4, R = 330 + (i % 2) * 40; const k = back(lin(t, langT(i), langT(i) + 0.25), 2.2);
        chip(g, 540 + Math.cos(a) * R, cy + Math.sin(a) * R * 0.62, 36, P5.ink, '#fff', 1, k); });
      hd(t, s(2), 'ONE COURSE.', 540, 230, 96, P5.ink);
      if (t > w(2, 'any')) { txt(String(Math.max(1, roll)), 540, cy - 20, I5(900, 220), P5.acc); txt('LANGUAGES', 540, cy + 110, I5(900, 48), P5.ink2, { ls: 4 }); }
    } else if (t < s(4)) {
      hd(t, s(3), 'A QUICK CHAT.', 540, 220, 96, P5.ink); const k = back(lin(t, s(3), s(3) + 0.3), 1.6); X.save(); X.translate(540, cy + 60); X.scale(k * 0.9, k * 0.9);
      card(-400, -330, 800, 640, {}); bub(t, s(3) + 0.25, 99, 'Why are you learning?', 0, -200, { size: 48, tail: -0.3 });
      ['Moving abroad', 'My partner', 'A new job'].forEach((o, i) => { const t0 = s(3) + 0.7 + i * 0.12; if (t < t0) return; const sel = i === 0 && t > s(3) + 1.3;
        chip(o, i === 2 ? 0 : (i ? 170 : -170), i === 2 ? 210 : 50, 40, sel ? '#fff' : P5.ink, sel ? P5.acc : '#f1e9dc', 1, back(lin(t, t0, t0 + 0.2), 2), { shadow: false }); });
      X.restore();
    } else if (t < s(5)) {
      hd(t, s(4), 'A LEVEL TEST.', 540, 230, 96, P5.ink);
      const k = eo(lin(t, s(4) + 0.3, s(4) + 0.9)) * 2.5 / 6; const x = 160, y = cy + 40, wd = 760;
      X.fillStyle = P5.line; rr(x, y, wd, 26, 13); X.fill(); X.fillStyle = P5.acc; rr(x, y, wd * k, 26, 13); X.fill();
      ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach((l, i) => txt(l, x + wd * (i + 0.5) / 6, y + 76, I5(800, 38), i === 2 && k > 0.35 ? P5.acc : P5.ink3));
      const mx = x + wd * k; X.fillStyle = P5.ink; X.beginPath(); X.moveTo(mx - 22, y - 50); X.lineTo(mx + 22, y - 50); X.lineTo(mx, y - 14); X.closePath(); X.fill();
      if (t > w(4, 'hello') - 0.2) { txt('Hello.', 540, cy - 170, I5(800, 90), P5.ink3); }
      if (t > w(4, 'hello')) { const p = eo(lin(t, w(4, 'hello'), w(4, 'hello') + 0.15)); X.strokeStyle = P5.red; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(400, cy - 170); X.lineTo(400 + 280 * p, cy - 170); X.stroke();
        stamp5(t, w(4, 'hello') + 0.1, 'SKIPPED', 760, cy - 230, 44, P5.red, 0.12); }
    } else if (t < s(6)) {
      hd(t, s(5), '50 LESSONS.', 540, 220, 110, P5.ink); hd(t, w(5, 'one at'), 'ONE AT A TIME.', 540, 330, 76, P5.acc);
      for (let i = 0; i < 7; i++) { const t0 = s(5) + 0.35 + i * 0.36; if (t < t0) continue; const k = eo(lin(t, t0, t0 + 0.25)); const ang = (i - 3) * 0.09;
        X.save(); X.translate(mix(1200, 540 + (i - 3) * 30, k), cy + 140 - i * 6); X.rotate(ang * k); X.translate(-540, -(cy + 140));
        lessonCard(t, 540, cy + 140, 420, 440, { kicker: 'LESSON ' + (i + 1), title: ['Hello', 'At the café', 'Your street', 'Your work', 'Small talk', 'The doctor', 'Your flat'][i], ts: 48, bars: 3, shadow: true });
        X.restore(); }
      if (t > w(5, 'one at')) chip('next one: written after this one', 540, cy + 440, 32, '#fff', P5.ink, cl((t - w(5, 'one at')) * 5));
    } else if (t < s(7)) {
      hd(t, s(6), 'A PASSPORT.', 540, 220, 110, P5.ink);
      const k = back(lin(t, s(6), s(6) + 0.3), 1.6); X.save(); X.translate(540, cy + 80); X.scale(k, k);
      X.fillStyle = 'rgba(31,26,20,0.15)'; rr(-372, -232, 760, 480, 24); X.fill();
      X.fillStyle = P5.pass; rr(-380, -240, 760, 480, 24); X.fill(); X.fillStyle = '#f7efdd'; rr(-360, -222, 350, 444, 12); X.fill(); rr(10, -222, 350, 444, 12); X.fill();
      X.strokeStyle = 'rgba(168,81,43,0.15)'; X.lineWidth = 2; for (let i = 0; i < 9; i++) { X.beginPath(); X.moveTo(-340, -180 + i * 48); X.lineTo(-30, -180 + i * 48); X.moveTo(30, -180 + i * 48); X.lineTo(340, -180 + i * 48); X.stroke(); }
      const ST = [[-185, -90, 'LESSON 1', '#2f6f73', -0.2], [190, -110, 'LESSON 2', P5.acc, 0.15], [-170, 110, 'LESSON 3', '#6b4fa0', 0.12], [180, 100, 'LESSON 4', '#3f7f45', -0.15]];
      ST.forEach(([x, y, l, c, r], i) => { const t0 = s(6) + 0.4 + i * 0.32; if (t < t0) return; const p = eo(lin(t, t0, t0 + 0.14)); X.save(); X.translate(x, y); X.rotate(r); X.scale(mix(2, 1, p), mix(2, 1, p)); X.globalAlpha *= p * 0.9;
        X.strokeStyle = c; X.lineWidth = 7; X.beginPath(); X.arc(0, 0, 90, 0, 7); X.stroke(); X.beginPath(); X.arc(0, 0, 72, 0, 7); X.stroke(); txt(l, 0, 0, I5(900, 26), c); X.restore(); });
      X.restore();
    } else if (t < s(8)) {
      hd(t, s(7), 'FIRST 14 DAYS', 540, 220, 100, P5.ink); hd(t, w(7, 'included'), 'INCLUDED.', 540, 330, 96, P5.acc);
      for (let i = 0; i < 14; i++) { const x = 230 + (i % 7) * 103, y = cy + 20 + Math.floor(i / 7) * 120; const t0 = s(7) + 0.3 + i * 0.08; const on = t > t0;
        X.fillStyle = on ? P5.acc : '#fff'; rr(x - 44, y - 50, 88, 100, 16); X.fill(); txt(String(i + 1), x, y - 14, I5(800, 34), on ? '#fff' : P5.ink3);
        if (on) { X.strokeStyle = '#fff'; X.lineWidth = 6; X.lineCap = 'round'; X.beginPath(); X.moveTo(x - 14, y + 20); X.lineTo(x - 4, y + 30); X.lineTo(x + 16, y + 12); X.stroke(); } }
    } else if (t < s(9)) {
      hd(t, s(8), 'THEN €5,99', 540, 220, 110, P5.acc); txt('a month', 540, 320, I5(800, 50), P5.ink2, { a: cl((t - s(8) - 0.3) * 4) });
      const ta = w(8, 'all');
      ['Spanish', 'Japanese', 'Italian'].forEach((c, i) => { const t0 = ta + i * 0.18; if (t < t0) return; chip(c, 540 + (i - 1) * 290, cy + 120, 44, P5.ink, '#fff', 1, back(lin(t, t0, t0 + 0.22), 2)); });
      if (t > ta + 0.5) { const p = eo(lin(t, ta + 0.5, ta + 0.8)); X.strokeStyle = P5.acc; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(150, cy + 210); X.lineTo(150, cy + 240); X.lineTo(150 + 780 * p, cy + 240); X.lineTo(150 + 780 * p, cy + 210); X.stroke();
        txt('ONE SUBSCRIPTION', 540, cy + 300, I5(900, 40), P5.acc, { a: p, ls: 3 }); }
      hd(t, ta, 'FOR ALL YOUR COURSES.', 540, cy - 80, 66, P5.ink);
    } else if (t < s(10)) {
      hd(t, s(9), 'EVERY LESSON', 540, 220, 100, P5.ink); hd(t, w(9, 'stays'), 'STAYS YOURS.', 540, 330, 100, P5.acc);
      for (let i = 0; i < 5; i++) { X.save(); X.translate(540 + (i - 2) * 26, cy + 160 - i * 26); lessonCard(t, 0, 0, 520, 340, { kicker: 'LESSON ' + (46 + i), title: ['Your notice', 'Moving out', 'The deposit', 'Goodbyes', 'What\'s next'][i], ts: 44, bars: 2, a: 1 }); X.restore(); }
      if (t > w(9, 'forever')) { const k = back(lin(t, w(9, 'forever'), w(9, 'forever') + 0.3), 2); X.save(); X.translate(830, cy - 10); X.scale(k, k); X.fillStyle = P5.ink; X.beginPath(); X.arc(0, 0, 110, 0, 7); X.fill(); txt('∞', 0, -6, I5(900, 130), '#fff'); X.restore(); }
    }
  }
  window.SCENE = {
    frame(t) {
      X.save(); camera(t, hits, [], 14); punch5(t, beats, 0.02, 0.14);
      bg5(t);
      // camera follows the paper down at the end
      const pan = ei(lin(t, tPaid - 0.3, tPaid + 0.1)) * 0 + 0;
      top(t); receipt(t);
      X.restore();
      endCard(t, s(10), 'A course built around you.', { tagAt: w(10, 'course') - s(10), price: '€9,99 per course · then €5,99 a month' });
      grain(t, 0.03);
    },
  };
})();
