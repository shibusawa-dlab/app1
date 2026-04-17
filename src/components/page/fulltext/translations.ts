import type { Locale } from '@/constants/site';

export const fulltextTr = {
  ja: {
    title: '全文',
    description: '渋沢栄一の日記本文を様々な形式で閲覧できます。',
    eyebrow: 'FULL TEXT',
    intro:
      '全文テキストデータを閲覧できます。研究の一環として様々な利用環境を想定し、実験的に作成したものを含みます。今後、予告なく変更する場合があることをご理解のうえご利用ください。',
    formatsTitle: '提供形式',
    formats: [
      'TEI Viewer（画像との並列表示機能や人名・地名等へのハイライト表示機能を提供します。動作が重い点にご注意ください。）',
      'HTML',
      'PDF',
      'EPUB（リーダーをご用意のうえお使いください。）',
    ],
    columns: {
      source: '資料',
      viewer: 'TEI Viewer',
      html: 'HTML',
      pdf: 'PDF',
      epub: 'EPUB',
      xml: 'TEI/XML',
    },
    openLink: '開く',
    downloadLink: 'ダウンロード',
  },
  en: {
    title: 'Full text',
    description: 'Read the full text of Shibusawa Eiichi’s diary in multiple formats.',
    eyebrow: 'FULL TEXT',
    intro:
      'Browse the full-text data. Some formats are experimental and may be changed without notice.',
    formatsTitle: 'Available formats',
    formats: [
      'TEI Viewer (parallel display with images and highlighting of people / places; note that it may be slow).',
      'HTML',
      'PDF',
      'EPUB (requires a reader application).',
    ],
    columns: {
      source: 'Source',
      viewer: 'TEI Viewer',
      html: 'HTML',
      pdf: 'PDF',
      epub: 'EPUB',
      xml: 'TEI/XML',
    },
    openLink: 'Open',
    downloadLink: 'Download',
  },
} as const;

export const getFulltextTr = (locale: Locale) => fulltextTr[locale] ?? fulltextTr.en;

export type FulltextMember = {
  id: string;
  viewer_id: string;
  label: { ja: string; en: string };
};

/**
 * Hardcoded list of fulltext members — mirrors the original
 * Nuxt `fulltext.vue` page.
 */
export const FULLTEXT_MEMBERS: FulltextMember[] = [
  {
    id: 'DKB10001m-1',
    viewer_id: 'DKB01',
    label: {
      ja: '渋沢栄一伝記資料. 別巻第1 日記 (慶応4年-大正3年)',
      en: 'Shibusawa Eiichi Denki Shiryo, Suppl. Vol. 1: Diary (1868–1914)',
    },
  },
  {
    id: 'DKB20001m-1',
    viewer_id: 'DKB02',
    label: {
      ja: '渋沢栄一伝記資料. 別巻第2 日記 (大正4年-昭和5年), 集会日時通知表',
      en: 'Shibusawa Eiichi Denki Shiryo, Suppl. Vol. 2: Diary (1915–1930), Meeting Schedules',
    },
  },
];
