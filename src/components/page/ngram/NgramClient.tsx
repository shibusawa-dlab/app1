'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  Filler,
  BarController,
  BarElement,
} from 'chart.js';
import { Chart as ReactChart } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { NGRAM_TRANSLATIONS } from './translations';
import type { Locale } from '@/constants/site';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  Filler,
  BarController,
  BarElement
);

// ---------------------------------------------------------------------------
// Types (shared with the server component)
// ---------------------------------------------------------------------------

export type NgramSeriesPoint = { term: string; year: number; freq: number };
export type NgramTermRow = { term: string; total: number };
export type NgramSuggestion = { term: string; total: number };

type Props = {
  locale: Locale;
  initialQuery: string;
  initialMode: 'freq' | 'ratio';
  initialSuggest: string;
  /** Per-term yearly rows already fetched for {@link selectedTerms}. */
  series: NgramSeriesPoint[];
  /** Yearly corpus totals used for ratio normalisation. */
  yearlyTotals: Record<string, number>;
  /** Every term matching the query (up to the row cap) for the results table. */
  tableRows: NgramTermRow[];
  /** Terms that are plotted on the chart (subset of `tableRows`). */
  selectedTerms: string[];
  /** Total TF per term for the table. */
  termTotals: Record<string, number>;
  /** Optional typeahead results (empty when no `suggest` in URL). */
  suggestions: NgramSuggestion[];
};

const COLORS = [
  '#dc2626',
  '#ea580c',
  '#d97706',
  '#65a30d',
  '#0891b2',
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#0f766e',
  '#b91c1c',
];

const DEBOUNCE_MS = 400;
const SUGGEST_DEBOUNCE_MS = 250;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NgramClient({
  locale,
  initialQuery,
  initialMode,
  initialSuggest,
  series,
  yearlyTotals,
  tableRows,
  selectedTerms,
  termTotals,
  suggestions,
}: Props) {
  const t = NGRAM_TRANSLATIONS[locale] ?? NGRAM_TRANSLATIONS.ja;

  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);
  const [mode, setMode] = useState<'freq' | 'ratio'>(initialMode);
  const [suggestInput, setSuggestInput] = useState(initialSuggest);
  const [showSuggestions, setShowSuggestions] = useState(
    initialSuggest.length > 0 && suggestions.length > 0
  );

  // Sync props → local state when the URL changes via back/forward.
  useEffect(() => setQuery(initialQuery), [initialQuery]);
  useEffect(() => setMode(initialMode), [initialMode]);
  useEffect(() => setSuggestInput(initialSuggest), [initialSuggest]);

  // --- URL helpers ------------------------------------------------------
  const buildParams = useCallback(
    (next: { q?: string; mode?: 'freq' | 'ratio'; suggest?: string | null }) => {
      const p = new URLSearchParams();
      const q = (next.q ?? query).trim();
      if (q) p.set('q', q);
      const m = next.mode ?? mode;
      if (m === 'ratio') p.set('mode', 'ratio');
      const s = next.suggest !== undefined ? next.suggest : suggestInput;
      if (s) p.set('suggest', s);
      return p;
    },
    [query, mode, suggestInput]
  );

  const navigate = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString();
      startTransition(() => {
        router.push(qs ? `${pathname}?${qs}` : pathname);
      });
    },
    [router, pathname]
  );

  // --- Suggest typeahead (debounced) ------------------------------------
  const suggestTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (suggestTimer.current) clearTimeout(suggestTimer.current);
    if (suggestInput === initialSuggest) return;
    suggestTimer.current = setTimeout(() => {
      navigate(buildParams({ suggest: suggestInput || null }));
    }, SUGGEST_DEBOUNCE_MS);
    return () => {
      if (suggestTimer.current) clearTimeout(suggestTimer.current);
    };
  }, [suggestInput, initialSuggest, buildParams, navigate]);

  // --- Explicit search submit -------------------------------------------
  const submitSearch = useCallback(
    (nextQuery?: string) => {
      const q = (nextQuery ?? query).trim();
      navigate(buildParams({ q, suggest: null }));
      setShowSuggestions(false);
    },
    [query, buildParams, navigate]
  );

  // Debounce free-typing for a smoother feel.
  useEffect(() => {
    if (query === initialQuery) return;
    const h = setTimeout(() => {
      navigate(buildParams({ q: query }));
    }, DEBOUNCE_MS);
    return () => clearTimeout(h);
  }, [query, initialQuery, buildParams, navigate]);

  const changeMode = useCallback(
    (next: 'freq' | 'ratio') => {
      setMode(next);
      navigate(buildParams({ mode: next }));
    },
    [buildParams, navigate]
  );

  const pickSuggestion = useCallback(
    (term: string) => {
      setQuery(term);
      setSuggestInput('');
      setShowSuggestions(false);
      navigate(buildParams({ q: term, suggest: null }));
    },
    [buildParams, navigate]
  );

  // --- Chart data -------------------------------------------------------
  const { chartData, chartOptions } = useMemo(() => {
    if (selectedTerms.length === 0) {
      return {
        chartData: { labels: [], datasets: [] } as ChartData<'line' | 'bar'>,
        chartOptions: {} as ChartOptions<'line' | 'bar'>,
      };
    }

    // Bucket per-term series points and establish the year axis range.
    const perTerm: Record<string, Map<number, number>> = {};
    let minYear = Number.POSITIVE_INFINITY;
    let maxYear = Number.NEGATIVE_INFINITY;
    for (const term of selectedTerms) perTerm[term] = new Map();
    for (const p of series) {
      if (p.year === 9999) continue; // legacy sentinel
      if (!perTerm[p.term]) continue;
      perTerm[p.term].set(p.year, p.freq);
      if (p.year < minYear) minYear = p.year;
      if (p.year > maxYear) maxYear = p.year;
    }
    // Include totals range so the bar chart extends across the full corpus.
    for (const y of Object.keys(yearlyTotals)) {
      const n = Number(y);
      if (Number.isFinite(n)) {
        if (n < minYear) minYear = n;
        if (n > maxYear) maxYear = n;
      }
    }
    if (!Number.isFinite(minYear) || !Number.isFinite(maxYear)) {
      minYear = 1900;
      maxYear = 1930;
    }

    const labels: string[] = [];
    for (let y = minYear; y <= maxYear; y++) labels.push(String(y));

    const datasets = selectedTerms.map((term, i) => {
      const map = perTerm[term];
      const color = COLORS[i % COLORS.length];
      const values = labels.map((yStr) => {
        const y = Number(yStr);
        const raw = map.get(y) ?? 0;
        if (mode === 'ratio') {
          const total = yearlyTotals[yStr] ?? 0;
          return total ? raw / total : 0;
        }
        return raw;
      });
      return {
        type: 'line' as const,
        label: term,
        data: values,
        borderColor: color,
        backgroundColor: color,
        fill: false,
        tension: 0.1,
        yAxisID: 'y',
        pointRadius: 2,
      };
    });

    const totalSeries = labels.map((y) => yearlyTotals[y] ?? 0);
    datasets.push({
      type: 'bar' as const,
      label: t.totalLabel,
      data: totalSeries,
      backgroundColor: 'rgba(251, 146, 60, 0.25)',
      borderColor: 'rgba(251, 146, 60, 0.4)',
      yAxisID: 'y1',
      order: 99,
    } as unknown as (typeof datasets)[number]);

    const options: ChartOptions<'line' | 'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { title: { display: true, text: 'Year' } },
        y: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          title: {
            display: true,
            text: mode === 'freq' ? t.yAxisFreq : t.yAxisRatio,
          },
        },
        y1: {
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          grid: { drawOnChartArea: false },
          title: { display: true, text: t.yAxisTotal },
        },
      },
      plugins: {
        legend: { position: 'top' },
        tooltip: { enabled: true },
      },
    };

    return {
      chartData: { labels, datasets } as unknown as ChartData<'line' | 'bar'>,
      chartOptions: options,
    };
  }, [selectedTerms, series, yearlyTotals, mode, t.totalLabel, t.yAxisFreq, t.yAxisRatio, t.yAxisTotal]);

  const hasActiveQuery = initialQuery.length > 0;
  const hasSelection = selectedTerms.length > 0;
  const showSuggestionsDropdown =
    showSuggestions && suggestInput.length > 0 && suggestions.length > 0;

  return (
    <div className="space-y-6">
      {/* Hero search */}
      <div className="mx-auto max-w-3xl space-y-3">
        <div className="relative">
          <FiSearch
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
                e.preventDefault();
                submitSearch();
              }
            }}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 pl-12 pr-24 text-base shadow-lg shadow-amber-900/5 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200/60 dark:focus:ring-amber-700/30 transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                navigate(buildParams({ q: '' }));
              }}
              className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors"
              aria-label="Clear"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => submitSearch()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-sm font-medium transition-colors"
          >
            {t.searchButton}
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          {t.examples}: <code className="font-mono">{t.examplesText}</code>
        </div>

        {/* Typeahead suggest input */}
        <div className="relative">
          <input
            type="text"
            value={suggestInput}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // Defer so clicks on suggestions register before blur hides them.
              setTimeout(() => setShowSuggestions(false), 150);
            }}
            onChange={(e) => {
              setSuggestInput(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder={t.suggestPlaceholder}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          />
          {showSuggestionsDropdown && (
            <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-800/60">
                {t.suggestionsHeader}
              </div>
              <ul className="max-h-64 overflow-y-auto text-sm">
                {suggestions.map((s) => (
                  <li key={s.term}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pickSuggestion(s.term)}
                      className="w-full text-left px-3 py-1.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 flex items-center justify-between gap-3"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {s.term}
                      </span>
                      <span className="text-xs tabular-nums text-gray-500 dark:text-gray-400">
                        {s.total.toLocaleString()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Help */}
      <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>{t.help1}</li>
          <li>{t.help2}</li>
        </ul>
        <p className="text-xs text-gray-500 dark:text-gray-400">{t.helpNote}</p>
      </div>

      {/* Hit count */}
      {hasActiveQuery && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {tableRows.length.toLocaleString()}
          {t.hitsSuffix}
        </p>
      )}

      {/* Mode radios */}
      {hasSelection && (
        <div className="flex items-center gap-4 text-sm">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ngram-mode"
              checked={mode === 'freq'}
              onChange={() => changeMode('freq')}
              className="accent-amber-600"
            />
            <span>{t.freq}</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ngram-mode"
              checked={mode === 'ratio'}
              onChange={() => changeMode('ratio')}
              className="accent-amber-600"
            />
            <span>{t.ratio}</span>
          </label>
        </div>
      )}

      {/* Chart or empty state */}
      {hasSelection ? (
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div style={{ height: 420 }}>
            <ReactChart
              type="line"
              data={chartData as ChartData<'line'>}
              options={chartOptions as ChartOptions<'line'>}
            />
          </div>
        </div>
      ) : hasActiveQuery ? (
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {t.noMatches}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {t.noResults}
        </div>
      )}

      {/* Results table */}
      {tableRows.length > 0 && (
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-left text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-2 font-medium w-10">{t.select}</th>
                  <th className="px-4 py-2 font-medium">{t.term}</th>
                  <th className="px-4 py-2 font-medium text-right">
                    {t.termFreq}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => {
                  const isPlotted = selectedTerms.includes(row.term);
                  return (
                    <tr
                      key={row.term}
                      className="border-t border-gray-200/70 dark:border-gray-800 hover:bg-amber-50/40 dark:hover:bg-amber-900/10 transition-colors"
                    >
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex h-4 w-4 items-center justify-center rounded border ${
                            isPlotted
                              ? 'border-amber-500 bg-amber-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          aria-label={isPlotted ? 'plotted' : 'not plotted'}
                        />
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                        <button
                          type="button"
                          onClick={() => submitSearch(row.term)}
                          className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                        >
                          {row.term}
                        </button>
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        {(termTotals[row.term] ?? row.total).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
