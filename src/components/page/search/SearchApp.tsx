'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from 'react';
import { FiSearch, FiX, FiFilter, FiChevronRight } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  FACET_ATTRIBUTES,
  FACET_LABEL_KEY,
  type FacetAttribute,
  type SearchMessages,
} from './translations';

const PAGE_SIZE = 24;
const DEBOUNCE_MS = 400;

export type SearchItem = {
  id: string;
  label: string;
  date_lvl0: string;
  date_lvl1: string;
  date_lvl2: string;
  category_lvl0: string;
  category_lvl1: string;
  agential: string[];
  spatial: string[];
  type: string;
  excerpt: string;
};

export type FacetCounts = Record<string, number>;

type SelectedFacets = Record<FacetAttribute, string[]>;

function emptySelected(): SelectedFacets {
  return {
    'category.lvl0': [],
    'category.lvl1': [],
    'date.lvl0': [],
    'date.lvl1': [],
    'date.lvl2': [],
    agential: [],
    spatial: [],
    type: [],
  };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, tokens: string[]): ReactNode {
  if (!text) return null;
  const filtered = tokens.filter((t) => t.length > 0);
  if (filtered.length === 0) return text;
  const re = new RegExp(`(${filtered.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(re);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <mark
          key={i}
          className="rounded bg-amber-200/80 px-0.5 text-amber-900 dark:bg-amber-500/40 dark:text-amber-50"
        >
          {part}
        </mark>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type ResultCardProps = {
  item: SearchItem;
  tokens: string[];
  labels: SearchMessages['fieldLabels'];
};

function ResultCard({ item, tokens, labels }: ResultCardProps) {
  const displayDate = item.date_lvl2 || item.date_lvl1 || item.date_lvl0;
  const displayCategory = item.category_lvl1 || item.category_lvl0;

  return (
    <article className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700">
      <Link href={`/item/${item.id}`} className="block">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
          {highlight(item.label || item.id, tokens)}
        </h3>
      </Link>

      <dl className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
        <div>
          <dt className="inline font-semibold">{labels.id}: </dt>
          <dd className="inline font-mono">{item.id}</dd>
        </div>
        {displayDate && (
          <div>
            <dt className="inline font-semibold">{labels.date}: </dt>
            <dd className="inline">{displayDate}</dd>
          </div>
        )}
        {item.type && (
          <div>
            <dt className="inline font-semibold">{labels.category}: </dt>
            <dd className="inline">{item.type}</dd>
          </div>
        )}
      </dl>

      {displayCategory && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {displayCategory}
        </p>
      )}

      {(item.agential.length > 0 || item.spatial.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.agential.slice(0, 6).map((a) => (
            <span
              key={`a-${a}`}
              className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 dark:border-amber-800/70 dark:bg-amber-900/30 dark:text-amber-200"
            >
              {labels.agential}: {a}
            </span>
          ))}
          {item.spatial.slice(0, 6).map((s) => (
            <span
              key={`s-${s}`}
              className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-800 dark:border-rose-800/70 dark:bg-rose-900/30 dark:text-rose-200"
            >
              {labels.spatial}: {s}
            </span>
          ))}
        </div>
      )}

      {item.excerpt && (
        <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {highlight(item.excerpt, tokens)}
        </p>
      )}
    </article>
  );
}

type FacetBlockProps = {
  attr: FacetAttribute;
  title: string;
  counts: [string, number][];
  selected: Set<string>;
  onToggle: (value: string) => void;
  showMoreLabel: string;
  showLessLabel: string;
};

function FacetBlock({
  attr,
  title,
  counts,
  selected,
  onToggle,
  showMoreLabel,
  showLessLabel,
}: FacetBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? counts.slice(0, 50) : counts.slice(0, 10);

  if (counts.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-4">
      <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      <ul className="space-y-1 text-sm">
        {visible.map(([value, count]) => {
          const active = selected.has(value);
          return (
            <li key={`${attr}:${value}`}>
              <button
                type="button"
                onClick={() => onToggle(value)}
                className={`group flex w-full items-center gap-2 rounded-md border px-2 py-1 text-left transition-colors ${
                  active
                    ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                    : 'border-transparent hover:bg-amber-50 dark:hover:bg-amber-900/20 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span
                  className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    active
                      ? 'border-amber-500 bg-amber-500 text-white'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  aria-hidden
                >
                  {active && <FiX className="h-3 w-3" />}
                </span>
                <span className="flex-1 truncate" title={value}>
                  {value || '—'}
                </span>
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-xs ${
                    active
                      ? 'bg-amber-200/70 text-amber-900 dark:bg-amber-800/60 dark:text-amber-100'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {counts.length > 10 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800"
        >
          {expanded ? showLessLabel : showMoreLabel}
        </button>
      )}
    </div>
  );
}

type SearchAppProps = {
  messages: SearchMessages;
  initialQuery: string;
  initialSelected: SelectedFacets;
  initialPage: number;
  items: SearchItem[];
  facetCounts: Record<FacetAttribute, [string, number][]>;
  total: number;
};

export default function SearchApp({
  messages,
  initialQuery,
  initialSelected,
  initialPage,
  items,
  facetCounts,
  total,
}: SearchAppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [rawQuery, setRawQuery] = useState(initialQuery);
  const [selected, setSelected] = useState<SelectedFacets>(initialSelected);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const tokens = useMemo(
    () =>
      initialQuery
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length > 0),
    [initialQuery],
  );

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(initialPage, 1), totalPages);

  // Keep client state in sync with server-provided props (URL changes).
  useEffect(() => {
    setRawQuery(initialQuery);
  }, [initialQuery]);
  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const buildSearchParams = useCallback(
    (next: { query?: string; facets?: SelectedFacets; page?: number }) => {
      const params = new URLSearchParams();
      const q = (next.query ?? rawQuery).trim();
      if (q) params.set('q', q);
      const facets = next.facets ?? selected;
      for (const attr of FACET_ATTRIBUTES) {
        for (const v of facets[attr]) params.append(attr, v);
      }
      const p = next.page ?? 1;
      if (p > 1) params.set('page', String(p));
      return params;
    },
    [rawQuery, selected],
  );

  const navigate = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString();
      startTransition(() => {
        router.push(qs ? `${pathname}?${qs}` : pathname);
      });
    },
    [router, pathname],
  );

  // Debounce keystrokes before pushing ?q=... to the URL.
  useEffect(() => {
    const current = initialQuery;
    if (rawQuery === current) return;
    const handle = setTimeout(() => {
      navigate(buildSearchParams({ query: rawQuery, page: 1 }));
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [rawQuery, initialQuery, buildSearchParams, navigate]);

  const toggleFacet = useCallback(
    (attr: FacetAttribute, value: string) => {
      const nextArr = selected[attr].includes(value)
        ? selected[attr].filter((v) => v !== value)
        : [...selected[attr], value];
      const nextFacets: SelectedFacets = { ...selected, [attr]: nextArr };
      setSelected(nextFacets);
      navigate(buildSearchParams({ facets: nextFacets, page: 1 }));
    },
    [selected, buildSearchParams, navigate],
  );

  const clearAll = useCallback(() => {
    setSelected(emptySelected());
    setRawQuery('');
    navigate(new URLSearchParams());
  }, [navigate]);

  const goToPage = useCallback(
    (page: number) => {
      navigate(buildSearchParams({ page }));
    },
    [buildSearchParams, navigate],
  );

  const activeChips = useMemo(() => {
    const chips: { attr: FacetAttribute; value: string }[] = [];
    for (const attr of FACET_ATTRIBUTES) {
      for (const value of selected[attr]) chips.push({ attr, value });
    }
    return chips;
  }, [selected]);

  const activeFacetCount = activeChips.length;
  const statsLabel = `${messages.totalPrefix}${total.toLocaleString()}${messages.totalSuffix}`;

  return (
    <div>
      {/* Hero search box */}
      <div className="mx-auto mb-8 max-w-3xl">
        <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {messages.heroIntro}
        </p>

        <div className="relative">
          <FiSearch
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500"
            aria-hidden
          />
          <input
            type="search"
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder={messages.placeholder}
            className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 pl-12 pr-12 text-base shadow-lg shadow-amber-900/5 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200/60 dark:focus:ring-amber-700/30 transition"
          />
          {rawQuery && (
            <button
              type="button"
              onClick={() => {
                setRawQuery('');
                navigate(buildSearchParams({ query: '', page: 1 }));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors"
              aria-label="Clear"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
          {messages.searchHint}
        </p>
      </div>

      {/* Active chips */}
      {activeChips.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {messages.filtersApplied}:
          </span>
          {activeChips.map(({ attr, value }) => (
            <button
              key={`chip-${attr}:${value}`}
              type="button"
              onClick={() => toggleFacet(attr, value)}
              className="inline-flex items-center gap-1 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 px-3 py-1 text-xs font-medium text-amber-900 dark:text-amber-200 hover:border-amber-400"
            >
              <span className="font-semibold">
                {messages.facets[FACET_LABEL_KEY[attr]]}:
              </span>
              <span>{value}</span>
              <FiX className="h-3 w-3" />
            </button>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 underline underline-offset-2"
          >
            {messages.clearAll}
          </button>
        </div>
      )}

      {/* Stats + mobile filter toggle */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"
                aria-hidden
              />
              {messages.loading}
            </span>
          ) : (
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text font-semibold text-transparent">
              {statsLabel}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowFiltersMobile((v) => !v)}
          className="md:hidden inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-4 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800"
        >
          <FiFilter className="h-3.5 w-3.5" />
          {messages.filterByFacets}
          {activeFacetCount > 0 && (
            <span className="ml-1 rounded-full bg-amber-600 text-white px-1.5 text-[10px]">
              {activeFacetCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-[18rem_1fr]">
        {/* Facets sidebar */}
        <aside
          className={`${showFiltersMobile ? 'block' : 'hidden'} md:block space-y-4`}
        >
          {FACET_ATTRIBUTES.map((attr) => (
            <FacetBlock
              key={attr}
              attr={attr}
              title={messages.facets[FACET_LABEL_KEY[attr]]}
              counts={facetCounts[attr] ?? []}
              selected={new Set(selected[attr])}
              onToggle={(v) => toggleFacet(attr, v)}
              showMoreLabel={messages.showMore}
              showLessLabel={messages.showLess}
            />
          ))}
        </aside>

        {/* Results */}
        <section>
          {total === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400">
              {messages.noResults}
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {items.map((it) => (
                  <ResultCard
                    key={it.id}
                    item={it}
                    tokens={tokens}
                    labels={messages.fieldLabels}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  page={pageSafe}
                  totalPages={totalPages}
                  onChange={goToPage}
                  prevLabel={messages.prev}
                  nextLabel={messages.next}
                />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
  prevLabel: string;
  nextLabel: string;
};

function Pagination({ page, totalPages, onChange, prevLabel, nextLabel }: PaginationProps) {
  const pad = 2;
  const pages = new Set<number>([1, totalPages]);
  for (let i = Math.max(1, page - pad); i <= Math.min(totalPages, page + pad); i += 1) {
    pages.add(i);
  }
  const pageList = Array.from(pages).sort((a, b) => a - b);

  const items: ReactNode[] = [];
  let prev = 0;
  for (const p of pageList) {
    if (p - prev > 1) {
      items.push(
        <span key={`gap-${p}`} className="px-2 text-gray-400">
          …
        </span>,
      );
    }
    const active = p === page;
    items.push(
      <button
        key={`p-${p}`}
        type="button"
        onClick={() => onChange(p)}
        className={`min-w-[2.25rem] rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
          active
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow'
            : 'border border-transparent text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-200'
        }`}
      >
        {p}
      </button>,
    );
    prev = p;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-1">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-200 disabled:pointer-events-none disabled:opacity-40"
      >
        <FiChevronRight className="h-4 w-4 rotate-180" />
        {prevLabel}
      </button>
      {items}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-200 disabled:pointer-events-none disabled:opacity-40"
      >
        {nextLabel}
        <FiChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
