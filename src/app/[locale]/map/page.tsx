import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Locale } from '@/constants/site';
import MapClient from '@/components/page/map/MapClient';
import { MAP_TRANSLATIONS } from '@/components/page/map/translations';
import { SPATIAL_POINTS } from '@/content/spatial';

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

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale as Locale) ?? 'ja';
  const t = MAP_TRANSLATIONS[l] ?? MAP_TRANSLATIONS.en;

  // Bundled at build time — see src/content/spatial.ts (generated from
  // public/data/spatial.json). Avoids fs.readFile which is unavailable on
  // Cloudflare Workers.
  const points = SPATIAL_POINTS;

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
