import { Link } from '@/i18n/routing';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import type { NewsEntry } from '@/lib/content';
import type { Locale } from '@/constants/site';
import { getNewsTr } from './translations';

type Props = {
  entries: NewsEntry[];
  locale: Locale;
};

export default function NewsList({ entries, locale }: Props) {
  const tr = getNewsTr(locale);

  if (!entries.length) {
    return (
      <p className="text-gray-600 dark:text-gray-300 py-8 text-center">
        {tr.empty}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {entries.map((item) => (
        <Link
          key={item.slug}
          href={`/news/${item.slug}`}
          className="group block rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <FiCalendar className="text-amber-600 dark:text-amber-400" aria-hidden />
              <time
                dateTime={item.dateStr}
                className="text-xs font-mono tracking-tight text-gray-600 dark:text-gray-300"
              >
                {item.dateStr}
              </time>
            </div>
            <h3 className="flex-1 text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              {item.title}
            </h3>
            <FiArrowRight
              className="hidden sm:block text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
