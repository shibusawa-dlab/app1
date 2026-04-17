import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { SITE_CONFIG } from '@/constants/site';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const tCommon = await getTranslations('Common');

  const columns = [
    {
      heading: t('quickLinks.title'),
      links: [
        { label: t('quickLinks.about'), href: '/about', external: false },
        { label: t('quickLinks.news'), href: '/news', external: false },
        { label: t('quickLinks.dataset'), href: '/static/dataset', external: false },
      ],
    },
    {
      heading: t('resources.title'),
      links: [
        { label: t('resources.fulltext'), href: '/fulltext', external: false },
        { label: t('resources.fulltextSearch'), href: '/search', external: false },
        { label: t('resources.calendar'), href: '/calendar', external: false },
        { label: t('resources.ad'), href: '/ad', external: false },
      ],
    },
    {
      heading: t('tools.title'),
      links: [
        { label: t('tools.personPlace'), href: '/entity', external: false },
        { label: t('tools.network'), href: '/network', external: false },
        { label: t('tools.map'), href: '/map', external: false },
        { label: t('tools.ngram'), href: '/ngram', external: false },
      ],
    },
    {
      heading: t('links.title'),
      links: [
        { label: t('links.foundation'), href: SITE_CONFIG.foundation, external: true },
        { label: t('links.github'), href: SITE_CONFIG.github, external: true },
      ],
    },
  ];

  return (
    <footer className="relative mt-auto bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span
                aria-hidden
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-sm"
              >
                渋
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {tCommon('title')}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {tCommon('description')}
            </p>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
              {t('license')}
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400 mb-4">
                  {col.heading}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) =>
                    link.external ? (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-500">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
