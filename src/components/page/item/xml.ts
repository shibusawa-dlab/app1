/**
 * Minimal TEI-XML to HTML renderer.
 *
 * The legacy site used `$utils.xml2html` (Vue plugin) which wrapped various
 * TEI tags as styled spans. We approximate that here with a regex-based
 * rewrite that is intentionally conservative.
 *
 * TODO: Full parity with the original helper (backup/components/viewer/*.vue)
 * is out of scope for the initial migration. Extend this renderer as specific
 * TEI constructs need richer display.
 */

const TAG_MAP: Record<string, { tag: string; className: string }> = {
  persName: { tag: 'span', className: 'tei-persName' },
  placeName: { tag: 'span', className: 'tei-placeName' },
  date: { tag: 'span', className: 'tei-date' },
  time: { tag: 'span', className: 'tei-time' },
  head: { tag: 'h3', className: 'tei-head' },
  p: { tag: 'p', className: 'tei-p' },
  div: { tag: 'div', className: 'tei-div' },
};

export function renderTeiXml(xml: string | undefined): string {
  if (!xml) return '';
  let out = xml;

  for (const [name, { tag, className }] of Object.entries(TAG_MAP)) {
    // Open tag with attributes.
    const openRe = new RegExp(`<${name}(\\s[^>]*)?>`, 'g');
    out = out.replace(openRe, `<${tag} class="${className}">`);
    const closeRe = new RegExp(`</${name}>`, 'g');
    out = out.replace(closeRe, `</${tag}>`);
  }

  // Strip anything else TEI-specific we didn't map to stay safe.
  out = out.replace(/<\/?(TEI|teiHeader|fileDesc|[a-z]+:[a-zA-Z]+)[^>]*>/g, '');

  return out;
}
