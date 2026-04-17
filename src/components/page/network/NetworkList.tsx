'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { NETWORK_TRANSLATIONS } from './translations';
import type { Locale } from '@/constants/site';

export type NetworkIndexItem = {
  id: string;
  label: string;
  count: number;
};

type Props = {
  items: NetworkIndexItem[];
  locale: Locale;
};

export default function NetworkList({ items, locale }: Props) {
  const t = NETWORK_TRANSLATIONS[locale] ?? NETWORK_TRANSLATIONS.ja;
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim();
    if (!query) return items;
    return items.filter((i) =>
      i.label.includes(query) || i.id.includes(query)
    );
  }, [items, q]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-200/70 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-900/10 p-4 text-sm text-amber-900 dark:text-amber-200">
        {t.limitNotice}
      </div>

      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={locale === 'ja' ? '人物名で絞り込む' : 'Filter by name'}
        className="w-full rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60"
      />

      <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/70 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {t.listTitle}
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              ({filtered.length.toLocaleString()})
            </span>
          </h2>
        </div>
        <ul className="divide-y divide-gray-200/70 dark:divide-gray-800 max-h-[600px] overflow-y-auto">
          {filtered.map((item) => (
            <li key={item.id}>
              <Link
                href={`/network/${encodeURIComponent(item.id)}`}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-amber-50/40 dark:hover:bg-amber-900/10 transition-colors"
              >
                <span className="text-gray-900 dark:text-gray-100 font-medium truncate">
                  {item.label}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300 shrink-0">
                  <span className="text-gray-500 dark:text-gray-400">{t.count}:</span>
                  <span className="tabular-nums font-semibold">
                    {item.count.toLocaleString()}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
