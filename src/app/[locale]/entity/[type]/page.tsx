import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import { getEntityMessages } from '@/components/page/entity/translations';
import {
  ENTITY_TYPE_SLUGS,
  TYPE_SLUG_TO_KEY,
  loadEntityData,
} from '@/components/page/entity/data';
import EntityListClient from '@/components/page/entity/EntityListClient';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

export function generateStaticParams() {
  const combos: { locale: string; type: string }[] = [];
  for (const locale of routing.locales) {
    for (const type of ENTITY_TYPE_SLUGS) {
      combos.push({ locale, type });
    }
  }
  return combos;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}): Promise<Metadata> {
  const { locale, type } = await params;
  const m = getEntityMessages(locale as Locale);
  const typeLabel = type === 'agential' ? m.typeAgential : m.typeSpatial;
  return getPageMetadata(locale as Locale, {
    title: `${m.title} - ${typeLabel}`,
    description: m.description,
  });
}

export default async function EntityTypePage({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}) {
  const { locale, type } = await params;
  setRequestLocale(locale);

  const dataKey = TYPE_SLUG_TO_KEY[type];
  if (!dataKey) notFound();

  const m = getEntityMessages(locale as Locale);
  const data = await loadEntityData();
  const items = data[dataKey] ?? [];
  const typeLabel = dataKey === 'agential' ? m.typeAgential : m.typeSpatial;

  return (
    <PageLayout
      breadcrumbItems={[
        { title: m.title, href: '/entity' },
        { title: typeLabel },
      ]}
      title={typeLabel}
      description={m.disclaimer}
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-6">
        {m.eyebrow}
      </p>
      <EntityListClient items={items} dataKey={dataKey} locale={locale as Locale} />
    </PageLayout>
  );
}
