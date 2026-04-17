import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_CONFIG } from '@/constants/site';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const target = `${basePath}/${routing.defaultLocale}/`;

export const metadata: Metadata = {
  title: SITE_CONFIG.name.ja,
  description: SITE_CONFIG.description.ja,
  robots: { index: false, follow: false },
  alternates: { canonical: target },
};

export default function RootIndex() {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
      </head>
      <body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          margin: 0,
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <p>
          Redirecting…{' '}
          <a href={target} style={{ color: '#d97706' }}>
            {target}
          </a>
        </p>
      </body>
    </html>
  );
}
