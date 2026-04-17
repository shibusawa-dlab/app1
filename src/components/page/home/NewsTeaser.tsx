import { getTranslations } from 'next-intl/server';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

// TODO: Replace with real news source once content pipeline is migrated.
const STATIC_NEWS = [
  { date: '2022-06-21', ja: '新機能を追加しました。', en: 'Added new features.' },
  { date: '2022-06-02', ja: 'コンテンツを更新しました。', en: 'Updated the site content.' },
  { date: '2021-04-23', ja: 'サイトを公開しました。', en: 'The site is now open.' },
];

type Props = { locale: 'ja' | 'en' };

export default async function NewsTeaser({ locale }: Props) {
  const t = await getTranslations('HomePage');

  return (
    <section className="bg-gray-50 dark:bg-gray-900/40 border-y border-gray-200/70 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-2">
              {t('news')}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t('news')}
            </h2>
          </div>
          <Link
            href="/news"
            className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200"
          >
            {t('all')}
            <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/70 dark:border-gray-800 shadow-sm">
          {STATIC_NEWS.map((item) => (
            <li key={item.date}>
              <div className="flex items-center gap-4 px-5 py-4">
                <time className="text-xs font-mono tracking-tight text-gray-500 dark:text-gray-400 shrink-0 w-24">
                  {item.date}
                </time>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {locale === 'ja' ? item.ja : item.en}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <Link
          href="/news"
          className="sm:hidden mt-6 group inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-300"
        >
          {t('all')}
          <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
