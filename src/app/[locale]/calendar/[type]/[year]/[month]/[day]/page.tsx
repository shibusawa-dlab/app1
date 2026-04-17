import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Locale } from '@/constants/site';
import DayDetail, { type DayEntry } from '@/components/page/calendar/DayDetail';
import { CALENDAR_TRANSLATIONS } from '@/components/page/calendar/translations';
import { getCalendarEntry } from '@/lib/db';

// Legacy view types supported by the original Vuetify `<v-calendar>`.
// For the SSR page we accept the same slugs but all render the day detail.
const VALID_TYPES = ['day', 'week', 'month', '4day', 'custom-daily'] as const;

// Rendered server-side on demand via D1 — no static generation.
export const dynamic = 'force-dynamic';

function pad2(n: number | string): string {
  const s = String(n);
  return s.length >= 2 ? s : '0' + s;
}

async function loadEntry(
  year: number,
  month: number,
  day: number
): Promise<DayEntry | null> {
  const date = `${year}-${pad2(month)}-${pad2(day)}`;
  const row = await getCalendarEntry(date);
  if (!row) return null;
  return row.data as unknown as DayEntry;
}

type RouteParams = {
  locale: string;
  type: string;
  year: string;
  month: string;
  day: string;
};

function parseParams(params: RouteParams) {
  if (!(VALID_TYPES as readonly string[]).includes(params.type)) {
    return null;
  }
  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }
  return { year, month, day };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const p = await params;
  const parsed = parseParams(p);
  const l = (p.locale as Locale) ?? 'ja';
  const t = CALENDAR_TRANSLATIONS[l] ?? CALENDAR_TRANSLATIONS.en;
  const title = parsed
    ? `${t.title} — ${t.dayLabel(parsed.year, parsed.month, parsed.day)}`
    : t.title;
  return getPageMetadata(l, {
    title,
    description: t.description,
  });
}

export default async function CalendarDayPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const p = await params;
  setRequestLocale(p.locale);
  const parsed = parseParams(p);
  if (!parsed) {
    notFound();
  }
  const { year, month, day } = parsed;
  const l = (p.locale as Locale) ?? 'ja';
  const t = CALENDAR_TRANSLATIONS[l] ?? CALENDAR_TRANSLATIONS.en;

  const entry = await loadEntry(year, month, day);
  const pageTitle = t.dayLabel(year, month, day);

  return (
    <PageLayout
      breadcrumbItems={[
        { title: t.title, href: '/calendar' },
        { title: pageTitle },
      ]}
      title={pageTitle}
      description={t.dayDetailIntro}
    >
      <DayDetail
        entry={entry}
        year={year}
        month={month}
        day={day}
        locale={l}
      />
    </PageLayout>
  );
}
