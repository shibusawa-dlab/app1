import { promises as fs } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import NetworkDetailClient from '@/components/page/network/NetworkDetailClient';
import { NETWORK_TRANSLATIONS } from '@/components/page/network/translations';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';
import type {
  GraphNode,
  GraphEdge,
} from '@/components/page/network/NetworkGraph';

// TODO: Only top-50 most frequent people are statically generated due to
// static-export size limits. Expanding this set requires also generating the
// corresponding public/data/network/<id>.json files (see scripts/build data).
const NETWORK_DATA_DIR = path.join(
  process.cwd(),
  'public',
  'data',
  'network'
);

type NetworkIndex = {
  items: { id: string; label: string; count: number }[];
};

type NetworkData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

async function loadIndex(): Promise<NetworkIndex> {
  const raw = await fs.readFile(
    path.join(NETWORK_DATA_DIR, 'index.json'),
    'utf8'
  );
  return JSON.parse(raw) as NetworkIndex;
}

async function loadNetwork(id: string): Promise<NetworkData | null> {
  const file = path.join(NETWORK_DATA_DIR, `${id}.json`);
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw) as NetworkData;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const index = await loadIndex();
  const params: { locale: string; id: string }[] = [];
  for (const locale of routing.locales) {
    for (const item of index.items) {
      params.push({ locale, id: item.id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const decoded = decodeURIComponent(id);
  const t = NETWORK_TRANSLATIONS[locale as Locale] ?? NETWORK_TRANSLATIONS.ja;
  return getPageMetadata(locale as Locale, {
    title: `${decoded}${t.detailTitle}`,
    description: t.detailLead,
  });
}

export default async function NetworkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const decoded = decodeURIComponent(id);

  const data = await loadNetwork(decoded);
  if (!data) notFound();

  const t = NETWORK_TRANSLATIONS[locale as Locale] ?? NETWORK_TRANSLATIONS.ja;
  const pageTitle = `${decoded}${t.detailTitle}`;

  return (
    <PageLayout
      breadcrumbItems={[
        { title: t.title, href: '/network' },
        { title: pageTitle },
      ]}
      title={pageTitle}
      description={t.detailLead}
    >
      <NetworkDetailClient
        id={decoded}
        nodes={data.nodes}
        edges={data.edges}
        locale={locale as Locale}
      />
    </PageLayout>
  );
}
