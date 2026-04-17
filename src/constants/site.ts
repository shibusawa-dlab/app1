export type Locale = 'ja' | 'en';

export const SITE_CONFIG = {
  name: {
    ja: '渋沢栄一ダイアリー',
    en: 'Shibusawa Eiichi Diary',
  },
  description: {
    ja: '『渋沢栄一伝記資料』別巻第1, 第2掲載の渋沢栄一の日記および集会日時通知表を公開しています。',
    en: 'Diaries and meeting schedules of Shibusawa Eiichi from the Shibusawa Eiichi Denki Shiryo, supplementary volumes 1 and 2.',
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shibusawa-dlab.github.io/app1',
  ogImage: {
    ja: '/img/ogp/home.jpg',
    en: '/img/ogp/home.jpg',
  },
  twitter: {
    card: 'summary_large_image',
  },
  foundation: 'https://www.shibusawa.or.jp/',
  github: 'https://github.com/shibusawa-dlab/app1',
} as const;

export type NavKey =
  | 'about'
  | 'fulltext'
  | 'fulltextSearch'
  | 'ad'
  | 'calendar'
  | 'personPlace'
  | 'network'
  | 'map'
  | 'ngram'
  | 'dataset'
  | 'news';

export type NavItem = {
  key: NavKey;
  href: string;
  featured?: boolean;
};

export const PRIMARY_NAV: NavItem[] = [
  { key: 'about', href: '/about', featured: true },
  { key: 'fulltext', href: '/fulltext', featured: true },
  { key: 'fulltextSearch', href: '/search', featured: true },
  { key: 'ad', href: '/ad', featured: true },
  { key: 'calendar', href: '/calendar', featured: true },
  { key: 'personPlace', href: '/entity', featured: true },
  { key: 'network', href: '/network', featured: true },
  { key: 'map', href: '/map', featured: true },
  { key: 'ngram', href: '/ngram', featured: true },
  { key: 'dataset', href: '/static/dataset', featured: true },
  { key: 'news', href: '/news' },
];
