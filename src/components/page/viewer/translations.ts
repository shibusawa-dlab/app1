import type { Locale } from '@/constants/site';

export type ViewerMessages = {
  title: string;
  description: string;
  openViewer: string;
  loading: string;
  loadingHint: string;
  loadFailed: string;
  contents: string;
  metadata: string;
  noMetadata: string;
  backToList: string;
  openMenu: string;
  closeMenu: string;
  openMetadata: string;
  closeMetadata: string;
  volumes: {
    DKB01: { label: string; description: string };
    DKB02: { label: string; description: string };
  };
};

export const VIEWER_TRANSLATIONS: Record<Locale, ViewerMessages> = {
  ja: {
    title: 'TEI ビューア',
    description: 'TEI マークアップされた本文をブラウザ上で閲覧できます。',
    openViewer: 'ビューアを開く',
    loading: '読み込み中…',
    loadingHint: '読み込みに少し時間がかかります。',
    loadFailed: 'TEI データの読み込みに失敗しました。',
    contents: 'コンテンツ',
    metadata: 'メタデータ',
    noMetadata: 'メタデータがありません。',
    backToList: '一覧へ戻る',
    openMenu: '目次を開く',
    closeMenu: '目次を閉じる',
    openMetadata: 'メタデータを開く',
    closeMetadata: 'メタデータを閉じる',
    volumes: {
      DKB01: {
        label: 'DKB01 渋沢栄一伝記資料 別巻第1',
        description: '別巻第1 日記（慶応元年〜明治四十四年）',
      },
      DKB02: {
        label: 'DKB02 渋沢栄一伝記資料 別巻第2',
        description: '別巻第2 日記および集会日時通知表',
      },
    },
  },
  en: {
    title: 'TEI Viewer',
    description: 'Browse TEI-encoded texts in your browser.',
    openViewer: 'Open viewer',
    loading: 'Loading…',
    loadingHint: 'Loading may take a moment.',
    loadFailed: 'Failed to load the TEI document.',
    contents: 'Contents',
    metadata: 'Metadata',
    noMetadata: 'No metadata available.',
    backToList: 'Back to list',
    openMenu: 'Open table of contents',
    closeMenu: 'Close table of contents',
    openMetadata: 'Open metadata',
    closeMetadata: 'Close metadata',
    volumes: {
      DKB01: {
        label: 'DKB01 Denki Shiryo Supplementary Vol. 1',
        description: 'Supplementary vol. 1 diary (1865–1911).',
      },
      DKB02: {
        label: 'DKB02 Denki Shiryo Supplementary Vol. 2',
        description: 'Supplementary vol. 2 diary and meeting schedules.',
      },
    },
  },
};

export function getViewerMessages(locale: Locale): ViewerMessages {
  return VIEWER_TRANSLATIONS[locale] ?? VIEWER_TRANSLATIONS.en;
}

export const VIEWER_IDS = ['DKB01', 'DKB02'] as const;
export type ViewerId = (typeof VIEWER_IDS)[number];

// Legacy TEI files lived on a companion GitHub Pages site (process.env.github_pages
// in the Nuxt config). The URL pattern is `<base>/tei/<id>.xml`.
export const TEI_CDN_BASE =
  process.env.NEXT_PUBLIC_TEI_BASE_URL ?? 'https://shibusawa-dlab.github.io/lab1';
