import { Link } from '@/i18n/routing';
import { CALENDAR_TRANSLATIONS } from './translations';
import type { Locale } from '@/constants/site';

// Minimal subset of the /data/date/YYYY-MM-DD.json schema that we use.
export type DayEntry = {
  objectID?: string;
  label?: string;
  description?: string;
  temporal?: string;
  time?: Record<string, string>;
  category?: { lvl0?: string; lvl1?: string };
  category_lvl0?: string;
  category_lvl1?: string;
  source?: string;
  manifest?: string;
  spatial?: string[];
  agential?: string[];
};

// Strip TEI/HTML tags for a plain-text preview.
function stripTags(s?: string): string {
  if (!s) return '';
  return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export default function DayDetail({
  entry,
  year,
  month,
  day,
  locale,
}: {
  entry: DayEntry | null;
  year: number;
  month: number;
  day: number;
  locale: Locale;
}) {
  const t = CALENDAR_TRANSLATIONS[locale] ?? CALENDAR_TRANSLATIONS.en;

  if (!entry) {
    return (
      <div className="rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-white dark:bg-gray-900 p-8 md:p-12 shadow-sm">
        <p className="text-gray-700 dark:text-gray-300">{t.noEntries}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t.sampleNotice}
        </p>
        <div className="mt-6">
          <Link
            href="/calendar"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:from-amber-600 hover:to-rose-500 transition-colors"
          >
            {t.backToCalendar}
          </Link>
        </div>
      </div>
    );
  }

  const summary = stripTags(entry.description ?? entry.label);
  const times = entry.time ? Object.entries(entry.time) : [];

  return (
    <div className="space-y-8">
      <article className="rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-sm">
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-700 dark:text-amber-300 mb-2">
            {t.dayLabel(year, month, day)}
          </p>
          {(entry.category?.lvl1 || entry.category_lvl1) && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {entry.category?.lvl1 ?? entry.category_lvl1}
            </p>
          )}
        </header>

        {summary && (
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
            {summary}
          </p>
        )}

        {entry.spatial && entry.spatial.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {locale === 'ja' ? '登場する地名' : 'Places'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {entry.spatial.slice(0, 30).map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/40 px-3 py-1 text-xs text-amber-800 dark:text-amber-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {entry.agential && entry.agential.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {locale === 'ja' ? '登場する人物' : 'People'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {entry.agential.slice(0, 30).map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800/40 px-3 py-1 text-xs text-rose-800 dark:text-rose-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {entry.source && (
          <div className="mt-8">
            <a
              href={entry.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200"
            >
              {t.viewOriginal}
            </a>
          </div>
        )}
      </article>

      {times.length > 0 && (
        <section className="rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t.timeLabel}
          </h2>
          <ul className="space-y-4">
            {times.map(([time, xml]) => (
              <li
                key={time}
                className="flex flex-col sm:flex-row gap-3 sm:gap-6 border-b last:border-b-0 border-amber-100/70 dark:border-amber-900/30 pb-4 last:pb-0"
              >
                <span className="shrink-0 inline-flex h-7 items-center rounded-md bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/40 px-2 text-xs font-mono text-amber-800 dark:text-amber-200">
                  {time}
                </span>
                <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  {stripTags(xml)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
