import { Link } from '@/i18n/routing';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { PROSE_STYLES } from '@/constants/styles';
import type { NewsEntry } from '@/lib/content';
import type { Locale } from '@/constants/site';
import { getNewsTr } from './translations';

type Props = {
  entry: NewsEntry;
  locale: Locale;
};

export default function NewsDetail({ entry, locale }: Props) {
  const tr = getNewsTr(locale);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <FiCalendar className="text-amber-600 dark:text-amber-400" aria-hidden />
        <time
          dateTime={entry.dateStr}
          className="text-sm font-mono tracking-tight text-gray-600 dark:text-gray-300"
        >
          {entry.dateStr}
        </time>
      </div>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div
          className={PROSE_STYLES}
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
      </article>

      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200"
        >
          <FiArrowLeft
            className="transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          {tr.backToList}
        </Link>
      </div>
    </div>
  );
}
