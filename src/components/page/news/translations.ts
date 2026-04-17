import type { Locale } from '@/constants/site';

export const newsTr = {
  ja: {
    title: 'お知らせ',
    description: '本サイトに関する最新情報',
    empty: '記事がありません。',
    eyebrow: 'NEWS',
    backToList: '一覧に戻る',
    readMore: '記事を読む',
  },
  en: {
    title: 'News',
    description: 'Latest updates related to this site.',
    empty: 'No posts yet.',
    eyebrow: 'NEWS',
    backToList: 'Back to list',
    readMore: 'Read more',
  },
} as const;

export const getNewsTr = (locale: Locale) => newsTr[locale] ?? newsTr.en;
