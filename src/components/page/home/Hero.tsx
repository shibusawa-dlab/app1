import { FaArrowRight } from 'react-icons/fa';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default async function Hero() {
  const t = await getTranslations('HomePage');
  const tCommon = await getTranslations('Common');

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${basePath}/img/ogp/home.webp)` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-black/70 via-black/60 to-amber-900/60"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(251,191,36,0.15),_transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-24 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-3 py-1 text-xs font-medium text-white/90 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden />
            {tCommon('tagline')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            {tCommon('title')}
          </h1>
          <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
            {tCommon('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/search"
              className="group inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {t('heroCta')}
              <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              {t('heroSecondary')}
              <FaArrowRight className="opacity-70" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
