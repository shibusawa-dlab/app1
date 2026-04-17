import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
export default function Static({
  title,
  description,
  breadcrumbItems,
  children,
  fluid = false,
}: {
  title: string;
  description?: string;
  breadcrumbItems: { title: string; href?: string }[];
  children: React.ReactNode;
  fluid?: boolean;
}) {
  const t = useTranslations('Common');
  //  key={`breadcrumb-${title}`}
  return (
    <div>
      <article>
        <div className="container mx-auto px-4 sm:px-6 pt-6 md:pt-8">
          <nav
            className="text-sm text-gray-500 dark:text-gray-400"
            key={`breadcrumb-${title}`}
            aria-label="Breadcrumb"
          >
            <Link href={`/`} className="hover:text-gray-700 dark:hover:text-gray-200">
              {t('home')}
            </Link>
            {breadcrumbItems.map((item, i) => (
              <span key={i}>
                <span className="mx-2 text-gray-400 dark:text-gray-500">›</span>
                {item.href ? (
                  <Link href={item.href} className="hover:text-gray-700 dark:hover:text-gray-200">
                    {item.title}
                  </Link>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300">{item.title}</span>
                )}
              </span>
            ))}
          </nav>

          <header className="mt-4 md:mt-6 mb-6 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            {description && (
              <p
                className="mt-3 text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </header>
        </div>
        <div
          className={`
            px-4 sm:px-6 pb-12 md:pb-16
            ${fluid ? 'max-w-full' : 'container mx-auto'}
          `}
        >
          {children}
        </div>
      </article>
    </div>
  );
}
