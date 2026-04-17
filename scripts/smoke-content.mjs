#!/usr/bin/env node
/**
 * Smoke tests for the static-export content pages.
 * Runs Playwright against http://localhost:8123 and writes JSON results
 * to /tmp/smoke-content-results.json.
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:8123';

const PATHS = [
  '/',
  '/ja/',
  '/en/',
  '/ja/about/',
  '/en/about/',
  '/ja/news/',
  '/en/news/',
  '/ja/news/2021-04-23/',
  '/ja/news/2022-06-02/',
  '/ja/news/2022-06-21/',
  '/en/news/2021-04-23/',
  '/en/news/2022-06-02/',
  '/ja/fulltext/',
  '/en/fulltext/',
  '/ja/static/dataset/',
  '/en/static/dataset/',
  '/ja/redirect/?p=/ja/about/',
  '/en/redirect/?p=/en/about/',
];

const SITE_NAME_DUPLICATE_RE = /渋沢栄一ダイアリー.*渋沢栄一ダイアリー/;
const NAV_TIMEOUT_MS = 30000;

function isFaviconIgnored(url) {
  try {
    const u = new URL(url);
    return u.pathname.endsWith('/favicon.ico');
  } catch {
    return url.includes('/favicon.ico');
  }
}

async function testOne(browser, path) {
  const url = BASE + path;
  const context = await browser.newContext();
  const page = await context.newPage();

  const pageErrors = [];
  const consoleErrors = [];
  const failedResources = [];

  page.on('pageerror', (err) => {
    pageErrors.push(err && err.stack ? err.stack.split('\n')[0] : String(err));
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('response', (resp) => {
    const status = resp.status();
    if (status >= 400 && !isFaviconIgnored(resp.url())) {
      failedResources.push(`${status} ${resp.url()}`);
    }
  });

  const result = {
    url,
    path,
    ok: true,
    status: null,
    title: null,
    failures: [],
    pageErrors: [],
    consoleErrors: [],
    failedResources: [],
  };

  try {
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: NAV_TIMEOUT_MS,
    });

    if (!response) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: 'No response object from page.goto()',
      });
    } else {
      result.status = response.status();
      if (result.status !== 200) {
        result.ok = false;
        result.failures.push({
          class: 'network',
          message: `Top-level status ${result.status}`,
        });
      }
    }

    // Title checks.
    const title = await page.title();
    result.title = title;
    if (!title || !title.trim()) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: 'document.title is empty',
      });
    } else if (SITE_NAME_DUPLICATE_RE.test(title)) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: `Site name duplicated in title: "${title}"`,
      });
    }

    // Body visible content check.
    const bodyText = (await page.evaluate(() => {
      return (document.body && document.body.innerText) || '';
    })).trim();
    if (!bodyText) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: 'Body has no visible text',
      });
    } else if (/^loading\.{0,3}$/i.test(bodyText)) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: `Body shows only loading placeholder: "${bodyText}"`,
      });
    }

    // H1 check — visible h1 not empty.
    const h1Text = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('h1'));
      for (const el of els) {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        const t = (el.innerText || el.textContent || '').trim();
        if (t) return t;
      }
      // If there was an h1 but none visible/non-empty, distinguish.
      return els.length === 0 ? null : '';
    });
    if (h1Text === null) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: 'No <h1> element found',
      });
    } else if (h1Text === '') {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: '<h1> element found but empty or hidden',
      });
    }

    // Header + Footer.
    const hasHeader = await page.evaluate(() => !!document.querySelector('header'));
    const hasFooter = await page.evaluate(() => !!document.querySelector('footer'));
    if (!hasHeader) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: 'No <header> element in DOM',
      });
    }
    if (!hasFooter) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: 'No <footer> element in DOM',
      });
    }
  } catch (err) {
    result.ok = false;
    result.failures.push({
      class: 'page',
      message: `Navigation/eval error: ${err && err.message ? err.message : String(err)}`,
    });
  }

  // Drain listener buffers.
  if (pageErrors.length) {
    result.pageErrors = pageErrors;
    result.ok = false;
    for (const msg of pageErrors) {
      result.failures.push({ class: 'page', message: msg });
    }
  }
  if (consoleErrors.length) {
    result.consoleErrors = consoleErrors;
    result.ok = false;
    for (const msg of consoleErrors) {
      result.failures.push({ class: 'console', message: msg });
    }
  }
  if (failedResources.length) {
    result.failedResources = failedResources;
    result.ok = false;
    for (const msg of failedResources) {
      result.failures.push({ class: 'network', message: msg });
    }
  }

  await context.close();
  return result;
}

async function main() {
  const browser = await chromium.launch();
  const results = [];

  try {
    for (const p of PATHS) {
      process.stdout.write(`Testing ${p} ... `);
      const r = await testOne(browser, p);
      results.push(r);
      process.stdout.write(r.ok ? 'PASS\n' : `FAIL (${r.failures.length})\n`);
    }
  } finally {
    await browser.close();
  }

  const pass = results.filter((r) => r.ok).length;
  const fail = results.length - pass;

  const summary = {
    base: BASE,
    total: results.length,
    pass,
    fail,
    runAt: new Date().toISOString(),
    results,
  };

  writeFileSync('/tmp/smoke-content-results.json', JSON.stringify(summary, null, 2));

  console.log('\n=== Smoke Test Summary ===');
  console.log(`Base:  ${BASE}`);
  console.log(`Total: ${results.length}`);
  console.log(`Pass:  ${pass}`);
  console.log(`Fail:  ${fail}`);
  console.log('');
  if (fail > 0) {
    console.log('--- Failures ---');
    for (const r of results) {
      if (r.ok) continue;
      console.log(`\n[FAIL] ${r.url}`);
      console.log(`  title: ${r.title === null ? '<null>' : JSON.stringify(r.title)}`);
      console.log(`  status: ${r.status}`);
      for (const f of r.failures) {
        const oneLine = String(f.message).split('\n')[0].slice(0, 300);
        console.log(`  - [${f.class}] ${oneLine}`);
      }
    }
  } else {
    console.log('All URLs passed.');
  }

  console.log(`\nResults JSON: /tmp/smoke-content-results.json`);

  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error in smoke runner:', err);
  process.exit(2);
});
