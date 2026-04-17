import type { Locale } from '@/constants/site';

type AdMessages = {
  title: string;
  description: string;
  eyebrow: string;
  sourceInfo: string;
  ownerPast: string;
  ownerCurrent: string;
  imageUrl: string;
  imageProvider: string;
  parent: string;
  viewerNotice: string;
  openManifest: string;
  openExternal: string;
  share: string;
  shareOnTwitter: string;
  shareOnFacebook: string;
  shareOnLink: string;
  iiifViewer: string;
  loadingViewer: string;
  viewerUnavailable: string;
  backToList: string;
  notFound: string;
  notFoundDescription: string;
  metadata: string;
  related: string;
  noImage: string;
};

export const AD_TRANSLATIONS: Record<Locale, AdMessages> = {
  ja: {
    title: '原本概要',
    description: 'もととなった原本資料の書誌情報を一覧できます。',
    eyebrow: 'Archival Description',
    sourceInfo: '伝記資料編纂時の資料情報',
    ownerPast: '旧蔵',
    ownerCurrent: '所蔵',
    imageUrl: '画像公開URL',
    imageProvider: '画像公開機関',
    parent: '親資料',
    viewerNotice:
      '以下の画像およびメタデータは、原資料の所蔵者である国文学研究資料館が作成したものを使用しています。',
    openManifest: 'IIIF マニフェスト',
    openExternal: '外部で開く',
    share: '共有',
    shareOnTwitter: 'Twitterで共有',
    shareOnFacebook: 'Facebookで共有',
    shareOnLink: 'リンクをコピー',
    iiifViewer: 'IIIF 画像ビューア',
    loadingViewer: 'ビューアを読み込み中…',
    viewerUnavailable: 'この資料には IIIF マニフェストが設定されていません。',
    backToList: '一覧へ戻る',
    notFound: '資料が見つかりません',
    notFoundDescription: '指定された ID に該当する資料はありません。',
    metadata: '書誌情報',
    related: '関連リンク',
    noImage: 'No image',
  },
  en: {
    title: 'Archival Description',
    description: 'Bibliographic information of the source materials.',
    eyebrow: 'Archival Description',
    sourceInfo: 'Source information (from the original biographical edition)',
    ownerPast: 'Former owner',
    ownerCurrent: 'Current owner',
    imageUrl: 'Image URL',
    imageProvider: 'Image provider',
    parent: 'Parent volume',
    viewerNotice:
      'The images and metadata below are provided by the National Institute of Japanese Literature, the holder of the source materials.',
    openManifest: 'IIIF manifest',
    openExternal: 'Open externally',
    share: 'Share',
    shareOnTwitter: 'Share on Twitter',
    shareOnFacebook: 'Share on Facebook',
    shareOnLink: 'Copy link',
    iiifViewer: 'IIIF image viewer',
    loadingViewer: 'Loading viewer…',
    viewerUnavailable: 'No IIIF manifest is registered for this item.',
    backToList: 'Back to list',
    notFound: 'Item not found',
    notFoundDescription: 'There is no item matching the given ID.',
    metadata: 'Bibliographic information',
    related: 'Related',
    noImage: 'No image',
  },
};

export function getAdMessages(locale: Locale): AdMessages {
  return AD_TRANSLATIONS[locale] ?? AD_TRANSLATIONS.en;
}
