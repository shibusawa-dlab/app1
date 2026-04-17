import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const isGhPages = process.env.DEPLOY_ENV === 'GH_PAGES';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGhPages ? '/app1' : '');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Deployed as a Cloudflare Worker via @opennextjs/cloudflare (SSR).
// `output: 'export'` removed so API/SSR routes and D1 access work at runtime.
// `basePath` is kept env-controlled for GH Pages static builds.
const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withNextIntl(nextConfig);
