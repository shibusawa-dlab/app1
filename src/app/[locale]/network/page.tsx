import { promises as fs } from 'node:fs';
import path from 'node:path';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import NetworkList, {
  type NetworkIndexItem,
} from '@/components/page/network/NetworkList';
import { NETWORK_TRANSLATIONS } from '@/components/page/network/translations';
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
  const t = NETWORK_TRANSLATIONS[locale as Locale] ?? NETWORK_TRANSLATIONS.ja;
  return getPageMetadata(locale as Locale, {
    title: t.title,
    description: t.description,
  });
}

async function loadIndex(): Promise<NetworkIndexItem[]> {
  const file = path.join(
    process.cwd(),
    'public',
    'data',
    'network',
    'index.json'
  );
  const raw = await fs.readFile(file, 'utf8');
  const json = JSON.parse(raw) as { items: NetworkIndexItem[] };
  return json.items;
}

export default async function NetworkOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const items = await loadIndex();
  const t = NETWORK_TRANSLATIONS[locale as Locale] ?? NETWORK_TRANSLATIONS.ja;

  return (
    <PageLayout
      breadcrumbItems={[{ title: t.title }]}
      title={t.title}
      description={t.lead}
    >
      <NetworkList items={items} locale={locale as Locale} />
    </PageLayout>
  );
}
