'use client';

import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { PRIMARY_NAV } from '@/constants/site';
import { NAV_ICONS } from '@/constants/navIcons';

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const tNav = useTranslations('Nav');
  const tHeader = useTranslations('Header');
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={tHeader('menu')}
        className="inline-flex lg:hidden w-9 h-9 items-center justify-center rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <FiMenu className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5 border-b border-gray-200 dark:border-gray-800">
          <span className="text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
            {tHeader('menu')}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={tHeader('close')}
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <nav className="py-3 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
          <ul>
            {PRIMARY_NAV.map((item) => {
              const Icon = NAV_ICONS[item.key];
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/30 text-amber-700 dark:text-amber-300">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium">{tNav(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
