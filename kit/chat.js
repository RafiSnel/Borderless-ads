// Chat engine: messages pop in at times, stack from the bottom and scroll up.
// msg: {t, me:bool, name, text, kind:'text'|'typing'|'card'|'img'|'voice'|'emoji', col, react:{t,e}, strike:t, del:t, img, w}
const CHAT = {
  draw(t, msgs, th) {
    const top = th.top ?? 250, bottom = th.bottom ?? 1720, pad = 60;
    X.save(); X.beginPath(); X.rect(0, top, W, bottom - top); X.clip();
    // measure all visible messages, newest at the bottom
    const vis = msgs.filter((m) => t >= m.t && !(m.until && t > m.until) && !(m.del && t > m.del + 0.18));
    const items = vis.map((m) => ({ m, h: this.height(m, th) }));
    let y = bottom - 30;
    // smooth scroll: each new message pushes content up with an ease
    const placed = [];
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i]; const appear = eo(lin(t, it.m.t, it.m.t + 0.18));
      const h = it.h * (i === items.length - 1 ? appear : 1);
      y -= h; placed.push({ ...it, y, appear }); y -= 22;
      if (y < top - 600) break;
    }
    for (const p of placed) this.bubble(t, p.m, p.y, p.h, p.appear, th);
    X.restore();
  },
  height(m, th) {
    if (m.kind === 'card') return 190;
    if (m.kind === 'img') return m.h || 620;
    if (m.kind === 'voice') return 150;
    if (m.kind === 'typing') return 110;
    if (m.kind === 'emoji') return 170;
    X.font = font(th.font || 'inter', 600, th.size || 46);
    const lines = this.wrap(m.text, (th.maxw || 640) - 70); m._lines = lines;
    return 60 + lines.length * (th.size || 46) * 1.22 + (m.name && !m.me ? 46 : 0);
  },
  wrap(s, w) {
    const words = String(s).split(' '); const out = []; let cur = '';
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (X.measureText(tr).width > w && cur) { out.push(cur); cur = wd; } else cur = tr; }
    if (cur) out.push(cur); return out;
  },
  bubble(t, m, y, h, appear, th) {
    const size = th.size || 46, maxw = th.maxw || 640;
    X.save(); X.globalAlpha = cl(appear * 1.5) * (m.del ? 1 - lin(t, m.del, m.del + 0.15) : 1);
    const s = mix(0.6, 1, back(appear, 2.2));
    let bw;
    if (m.kind === 'card') bw = 700; else if (m.kind === 'img') bw = m.w || 520; else if (m.kind === 'voice') bw = 600; else if (m.kind === 'typing') bw = 170; else if (m.kind === 'emoji') bw = 0;
    else { X.font = font(th.font || 'inter', 600, size); bw = Math.min(maxw, Math.max(...(m._lines || [m.text]).map((l) => X.measureText(l).width)) + 70); }
    if (m.name && !m.me && m.kind === 'text') { X.font = font(th.font || 'inter', 700, 30); bw = Math.max(bw, X.measureText(m.name).width + 70); }
    const x = m.me ? W - 60 - bw : 60;
    X.translate(x + (m.me ? bw : 0), y + h); X.scale(s, s); X.translate(-(m.me ? bw : 0), -h);
    if (m.kind === 'emoji') { X.font = '140px "Noto Color Emoji", sans-serif'; X.textAlign = m.me ? 'right' : 'left'; X.textBaseline = 'top'; X.fillText(m.text, m.me ? bw : 0, 0); X.restore(); return; }
    const bg = m.col || (m.me ? th.me : th.them), fg = m.me ? th.meText : th.themText;
    X.fillStyle = 'rgba(0,0,0,0.08)'; rr(4, 8, bw, h, 44); X.fill();
    X.fillStyle = bg; rr(0, 0, bw, h, 44); X.fill();
    if (m.kind === 'typing') {
      for (let i = 0; i < 3; i++) { X.fillStyle = fg; X.globalAlpha *= 1; X.beginPath(); X.arc(48 + i * 38, h / 2 + Math.sin(t * 12 - i) * 8, 12, 0, 7); X.fill(); }
    } else if (m.kind === 'card') {
      X.fillStyle = th.cardAcc || '#a8512b'; rr(26, 26, 110, 138, 22); X.fill();
      txt(String(m.num ?? ''), 81, 95, font('inter', 900, 54), '#fff');
      txt(m.text, 166, 72, font('inter', 800, 42), fg, { align: 'left' });
      txt(m.sub || '', 166, 126, font('inter', 600, 30), th.sub || fg, { align: 'left', a: 0.7 });
    } else if (m.kind === 'img') {
      X.save(); rr(14, 14, bw - 28, h - 28, 32); X.clip();
      const img = IMG[m.img]; if (img) { const k = (bw - 28) / img.width; X.drawImage(img, 14, 14 - (m.fy || 0) * k, bw - 28, img.height * k); }
      X.restore();
    } else if (m.kind === 'voice') {
      X.fillStyle = fg; X.beginPath(); X.moveTo(50, 50); X.lineTo(50, 100); X.lineTo(92, 75); X.fill();
      const prog = m.play ? lin(t, m.play, m.play + (m.len || 2.5)) : 0;
      for (let i = 0; i < 26; i++) {
        const hh = 12 + hash(i * 3.3) * 46 * (m.play && t > m.play && prog < 1 ? 0.6 + 0.4 * Math.sin(t * 20 + i) : 1);
        X.fillStyle = i / 26 < prog ? (th.voiceHi || '#ee8b47') : fg; X.globalAlpha *= 1; rr(120 + i * 17, 75 - hh / 2, 9, hh, 4); X.fill();
      }
    } else {
      let yy = 30 + size * 0.55;
      if (m.name && !m.me) { txt(m.name, 35, 40, font(th.font || 'inter', 700, 30), m.nameCol || th.nameCol || '#a8512b', { align: 'left' }); yy += 46; }
      for (const l of m._lines || [m.text]) { txt(l, 35, yy, font(th.font || 'inter', 600, size), fg, { align: 'left' }); yy += size * 1.22; }
      if (m.strike && t > m.strike) {
        const p = eo(lin(t, m.strike, m.strike + 0.2)); X.strokeStyle = th.strikeCol || '#d64545'; X.lineWidth = 8;
        X.beginPath(); X.moveTo(20, h / 2); X.lineTo(20 + (bw - 40) * p, h / 2); X.stroke();
      }
    }
    if (m.react && t > m.react.t) {
      const p = back(lin(t, m.react.t, m.react.t + 0.25), 2.5);
      X.save(); X.translate(m.me ? 10 : bw - 10, h - 4); X.scale(p, p);
      X.fillStyle = th.reactBg || '#fff'; X.beginPath(); X.arc(0, 0, 44, 0, 7); X.fill();
      X.font = '52px "Noto Color Emoji", sans-serif'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(m.react.e, 0, 4); X.restore();
    }
    X.restore();
  },
  header(name, sub, th, avatarCol) {
    X.fillStyle = th.head || '#fff'; X.fillRect(0, 0, W, 230);
    X.fillStyle = 'rgba(0,0,0,0.08)'; X.fillRect(0, 228, W, 2);
    X.fillStyle = avatarCol || '#a8512b'; X.beginPath(); X.arc(150, 150, 52, 0, 7); X.fill();
    txt(name[0], 150, 152, font('inter', 800, 50), '#fff');
    txt(name, 230, 128, font('inter', 800, 46), th.headText || '#111', { align: 'left' });
    txt(sub, 230, 182, font('inter', 500, 32), th.headSub || '#888', { align: 'left' });
    txt('‹', 60, 148, font('inter', 400, 80), th.headText || '#111');
  },
  inputBar(t, th, typing = '') {
    X.fillStyle = th.head || '#fff'; X.fillRect(0, 1740, W, 180);
    X.fillStyle = th.inputBg || '#eee'; rr(50, 1775, W - 200, 96, 48); X.fill();
    txt(typing || 'Message', 95, 1823, font('inter', 500, 40), typing ? (th.inputText || '#111') : '#999', { align: 'left' });
    if (typing && Math.floor(t * 4) % 2 === 0) { X.font = font('inter', 500, 40); X.fillStyle = th.cardAcc || '#a8512b'; X.fillRect(98 + X.measureText(typing).width, 1798, 5, 50); }
    X.fillStyle = th.send || '#a8512b'; X.beginPath(); X.arc(W - 95, 1823, 48, 0, 7); X.fill();
    txt('↑', W - 95, 1823, font('inter', 900, 50), '#fff');
  },
};
