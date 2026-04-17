/**
 * Item data helpers — backed by the D1 `items` table (or a local JSON
 * fallback) via `src/lib/db.ts`. The previous implementation loaded a ~72 MB
 * `docs.json` into memory at build time; we now fetch on demand, so the
 * surface here is intentionally slim.
 */
import { getItem, normalizeItemId, listItems, type ItemRow } from '@/lib/db';

export type DocRecord = {
  objectID: string;
  label?: string;
  xml?: string;
  description?: string;
  agential?: string[];
  spatial?: string[];
  temporal?: string;
  time?: Record<string, string>;
  date?: { lvl0?: string; lvl1?: string; lvl2?: string };
  category?: { lvl0?: string; lvl1?: string };
  year?: string | number;
  yearAndMonth?: string;
  date_lvl0?: string;
  date_lvl1?: string;
  date_lvl2?: string;
  category_lvl0?: string;
  category_lvl1?: string;
  manifest?: string;
  canvas?: string;
  source?: string;
  next?: string | null;
  prev?: string | null;
  sort?: string;
  type?: string;
  texts?: string[];
};

/** Normalize user-provided IDs to the canonical items key. */
export function normalizeDocId(id: string): string {
  return normalizeItemId(id);
}

function rowToDoc(row: ItemRow | null): DocRecord | undefined {
  if (!row) return undefined;
  const doc: DocRecord = {
    objectID: row.id,
  };
  if (row.label) doc.label = row.label;
  if (row.xml) doc.xml = row.xml;
  if (row.description) doc.description = row.description;
  if (row.agential.length > 0) doc.agential = row.agential;
  if (row.spatial.length > 0) doc.spatial = row.spatial;
  if (row.temporal) doc.temporal = row.temporal;
  if (row.year != null) doc.year = row.year;
  if (row.year_and_month) doc.yearAndMonth = row.year_and_month;
  if (row.manifest) doc.manifest = row.manifest;
  if (row.canvas) doc.canvas = row.canvas;
  if (row.source) doc.source = row.source;
  if (row.prev_id) doc.prev = row.prev_id;
  if (row.next_id) doc.next = row.next_id;
  if (row.sort_key) doc.sort = row.sort_key;
  if (row.type) doc.type = row.type;
  if (row.date_lvl0) doc.date_lvl0 = row.date_lvl0;
  if (row.date_lvl1) doc.date_lvl1 = row.date_lvl1;
  if (row.date_lvl2) doc.date_lvl2 = row.date_lvl2;
  if (row.category_lvl0) doc.category_lvl0 = row.category_lvl0;
  if (row.category_lvl1) doc.category_lvl1 = row.category_lvl1;
  const date: NonNullable<DocRecord['date']> = {};
  if (row.date_lvl0) date.lvl0 = row.date_lvl0;
  if (row.date_lvl1) date.lvl1 = row.date_lvl1;
  if (row.date_lvl2) date.lvl2 = row.date_lvl2;
  if (Object.keys(date).length > 0) doc.date = date;
  const category: NonNullable<DocRecord['category']> = {};
  if (row.category_lvl0) category.lvl0 = row.category_lvl0;
  if (row.category_lvl1) category.lvl1 = row.category_lvl1;
  if (Object.keys(category).length > 0) doc.category = category;
  return doc;
}

export async function getDoc(id: string): Promise<DocRecord | undefined> {
  const row = await getItem(id);
  return rowToDoc(row);
}

/** Slim listing helper retained for compatibility with earlier callers. */
export async function listDocs(limit = 50, offset = 0): Promise<DocRecord[]> {
  const rows = await listItems(limit, offset);
  return rows.map((r) => rowToDoc(r)).filter((d): d is DocRecord => Boolean(d));
}
