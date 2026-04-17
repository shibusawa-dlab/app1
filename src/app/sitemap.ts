import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_CONFIG } from '@/constants/site';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages = ['', '/about'];

  return routing.locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? ('daily' as const) : ('weekly' as const),
      priority: page === '' ? 1 : 0.8,
    }))
  );
}
