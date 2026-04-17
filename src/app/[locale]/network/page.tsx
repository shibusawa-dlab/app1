import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import NetworkList, {
  type NetworkIndexItem,
} from '@/components/page/network/NetworkList';
import { NETWORK_TRANSLATIONS } from '@/components/page/network/translations';
import { listNetworkPeople } from '@/lib/db';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

// Data is loaded from D1 at request time — render dynamically per request.
export const dynamic = 'force-dynamic';

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
  const rows = await listNetworkPeople(200);
  return rows.map((r) => ({ id: r.id, label: r.id, count: r.count }));
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
