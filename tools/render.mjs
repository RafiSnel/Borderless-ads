// node render.mjs stills 1.2,3.0,...   -> stills/s_<t>.jpg
// node render.mjs video out.mp4 [fps]  -> silent video of the whole timeline
import { chromium } from '/home/claude/engine/pdoom-video/app/node_modules/playwright-core/index.mjs';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [mode, arg, fpsArg = '30'] = process.argv.slice(2);
const fps = +fpsArg;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto('http://127.0.0.1:8765/scene.html');
await page.evaluate(() => window.ready);
const grab = (t, sub) => page.evaluate(([t, fps, sub]) => { window.renderAt(t, fps, sub); return document.getElementById('c').toDataURL('image/jpeg', 0.92).split(',')[1]; }, [t, fps, sub]);
if (mode === 'stills') {
  fs.mkdirSync('stills', { recursive: true });
  for (const t of arg.split(',').map(Number)) fs.writeFileSync(`stills/s_${t.toFixed(2)}.jpg`, Buffer.from(await grab(t, 1), 'base64'));
} else {
  const dur = await page.evaluate(() => window.DURATION);
  const total = Math.round(dur * fps), t0 = Date.now();
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', arg], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < total; f++) {
    const ok = ff.stdin.write(Buffer.from(await grab(f / fps, 3), 'base64'));
    if (!ok) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r));
  console.log(`frames=${total} render=${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
await browser.close();
