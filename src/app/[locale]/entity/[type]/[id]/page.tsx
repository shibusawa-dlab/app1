import { notFound } from 'next/navigation';
import Image from 'next/image';
import { routing, Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import { getEntityMessages } from '@/components/page/entity/translations';
import {
  loadEntityData,
  describeValue,
  type EntityType,
} from '@/components/page/entity/data';
import { loadDocs } from '@/components/page/item/data';
import { FaUser, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

const ALLOWED_ENTITIES: EntityType[] = ['agential', 'spatial'];

// Cloudflare Pages has a 20k-file limit. Cap entity detail SSG to the
// top-N by value (appearance count). Set SSG_ENTITY_LIMIT=0 for unlimited.
const SSG_ENTITY_LIMIT = Number(process.env.SSG_ENTITY_LIMIT ?? 300);

export async function generateStaticParams() {
  const data = await loadEntityData();
  const combos: { locale: string; type: string; id: string }[] = [];
  for (const locale of routing.locales) {
    for (const key of ALLOWED_ENTITIES) {
      const list = data[key] ?? [];
      const capped = SSG_ENTITY_LIMIT > 0 ? list.slice(0, SSG_ENTITY_LIMIT) : list;
      for (const rec of capped) {
        combos.push({ locale, type: key, id: rec.id });
      }
    }
  }
  return combos;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; type: string; id: string}>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const m = getEntityMessages(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: id,
    description: `${m.title}: ${id}`,
  });
}

type Hit = { id: string; count: number };
type RelationSummary = {
  byYear: { year: string; count: number }[];
  related: Record<EntityType, Hit[]>;
  total: number;
};
type RelationIndex = Record<EntityType, Map<string, RelationSummary>>;

let relationCache: RelationIndex | null = null;

/**
 * Build a single-pass inverted index from docs.json, keyed by entity ID.
 * Cached in module scope so subsequent page renders reuse the result.
 */
async function getRelationIndex(): Promise<RelationIndex> {
  if (relationCache) return relationCache;

  const docs = await loadDocs();
  const working: Record<EntityType, Map<string, {
    years: Map<string, number>;
    rel: Record<EntityType, Map<string, number>>;
    total: number;
  }>> = {
    agential: new Map(),
    spatial: new Map(),
  };

  const ensure = (field: EntityType, id: string) => {
    let slot = working[field].get(id);
    if (!slot) {
      slot = {
        years: new Map(),
        rel: { agential: new Map(), spatial: new Map() },
        total: 0,
      };
      working[field].set(id, slot);
    }
    return slot;
  };

  for (const key of Object.keys(docs)) {
    const doc = docs[key];
    const y = String(doc.year ?? '');
    for (const field of ALLOWED_ENTITIES) {
      const values = doc[field];
      if (!values) continue;
      for (const id of values) {
        const slot = ensure(field, id);
        slot.total += 1;
        if (y) slot.years.set(y, (slot.years.get(y) ?? 0) + 1);
        for (const other of ALLOWED_ENTITIES) {
          const others = doc[other];
          if (!others) continue;
          for (const v of others) {
            if (other === field && v === id) continue;
            slot.rel[other].set(v, (slot.rel[other].get(v) ?? 0) + 1);
          }
        }
      }
    }
  }

  const finalize = (src: typeof working): RelationIndex => {
    const out: RelationIndex = { agential: new Map(), spatial: new Map() };
    const toSortedHits = (m: Map<string, number>): Hit[] =>
      [...m.entries()]
        .map(([id, count]) => ({ id, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    for (const field of ALLOWED_ENTITIES) {
      for (const [id, slot] of src[field]) {
        out[field].set(id, {
          total: slot.total,
          byYear: [...slot.years.entries()]
            .map(([year, count]) => ({ year, count }))
            .sort((a, b) => Number(a.year) - Number(b.year)),
          related: {
            agential: toSortedHits(slot.rel.agential),
            spatial: toSortedHits(slot.rel.spatial),
          },
        });
      }
    }
    return out;
  };

  relationCache = finalize(working);
  return relationCache;
}

export default async function EntityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; type: string; id: string}>;
}) {
  const { locale, type, id } = await params;
  setRequestLocale(locale);

  if (!ALLOWED_ENTITIES.includes(type as EntityType)) notFound();
  const field = type as EntityType;
  const decodedId = decodeURIComponent(id);

  const m = getEntityMessages(locale as Locale);
  const data = await loadEntityData();
  const index: Record<string, (typeof data)[EntityType][number]> = {};
  for (const rec of data[field] ?? []) {
    index[rec.id] = rec;
  }
  const record = index[decodedId];
  const description = describeValue(record);

  // Look up relations from the shared, cached inverted index.
  const relationIndex = await getRelationIndex();
  const summary = relationIndex[field].get(decodedId) ?? {
    byYear: [],
    related: { agential: [], spatial: [] },
    total: 0,
  };
  const { byYear, related, total } = summary;

  const typeLabel = field === 'agential' ? m.typeAgential : m.typeSpatial;
  const typeSlug = field === 'agential' ? 'agential' : 'place';
  const FallbackIcon = field === 'agential' ? FaUser : FaMapMarkerAlt;

  const maxYearCount = byYear.reduce((mx, it) => Math.max(mx, it.count), 0);

  return (
    <PageLayout
      breadcrumbItems={[
        { title: m.title, href: '/entity' },
        { title: typeLabel, href: `/entity/${typeSlug}` },
        { title: decodedId },
      ]}
      title={decodedId}
      description={m.total(total)}
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-6">
        {typeLabel}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 mb-12">
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden aspect-square flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 relative">
          {record?.image && /^https?:\/\//.test(record.image) ? (
            <Image
              src={record.image}
              alt={decodedId}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <FallbackIcon className="w-16 h-16 text-amber-500/70 dark:text-amber-400/70" aria-hidden />
          )}
        </div>
        <div>
          {description ? (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                （{m.wikipedia}）
              </span>
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">—</p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/entity/${typeSlug}`}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
            >
              {m.backToTypes}
            </Link>
            {/* TODO: wire up fulltext search integration once /search is migrated. */}
            <span
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white/90 opacity-70"
              aria-disabled
              title="TODO: search route not yet migrated"
            >
              <FaSearch aria-hidden /> {m.fulltextSearch}
            </span>
          </div>
        </div>
      </div>

      {byYear.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {m.total(total)}
          </h2>
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 overflow-x-auto">
            {/* Minimal bar chart — legacy used Google Charts; we render a simple accessible version. */}
            <ul className="flex items-end gap-1 min-h-[120px]">
              {byYear.map((y) => {
                const h = maxYearCount === 0 ? 0 : (y.count / maxYearCount) * 100;
                return (
                  <li
                    key={y.year}
                    className="flex-1 flex flex-col items-center gap-1 min-w-[24px] group"
                    title={`${y.year}: ${y.count}`}
                  >
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {y.count}
                    </span>
                    <span
                      className="w-full rounded-t bg-gradient-to-t from-amber-400 to-rose-400"
                      style={{ height: `${Math.max(2, h)}%` }}
                    />
                    <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap rotate-45 origin-left mt-1">
                      {y.year}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ALLOWED_ENTITIES.map((f) => {
          const hits = related[f];
          if (hits.length === 0) return null;
          const label = f === 'agential' ? m.typeAgential : m.typeSpatial;
          return (
            <section key={f}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                {m.related} {label}
              </h3>
              <ul className="flex flex-col gap-2">
                {hits.map((h) => (
                  <li key={h.id}>
                    <Link
                      href={`/entity/${f}/${encodeURIComponent(h.id)}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 line-clamp-1">
                        {h.id}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                        {m.count(h.count)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </PageLayout>
  );
}
