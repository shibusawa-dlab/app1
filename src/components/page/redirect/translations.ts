import type { Locale } from '@/constants/site';

export const redirectTr = {
  ja: {
    title: 'リダイレクト',
    description: '指定された URL へ遷移します。',
    redirecting: 'REDIRECTING',
    fallbackLink: '自動で遷移しない場合はこちらをクリックしてください。',
    home: 'ホームに戻る',
  },
  en: {
    title: 'Redirect',
    description: 'Forwarding to the requested URL.',
    redirecting: 'REDIRECTING',
    fallbackLink: 'Click here if you are not redirected automatically.',
    home: 'Return home',
  },
} as const;

export const getRedirectTr = (locale: Locale) => redirectTr[locale] ?? redirectTr.en;
