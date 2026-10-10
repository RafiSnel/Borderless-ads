// ---------- timeline (measured voiceover, ad #2) ----------
const T = {
  l1: 0.15, l2: 1.595, built: 2.03, l3: 3.208, l4: 5.512, animals: 6.15, cat: 6.83, l5: 8.109, madrid: 9.6,
  l6: 10.808, why: 12.1, l7: 13.109, l8: 14.175, fifty: 14.85, exactly: 15.915, l9: 16.994, tokyo: 18.394,
  l10: 20.549, l11: 22.199, around: 23.079, l12: 24.396, l13: 26.489, end: 27.6, out: 30.0,
};
// ---------- new props ----------
function codeWindow(t, t0, x, y, w, h, a = 1) {
  const k = t - t0;
  X.save(); X.globalAlpha = a; X.translate(x, y);
  X.fillStyle = 'rgba(31,26,20,0.18)'; rr(-w / 2 + 10, -h / 2 + 18, w, h, 28); X.fill();
  X.fillStyle = '#1f1a14'; rr(-w / 2, -h / 2, w, h, 28); X.fill();
  ['#e8607f', '#f0c04e', '#4faa72'].forEach((c, i) => { X.fillStyle = c; X.beginPath(); X.arc(-w / 2 + 40 + i * 34, -h / 2 + 36, 10, 0, 7); X.fill(); });
  const lines = ['const course = build({', '  language: "es",', '  goal: "kitchen internship",', '  level: test(),', '  lessons: 50,', '});', 'world.render(course);', 'passport.stamp();'];
  const chars = Math.floor(k * 95);
  let used = 0;
  X.font = '600 34px ui-monospace, "DejaVu Sans Mono", monospace'; X.textBaseline = 'middle';
  lines.forEach((l, i) => {
    const n = Math.max(0, Math.min(l.length, chars - used)); used += l.length;
    if (n <= 0) return;
    const yy = -h / 2 + 100 + i * 52;
    X.fillStyle = '#6b6152'; X.fillText(String(i + 1).padStart(2, ' '), -w / 2 + 30, yy);
    X.fillStyle = i === 2 ? P.amber : i === 4 ? P.sun : '#e9e1d2'; X.fillText(l.slice(0, n), -w / 2 + 90, yy);
    if (n < l.length || i === lines.length - 1) { if (Math.floor(t * 6) % 2 === 0) { X.fillStyle = P.amber; X.fillRect(-w / 2 + 92 + X.measureText(l.slice(0, n)).width, yy - 20, 16, 40); } }
  });
  X.restore();
}
function cross(x, y, s, p) {
  X.save(); X.translate(x, y); X.scale(s, s); X.strokeStyle = '#d64545'; X.lineWidth = 34; X.lineCap = 'round';
  X.beginPath(); X.moveTo(-90, -90); X.lineTo(-90 + 180 * cl(p * 2), -90 + 180 * cl(p * 2)); X.stroke();
  if (p > 0.5) { X.beginPath(); X.moveTo(90, -90); X.lineTo(90 - 180 * cl(p * 2 - 1), -90 + 180 * cl(p * 2 - 1)); X.stroke(); }
  X.restore();
}
function flashCard(x, y, s, rot, kind, label) {
  const w = 360, h = 460;
  X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s);
  X.fillStyle = 'rgba(31,26,20,0.14)'; rr(-w / 2 + 8, -h / 2 + 16, w, h, 34); X.fill();
  X.fillStyle = P.white; rr(-w / 2, -h / 2, w, h, 34); X.fill();
  if (kind === 'colours') {
    ['#e8607f', '#f0c04e', '#4b9ce8', '#4faa72'].forEach((c, i) => { X.fillStyle = c; rr(-120 + (i % 2) * 130, -150 + Math.floor(i / 2) * 130, 110, 110, 24); X.fill(); });
  } else if (kind === 'cat') {
    X.fillStyle = P.ink2; X.beginPath(); X.arc(0, -60, 95, 0, 7); X.fill();
    X.beginPath(); X.moveTo(-85, -110); X.lineTo(-70, -195); X.lineTo(-20, -145); X.fill();
    X.beginPath(); X.moveTo(85, -110); X.lineTo(70, -195); X.lineTo(20, -145); X.fill();
    X.fillStyle = P.white; X.beginPath(); X.arc(-35, -70, 14, 0, 7); X.arc(35, -70, 14, 0, 7); X.fill();
    X.strokeStyle = P.white; X.lineWidth = 4; [-1, 1].forEach((d) => { X.beginPath(); X.moveTo(d * 30, -30); X.lineTo(d * 120, -45); X.moveTo(d * 30, -22); X.lineTo(d * 120, -15); X.stroke(); });
  } else {
    X.font = F(900, 52); X.fillStyle = P.ink; X.textAlign = 'center'; X.textBaseline = 'middle';
    X.fillText('El gato', 0, -110); X.fillText('bebe leche.', 0, -40);
    X.font = F(600, 30); X.fillStyle = P.ink3; X.fillText('The cat drinks milk.', 0, 30);
  }
  X.font = F(800, 40); X.fillStyle = P.ink3; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(label, 0, 165);
  X.restore();
}
function pin(x, y, s) {
  X.save(); X.translate(x, y); X.scale(s, s);
  X.fillStyle = 'rgba(31,26,20,0.18)'; X.beginPath(); X.ellipse(0, 10, 50, 14, 0, 0, 7); X.fill();
  X.fillStyle = P.acc; X.beginPath(); X.moveTo(0, 0); X.bezierCurveTo(-30, -60, -80, -100, -80, -160); X.arc(0, -160, 80, Math.PI, 0); X.bezierCurveTo(80, -100, 30, -60, 0, 0); X.fill();
  X.fillStyle = P.paper; X.beginPath(); X.arc(0, -160, 34, 0, 7); X.fill(); X.restore();
}
function spainBlob(x, y, s, a) {
  // simple abstract Iberia-ish blob with Madrid dot; not a map, just a shape
  X.save(); X.globalAlpha = a; X.translate(x, y); X.scale(s, s); X.fillStyle = P.bg2;
  X.beginPath(); X.moveTo(-300, -170); X.bezierCurveTo(-100, -250, 150, -230, 290, -160); X.bezierCurveTo(330, -40, 250, 80, 180, 170);
  X.bezierCurveTo(60, 230, -120, 230, -230, 170); X.bezierCurveTo(-300, 120, -340, 0, -300, -170); X.fill(); X.restore();
}
// ---------- scenes ----------
function s1(t) { // I couldn't speak Spanish.
  const k = t - T.l1;
  mascot(t, W / 2, 1180, 1.2, { mood: 'worried', sweat: true, lookX: 0.6, seed: 1, squash: Math.max(0, 1 - k * 6) });
  bubble('¿Dónde… está… el…?', W / 2 + 60, 780, 58, cl(k * 8), back(lin(k, 0, .22)), 'left');
  if (k > 0.6) cross(W / 2 + 330, 760, 0.6, lin(k, .6, .85));
  slam(t, T.l1 + 0.35, "COULDN'T SPEAK\nSPANISH.", W / 2, 380, 104, P.ink, { rot: -0.12 });
}
function s2(t) { // So I built my own app.
  const k = t - T.l2;
  const toPhone = eio(lin(t, T.built + 0.35, T.built + 0.75));
  codeWindow(t, T.l2, W / 2, 1100 - toPhone * 200, 900, 560, 1 - toPhone * 0.85);
  if (toPhone > 0) phone(IMG.mover, W / 2, mix(1700, 1180, toPhone), 560, { rot: mix(0.25, 0.03, toPhone), scale: mix(0.6, 1, toPhone) });
  slam(t, T.built - 0.15, 'SO I BUILT\nMY OWN APP.', W / 2, 360, 128, P.acc, { rot: 0.1 });
}
function s3(t) { // Most apps teach everyone the same things.
  const k = t - T.l3;
  for (let i = 0; i < 12; i++) {
    const c = i % 4, r = Math.floor(i / 4), t0 = T.l3 - 0.1 + i * 0.07;
    lessonCard(W / 2 + (c - 1.5) * 220, 1080 + (r - 1) * 300, 190, back(lin(t, t0, t0 + 0.2)), 1, '#ebe5d9', Math.floor(t * 3) % 2 === 0);
  }
  slam(t, T.l3 - 0.06, 'MOST APPS', W / 2, 330, 120, P.ink3, { from: 1.3 });
  slam(t, T.l3 + 1.1, 'SAME THINGS.', W / 2, 470, 140, P.ink, { rot: -0.1 });
}
function s4(t) { // Colours. Animals. The cat drinks milk.
  const cards = [[T.l4 - 0.1, 'colours', 'COLOURS', -0.12, 250], [T.animals, 'cat', 'ANIMALS', 0.06, 540], [T.cat, 'milk', '', -0.03, 830]];
  cards.forEach(([t0, kind, lab, rot, x], i) => { if (t > t0) flashCard(x, 1000 + (i === 1 ? -40 : 30), 0.78 * back(lin(t, t0, t0 + 0.22)), rot, kind, lab); });
  slam(t, T.l4 - 0.06, 'COLOURS.', W / 2, 400, 150, P.ink3, { from: 1.4, fadeAt: T.animals - 0.02 });
  slam(t, T.animals, 'ANIMALS.', W / 2, 400, 150, P.ink3, { from: 1.4, fadeAt: T.cat - 0.02 });
  slam(t, T.cat, 'THE CAT\nDRINKS MILK.', W / 2, 420, 120, P.ink2, { from: 1.4, fadeAt: T.cat + 0.42 });
  if (t > T.cat + 0.56) {
    mascot(t, W / 2, 1600, 0.85, { mood: 'flat', lookY: -1, seed: 5, tilt: Math.sin(t * 3) * 0.05 });
    slam(t, T.cat + 0.56, 'REALLY?', W / 2, 400, 170, P.acc, { rot: 0.18 });
  }
}
function s5(t) { // I needed Spanish for an internship in Madrid.
  const k = t - T.l5;
  spainBlob(W / 2, 1050, 1.35, eo(k * 4 + 0.5));
  const drop = lin(t, T.l5 + 0.25, T.l5 + 0.5);
  if (drop > 0) pin(W / 2 + 40, mix(500, 1080, eio(drop)), 1.1);
  pill('INTERNSHIP', W / 2, 360, 54, P.white, P.acc, cl(k * 6 + 0.5), back(lin(k, -0.08, .14)));
  slam(t, T.madrid - 0.3, 'MADRID', W / 2, 520, 180, P.ink);
  const words = [['la comanda', 'the order'], ['la sartén', 'the frying pan'], ['¿me lo repites?', 'can you repeat that?'], ['el turno', 'the shift']];
  words.forEach(([es, en], i) => {
    const t0 = T.madrid + 0.05 + i * 0.16; if (t < t0) return;
    const x = [270, 820, 250, 820][i], y = [1390, 1430, 1640, 1680][i];
    pill(es, x, y, 46, P.ink, P.paper, 1, back(lin(t, t0, t0 + 0.2)));
  });
}
function s6(t) { // So Borderless asks why you're learning,
  const k = t - T.l6;
  if (k < 0.75) {
    const s = back(lin(k, 0, 0.3));
    X.save(); X.translate(W / 2, 820); X.scale(s, s); X.beginPath(); X.arc(0, 0, 170, 0, 7); X.clip(); X.drawImage(IMG.logo, -170, -170, 340, 340); X.restore();
    slam(t, T.l6 + 0.1, 'Borderless', W / 2, 1150, 150, P.ink, { from: 1.3 });
  } else {
    mascot(t, W / 2, 1120, 1.2, { mood: 'o', wide: true, lookY: -1, seed: 2, squash: Math.max(0, 1 - (k - .75) * 5) });
    bubble('Why are you learning?', W / 2 + 40, 680, 56, cl((k - .75) * 8), back(lin(k, .75, .95)), 'left');
    const chips = [['Internship', 230, 930], ['Moving abroad', 860, 890], ['Exam', 180, 1430], ['Partner', 900, 1390], ['Travel', 260, 1660], ['Just because', 820, 1650]];
    chips.forEach(([txt, x, y], i) => { const t0 = T.l6 + 0.95 + i * 0.12; if (t > t0) pill(txt, x, y, 44, i === 0 ? P.white : P.ink, i === 0 ? P.acc : P.paper, 1, back(lin(t, t0, t0 + 0.2))); });
  }
}
function s7(t) { // tests your level,
  const k = t - T.l7;
  const lv = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const x0 = 140, x1 = W - 140, y = 1080;
  X.fillStyle = P.bg2; rr(x0 - 20, y - 22, x1 - x0 + 40, 44, 22); X.fill();
  X.fillStyle = P.acc; rr(x0 - 20, y - 22, (x1 - x0 + 40) * 0.4 * eo(lin(k, 0.05, 0.5)), 44, 22); X.fill();
  lv.forEach((l, i) => label(l, x0 + i * (x1 - x0) / 5, y + 90, 46, i === 2 ? P.acc : P.ink3, 800));
  const target = x0 + 2 * (x1 - x0) / 5;
  const sweep = k < 0.35 ? mix(x0, x1 - 60, eio(k / 0.35)) : mix(x1 - 60, target, elastic(lin(k, 0.35, 0.9)));
  X.fillStyle = P.ink; X.beginPath(); X.moveTo(sweep - 30, y - 160); X.lineTo(sweep + 30, y - 160); X.lineTo(sweep, y - 90); X.closePath(); X.fill();
  slam(t, T.l7, 'YOUR LEVEL', W / 2, 640, 140, P.ink, { from: 1.4 });
}
function s8(t) { // and builds you fifty lessons for exactly that.
  if (t < T.exactly) {
    const n = Math.max(1, Math.round(50 * eo(lin(t, T.l8 + 0.05, T.fifty + 0.15))));
    slam(t, T.l8, String(n), W / 2, 900, 520, P.acc, { from: 1.2 });
    slam(t, T.fifty, 'LESSONS', W / 2, 1260, 150, P.ink, { from: 1.6 });
  } else {
    const p = eo(lin(t, T.exactly, T.exactly + 0.3));
    phone(IMG.mpath, W / 2, mix(2200, 1130, p), 620, { scrollY: 4200 - (t - T.exactly) * 2200, rot: mix(-0.2, 0.02, p) });
    slam(t, T.exactly, 'FOR EXACTLY\nTHAT.', W / 2, 300, 120, P.ink, { from: 1.4 });
  }
}
function s9(t) { // Kitchen Spanish for me. Office Japanese for someone in Tokyo.
  const k = t - T.l9, toT = t > T.tokyo;
  const pin1 = eo(lin(t, T.l9, T.l9 + 0.3)), pin2 = eo(lin(t, T.tokyo, T.tokyo + 0.3));
  // Spanish lesson phone slides in; Tokyo phone joins next to it
  const leftX = mix(W / 2, W / 2 - 235, eio(lin(t, T.tokyo - 0.1, T.tokyo + 0.25)));
  phone(IMG.mles, mix(-500, leftX, pin1), 1150, toT ? 450 : 600, { zoom: toT ? 1.0 : 1.15, focus: [585, toT ? 1265 : 1500], rot: toT ? -0.06 : -0.03 });
  if (toT) phone(IMG.tles, mix(W + 500, W / 2 + 235, pin2), 1150, 450, { focus: [585, 1265], rot: 0.06 });
  if (!toT) { pill('Kitchen Spanish', W / 2, 260, 52, P.white, P.acc, 1, back(lin(k, .05, .25))); slam(t, T.l9 + 0.75, 'FOR ME.', W / 2, 400, 130, P.ink); }
  else { pill('Kitchen Spanish', W / 2 - 235, 300, 40, P.white, P.acc, 1, 1); pill('Office Japanese', W / 2 + 235, 300, 40, P.white, P.pass, 1, back(lin(t, T.tokyo, T.tokyo + .2))); slam(t, T.tokyo + 0.8, 'TOKYO.', W / 2, 450, 130, P.ink); }
}
function s10(t) { // Seventy-four languages.
  const k = t - T.l10;
  const hello = ['Hola', 'Bonjour', 'こんにちは', 'Ciao', 'Hallo', '안녕하세요', 'Olá', 'Привет', '你好', 'Merhaba', 'Hej', 'Γεια σου', 'Cześć', 'Salut'];
  const i = Math.floor(k / 0.085) % hello.length;
  if (k < 0.95) {
    X.save(); X.font = `900 190px Inter, "Noto Sans CJK JP", sans-serif`; X.textAlign = 'center'; X.textBaseline = 'middle';
    X.fillStyle = [P.acc, P.ink, P.pass, P.amber][i % 4]; X.fillText(hello[i], W / 2, 960); X.restore();
    for (let j = 0; j < 10; j++) { const h = hello[(i + j + 3) % hello.length]; label(h, 120 + hash(j + i) * 840, 300 + hash(j * 7 + i) * 1400, 40, 'rgba(91,80,68,0.25)', 700, 'center', 1); }
  } else {
    slam(t, T.l10 + 0.95, '74', W / 2, 900, 520, P.acc, { from: 1.6 });
    slam(t, T.l10 + 1.05, 'LANGUAGES', W / 2, 1250, 140, P.ink, { from: 1.4 });
  }
}
function s11(t) { // One course, built around you.
  const p = back(lin(t, T.l11, T.l11 + 0.3));
  phone(IMG.mpass, W / 2 - 230, 1150, 460, { zoom: 1.7, focus: [585, 1910], rot: -0.07, scale: p });
  phone(IMG.tpass, W / 2 + 230, 1150, 460, { zoom: 1.7, focus: [585, 1910], rot: 0.07, scale: back(lin(t, T.l11 + 0.12, T.l11 + 0.42)) });
  slam(t, T.l11, 'ONE COURSE.', W / 2, 300, 140, P.ink);
  slam(t, T.around, 'BUILT AROUND YOU.', W / 2, 440, 96, P.acc, { from: 1.4 });
}
function s12(t) { // Turns out the problem wasn't me.
  const k = t - T.l12;
  mascot(t, W / 2, 1300, 1.25, { mood: 'flat', armsUp: k > 0.5, seed: 6, tilt: k > 0.5 ? Math.sin(t * 8) * 0.06 : 0 });
  slam(t, T.l12 + 0.05, 'THE PROBLEM', W / 2, 420, 120, P.ink3, { from: 1.3 });
  slam(t, T.l12 + 0.8, "WASN'T ME.", W / 2, 580, 150, P.ink, { rot: -0.1 });
}
function s13(t) { // It was the course. -> end card
  if (t < T.end) {
    const k = t - T.l13;
    slam(t, T.l13, 'IT WAS', W / 2, 700, 150, P.ink, { from: 1.3 });
    slam(t, T.l13 + 0.45, 'THE COURSE.', W / 2, 880, 170, P.acc, { rot: 0.12 });
    stamp(t, T.l13 + 0.6, 'FIXED', W / 2, 1250, 120, P.pass, -0.12);
  } else {
    X.fillStyle = P.acc; X.fillRect(0, 0, W, H);
    X.strokeStyle = 'rgba(255,255,255,0.08)'; X.lineWidth = 2;
    for (let x = 0; x < W; x += 60) { X.beginPath(); X.moveTo(x, 0); X.lineTo(x, H); X.stroke(); }
    for (let y = 0; y < H; y += 60) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    const e = t - T.end, s = back(lin(e, 0, 0.35));
    X.save(); X.translate(W / 2, 640); X.scale(s, s); X.beginPath(); X.arc(0, 0, 150, 0, 7); X.clip(); X.drawImage(IMG.logo, -150, -150, 300, 300); X.restore();
    slam(t, T.end + 0.1, 'Borderless', W / 2, 900, 150, P.white, { from: 1.25, shadow: false });
    label('A course built around you.', W / 2, 1030, 56, 'rgba(255,255,255,0.9)', 600, 'center', eo(lin(e, 0.35, 0.6)));
    label('€9,99 per course  ·  borderlesslearn.com', W / 2, 1150, 38, 'rgba(255,255,255,0.75)', 600, 'center', eo(lin(e, 0.6, 0.85)));
    mascot(t, W / 2, 1520, 0.95, { mood: 'happy', wink: e > 1.0 && e < 1.6, wave: e > 0.4, seed: 4, squash: e > .3 ? Math.max(0, 1 - (e - .3) * 5) : 0 });
  }
}
const HITS = [T.l1 + 0.35, T.built - 0.15, T.l3 + 1.1, T.cat + 0.56, T.madrid - 0.3, T.l8, T.l10 + 0.95, T.l12 + 0.8, T.l13 + 0.45, T.l13 + 0.6];
function shake(t) { let a = 0; for (const h of HITS) { const d = t - h; if (d >= 0 && d < 0.25) a = Math.max(a, (1 - d / 0.25) * 22); } return [Math.sin(t * 91) * a, Math.cos(t * 77) * a]; }
const STARTS = [0, T.l2, T.l3, T.l4, T.l5, T.l6, T.l7, T.l8, T.l9, T.l10, T.l11, T.l12, T.l13, T.end];
function punch(t) { let s = 1; for (const st of STARTS) { const d = t - st; if (d >= 0 && d < 0.18) s = 1 + (1 - d / 0.18) * 0.06; } return s; }
function frame(t) {
  bg(t);
  X.save();
  const [sx, sy] = shake(t), pz = punch(t);
  X.translate(W / 2 + sx, H / 2 + sy); X.scale(pz, pz); X.translate(-W / 2, -H / 2);
  const seq = [[T.l2, s1], [T.l3, s2], [T.l4, s3], [T.l5, s4], [T.l6, s5], [T.l7, s6], [T.l8, s7], [T.l9, s8], [T.l10, s9], [T.l11, s10], [T.l12, s11], [T.l13, s12], [1e9, s13]];
  for (const [until, fn] of seq) if (t < until) { fn(t); break; }
  X.restore();
}
const ACC = document.createElement('canvas'); ACC.width = W; ACC.height = H; const AX = ACC.getContext('2d');
window.renderAt = function (t, fps = 30, sub = 3) {
  AX.clearRect(0, 0, W, H);
  for (let i = 0; i < sub; i++) { frame(t - (i / sub) * (0.5 / fps)); AX.globalAlpha = 1 / (i + 1); AX.drawImage(C, 0, 0); }
  X.globalAlpha = 1; X.drawImage(ACC, 0, 0);
};
window.DURATION = T.out;
