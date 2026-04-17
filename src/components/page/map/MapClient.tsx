'use client';

import dynamic from 'next/dynamic';
import { MAP_TRANSLATIONS } from './translations';
import type { SpatialPoint } from './MapView';
import type { Locale } from '@/constants/site';

// Leaflet relies on `window`, so load the MapView purely on the client.
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] md:h-[70vh] w-full items-center justify-center rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 text-sm text-amber-800 dark:text-amber-200">
      …
    </div>
  ),
});

export default function MapClient({
  points,
  locale,
}: {
  points: SpatialPoint[];
  locale: Locale;
}) {
  const t = MAP_TRANSLATIONS[locale] ?? MAP_TRANSLATIONS.en;
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t.totalPlaces(points.length)} · {t.note}
      </p>
      <MapView points={points} locale={locale} />
    </div>
  );
}
