import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import { getEntityMessages } from '@/components/page/entity/translations';
import {
  getEntityRecord,
  describeValue,
  type EntityType,
} from '@/components/page/entity/data';
import { getEntitySummary } from '@/lib/db';
import { FaUser, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

const ALLOWED_ENTITIES: EntityType[] = ['agential', 'spatial'];

// Rendered server-side on demand via D1 — no static generation.
export const dynamic = 'force-dynamic';

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
  const [record, summary] = await Promise.all([
    getEntityRecord(field, decodedId),
    getEntitySummary(field, decodedId),
  ]);
  const description = describeValue(record);

  const byYear = summary.byYear;
  const related = {
    agential: summary.relatedAgential,
    spatial: summary.relatedSpatial,
  };
  const total = summary.total;

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
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            {/* Bars */}
            <div className="flex items-stretch gap-[2px] h-56">
              {byYear.map((y) => {
                const h = maxYearCount === 0 ? 0 : (y.count / maxYearCount) * 100;
                return (
                  <div
                    key={y.year}
                    className="flex-1 min-w-[8px] flex flex-col justify-end group relative"
                    title={`${y.year}: ${y.count}`}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {y.count}
                    </span>
                    <span
                      className="block w-full rounded-t bg-gradient-to-t from-amber-400 to-rose-400 group-hover:from-amber-500 group-hover:to-rose-500 transition-colors"
                      style={{ height: `${Math.max(1, h)}%`, minHeight: y.count > 0 ? '2px' : '0' }}
                      aria-hidden
                    />
                  </div>
                );
              })}
            </div>
            {/* Year labels */}
            <div className="mt-2 flex justify-between text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
              <span>{byYear[0].year}</span>
              {byYear.length > 2 && <span>{byYear[Math.floor(byYear.length / 2)].year}</span>}
              <span>{byYear[byYear.length - 1].year}</span>
            </div>
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
