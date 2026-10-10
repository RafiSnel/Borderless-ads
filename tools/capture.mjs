// Capture crisp stills of the static tour for the ad (phone size, 3x). No app code is changed:
// overlays that only exist because of the tour/offline sandbox are hidden with injected CSS.
import { chromium } from '/home/claude/engine/pdoom-video/app/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const OUT = '/home/claude/ad2/app';
fs.mkdirSync(OUT, { recursive: true });
const HIDE = `#demo-ribbon,#tour-panel{display:none!important}:root{--demo-balk:0px!important}
.account-button{visibility:hidden!important}*{scrollbar-width:none!important}::-webkit-scrollbar{display:none}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'en-GB' });
const page = await ctx.newPage();
const tab = async (i) => { await page.$$eval('.nav button, .nav a', (els, i) => els[i].click(), i); await page.waitForTimeout(1500); await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300); };
for (const city of ['madrid', 'tokio']) {
  await page.goto(`http://127.0.0.1:5173/app?rondleiding=${city}`, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(2000);
  await page.evaluate(() => { [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Got it')?.click(); });
  await page.addStyleTag({ content: HIDE });
  await tab(0); await page.screenshot({ path: `${OUT}/${city}_overview.png` });
  await tab(1); await page.screenshot({ path: `${OUT}/${city}_path.png` });
  await page.screenshot({ path: `${OUT}/${city}_path_full.png`, fullPage: true });
  await tab(3); await page.screenshot({ path: `${OUT}/${city}_passport.png` });
  await page.evaluate(() => window.scrollTo(0, 330)); await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${city}_passport_low.png` });
  await tab(2); await page.screenshot({ path: `${OUT}/${city}_summary.png` });
  await page.evaluate(() => window.scrollTo(0, 560)); await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${city}_words.png` });
  // Example lesson: open it from the overview and step through a few screens.
  await tab(0);
  await page.evaluate(() => [...document.querySelectorAll('button,a')].find((b) => /Example lesson/.test(b.textContent))?.click());
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${city}_lesson_0.png` });
  for (let s = 1; s <= 3; s++) {
    const clicked = await page.evaluate(() => {
      const b = [...document.querySelectorAll('button')].filter((x) => x.offsetParent && /Start|Continue|Next|Begin|Verder|Check/i.test(x.textContent));
      if (b.length) { b[b.length - 1].click(); return b[b.length - 1].textContent.trim(); } return null;
    });
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${OUT}/${city}_lesson_${s}.png` });
    console.log(city, 'lesson step', s, clicked);
  }
}
await browser.close();
console.log(fs.readdirSync(OUT).join(' '));
