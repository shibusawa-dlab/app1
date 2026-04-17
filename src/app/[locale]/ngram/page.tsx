import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import NgramClient from '@/components/page/ngram/NgramClient';
import { NGRAM_TRANSLATIONS } from '@/components/page/ngram/translations';
import { NGRAM_SUMMARY } from '@/content/ngramSummary';
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
  const t = NGRAM_TRANSLATIONS[locale as Locale] ?? NGRAM_TRANSLATIONS.ja;
  return getPageMetadata(locale as Locale, {
    title: t.title,
    description: t.description,
  });
}

export default async function NgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // The raw ngram.json is ~59 MB and is intentionally not shipped. A compact
  // summary (top-200 terms with yearly series + total-ngram-per-year
  // histogram) is bundled at build time — see src/content/ngramSummary.ts.
  // Cloudflare Workers does not support fs.readFile, hence the bundled import.
  const summary = NGRAM_SUMMARY;
  const t = NGRAM_TRANSLATIONS[locale as Locale] ?? NGRAM_TRANSLATIONS.ja;

  return (
    <PageLayout
      breadcrumbItems={[{ title: t.title }]}
      title={t.title}
      description={t.lead}
    >
      <NgramClient summary={summary} locale={locale as Locale} />
    </PageLayout>
  );
}
