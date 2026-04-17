/**
 * HTTP-resource proxy for mixed-content fallback.
 *
 * Some archival records still reference assets on hosts that are only
 * reachable over `http://`. Browsers block these on HTTPS pages (Mixed
 * Content policy). For hosts that also serve HTTPS we rewrite the
 * protocol client-side (see `src/lib/url.ts`); this endpoint is the
 * last-resort proxy for the remaining HTTP-only assets.
 *
 * The host list is an explicit allowlist — the endpoint must never
 * behave as an open proxy.
 *
 * Usage:  `<img src="/api/image-proxy?url=<encoded-http-url>" />`
 */
import { NextRequest } from 'next/server';
import { PROXY_ALLOWED_HOSTS } from '@/lib/url';

// Always execute on request — caching happens via response headers.
// Runs on the Cloudflare Worker runtime (via @opennextjs/cloudflare),
// which exposes `fetch`, `Response`, `URL` — no Node APIs are used here.
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url');
  if (!raw) {
    return new Response('Missing `url` query parameter', { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new Response('Invalid URL', { status: 400 });
  }

  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return new Response('Unsupported protocol', { status: 400 });
  }

  if (!PROXY_ALLOWED_HOSTS.has(target.hostname)) {
    return new Response('Host not allowed', { status: 403 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(target.toString(), {
      // Forward a neutral UA — some origins block unknown agents.
      headers: { 'User-Agent': 'shibusawa-diary-image-proxy/1.0' },
      // Disable redirect following to avoid escaping the allowlist.
      redirect: 'manual',
    });
  } catch (err) {
    return new Response(
      `Upstream fetch failed: ${err instanceof Error ? err.message : String(err)}`,
      { status: 502 }
    );
  }

  if (upstream.status >= 300 && upstream.status < 400) {
    // Redirects could escape the allowlist — refuse to follow them.
    return new Response('Upstream redirected', { status: 502 });
  }

  if (!upstream.ok) {
    return new Response(`Upstream ${upstream.status}`, { status: upstream.status });
  }

  const contentType = upstream.headers.get('Content-Type') ?? 'application/octet-stream';
  // Only allow image / manifest-like content types through.
  const allowedPrefixes = ['image/', 'application/json', 'application/ld+json'];
  if (!allowedPrefixes.some((p) => contentType.startsWith(p))) {
    return new Response('Unsupported content type', { status: 415 });
  }

  const headers = new Headers();
  headers.set('Content-Type', contentType);
  // Long browser cache + CDN cache — these are historical immutable assets.
  headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, immutable');
  const contentLength = upstream.headers.get('Content-Length');
  if (contentLength) headers.set('Content-Length', contentLength);

  return new Response(upstream.body, { status: 200, headers });
}
