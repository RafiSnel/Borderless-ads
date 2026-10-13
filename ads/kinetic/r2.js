// R2 · Borderless motion reel 02 — op "Midnight Club" (128 BPM, ±41 s). Uitbreiding van r1 met nieuwe informatie:
// rollenspel dat terugpraat op jouw niveau, nakijken wat je schrijft, elke les gebouwd op de vorige, de prijsopbouw.
// Elke knip en elke klap valt op een slag die uit het liedje is gemeten (song/…): slag n = V0 + n · B.
window.ready = (async () => {
  await loadFonts(); await loadImages({ logo: 'app/logo512.png' });
  const BPM = 128, B = 60 / BPM, V0 = 0.25, b = (n) => V0 + n * B; // V0 = gemeten fase (0,272 s) min 20 ms: beeld een fractie vóór geluid
  const DUR = b(87) + 0.3; window.DURATION = DUR;
  const { K, K2, OR, BL, CR, WH, GR } = KN;
  const IF = KF, MONO = KM;
  // gemeten uit de audio: 808-klappen (groot), kicks, claps; stiltes waarin het beeld bevriest
  const BIG = [0, 5, 16, 19, 35, 37, 48, 51, 67, 69, 80, 83];
  const KICK = [8, 13, 15, 24, 27, 29, 31, 32, 40, 45, 47, 53, 56, 59, 61, 63, 64, 72, 77, 79, 85];
  const CLAP = [2, 6, 10, 14, 18, 22, 26, 30, 34, 36.5, 38, 42, 44.5, 46, 50, 51.5, 54, 58, 62, 66, 68.5, 70, 74, 76.5, 78, 82, 83.5, 86];
  const HOLD = [[b(3), b(4.6)], [b(36), b(36.5)], [b(68), b(68.5)]];
  const frz = (t) => { for (const [a, c] of HOLD.slice(1)) if (t >= a && t < c) return a; return t; };
  const held = (t) => HOLD.some(([a, c]) => t >= a && t < c);
  const pulse = (t, n, d = 0.3) => { const e = t - b(n); return e >= 0 && e < d ? 1 - e / d : 0; };
  window.CUES = { dur: DUR, cues: [], sfx_gain: 0 }; // geen geluid: Rafi legt het TikTok-geluid eronder
  const card = (bg) => { X.fillStyle = bg; X.fillRect(-90, -90, W + 180, H + 180); };
  const LIGHT = [CR, OR, WH];
  function mw(s, f, ls) { X.save(); X.font = f; const ch = [...s]; const w = ch.reduce((a, c) => a + X.measureText(c).width, 0) + ls * (ch.length - 1); X.restore(); return w; }
  function shade(hex, k) { const n = parseInt(hex.slice(1), 16); const r = n >> 16, g = (n >> 8) & 255, bb = n & 255; const f = (v) => Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k); return `rgb(${f(r)},${f(g)},${f(bb)})`; }
  function ball(x, y, r, sx = 1, sy = 1) { X.save(); X.translate(x, y); X.scale(sx, sy); const g = X.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r); g.addColorStop(0, '#ff8a5c'); g.addColorStop(1, OR); X.fillStyle = g; X.beginPath(); X.arc(0, 0, r, 0, 7); X.fill(); X.restore(); }
  function txt(s, x, y, f, col, a = 1, align = 'center') { X.save(); X.globalAlpha *= cl(a); X.font = f; X.fillStyle = col; X.textAlign = align; X.textBaseline = 'middle'; X.fillText(s, x, y); X.restore(); }

  // ---------- HUD ----------
  const SECTIONS = [[0, '01 · HELLO'], [b(16), '02 · 74 LANGUAGES'], [b(32), '03 · IT TALKS BACK'], [b(40), '04 · ROLE-PLAY'], [b(48), '05 · CHECKED'], [b(56), '06 · 50 LESSONS'], [b(64), '07 · BUILT AROUND YOU'], [b(72), '08 · THE DEAL'], [b(80), '09 · BORDERLESS']];
  function hud(t, light) {
    const col = light ? 'rgba(11,10,10,0.6)' : 'rgba(255,255,255,0.55)';
    khud(t, SECTIONS, { title: 'BORDERLESS — REEL 02', right: '128 BPM', dur: DUR, col });
    X.save(); X.globalAlpha = Math.min(1, t * 3);
    const bt = ((t - V0) / B + 64) % 1; X.fillStyle = bt < 0.18 && t > V0 - 0.02 && !held(t) ? OR : col; X.beginPath(); X.arc(W - 48 - 152, H - 70, 7, 0, 7); X.fill();
    X.font = MONO(22); X.fillStyle = col; X.textAlign = 'right'; X.textBaseline = 'middle';
    X.fillText(held(t) ? '‖ HOLD' : 'BEAT ' + String(Math.max(0, Math.floor((t - V0) / B) + 1)).padStart(2, '0'), W - 48 - 180, H - 70);
    X.restore();
  }
  // ---------- camera: zoom punch on every measured hit, shake on the 808s ----------
  function cam(t) {
    let s = 0, sh = 0;
    for (const n of BIG) { const e = t - b(n); if (e >= 0 && e < 0.3) { s = Math.max(s, 0.07 * (1 - e / 0.3) ** 2); sh = Math.max(sh, 15 * (1 - e / 0.22)); } }
    for (const n of KICK) { const e = t - b(n); if (e >= 0 && e < 0.2) s = Math.max(s, 0.028 * (1 - e / 0.2) ** 2); }
    for (const n of CLAP) { const e = t - b(n); if (e >= 0 && e < 0.16) s = Math.max(s, 0.016 * (1 - e / 0.16)); }
    sh = Math.max(0, sh);
    X.translate(W / 2 + Math.sin(t * 93) * sh, H / 2 + Math.cos(t * 71) * sh); X.scale(1 + s, 1 + s); X.translate(-W / 2, -H / 2);
  }

  // ---------- S1 · the ball: two bounces, freezes in the silence, slams into HOLA on the 808 ----------
  function s1(t) {
    card(K);
    const floorY = 1120, r = 70, top = floorY - r - 560;
    let bx = 540, by = top, sx = 1, sy = 1;
    if (t < b(0)) { const p = cl(t / b(0)); bx = mix(360, 400, p); by = mix(170, floorY - r, p * p); sy = 1 + 0.25 * p; sx = 1 - 0.12 * p; }
    else if (t < b(2)) { const p = (t - b(0)) / (2 * B); bx = mix(400, 540, p); by = floorY - r - 520 * 4 * p * (1 - p); }
    else if (t < b(3)) { const p = (t - b(2)) / B; by = floorY - r - 560 * (1 - (1 - p) * (1 - p)); }
    else if (t < b(4.6)) { by = top; }
    else if (t < b(5)) { const p = (t - b(4.6)) / (b(5) - b(4.6)); by = mix(top, 950, p * p); sy = 1 + 0.45 * p; sx = 1 - 0.2 * p; }
    for (const n of [0, 2]) { const d = t - b(n); if (d >= 0 && d < 0.12) { const q = 1 - d / 0.12; sx = 1 + q * 0.4; sy = 1 - q * 0.32; by += q * r * 0.3; } }
    // floor line draws itself, flashes on the landings, retracts on the 808
    const lw = mix(0.55, 1, eo(lin(t, 0, 0.3))) * (1 - eo(lin(t, b(5), b(5) + 0.25)));
    X.strokeStyle = `rgba(255,255,255,${0.35 + 0.5 * Math.max(pulse(t, 0, 0.2), pulse(t, 2, 0.2))})`; X.lineWidth = 3; X.beginPath(); X.moveTo(540 - 420 * lw, floorY); X.lineTo(540 + 420 * lw, floorY); X.stroke();
    if (t < b(5)) {
      ball(bx, by, r, sx, sy);
      if (t >= b(3)) { // the hold: focus brackets + a line typed into the silence
        const q = eo(lin(t, b(3), b(3) + 0.18)), g = mix(160, 112, q);
        X.save(); X.strokeStyle = `rgba(255,255,255,${0.8 * q})`; X.lineWidth = 4;
        for (const [ux, uy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { X.beginPath(); X.moveTo(bx + ux * g, by + uy * (g - 34)); X.lineTo(bx + ux * g, by + uy * g); X.lineTo(bx + ux * (g - 34), by + uy * g); X.stroke(); }
        X.restore();
        const s = typed(t, b(3) + 0.06, 'SAY HELLO.', 24); txt(s + (Math.floor(t * 6) % 2 ? '_' : ' '), 540, 1220, MONO(44), CR, 1 - lin(t, b(4.7), b(5)));
      }
      return K;
    }
    const p = t - b(5), k = ksp(t, b(5), 0.4, 0.4, 18);
    X.save(); X.translate(540, 960); const sq2 = Math.max(0, 1 - p / 0.16); X.scale(1 + sq2 * 0.14, 1 - sq2 * 0.12);
    X.font = IF(900, 300); X.textBaseline = 'middle'; X.letterSpacing = '-14px';
    const wH = X.measureText('H').width, wL = X.measureText('LA').width, oR = 112, gap = 34, total = wH + oR * 2 + wL + gap * 2;
    X.fillStyle = WH; X.textAlign = 'left';
    X.save(); X.translate(-total / 2 - (1 - k) * 460, 0); X.fillText('H', 0, 10); X.restore();
    X.save(); X.translate(-total / 2 + wH + gap * 2 + oR * 2 + (1 - k) * 460, 0); X.fillText('LA', 0, 10); X.restore();
    const ox = -total / 2 + wH + gap + oR, r0 = mix(70, oR, Math.min(1, p / 0.1));
    const sw = cl(p / 0.45); X.strokeStyle = `rgba(255,74,28,${0.85 * (1 - sw)})`; X.lineWidth = 12 * (1 - sw) + 2; X.beginPath(); X.arc(ox, -8, r0 + sw * 560, 0, 7); X.stroke();
    ball(ox, -8, r0);
    X.restore();
    txt('ES · "HELLO"', 540, 1180, MONO(28), GR, (p - 0.08) * 6);
    return K;
  }
  // ---------- S2 · greetings salvo, accelerating into the drop ----------
  const GREETS = [[6, 'SALUT', OR, K, 'FR', 'stretch'], [8, 'CIAO', K, WH, 'IT', 'spin'], [10, 'नमस्ते', CR, K, 'HI', 'snap'], [13, 'MERHABA', BL, CR, 'TR', 'drop'],
    [13.5, 'HEJ', OR, K, 'SV', 'snap'], [14, 'こんにちは', CR, K, 'JA', 'snap'], [15, '你好', K, OR, 'ZH', 'snap'], [15.5, 'OLÁ', BL, WH, 'PT', 'stretch']];
  function s2(t) {
    let g = GREETS[0]; for (const G of GREETS) if (t >= b(G[0])) g = G;
    const [n, w, bg, fg, lang, mode] = g, t0 = b(n), p = t - t0;
    card(bg);
    X.save(); X.globalAlpha = 0.08; kwall(t, w, { rows: 13, size: 150, col: fg, speed: 320, y0: 60 }); X.restore();
    const F = IF(900, [...w].length > 5 ? 210 : 300);
    kin(t, t0, w, 540, 960, F, fg, mode, { max: 980, stagger: 0.03 });
    txt(lang + ' · "HELLO"', 540, 1180, MONO(30), fg, 0.7 * cl(p * 8));
    return bg;
  }
  // ---------- S3 · 74 languages: a grid of greetings that tilts into 3D and rolls in waves on the beat ----------
  const G74 = ['Hola', 'Bonjour', 'Ciao', 'Hallo', 'Olá', 'Hej', 'Merhaba', 'Ahoj', 'Cześć', 'Szia', 'Salut', 'Hei', 'Moi', 'Tere', 'Sveiki', 'Labas', 'Zdravo', 'Bok', 'Dia duit', 'Halo', 'Xin chào', 'Kamusta', 'Jambo', 'Sawubona', 'Habari', 'Salam', 'Shalom', 'Namaste', 'Vanakkam', 'Ciao', 'Hallå', 'Kaixo', 'Bon dia', 'Saluton', 'Aloha', 'Kia ora', 'Sain uu', 'Selam', 'Barev', 'Gamarjoba', 'Privet', 'Pryvit', 'Dobar dan', 'Mirëdita', 'Yassou', 'Hæ', 'Tervist', 'Sannu', 'Molo', 'Dumela', 'Mhoro', 'Ndewo', 'Ẹ n lẹ', 'Salama', 'Sabaidee', 'Suostei', 'Mingalaba', 'Nǐ hǎo', 'Annyeong', 'Konnichiwa', 'Sawasdee', 'Selamat', 'Marhaba', 'Ola', 'Moien', 'Bonghjornu', 'Demat', 'Helo', 'Haai', 'Goddag', 'Hoi', 'Servus', 'Grüezi', 'Buna'];
  const COLS = 7, ROWS = 9, TS = 146, CH = 4 * COLS + 3, TC = [OR, BL, CR, '#1d1b1a'];
  // ripples: [beat, origin col, origin row, height px] — each one starts on a measured hit
  const WAVES = [[19, 0, 0, 380], [22, -3, -4, 300], [24, 3, 4, 330], [26, 0, 0, 360], [27, -3, 4, 290], [29, 3, -4, 340]];
  function tileH(c, r, t) {
    const x = c - (COLS - 1) / 2, y = r - (ROWS - 1) / 2;
    let h = 26 + 22 * Math.sin(Math.hypot(x, y) * 0.9 - (t - b(19)) * 4);
    for (const [n, ox, oy, amp] of WAVES) { const e = t - b(n); if (e < 0 || e > 1.8) continue; const d = Math.hypot(x - ox, y - oy); h += amp * Math.exp(-((d - e * 9) ** 2) / 1.6) * Math.exp(-e * 1.1); }
    return h;
  }
  function s3(t) {
    card(K);
    const iso = eio(lin(t, b(19), b(20.3))) * (1 - eio(lin(t, b(30.4), b(31))));
    const col = eio(lin(t, b(30), b(30.8))), flat = 1 - eio(lin(t, b(29.4), b(30.1)));
    const ang = iso * (-Math.PI / 4 + 0.4 * eio(lin(t, b(20), b(30)))), ca = Math.cos(ang), sa = Math.sin(ang), sq = mix(1, 0.56, iso), zs = 1;
    const cx0 = 540, cy0 = mix(1140, 1210, iso);
    const P = (x, y) => [(x * ca - y * sa) * zs, (x * sa + y * ca) * sq * zs];
    const tiles = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c; const [px, py] = P((c - (COLS - 1) / 2) * TS * (1 - col), (r - (ROWS - 1) / 2) * TS * (1 - col));
      tiles.push({ i, ch: i === CH ? 1 : 0, px, py, h: tileH(c, r, t) * iso * flat });
    }
    tiles.sort((a, c) => (a.ch - c.ch) || (a.py - c.py));
    const s0 = (TS - 14) / 2;
    for (const T of tiles) {
      let a = 1, s = s0;
      if (!T.ch) a = 1 - cl((col - 0.55) / 0.4); else s = mix(s0, 90, col) * (1 + 0.2 * Math.sin(cl((t - b(31)) / 0.3) * Math.PI));
      if (a <= 0) continue;
      const color = T.ch ? OR : TC[(T.i * 7 + 3) % 4], ink = color === CR ? K : WH;
      X.save(); X.globalAlpha = a; X.translate(cx0 + T.px, cy0 + T.py);
      const cs = [[-s, -s], [s, -s], [s, s], [-s, s]].map(([x, y]) => P(x, y)), hh = T.h;
      if (hh > 0.5) {
        const faces = [0, 1, 2, 3].map((j) => { const p1 = cs[j], p2 = cs[(j + 1) % 4]; return { p1, p2, my: (p1[1] + p2[1]) / 2, mx: (p1[0] + p2[0]) / 2 }; }).sort((f, g) => f.my - g.my);
        for (const f of faces) { X.fillStyle = shade(color, f.mx > 0 ? -0.45 : -0.25); X.beginPath(); X.moveTo(f.p1[0], f.p1[1]); X.lineTo(f.p2[0], f.p2[1]); X.lineTo(f.p2[0], f.p2[1] - hh); X.lineTo(f.p1[0], f.p1[1] - hh); X.closePath(); X.fill(); }
      }
      X.translate(0, -hh); X.transform(ca * zs, sa * sq * zs, -sa * zs, ca * sq * zs, 0, 0);
      X.fillStyle = color; rr(-s, -s, s * 2, s * 2, 12); X.fill();
      const fs = 28 * s / s0; X.font = IF(800, fs); X.fillStyle = ink; X.textAlign = 'center'; X.textBaseline = 'middle';
      const g = G74[(T.i - CH + 74) % 74]; const tw = X.measureText(g).width; if (tw > s * 1.8) X.scale(s * 1.8 / tw, s * 1.8 / tw); X.fillText(g, 0, 2);
      X.restore();
    }
    // readability shade + counter
    const gr = X.createLinearGradient(0, 0, 0, 520); gr.addColorStop(0, 'rgba(11,10,10,0.92)'); gr.addColorStop(1, 'rgba(11,10,10,0)'); X.fillStyle = gr; X.fillRect(-90, -90, W + 180, 610);
    if (t < b(30)) {
      const a = 1 - lin(t, b(29.6), b(30));
      const n = Math.min(74, Math.max(1, Math.floor(eo(lin(t, b(16), b(19))) * 74)));
      const k = t >= b(19) ? ksp(t, b(19), 0.4, 0.4, 18) : 1;
      X.save(); X.globalAlpha = a; X.translate(540, 235); const sc = t >= b(19) ? mix(1.7, 1, k) : 1; X.scale(sc, sc); kword(String(n), 0, 0, IF(900, 230), n === 74 ? WH : CR, null, {}); X.restore();
      txt('LANGUAGES', 540, 372, MONO(32), OR, a);
    } else kin(t, b(30), 'PICK ONE.', 540, 300, IF(900, 170), WH, 'snap', { max: 980 });
    return K;
  }
  // ---------- S4 · the tile opens into a role-play: it talks back, at your level ----------
  function bubble(t, t0, text, side, y, bg, ink) {
    if (t < t0) return;
    const k = ksp(t, t0, 0.42, 0.45, 16);
    X.save(); X.font = IF(700, 46); const w = X.measureText(text).width + 72, h = 100, x = side === 'L' ? 140 : 940 - w, ax = side === 'L' ? x : x + w, ay = y + h;
    X.translate(ax, ay); X.scale(mix(0.3, 1, k), mix(0.3, 1, k)); X.translate(-ax, -ay); X.globalAlpha *= cl(k * 3);
    X.fillStyle = bg; rr(x, y, w, h, 44); X.fill();
    X.fillStyle = ink; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, x + 36, y + h / 2 + 2);
    X.restore();
  }
  function dots(t, t0, t1, y) {
    if (t < t0 || t >= t1) return; const a = cl((t - t0) * 6);
    X.save(); X.globalAlpha = a; X.fillStyle = CR; rr(140, y, 150, 100, 44); X.fill();
    for (let j = 0; j < 3; j++) { const ph = ((t - V0) / (B / 2) + j * 0.33) % 1; X.fillStyle = K; X.beginPath(); X.arc(180 + j * 35, y + 50 - 10 * Math.max(0, Math.sin(ph * Math.PI * 2)), 9, 0, 7); X.fill(); }
    X.restore();
  }
  function s4(t) {
    card(K);
    const k = ksp(t, b(32), 0.5, 0.55, 13), q = cl(k);
    const pw = mix(180, 900, q), ph = mix(180, 940, q), px = mix(450, 90, q), py = mix(1050, 660, q);
    X.fillStyle = K2; rr(px, py, pw, ph, mix(12, 44, q)); X.fill();
    X.save(); X.globalAlpha = 1 - cl(k * 1.6); X.fillStyle = OR; rr(px, py, pw, ph, mix(12, 44, q)); X.fill(); X.globalAlpha *= 1; txt('Hola', px + pw / 2, py + ph / 2 + 2, IF(800, 38), WH, 1 - cl(k * 3)); X.restore();
    X.save(); X.strokeStyle = 'rgba(255,255,255,0.08)'; X.lineWidth = 2; rr(px, py, pw, ph, mix(12, 44, q)); X.stroke(); X.restore();
    // "PICK ONE." leaves upward
    if (t < b(32) + 0.4) { const e = cl((t - b(32)) / 0.35); X.save(); X.globalAlpha = 1 - e; kword('PICK ONE.', 540, 300 - eo(e) * 260, IF(900, 170), WH, null, { max: 980 }); X.restore(); }
    const ha = cl((k - 0.55) * 3);
    if (ha > 0) {
      X.save(); X.globalAlpha = ha;
      X.fillStyle = CR; X.beginPath(); X.arc(180, 745, 38, 0, 7); X.fill(); txt('L', 180, 747, IF(900, 40), K);
      txt('Lucía', 240, 726, IF(800, 40), WH, 1, 'left'); txt('ROLE-PLAY · CAFÉ · MADRID', 240, 768, MONO(22), GR, 1, 'left');
      X.fillStyle = 'rgba(255,255,255,0.08)'; X.fillRect(130, 820, 820, 2);
      X.fillStyle = 'rgba(255,255,255,0.06)'; rr(130, 1490, 820, 80, 40); X.fill();
      let inp = ''; if (t >= b(33) && t < b(34)) inp = typed(t, b(33), 'Un café, por favor.', 22); if (t >= b(37.1) && t < b(38)) inp = typed(t, b(37.1), 'Con leche. ¡Gracias!', 26);
      txt(inp ? inp + (Math.floor(t * 8) % 2 ? '|' : ' ') : 'Type in Spanish…', 170, 1530, inp ? IF(600, 38) : MONO(24), inp ? WH : GR, 1, 'left');
      X.restore();
    }
    bubble(t, b(32) + 0.12, '¡Hola! ¿Qué te pongo?', 'L', 870, CR, K);
    bubble(t, b(34), 'Un café, por favor.', 'R', 1000, OR, K);
    dots(t, b(34.6), b(36.5), 1130);
    bubble(t, b(36.5), '¿Solo o con leche?', 'L', 1130, CR, K);
    bubble(t, b(38), 'Con leche. ¡Gracias!', 'R', 1260, OR, K);
    dots(t, b(38.6), b(40), 1390);
    // level chip stamps on the 808
    if (t >= b(37)) { const kc = ksp(t, b(37), 0.35, 0.45, 20); X.save(); X.translate(880, 745); X.rotate(-0.08 * (1 - cl(kc))); X.scale(mix(2.6, 1, kc), mix(2.6, 1, kc)); X.globalAlpha = cl((t - b(37)) * 12);
      X.fillStyle = OR; rr(-70, -32, 140, 64, 32); X.fill(); txt('A2', 0, 2, IF(900, 38), K); X.restore();
      const sw = cl((t - b(37)) / 0.4); X.save(); X.strokeStyle = `rgba(255,74,28,${0.8 * (1 - sw)})`; X.lineWidth = 8 * (1 - sw) + 2; X.beginPath(); X.arc(880, 745, 60 + sw * 260, 0, 7); X.stroke(); X.restore(); }
    // headline, one word-group per hit
    kin(t, b(35), 'IT TALKS', 540, 290, IF(900, 150), WH, 'snap', { max: 980 });
    kin(t, b(36.5), 'BACK.', 540, 430, IF(900, 150), OR, 'drop', { max: 980 });
    kin(t, b(38), 'AT YOUR LEVEL.', 540, 565, IF(900, 66), CR, 'rise', { max: 980 });
    return K;
  }
  // ---------- S5 · role-play scenes, a salvo on the beat ----------
  const VERBS = [[40, 'ORDER.', OR, K, 'Dos cafés, por favor.', 'ES · CAFÉ'], [42, 'COMPLAIN.', K, WH, 'Das Wasser ist kalt.', 'DE · HOTEL'],
    [44.5, 'FLIRT.', CR, OR, 'Tu viens souvent ici ?', 'FR · BAR'], [46, 'NEGOTIATE.', BL, CR, 'もう少し安くなりませんか？', 'JA · MARKET']];
  function s5(t) {
    let v = VERBS[0]; for (const V of VERBS) if (t >= b(V[0])) v = V;
    const [n, w, bg, fg, line, lab] = v, t0 = b(n), p = t - t0;
    card(bg);
    X.save(); X.globalAlpha = 0.07; kwall(t, w, { rows: 13, size: 150, col: fg, speed: 320, y0: 60 }); X.restore();
    const F = IF(900, 230);
    if (n === 40) kword(w, 540, 880, F, fg, (j) => { const k = kspring((p - j * 0.04) / 0.45, 0.3, 18); return { dy: (1 - k) * -900 }; }, { max: 980 });
    else if (n === 42) { const sh = Math.max(0, 1 - p / 0.4); kword(w, 540 + Math.sin(p * 90) * 34 * sh, 880 + Math.cos(p * 70) * 22 * sh, F, fg, (j) => ({ rot: Math.sin(p * 60 + j) * 0.16 * sh, sy: 1 + 0.22 * sh * Math.sin(p * 80 + j) }), { max: 980 }); }
    else if (n === 44.5) { const k = kspring(p / 0.5); X.save(); X.translate(540, 880); X.transform(1, 0, -0.35 * (1 - k) + 0.12, 1, 0, 0); kword(w, 0, 0, F, fg, (j) => ({ rot: (1 - k) * 0.8 * (j - 2), a: k * 2 }), { max: 980 }); X.restore(); }
    else { const k = ksp(t, t0, 0.35, 0.45, 20); X.save(); X.translate(540, 880); X.scale(mix(2.4, 1, k), mix(2.4, 1, k));
      kword(w, 0, 0, F, fg, (j) => { const e = t - b(47) - j * 0.025; return { dy: e > 0 && e < 0.3 ? -Math.sin(e / 0.3 * Math.PI) * 70 : 0 }; }, { max: 980 }); X.restore();
      X.fillStyle = fg; X.fillRect(540 - 400, 1000, 800 * eo(lin(p, 0.05, 0.3)), 14); }
    txt(line, 540, 1120, IF(700, 52), fg, (p - 0.08) * 6);
    txt('ROLE-PLAY · ' + lab, 540, 1192, MONO(26), fg, 0.6 * cl((p - 0.12) * 6));
    return bg;
  }
  // ---------- S6 · you write, it checks ----------
  function s6(t) {
    card(CR);
    const a0 = cl((t - b(48)) * 6);
    txt('EXERCISE 4 · TRANSLATE', 540, 560, MONO(26), 'rgba(11,10,10,0.5)', a0);
    txt('“I’m tired.”', 540, 640, IF(700, 64), K, a0 * 0.75);
    const F = IF(900, 140), ls = -0.04 * 140, full = mw('Soy cansado.', F, ls), soy = mw('Soy', F, ls), x0 = 540 - full / 2;
    kin(t, b(48), 'Soy cansado.', 540, 900, F, K, 'rise', { stagger: 0.02 });
    if (t >= b(50)) { const q = eo(lin(t, b(50), b(50) + 0.12)); X.save(); X.strokeStyle = OR; X.lineWidth = 18; X.lineCap = 'round'; X.beginPath(); X.moveTo(x0 - 14, 908); X.lineTo(x0 - 14 + (soy + 28) * q, 896 - 4 * q); X.stroke(); X.restore(); }
    if (t >= b(51)) { const k = ksp(t, b(51), 0.35, 0.45, 20); X.save(); X.translate(x0 + soy / 2 + 12, 760); X.rotate(-0.07); X.scale(mix(2.4, 1, k), mix(2.4, 1, k)); X.globalAlpha = cl((t - b(51)) * 12); kword('Estoy', 0, 0, IF(900, 112), OR, null, {}); X.restore();
      const sw = cl((t - b(51)) / 0.4); X.save(); X.strokeStyle = `rgba(255,74,28,${0.7 * (1 - sw)})`; X.lineWidth = 8 * (1 - sw) + 2; X.beginPath(); X.arc(x0 + soy / 2 + 12, 760, 80 + sw * 300, 0, 7); X.stroke(); X.restore(); }
    if (t >= b(51.5)) { const k = ksp(t, b(51.5), 0.45); X.save(); X.translate(0, (1 - k) * 120); X.globalAlpha = cl(k * 2);
      X.fillStyle = K; rr(130, 1060, 820, 190, 36); X.fill(); txt('WHY', 180, 1110, MONO(24), OR, 1, 'left'); txt('Tired is a state, so: estar.', 180, 1182, IF(700, 46), CR, 1, 'left'); X.restore(); }
    kin(t, b(53), 'YOU WRITE IT.', 540, 300, IF(900, 130), K, 'rise', { max: 980 });
    kin(t, b(54), 'IT CHECKS IT.', 540, 432, IF(900, 130), OR, 'snap', { max: 980 });
    return CR;
  }
  // ---------- S7 · the checked card becomes lesson 12; lesson 13 is built on it; riffle to 50 ----------
  const TITLES = ['Hello', 'At the café', 'Ser or estar?', 'The hotel', 'Small talk', 'Your street', 'The pharmacy', 'Saying no', 'The market', 'Your new job', 'The landlord', 'Directions', 'On the phone', 'The dinner', 'The interview', 'Your weekend'];
  function chip(x, y, label, bg, ink, sc = 1) { X.save(); X.font = MONO(24); const w = X.measureText(label).width + 44; X.translate(x + w / 2, y); X.scale(sc, sc); X.fillStyle = bg; rr(-w / 2, -26, w, 52, 26); X.fill(); X.fillStyle = ink; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(label, 0, 1); X.restore(); }
  function lcard(x, y, sc, rot, num, title, o = {}) {
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(sc, sc);
    X.fillStyle = 'rgba(0,0,0,0.45)'; rr(-368, -218, 760, 480, 36); X.fill();
    X.fillStyle = CR; rr(-380, -240, 760, 480, 36); X.fill();
    txt('LESSON ' + String(num).padStart(2, '0') + ' / 50', -320, -168, MONO(26), OR, 1, 'left');
    X.save(); X.font = IF(900, 76); const tw = X.measureText(title).width; X.translate(-320, -76); if (tw > 640) X.scale(640 / tw, 640 / tw); X.fillStyle = K; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(title, 0, 0); X.restore();
    X.fillStyle = 'rgba(11,10,10,0.12)'; for (let j = 0; j < 3; j++) { rr(-320, 4 + j * 42, 640 - j * 130, 20, 10); X.fill(); }
    if (o.done) chip(-320, 168, 'DONE ✓', K, CR);
    if (o.built) chip(-320, 168, 'BUILT ON LESSON 12', OR, K, mix(2.2, 1, o.built));
    if (o.prog != null && o.prog < 1) { X.fillStyle = 'rgba(11,10,10,0.1)'; rr(-320, 214, 640, 8, 4); X.fill(); X.fillStyle = OR; rr(-320, 214, 640 * o.prog, 8, 4); X.fill(); }
    X.restore();
  }
  function s7(t) {
    card(K);
    const k0 = ksp(t, b(56), 0.5, 0.55, 13), q0 = cl(k0);
    if (q0 < 0.985) { // seamless: the exercise shrinks into a card
      const rw = mix(W, 760, q0), rh = mix(H, 480, q0), rx = 540, ry = mix(H / 2, 1100, q0);
      X.save(); rr(rx - rw / 2, ry - rh / 2, rw, rh, mix(0, 36, q0)); X.clip(); X.translate(rx, ry); X.scale(rw / W, rw / W); X.translate(-W / 2, -H / 2); s6(b(55.99)); X.restore();
      X.save(); X.globalAlpha = cl((q0 - 0.35) / 0.4); lcard(rx, ry, rw / 760, 0, 12, 'At the café', { done: true }); X.restore();
    } else if (t < b(61)) {
      const k13 = t >= b(58) ? ksp(t, b(58), 0.5) : 0, bk = cl(k13);
      lcard(540, 1100 - 46 * bk, mix(1, 0.92, bk), -0.05 * bk, 12, 'At the café', { done: true });
      if (t >= b(58)) lcard(mix(1500, 540, k13), 1100, 1, mix(0.25, 0, cl(k13)), 13, 'Ser or estar?', { built: t >= b(59) ? ksp(t, b(59), 0.35, 0.45, 20) : 0, prog: cl((t - b(58)) / 0.9) });
    } else {
      const nf = 13 + eo(lin(t, b(61), b(62))) * 37, top = Math.min(50, Math.floor(nf)), fr = nf - top, behind = Math.min(6, top - 11);
      for (let j = behind; j >= 1; j--) lcard(540, 1100 - j * 20, 1 - j * 0.022, (j % 2 ? 0.035 : -0.03) * Math.min(j, 3), top - j, top - j === 12 ? 'At the café' : TITLES[(top - j) % TITLES.length], {});
      lcard(top >= 50 ? 540 : 540 + (1 - fr) ** 3 * 960, 1100, 1, 0, top, top === 50 ? 'Your big day' : top === 13 ? 'Ser or estar?' : TITLES[top % TITLES.length], {});
    }
    if (t < b(62)) {
      kin(t, b(58), 'EACH LESSON', 540, 320, IF(900, 140), WH, 'rise', { max: 980 });
      kin(t, b(59), 'BUILT ON THE LAST.', 540, 455, IF(900, 100), OR, 'snap', { max: 980 });
    } else {
      kin(t, b(62), '50 LESSONS.', 540, 330, IF(900, 170), WH, 'snap', { max: 980 });
      txt(typed(t, b(62) + 0.05, 'WRITTEN ONE AT A TIME.', 48), 540, 470, MONO(40), OR);
    }
    return K;
  }
  // ---------- S8 · chrome: built around you (freezes in the silence) ----------
  function s8(t) {
    card(K);
    const e = t - b(64), spin = 1 - eo(lin(e, 0, 1.2)), kk = 1 - eo(cl((t - b(69)) / 0.6)) * (t >= b(69) ? 1 : 0);
    const extra = t >= b(69) ? (1 - kk) * 1.2 : 0;
    X.drawImage(R3.knot(t, { x: 0.35, y: 1.7, s: 0.85, rx: 0.5 + e * 0.4 + spin * 3, ry: e * 0.9 + spin * 4 + extra, rz: 0.2, bloom: 0.3 + 0.5 * Math.max(pulse(t, 67, 0.5), pulse(t, 69, 0.5)) }), 0, 0);
    kin(t, b(66), 'BUILT AROUND', 540, 1360, IF(900, 120), WH, 'rise', { max: 980 });
    if (t >= b(67)) { const k = ksp(t, b(67), 0.4, 0.4, 18), sx = 1 + pulse(t, 68.5, 0.35) * 0.5, sy = 1 + pulse(t, 69, 0.35) * 0.45;
      X.save(); X.translate(540, 1560); X.scale(mix(0.2, 1, k) * sx, mix(0.2, 1, k) * sy / Math.max(1, sx * 0.85)); kword('YOU.', 0, 0, IF(900, 300), OR, null, { ls: -14 }); X.restore(); }
    let yr = null; for (const [n, w] of [[69, 'YOUR REASON.'], [70, 'YOUR LEVEL.'], [71, 'YOUR MISTAKES.']]) if (t >= b(n)) yr = [n, w];
    if (yr) kin(t, b(yr[0]), yr[1], 540, 1715, IF(900, 54), CR, 'snap', { max: 900 });
    return K;
  }
  // ---------- S9 · the deal: lines build up on the beat while the card colour cuts ----------
  const DEAL_BG = [[72, CR], [74, OR], [76.5, K], [78, BL]];
  function s9(t) {
    let bg = CR; for (const [n, c] of DEAL_BG) if (t >= b(n)) bg = c;
    const ink = kink(bg); card(bg);
    X.save(); X.globalAlpha = 0.06; kwall(t, ['€9,99', '74 LANGUAGES', '€5,99'], { rows: 13, size: 130, col: ink, speed: 280, y0: 60 }); X.restore();
    kin(t, b(72), '€9,99', 540, 560, IF(900, 260), ink, 'snap', { max: 980 });
    txt('PER COURSE', 540, 720, MONO(44), ink, (t - b(72) - 0.08) * 6);
    kin(t, b(74), 'FIRST 2 WEEKS OF LESSONS INCLUDED.', 540, 880, IF(900, 84), ink, 'rise', { max: 960, stagger: 0.012 });
    kin(t, b(76.5), 'THEN €5,99 A MONTH', 540, 1010, IF(900, 84), ink, 'snap', { max: 960 });
    kin(t, b(77), 'FOR ALL YOUR COURSES.', 540, 1110, IF(900, 60), ink, 'rise', { max: 960, stagger: 0.012 });
    if (t >= b(78)) { const q = eo(lin(t, b(78), b(78) + 0.16)); X.fillStyle = OR; X.fillRect(540 - 470, 1210, 940 * q, 110); }
    kin(t, b(78), 'LESSONS STAY YOURS.', 540, 1265, IF(900, 84), K, 'stretch', { max: 900 });
    txt('EVEN WITHOUT A SUBSCRIPTION', 540, 1372, MONO(30), ink, 0.8 * cl((t - b(79)) * 7));
    return bg;
  }
  // ---------- S10 · the coin, upright, turning to face you on the last 808 ----------
  function s10(t) {
    card(K);
    const e = t - b(80), T3 = b(83) - b(80), punch = pulse(t, 83, 0.35);
    const ang = (1 - eo(cl(e / T3))) * Math.PI * 8 + (e > T3 ? Math.sin((e - T3) * 2.2) * 0.22 * eo(lin(e, T3, T3 + 0.6)) : 0);
    if (window.R3) X.drawImage(R3.coin(t, ang, { x: 0, y: 2.2, s: 1.55 * mix(0.55, 1, kspring(e / 0.5)) * (1 + 0.07 * punch), bloom: 0.22 + 0.35 * punch }), 0, 0);
    const e2 = t - b(82);
    if (e2 > 0) kword('Borderless.', 540, 1250, IF(900, 150), WH, (j) => { const k = kspring((e2 - j * 0.022) / 0.42); const pd = j === 10 ? 1 + 1.1 * pulse(t, 86, 0.4) : 1; return { dy: (1 - k) * 130, a: k * 2, col: j === 10 ? OR : null, sx: pd, sy: pd }; }, { max: 980 });
    if (t >= b(83)) { const k = ksp(t, b(83), 0.35, 0.45, 20); X.save(); X.globalAlpha = cl((t - b(83)) * 8); X.translate(540, 1380); X.scale(mix(1.4, 1, k), mix(1.4, 1, k)); txt('A course built around you.', 0, 0, IF(700, 50), CR); X.restore(); }
    txt('74 LANGUAGES · €9,99 PER COURSE', 540, 1460, MONO(28), 'rgba(242,237,228,0.6)', (t - b(85)) * 6);
    return K;
  }
  const FLASH = [b(5), b(16), b(32), b(40), b(48), b(56), b(64), b(72), b(80)];
  window.SCENE = {
    frame(t) {
      X.save(); card(K); cam(t);
      let bg = K;
      if (t < b(6)) bg = s1(t);
      else if (t < b(16) - 0.04) bg = s2(t);
      else if (t < b(16) + 0.45) kTiles(lin(t, b(16) - 0.04, b(16) + 0.45), () => s2(b(15.95)), () => s3(t), { size: 135, ox: 540, oy: 1140 });
      else if (t < b(32)) bg = s3(t);
      else if (t < b(40)) bg = s4(frz(t));
      else if (t < b(48) - 0.18) bg = s5(t);
      else if (t < b(48) + 0.18) { const k = lin(t, b(48) - 0.18, b(48) + 0.18); kZoom(k, () => s5(t), () => s6(t), 540, 880); bg = k < 0.5 ? BL : CR; }
      else if (t < b(56)) bg = s6(t);
      else if (t < b(64) - 0.06) bg = s7(t);
      else if (t < b(64) + 0.4) kIris(lin(t, b(64) - 0.06, b(64) + 0.4), () => s7(t), () => s8(t), 540, 560);
      else if (t < b(72) - 0.2) bg = s8(frz(t));
      else if (t < b(72) + 0.24) { const k = lin(t, b(72) - 0.2, b(72) + 0.24); kStripes(k, () => s8(t), () => s9(t)); bg = k < 0.5 ? K : CR; }
      else if (t < b(80) - 0.04) bg = s9(t);
      else if (t < b(80) + 0.35) kIris(lin(t, b(80) - 0.04, b(80) + 0.35), () => s9(t), () => s10(t), 540, 760);
      else bg = s10(t);
      kflash(t, FLASH, 0.16);
      X.restore();
      hud(t, LIGHT.includes(bg));
      grain(t, 0.03);
    },
  };
})();
