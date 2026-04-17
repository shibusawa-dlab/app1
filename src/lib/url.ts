/**
 * URL helpers for safely rendering third-party resources on an HTTPS page.
 *
 * Some of the archival JSON-LD records (notably the AD items backed by
 * `base1.nijl.ac.jp`) still ship `http://` URLs from an upstream that has
 * never been updated. Browsers block those HTTP subresources on an HTTPS
 * page (Mixed Content policy), so images fail to load in production.
 *
 * Strategy (applied in order):
 *
 *  1. Already HTTPS / relative / empty — return as-is.
 *  2. Host is known to serve HTTPS — rewrite `http://` → `https://`.
 *  3. Otherwise — route through our `/api/image-proxy` Worker endpoint,
 *     which fetches the HTTP resource server-side and streams it back.
 *
 * The proxy is intentionally limited to a small allowlist to avoid the
 * endpoint becoming an open proxy.
 */

/** Hosts that are known to also serve the same path over HTTPS. */
export const HTTPS_UPGRADE_HOSTS: ReadonlySet<string> = new Set([
  'base1.nijl.ac.jp',
  'base5.nijl.ac.jp',
  'eiichi.shibusawa.or.jp',
]);

/** Hosts allowed to be fetched via `/api/image-proxy` (HTTP-only fallback). */
export const PROXY_ALLOWED_HOSTS: ReadonlySet<string> = new Set([
  'base1.nijl.ac.jp',
  'base5.nijl.ac.jp',
  'eiichi.shibusawa.or.jp',
]);

/**
 * Best-effort URL parsing — returns `null` for non-URL strings so callers
 * can safely pass through unknown values.
 */
function safeParse(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

/**
 * Return a safe URL for rendering on an HTTPS page:
 * - leaves non-HTTP strings alone (already HTTPS, relative paths, data:…)
 * - upgrades HTTP to HTTPS when the host is known to serve HTTPS
 * - otherwise routes through `/api/image-proxy`
 */
export function toHttpsOrProxy(url: string | undefined | null): string {
  if (!url) return '';
  if (!url.startsWith('http://')) return url;

  const parsed = safeParse(url);
  if (!parsed) return url;

  if (HTTPS_UPGRADE_HOSTS.has(parsed.hostname)) {
    parsed.protocol = 'https:';
    return parsed.toString();
  }

  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

/**
 * Rewrite every known HTTP host reference inside a JSON string to HTTPS.
 * Useful for fetched manifests whose payload contains HTTP image URLs.
 */
export function rewriteHttpHostsInText(text: string): string {
  let out = text;
  for (const host of HTTPS_UPGRADE_HOSTS) {
    // Escape dots in the hostname for the regex.
    const escaped = host.replace(/\./g, '\\.');
    const re = new RegExp(`http://${escaped}`, 'g');
    out = out.replace(re, `https://${host}`);
  }
  return out;
}

/**
 * Deep-walk a parsed JSON value and rewrite any HTTP URLs targeting the
 * known-upgradable hosts to HTTPS. Mutates and returns the value for
 * convenience.
 */
export function rewriteHttpHostsDeep<T>(value: T): T {
  if (typeof value === 'string') {
    if (!value.startsWith('http://')) return value;
    const parsed = safeParse(value);
    if (parsed && HTTPS_UPGRADE_HOSTS.has(parsed.hostname)) {
      parsed.protocol = 'https:';
      return parsed.toString() as unknown as T;
    }
    return value;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      value[i] = rewriteHttpHostsDeep(value[i]);
    }
    return value;
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    for (const key of Object.keys(obj)) {
      obj[key] = rewriteHttpHostsDeep(obj[key]);
    }
    return value;
  }
  return value;
}
