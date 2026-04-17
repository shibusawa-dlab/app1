import { chromium } from 'playwright';

const browser = await chromium.launch();
const urls = [
  'https://shibusawa-diary.na-kamura-1263.workers.dev/ja/entity/spatial/Serquigny/',
  'https://shibusawa-diary.na-kamura-1263.workers.dev/ja/entity/agential/佐々木/',
  'https://shibusawa-diary.na-kamura-1263.workers.dev/ja/entity/spatial/飛鳥山邸/',
  'https://shibusawa-diary.na-kamura-1263.workers.dev/ja/entity/agential/大隈/',
];

for (const url of urls) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(`PAGE: ${e.message}`));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(`CON: ${msg.text().slice(0,120)}`); });
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);
    const bars = await page.$$('li[title^="18"], li[title^="19"], li[title^="20"]');
    const barRect = bars.length > 0 ? await bars[0].boundingBox() : null;
    const totalText = await page.evaluate(() => {
      const el = document.querySelector('h2');
      return el?.textContent?.slice(0, 60) ?? null;
    });
    console.log(`\n${url}`);
    console.log(`  status: ${resp?.status()}`);
    console.log(`  bars: ${bars.length}, first bar size: ${barRect?.width}x${barRect?.height}`);
    console.log(`  h2: ${totalText}`);
    if (errors.length) console.log('  errors:', errors.slice(0,3));
  } catch (e) {
    console.log(`${url}: EXCEPTION ${e.message}`);
  }
  await page.close();
}
await browser.close();
