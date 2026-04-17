/**
 * News entries bundled as TypeScript modules.
 *
 * Originally these were markdown files under `backup/content/news/` loaded via
 * `fs.readFile`. Cloudflare Workers does not support `node:fs`, so the
 * markdown is embedded as string constants instead. Frontmatter is pre-parsed.
 *
 * To add a new news entry, add another record below (ja and/or en variants).
 */
import type { Locale } from '@/constants/site';

export type RawNewsDoc = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  body: string; // markdown body (no frontmatter)
};

// ---------------------------------------------------------------------------
// Japanese sources (canonical — used as the default fallback for all locales).
// ---------------------------------------------------------------------------

const JA_NEWS: RawNewsDoc[] = [
  {
    slug: '2021-04-23',
    title: 'システムを公開しました。',
    date: '2021-04-23',
    body: `<div>
システムを公開しました。
</div>`,
  },
  {
    slug: '2022-06-02',
    title: 'システムを改良しました。',
    date: '2022-06-02',
    body: `
以下のとおり、システムを改良しました。
- 各種不具合を修正しました。
- 全文ページにおいて、PDFやEPUBを追加しました。 [例](https://shibusawa-dlab.github.io/app1/fulltext)
- 本文検索ページにおいて、正規表現による検索機能を追加しました。 [例](https://shibusawa-dlab.github.io/app1/search?main%5Bquery%5D=..銀行)
- Ngram Viewerを追加しました。 [例](https://shibusawa-dlab.github.io/app1/ngram)
- 原本画像を追加しました。 [例](https://shibusawa-dlab.github.io/app1/ad/DKB10001m)
- データセットのページを追加しました。 [例](https://shibusawa-dlab.github.io/app1/static/dataset)`,
  },
  {
    slug: '2022-06-21',
    title: 'ネットワーク表示における不具合を修正しました。',
    date: '2022-06-21',
    body: `ネットワーク表示における不具合を修正しました。

また、以下の改修を行いました。

- 全体的なデザインの微修正
- 人物詳細画面にネットワーク画面へのリンクを追加
    - 例: [浅野総一郎](https://shibusawa-dlab.github.io/app1/entity/agential/浅野総一郎)`,
  },
];

// ---------------------------------------------------------------------------
// English sources (optional — falls back to JA when missing).
// ---------------------------------------------------------------------------

const EN_NEWS: RawNewsDoc[] = [
  {
    slug: '2021-04-23',
    title: 'システムを公開しました。',
    date: '2021-04-23',
    body: `<div>
システムを公開しました。
</div>`,
  },
  {
    slug: '2022-06-02',
    title: 'システムを改良しました。',
    date: '2022-06-02',
    body: `
以下のとおり、システムを改良しました。
- 各種不具合を修正しました。
- 全文ページにおいて、PDFやEPUBを追加しました。 [例](https://shibusawa-dlab.github.io/app1/fulltext)
- 本文検索ページにおいて、正規表現による検索機能を追加しました。 [例](https://shibusawa-dlab.github.io/app1/search?main%5Bquery%5D=..銀行)
- Ngram Viewerを追加しました。 [例](https://shibusawa-dlab.github.io/app1/ngram)
- 原本画像を追加しました。 [例](https://shibusawa-dlab.github.io/app1/ad/DKB10001m)
- データセットのページを追加しました。 [例](https://shibusawa-dlab.github.io/app1/static/dataset)`,
  },
];

export function getRawNewsDocs(locale: Locale): RawNewsDoc[] {
  return locale === 'en' ? EN_NEWS : JA_NEWS;
}

export function findRawNewsDoc(locale: Locale, slug: string): RawNewsDoc | null {
  const primary = getRawNewsDocs(locale).find((d) => d.slug === slug);
  if (primary) return primary;
  // Fallback to Japanese source if locale-specific variant missing.
  if (locale !== 'ja') {
    const ja = JA_NEWS.find((d) => d.slug === slug);
    if (ja) return ja;
  }
  return null;
}

export function listRawNewsSlugs(locale: Locale): string[] {
  const set = new Set<string>();
  for (const d of getRawNewsDocs(locale)) set.add(d.slug);
  // Always include JA slugs so /[locale]/news/[slug] works even if the locale
  // variant is missing — the detail page falls back to the JA body.
  for (const d of JA_NEWS) set.add(d.slug);
  return [...set];
}
