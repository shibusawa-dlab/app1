#!/usr/bin/env node
/**
 * Resume D1 seed — calendar + ngrams + network only.
 * Uses INSERT OR REPLACE so safe to re-run.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const DB_NAME = 'shibusawa-diary-db';
const BACKUP = join(process.cwd(), 'backup', 'static');
const BATCH = 500;

function esc(s) {
  if (s == null) return 'NULL';
  return `'${String(s).replace(/'/g, "''")}'`;
}

function runSQL(label, sqlFile) {
  process.stdout.write(`  ${label}... `);
  try {
    execSync(`wrangler d1 execute ${DB_NAME} --remote --file ${sqlFile}`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 180_000,
    });
    process.stdout.write(`✓\n`);
  } catch (e) {
    process.stdout.write(`✗\n`);
    console.error(`    error:`, e.stderr?.toString().slice(0, 200));
  }
}

// ── Calendar ──
console.log('Calendar…');
const dateDir = join(BACKUP, 'api', 'date');
const dateFiles = readdirSync(dateDir).filter((f) => f.endsWith('.json'));
dateFiles.sort();
const calStmts = dateFiles.map((f) => {
  const dateStr = f.replace('.json', '');
  const [y, m, d] = dateStr.split('-').map(Number);
  const data = readFileSync(join(dateDir, f), 'utf-8');
  return `INSERT OR REPLACE INTO calendar_entries (date,year,month,day,data) VALUES (${esc(dateStr)},${y},${m},${d},${esc(data)});`;
});
console.log(`  ${calStmts.length} total`);
// Resume from batch 5500
for (let i = 5500; i < calStmts.length; i += BATCH) {
  const file = `/tmp/d1-seed-calendar-${i}.sql`;
  writeFileSync(file, calStmts.slice(i, i + BATCH).join('\n'));
  runSQL(`calendar ${i}-${Math.min(i + BATCH, calStmts.length)}`, file);
}

// ── Ngrams ──
console.log('Ngrams…');
const ngramRaw = JSON.parse(readFileSync(join(BACKUP, 'data', 'ngram.json'), 'utf-8'));
const ngramStmts = [];
const yearTotals = {};
for (const [term, yearData] of Object.entries(ngramRaw)) {
  if (term === 'ngramAll') {
    for (const [y, total] of Object.entries(yearData)) yearTotals[y] = total;
    continue;
  }
  for (const [y, freq] of Object.entries(yearData)) {
    if (freq > 0) {
      ngramStmts.push(`INSERT OR REPLACE INTO ngrams (term,year,freq) VALUES (${esc(term)},${parseInt(y)},${freq});`);
    }
  }
}
console.log(`  ${ngramStmts.length} rows`);
for (let i = 0; i < ngramStmts.length; i += BATCH) {
  const file = `/tmp/d1-seed-ngram-${i}.sql`;
  writeFileSync(file, ngramStmts.slice(i, i + BATCH).join('\n'));
  runSQL(`ngram ${i}`, file);
}

const totalStmts = Object.entries(yearTotals).map(
  ([y, t]) => `INSERT OR REPLACE INTO ngram_totals (year,total) VALUES (${parseInt(y)},${t});`
);
const totFile = '/tmp/d1-seed-ngram-totals.sql';
writeFileSync(totFile, totalStmts.join('\n'));
runSQL('ngram totals', totFile);

// ── Network ──
console.log('Network…');
const agentialsDir = join(BACKUP, 'data', 'agentials');
let edges = [];
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
            edges.push(`INSERT OR REPLACE INTO network_edges (person1,person2,weight) VALUES (${esc(person1)},${esc(person2)},${weight});`);
          }
        }
      }
    } catch { /* skip */ }
  }
} catch { /* no agentials dir */ }
console.log(`  ${edges.length} edges`);
for (let i = 0; i < edges.length; i += BATCH) {
  const file = `/tmp/d1-seed-network-${i}.sql`;
  writeFileSync(file, edges.slice(i, i + BATCH).join('\n'));
  runSQL(`network ${i}`, file);
}

console.log('Done!');
