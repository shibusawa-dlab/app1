/**
 * Static content pages bundled as TypeScript modules.
 *
 * Originally these were markdown files under `backup/content/static/` loaded
 * via `fs.readFile`. Cloudflare Workers does not support `node:fs`, so the
 * markdown is embedded as string constants instead.
 */

export type RawStaticDoc = {
  slug: string;
  title: string;
  body: string; // markdown body (no frontmatter)
};

const STATIC_DOCS: RawStaticDoc[] = [
  {
    slug: 'dataset',
    title: 'dataset',
    body: `- TEI/XMLファイル
  - https://github.com/shibusawa-dlab/lab1/tree/master/tei
- 原本画像のIIIFコレクション
  - https://shibusawa-dlab.github.io/lab1/iiif/collection/top.json
  - [Image Annotatorでの表示例](https://www.kanzaki.com/works/2016/pub/image-annotator?u=https%3A%2F%2Fshibusawa-dlab.github.io%2Flab1%2Fiiif%2Fcollection%2Ftop.json)`,
  },
];

export function findRawStaticDoc(slug: string): RawStaticDoc | null {
  return STATIC_DOCS.find((d) => d.slug === slug) ?? null;
}

export function listRawStaticSlugs(): string[] {
  return STATIC_DOCS.map((d) => d.slug);
}
