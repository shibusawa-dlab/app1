import { promises as fs } from 'node:fs';
import path from 'node:path';

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

export type DocsIndex = Record<string, DocRecord>;

/**
 * Path to the legacy docs.json outside the public tree.
 * Kept outside public/ to avoid shipping a 72 MB file with the build.
 */
const DOCS_PATH = path.join(
  process.cwd(),
  'backup',
  'static',
  'data',
  'docs.json'
);

let cache: DocsIndex | null = null;

/**
 * Load the full docs.json index. This is ~72 MB and takes a second to parse,
 * so it's cached per server process. Only called at build time from server
 * components / generateStaticParams.
 *
 * TODO (scale): At build time with 10k+ records this materializes a huge
 * object. Consider splitting by objectID (e.g. one JSON file per item under
 * public/data/items/) and fetching on demand. For now, we bound
 * generateStaticParams and load docs.json lazily.
 */
export async function loadDocs(): Promise<DocsIndex> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(DOCS_PATH, 'utf-8');
    cache = JSON.parse(raw) as DocsIndex;
    return cache;
  } catch (err) {
    // In environments without backup/, fall back to empty index (page will 404).
    console.warn(
      '[item/data] Unable to read docs.json, rendering empty dataset:',
      err instanceof Error ? err.message : err
    );
    cache = {};
    return cache;
  }
}

/**
 * Normalize user-provided IDs to the canonical docs.json key.
 * Legacy pattern: "DKB10001m-1" -> "DKB10001m-0001".
 */
export function normalizeDocId(id: string): string {
  const spl = id.split('-');
  if (spl.length !== 2) return id;
  const [prefix, num] = spl;
  if (!/^\d+$/.test(num)) return id;
  return `${prefix}-${String(Number(num)).padStart(4, '0')}`;
}

export async function getDoc(id: string): Promise<DocRecord | undefined> {
  const docs = await loadDocs();
  return docs[normalizeDocId(id)];
}
