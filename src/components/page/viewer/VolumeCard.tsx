import { Link } from '@/i18n/routing';
import { FiBookOpen, FiArrowRight } from 'react-icons/fi';

export type VolumeCardProps = {
  id: string;
  label: string;
  description: string;
  cta: string;
};

export default function VolumeCard({ id, label, description, cta }: VolumeCardProps) {
  return (
    <Link
      href={`/viewer/${id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-700"
    >
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 dark:from-amber-900/40 dark:via-orange-900/30 dark:to-rose-900/30">
        <FiBookOpen className="h-16 w-16 text-amber-700 dark:text-amber-300" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          {id}
        </span>
        <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
          {label}
        </h3>
        <p className="mt-2 flex-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 dark:text-amber-400">
          {cta}
          <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
