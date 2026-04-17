import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import AdMetadataTable from '@/components/page/ad/AdMetadataTable';
import AdViewer from '@/components/page/ad/AdViewer';
import ShareButtons from '@/components/page/ad/ShareButtons';
import {
  loadAdDataset,
  xmlToHtml,
  cleanContributor,
  displayId,
  REDIRECTED_OP_IDS,
  OP_AGGREGATE_ID,
} from '@/components/page/ad/data';
import { getAdMessages } from '@/components/page/ad/translations';
import { FaArrowLeft, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

// Rendered server-side on demand via D1 — no static generation.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const { bySlug } = await loadAdDataset();
  const item = bySlug[id];
  const messages = getAdMessages(locale as Locale);
  const title = item
    ? `${messages.title}: ${item.label}`
    : messages.notFound;
  return getPageMetadata(locale as Locale, {
    title,
    description: item?.label ?? messages.description,
  });
}

export default async function AdDetail({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations('Nav');
  const messages = getAdMessages(locale as Locale);
  const { bySlug, childrenByParentId, byId } = await loadAdDataset();

  // Legacy compat: redirected OP slugs map to the aggregate item
  const effectiveSlug = REDIRECTED_OP_IDS.has(id) ? OP_AGGREGATE_ID : id;
  const item = bySlug[effectiveSlug];

  if (!item) {
    notFound();
  }

  const xmlHtml = item.xml ? xmlToHtml(item.xml) : undefined;
  const contributor = item.contributor
    ? cleanContributor(item.contributor)
    : undefined;
  const itemForTable = { ...item, contributor };

  const childIds = childrenByParentId[item.id] ?? [];
  const children = childIds
    .map((cid) => byId[cid])
    .filter((c) => c && c.label);

  return (
    <PageLayout
      title={`${item.label}`}
      description={`<span class="font-mono text-sm">${displayId(item.slug)}</span>`}
      breadcrumbItems={[
        { title: tNav('ad'), href: '/ad' },
        { title: item.label },
      ]}
    >
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400">
          {messages.eyebrow}
        </p>
      </div>

      {/* Metadata */}
      {(xmlHtml || item.provider1 || item.provider2 || item.url || contributor) && (
        <section aria-label={messages.metadata} className="mb-10">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-l-4 border-amber-400 dark:border-amber-500 pl-3">
            {messages.metadata}
          </h2>
          <AdMetadataTable
            item={itemForTable}
            xmlHtml={xmlHtml}
            labels={{
              sourceInfo: messages.sourceInfo,
              ownerPast: messages.ownerPast,
              ownerCurrent: messages.ownerCurrent,
              imageUrl: messages.imageUrl,
              imageProvider: messages.imageProvider,
            }}
          />
        </section>
      )}

      {/* Children grid (for parent items like DKB01/DKB02/top) */}
      {children.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-l-4 border-amber-400 dark:border-amber-500 pl-3">
            {tNav('ad')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {children.map((c) => (
              <Link
                key={c.id}
                href={`/ad/${c.slug}`}
                className="group flex flex-col rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-900/20 dark:via-orange-900/10 dark:to-rose-900/10 flex items-center justify-center">
                  {c.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.image}
                      alt={c.label}
                      className="absolute inset-0 w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <FaBookOpen
                      className="w-10 h-10 text-amber-500 dark:text-amber-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-gray-500 dark:text-gray-400">
                    {c.slug}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* IIIF Viewer */}
      <section className="mb-10" aria-label={messages.iiifViewer}>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-l-4 border-amber-400 dark:border-amber-500 pl-3">
          {messages.iiifViewer}
        </h2>
        {item.manifest ? (
          <>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {messages.viewerNotice}
            </p>
            <AdViewer
              manifestUrl={item.manifest}
              label={item.label}
              loadingLabel={messages.loadingViewer}
            />
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <a
                href={item.manifest}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 hover:underline"
              >
                <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" />
                {messages.openManifest}
              </a>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            {messages.viewerUnavailable}
          </p>
        )}
      </section>

      {/* Footer actions: share + back */}
      <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200/70 dark:border-gray-800">
        <Link
          href="/ad"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
        >
          <FaArrowLeft className="w-3 h-3" aria-hidden="true" />
          {messages.backToList}
        </Link>
        <ShareButtons
          title={item.label}
          shareLabel={messages.share}
          shareOnTwitter={messages.shareOnTwitter}
          shareOnFacebook={messages.shareOnFacebook}
          shareOnLink={messages.shareOnLink}
        />
      </div>
    </PageLayout>
  );
}
