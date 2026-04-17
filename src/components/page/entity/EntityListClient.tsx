'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { FaSearch, FaChevronLeft, FaChevronRight, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import type { EntityRecord } from './data';
import { getEntityMessages } from './translations';
import type { Locale } from '@/constants/site';

type Props = {
  items: EntityRecord[];
  dataKey: 'agential' | 'spatial';
  locale: Locale;
  perPage?: number;
};

export default function EntityListClient({
  items,
  dataKey,
  locale,
  perPage = 24,
}: Props) {
  const m = getEntityMessages(locale);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = keyword.trim();
    if (!q) return items;
    return items.filter((it) => it.id.includes(q));
  }, [items, keyword]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  const FallbackIcon = dataKey === 'agential' ? FaUser : FaMapMarkerAlt;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-600 dark:text-gray-400">{m.total(total)}</p>
      </div>

      <div className="mb-8 relative">
        <FaSearch
          aria-hidden
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="search"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          placeholder={m.searchPlaceholder}
          className="w-full rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 py-3 pl-12 pr-4 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500"
          aria-label={m.searchPlaceholder}
        />
      </div>

      {pageItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16">{m.noResults}</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {pageItems.map((it) => {
            const href = `/entity/${dataKey}/${encodeURIComponent(it.id)}`;
            return (
              <li key={it.id}>
                <Link
                  href={href}
                  className="group flex flex-col h-full rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 flex items-center justify-center overflow-hidden">
                    {it.image && /^https?:\/\//.test(it.image) ? (
                      <Image
                        src={it.image}
                        alt={it.id}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <FallbackIcon className="w-10 h-10 text-amber-500/70 dark:text-amber-400/70" aria-hidden />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                      {it.id}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {m.count(it.value)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 disabled:opacity-40 hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
          >
            <FaChevronLeft aria-hidden /> {m.previous}
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {m.page(current, pageCount)}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={current === pageCount}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 disabled:opacity-40 hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
          >
            {m.next} <FaChevronRight aria-hidden />
          </button>
        </div>
      )}

    </div>
  );
}
