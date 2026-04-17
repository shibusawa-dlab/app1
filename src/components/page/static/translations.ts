import type { Locale } from '@/constants/site';

/**
 * Localized labels for static-content page titles.
 * Keys match the frontmatter `title` found in `backup/content/static/*.md`.
 */
export const staticTr: Record<Locale, Record<string, string>> = {
  ja: {
    dataset: 'データセット',
  },
  en: {
    dataset: 'Dataset',
  },
};

export const getStaticTitle = (locale: Locale, key: string): string =>
  staticTr[locale]?.[key] ?? staticTr.en?.[key] ?? key;
