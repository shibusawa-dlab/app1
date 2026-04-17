import { chromium } from 'playwright';
const browser = await chromium.launch();

const tests = [
  ['entity-desktop', 'https://shibusawa-diary.na-kamura-1263.workers.dev/ja/entity/spatial/飛鳥山邸/', 1280, 900],
  ['calendar-desktop', 'https://shibusawa-diary.na-kamura-1263.workers.dev/ja/calendar/', 1280, 900],
  ['entity-mobile', 'https://shibusawa-diary.na-kamura-1263.workers.dev/ja/entity/spatial/飛鳥山邸/', 375, 800],
];

for (const [name, url, w, h] of tests) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => {
    const chart = document.querySelector('[class*="items-stretch"][class*="gap-"], [class*="items-end"][class*="gap-"]');
    if (!chart) return { missing: true };
    const bars = chart.querySelectorAll('div > div');
    return {
      chartH: chart.clientHeight,
      barCount: bars.length,
      firstBarH: Math.round(bars[0]?.getBoundingClientRect()?.height || 0),
      maxBarH: Math.round(Math.max(...Array.from(bars).map(b => b.getBoundingClientRect().height))),
      parent: chart.parentElement.className.slice(0, 100),
    };
  });
  console.log(`${name}:`, JSON.stringify(info));
  await page.screenshot({ path: `/tmp/${name}.png`, clip: { x: 0, y: 0, width: w, height: Math.min(700, h) } });
  await page.close();
}
await browser.close();
