import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';
import { getViewerMessages, VIEWER_IDS } from '@/components/page/viewer/translations';
import VolumeCard from '@/components/page/viewer/VolumeCard';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getViewerMessages(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: messages.title,
    description: messages.description,
  });
}

export default async function ViewerIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = getViewerMessages(locale as Locale);

  return (
    <PageLayout
      breadcrumbItems={[{ title: messages.title }]}
      title={messages.title}
      description={messages.description}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VIEWER_IDS.map((id) => {
          const vol = messages.volumes[id];
          return (
            <VolumeCard
              key={id}
              id={id}
              label={vol.label}
              description={vol.description}
              cta={messages.openViewer}
            />
          );
        })}
      </div>
    </PageLayout>
  );
}
