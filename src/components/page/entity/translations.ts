import type { Locale } from '@/constants/site';

type EntityMessages = {
  title: string;
  description: string;
  eyebrow: string;
  disclaimer: string;
  typeAgential: string;
  typeSpatial: string;
  typeAgentialShort: string;
  typeSpatialShort: string;
  typeAgentialDescription: string;
  typeSpatialDescription: string;
  categoryPrefix: string;
  searchPlaceholder: string;
  items: string;
  related: string;
  relatedAgential: string;
  relatedSpatial: string;
  count: (n: number) => string;
  total: (n: number) => string;
  page: (current: number, total: number) => string;
  previous: string;
  next: string;
  noResults: string;
  wikipedia: string;
  fulltextSearch: string;
  viewNetwork: string;
  backToTypes: string;
  notFound: string;
  notFoundDescription: string;
};

const MESSAGES: Record<Locale, EntityMessages> = {
  ja: {
    title: '人名・地名',
    description:
      '『渋沢栄一伝記資料』別巻第1、第2の人名および地名（一部）を対象にし、実験的な分析を行っているため、結果が必ずしも正確ではない可能性があります。',
    eyebrow: 'Person & Place',
    disclaimer:
      '『渋沢栄一伝記資料』別巻第1、第2の人名および地名（一部）を対象にし、実験的な分析を行っているため、結果が必ずしも正確ではない可能性があります。',
    typeAgential: '人物',
    typeSpatial: '場所',
    typeAgentialShort: '人物',
    typeSpatialShort: '場所',
    typeAgentialDescription: '日記に登場する人物の一覧です。',
    typeSpatialDescription: '日記に登場する場所の一覧です。',
    categoryPrefix: 'カテゴリ',
    searchPlaceholder: '検索語を入力',
    items: '件',
    related: '関連',
    relatedAgential: '関連人物',
    relatedSpatial: '関連場所',
    count: (n: number) => `${n.toLocaleString()}件`,
    total: (n: number) => `全${n.toLocaleString()}件`,
    page: (current: number, total: number) => `${current} / ${total} ページ`,
    previous: '前へ',
    next: '次へ',
    noResults: '該当する項目はありません。',
    wikipedia: 'Wikipediaより',
    fulltextSearch: '本文検索',
    viewNetwork: 'ネットワークを表示',
    backToTypes: '人名・地名一覧に戻る',
    notFound: 'データが見つかりません',
    notFoundDescription: '指定されたエンティティは存在しません。',
  },
  en: {
    title: 'Person & Place',
    description:
      'Persons and places (partial) in supplementary volumes 1 and 2 of the Shibusawa Eiichi Denki Shiryo are analyzed experimentally; results may not always be accurate.',
    eyebrow: 'Person & Place',
    disclaimer:
      'Persons and places (partial) in supplementary volumes 1 and 2 of the Shibusawa Eiichi Denki Shiryo are analyzed experimentally; results may not always be accurate.',
    typeAgential: 'Person',
    typeSpatial: 'Place',
    typeAgentialShort: 'Person',
    typeSpatialShort: 'Place',
    typeAgentialDescription: 'Persons mentioned in the diary.',
    typeSpatialDescription: 'Places mentioned in the diary.',
    categoryPrefix: 'Category',
    searchPlaceholder: 'Enter a search term',
    items: 'items',
    related: 'Related',
    relatedAgential: 'Related persons',
    relatedSpatial: 'Related places',
    count: (n: number) => `${n.toLocaleString()} items`,
    total: (n: number) => `${n.toLocaleString()} total`,
    page: (current: number, total: number) => `Page ${current} / ${total}`,
    previous: 'Previous',
    next: 'Next',
    noResults: 'No matching results.',
    wikipedia: 'from Wikipedia',
    fulltextSearch: 'Full-text search',
    viewNetwork: 'View network',
    backToTypes: 'Back to person & place list',
    notFound: 'Not found',
    notFoundDescription: 'The requested entity does not exist.',
  },
};

export function getEntityMessages(locale: Locale): EntityMessages {
  return MESSAGES[locale] ?? MESSAGES.en;
}

export type { EntityMessages };
