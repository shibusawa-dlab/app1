'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

export type NgramTerm = {
  label: string;
  count: number;
  df: number;
  freq: { year: number; count: number }[];
};

export type NgramSummary = {
  terms: NgramTerm[];
  ngramAll: Record<string, number>;
};

type Props = {
  summary: NgramSummary;
  locale: Locale;
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

const SEARCH_SYMBOLS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

function matchTerms(terms: NgramTerm[], query: string): NgramTerm[] {
  if (!query.trim()) return [];
  const parts = query.split('/').map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return [];

  const seen = new Set<string>();
  const results: NgramTerm[] = [];
  for (const part of parts) {
    let matcher: (label: string) => boolean;
    if (SEARCH_SYMBOLS.test(part)) {
      try {
        const re = new RegExp(part);
        matcher = (label) => re.test(label);
      } catch {
        matcher = (label) => label === part;
      }
    } else {
      matcher = (label) => label === part;
    }
    for (const t of terms) {
      if (matcher(t.label) && !seen.has(t.label)) {
        seen.add(t.label);
        results.push(t);
      }
    }
  }
  results.sort((a, b) => b.count - a.count);
  return results;
}

export default function NgramClient({ summary, locale }: Props) {
  const t = NGRAM_TRANSLATIONS[locale] ?? NGRAM_TRANSLATIONS.ja;

  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [chartType, setChartType] = useState<'freq' | 'ratio'>('freq');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showHelp, setShowHelp] = useState(false);

  // Initial URL param support: ?keyword=xxx
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const kw = params.get('keyword');
    if (kw) {
      setQuery(kw);
      setActiveQuery(kw);
    }
  }, []);

  const hits = useMemo(
    () => matchTerms(summary.terms, activeQuery),
    [summary.terms, activeQuery]
  );

  // Default-select top 5 when hits change
  const firstHitsKey = useRef<string>('');
  useEffect(() => {
    const key = hits.map((h) => h.label).join('|');
    if (key === firstHitsKey.current) return;
    firstHitsKey.current = key;
    const next = new Set<string>();
    for (let i = 0; i < Math.min(5, hits.length); i++) next.add(hits[i].label);
    setSelected(next);
  }, [hits]);

  const selectedHits = useMemo(
    () => hits.filter((h) => selected.has(h.label)),
    [hits, selected]
  );

  const { chartData, chartOptions } = useMemo(() => {
    if (selectedHits.length === 0) {
      return {
        chartData: { labels: [], datasets: [] } as ChartData<'line' | 'bar'>,
        chartOptions: {} as ChartOptions<'line' | 'bar'>,
      };
    }
    let minYear = 9999;
    let maxYear = 0;
    for (const h of selectedHits) {
      for (const f of h.freq) {
        if (f.year < minYear) minYear = f.year;
        if (f.year > maxYear) maxYear = f.year;
      }
    }
    if (minYear > maxYear) {
      minYear = 1900;
      maxYear = 1930;
    }

    const labels: string[] = [];
    for (let y = minYear; y <= maxYear; y++) labels.push(String(y));

    const datasets = selectedHits.map((h, i) => {
      const map: Record<number, number> = {};
      for (const f of h.freq) map[f.year] = f.count;
      const color = COLORS[i % COLORS.length];
      const values = labels.map((y) => {
        const year = Number(y);
        const raw = map[year] ?? 0;
        if (chartType === 'ratio') {
          const total = summary.ngramAll[y] ?? 0;
          return total ? raw / total : 0;
        }
        return raw;
      });
      return {
        type: 'line' as const,
        label: h.label,
        data: values,
        borderColor: color,
        backgroundColor: color,
        fill: false,
        tension: 0.1,
        yAxisID: 'y',
        pointRadius: 2,
      };
    });

    // Total ngrams series (background bars on secondary axis)
    const totalSeries = labels.map((y) => summary.ngramAll[y] ?? 0);
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
        x: {
          title: { display: true, text: 'Year' },
        },
        y: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          title: {
            display: true,
            text: chartType === 'freq' ? t.yAxisFreq : t.yAxisRatio,
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
  }, [selectedHits, chartType, summary.ngramAll, t.totalLabel, t.yAxisFreq, t.yAxisRatio, t.yAxisTotal]);

  const onSearch = () => setActiveQuery(query);

  const toggleSelect = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-200/70 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-900/10 p-4 text-sm text-amber-900 dark:text-amber-200">
        {t.compromiseNotice}
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.nativeEvent.isComposing === false) onSearch();
            }}
            placeholder={t.searchPlaceholder}
            className="flex-1 rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          />
          <button
            type="button"
            onClick={onSearch}
            className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 text-sm font-medium transition-colors"
          >
            {locale === 'ja' ? '検索' : 'Search'}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowHelp((s) => !s)}
          className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm hover:border-amber-300 dark:hover:border-amber-500/60 transition-colors"
        >
          {t.helpTitle}
        </button>
      </div>

      {showHelp && (
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <p>{t.lead}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t.help1}</li>
            <li>{t.help2}</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.helpNote}</p>
        </div>
      )}

      {activeQuery && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {hits.length.toLocaleString()}
          {t.hitsSuffix}
        </p>
      )}

      {selectedHits.length > 0 ? (
        <>
          <div className="flex items-center gap-4 text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ngram-type"
                checked={chartType === 'freq'}
                onChange={() => setChartType('freq')}
                className="accent-amber-600"
              />
              <span>{t.freq}</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ngram-type"
                checked={chartType === 'ratio'}
                onChange={() => setChartType('ratio')}
                className="accent-amber-600"
              />
              <span>{t.ratio}</span>
            </label>
          </div>

          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 p-4">
            <div style={{ height: 420 }}>
              {/* chart.js typings for multi-type charts can be finicky */}
              <ReactChart
                type="line"
                data={chartData as ChartData<'line'>}
                options={chartOptions as ChartOptions<'line'>}
              />
            </div>
          </div>
        </>
      ) : activeQuery ? (
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {t.noMatches}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {t.noResults}
        </div>
      )}

      {hits.length > 0 && (
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-left text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-2 font-medium w-10">{t.select}</th>
                  <th className="px-4 py-2 font-medium">{t.term}</th>
                  <th className="px-4 py-2 font-medium text-right">{t.termFreq}</th>
                  <th className="px-4 py-2 font-medium text-right">{t.termDf}</th>
                </tr>
              </thead>
              <tbody>
                {hits.slice(0, 50).map((h) => (
                  <tr
                    key={h.label}
                    className="border-t border-gray-200/70 dark:border-gray-800 hover:bg-amber-50/40 dark:hover:bg-amber-900/10 transition-colors"
                  >
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selected.has(h.label)}
                        onChange={() => toggleSelect(h.label)}
                        className="accent-amber-600"
                      />
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                      {h.label}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {h.count.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {h.df.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
