'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { PRIMARY_NAV } from '@/constants/site';

// Subset of primary nav to keep the bar readable. Others live in the drawer / footer.
const DESKTOP_NAV_KEYS = [
  'about',
  'fulltextSearch',
  'ad',
  'calendar',
  'personPlace',
  'map',
  'news',
] as const;

export default function DesktopNav() {
  const tNav = useTranslations('Nav');
  const pathname = usePathname();
  const items = PRIMARY_NAV.filter((item) =>
    (DESKTOP_NAV_KEYS as readonly string[]).includes(item.key)
  );

  return (
    <nav className="flex items-center gap-1 overflow-x-auto">
      {items.map((item) => {
        const active = pathname.includes(item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              active
                ? 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tNav(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}
