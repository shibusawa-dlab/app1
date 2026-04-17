import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import NgramClient, {
  type NgramSeriesPoint,
  type NgramTermRow,
} from '@/components/page/ngram/NgramClient';
import { NGRAM_TRANSLATIONS } from '@/components/page/ngram/translations';
import {
  getNgramSeries,
  getNgramTermTotals,
  getNgramTotals,
  listNgramTerms,
} from '@/lib/db';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

// SSR: the chart is a function of ?q=...&mode=... and must render per request
// so that new terms added by the background seed show up immediately.
export const dynamic = 'force-dynamic';

/** Cap how many chart series we render for any one query. */
const MAX_SERIES = 10;
/** Cap how many rows we fetch per slash-separated segment. */
const PER_SEGMENT_LIMIT = 25;
/** Cap how many typeahead suggestions to surface. */
const SUGGEST_LIMIT = 10;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = NGRAM_TRANSLATIONS[locale as Locale] ?? NGRAM_TRANSLATIONS.ja;
  return getPageMetadata(locale as Locale, {
    title: t.title,
    description: t.description,
  });
}

type SP = Record<string, string | string[] | undefined>;

function firstParam(sp: SP, key: string): string {
  const raw = sp[key];
  if (!raw) return '';
  return Array.isArray(raw) ? (raw[0] ?? '') : raw;
}

export default async function NgramPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SP>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);

  const t = NGRAM_TRANSLATIONS[locale as Locale] ?? NGRAM_TRANSLATIONS.ja;

  const q = firstParam(sp, 'q').trim();
  const mode: 'freq' | 'ratio' =
    firstParam(sp, 'mode') === 'ratio' ? 'ratio' : 'freq';
  const suggest = firstParam(sp, 'suggest').trim();

  // Segments are slash-separated; each segment is expanded to matching terms
  // via a substring LIKE query. We then dedup and cap the union at MAX_SERIES.
  const segments = q
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);

  const matchedPerSegment: { term: string; total: number }[] = [];
  const seen = new Set<string>();

  for (const seg of segments) {
    const hits = await listNgramTerms(seg, PER_SEGMENT_LIMIT);
    for (const h of hits) {
      if (seen.has(h.term)) continue;
      seen.add(h.term);
      matchedPerSegment.push(h);
    }
  }

  matchedPerSegment.sort((a, b) => b.total - a.total);
  const tableRows: NgramTermRow[] = matchedPerSegment.slice(0, 200);
  const selectedTerms = matchedPerSegment.slice(0, MAX_SERIES).map((m) => m.term);

  // Fetch series + yearly totals in parallel only when there is something to
  // plot. An empty query skips the D1 roundtrip entirely.
  const [seriesRows, yearlyTotals, termTotals] = await Promise.all([
    selectedTerms.length > 0
      ? getNgramSeries(selectedTerms)
      : Promise.resolve([]),
    selectedTerms.length > 0 ? getNgramTotals() : Promise.resolve({}),
    // The listNgramTerms call already returned totals, but expanding by
    // substring may have returned more rows than we plot; re-use what we have.
    Promise.resolve(Object.fromEntries(matchedPerSegment.map((r) => [r.term, r.total]))),
  ]);

  const series: NgramSeriesPoint[] = seriesRows.map((r) => ({
    term: r.term,
    year: r.year,
    freq: r.freq,
  }));

  // Typeahead suggestions (independent of q — fired while the user types).
  const suggestions = suggest
    ? (await listNgramTerms(suggest, SUGGEST_LIMIT)).map((r) => ({
        term: r.term,
        total: r.total,
      }))
    : [];

  return (
    <PageLayout
      breadcrumbItems={[{ title: t.title }]}
      title={t.title}
      description={t.lead}
    >
      <NgramClient
        locale={locale as Locale}
        initialQuery={q}
        initialMode={mode}
        initialSuggest={suggest}
        series={series}
        yearlyTotals={yearlyTotals}
        tableRows={tableRows}
        selectedTerms={selectedTerms}
        termTotals={termTotals}
        suggestions={suggestions}
      />
    </PageLayout>
  );
}
