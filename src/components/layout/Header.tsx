import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ToggleLanguage } from '@/components/layout/ToggleLanguage';
import { ToggleTheme } from '@/components/layout/ToggleTheme';
import MobileDrawer from '@/components/layout/MobileDrawer';
import DesktopNav from '@/components/layout/DesktopNav';

const Header = () => {
  const tCommon = useTranslations('Common');

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/80 dark:border-gray-800/80">
      <div className="container mx-auto flex items-center h-16 px-4 sm:px-6">
        <div className="flex items-center gap-2 min-w-0">
          <MobileDrawer />
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label={tCommon('title')}
          >
            <span
              aria-hidden
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-shadow"
            >
              渋
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight truncate">
              {tCommon('title')}
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex ml-8 flex-1 min-w-0">
          <DesktopNav />
        </div>

        <div className="ml-auto lg:ml-4 flex items-center gap-1 sm:gap-2">
          <ToggleTheme />
          <ToggleLanguage />
        </div>
      </div>
    </header>
  );
};

export default Header;
