// node render.mjs <v> stills 1.0,2.0   |   node render.mjs <v> video
import { chromium } from '/home/claude/engine/pdoom-video/app/node_modules/playwright-core/index.mjs';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [v, mode, arg] = process.argv.slice(2);
const fps = 30, dir = `/home/claude/kit/v/${v}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = [];
page.on('pageerror', (e) => errs.push('pageerror ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push('console ' + m.text()); });
await page.goto(`http://127.0.0.1:8800/page.html?v=${v}`);
await page.waitForFunction(() => window.ready, null, { timeout: 30000 });
await page.evaluate(() => window.ready);
const cues = await page.evaluate(() => window.CUES || null);
if (cues) fs.writeFileSync(`${dir}/cues.json`, JSON.stringify(cues));
const grab = (t, sub) => page.evaluate(([t, sub]) => { window.renderAt(t, 30, sub); return document.getElementById('c').toDataURL('image/jpeg', 0.92).split(',')[1]; }, [t, sub]);
if (mode === 'stills') {
  fs.mkdirSync(`${dir}/stills`, { recursive: true });
  for (const t of arg.split(',').map(Number)) fs.writeFileSync(`${dir}/stills/s_${t.toFixed(2).padStart(6, '0')}.jpg`, Buffer.from(await grab(t, 1), 'base64'));
} else {
  const dur = await page.evaluate(() => window.DURATION);
  const total = Math.round(dur * fps), t0 = Date.now();
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', `${dir}/silent.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < total; f++) {
    const ok = ff.stdin.write(Buffer.from(await grab(f / fps, 3), 'base64'));
    if (!ok) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r));
  console.log(`frames=${total} render=${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
if (errs.length) console.log('ERRORS:\n' + [...new Set(errs)].slice(0, 10).join('\n'));
await browser.close();
