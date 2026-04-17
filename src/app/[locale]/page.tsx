import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/page/home/Hero';
import MenuGrid from '@/components/page/home/MenuGrid';
import AboutPreview from '@/components/page/home/AboutPreview';
import NewsTeaser from '@/components/page/home/NewsTeaser';
import type { Locale } from '@/constants/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <MenuGrid />
      <AboutPreview />
      <NewsTeaser locale={locale as Locale} />
    </>
  );
}
