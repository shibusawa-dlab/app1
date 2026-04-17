import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import RedirectClient from '@/components/page/redirect/RedirectClient';
import { getRedirectTr } from '@/components/page/redirect/translations';
import { getPageMetadata } from '@/constants/metadata';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = getRedirectTr(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: tr.title,
    description: tr.description,
  });
}

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = getRedirectTr(locale as Locale);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <RedirectClient
      basePath={basePath}
      labels={{
        redirecting: tr.redirecting,
        fallbackLink: tr.fallbackLink,
        home: tr.home,
      }}
    />
  );
}
