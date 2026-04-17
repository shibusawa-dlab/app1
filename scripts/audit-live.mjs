#!/usr/bin/env node
/**
 * Live audit of the Cloudflare Workers deployment.
 * - Navigates a comprehensive set of routes.
 * - Captures HTTP status, pageerror, console.error, failed resources,
 *   mixed-content (http:// on an https:// page), title/body sanity.
 * - Writes /tmp/live-audit-results.json and prints a severity-sorted summary.
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'https://shibusawa-diary.na-kamura-1263.workers.dev';
const NAV_TIMEOUT_MS = 30000;
const SETTLE_MS = 3000;
const SITE_NAME_DUPLICATE_RE = /渋沢栄一ダイアリー.*渋沢栄一ダイアリー/;

const PATHS = [
  // Core
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
  '/ja/fulltext/',
  '/en/fulltext/',
  '/ja/static/dataset/',
  '/en/static/dataset/',
  '/ja/redirect/?p=/ja/about/',

  // Archival
  '/ja/ad/',
  '/ja/ad/DKB01/',
  '/ja/ad/DKB02/',
  '/ja/ad/DKB10001m/',
  '/ja/ad/DKB10002m/',
  '/ja/entity/',
  '/ja/entity/agential/',
  '/ja/entity/spatial/',
  '/ja/entity/agential/%E4%BD%90%E3%80%85%E6%9C%A8/',
  '/ja/entity/agential/佐々木/',
  '/ja/entity/agential/大隈/',
  '/ja/entity/spatial/飛鳥山邸/',
  '/ja/item/DKB10001m-0001/',
  '/ja/item/DKB10001m-0002/',

  // Interactive / viz
  '/ja/search/',
  '/ja/search/?q=渋沢',
  '/ja/calendar/',
  '/ja/calendar/month/1868/8/2/',
  '/ja/calendar/month/2099/1/1/',
  '/ja/map/',
  '/ja/network/',
  '/ja/network/佐々木/',
  '/ja/ngram/',
  '/ja/viewer/',
  '/ja/viewer/DKB01/',
];

function isFaviconIgnored(url) {
  try {
    const u = new URL(url);
    return u.pathname.endsWith('/favicon.ico');
  } catch {
    return url.includes('/favicon.ico');
  }
}

function classifyResource(resp) {
  try {
    const req = resp.request();
    return req.resourceType();
  } catch {
    return 'unknown';
  }
}

async function auditOne(page, path) {
  const url = BASE + path;

  const pageErrors = [];
  const consoleErrors = [];
  const failedResources = [];
  const requestedHttpUrls = new Set();
  const allResponses = [];

  const onPageError = (err) => {
    const raw = err && err.stack ? err.stack : String(err);
    pageErrors.push(raw);
  };
  const onConsole = (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  };
  const onResponse = (resp) => {
    const status = resp.status();
    const respUrl = resp.url();
    allResponses.push({ status, url: respUrl });
    if (status >= 400 && !isFaviconIgnored(respUrl)) {
      failedResources.push({
        status,
        url: respUrl,
        type: classifyResource(resp),
      });
    }
  };
  const onRequest = (req) => {
    const rurl = req.url();
    if (rurl.startsWith('http://')) {
      requestedHttpUrls.add(rurl);
    }
  };
  const onRequestFailed = (req) => {
    failedResources.push({
      status: 0,
      url: req.url(),
      type: req.resourceType(),
      failure: (req.failure() && req.failure().errorText) || 'unknown',
    });
  };

  page.on('pageerror', onPageError);
  page.on('console', onConsole);
  page.on('response', onResponse);
  page.on('request', onRequest);
  page.on('requestfailed', onRequestFailed);

  const result = {
    url,
    path,
    status: null,
    title: null,
    bodyPreview: null,
    h1: null,
    pageErrors: [],
    consoleErrors: [],
    failedResources: [],
    requestedHttpUrls: [],
    htmlHttpUrls: [],
    mixedContentHosts: {},
    titleDuplicate: false,
    emptyBody: false,
    loadingPlaceholder: false,
    navError: null,
  };

  try {
    // Use domcontentloaded — networkidle is unreachable when the site
    // fires background RSC prefetches that 500/503.
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: NAV_TIMEOUT_MS,
    });
    if (response) result.status = response.status();
    // Give client-side JS a moment to hydrate / fire errors.
    await page.waitForTimeout(SETTLE_MS);

    const title = await page.title().catch(() => '');
    result.title = title || '';
    if (SITE_NAME_DUPLICATE_RE.test(title || '')) result.titleDuplicate = true;

    const bodyText = await page
      .evaluate(() => (document.body && document.body.innerText) || '')
      .catch(() => '');
    const trimmed = (bodyText || '').trim();
    result.bodyPreview = trimmed.slice(0, 160);
    if (!trimmed) result.emptyBody = true;
    if (/^loading\.{0,3}$/i.test(trimmed)) result.loadingPlaceholder = true;

    result.h1 = await page
      .evaluate(() => {
        const els = Array.from(document.querySelectorAll('h1'));
        for (const el of els) {
          const t = (el.innerText || el.textContent || '').trim();
          if (t) return t;
        }
        return els.length === 0 ? null : '';
      })
      .catch(() => null);

    // Grab HTML to scan for http:// references (even if not requested).
    const html = await page.content().catch(() => '');
    const httpUrls = new Set();
    const re = /\bhttp:\/\/[^\s"'<>()]+/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      httpUrls.add(m[0]);
    }
    result.htmlHttpUrls = Array.from(httpUrls);
  } catch (err) {
    result.navError = err && err.message ? err.message : String(err);
  }

  // Detach listeners before moving on.
  page.off('pageerror', onPageError);
  page.off('console', onConsole);
  page.off('response', onResponse);
  page.off('request', onRequest);
  page.off('requestfailed', onRequestFailed);

  result.pageErrors = pageErrors;
  result.consoleErrors = consoleErrors;
  result.failedResources = failedResources;
  result.requestedHttpUrls = Array.from(requestedHttpUrls);

  // Compute mixed-content host summary (from html + requested).
  const mix = {};
  const addHttp = (u) => {
    try {
      const parsed = new URL(u);
      if (parsed.protocol !== 'http:') return;
      mix[parsed.hostname] = (mix[parsed.hostname] || 0) + 1;
    } catch {
      /* ignore */
    }
  };
  result.requestedHttpUrls.forEach(addHttp);
  result.htmlHttpUrls.forEach(addHttp);
  result.mixedContentHosts = mix;

  return result;
}

function severityOf(r) {
  const sevs = [];
  if (r.status === null || r.status !== 200) sevs.push('CRITICAL');
  if (r.pageErrors.length) sevs.push('HIGH');
  const nonFaviconFails = r.failedResources.filter((f) => !isFaviconIgnored(f.url));
  if (r.consoleErrors.length || nonFaviconFails.length) sevs.push('MEDIUM');
  if (Object.keys(r.mixedContentHosts).length) sevs.push('MIXED-CONTENT');
  if (r.titleDuplicate || r.emptyBody || r.loadingPlaceholder || r.h1 === null || r.h1 === '')
    sevs.push('WARNING');
  return sevs;
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: false });
  const page = await context.newPage();
  const results = [];

  try {
    for (const p of PATHS) {
      process.stdout.write(`Auditing ${p} ... `);
      const r = await auditOne(page, p);
      const sev = severityOf(r);
      r._severity = sev;
      results.push(r);
      const tag = sev.length ? sev.join(',') : 'OK';
      process.stdout.write(`${r.status ?? 'ERR'} [${tag}]\n`);
    }
  } finally {
    await context.close();
    await browser.close();
  }

  const output = {
    base: BASE,
    runAt: new Date().toISOString(),
    total: results.length,
    results,
  };
  writeFileSync('/tmp/live-audit-results.json', JSON.stringify(output, null, 2));

  // ---- Summary ----
  const critical = results.filter((r) => r._severity.includes('CRITICAL'));
  const high = results.filter((r) => r._severity.includes('HIGH'));
  const medium = results.filter((r) => r._severity.includes('MEDIUM'));
  const mixed = results.filter((r) => r._severity.includes('MIXED-CONTENT'));
  const warnings = results.filter((r) => r._severity.includes('WARNING'));

  console.log('\n=== LIVE AUDIT SUMMARY ===');
  console.log(`Base:     ${BASE}`);
  console.log(`Total:    ${results.length}`);
  console.log(`CRITICAL: ${critical.length}`);
  console.log(`HIGH:     ${high.length}`);
  console.log(`MEDIUM:   ${medium.length}`);
  console.log(`MIXED:    ${mixed.length}`);
  console.log(`WARNING:  ${warnings.length}`);

  const section = (name, items, fn) => {
    if (!items.length) return;
    console.log(`\n--- ${name} (${items.length}) ---`);
    for (const r of items) fn(r);
  };

  section('CRITICAL (status != 200)', critical, (r) => {
    console.log(`  ${r.status ?? 'ERR'}  ${r.path}${r.navError ? '  [nav: ' + r.navError + ']' : ''}`);
  });

  section('HIGH (pageerror)', high, (r) => {
    console.log(`  ${r.path}`);
    for (const e of r.pageErrors) {
      console.log(`    - ${String(e).split('\n')[0].slice(0, 240)}`);
    }
  });

  section('MIXED-CONTENT', mixed, (r) => {
    const hosts = Object.entries(r.mixedContentHosts)
      .map(([h, n]) => `${h}×${n}`)
      .join(', ');
    console.log(`  ${r.path}  →  ${hosts}`);
  });

  section('MEDIUM (console.error or failed resource)', medium, (r) => {
    console.log(`  ${r.path}`);
    for (const e of r.consoleErrors.slice(0, 5)) {
      console.log(`    [console] ${String(e).split('\n')[0].slice(0, 220)}`);
    }
    for (const f of r.failedResources.slice(0, 5)) {
      console.log(`    [res ${f.status}] ${f.url}`);
    }
  });

  section('WARNING', warnings, (r) => {
    const bits = [];
    if (r.titleDuplicate) bits.push('title-dup');
    if (r.emptyBody) bits.push('empty-body');
    if (r.loadingPlaceholder) bits.push('loading-placeholder');
    if (r.h1 === null) bits.push('no-h1');
    else if (r.h1 === '') bits.push('empty-h1');
    console.log(`  ${r.path}  [${bits.join(',')}]  title="${r.title}"`);
  });

  // Aggregate mixed-content hosts across whole site.
  const globalHosts = {};
  for (const r of results) {
    for (const [h, n] of Object.entries(r.mixedContentHosts)) {
      globalHosts[h] = (globalHosts[h] || 0) + n;
    }
  }
  const sortedHosts = Object.entries(globalHosts).sort((a, b) => b[1] - a[1]);
  if (sortedHosts.length) {
    console.log('\n--- Global MIXED-CONTENT host totals ---');
    for (const [h, n] of sortedHosts) console.log(`  ${h}  ×${n}`);
  }

  console.log('\nResults JSON: /tmp/live-audit-results.json');
}

main().catch((err) => {
  console.error('Fatal error in audit runner:', err);
  process.exit(2);
});
