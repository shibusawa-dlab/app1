import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import NewsDetail from '@/components/page/news/NewsDetail';
import { getNewsTr } from '@/components/page/news/translations';
import { getPageMetadata } from '@/constants/metadata';
import { getNewsEntry, listNewsSlugs } from '@/lib/content';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    // For SSG, include every slug under both locales. If the locale-specific
    // file is missing, the page falls back to the ja source (see getNewsEntry).
    const jaSlugs = await listNewsSlugs('ja');
    const localeSlugs = await listNewsSlugs(locale as Locale);
    const all = new Set<string>([...jaSlugs, ...localeSlugs]);
    for (const slug of all) {
      params.push({ locale: locale as Locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = await getNewsEntry(locale as Locale, slug);
  const tr = getNewsTr(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: entry?.title ?? tr.title,
    description: entry?.title ?? tr.description,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const entry = await getNewsEntry(loc, slug);
  if (!entry) notFound();

  const tr = getNewsTr(loc);

  return (
    <PageLayout
      breadcrumbItems={[
        { title: tr.title, href: '/news' },
        { title: entry.title },
      ]}
      title={entry.title}
    >
      <NewsDetail entry={entry} locale={loc} />
    </PageLayout>
  );
}
