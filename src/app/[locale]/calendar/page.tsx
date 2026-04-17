import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Locale } from '@/constants/site';
import CalendarGrid, { type YearsData } from '@/components/page/calendar/CalendarGrid';
import YearChart from '@/components/page/calendar/YearChart';
import { CALENDAR_TRANSLATIONS } from '@/components/page/calendar/translations';
import { listCalendarYears } from '@/lib/db';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = CALENDAR_TRANSLATIONS[locale as Locale] ?? CALENDAR_TRANSLATIONS.en;
  return getPageMetadata(locale as Locale, {
    title: t.title,
    description: t.description,
  });
}

async function loadYears(): Promise<YearsData> {
  // Queries calendar_entries in D1 and groups by (year, month). In local dev
  // without a live D1 the helper transparently reads public/data/years.json.
  return (await listCalendarYears()) as YearsData;
}

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale as Locale) ?? 'ja';
  const t = CALENDAR_TRANSLATIONS[l] ?? CALENDAR_TRANSLATIONS.en;

  const data = await loadYears();

  return (
    <PageLayout
      breadcrumbItems={[{ title: t.title }]}
      title={t.title}
      description={t.description}
    >
      <div className="space-y-10">
        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
          <li>{t.noteBio}</li>
          <li>{t.noteAge}</li>
        </ul>

        <YearChart data={data} />

        <CalendarGrid data={data} locale={l} />
      </div>
    </PageLayout>
  );
}
