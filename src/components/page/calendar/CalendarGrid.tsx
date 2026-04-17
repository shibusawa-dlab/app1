import { Link } from '@/i18n/routing';
import { CALENDAR_TRANSLATIONS } from './translations';
import type { Locale } from '@/constants/site';

// Shibusawa Eiichi was born in 1840. Age within that calendar year.
const BIRTH_YEAR = 1840;

export type YearsData = Record<string, Record<string, number>>;

export default function CalendarGrid({
  data,
  locale,
}: {
  data: YearsData;
  locale: Locale;
}) {
  const t = CALENDAR_TRANSLATIONS[locale];

  const yearKeys = Object.keys(data)
    .map((y) => Number(y))
    .filter((y) => !Number.isNaN(y));
  if (yearKeys.length === 0) {
    return null;
  }
  const minYear = Math.min(...yearKeys);
  const maxYear = Math.max(...yearKeys);

  const years: number[] = [];
  for (let y = minYear; y <= maxYear; y++) years.push(y);

  const count = (year: number, month: number): number => {
    const y = data[String(year)];
    if (!y) return 0;
    return y[String(month)] ?? 0;
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-amber-100 dark:border-amber-900/40 shadow-sm bg-white dark:bg-gray-900">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <tbody>
          {years.map((year) => {
            const age = year - BIRTH_YEAR;
            return (
              <tr
                key={year}
                className="border-b last:border-b-0 border-amber-100/70 dark:border-amber-900/30"
              >
                <th
                  scope="row"
                  className="w-[16%] px-3 py-3 text-center align-middle border-r border-amber-100/70 dark:border-amber-900/30 bg-gradient-to-br from-amber-50/80 to-orange-50/60 dark:from-amber-950/30 dark:to-orange-950/20 text-gray-800 dark:text-gray-100"
                >
                  <div className="font-semibold">{year}</div>
                  <div className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-0.5">
                    {t.ageLabel(age)}
                  </div>
                </th>
                {Array.from({ length: 12 }, (_, idx) => {
                  const month = idx + 1;
                  const n = count(year, month);
                  const hasEntry = n > 0;
                  const monthLabel = t.monthsShort[idx];

                  return (
                    <td
                      key={`${year}-${month}`}
                      className={[
                        'w-[7%] px-2 py-3 text-center align-middle border-r last:border-r-0 border-amber-100/70 dark:border-amber-900/30',
                        hasEntry
                          ? 'bg-amber-100/70 dark:bg-amber-900/30'
                          : 'bg-white dark:bg-gray-900',
                      ].join(' ')}
                    >
                      {hasEntry ? (
                        <Link
                          href={`/calendar/month/${year}/${month}/1`}
                          className="block rounded-md px-1.5 py-1 font-medium text-amber-800 dark:text-amber-200 hover:bg-amber-200/70 dark:hover:bg-amber-800/40 transition-colors"
                        >
                          <div>{monthLabel}</div>
                          <div className="text-[11px] text-amber-900/70 dark:text-amber-100/70 mt-0.5">
                            {t.entryCount(n)}
                          </div>
                        </Link>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600 text-xs">
                          {monthLabel}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
