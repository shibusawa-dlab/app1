import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import StaticArticle from '@/components/page/static/StaticArticle';
import { getStaticTitle } from '@/components/page/static/translations';
import { getPageMetadata } from '@/constants/metadata';
import { getStaticEntry, listStaticSlugs } from '@/lib/content';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

export function generateStaticParams() {
  const slugs = listStaticSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = await getStaticEntry(slug);
  const title = getStaticTitle(locale as Locale, entry?.title ?? slug);
  return getPageMetadata(locale as Locale, { title });
}

export default async function StaticSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const entry = await getStaticEntry(slug);
  if (!entry) notFound();

  // The Vue original used `$t(data.title)` — i.e. looked the frontmatter
  // "title" up as an i18n key. We mirror that through staticTr.
  const title = getStaticTitle(loc, entry.title);

  return (
    <PageLayout breadcrumbItems={[{ title }]} title={title}>
      <StaticArticle html={entry.html} />
    </PageLayout>
  );
}
