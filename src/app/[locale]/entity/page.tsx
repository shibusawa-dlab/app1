import { routing, Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import { getEntityMessages } from '@/components/page/entity/translations';
import { FaUser, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = getEntityMessages(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: m.title,
    description: m.description,
  });
}

export default async function EntityIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const m = getEntityMessages(locale as Locale);

  const types = [
    {
      id: 'agential',
      label: m.typeAgential,
      description: m.typeAgentialDescription,
      Icon: FaUser,
    },
    {
      id: 'place',
      label: m.typeSpatial,
      description: m.typeSpatialDescription,
      Icon: FaMapMarkerAlt,
    },
  ];

  return (
    <PageLayout
      breadcrumbItems={[{ title: m.title }]}
      title={m.title}
      description={m.description}
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-6">
        {m.eyebrow}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {types.map(({ id, label, description, Icon }) => (
          <Link
            key={id}
            href={`/entity/${id}`}
            className="group relative flex flex-col rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="inline-flex w-14 h-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 group-hover:from-amber-500 group-hover:to-rose-500 group-hover:text-white transition-all">
                <Icon className="w-6 h-6" aria-hidden />
              </span>
              <FaArrowRight
                aria-hidden
                className="text-gray-300 dark:text-gray-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              {label}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
