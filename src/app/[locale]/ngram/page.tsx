import { promises as fs } from 'node:fs';
import path from 'node:path';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import NgramClient, {
  type NgramSummary,
} from '@/components/page/ngram/NgramClient';
import { NGRAM_TRANSLATIONS } from '@/components/page/ngram/translations';
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

async function loadSummary(): Promise<NgramSummary> {
  // The raw ngram.json is ~59 MB and is intentionally not shipped in public/.
  // At build time we read a pre-computed compact summary (top-200 terms with
  // time series + total-ngram-per-year histogram) generated once from
  // backup/static/data/ngram.json. See the project brief for the ngram data
  // compromise.
  const file = path.join(
    process.cwd(),
    'public',
    'data',
    'ngram',
    'summary.json'
  );
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw) as NgramSummary;
}

export default async function NgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const summary = await loadSummary();
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
