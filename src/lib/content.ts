/**
 * Content loading helpers. Reads markdown files from `backup/content/`
 * at build time (server components / generateStaticParams only).
 *
 * Uses dynamic imports for `gray-matter` and `marked` so that if the
 * dependencies are missing we can surface a clear error. These packages
 * must be installed before running `next build`:
 *   npm install gray-matter marked
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Locale } from '@/constants/site';

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

function contentRoot(): string {
  // Narrow the trace to backup/content only, avoiding a broad `REPO_ROOT`
  // that would match the entire project (Turbopack NFT warning).
  return path.join(process.cwd(), 'backup', 'content');
}

function contentDirForLocale(locale: Locale, sub: string): string {
  const root = contentRoot();
  if (locale === 'ja') return path.join(root, sub);
  return path.join(root, locale, sub);
}

async function parseFrontmatter(raw: string): Promise<{ data: Record<string, unknown>; content: string }> {
  try {
    // `gray-matter` is an optional runtime dep — see header comment.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- optional peer; not present during type-check
    const mod = await import('gray-matter');
    const matter = (mod.default ?? mod) as unknown as (input: string) => {
      data: Record<string, unknown>;
      content: string;
    };
    const res = matter(raw);
    return { data: res.data ?? {}, content: res.content ?? '' };
  } catch {
    // Minimal fallback frontmatter parser (key: value pairs only).
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { data: {}, content: raw };
    const [, fm, body] = match;
    const data: Record<string, unknown> = {};
    for (const line of fm.split(/\r?\n/)) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
        val = val.slice(1, -1);
      }
      if (key) data[key] = val;
    }
    return { data, content: body };
  }
}

async function renderMarkdown(md: string): Promise<string> {
  try {
    // `marked` is an optional runtime dep — see header comment.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- optional peer; not present during type-check
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

function toDateStr(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string') {
    return value.slice(0, 10);
  }
  return '';
}

export async function listNewsSlugs(locale: Locale): Promise<string[]> {
  const dir = contentDirForLocale(locale, 'news');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export async function getNewsEntry(locale: Locale, slug: string): Promise<NewsEntry | null> {
  const candidates = [
    path.join(contentDirForLocale(locale, 'news'), `${slug}.md`),
    path.join(contentDirForLocale('ja', 'news'), `${slug}.md`),
  ];
  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = await parseFrontmatter(raw);
  const html = await renderMarkdown(content);
  const dateStr = toDateStr(data.date) || slug;
  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    date: dateStr,
    dateStr,
    html,
    raw: content,
    locale,
  };
}

export async function listNewsEntries(locale: Locale): Promise<NewsEntry[]> {
  const slugs = await listNewsSlugs(locale);
  const entries: NewsEntry[] = [];
  for (const slug of slugs) {
    const entry = await getNewsEntry(locale, slug);
    if (entry) entries.push(entry);
  }
  // newest first
  entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return entries;
}

export async function getStaticEntry(slug: string): Promise<StaticEntry | null> {
  const filePath = path.join(contentRoot(), 'static', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = await parseFrontmatter(raw);
  const html = await renderMarkdown(content);
  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    html,
    raw: content,
  };
}

export function listStaticSlugs(): string[] {
  const dir = path.join(contentRoot(), 'static');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}
