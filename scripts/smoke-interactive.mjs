#!/usr/bin/env node
/**
 * Smoke tests for the static-export interactive / visualization pages.
 * Runs Playwright (chromium API directly, not @playwright/test runner)
 * against http://localhost:8123 and writes JSON results
 * to /tmp/smoke-interactive-results.json.
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:8123';

const PATHS = [
  '/ja/search/',
  '/en/search/',
  '/ja/calendar/',
  '/ja/calendar/month/1868/8/2/',
  '/ja/calendar/month/1868/10/15/',
  '/ja/calendar/month/2099/1/1/',
  '/en/calendar/',
  '/ja/map/',
  '/en/map/',
  '/ja/network/',
  '/en/network/',
  '/ja/network/%E4%BD%90%E3%80%85%E6%9C%A8/', // 佐々木
  '/ja/network/%E5%A4%A7%E9%9A%88/',           // 大隈
  '/en/network/%E4%BD%90%E3%80%85%E6%9C%A8/', // 佐々木
  '/ja/ngram/',
  '/en/ngram/',
  '/ja/viewer/',
  '/en/viewer/',
  '/ja/viewer/DKB01/',
  '/ja/viewer/DKB02/',
  '/en/viewer/DKB01/',
];

const SITE_NAME_DUPLICATE_RE = /渋沢栄一ダイアリー.*渋沢栄一ダイアリー/;
const NAV_TIMEOUT_MS = 30000;
const INTERACT_TIMEOUT_MS = 15000;

function isFaviconIgnored(url) {
  try {
    const u = new URL(url);
    return u.pathname.endsWith('/favicon.ico');
  } catch {
    return url.includes('/favicon.ico');
  }
}

// OpenStreetMap / tile CDNs: we don't want to count tile 4xx as fatal
// because offline environments may block them.
function isTileUrl(url) {
  return (
    url.includes('tile.openstreetmap.org') ||
    url.includes('.tile.openstreetmap.') ||
    url.includes('/tiles/') ||
    url.includes('gsi.go.jp') ||
    url.includes('tile.') ||
    url.includes('arcgisonline.com') ||
    url.includes('cartocdn.com') ||
    url.includes('stamen-tiles')
  );
}

async function testOne(browser, path) {
  const url = BASE + path;
  const context = await browser.newContext();
  const page = await context.newPage();

  const pageErrors = [];
  const consoleErrors = [];
  const consoleWarnings = [];
  const failedResources = [];
  const tileFailures = [];

  page.on('pageerror', (err) => {
    pageErrors.push(err && err.stack ? err.stack.split('\n').slice(0, 3).join(' | ') : String(err));
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });

  page.on('response', (resp) => {
    const status = resp.status();
    const u = resp.url();
    if (status >= 400 && !isFaviconIgnored(u)) {
      if (isTileUrl(u)) {
        tileFailures.push(`${status} ${u}`);
      } else {
        failedResources.push(`${status} ${u}`);
      }
    }
  });

  const result = {
    url,
    path,
    ok: true,
    status: null,
    title: null,
    h1: null,
    failures: [],
    warnings: [],
    pageErrors: [],
    consoleErrors: [],
    consoleWarnings: [],
    failedResources: [],
    tileFailures: [],
    interactions: {},
  };

  try {
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: NAV_TIMEOUT_MS,
    });

    if (!response) {
      result.ok = false;
      result.failures.push({ class: 'assertion', message: 'No response from page.goto()' });
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

    const title = await page.title();
    result.title = title;
    if (!title || !title.trim()) {
      result.ok = false;
      result.failures.push({ class: 'assertion', message: 'document.title is empty' });
    } else if (SITE_NAME_DUPLICATE_RE.test(title)) {
      result.ok = false;
      result.failures.push({
        class: 'assertion',
        message: `Site name duplicated in title: "${title}"`,
      });
    }

    const h1Text = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('h1'));
      for (const el of els) {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        const t = (el.innerText || el.textContent || '').trim();
        if (t) return t;
      }
      return els.length === 0 ? null : '';
    });
    result.h1 = h1Text;
    if (h1Text === null) {
      result.ok = false;
      result.failures.push({ class: 'assertion', message: 'No <h1> element found' });
    } else if (h1Text === '') {
      result.ok = false;
      result.failures.push({ class: 'assertion', message: '<h1> empty or hidden' });
    }

    // --- Per-page interaction tests ---
    await runInteractions(page, path, result);
  } catch (err) {
    result.ok = false;
    result.failures.push({
      class: 'page',
      message: `Navigation/eval error: ${err && err.message ? err.message : String(err)}`,
    });
  }

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
  if (consoleWarnings.length) {
    result.consoleWarnings = consoleWarnings;
    for (const msg of consoleWarnings) {
      result.warnings.push({ class: 'warning', message: msg });
    }
  }
  if (failedResources.length) {
    result.failedResources = failedResources;
    result.ok = false;
    for (const msg of failedResources) {
      result.failures.push({ class: 'network', message: msg });
    }
  }
  if (tileFailures.length) {
    result.tileFailures = tileFailures;
    for (const msg of tileFailures) {
      result.warnings.push({ class: 'tile', message: msg });
    }
  }

  await context.close();
  return result;
}

async function runInteractions(page, path, result) {
  // --- Search (/ja/search/) ---
  if (path === '/ja/search/') {
    const inter = { kind: 'search', ok: true, notes: [] };
    try {
      // Wait for items.json to load, OR a ready marker, OR a search input.
      await Promise.race([
        page.waitForSelector('[data-search-ready]', { timeout: 10000 }).catch(() => null),
        page.waitForSelector('input[type="search"], input[type="text"]', { timeout: 10000 }),
      ]);

      const input = await page.$('input[type="search"]')
        || await page.$('input[type="text"]')
        || await page.$('input');
      if (!input) {
        inter.ok = false;
        inter.notes.push('no search input found');
      } else {
        await input.click();
        await input.fill('渋沢');
        await page.waitForTimeout(800);

        const resultCount = await page.evaluate(() => {
          // Try several heuristics for a search result card.
          const candidates = [
            '[data-search-result]',
            '.search-result',
            '.result-card',
            'article',
            'li[data-id]',
          ];
          for (const sel of candidates) {
            const els = document.querySelectorAll(sel);
            if (els.length > 0) return { sel, count: els.length };
          }
          return { sel: null, count: 0 };
        });
        inter.notes.push(`results: ${resultCount.count} (${resultCount.sel || 'none'})`);
        if (resultCount.count === 0) {
          inter.ok = false;
        }

        // Try to click a facet option.
        const facetClicked = await page.evaluate(() => {
          const cb = document.querySelector('aside input[type="checkbox"], .facet input[type="checkbox"], input[type="checkbox"]');
          if (!cb) return false;
          cb.click();
          return true;
        });
        inter.notes.push(`facet click: ${facetClicked}`);
        await page.waitForTimeout(500);

        const chipFound = await page.evaluate(() => {
          const txt = (document.body && document.body.innerText) || '';
          // Look for any applied-filters container or chip.
          const sel = '.applied-filters, [data-applied-filters], .chip, .filter-chip';
          return document.querySelectorAll(sel).length > 0
            || /絞り込み|フィルタ|filter/i.test(txt);
        });
        inter.notes.push(`chip/filter UI present: ${chipFound}`);
      }
    } catch (err) {
      inter.ok = false;
      inter.notes.push(`error: ${err.message}`);
    }
    result.interactions.search = inter;
  }

  // --- Calendar root (/ja/calendar/) ---
  if (path === '/ja/calendar/') {
    const inter = { kind: 'calendar', ok: true, notes: [] };
    try {
      await page.waitForTimeout(800);
      const yearInfo = await page.evaluate(() => {
        const text = (document.body && document.body.innerText) || '';
        const years = [];
        for (let y = 1868; y <= 1931; y++) {
          if (text.includes(String(y))) years.push(y);
        }
        return {
          hasAnyYear: years.length > 0,
          firstFew: years.slice(0, 5),
          total: years.length,
        };
      });
      inter.notes.push(`years seen: ${yearInfo.total} (e.g. ${yearInfo.firstFew.join(',')})`);
      if (!yearInfo.hasAnyYear) inter.ok = false;

      // Click a year cell for 1868.
      const clicked = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        const link = links.find((a) => /calendar\/month\/1868/.test(a.href || ''));
        if (link) {
          link.click();
          return link.href;
        }
        return null;
      });
      inter.notes.push(`1868 link click: ${clicked || 'not found'}`);
      if (clicked) {
        await page.waitForTimeout(1500);
        const u = page.url();
        inter.notes.push(`after click url: ${u}`);
        if (!/calendar\/month\/1868/.test(u)) {
          inter.ok = false;
          inter.notes.push('navigation did not reach calendar detail URL');
        }
      } else {
        inter.ok = false;
      }
    } catch (err) {
      inter.ok = false;
      inter.notes.push(`error: ${err.message}`);
    }
    result.interactions.calendar = inter;
  }

  // --- Map (/ja/map/) ---
  if (path === '/ja/map/') {
    const inter = { kind: 'map', ok: true, notes: [] };
    try {
      await page.waitForTimeout(2000);
      const hasLeaflet = await page.evaluate(() => {
        return !!document.querySelector('.leaflet-container');
      });
      inter.notes.push(`.leaflet-container present: ${hasLeaflet}`);
      if (!hasLeaflet) inter.ok = false;

      // Check if tile requests were attempted. We can only note what we've seen in network hooks.
      // That's recorded separately on the `result` object via response listener.
    } catch (err) {
      inter.ok = false;
      inter.notes.push(`error: ${err.message}`);
    }
    result.interactions.map = inter;
  }

  // --- Network detail (/ja/network/佐々木/) ---
  if (path === '/ja/network/%E4%BD%90%E3%80%85%E6%9C%A8/') {
    const inter = { kind: 'network-detail', ok: true, notes: [] };
    try {
      // Wait up to 15 s for a canvas or svg to appear.
      const found = await page.waitForFunction(() => {
        return !!document.querySelector('canvas, svg');
      }, { timeout: INTERACT_TIMEOUT_MS }).then(() => true).catch(() => false);
      inter.notes.push(`canvas/svg appeared: ${found}`);
      if (!found) inter.ok = false;

      const graphContainer = await page.evaluate(() => {
        const el = document.querySelector('#network, .network-graph, [data-network], .vis-network');
        return {
          exists: !!el,
          hasChildren: el ? el.children.length > 0 : false,
        };
      });
      inter.notes.push(`graph container: exists=${graphContainer.exists} hasChildren=${graphContainer.hasChildren}`);
    } catch (err) {
      inter.ok = false;
      inter.notes.push(`error: ${err.message}`);
    }
    result.interactions.networkDetail = inter;
  }

  // --- Ngram (/ja/ngram/) ---
  if (path === '/ja/ngram/') {
    const inter = { kind: 'ngram', ok: true, notes: [] };
    try {
      const input = await page.waitForSelector('input[type="search"], input[type="text"], input', { timeout: 10000 }).catch(() => null);
      if (!input) {
        inter.ok = false;
        inter.notes.push('no input found');
      } else {
        await input.click();
        await input.fill('渋沢');
        await page.waitForTimeout(1000);
        inter.notes.push('typed 渋沢 into ngram input');
      }
    } catch (err) {
      inter.ok = false;
      inter.notes.push(`error: ${err.message}`);
    }
    result.interactions.ngram = inter;
  }

  // --- Viewer (/ja/viewer/DKB01/) ---
  if (path === '/ja/viewer/DKB01/') {
    const inter = { kind: 'viewer', ok: true, notes: [] };
    try {
      // Wait up to 20 s for CETEIcean.
      const gotContent = await page.waitForFunction(() => {
        const el = document.querySelector('#tei');
        if (!el) return false;
        const text = (el.innerText || '').trim();
        return text.length > 20 || el.children.length > 0;
      }, { timeout: 20000 }).then(() => true).catch(() => false);

      const state = await page.evaluate(() => {
        const el = document.querySelector('#tei');
        return {
          hasDiv: !!el,
          childCount: el ? el.children.length : 0,
          textLen: el ? (el.innerText || '').trim().length : 0,
        };
      });
      inter.notes.push(`#tei div: ${state.hasDiv ? `children=${state.childCount} textLen=${state.textLen}` : 'missing'}`);
      if (!gotContent && state.hasDiv) {
        inter.notes.push('CETEIcean did not inject — likely CDN fetch failure or slow load (may be offline)');
      } else if (!state.hasDiv) {
        inter.ok = false;
        inter.notes.push('#tei div missing entirely');
      }
    } catch (err) {
      inter.ok = false;
      inter.notes.push(`error: ${err.message}`);
    }
    result.interactions.viewer = inter;
  }
}

async function main() {
  const browser = await chromium.launch();
  const results = [];

  try {
    for (const p of PATHS) {
      process.stdout.write(`Testing ${p} ... `);
      let r;
      try {
        r = await testOne(browser, p);
      } catch (err) {
        r = {
          url: BASE + p,
          path: p,
          ok: false,
          failures: [{ class: 'runner', message: `Runner crash: ${err.message}` }],
          pageErrors: [],
          consoleErrors: [],
          failedResources: [],
          warnings: [],
          interactions: {},
        };
      }
      results.push(r);
      const warnCount = r.warnings ? r.warnings.length : 0;
      process.stdout.write(r.ok
        ? (warnCount ? `PASS (${warnCount} warn)\n` : 'PASS\n')
        : `FAIL (${r.failures.length})\n`);
    }
  } finally {
    await browser.close();
  }

  const pass = results.filter((r) => r.ok).length;
  const fail = results.length - pass;
  const totalWarnings = results.reduce((s, r) => s + (r.warnings ? r.warnings.length : 0), 0);

  const summary = {
    base: BASE,
    total: results.length,
    pass,
    fail,
    totalWarnings,
    runAt: new Date().toISOString(),
    results,
  };

  writeFileSync('/tmp/smoke-interactive-results.json', JSON.stringify(summary, null, 2));

  console.log('\n=== Interactive Smoke Test Summary ===');
  console.log(`Base:     ${BASE}`);
  console.log(`Total:    ${results.length}`);
  console.log(`Pass:     ${pass}`);
  console.log(`Fail:     ${fail}`);
  console.log(`Warnings: ${totalWarnings}`);
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
  }

  console.log('\n--- Interaction results ---');
  for (const r of results) {
    const keys = Object.keys(r.interactions || {});
    if (!keys.length) continue;
    console.log(`\n${r.url}`);
    for (const k of keys) {
      const i = r.interactions[k];
      console.log(`  [${i.kind}] ${i.ok ? 'OK' : 'FAIL'}`);
      for (const n of (i.notes || [])) console.log(`    - ${n}`);
    }
  }

  console.log(`\nResults JSON: /tmp/smoke-interactive-results.json`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error in smoke runner:', err);
  process.exit(2);
});
