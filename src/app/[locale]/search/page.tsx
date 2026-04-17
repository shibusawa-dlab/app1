import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';
import SearchApp from '@/components/page/search/SearchApp';
import { getSearchMessages } from '@/components/page/search/translations';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getSearchMessages(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: messages.title,
    description: messages.description,
  });
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = getSearchMessages(locale as Locale);

  return (
    <PageLayout
      breadcrumbItems={[{ title: messages.title }]}
      title={messages.title}
      description={messages.description}
    >
      <SearchApp messages={messages} />
    </PageLayout>
  );
}
