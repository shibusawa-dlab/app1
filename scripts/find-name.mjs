import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('pageerror', e => console.log('ERR:', e.message, '\nSTACK:', e.stack?.slice(0, 1500)));
await page.goto('https://shibusawa-diary.na-kamura-1263.workers.dev/ja/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);
await browser.close();
