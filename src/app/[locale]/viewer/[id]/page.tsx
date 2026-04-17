import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';
import {
  getViewerMessages,
  VIEWER_IDS,
} from '@/components/page/viewer/translations';
import TeiViewerClient from './TeiViewerClient';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VIEWER_IDS.map((id) => ({ locale, id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const messages = getViewerMessages(locale as Locale);
  const vol =
    (VIEWER_IDS as readonly string[]).includes(id) && id in messages.volumes
      ? messages.volumes[id as keyof typeof messages.volumes]
      : null;
  const title = vol ? vol.label : `${messages.title} — ${id}`;
  return getPageMetadata(locale as Locale, {
    title,
    description: vol?.description ?? messages.description,
  });
}

export default async function ViewerDetail({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const messages = getViewerMessages(locale as Locale);
  const vol =
    (VIEWER_IDS as readonly string[]).includes(id) && id in messages.volumes
      ? messages.volumes[id as keyof typeof messages.volumes]
      : null;

  const title = vol ? vol.label : `${messages.title} — ${id}`;

  return (
    <PageLayout
      fluid
      breadcrumbItems={[
        { title: messages.title, href: '/viewer' },
        { title: vol?.label ?? id },
      ]}
      title={title}
      description={vol?.description}
    >
      <TeiViewerClient id={id} messages={messages} />
    </PageLayout>
  );
}
