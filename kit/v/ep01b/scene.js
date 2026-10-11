// La Esquina · Ep. 1 — new ending: first stamp, then the phone in the dark corner
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep01b'); const DUR = EP.dur; window.DURATION = DUR; const HOOK = 2.7, OFF = 5.9;
  window.CUES = { dur: DUR, cues: [['whoosh', 0.05, 0.3], ['stamp', 0.55, 1.0], ['whoosh', HOOK, 0.2], ['click', OFF, 1.0]], sfx_gain: 0.36 };
  window.SCENE = { frame(t) { X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
    if (t < HOOK) passportShot(t, 0, 0, 0);
    else { const k = eo(lin(t, HOOK, OFF - 0.4)); X.save(); cam(mix(540, 900, k), mix(1000, 1180, k), mix(1.0, 2.6, k)); bar(t); X.fillStyle = `rgba(0,0,0,${mix(0.2, 0.55, k)})`; X.fillRect(-500, -500, W + 1000, H + 1000);
      const g = X.createRadialGradient(900, 1200, 10, 900, 1200, 500); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.6)'); X.fillStyle = g; X.fillRect(-500, -500, W + 1000, H + 1000);
      X.fillStyle = '#2a140a'; X.beginPath(); X.ellipse(900, 1250, 150, 30, 0, 0, 7); X.fill(); X.fillRect(890, 1250, 20, 200);
      X.save(); X.translate(900, 1200); X.rotate(-0.08); X.fillStyle = '#111'; rr(-30, -60, 60, 110, 10); X.fill(); X.fillStyle = '#1c2230'; rr(-24, -52, 48, 92, 6); X.fill();
      if (t < OFF) { const p = 0.6 + 0.4 * Math.sin(t * 6); X.fillStyle = `rgba(255,40,40,${p})`; X.beginPath(); X.arc(14, -40, 6, 0, 7); X.fill(); X.fillStyle = `rgba(255,40,40,${0.25 * p})`; X.beginPath(); X.arc(14, -40, 18, 0, 7); X.fill(); txt('REC', -6, -40, font('inter', 900, 10), '#ff6060'); }
      X.restore(); X.restore(); if (t > OFF + 0.3) { X.fillStyle = `rgba(0,0,0,${lin(t, OFF + 0.3, OFF + 0.6)})`; X.fillRect(0, 0, W, H); } }
    letterbox(); } };
})();
