// Build-time script that converts backup/static/data/docs.json into compact
// artifacts for the client-side search page:
//
//   - public/data/search/items.json   (per-doc records, ≤ 10 MB target)
//   - public/data/search/facets.json  (aggregated counts)
//
// Usage:
//   node --max-old-space-size=4096 scripts/build-search-index.mjs
//
// The source JSON is ~72 MB, so parsing it needs ~800 MB RAM peak. The
// --max-old-space-size flag avoids OOM on some Node versions.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');

const SRC = path.join(ROOT, 'backup/static/data/docs.json');
const OUT_DIR = path.join(ROOT, 'public/data/search');
const OUT_ITEMS = path.join(OUT_DIR, 'items.json');
const OUT_FACETS = path.join(OUT_DIR, 'facets.json');

// How much of the description we keep as a compact excerpt.
const EXCERPT_MAX = 240;
// Cap agential / spatial arrays per record (used to limit JSON size).
const CHIPS_MAX = 12;

/**
 * Strip XML/TEI markup, collapse whitespace, and truncate.
 * @param {unknown} raw
 */
function toExcerpt(raw) {
  if (!raw) return '';
  const s = String(raw)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (s.length <= EXCERPT_MAX) return s;
  return s.slice(0, EXCERPT_MAX) + '…';
}

/** @param {unknown} s */
function toStr(s) {
  return typeof s === 'string' ? s : '';
}

/** @param {unknown} a */
function toStrArr(a) {
  if (!Array.isArray(a)) return [];
  const out = [];
  for (const v of a) {
    if (typeof v === 'string' && v.trim()) out.push(v);
  }
  return out;
}

async function main() {
  console.log(`[search-index] reading ${path.relative(ROOT, SRC)}`);
  const raw = await fs.readFile(SRC, 'utf8');
  console.log(`[search-index] bytes: ${raw.length.toLocaleString()}`);

  /** @type {Record<string, Record<string, unknown>>} */
  const docs = JSON.parse(raw);
  const keys = Object.keys(docs);
  console.log(`[search-index] records: ${keys.length.toLocaleString()}`);

  const items = new Array(keys.length);

  // Aggregated facet counts.
  const facets = {
    'category.lvl0': Object.create(null),
    'category.lvl1': Object.create(null),
    'date.lvl0': Object.create(null),
    'date.lvl1': Object.create(null),
    'date.lvl2': Object.create(null),
    agential: Object.create(null),
    spatial: Object.create(null),
    type: Object.create(null),
  };

  /**
   * @param {Record<string, Record<string, number>>} bucket
   * @param {string} key
   * @param {string} value
   */
  function bump(bucket, key, value) {
    if (!value) return;
    const b = bucket[key];
    b[value] = (b[value] ?? 0) + 1;
  }

  for (let i = 0; i < keys.length; i += 1) {
    const id = keys[i];
    const r = docs[id] || {};

    const label = toStr(r.label).replace(/\s+/g, ' ').trim();
    const category = /** @type {Record<string, unknown>} */ (r.category ?? {});
    const date = /** @type {Record<string, unknown>} */ (r.date ?? {});

    const cat0 = toStr(category.lvl0);
    const cat1 = toStr(category.lvl1);
    const d0 = toStr(date.lvl0);
    const d1 = toStr(date.lvl1);
    const d2 = toStr(date.lvl2);
    const type = toStr(r.type);
    const agential = toStrArr(r.agential);
    const spatial = toStrArr(r.spatial);
    const excerpt = toExcerpt(r.description);

    items[i] = {
      id,
      label,
      date_lvl0: d0,
      date_lvl1: d1,
      date_lvl2: d2,
      category_lvl0: cat0,
      category_lvl1: cat1,
      agential: agential.slice(0, CHIPS_MAX),
      spatial: spatial.slice(0, CHIPS_MAX),
      type,
      excerpt,
    };

    bump(facets, 'category.lvl0', cat0);
    bump(facets, 'category.lvl1', cat1);
    bump(facets, 'date.lvl0', d0);
    bump(facets, 'date.lvl1', d1);
    bump(facets, 'date.lvl2', d2);
    bump(facets, 'type', type);
    for (const v of agential) bump(facets, 'agential', v);
    for (const v of spatial) bump(facets, 'spatial', v);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });

  const itemsJson = JSON.stringify(items);
  await fs.writeFile(OUT_ITEMS, itemsJson, 'utf8');
  const itemsBytes = Buffer.byteLength(itemsJson);

  const facetsJson = JSON.stringify(facets);
  await fs.writeFile(OUT_FACETS, facetsJson, 'utf8');
  const facetsBytes = Buffer.byteLength(facetsJson);

  console.log(
    `[search-index] wrote items.json  : ${(itemsBytes / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(
    `[search-index] wrote facets.json : ${(facetsBytes / 1024 / 1024).toFixed(2)} MB`,
  );

  if (itemsBytes > 10 * 1024 * 1024) {
    console.warn(
      `[search-index] WARNING: items.json exceeds 10 MB budget (${(
        itemsBytes /
        1024 /
        1024
      ).toFixed(2)} MB). Shorten EXCERPT_MAX or drop fields.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
