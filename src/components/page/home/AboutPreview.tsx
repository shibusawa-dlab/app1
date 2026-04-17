import { getTranslations } from 'next-intl/server';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

export default async function AboutPreview() {
  const tCommon = await getTranslations('Common');
  const tNav = await getTranslations('Nav');
  const tHome = await getTranslations('HomePage');

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="relative rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-rose-950/30 border border-amber-100 dark:border-amber-900/40 p-8 md:p-14 overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-300/40 to-rose-300/40 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-orange-300/30 to-amber-200/30 blur-3xl"
            aria-hidden
          />

          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-700 dark:text-amber-300 mb-3">
              {tNav('about')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-5">
              {tCommon('title')}
            </h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {tCommon('descriptionFull')}
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200"
              >
                {tHome('heroSecondary')}
                <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
