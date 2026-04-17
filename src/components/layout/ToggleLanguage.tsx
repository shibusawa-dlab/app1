'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { FiGlobe } from 'react-icons/fi';
import { routing } from '@/i18n/routing';

export const ToggleLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Header');
  const locale = useLocale();

  const other = routing.locales.find((loc) => loc !== locale);
  if (!other) return null;

  const switchTo = () => {
    const newPath = pathname.replace(/^\/[^\/]+/, '');
    router.push(`/${other}${newPath}`);
  };

  return (
    <button
      type="button"
      onClick={switchTo}
      aria-label={t(other)}
      className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
    >
      <FiGlobe className="w-4 h-4" aria-hidden="true" />
      <span>{t(other)}</span>
    </button>
  );
};
