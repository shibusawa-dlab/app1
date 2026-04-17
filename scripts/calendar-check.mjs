import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('https://shibusawa-diary.na-kamura-1263.workers.dev/ja/calendar/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  const chartEl = document.querySelector('.flex.items-end');
  if (!chartEl) return { error: 'no chart found' };
  const bars = chartEl.querySelectorAll('div > div');
  const firstBar = bars[0]?.getBoundingClientRect();
  return {
    chart: {
      classes: chartEl.className,
      clientHeight: chartEl.clientHeight,
      bars: bars.length,
    },
    firstBar: firstBar ? { w: firstBar.width, h: firstBar.height } : null,
  };
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: '/tmp/calendar-chart.png', clip: { x: 0, y: 100, width: 1280, height: 400 } });
await browser.close();
