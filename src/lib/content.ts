/**
 * Content loading helpers.
 *
 * Originally these helpers read markdown from `backup/content/` via `fs`.
 * Cloudflare Workers does not implement `node:fs`, so the markdown source
 * is now bundled as TypeScript constants under `src/content/` and rendered
 * with `marked` (a pure-JS library that runs fine on Workers).
 *
 * All public signatures are preserved so call sites (news index/detail, static
 * slug page, etc.) don't need to change.
 */
import type { Locale } from '@/constants/site';
import {
  findRawNewsDoc,
  getRawNewsDocs,
  listRawNewsSlugs as listRawNewsSlugsData,
} from '@/content/news';
import {
  findRawStaticDoc,
  listRawStaticSlugs as listRawStaticSlugsData,
} from '@/content/static';

export type NewsFrontmatter = {
  title: string;
  date: string;
};

export type NewsEntry = {
  slug: string;
  title: string;
  date: string;
  /** ISO yyyy-mm-dd */
  dateStr: string;
  /** Rendered HTML body */
  html: string;
  /** Raw markdown body (without frontmatter) */
  raw: string;
  locale: Locale;
};

export type StaticEntry = {
  slug: string;
  title: string;
  html: string;
  raw: string;
};

async function renderMarkdown(md: string): Promise<string> {
  try {
    // `marked` is bundled as a normal dependency (pure JS, safe on Workers).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- types may not be installed; imported for runtime only
    const mod: unknown = await import('marked');
    const m = mod as Record<string, unknown>;
    const marked = (m.marked ?? m.default ?? m) as {
      parse: (src: string) => string | Promise<string>;
    };
    const out = await marked.parse(md);
    return typeof out === 'string' ? out : String(out);
  } catch {
    // Extremely small fallback: wrap each non-empty line in <p>, preserve lists minimally.
    const escaped = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const paragraphs = escaped.split(/\n{2,}/).map((block) => {
      if (/^\s*-\s+/.test(block)) {
        const items = block
          .split(/\n/)
          .filter((l) => /^\s*-\s+/.test(l))
          .map((l) => `<li>${l.replace(/^\s*-\s+/, '')}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    });
    return paragraphs.join('\n');
  }
}

export async function listNewsSlugs(locale: Locale): Promise<string[]> {
  return listRawNewsSlugsData(locale);
}

export async function getNewsEntry(locale: Locale, slug: string): Promise<NewsEntry | null> {
  const doc = findRawNewsDoc(locale, slug);
  if (!doc) return null;
  const html = await renderMarkdown(doc.body);
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.date,
    dateStr: doc.date,
    html,
    raw: doc.body,
    locale,
  };
}

export async function listNewsEntries(locale: Locale): Promise<NewsEntry[]> {
  const docs = getRawNewsDocs(locale);
  const entries: NewsEntry[] = [];
  for (const d of docs) {
    const html = await renderMarkdown(d.body);
    entries.push({
      slug: d.slug,
      title: d.title,
      date: d.date,
      dateStr: d.date,
      html,
      raw: d.body,
      locale,
    });
  }
  // newest first
  entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return entries;
}

export async function getStaticEntry(slug: string): Promise<StaticEntry | null> {
  const doc = findRawStaticDoc(slug);
  if (!doc) return null;
  const html = await renderMarkdown(doc.body);
  return {
    slug: doc.slug,
    title: doc.title,
    html,
    raw: doc.body,
  };
}

export function listStaticSlugs(): string[] {
  return listRawStaticSlugsData();
}
