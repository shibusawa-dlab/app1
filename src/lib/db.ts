/**
 * D1 data access layer.
 *
 * Thin wrapper around the `DB` D1 binding (see wrangler.jsonc). In production
 * on Cloudflare Workers the database is populated from the legacy JSON files
 * under `backup/static/data/` by the seed script (`scripts/seed-d1.mjs`).
 *
 * Because `next build` and `next dev` may run without a live Cloudflare
 * environment, `getDb()` gracefully falls back to a JSON-backed shim that
 * implements just enough of the `D1Database` surface (`prepare(...).bind(...)
 * .first()/.all()`) for our call sites. This keeps local iteration possible
 * while the real deployment uses SQL queries against D1.
 */
import type { D1Database, D1PreparedStatement, D1Result } from '@cloudflare/workers-types';
import { promises as fs } from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type ItemRow = {
  id: string;
  label: string | null;
  description: string | null;
  xml: string | null;
  /** Parsed from JSON-array TEXT column. */
  agential: string[];
  /** Parsed from JSON-array TEXT column. */
  spatial: string[];
  temporal: string | null;
  date_lvl0: string | null;
  date_lvl1: string | null;
  date_lvl2: string | null;
  category_lvl0: string | null;
  category_lvl1: string | null;
  year: number | null;
  year_and_month: string | null;
  manifest: string | null;
  canvas: string | null;
  source: string | null;
  prev_id: string | null;
  next_id: string | null;
  sort_key: string | null;
  type: string | null;
};

export type EntityRow = {
  id: string;
  type: 'agential' | 'spatial';
  value: number;
  description: string | null;
  image: string | null;
};

export type CalendarRow = {
  date: string;
  year: number;
  month: number;
  day: number;
  /** Parsed JSON blob (the per-day entry). */
  data: Record<string, unknown>;
};

export type NetworkNeighbor = { person: string; weight: number };

export type AdRow = {
  id: string;
  /** Parsed JSON blob (JSON-LD record). */
  data: Record<string, unknown>;
};

export type NgramPoint = { term: string; year: number; freq: number };

// ---------------------------------------------------------------------------
// D1 access
// ---------------------------------------------------------------------------

type DbLike = D1Database;

let _cached: DbLike | null = null;
let _fallback: DbLike | null = null;

function localFallback(): DbLike {
  if (!_fallback) _fallback = createLocalFallback();
  return _fallback;
}

/**
 * Returns a D1Database-compatible object. When the Cloudflare runtime isn't
 * available (e.g. local `next build` without a live DB, or `next dev`
 * without wrangler), returns a filesystem-backed shim reading from
 * `backup/static/data/` and `public/data/`.
 *
 * The returned object is additionally wrapped so that D1 errors at query
 * time (e.g. "no such table" before the seed script finishes) transparently
 * fall back to the local shim instead of failing the whole render.
 */
export async function getDb(): Promise<DbLike> {
  if (_cached) return _cached;
  try {
    const mod = await import('@opennextjs/cloudflare');
    const ctx = await mod.getCloudflareContext({ async: true });
    const env = ctx.env as { DB?: D1Database };
    if (env.DB) {
      _cached = wrapWithFallback(env.DB);
      return _cached;
    }
  } catch {
    // Not running in a CF context; fall through to local fallback.
  }
  _cached = localFallback();
  return _cached;
}

function isMissingTableError(err: unknown): boolean {
  if (!err) return false;
  const msg = err instanceof Error ? err.message : String(err);
  return /no such table|D1_ERROR/i.test(msg);
}

/**
 * Wraps a D1Database so that missing-table / D1 errors transparently fall
 * back to the local JSON shim. This lets the code render correctly while
 * the seed script is still populating tables in the background.
 */
function wrapWithFallback(db: D1Database): D1Database {
  const handler: ProxyHandler<D1Database> = {
    get(target, prop: keyof D1Database) {
      if (prop !== 'prepare') return Reflect.get(target, prop);
      return (sql: string) => {
        const real = target.prepare(sql);
        return wrapStatement(real, sql);
      };
    },
  };
  return new Proxy(db, handler);
}

function wrapStatement(
  stmt: D1PreparedStatement,
  sql: string,
  binds: unknown[] = []
): D1PreparedStatement {
  const fallbackStmt = () => {
    const localDb = localFallback();
    const next = localDb.prepare(sql);
    return binds.length > 0 ? next.bind(...binds) : next;
  };

  const wrapper = {
    bind(...args: unknown[]) {
      const bound = stmt.bind(...args);
      return wrapStatement(bound, sql, args);
    },
    async first<T = unknown>(col?: string): Promise<T | null> {
      try {
        return await (col ? stmt.first<T>(col) : stmt.first<T>());
      } catch (err) {
        if (!isMissingTableError(err)) throw err;
        const fb = fallbackStmt();
        return (col ? fb.first<T>(col) : fb.first<T>()) as Promise<T | null>;
      }
    },
    async all<T = unknown>(): Promise<D1Result<T>> {
      try {
        return await stmt.all<T>();
      } catch (err) {
        if (!isMissingTableError(err)) throw err;
        return fallbackStmt().all<T>();
      }
    },
    async run() {
      try {
        return await stmt.run();
      } catch (err) {
        if (!isMissingTableError(err)) throw err;
        return fallbackStmt().run();
      }
    },
    async raw<T = unknown>(options?: unknown): Promise<T[]> {
      type RawFn = (o?: unknown) => Promise<T[]>;
      const realRaw = (stmt as unknown as { raw: RawFn }).raw.bind(stmt);
      try {
        return await realRaw(options);
      } catch (err) {
        if (!isMissingTableError(err)) throw err;
        const fbRaw = (fallbackStmt() as unknown as { raw: RawFn }).raw;
        return fbRaw(options);
      }
    },
  };
  return wrapper as unknown as D1PreparedStatement;
}

// ---------------------------------------------------------------------------
// Typed helpers
// ---------------------------------------------------------------------------

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value !== 'string' || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function parseJsonObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object') return value as Record<string, unknown>;
  if (typeof value !== 'string' || !value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function rowToItem(row: Record<string, unknown> | null | undefined): ItemRow | null {
  if (!row) return null;
  return {
    id: String(row.id ?? ''),
    label: (row.label as string | null) ?? null,
    description: (row.description as string | null) ?? null,
    xml: (row.xml as string | null) ?? null,
    agential: parseJsonArray(row.agential),
    spatial: parseJsonArray(row.spatial),
    temporal: (row.temporal as string | null) ?? null,
    date_lvl0: (row.date_lvl0 as string | null) ?? null,
    date_lvl1: (row.date_lvl1 as string | null) ?? null,
    date_lvl2: (row.date_lvl2 as string | null) ?? null,
    category_lvl0: (row.category_lvl0 as string | null) ?? null,
    category_lvl1: (row.category_lvl1 as string | null) ?? null,
    year: (row.year as number | null) ?? null,
    year_and_month: (row.year_and_month as string | null) ?? null,
    manifest: (row.manifest as string | null) ?? null,
    canvas: (row.canvas as string | null) ?? null,
    source: (row.source as string | null) ?? null,
    prev_id: (row.prev_id as string | null) ?? null,
    next_id: (row.next_id as string | null) ?? null,
    sort_key: (row.sort_key as string | null) ?? null,
    type: (row.type as string | null) ?? null,
  };
}

/** Legacy docs.json used zero-padded 4-digit numeric suffixes. */
export function normalizeItemId(id: string): string {
  const parts = id.split('-');
  if (parts.length !== 2) return id;
  const [prefix, num] = parts;
  if (!/^\d+$/.test(num)) return id;
  return `${prefix}-${String(Number(num)).padStart(4, '0')}`;
}

export async function getItem(id: string): Promise<ItemRow | null> {
  const db = await getDb();
  const row = await db
    .prepare('SELECT * FROM items WHERE id = ?')
    .bind(normalizeItemId(id))
    .first<Record<string, unknown>>();
  return rowToItem(row ?? null);
}

export async function listItems(limit = 50, offset = 0): Promise<ItemRow[]> {
  const db = await getDb();
  const res = await db
    .prepare('SELECT * FROM items ORDER BY id LIMIT ? OFFSET ?')
    .bind(limit, offset)
    .all<Record<string, unknown>>();
  return (res.results ?? []).map((r) => rowToItem(r)!).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Search (FTS5)
// ---------------------------------------------------------------------------

export type SearchFacets = {
  category_lvl0?: string[];
  category_lvl1?: string[];
  date_lvl0?: string[];
  date_lvl1?: string[];
  date_lvl2?: string[];
  agential?: string[];
  spatial?: string[];
  type?: string[];
};

export type SearchResult = {
  items: ItemRow[];
  total: number;
};

/** Escape an FTS5 MATCH query term — quote each token to avoid syntax errors. */
function toFtsQuery(query: string): string {
  const tokens = query
    .trim()
    .split(/\s+/)
    .map((t) => t.replace(/"/g, ''))
    .filter(Boolean);
  if (tokens.length === 0) return '';
  return tokens.map((t) => `"${t}"`).join(' ');
}

function buildFacetSql(facets: SearchFacets | undefined): { clauses: string[]; binds: unknown[] } {
  const clauses: string[] = [];
  const binds: unknown[] = [];
  if (!facets) return { clauses, binds };

  // Scalar columns
  const scalars: [keyof SearchFacets, string][] = [
    ['category_lvl0', 'items.category_lvl0'],
    ['category_lvl1', 'items.category_lvl1'],
    ['date_lvl0', 'items.date_lvl0'],
    ['date_lvl1', 'items.date_lvl1'],
    ['date_lvl2', 'items.date_lvl2'],
    ['type', 'items.type'],
  ];
  for (const [key, col] of scalars) {
    const vals = facets[key];
    if (!vals || vals.length === 0) continue;
    clauses.push(`${col} IN (${vals.map(() => '?').join(',')})`);
    binds.push(...vals);
  }

  // JSON-array columns: use `LIKE '%"value"%'` against the JSON-encoded TEXT.
  const jsonCols: [keyof SearchFacets, string][] = [
    ['agential', 'items.agential'],
    ['spatial', 'items.spatial'],
  ];
  for (const [key, col] of jsonCols) {
    const vals = facets[key];
    if (!vals || vals.length === 0) continue;
    const likes: string[] = [];
    for (const v of vals) {
      likes.push(`${col} LIKE ?`);
      binds.push(`%"${v}"%`);
    }
    clauses.push(`(${likes.join(' OR ')})`);
  }

  return { clauses, binds };
}

export async function searchItems(
  query: string,
  facets?: SearchFacets,
  limit = 24,
  offset = 0
): Promise<SearchResult> {
  const db = await getDb();
  const ftsQuery = toFtsQuery(query);

  const facetSql = buildFacetSql(facets);

  let sql: string;
  let countSql: string;
  const binds: unknown[] = [];
  const countBinds: unknown[] = [];

  if (ftsQuery) {
    sql =
      'SELECT items.* FROM items_fts JOIN items ON items.id = items_fts.id WHERE items_fts MATCH ?';
    countSql =
      'SELECT COUNT(*) AS n FROM items_fts JOIN items ON items.id = items_fts.id WHERE items_fts MATCH ?';
    binds.push(ftsQuery);
    countBinds.push(ftsQuery);
    if (facetSql.clauses.length > 0) {
      const extra = ` AND ${facetSql.clauses.join(' AND ')}`;
      sql += extra;
      countSql += extra;
      binds.push(...facetSql.binds);
      countBinds.push(...facetSql.binds);
    }
    sql += ' ORDER BY rank LIMIT ? OFFSET ?';
  } else {
    sql = 'SELECT items.* FROM items';
    countSql = 'SELECT COUNT(*) AS n FROM items';
    if (facetSql.clauses.length > 0) {
      const where = ` WHERE ${facetSql.clauses.join(' AND ')}`;
      sql += where;
      countSql += where;
      binds.push(...facetSql.binds);
      countBinds.push(...facetSql.binds);
    }
    sql += ' ORDER BY items.sort_key NULLS LAST, items.id LIMIT ? OFFSET ?';
  }
  binds.push(limit, offset);

  const [rowsRes, countRes] = await Promise.all([
    db.prepare(sql).bind(...binds).all<Record<string, unknown>>(),
    db.prepare(countSql).bind(...countBinds).first<{ n: number }>(),
  ]);

  return {
    items: (rowsRes.results ?? []).map((r) => rowToItem(r)!).filter(Boolean),
    total: countRes?.n ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Entities
// ---------------------------------------------------------------------------

function rowToEntity(row: Record<string, unknown> | null | undefined): EntityRow | null {
  if (!row) return null;
  return {
    id: String(row.id ?? ''),
    type: (row.type as 'agential' | 'spatial') ?? 'agential',
    value: Number(row.value ?? 0),
    description: (row.description as string | null) ?? null,
    image: (row.image as string | null) ?? null,
  };
}

export async function getEntity(
  type: 'agential' | 'spatial',
  id: string
): Promise<EntityRow | null> {
  const db = await getDb();
  const row = await db
    .prepare('SELECT * FROM entities WHERE type = ? AND id = ?')
    .bind(type, id)
    .first<Record<string, unknown>>();
  return rowToEntity(row ?? null);
}

export async function listEntities(
  type: 'agential' | 'spatial',
  limit = 1000,
  offset = 0
): Promise<EntityRow[]> {
  const db = await getDb();
  const res = await db
    .prepare('SELECT * FROM entities WHERE type = ? ORDER BY value DESC LIMIT ? OFFSET ?')
    .bind(type, limit, offset)
    .all<Record<string, unknown>>();
  return (res.results ?? []).map((r) => rowToEntity(r)!).filter(Boolean);
}

// Summary computed over `items` for an entity (used by the entity detail page).
export type EntitySummary = {
  total: number;
  byYear: { year: string; count: number }[];
  relatedAgential: { id: string; count: number }[];
  relatedSpatial: { id: string; count: number }[];
};

export async function getEntitySummary(
  type: 'agential' | 'spatial',
  id: string
): Promise<EntitySummary> {
  const db = await getDb();
  const col = type === 'agential' ? 'agential' : 'spatial';
  const likePattern = `%"${id}"%`;

  // Fetch matching rows — we need agential/spatial arrays & year.
  const res = await db
    .prepare(
      `SELECT year, agential, spatial FROM items WHERE ${col} LIKE ?`
    )
    .bind(likePattern)
    .all<{ year: number | null; agential: string | null; spatial: string | null }>();

  const rows = res.results ?? [];
  let total = 0;
  const years = new Map<string, number>();
  const relA = new Map<string, number>();
  const relS = new Map<string, number>();

  for (const r of rows) {
    const ag = parseJsonArray(r.agential);
    const sp = parseJsonArray(r.spatial);
    const matchList = col === 'agential' ? ag : sp;
    if (!matchList.includes(id)) continue;
    total += 1;
    if (r.year != null) {
      const y = String(r.year);
      years.set(y, (years.get(y) ?? 0) + 1);
    }
    for (const other of ag) {
      if (type === 'agential' && other === id) continue;
      relA.set(other, (relA.get(other) ?? 0) + 1);
    }
    for (const other of sp) {
      if (type === 'spatial' && other === id) continue;
      relS.set(other, (relS.get(other) ?? 0) + 1);
    }
  }

  const toSorted = (m: Map<string, number>) =>
    [...m.entries()]
      .map(([k, count]) => ({ id: k, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

  return {
    total,
    byYear: [...years.entries()]
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => Number(a.year) - Number(b.year)),
    relatedAgential: toSorted(relA),
    relatedSpatial: toSorted(relS),
  };
}

// ---------------------------------------------------------------------------
// Calendar
// ---------------------------------------------------------------------------

export async function getCalendarEntry(date: string): Promise<CalendarRow | null> {
  const db = await getDb();
  const row = await db
    .prepare('SELECT * FROM calendar_entries WHERE date = ?')
    .bind(date)
    .first<Record<string, unknown>>();
  if (!row) return null;
  return {
    date: String(row.date),
    year: Number(row.year ?? 0),
    month: Number(row.month ?? 0),
    day: Number(row.day ?? 0),
    data: parseJsonObject(row.data),
  };
}

export async function listCalendarDays(year: number, month: number): Promise<CalendarRow[]> {
  const db = await getDb();
  const res = await db
    .prepare(
      'SELECT * FROM calendar_entries WHERE year = ? AND month = ? ORDER BY day ASC'
    )
    .bind(year, month)
    .all<Record<string, unknown>>();
  return (res.results ?? []).map((row) => ({
    date: String(row.date),
    year: Number(row.year ?? 0),
    month: Number(row.month ?? 0),
    day: Number(row.day ?? 0),
    data: parseJsonObject(row.data),
  }));
}

export async function listCalendarYears(): Promise<Record<string, Record<string, number>>> {
  const db = await getDb();
  const res = await db
    .prepare(
      'SELECT year, month, COUNT(*) AS n FROM calendar_entries GROUP BY year, month'
    )
    .all<{ year: number; month: number; n: number }>();
  const out: Record<string, Record<string, number>> = {};
  for (const row of res.results ?? []) {
    const y = String(row.year);
    const m = String(row.month);
    if (!out[y]) out[y] = {};
    out[y][m] = row.n;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Network
// ---------------------------------------------------------------------------

export async function getNetworkNeighbors(
  personId: string,
  limit = 50
): Promise<NetworkNeighbor[]> {
  const db = await getDb();
  const res = await db
    .prepare(
      `SELECT other AS person, weight FROM (
         SELECT person2 AS other, weight FROM network_edges WHERE person1 = ?
         UNION ALL
         SELECT person1 AS other, weight FROM network_edges WHERE person2 = ?
       ) ORDER BY weight DESC LIMIT ?`
    )
    .bind(personId, personId, limit)
    .all<{ person: string; weight: number }>();
  return (res.results ?? []).map((r) => ({ person: r.person, weight: r.weight }));
}

/**
 * Top-K people by degree (sum of incident edge weights) for the network index.
 */
export async function listNetworkPeople(
  limit = 200
): Promise<{ id: string; count: number }[]> {
  const db = await getDb();
  const res = await db
    .prepare(
      `SELECT person AS id, SUM(weight) AS count FROM (
         SELECT person1 AS person, weight FROM network_edges
         UNION ALL
         SELECT person2 AS person, weight FROM network_edges
       ) GROUP BY person ORDER BY count DESC LIMIT ?`
    )
    .bind(limit)
    .all<{ id: string; count: number }>();
  return (res.results ?? []).map((r) => ({ id: r.id, count: Number(r.count) }));
}

// ---------------------------------------------------------------------------
// Ad items
// ---------------------------------------------------------------------------

function rowToAd(row: Record<string, unknown> | null | undefined): AdRow | null {
  if (!row) return null;
  return { id: String(row.id ?? ''), data: parseJsonObject(row.data) };
}

export async function getAdItem(id: string): Promise<AdRow | null> {
  const db = await getDb();
  const row = await db
    .prepare('SELECT * FROM ad_items WHERE id = ?')
    .bind(id)
    .first<Record<string, unknown>>();
  return rowToAd(row ?? null);
}

export async function listAdItems(): Promise<AdRow[]> {
  const db = await getDb();
  const res = await db
    .prepare('SELECT * FROM ad_items ORDER BY id')
    .all<Record<string, unknown>>();
  return (res.results ?? []).map((r) => rowToAd(r)!).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Ngram
// ---------------------------------------------------------------------------

export async function getNgramSeries(terms: string[]): Promise<NgramPoint[]> {
  if (terms.length === 0) return [];
  const db = await getDb();
  const placeholders = terms.map(() => '?').join(',');
  const res = await db
    .prepare(
      `SELECT term, year, freq FROM ngrams WHERE term IN (${placeholders}) ORDER BY term, year`
    )
    .bind(...terms)
    .all<{ term: string; year: number; freq: number }>();
  return (res.results ?? []).map((r) => ({ term: r.term, year: r.year, freq: r.freq }));
}

/**
 * Match terms either by exact equality or substring (`LIKE %q%`). Used by the
 * Ngram page to translate the slash-separated input into concrete terms before
 * fetching their series. Falls back gracefully when the table is missing rows.
 */
export async function listNgramTerms(
  query: string,
  limit = 20
): Promise<{ term: string; total: number }[]> {
  const db = await getDb();
  const trimmed = query.trim();
  if (!trimmed) return [];
  // Escape LIKE wildcards in the user input before wrapping in %…%.
  const escaped = trimmed.replace(/[%_]/g, (c) => `\\${c}`);
  const res = await db
    .prepare(
      `SELECT term, SUM(freq) AS total FROM ngrams
       WHERE term LIKE ? ESCAPE '\\'
       GROUP BY term
       ORDER BY total DESC
       LIMIT ?`
    )
    .bind(`%${escaped}%`, limit)
    .all<{ term: string; total: number }>();
  return (res.results ?? []).map((r) => ({ term: r.term, total: Number(r.total) }));
}

/**
 * Total TF per term (summed across all years). Used to populate the results
 * table and to pick the top-N terms when a user passes a substring match.
 */
export async function getNgramTermTotals(
  terms: string[]
): Promise<Record<string, number>> {
  if (terms.length === 0) return {};
  const db = await getDb();
  const placeholders = terms.map(() => '?').join(',');
  const res = await db
    .prepare(
      `SELECT term, SUM(freq) AS total FROM ngrams
       WHERE term IN (${placeholders})
       GROUP BY term`
    )
    .bind(...terms)
    .all<{ term: string; total: number }>();
  const out: Record<string, number> = {};
  for (const r of res.results ?? []) out[r.term] = Number(r.total);
  return out;
}

/**
 * Yearly corpus totals used to normalise per-term frequencies into a ratio.
 * Falls back to computing from the ngrams table if `ngram_totals` is empty
 * (which can happen mid-seed).
 */
export async function getNgramTotals(): Promise<Record<string, number>> {
  const db = await getDb();
  const res = await db
    .prepare('SELECT year, total FROM ngram_totals ORDER BY year')
    .all<{ year: number; total: number }>();
  const out: Record<string, number> = {};
  for (const r of res.results ?? []) out[String(r.year)] = Number(r.total);
  return out;
}

// ---------------------------------------------------------------------------
// Local fallback (read-only JSON from backup/ and public/data/)
// ---------------------------------------------------------------------------

type LocalCache = {
  docs?: Record<string, Record<string, unknown>> | null;
  entity?: {
    agential: Record<string, unknown>[];
    spatial: Record<string, unknown>[];
  } | null;
  ad?: Record<string, unknown>[] | null;
  years?: Record<string, Record<string, number>> | null;
  network?: {
    index: { items: { id: string; label: string; count: number }[] };
    files: Record<string, { nodes: unknown[]; edges: unknown[] } | undefined>;
  } | null;
  ngram?: { terms: { label: string; count: number; freq: { year: number; count: number }[] }[]; ngramAll: Record<string, number> } | null;
};

const LOCAL_ROOT = process.cwd();
const localCache: LocalCache = {};

async function loadJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function loadDocs(): Promise<Record<string, Record<string, unknown>>> {
  if (localCache.docs) return localCache.docs;
  const file = path.join(LOCAL_ROOT, 'backup', 'static', 'data', 'docs.json');
  localCache.docs = await loadJson<Record<string, Record<string, unknown>>>(file, {});
  return localCache.docs!;
}

async function loadEntity(): Promise<{
  agential: Record<string, unknown>[];
  spatial: Record<string, unknown>[];
}> {
  if (localCache.entity) return localCache.entity;
  const file = path.join(LOCAL_ROOT, 'public', 'data', 'entity.json');
  const data = await loadJson<{
    agential: Record<string, unknown>[];
    spatial: Record<string, unknown>[];
  }>(file, { agential: [], spatial: [] });
  localCache.entity = data;
  return data;
}

async function loadAd(): Promise<Record<string, unknown>[]> {
  if (localCache.ad) return localCache.ad;
  const file = path.join(LOCAL_ROOT, 'public', 'data', 'ad.json');
  const data = await loadJson<Record<string, unknown>[]>(file, []);
  localCache.ad = data;
  return data;
}

async function loadYears(): Promise<Record<string, Record<string, number>>> {
  if (localCache.years) return localCache.years;
  const file = path.join(LOCAL_ROOT, 'public', 'data', 'years.json');
  localCache.years = await loadJson<Record<string, Record<string, number>>>(file, {});
  return localCache.years!;
}

async function loadNetworkIndex(): Promise<{ items: { id: string; label: string; count: number }[] }> {
  if (localCache.network) return localCache.network.index;
  const file = path.join(LOCAL_ROOT, 'public', 'data', 'network', 'index.json');
  const index = await loadJson<{ items: { id: string; label: string; count: number }[] }>(file, { items: [] });
  localCache.network = { index, files: {} };
  return index;
}

async function loadNetworkFile(id: string): Promise<{ nodes: unknown[]; edges: unknown[] } | null> {
  const cache = localCache.network?.files ?? {};
  if (Object.prototype.hasOwnProperty.call(cache, id)) {
    return cache[id] ?? null;
  }
  if (!localCache.network) await loadNetworkIndex();
  const file = path.join(LOCAL_ROOT, 'public', 'data', 'network', `${id}.json`);
  try {
    const raw = await fs.readFile(file, 'utf-8');
    const parsed = JSON.parse(raw) as { nodes: unknown[]; edges: unknown[] };
    localCache.network!.files[id] = parsed;
    return parsed;
  } catch {
    localCache.network!.files[id] = undefined;
    return null;
  }
}

async function loadNgramSummary(): Promise<{
  terms: { label: string; count: number; freq: { year: number; count: number }[] }[];
  ngramAll: Record<string, number>;
}> {
  if (localCache.ngram) return localCache.ngram;
  const file = path.join(LOCAL_ROOT, 'public', 'data', 'ngram', 'summary.json');
  const data = await loadJson<{
    terms: { label: string; count: number; freq: { year: number; count: number }[] }[];
    ngramAll: Record<string, number>;
  }>(file, { terms: [], ngramAll: {} });
  localCache.ngram = data;
  return data;
}

async function loadCalendarEntry(date: string): Promise<Record<string, unknown> | null> {
  const file = path.join(LOCAL_ROOT, 'public', 'data', 'date', `${date}.json`);
  try {
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Build a D1Database-like shim backed by local JSON files. Only the subset of
 * queries this module issues is supported — unknown SQL falls back to an empty
 * result so callers don't crash, but a warning is logged.
 */
function createLocalFallback(): DbLike {
  const unsupported = (sql: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[lib/db] Local fallback does not understand SQL:', sql);
    }
  };

  const prepare = (sql: string): D1PreparedStatement => {
    const trimmed = sql.trim().replace(/\s+/g, ' ');
    let binds: unknown[] = [];
    const stmt: D1PreparedStatement = {
      bind(...args: unknown[]) {
        binds = args;
        return stmt;
      },
      async first<T = unknown>(): Promise<T | null> {
        const rows = await run(trimmed, binds);
        return (rows[0] as T | undefined) ?? null;
      },
      async all<T = unknown>(): Promise<D1Result<T>> {
        const rows = await run(trimmed, binds);
        return {
          results: rows as T[],
          success: true,
          meta: {
            duration: 0,
            size_after: 0,
            rows_read: rows.length,
            rows_written: 0,
            last_row_id: 0,
            changed_db: false,
            changes: 0,
          },
        } as unknown as D1Result<T>;
      },
      async run() {
        return { results: [], success: true, meta: {} } as unknown as D1Result<never>;
      },
      async raw<T = unknown>(): Promise<T[]> {
        return run(trimmed, binds) as unknown as T[];
      },
    } as unknown as D1PreparedStatement;
    return stmt;
  };

  async function run(sql: string, binds: unknown[]): Promise<Record<string, unknown>[]> {
    // items by id
    if (sql.startsWith('SELECT * FROM items WHERE id = ?')) {
      const docs = await loadDocs();
      const doc = docs[String(binds[0])];
      return doc ? [docToItemRow(doc)] : [];
    }

    if (sql.startsWith('SELECT * FROM items ORDER BY id LIMIT ? OFFSET ?')) {
      const docs = await loadDocs();
      const ids = Object.keys(docs).sort();
      const limit = Number(binds[0] ?? 50);
      const offset = Number(binds[1] ?? 0);
      return ids.slice(offset, offset + limit).map((id) => docToItemRow(docs[id]));
    }

    // FTS search
    if (sql.includes('items_fts MATCH')) {
      const docs = await loadDocs();
      const allRows = Object.values(docs).map(docToItemRow);
      const ftsQuery = String(binds[0] ?? '');
      const tokens = ftsQuery
        .split(/\s+/)
        .map((t) => t.replace(/"/g, ''))
        .filter(Boolean)
        .map((t) => t.toLowerCase());
      const rest = binds.slice(1);
      const filtered = allRows.filter((row) => {
        const hay = `${row.label ?? ''}\n${row.description ?? ''}\n${row.agential ?? ''}\n${row.spatial ?? ''}`.toLowerCase();
        for (const tok of tokens) {
          if (!hay.includes(tok)) return false;
        }
        return matchFacets(row, sql, rest);
      });
      if (sql.startsWith('SELECT COUNT(*)')) return [{ n: filtered.length }];
      const limit = Number(rest[rest.length - 2] ?? 24);
      const offset = Number(rest[rest.length - 1] ?? 0);
      return filtered.slice(offset, offset + limit);
    }

    // Facet-only items list
    if (sql.startsWith('SELECT items.* FROM items') || sql.startsWith('SELECT COUNT(*) AS n FROM items')) {
      const docs = await loadDocs();
      const allRows = Object.values(docs).map(docToItemRow);
      const filtered = allRows.filter((row) => matchFacets(row, sql, binds));
      if (sql.startsWith('SELECT COUNT(*)')) return [{ n: filtered.length }];
      const limit = Number(binds[binds.length - 2] ?? 24);
      const offset = Number(binds[binds.length - 1] ?? 0);
      filtered.sort((a, b) => {
        const ka = String(a.sort_key ?? a.id ?? '');
        const kb = String(b.sort_key ?? b.id ?? '');
        return ka.localeCompare(kb);
      });
      return filtered.slice(offset, offset + limit);
    }

    // entities
    if (sql.startsWith('SELECT * FROM entities WHERE type = ? AND id = ?')) {
      const data = await loadEntity();
      const type = String(binds[0]) as 'agential' | 'spatial';
      const id = String(binds[1]);
      const rec = (data[type] ?? []).find((r) => r.id === id);
      return rec ? [entityRecordToRow(rec, type)] : [];
    }

    if (sql.startsWith('SELECT * FROM entities WHERE type = ? ORDER BY value DESC LIMIT ? OFFSET ?')) {
      const data = await loadEntity();
      const type = String(binds[0]) as 'agential' | 'spatial';
      const limit = Number(binds[1] ?? 1000);
      const offset = Number(binds[2] ?? 0);
      const rows = (data[type] ?? [])
        .slice()
        .sort((a, b) => Number(b.value ?? 0) - Number(a.value ?? 0))
        .slice(offset, offset + limit)
        .map((r) => entityRecordToRow(r, type));
      return rows;
    }

    // items filtered by a single-column LIKE used by getEntitySummary
    if (
      sql.startsWith('SELECT year, agential, spatial FROM items WHERE agential LIKE ?') ||
      sql.startsWith('SELECT year, agential, spatial FROM items WHERE spatial LIKE ?')
    ) {
      const docs = await loadDocs();
      const field: 'agential' | 'spatial' = sql.includes('WHERE agential') ? 'agential' : 'spatial';
      const idMatch = /^%"(.*)"%$/.exec(String(binds[0] ?? ''));
      const id = idMatch ? idMatch[1] : '';
      const out: Record<string, unknown>[] = [];
      for (const doc of Object.values(docs)) {
        const arr = Array.isArray(doc[field]) ? (doc[field] as string[]) : [];
        if (!arr.includes(id)) continue;
        out.push({
          year: doc.year ?? null,
          agential: JSON.stringify(doc.agential ?? []),
          spatial: JSON.stringify(doc.spatial ?? []),
        });
      }
      return out;
    }

    // calendar
    if (sql.startsWith('SELECT * FROM calendar_entries WHERE date = ?')) {
      const date = String(binds[0]);
      const entry = await loadCalendarEntry(date);
      if (!entry) return [];
      const [y, m, d] = date.split('-').map(Number);
      return [
        {
          date,
          year: y,
          month: m,
          day: d,
          data: JSON.stringify(entry),
        },
      ];
    }

    if (sql.startsWith('SELECT * FROM calendar_entries WHERE year = ? AND month = ?')) {
      const year = Number(binds[0]);
      const month = Number(binds[1]);
      const dir = path.join(LOCAL_ROOT, 'public', 'data', 'date');
      let names: string[] = [];
      try {
        names = await fs.readdir(dir);
      } catch {
        names = [];
      }
      const prefix = `${year}-${String(month).padStart(2, '0')}-`;
      const matches = names.filter((n) => n.startsWith(prefix) && n.endsWith('.json'));
      const rows: Record<string, unknown>[] = [];
      for (const name of matches.sort()) {
        const date = name.replace(/\.json$/, '');
        const entry = await loadCalendarEntry(date);
        if (!entry) continue;
        const [y, m, d] = date.split('-').map(Number);
        rows.push({ date, year: y, month: m, day: d, data: JSON.stringify(entry) });
      }
      return rows;
    }

    if (sql.startsWith('SELECT year, month, COUNT(*)')) {
      const years = await loadYears();
      const rows: Record<string, unknown>[] = [];
      for (const [y, months] of Object.entries(years)) {
        for (const [m, n] of Object.entries(months)) {
          rows.push({ year: Number(y), month: Number(m), n });
        }
      }
      return rows;
    }

    // network
    if (sql.includes('FROM network_edges')) {
      if (sql.startsWith('SELECT other AS person')) {
        const person = String(binds[0]);
        const file = await loadNetworkFile(person);
        const limit = Number(binds[2] ?? 50);
        if (!file) return [];
        const rows = (file.edges as { from: string; to: string; value: number }[])
          .filter((e) => e.from === person || e.to === person)
          .map((e) => ({ person: e.from === person ? e.to : e.from, weight: e.value }))
          .sort((a, b) => b.weight - a.weight)
          .slice(0, limit);
        return rows;
      }
      if (sql.startsWith('SELECT person AS id')) {
        const index = await loadNetworkIndex();
        const limit = Number(binds[0] ?? 200);
        return index.items.slice(0, limit).map((it) => ({ id: it.id, count: it.count }));
      }
    }

    // ad
    if (sql.startsWith('SELECT * FROM ad_items WHERE id = ?')) {
      const items = await loadAd();
      const id = String(binds[0]);
      const match = items.find((i) => (i as { '@id'?: string })['@id'] === id);
      if (!match) return [];
      return [{ id, data: JSON.stringify(match) }];
    }
    if (sql.startsWith('SELECT * FROM ad_items ORDER BY id')) {
      const items = await loadAd();
      return items.map((raw) => ({
        id: (raw as { '@id'?: string })['@id'] ?? '',
        data: JSON.stringify(raw),
      }));
    }

    // ngram
    if (sql.startsWith('SELECT term, year, freq FROM ngrams WHERE term IN')) {
      const summary = await loadNgramSummary();
      const terms = new Set(binds.map(String));
      const rows: Record<string, unknown>[] = [];
      for (const entry of summary.terms) {
        if (!terms.has(entry.label)) continue;
        for (const point of entry.freq) {
          rows.push({ term: entry.label, year: point.year, freq: point.count });
        }
      }
      return rows;
    }
    if (sql.startsWith('SELECT term, SUM(freq) AS total FROM ngrams WHERE term LIKE')) {
      const summary = await loadNgramSummary();
      const raw = String(binds[0] ?? '');
      const needle = raw
        .replace(/^%/, '')
        .replace(/%$/, '')
        .replace(/\\([%_])/g, '$1');
      const limit = Number(binds[1] ?? 20);
      return summary.terms
        .filter((t) => (needle ? t.label.includes(needle) : true))
        .map((t) => ({ term: t.label, total: t.count }))
        .sort((a, b) => b.total - a.total)
        .slice(0, limit);
    }
    if (sql.startsWith('SELECT term, SUM(freq) AS total FROM ngrams WHERE term IN')) {
      const summary = await loadNgramSummary();
      const wanted = new Set(binds.map(String));
      return summary.terms
        .filter((t) => wanted.has(t.label))
        .map((t) => ({ term: t.label, total: t.count }));
    }
    if (sql.startsWith('SELECT year, total FROM ngram_totals')) {
      const summary = await loadNgramSummary();
      return Object.entries(summary.ngramAll)
        .map(([y, total]) => ({ year: Number(y), total: Number(total) }))
        .sort((a, b) => a.year - b.year);
    }

    unsupported(sql);
    return [];
  }

  // Build the narrow `batch`-less D1Database shape we use.
  return {
    prepare,
    async batch() {
      return [];
    },
    async dump() {
      return new ArrayBuffer(0);
    },
    async exec() {
      return { count: 0, duration: 0 } as any;
    },
    withSession() {
      return { prepare } as any;
    },
  } as unknown as DbLike;
}

// ---------------------------------------------------------------------------
// Helpers used by the fallback to reshape JSON into DB row shape.
// ---------------------------------------------------------------------------

function docToItemRow(doc: Record<string, unknown>): Record<string, unknown> {
  const agential = Array.isArray(doc.agential) ? (doc.agential as string[]) : [];
  const spatial = Array.isArray(doc.spatial) ? (doc.spatial as string[]) : [];
  const category = (doc.category as Record<string, string> | undefined) ?? {};
  const date = (doc.date as Record<string, string> | undefined) ?? {};
  return {
    id: doc.objectID ?? doc.id ?? '',
    label: doc.label ?? null,
    description: doc.description ?? null,
    xml: doc.xml ?? null,
    agential: JSON.stringify(agential),
    spatial: JSON.stringify(spatial),
    temporal: doc.temporal ?? null,
    date_lvl0: doc.date_lvl0 ?? date.lvl0 ?? null,
    date_lvl1: doc.date_lvl1 ?? date.lvl1 ?? null,
    date_lvl2: doc.date_lvl2 ?? date.lvl2 ?? null,
    category_lvl0: doc.category_lvl0 ?? category.lvl0 ?? null,
    category_lvl1: doc.category_lvl1 ?? category.lvl1 ?? null,
    year: typeof doc.year === 'number' ? doc.year : doc.year ? Number(doc.year) : null,
    year_and_month: doc.yearAndMonth ?? null,
    manifest: doc.manifest ?? null,
    canvas: doc.canvas ?? null,
    source: doc.source ?? null,
    prev_id: doc.prev ?? null,
    next_id: doc.next ?? null,
    sort_key: doc.sort ?? null,
    type: doc.type ?? null,
  };
}

function entityRecordToRow(
  rec: Record<string, unknown>,
  type: 'agential' | 'spatial'
): Record<string, unknown> {
  let description: string | null = null;
  const raw = rec.description;
  if (typeof raw === 'string') description = raw;
  else if (raw && typeof raw === 'object' && 'value' in (raw as Record<string, unknown>)) {
    description = String((raw as Record<string, unknown>).value ?? '') || null;
  }
  return {
    id: rec.id,
    type,
    value: Number(rec.value ?? 0),
    description,
    image: (rec.image as string | null) ?? null,
  };
}

/** Evaluate simple IN (...) / LIKE clauses used by the search SQL against a row. */
function matchFacets(
  row: Record<string, unknown>,
  sql: string,
  binds: unknown[]
): boolean {
  // Extract clauses from the SQL string after WHERE / AND. We only support the
  // exact shapes produced by `buildFacetSql` + searchItems.
  const clauseRegex =
    /(items\.(?:category_lvl0|category_lvl1|date_lvl0|date_lvl1|date_lvl2|type)) IN \(([^)]+)\)|(items\.(?:agential|spatial)) LIKE \?/g;
  let remaining = [...binds];
  // Strip leading FTS MATCH bind when present.
  if (sql.includes('items_fts MATCH')) {
    remaining = remaining.slice(1);
  }
  // Strip trailing LIMIT/OFFSET binds.
  if (sql.includes('LIMIT ? OFFSET ?')) {
    remaining = remaining.slice(0, -2);
  }

  let idx = 0;
  for (const match of sql.matchAll(clauseRegex)) {
    if (match[1]) {
      const col = match[1].replace('items.', '');
      const count = (match[2].match(/\?/g) ?? []).length;
      const vals = remaining.slice(idx, idx + count).map(String);
      idx += count;
      const cellValue = String(row[col] ?? '');
      if (!vals.includes(cellValue)) return false;
    } else if (match[3]) {
      const col = match[3].replace('items.', '');
      const like = String(remaining[idx++] ?? '');
      const needle = like.replace(/^%"/, '').replace(/"%$/, '');
      const cell = String(row[col] ?? '');
      if (!cell.includes(`"${needle}"`)) return false;
    }
  }
  return true;
}
