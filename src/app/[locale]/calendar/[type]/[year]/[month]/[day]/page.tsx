import { promises as fs } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Locale } from '@/constants/site';
import DayDetail, { type DayEntry } from '@/components/page/calendar/DayDetail';
import { CALENDAR_TRANSLATIONS } from '@/components/page/calendar/translations';

// Legacy view types supported by the original Vuetify `<v-calendar>`.
// For the static export we accept the same slugs but all render the day detail.
const VALID_TYPES = ['day', 'week', 'month', '4day', 'custom-daily'] as const;

function pad2(n: number | string): string {
  const s = String(n);
  return s.length >= 2 ? s : '0' + s;
}

type DateParts = { year: number; month: number; day: number };

async function listSampleDates(): Promise<DateParts[]> {
  const dir = path.join(process.cwd(), 'public', 'data', 'date');
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  return files
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .map((s) => {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
      if (!m) return null;
      return {
        year: Number(m[1]),
        month: Number(m[2]),
        day: Number(m[3]),
      } as DateParts;
    })
    .filter((v): v is DateParts => v !== null);
}

// Cloudflare Pages 20k-file limit. Set SSG_CALENDAR_LIMIT=0 for unlimited.
const SSG_CALENDAR_LIMIT = Number(process.env.SSG_CALENDAR_LIMIT ?? 500);

export async function generateStaticParams() {
  const dates = await listSampleDates();
  const capped = SSG_CALENDAR_LIMIT > 0 ? dates.slice(0, SSG_CALENDAR_LIMIT) : dates;

  const out: {
    locale: string;
    type: string;
    year: string;
    month: string;
    day: string;
  }[] = [];

  const monthFirstDays = new Set<string>();

  for (const locale of routing.locales) {
    for (const d of capped) {
      out.push({
        locale,
        type: 'month',
        year: String(d.year),
        month: String(d.month),
        day: String(d.day),
      });
      const key = `${locale}-${d.year}-${d.month}`;
      if (!monthFirstDays.has(key)) {
        monthFirstDays.add(key);
        if (d.day !== 1) {
          out.push({
            locale,
            type: 'month',
            year: String(d.year),
            month: String(d.month),
            day: '1',
          });
        }
      }
    }
  }

  return out;
}

async function loadEntry(
  year: number,
  month: number,
  day: number
): Promise<DayEntry | null> {
  const name = `${year}-${pad2(month)}-${pad2(day)}.json`;
  const filePath = path.join(process.cwd(), 'public', 'data', 'date', name);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as DayEntry;
  } catch {
    return null;
  }
}

/** Load all entries for a given year-month, returning them sorted by day. */
async function loadMonthEntries(
  year: number,
  month: number
): Promise<{ day: number; entry: DayEntry }[]> {
  const dir = path.join(process.cwd(), 'public', 'data', 'date');
  const prefix = `${year}-${pad2(month)}-`;
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const results: { day: number; entry: DayEntry }[] = [];
  for (const f of files.filter((n) => n.startsWith(prefix) && n.endsWith('.json'))) {
    const d = Number(f.slice(prefix.length, prefix.length + 2));
    if (!d) continue;
    const entry = await loadEntry(year, month, d);
    if (entry) results.push({ day: d, entry });
  }
  results.sort((a, b) => a.day - b.day);
  return results;
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
