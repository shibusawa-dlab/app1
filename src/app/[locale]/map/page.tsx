import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Locale } from '@/constants/site';
import MapClient from '@/components/page/map/MapClient';
import type { SpatialPoint } from '@/components/page/map/MapView';
import { MAP_TRANSLATIONS } from '@/components/page/map/translations';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = MAP_TRANSLATIONS[locale as Locale] ?? MAP_TRANSLATIONS.en;
  return getPageMetadata(locale as Locale, {
    title: t.title,
    description: t.description,
  });
}

type SpatialEntry = { lat: number; long: number };

async function loadSpatial(): Promise<SpatialPoint[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'spatial.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(raw) as Record<string, SpatialEntry>;
  const points: SpatialPoint[] = [];
  for (const label of Object.keys(data)) {
    const e = data[label];
    if (
      e &&
      typeof e.lat === 'number' &&
      typeof e.long === 'number' &&
      !Number.isNaN(e.lat) &&
      !Number.isNaN(e.long)
    ) {
      points.push({ label, lat: e.lat, lng: e.long });
    }
  }
  return points;
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale as Locale) ?? 'ja';
  const t = MAP_TRANSLATIONS[l] ?? MAP_TRANSLATIONS.en;

  const points = await loadSpatial();

  return (
    <PageLayout
      breadcrumbItems={[{ title: t.title }]}
      title={t.title}
      description={t.description}
      fluid
    >
      <MapClient points={points} locale={l} />
    </PageLayout>
  );
}
