import { routing } from '@/i18n/routing';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import AdGroupGrid from '@/components/page/ad/AdGroupGrid';
import { getAdIndexGroups } from '@/components/page/ad/data';
import { getAdMessages } from '@/components/page/ad/translations';
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
  const messages = getAdMessages(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: messages.title,
    description: messages.description,
  });
}

export default async function AdIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations('Nav');
  const messages = getAdMessages(locale as Locale);
  const groups = await getAdIndexGroups();

  return (
    <PageLayout
      title={messages.title}
      description={messages.description}
      breadcrumbItems={[{ title: tNav('ad') }]}
    >
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400">
          {messages.eyebrow}
        </p>
      </div>
      <AdGroupGrid groups={groups} noImageLabel={messages.noImage} />
    </PageLayout>
  );
}
