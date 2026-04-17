import { notFound } from 'next/navigation';
import { routing, Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import { getItemMessages } from '@/components/page/item/translations';
import { loadDocs, getDoc, type DocRecord } from '@/components/page/item/data';
import { renderTeiXml } from '@/components/page/item/xml';
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaFileCode,
  FaImage,
} from 'react-icons/fa';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

/**
 * Bounded at 30 entries — the docs.json has ~10,800 entries and statically
 * exporting all of them makes the build prohibitively slow. The first
 * available IDs (sorted) are enough to smoke-test the migration.
 *
 * TODO: When build infrastructure allows, raise or remove this limit.
 * Consider reading `next` pointers from an entry point (e.g. DKB10001m-0001)
 * and materializing a larger chain, or splitting docs.json into per-item
 * files so the build can stream them.
 */
// Cloudflare Pages has a 20k-file limit. Set SSG_ITEM_LIMIT=0 for unlimited.
const SSG_ITEM_LIMIT = Number(process.env.SSG_ITEM_LIMIT ?? 500);

export async function generateStaticParams() {
  const docs = await loadDocs();
  const ids = Object.keys(docs).sort();
  const capped = SSG_ITEM_LIMIT > 0 ? ids.slice(0, SSG_ITEM_LIMIT) : ids;
  const combos: { locale: string; id: string }[] = [];
  for (const locale of routing.locales) {
    for (const id of capped) {
      combos.push({ locale, id });
    }
  }
  return combos;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const m = getItemMessages(locale as Locale);
  const doc = await getDoc(id);
  const title = doc?.label?.trim() || id;
  return getPageMetadata(locale as Locale, {
    title,
    description: doc?.temporal ? `${m.date}: ${doc.temporal}` : m.description,
  });
}

function splitHierarchy(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(' > ').map((s) => s.trim()).filter(Boolean);
}

function getCategoryChain(doc: DocRecord): string[] {
  const lvl = doc.category?.lvl1 || doc.category?.lvl0 || doc.category_lvl1 || doc.category_lvl0;
  return splitHierarchy(lvl);
}

function getDateChain(doc: DocRecord): string[] {
  const lvl = doc.date?.lvl2 || doc.date?.lvl1 || doc.date?.lvl0 || doc.date_lvl2 || doc.date_lvl1 || doc.date_lvl0;
  return splitHierarchy(lvl);
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const m = getItemMessages(locale as Locale);
  const doc = await getDoc(id);
  if (!doc) notFound();

  const title = doc.label?.trim() || doc.objectID || id;
  const categoryChain = getCategoryChain(doc);
  const dateChain = getDateChain(doc);
  const agentials = doc.agential ?? [];
  const spatials = doc.spatial ?? [];
  const html = renderTeiXml(doc.xml);

  const miradorUrl = doc.manifest
    ? `https://shibusawa-dlab.github.io/lab1/mirador/?manifest=${encodeURIComponent(
        doc.manifest
      )}${doc.canvas ? `&canvas=${encodeURIComponent(doc.canvas)}` : ''}&bottomPanel=false`
    : null;

  return (
    <PageLayout
      breadcrumbItems={[{ title: m.title }, { title }]}
      title={title}
      description={doc.temporal ? `${m.date}: ${doc.temporal}` : undefined}
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-6">
        {m.eyebrow}
      </p>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between gap-4 mb-8">
        {doc.prev ? (
          <Link
            href={`/item/${doc.prev}`}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
          >
            <FaChevronLeft aria-hidden /> {m.previous}
          </Link>
        ) : (
          <span />
        )}
        {doc.next ? (
          <Link
            href={`/item/${doc.next}`}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
          >
            {m.next} <FaChevronRight aria-hidden />
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Main split: text + viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <section className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 overflow-auto max-h-[600px]">
          <article
            className="tei-body prose prose-sm dark:prose-invert max-w-none leading-relaxed"
            // html comes from a trusted data file checked into the repo.
            dangerouslySetInnerHTML={{ __html: html || `<p>${title}</p>` }}
          />
          <div className="mt-6 rounded-lg bg-gray-50 dark:bg-gray-800/60 p-4 text-xs text-gray-600 dark:text-gray-400">
            <strong className="mr-2">{m.legend}:</strong>
            <span className="mr-3 text-amber-700 dark:text-amber-300">{m.agential}</span>
            <span className="mr-3 text-rose-700 dark:text-rose-300">{m.spatial}</span>
            <span className="mr-3 text-orange-700 dark:text-orange-300">{m.date}</span>
            <span className="text-amber-600 dark:text-amber-400">{m.temporal}</span>
          </div>
        </section>
        <section className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          {miradorUrl ? (
            <iframe
              src={miradorUrl}
              title={m.mirador}
              className="w-full h-[600px]"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] gap-3 p-6 text-center">
              <FaImage className="w-10 h-10 text-gray-300 dark:text-gray-600" aria-hidden />
              <p className="text-sm text-gray-500 dark:text-gray-400">{m.viewerUnavailable}</p>
            </div>
          )}
        </section>
      </div>

      {/* External links */}
      <div className="flex flex-wrap gap-3 mb-10">
        {doc.manifest && (
          <a
            href={doc.manifest}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
          >
            {m.iiif} <FaExternalLinkAlt aria-hidden className="text-xs" />
          </a>
        )}
        {miradorUrl && (
          <a
            href={miradorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
          >
            {m.mirador} <FaExternalLinkAlt aria-hidden className="text-xs" />
          </a>
        )}
        {doc.source && (
          <a
            href={doc.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
          >
            <FaFileCode aria-hidden /> {m.tei}
          </a>
        )}
      </div>

      {/* Metadata table */}
      <section className="mb-10">
        <dl className="divide-y divide-gray-200 dark:divide-gray-800 rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900">
          {categoryChain.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 px-5 py-4">
              <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400">{m.category}</dt>
              <dd className="text-sm text-gray-800 dark:text-gray-200">
                {categoryChain.map((c, i) => (
                  <span key={i}>
                    {i > 0 && <span className="mx-2 text-gray-400">›</span>}
                    <span>{c}</span>
                  </span>
                ))}
              </dd>
            </div>
          )}
          {dateChain.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 px-5 py-4">
              <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400">{m.date}</dt>
              <dd className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                {dateChain.map((c, i) => (
                  <span key={i}>
                    {i > 0 && <span className="mx-2 text-gray-400">›</span>}
                    <span>{c}</span>
                  </span>
                ))}
              </dd>
            </div>
          )}
          {agentials.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 px-5 py-4">
              <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400">{m.agential}</dt>
              <dd className="flex flex-wrap gap-2">
                {agentials.map((v) => (
                  <Link
                    key={v}
                    href={`/entity/agential/${encodeURIComponent(v)}`}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/20 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                  >
                    {v}
                  </Link>
                ))}
              </dd>
            </div>
          )}
          {spatials.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 px-5 py-4">
              <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400">{m.spatial}</dt>
              <dd className="flex flex-wrap gap-2">
                {spatials.map((v) => (
                  <Link
                    key={v}
                    href={`/entity/spatial/${encodeURIComponent(v)}`}
                    className="inline-flex items-center gap-1 rounded-full bg-rose-50 dark:bg-rose-900/20 px-3 py-1 text-xs font-semibold text-rose-800 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                  >
                    {v}
                  </Link>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {/* License */}
      <section className="text-center rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-800 p-8">
        <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-3">
          {m.license}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="license noopener noreferrer"
            className="underline hover:text-amber-700 dark:hover:text-amber-300"
          >
            CC BY 4.0
          </a>
          {' · '}
          {m.licenseNotice}
        </p>
      </section>
    </PageLayout>
  );
}
