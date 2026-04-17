import { routing } from '@/i18n/routing';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import FulltextTable from '@/components/page/fulltext/FulltextTable';
import { getFulltextTr } from '@/components/page/fulltext/translations';
import { getPageMetadata } from '@/constants/metadata';
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
  // Prefer the centrally-managed Nav label ("fulltext") as the page title
  // for consistency with the navigation.
  const tNav = await getTranslations({ locale, namespace: 'Nav' });
  const tr = getFulltextTr(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: tNav('fulltext') || tr.title,
    description: tr.description,
  });
}

export default async function FulltextPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const tNav = await getTranslations('Nav');
  const tr = getFulltextTr(loc);
  const title = tNav('fulltext') || tr.title;

  return (
    <PageLayout
      breadcrumbItems={[{ title }]}
      title={title}
      description={tr.description}
    >
      <FulltextTable locale={loc} />
    </PageLayout>
  );
}
