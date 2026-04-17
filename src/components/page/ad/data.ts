/**
 * Archival-description helpers — backed by the D1 `ad_items` table (or the
 * local JSON fallback in `src/lib/db.ts`). Each row stores the original
 * JSON-LD record as a `data` TEXT blob; we parse and project it into the
 * lightweight `AdItem` shape the page components consume.
 */
import { getAdItem, listAdItems, type AdRow } from '@/lib/db';

// JSON-LD raw record shape (subset of the fields we care about)
export type AdRawRecord = {
  '@id': string;
  'http://schema.org/associatedMedia'?: { '@id': string }[];
  'http://schema.org/image'?: { '@id': string }[];
  'http://schema.org/isPartOf'?: { '@id': string }[];
  'http://schema.org/name'?: { '@value': string }[];
  'http://schema.org/provider'?: { '@value': string }[];
  'http://schema.org/sourceData'?: { '@id': string }[];
  'http://schema.org/relatedLink'?: { '@value': string }[];
  'http://schema.org/url'?: { '@id': string }[];
  'http://www.w3.org/2000/01/rdf-schema#label'?: { '@value': string }[];
  'https://shibusawa-dlab.github.io/lab1/api/properties/contributor'?: {
    '@value': string;
  }[];
  'https://shibusawa-dlab.github.io/lab1/api/properties/provider'?: {
    '@value': string;
  }[];
  'https://shibusawa-dlab.github.io/lab1/api/properties/xml'?: {
    '@value': string;
  }[];
};

export type AdItem = {
  id: string;
  slug: string;
  label: string;
  name?: string;
  xml?: string;
  source?: string;
  related?: string;
  parent?: string;
  parentSlug?: string;
  provider1?: string;
  provider2?: string;
  url?: string;
  image?: string;
  manifest?: string;
  contributor?: string;
};

export type AdDataset = {
  items: AdItem[];
  byId: Record<string, AdItem>;
  bySlug: Record<string, AdItem>;
  childrenByParentId: Record<string, string[]>;
};

// Items that redirect to the parent (per legacy logic)
export const REDIRECTED_OP_IDS = new Set([
  'DKB20015m',
  'DKB20016m',
  'DKB20017m',
  'DKB20018m',
  'DKB20019m',
  'DKB20020m',
  'DKB20021m',
  'DKB20022m',
  'DKB20023m',
  'DKB20024m',
  'DKB20025m',
  'DKB20026m',
  'DKB20027m',
  'DKB20028m',
  'DKB20029m',
  'DKB20030m',
  'DKB20031m',
  'DKB20032m',
  'DKB20033m',
]);

export const OP_AGGREGATE_ID = 'DKB20014m';

function transform(raw: AdRawRecord): AdItem {
  const id = raw['@id'];
  const slug = id.split('/items/')[1] ?? id;
  const labelEntry = raw['http://www.w3.org/2000/01/rdf-schema#label'];
  const label = labelEntry?.[0]?.['@value'] ?? id;
  const name = raw['http://schema.org/name']?.[0]?.['@value'];

  const item: AdItem = {
    id,
    slug,
    label,
    name,
  };

  const xml =
    raw['https://shibusawa-dlab.github.io/lab1/api/properties/xml']?.[0]?.[
      '@value'
    ];
  if (xml) item.xml = xml;

  const source = raw['http://schema.org/sourceData']?.[0]?.['@id'];
  if (source) item.source = source;

  const related = raw['http://schema.org/relatedLink']?.[0]?.['@value'];
  if (related) item.related = related;

  const parent = raw['http://schema.org/isPartOf']?.[0]?.['@id'];
  if (parent) {
    item.parent = parent;
    item.parentSlug = parent.split('/items/')[1];
  }

  const provider1 =
    raw['https://shibusawa-dlab.github.io/lab1/api/properties/provider']?.[0]?.[
      '@value'
    ];
  if (provider1) item.provider1 = provider1;

  const provider2 = raw['http://schema.org/provider']?.[0]?.['@value'];
  if (provider2) item.provider2 = provider2;

  const url = raw['http://schema.org/url']?.[0]?.['@id'];
  if (url) item.url = url;

  const image = raw['http://schema.org/image']?.[0]?.['@id'];
  if (image) item.image = image;

  const manifest = raw['http://schema.org/associatedMedia']?.[0]?.['@id'];
  if (manifest) item.manifest = manifest;

  const contributor =
    raw['https://shibusawa-dlab.github.io/lab1/api/properties/contributor']?.[0]?.[
      '@value'
    ];
  if (contributor) item.contributor = contributor;

  return item;
}

function rowToRaw(row: AdRow): AdRawRecord {
  // `data` is parsed JSON already (see `getAdItem`/`listAdItems`).
  return row.data as unknown as AdRawRecord;
}

let cached: Promise<AdDataset> | null = null;

export async function loadAdDataset(): Promise<AdDataset> {
  if (cached) return cached;
  cached = (async () => {
    const rows = await listAdItems();
    const items = rows.map((row) => transform(rowToRaw(row)));

    const byId: Record<string, AdItem> = {};
    const bySlug: Record<string, AdItem> = {};
    const childrenByParentId: Record<string, string[]> = {};

    for (const item of items) {
      byId[item.id] = item;
      bySlug[item.slug] = item;
      if (item.parent) {
        if (!childrenByParentId[item.parent]) {
          childrenByParentId[item.parent] = [];
        }
        childrenByParentId[item.parent].push(item.id);
      }
    }

    for (const key of Object.keys(childrenByParentId)) {
      childrenByParentId[key].sort();
    }

    return { items, byId, bySlug, childrenByParentId };
  })();
  return cached;
}

export async function getAdBySlug(slug: string): Promise<AdItem | null> {
  // Short-circuit via the full dataset — only ~39 rows, fits in memory easily.
  const { bySlug } = await loadAdDataset();
  return bySlug[slug] ?? null;
}

/** Fetch a single row without loading the whole set (for detail pages). */
export async function getAdById(id: string): Promise<AdItem | null> {
  const row = await getAdItem(id);
  if (!row) return null;
  return transform(rowToRaw(row));
}

// Util: XML -> HTML (lightweight port of the legacy `xml2html` util).
export function xmlToHtml(xml: string): string {
  if (!xml) return '';
  let out = xml;
  out = out.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br/>');
  out = out.replace(/<\/?div[^>]*>/g, '');
  out = out.replace(
    /<\/?(persName|placeName|surname|forename|date|name|rs|hi|foreign|lb|orgName)[^>]*>/g,
    ''
  );
  return out;
}

export function cleanContributor(text: string): string {
  return text
    .replace('国文研', '日本')
    .replace('（', '（国文学研究資料館）（')
    .replace('http://base5.nijl.ac.jp/infolib/meta_pub/G0000002JITUHAKU ;', '');
}

export function displayId(slug: string): string {
  if (slug === OP_AGGREGATE_ID) return 'DKB20015m - DKB20033m';
  return slug;
}

export async function getAdIndexGroups(): Promise<
  {
    parentId: string;
    parent: AdItem | undefined;
    children: AdItem[];
  }[]
> {
  const { childrenByParentId, byId } = await loadAdDataset();
  const parentIds = Object.keys(childrenByParentId)
    .filter((id) => !id.endsWith('/items/top'))
    .sort();

  return parentIds.map((parentId) => ({
    parentId,
    parent: byId[parentId],
    children: childrenByParentId[parentId]
      .map((id) => byId[id])
      .filter((c): c is AdItem => Boolean(c) && Boolean(c.label)),
  }));
}
