import { Link } from '@/i18n/routing';
import { FaBookOpen, FaArrowRight } from 'react-icons/fa';
import { toHttpsOrProxy } from '@/lib/url';
import type { AdItem } from './data';

type Props = {
  groups: {
    parentId: string;
    parent: AdItem | undefined;
    children: AdItem[];
  }[];
  noImageLabel: string;
};

export default function AdGroupGrid({ groups, noImageLabel }: Props) {
  return (
    <div className="space-y-14">
      {groups.map((group) => {
        const parentLabel =
          group.parent?.label ?? group.parentId.split('/items/')[1];
        return (
          <section key={group.parentId} aria-label={parentLabel}>
            <div className="mb-6 flex items-baseline gap-3 border-l-4 border-amber-400 dark:border-amber-500 pl-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                {parentLabel}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {group.children.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {group.children.map((child) => (
                <Link
                  key={child.id}
                  href={`/ad/${child.slug}`}
                  className="group flex flex-col rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-900/20 dark:via-orange-900/10 dark:to-rose-900/10 flex items-center justify-center overflow-hidden">
                    {child.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={toHttpsOrProxy(child.image)}
                        alt={child.label}
                        className="absolute inset-0 w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-amber-500 dark:text-amber-400">
                        <FaBookOpen className="w-10 h-10" aria-hidden="true" />
                        <span className="sr-only">{noImageLabel}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                      {child.label}
                    </h3>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      <span className="font-mono">{child.slug}</span>
                      <FaArrowRight
                        className="ml-auto w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
