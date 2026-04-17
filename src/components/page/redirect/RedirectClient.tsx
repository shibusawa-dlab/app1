'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';

type Props = {
  basePath?: string;
  labels: {
    redirecting: string;
    fallbackLink: string;
    home: string;
  };
};

/**
 * Port of the legacy Nuxt `/redirect?p=<path>` helper.
 * Reads the `p` query parameter on mount and navigates to the target path.
 * Any occurrence of the configured basePath is stripped first, matching the
 * original `param.replace(base, '')` behaviour.
 */
export default function RedirectClient({ basePath = '', labels }: Props) {
  const router = useRouter();
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    if (!p) {
      router.replace('/');
      return;
    }
    let cleaned = p;
    if (basePath && cleaned.startsWith(basePath)) {
      cleaned = cleaned.slice(basePath.length);
    }
    if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
    setTarget(cleaned);
    // Use a raw window navigation so we don't double-prefix the locale.
    window.location.replace(cleaned);
  }, [basePath, router]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-4">
        {labels.redirecting}
      </p>
      {target ? (
        <p className="text-gray-700 dark:text-gray-300">
          <a
            href={target}
            className="underline underline-offset-4 hover:text-amber-700 dark:hover:text-amber-300"
          >
            {labels.fallbackLink}
          </a>
        </p>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          <a
            href="/"
            className="underline underline-offset-4 hover:text-amber-700 dark:hover:text-amber-300"
          >
            {labels.home}
          </a>
        </p>
      )}
    </div>
  );
}
