import { getTranslations } from 'next-intl/server';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from '@/i18n/routing';
import { PRIMARY_NAV } from '@/constants/site';
import { NAV_ICONS } from '@/constants/navIcons';

const FEATURED_KEYS = [
  'fulltextSearch',
  'ad',
  'calendar',
  'personPlace',
  'network',
  'map',
  'ngram',
  'dataset',
] as const;

export default async function MenuGrid() {
  const tNav = await getTranslations('Nav');
  const tHome = await getTranslations('HomePage');
  const items = PRIMARY_NAV.filter((item) =>
    (FEATURED_KEYS as readonly string[]).includes(item.key)
  );

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-3">
          {tHome('menu')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {tHome('menu')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => {
          const Icon = NAV_ICONS[item.key];
          return (
            <Link
              key={item.key}
              href={item.href}
              className="group relative flex flex-col h-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-amber-300 dark:hover:border-amber-500/60 hover:-translate-y-1 hover:shadow-xl shadow-sm transition-all duration-300"
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50/0 via-orange-50/0 to-rose-50/0 group-hover:from-amber-50/80 group-hover:via-orange-50/40 group-hover:to-rose-50/20 dark:group-hover:from-amber-900/10 dark:group-hover:via-orange-900/5 dark:group-hover:to-rose-900/5 transition-colors duration-300"
              />
              <div className="relative flex items-start justify-between mb-5">
                <span className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 group-hover:from-amber-500 group-hover:to-rose-500 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <FaArrowRight
                  aria-hidden
                  className="mt-1 text-gray-300 dark:text-gray-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all"
                />
              </div>
              <h3 className="relative text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                {tNav(item.key)}
              </h3>
              <p className="relative text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {tHome(`descriptions.${item.key}`)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
