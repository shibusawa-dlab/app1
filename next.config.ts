import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const isGhPages = process.env.DEPLOY_ENV === 'GH_PAGES';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGhPages ? '/app1' : '');
const isDev = process.env.NODE_ENV === 'development';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// `output: 'export'` is needed for static hosting (GH Pages). In dev we skip
// it because Next.js 16's dev-mode route matcher mishandles URL-encoded
// non-ASCII params with `output: 'export'`, returning 500 for valid entity
// IDs like `/entity/spatial/%E9%A3%9B%E9%B3%A5%E5%B1%B1%E9%82%B8/`.
const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(isDev ? {} : { output: 'export' }),
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withNextIntl(nextConfig);
