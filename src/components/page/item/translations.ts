import type { Locale } from '@/constants/site';

type ItemMessages = {
  title: string;
  description: string;
  eyebrow: string;
  category: string;
  date: string;
  agential: string;
  spatial: string;
  temporal: string;
  legend: string;
  fulltext: string;
  iiif: string;
  mirador: string;
  similar: string;
  items: string;
  related: string;
  license: string;
  licenseNotice: string;
  previous: string;
  next: string;
  backToSearch: string;
  notFound: string;
  notFoundDescription: string;
  viewerUnavailable: string;
  openExternal: string;
  detail: string;
  search: string;
  tei: string;
  json: string;
};

const MESSAGES: Record<Locale, ItemMessages> = {
  ja: {
    title: '日記記事',
    description: '『渋沢栄一伝記資料』の日記記事の詳細を表示します。',
    eyebrow: 'Diary Entry',
    category: 'カテゴリ',
    date: '日付',
    agential: '人物',
    spatial: '場所',
    temporal: '時間',
    legend: '凡例',
    fulltext: '全文',
    iiif: 'IIIF',
    mirador: 'Mirador',
    similar: '類似',
    items: '記事',
    related: '関連',
    license: 'ライセンス',
    licenseNotice:
      'この作品はクリエイティブ・コモンズ 表示 4.0 国際 ライセンスの下に提供されています。',
    previous: '前へ',
    next: '次へ',
    backToSearch: '検索へ戻る',
    notFound: '記事が見つかりません',
    notFoundDescription:
      '指定された ID の記事はビルド対象に含まれていません。ID が正しいかご確認ください。',
    viewerUnavailable: 'この記事には画像ビューアが設定されていません。',
    openExternal: '外部で開く',
    detail: '詳細',
    search: '検索',
    tei: 'TEI / XML',
    json: 'JSON',
  },
  en: {
    title: 'Diary Entry',
    description: 'Detail view of a diary entry in the Shibusawa Eiichi Denki Shiryo.',
    eyebrow: 'Diary Entry',
    category: 'Category',
    date: 'Date',
    agential: 'Person',
    spatial: 'Place',
    temporal: 'Time',
    legend: 'Legend',
    fulltext: 'Full text',
    iiif: 'IIIF',
    mirador: 'Mirador',
    similar: 'Similar',
    items: 'entries',
    related: 'Related',
    license: 'License',
    licenseNotice:
      'This work is licensed under a Creative Commons Attribution 4.0 International License.',
    previous: 'Previous',
    next: 'Next',
    backToSearch: 'Back to search',
    notFound: 'Entry not found',
    notFoundDescription:
      'The requested entry is not included in the current build. Please check the ID.',
    viewerUnavailable: 'No image viewer is configured for this entry.',
    openExternal: 'Open externally',
    detail: 'Detail',
    search: 'Search',
    tei: 'TEI / XML',
    json: 'JSON',
  },
};

export function getItemMessages(locale: Locale): ItemMessages {
  return MESSAGES[locale] ?? MESSAGES.en;
}

export type { ItemMessages };
