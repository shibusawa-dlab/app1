import type { Locale } from '@/constants/site';

export const MAP_TRANSLATIONS: Record<
  Locale,
  {
    title: string;
    description: string;
    note: string;
    loading: string;
    viewDetails: string;
    placeLabel: string;
    totalPlaces: (count: number) => string;
  }
> = {
  ja: {
    title: '地図',
    description:
      '日記に登場する地名のうち、Wikipediaで位置情報が取得できた場所を地図上に表示しています。',
    note: 'マーカーをクリックすると地名が表示されます。ズームレベルに応じてクラスタ表示されます。',
    loading: '地図を読み込み中…',
    viewDetails: '詳細を見る',
    placeLabel: '地名',
    totalPlaces: (count: number) => `全 ${count} 地点`,
  },
  en: {
    title: 'Map',
    description:
      'Places mentioned in the diaries whose coordinates were retrieved from Wikipedia are shown on the map.',
    note:
      'Click a marker to see its place name. Markers are clustered automatically based on zoom level.',
    loading: 'Loading map\u2026',
    viewDetails: 'View details',
    placeLabel: 'Place',
    totalPlaces: (count: number) =>
      count === 1 ? '1 place' : `${count} places`,
  },
};
