#!/usr/bin/env node
// Smoke test for archival pages (AD, Entity, Item) on static-export build
// Runs against http://localhost:8123 (pre-started Python http.server on out/).

import { chromium } from '@playwright/test';
import fs from 'node:fs';

const BASE = 'http://localhost:8123';

const urls = [
  // AD
  '/ja/ad/',
  '/en/ad/',
  '/ja/ad/DKB01/',
  '/ja/ad/DKB02/',
  '/ja/ad/DKB10001m/',

  // Entity lists and types
  '/ja/entity/',
  '/en/entity/',
  '/ja/entity/agential/',
  '/ja/entity/spatial/',

  // Entity details (plain Japanese)
  '/ja/entity/agential/佐々木/',
  '/ja/entity/agential/大隈/',
  '/ja/entity/agential/%E4%BD%90%E3%80%85%E6%9C%A8/',
  '/ja/entity/spatial/飛鳥山邸/',
  '/ja/entity/spatial/%E9%A3%9B%E9%B3%A5%E5%B1%B1%E9%82%B8/',
  '/en/entity/agential/佐々木/',
  '/en/entity/spatial/飛鳥山邸/',

  // Item
  '/ja/item/DKB10001m-0001/',
  '/ja/item/DKB10001m-0002/',
  '/en/item/DKB10001m-0001/',
];

// Pairs of (encoded, decoded) entity URLs that should render the same page.
const encodedPairs = [
  {
    encoded: '/ja/entity/agential/%E4%BD%90%E3%80%85%E6%9C%A8/',
    decoded: '/ja/entity/agential/佐々木/',
  },
  {
    encoded: '/ja/entity/spatial/%E9%A3%9B%E9%B3%A5%E5%B1%B1%E9%82%B8/',
    decoded: '/ja/entity/spatial/飛鳥山邸/',
  },
];

function isFavicon(url) {
  return /\/favicon\.(ico|png|svg)(\?.*)?$/i.test(url);
}

async function testUrl(browser, pathname) {
  const fullUrl = BASE + pathname;
  const result = {
    url: pathname,
    fullUrl,
    status: null,
    title: null,
    h1: null,
    pageErrors: [],
    consoleErrors: [],
    failedResources: [],
    errors: [],
    ok: false,
  };

  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('pageerror', (err) => {
    result.pageErrors.push(err.message || String(err));
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      result.consoleErrors.push(msg.text());
    }
  });
  page.on('response', (resp) => {
    const status = resp.status();
    const u = resp.url();
    if (status >= 400 && !isFavicon(u)) {
      result.failedResources.push({ url: u, status });
    }
  });
  page.on('requestfailed', (req) => {
    const u = req.url();
    const errText = req.failure()?.errorText || 'requestfailed';
    // Ignore aborted prefetches/navigations — these are triggered by Next.js
    // cancelling background link prefetches when page transitions happen.
    // They are not real 4xx/5xx failures.
    if (!isFavicon(u) && errText !== 'net::ERR_ABORTED') {
      result.failedResources.push({ url: u, failure: errText });
    }
  });

  try {
    const resp = await page.goto(fullUrl, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    result.status = resp ? resp.status() : null;
    result.title = await page.title();
    const h1 = await page.locator('h1').first();
    result.h1 = (await h1.count()) ? (await h1.textContent())?.trim() || '' : '';
  } catch (e) {
    result.errors.push(`navigation: ${e.message}`);
  } finally {
    await context.close();
  }

  // Evaluate checks
  if (result.status !== 200) {
    result.errors.push(`status ${result.status}`);
  }
  if (!result.title || !result.title.trim()) {
    result.errors.push('empty title');
  } else if (/渋沢栄一ダイアリー.*渋沢栄一ダイアリー/.test(result.title)) {
    result.errors.push(`duplicated title: "${result.title}"`);
  }
  if (result.pageErrors.length) {
    result.errors.push(`pageerror x${result.pageErrors.length}: ${result.pageErrors[0]}`);
  }
  if (result.consoleErrors.length) {
    result.errors.push(
      `console.error x${result.consoleErrors.length}: ${result.consoleErrors[0]}`
    );
  }
  if (result.failedResources.length) {
    const r = result.failedResources[0];
    result.errors.push(
      `failed resource x${result.failedResources.length}: ${r.status || r.failure} ${r.url}`
    );
  }
  if (result.h1 === null || result.h1 === '') {
    result.errors.push('empty or missing <h1>');
  }
  result.ok = result.errors.length === 0;
  return result;
}

(async () => {
  const browser = await chromium.launch();
  const results = [];
  for (const u of urls) {
    process.stdout.write(`Testing ${u} ... `);
    const r = await testUrl(browser, u);
    results.push(r);
    console.log(r.ok ? 'OK' : `FAIL (${r.errors.join(' | ')})`);
  }

  // Encoded-vs-decoded equivalence checks
  const equivalenceChecks = [];
  for (const pair of encodedPairs) {
    const rEnc = results.find((x) => x.url === pair.encoded);
    const rDec = results.find((x) => x.url === pair.decoded);
    const check = {
      encoded: pair.encoded,
      decoded: pair.decoded,
      encodedStatus: rEnc?.status ?? null,
      decodedStatus: rDec?.status ?? null,
      encodedH1: rEnc?.h1 ?? null,
      decodedH1: rDec?.h1 ?? null,
      encodedTitle: rEnc?.title ?? null,
      decodedTitle: rDec?.title ?? null,
      // Equivalence is about the *content* of the page (h1 + title), not
      // about whether unrelated smoke-checks (e.g. console noise) passed.
      equal:
        rEnc && rDec &&
        rEnc.status === 200 && rDec.status === 200 &&
        !!rEnc.h1 && rEnc.h1 === rDec.h1 &&
        !!rEnc.title && rEnc.title === rDec.title,
    };
    equivalenceChecks.push(check);
    console.log(
      `Equivalence ${pair.encoded} <-> ${pair.decoded}: ${check.equal ? 'OK' : 'MISMATCH'}`
    );
  }

  await browser.close();

  const summary = {
    base: BASE,
    total: results.length,
    passed: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    failures: results
      .filter((r) => !r.ok)
      .map((r) => ({ url: r.url, errors: r.errors })),
    equivalenceChecks,
    results,
  };

  fs.writeFileSync('/tmp/smoke-archival-results.json', JSON.stringify(summary, null, 2));
  console.log('\n=== SUMMARY ===');
  console.log(`Total: ${summary.total}  Pass: ${summary.passed}  Fail: ${summary.failed}`);
  if (summary.failures.length) {
    console.log('\nFailures:');
    for (const f of summary.failures) {
      console.log(`  ${f.url}`);
      for (const e of f.errors) console.log(`    - ${e}`);
    }
  }
  console.log('\nEquivalence:');
  for (const c of equivalenceChecks) {
    console.log(`  ${c.encoded} == ${c.decoded} ? ${c.equal ? 'YES' : 'NO'}`);
    if (!c.equal) {
      console.log(`    enc h1: ${c.encodedH1}`);
      console.log(`    dec h1: ${c.decodedH1}`);
    }
  }
  process.exit(summary.failed === 0 ? 0 : 1);
})();
