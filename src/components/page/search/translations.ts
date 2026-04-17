import type { Locale } from '@/constants/site';

export type SearchMessages = {
  title: string;
  description: string;
  eyebrow: string;
  placeholder: string;
  heroIntro: string;
  loading: string;
  loadingHint: string;
  totalPrefix: string;
  totalSuffix: string;
  hits: string;
  clearAll: string;
  showMore: string;
  showLess: string;
  noResults: string;
  facets: {
    category_lvl0: string;
    category_lvl1: string;
    date_lvl0: string;
    date_lvl1: string;
    date_lvl2: string;
    agential: string;
    spatial: string;
    type: string;
  };
  fieldLabels: {
    id: string;
    date: string;
    agential: string;
    spatial: string;
    category: string;
  };
  filterByFacets: string;
  filtersApplied: string;
  prev: string;
  next: string;
  page: string;
  sortBy: string;
  searchHint: string;
  emptyQuery: string;
};

export const SEARCH_TRANSLATIONS: Record<Locale, SearchMessages> = {
  ja: {
    title: '本文検索',
    description:
      '『渋沢栄一伝記資料』別巻第1, 第2の本文を対象に検索します。検索語はハイライト表示され、左側のファセットで絞り込みできます。',
    eyebrow: 'Fulltext Search',
    placeholder: 'キーワードを入力 (スペース区切りで AND 検索)',
    heroIntro: '日記・集会日時通知表の本文をキーワードで検索できます。',
    loading: '読み込み中…',
    loadingHint:
      '初回はインデックスのダウンロードに時間がかかる場合があります。2回目以降はブラウザキャッシュにより高速化されます。',
    totalPrefix: '検索結果: ',
    totalSuffix: ' 件',
    hits: '件',
    clearAll: 'すべてクリア',
    showMore: 'もっと見る',
    showLess: '閉じる',
    noResults: '該当する結果はありません。',
    facets: {
      category_lvl0: 'カテゴリ (巻)',
      category_lvl1: 'カテゴリ (章)',
      date_lvl0: '年',
      date_lvl1: '年月',
      date_lvl2: '日付',
      agential: '人名',
      spatial: '地名',
      type: '種別',
    },
    fieldLabels: {
      id: 'ID',
      date: '日付',
      agential: '人名',
      spatial: '地名',
      category: 'カテゴリ',
    },
    filterByFacets: '絞り込み',
    filtersApplied: '適用中のフィルター',
    prev: '前へ',
    next: '次へ',
    page: 'ページ',
    sortBy: '並び替え',
    searchHint: 'キーワードを入力すると本文・人名・地名から検索します',
    emptyQuery: 'キーワードまたはファセットを選んで検索してください。',
  },
  en: {
    title: 'Fulltext Search',
    description:
      'Search the full text of the Shibusawa Eiichi Denki Shiryo supplementary volumes 1 and 2. Matches are highlighted; refine further using the facet sidebar.',
    eyebrow: 'Fulltext Search',
    placeholder: 'Enter search terms (whitespace = AND)',
    heroIntro: 'Search by keyword across diaries and meeting schedules.',
    loading: 'Loading…',
    loadingHint:
      'The first load may take a while as the index is downloaded. Subsequent visits are cached by the browser.',
    totalPrefix: '',
    totalSuffix: ' results',
    hits: 'hits',
    clearAll: 'Clear all',
    showMore: 'Show more',
    showLess: 'Show less',
    noResults: 'No results match your query.',
    facets: {
      category_lvl0: 'Category (Volume)',
      category_lvl1: 'Category (Chapter)',
      date_lvl0: 'Year',
      date_lvl1: 'Year / Month',
      date_lvl2: 'Date',
      agential: 'Person',
      spatial: 'Place',
      type: 'Type',
    },
    fieldLabels: {
      id: 'ID',
      date: 'Date',
      agential: 'Person',
      spatial: 'Place',
      category: 'Category',
    },
    filterByFacets: 'Filter',
    filtersApplied: 'Applied filters',
    prev: 'Prev',
    next: 'Next',
    page: 'Page',
    sortBy: 'Sort by',
    searchHint: 'Start typing to search labels, descriptions, people, and places.',
    emptyQuery: 'Enter a search term or pick a facet to start.',
  },
};

export function getSearchMessages(locale: Locale): SearchMessages {
  return SEARCH_TRANSLATIONS[locale] ?? SEARCH_TRANSLATIONS.en;
}

// Facet attributes shown in the sidebar (order preserved).
export const FACET_ATTRIBUTES = [
  'category.lvl0',
  'category.lvl1',
  'date.lvl0',
  'date.lvl1',
  'date.lvl2',
  'agential',
  'spatial',
  'type',
] as const;

export type FacetAttribute = (typeof FACET_ATTRIBUTES)[number];

export const FACET_LABEL_KEY: Record<FacetAttribute, keyof SearchMessages['facets']> = {
  'category.lvl0': 'category_lvl0',
  'category.lvl1': 'category_lvl1',
  'date.lvl0': 'date_lvl0',
  'date.lvl1': 'date_lvl1',
  'date.lvl2': 'date_lvl2',
  agential: 'agential',
  spatial: 'spatial',
  type: 'type',
};
