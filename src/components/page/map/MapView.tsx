'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { MAP_TRANSLATIONS } from './translations';
import type { Locale } from '@/constants/site';

// Known basePath for GH Pages builds — used so marker icon PNGs resolve.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Default Leaflet marker icons ship via CDN-unfriendly paths; wire them up
// to the bundled CDN copies so we don't ship the PNGs ourselves.
const DEFAULT_ICON = L.icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export type SpatialPoint = {
  label: string;
  lat: number;
  lng: number;
};

export default function MapView({
  points,
  locale,
}: {
  points: SpatialPoint[];
  locale: Locale;
}) {
  const t = MAP_TRANSLATIONS[locale] ?? MAP_TRANSLATIONS.en;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const markers = useMemo(() => points, [points]);

  if (!mounted) {
    return (
      <div className="flex h-[60vh] md:h-[70vh] w-full items-center justify-center rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 text-sm text-amber-800 dark:text-amber-200">
        {t.loading}
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-2xl border border-amber-100 dark:border-amber-900/40 shadow-sm">
      <MapContainer
        center={[35.689556, 139.691722]}
        zoom={2}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {markers.map((m) => (
            <Marker
              key={m.label}
              position={[m.lat, m.lng]}
              icon={DEFAULT_ICON}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{m.label}</div>
                  <a
                    className="mt-2 inline-block text-amber-700 hover:underline"
                    href={`${BASE_PATH}/entity/spatial/${encodeURIComponent(m.label)}/`}
                  >
                    {t.viewDetails}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
