import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import NetworkDetailClient from '@/components/page/network/NetworkDetailClient';
import { NETWORK_TRANSLATIONS } from '@/components/page/network/translations';
import { getNetworkNeighbors } from '@/lib/db';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';
import type {
  GraphNode,
  GraphEdge,
} from '@/components/page/network/NetworkGraph';

// Rendered server-side on demand via D1 — no static generation.
export const dynamic = 'force-dynamic';

const NEIGHBOR_LIMIT = 50;

async function loadNetwork(
  id: string
): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] } | null> {
  const neighbors = await getNetworkNeighbors(id, NEIGHBOR_LIMIT);
  if (neighbors.length === 0) return null;

  const selfWeight = neighbors.reduce((sum, n) => sum + n.weight, 0);
  const nodes: GraphNode[] = [
    { id, label: id, count: selfWeight },
    ...neighbors.map((n) => ({ id: n.person, label: n.person, count: n.weight })),
  ];
  const edges: GraphEdge[] = neighbors.map((n) => ({
    from: id,
    to: n.person,
    value: n.weight,
  }));

  return { nodes, edges };
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
