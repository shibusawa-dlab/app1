import { SITE_CONFIG, type Locale } from './site';

export { SITE_CONFIG };

export const getMetadata = (locale: Locale) => {
  const title = SITE_CONFIG.name[locale];
  const description = SITE_CONFIG.description[locale];
  const ogImage = SITE_CONFIG.ogImage[locale];

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      title,
      description,
      url: SITE_CONFIG.url,
      siteName: title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: SITE_CONFIG.twitter.card,
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: SITE_CONFIG.url,
      languages: {
        ja: `${SITE_CONFIG.url}/ja`,
        en: `${SITE_CONFIG.url}/en`,
      },
    },
  };
};

export const getPageMetadata = (
  locale: Locale,
  page: {
    title: string;
    description?: string;
    ogImage?: string;
  }
) => {
  const siteTitle = SITE_CONFIG.name[locale];
  const defaultDescription = SITE_CONFIG.description[locale];
  const defaultOgImage = SITE_CONFIG.ogImage[locale];
  const ogTitle = `${page.title} | ${siteTitle}`;

  // Return plain `title` string so the root layout's `template: '%s | ...'`
  // appends the site name exactly once.
  return {
    title: page.title,
    description: page.description || defaultDescription,
    openGraph: {
      title: ogTitle,
      description: page.description || defaultDescription,
      images: [
        {
          url: page.ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: SITE_CONFIG.twitter.card,
      title: ogTitle,
      description: page.description || defaultDescription,
      images: [page.ogImage || defaultOgImage],
    },
  };
};
