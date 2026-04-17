import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import NewsList from '@/components/page/news/NewsList';
import { getNewsTr } from '@/components/page/news/translations';
import { getPageMetadata } from '@/constants/metadata';
import { listNewsEntries } from '@/lib/content';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = getNewsTr(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: tr.title,
    description: tr.description,
  });
}

export default async function NewsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const tr = getNewsTr(loc);
  const entries = await listNewsEntries(loc);

  return (
    <PageLayout
      breadcrumbItems={[{ title: tr.title }]}
      title={tr.title}
      description={tr.description}
    >
      <NewsList entries={entries} locale={loc} />
    </PageLayout>
  );
}
