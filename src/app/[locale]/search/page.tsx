import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';
import SearchApp, {
  type SearchItem,
} from '@/components/page/search/SearchApp';
import {
  FACET_ATTRIBUTES,
  getSearchMessages,
  type FacetAttribute,
} from '@/components/page/search/translations';
import { searchItems, type ItemRow, type SearchFacets } from '@/lib/db';

// SSR — results are a function of ?q=...&... and must run per request.
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 24;

function rowToSearchItem(row: ItemRow): SearchItem {
  return {
    id: row.id,
    label: row.label ?? '',
    date_lvl0: row.date_lvl0 ?? '',
    date_lvl1: row.date_lvl1 ?? '',
    date_lvl2: row.date_lvl2 ?? '',
    category_lvl0: row.category_lvl0 ?? '',
    category_lvl1: row.category_lvl1 ?? '',
    agential: row.agential,
    spatial: row.spatial,
    type: row.type ?? '',
    excerpt: excerpt(row.description),
  };
}

function excerpt(text: string | null): string {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > 240 ? `${clean.slice(0, 240)}…` : clean;
}

function asArray(
  value: string | string[] | undefined
): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function parseSelected(
  searchParams: Record<string, string | string[] | undefined>
) {
  const selected: Record<FacetAttribute, string[]> = {
    'category.lvl0': [],
    'category.lvl1': [],
    'date.lvl0': [],
    'date.lvl1': [],
    'date.lvl2': [],
    agential: [],
    spatial: [],
    type: [],
  };
  for (const attr of FACET_ATTRIBUTES) {
    selected[attr] = asArray(searchParams[attr]);
  }
  return selected;
}

function toSearchFacets(selected: Record<FacetAttribute, string[]>): SearchFacets {
  return {
    category_lvl0: selected['category.lvl0'],
    category_lvl1: selected['category.lvl1'],
    date_lvl0: selected['date.lvl0'],
    date_lvl1: selected['date.lvl1'],
    date_lvl2: selected['date.lvl2'],
    agential: selected.agential,
    spatial: selected.spatial,
    type: selected.type,
  };
}

type FacetCountsMap = Record<FacetAttribute, [string, number][]>;

function tallyFacets(items: ItemRow[], selected: Record<FacetAttribute, string[]>): FacetCountsMap {
  const counts: Record<FacetAttribute, Map<string, number>> = {
    'category.lvl0': new Map(),
    'category.lvl1': new Map(),
    'date.lvl0': new Map(),
    'date.lvl1': new Map(),
    'date.lvl2': new Map(),
    agential: new Map(),
    spatial: new Map(),
    type: new Map(),
  };

  const bump = (attr: FacetAttribute, value: string | undefined | null) => {
    if (!value) return;
    counts[attr].set(value, (counts[attr].get(value) ?? 0) + 1);
  };

  for (const r of items) {
    bump('category.lvl0', r.category_lvl0);
    bump('category.lvl1', r.category_lvl1);
    bump('date.lvl0', r.date_lvl0);
    bump('date.lvl1', r.date_lvl1);
    bump('date.lvl2', r.date_lvl2);
    bump('type', r.type);
    for (const a of r.agential) bump('agential', a);
    for (const s of r.spatial) bump('spatial', s);
  }

  const out = {} as FacetCountsMap;
  for (const attr of FACET_ATTRIBUTES) {
    const m = counts[attr];
    // Ensure selected-but-absent values still render so users can deselect.
    for (const sel of selected[attr]) if (!m.has(sel)) m.set(sel, 0);
    const entries = [...m.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    );
    out[attr] = entries;
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getSearchMessages(locale as Locale);
  return getPageMetadata(locale as Locale, {
    title: messages.title,
    description: messages.description,
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);

  const messages = getSearchMessages(locale as Locale);

  const query = typeof sp.q === 'string' ? sp.q : '';
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const selected = parseSelected(sp);
  const facets = toSearchFacets(selected);

  // Page slice for display; for facet tallies we also fetch a larger window
  // unbounded by page so filter counts reflect the whole filtered set.
  const [page1, facetSource] = await Promise.all([
    searchItems(query, facets, PAGE_SIZE, (page - 1) * PAGE_SIZE),
    searchItems(query, facets, 5000, 0),
  ]);

  const items = page1.items.map(rowToSearchItem);
  const facetCounts = tallyFacets(facetSource.items, selected);

  return (
    <PageLayout
      breadcrumbItems={[{ title: messages.title }]}
      title={messages.title}
      description={messages.description}
    >
      <SearchApp
        messages={messages}
        initialQuery={query}
        initialSelected={selected}
        initialPage={page}
        items={items}
        facetCounts={facetCounts}
        total={page1.total}
      />
    </PageLayout>
  );
}
