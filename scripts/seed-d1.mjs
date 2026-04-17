#!/usr/bin/env node
/**
 * Seed D1 database from local JSON files.
 *
 * Usage:
 *   node --max-old-space-size=4096 scripts/seed-d1.mjs
 *
 * This generates SQL files in /tmp/d1-seed-*.sql and uploads them
 * via `wrangler d1 execute` in batches.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const DB_NAME = 'shibusawa-diary-db';
const BACKUP = join(process.cwd(), 'backup', 'static');

function esc(s) {
  if (s == null) return 'NULL';
  return `'${String(s).replace(/'/g, "''")}'`;
}

function jsonEsc(val) {
  if (val == null) return 'NULL';
  return esc(JSON.stringify(val));
}

function runSQL(label, sqlFile) {
  console.log(`  Uploading ${label}...`);
  try {
    execSync(`wrangler d1 execute ${DB_NAME} --remote --file ${sqlFile}`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 120_000,
    });
    console.log(`  ✓ ${label} done`);
  } catch (e) {
    console.error(`  ✗ ${label} failed:`, e.stderr?.toString().slice(0, 300));
  }
}

// ── 1. Items (docs.json) ──
console.log('1/7 Loading docs.json...');
const docs = JSON.parse(readFileSync(join(BACKUP, 'data', 'docs.json'), 'utf-8'));
const docKeys = Object.keys(docs);
console.log(`   ${docKeys.length} items`);

const BATCH = 500;
for (let i = 0; i < docKeys.length; i += BATCH) {
  const batch = docKeys.slice(i, i + BATCH);
  const stmts = batch.map((id) => {
    const d = docs[id];
    const year = d.date?.lvl0 ? parseInt(d.date.lvl0) : null;
    return `INSERT OR REPLACE INTO items (id,label,description,xml,agential,spatial,temporal,date_lvl0,date_lvl1,date_lvl2,category_lvl0,category_lvl1,year,year_and_month,manifest,canvas,source,prev_id,next_id,sort_key,type) VALUES (${esc(id)},${esc(d.label)},${esc(d.description)},${esc(d.xml)},${jsonEsc(d.agential)},${jsonEsc(d.spatial)},${esc(d.temporal)},${esc(d.date?.lvl0)},${esc(d.date?.lvl1)},${esc(d.date?.lvl2)},${esc(d.category?.lvl0)},${esc(d.category?.lvl1)},${year ?? 'NULL'},${esc(d.yearAndMonth)},${esc(d.manifest)},${esc(d.canvas)},${esc(d.source)},${esc(d.prev)},${esc(d.next)},${esc(d.sort)},${esc(d.type)});`;
  });

  // FTS index
  const ftsStmts = batch.map((id) => {
    const d = docs[id];
    const agStr = Array.isArray(d.agential) ? d.agential.join(' ') : '';
    const spStr = Array.isArray(d.spatial) ? d.spatial.join(' ') : '';
    const desc = (d.description || '').replace(/<[^>]*>/g, '').slice(0, 500);
    return `INSERT INTO items_fts (id,label,description,agential,spatial) VALUES (${esc(id)},${esc(d.label)},${esc(desc)},${esc(agStr)},${esc(spStr)});`;
  });

  const sql = stmts.join('\n') + '\n' + ftsStmts.join('\n');
  const file = `/tmp/d1-seed-items-${i}.sql`;
  writeFileSync(file, sql);
  runSQL(`items batch ${i}-${i + batch.length}`, file);
}

// ── 2. Entities (entity.json) ──
console.log('2/7 Loading entity.json...');
const entityData = JSON.parse(readFileSync(join(BACKUP, 'data', 'entity.json'), 'utf-8'));
const entityStmts = [];
for (const type of ['agential', 'spatial']) {
  for (const e of entityData[type] || []) {
    const desc = typeof e.description === 'string' ? e.description : e.description?.value;
    entityStmts.push(`INSERT OR REPLACE INTO entities (id,type,value,description,image) VALUES (${esc(e.id)},${esc(type)},${e.value ?? 0},${esc(desc)},${esc(e.image)});`);
  }
}
console.log(`   ${entityStmts.length} entities`);
for (let i = 0; i < entityStmts.length; i += BATCH) {
  const file = `/tmp/d1-seed-entities-${i}.sql`;
  writeFileSync(file, entityStmts.slice(i, i + BATCH).join('\n'));
  runSQL(`entities batch ${i}`, file);
}

// ── 3. Calendar (date/*.json) ──
console.log('3/7 Loading calendar entries...');
const dateDir = join(BACKUP, 'api', 'date');
const dateFiles = readdirSync(dateDir).filter((f) => f.endsWith('.json'));
console.log(`   ${dateFiles.length} dates`);
const calStmts = dateFiles.map((f) => {
  const dateStr = f.replace('.json', '');
  const [y, m, d] = dateStr.split('-').map(Number);
  const data = readFileSync(join(dateDir, f), 'utf-8');
  return `INSERT OR REPLACE INTO calendar_entries (date,year,month,day,data) VALUES (${esc(dateStr)},${y},${m},${d},${esc(data)});`;
});
for (let i = 0; i < calStmts.length; i += BATCH) {
  const file = `/tmp/d1-seed-calendar-${i}.sql`;
  writeFileSync(file, calStmts.slice(i, i + BATCH).join('\n'));
  runSQL(`calendar batch ${i}`, file);
}

// ── 4. Ngram (ngram.json) ──
console.log('4/7 Loading ngram.json...');
const ngramRaw = JSON.parse(readFileSync(join(BACKUP, 'data', 'ngram.json'), 'utf-8'));
const ngramStmts = [];
const yearTotals = {};
for (const [term, yearData] of Object.entries(ngramRaw)) {
  if (term === 'ngramAll') {
    for (const [y, total] of Object.entries(yearData)) {
      yearTotals[y] = total;
    }
    continue;
  }
  for (const [y, freq] of Object.entries(yearData)) {
    if (freq > 0) {
      ngramStmts.push(`INSERT OR REPLACE INTO ngrams (term,year,freq) VALUES (${esc(term)},${parseInt(y)},${freq});`);
    }
  }
}
console.log(`   ${ngramStmts.length} ngram rows`);
for (let i = 0; i < ngramStmts.length; i += BATCH) {
  const file = `/tmp/d1-seed-ngram-${i}.sql`;
  writeFileSync(file, ngramStmts.slice(i, i + BATCH).join('\n'));
  runSQL(`ngram batch ${i}`, file);
}

// Ngram totals
const totalStmts = Object.entries(yearTotals).map(
  ([y, t]) => `INSERT OR REPLACE INTO ngram_totals (year,total) VALUES (${parseInt(y)},${t});`
);
if (totalStmts.length > 0) {
  const file = '/tmp/d1-seed-ngram-totals.sql';
  writeFileSync(file, totalStmts.join('\n'));
  runSQL('ngram totals', file);
}

// ── 5. AD (ad.json) ──
console.log('5/7 Loading ad.json...');
const adData = JSON.parse(readFileSync(join(BACKUP, 'data', 'ad.json'), 'utf-8'));
const adStmts = adData.map((item) => {
  const id = item['@id']?.split('/items/')?.[1] || item['@id'] || '';
  return `INSERT OR REPLACE INTO ad_items (id,data) VALUES (${esc(id)},${esc(JSON.stringify(item))});`;
});
console.log(`   ${adStmts.length} AD items`);
const adFile = '/tmp/d1-seed-ad.sql';
writeFileSync(adFile, adStmts.join('\n'));
runSQL('ad items', adFile);

// ── 6. Network edges (from agentials/*.json) ──
console.log('6/7 Building network edges...');
const agentialsDir = join(BACKUP, 'data', 'agentials');
let edgeCount = 0;
const edgeBatches = [];
let currentBatch = [];

try {
  const agFiles = readdirSync(agentialsDir).filter((f) => f.endsWith('.json'));
  for (const f of agFiles) {
    try {
      const data = JSON.parse(readFileSync(join(agentialsDir, f), 'utf-8'));
      const person1 = f.replace('.json', '');
      if (data.edges) {
        for (const edge of data.edges) {
          const person2 = edge.to || edge.from;
          const weight = edge.value || edge.weight || 1;
          if (person2 && person2 !== person1) {
            currentBatch.push(`INSERT OR REPLACE INTO network_edges (person1,person2,weight) VALUES (${esc(person1)},${esc(person2)},${weight});`);
            edgeCount++;
            if (currentBatch.length >= BATCH) {
              edgeBatches.push([...currentBatch]);
              currentBatch = [];
            }
          }
        }
      }
    } catch { /* skip malformed */ }
  }
  if (currentBatch.length > 0) edgeBatches.push(currentBatch);
} catch {
  console.log('   Skipping network edges (agentials dir not found)');
}
console.log(`   ${edgeCount} edges in ${edgeBatches.length} batches`);
for (let i = 0; i < edgeBatches.length; i++) {
  const file = `/tmp/d1-seed-network-${i}.sql`;
  writeFileSync(file, edgeBatches[i].join('\n'));
  runSQL(`network batch ${i}`, file);
}

// ── 7. Years (years.json) ──
console.log('7/7 Done!');
console.log(`\nSummary:`);
console.log(`  Items:     ${docKeys.length}`);
console.log(`  Entities:  ${entityStmts.length}`);
console.log(`  Calendar:  ${dateFiles.length}`);
console.log(`  Ngrams:    ${ngramStmts.length}`);
console.log(`  AD:        ${adStmts.length}`);
console.log(`  Network:   ${edgeCount} edges`);
