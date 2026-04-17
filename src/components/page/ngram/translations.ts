import type { Locale } from '@/constants/site';

export const NGRAM_TRANSLATIONS: Record<Locale, Record<string, string>> = {
  ja: {
    title: 'Ngram Viewer',
    description: '用語の出現頻度を時系列で可視化します。',
    lead: '年代ごとの用語の出現頻度または出現比率（年ごとの総ngram数で正規化した値）を折れ線グラフで可視化します。',
    searchPlaceholder: 'キーワードを検索（スラッシュ区切りで複数指定可能）',
    helpTitle: 'ヘルプ',
    help1:
      '複数のキーワードをスラッシュ (/) 区切りでクエリに指定することで、出現頻度を重ねて表示できます。例: 第一銀行/日本銀行',
    help2:
      '正規表現を利用したクエリも可能です。例: 浅野..郎',
    helpNote:
      '【注意】処理の特性により、総出現頻度が5程度以下のものについては集計漏れが発生することがあります。',
    hitsSuffix: '件ヒットしました',
    freq: '出現頻度',
    ratio: '出現比率（年ごとの出現頻度 / 年ごとの総対象Ngram数）',
    noResults: 'キーワードを入力してください。結果がここに表示されます。',
    noMatches: '一致するキーワードがありません。',
    term: 'キーワード',
    termFreq: '総出現頻度 (TF)',
    termDf: 'アイテム出現頻度 (DF)',
    select: '選択',
    compromiseNotice:
      '※データ全量 (約59MB) は静的出力には含められないため、このページでは総頻度上位200件のサブセットに対して検索します。',
    yAxisFreq: 'キーワードの出現頻度',
    yAxisRatio: 'キーワードの出現比率',
    yAxisTotal: '総ngram数',
    totalLabel: '総ngram',
  },
  en: {
    title: 'Ngram Viewer',
    description: 'Visualize term frequencies over time.',
    lead: 'The line chart shows either raw frequency of a term per year, or the ratio (frequency divided by total ngrams for that year).',
    searchPlaceholder: 'Search terms (slash-separated for multiple)',
    helpTitle: 'Help',
    help1:
      'Compare multiple keywords by joining them with a slash (/). Example: 第一銀行/日本銀行',
    help2: 'Regular expressions are also supported. Example: 浅野..郎',
    helpNote:
      'Note: Due to the way the data is aggregated, terms with total frequency below ~5 may be missed.',
    hitsSuffix: ' hit(s).',
    freq: 'Frequency',
    ratio: 'Ratio (yearly frequency / yearly total ngrams)',
    noResults: 'Enter a keyword; results will appear here.',
    noMatches: 'No terms match.',
    term: 'Term',
    termFreq: 'Total frequency (TF)',
    termDf: 'Document frequency (DF)',
    select: 'Select',
    compromiseNotice:
      'Note: the full dataset (~59MB) is too large for static export; this page searches a subset of the top-200 most frequent terms.',
    yAxisFreq: 'Term frequency',
    yAxisRatio: 'Term ratio',
    yAxisTotal: 'Total ngram count',
    totalLabel: 'Total ngrams',
  },
};
