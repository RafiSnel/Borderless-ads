// La Esquina · Ep. 1 — title card in front of The Comeback
window.ready = (async () => {
  await new Promise((r) => { const sc = document.createElement('script'); sc.src = 'series.js'; sc.onload = r; document.head.appendChild(sc); });
  await loadFonts(); await epLoad('ep01a'); const DUR = EP.dur; window.DURATION = DUR;
  window.CUES = { dur: DUR, cues: [], sfx_gain: 0.36 };
  window.SCENE = { frame(t) { X.fillStyle = '#000'; X.fillRect(0, 0, W, H); titleCard(t * 0.9, 1, 'The Comeback'); letterbox(); } };
})();
