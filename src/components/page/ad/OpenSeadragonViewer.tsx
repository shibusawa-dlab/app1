'use client';

import { useEffect, useRef, useState } from 'react';
import { rewriteHttpHostsDeep, toHttpsOrProxy } from '@/lib/url';
// `@types/openseadragon` will be installed alongside `openseadragon`.
// Use a loose type here so the module is only needed at runtime.
type Viewer = { destroy: () => void };

type Props = {
  manifestUrl: string;
  label?: string;
  loadingLabel: string;
};

type IIIFService = {
  '@id'?: string;
  id?: string;
};

type IIIFResource = {
  service?: IIIFService | IIIFService[];
  '@id'?: string;
  id?: string;
};

type IIIFImageAnnotation = {
  resource?: IIIFResource;
  body?: IIIFResource | IIIFResource[];
};

type IIIFCanvas = {
  images?: IIIFImageAnnotation[]; // v2
  items?: { items?: IIIFImageAnnotation[] }[]; // v3
  width?: number;
  height?: number;
};

type IIIFManifest = {
  sequences?: { canvases?: IIIFCanvas[] }[]; // v2
  items?: IIIFCanvas[]; // v3
};

function pickService(resource: IIIFResource | undefined): string | null {
  if (!resource) return null;
  const svc = resource.service;
  const first = Array.isArray(svc) ? svc[0] : svc;
  const serviceId = first?.['@id'] ?? first?.id;
  if (serviceId) return `${serviceId.replace(/\/$/, '')}/info.json`;
  // Fallback: use the image URL directly as a "simple image" tile source
  return resource['@id'] ?? resource.id ?? null;
}

function extractTileSources(manifest: IIIFManifest): string[] {
  const sources: string[] = [];

  // IIIF v2
  const canvasesV2 = manifest.sequences?.[0]?.canvases ?? [];
  for (const canvas of canvasesV2) {
    const ann = canvas.images?.[0];
    const resource = ann?.resource;
    const picked = pickService(resource);
    if (picked) sources.push(picked);
  }

  // IIIF v3
  const canvasesV3 = manifest.items ?? [];
  for (const canvas of canvasesV3) {
    const ann = canvas.items?.[0]?.items?.[0];
    const body = ann?.body;
    const resource = Array.isArray(body) ? body[0] : body;
    const picked = pickService(resource);
    if (picked) sources.push(picked);
  }

  return sources;
}

export default function OpenSeadragonViewer({
  manifestUrl,
  label,
  loadingLabel,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // The manifest URL itself might be HTTP on a legacy record — upgrade
        // it, and also rewrite any HTTP image hosts in the parsed payload so
        // OpenSeadragon never emits mixed-content requests on HTTPS pages.
        const safeManifestUrl = toHttpsOrProxy(manifestUrl);
        const [{ default: OpenSeadragon }, manifestResp] = await Promise.all([
          import('openseadragon'),
          fetch(safeManifestUrl),
        ]);
        if (cancelled) return;

        if (!manifestResp.ok) {
          throw new Error(`Failed to fetch manifest: ${manifestResp.status}`);
        }
        const rawManifest = (await manifestResp.json()) as IIIFManifest;
        if (cancelled) return;

        const manifest = rewriteHttpHostsDeep(rawManifest);

        const tileSources = extractTileSources(manifest).map((src) =>
          toHttpsOrProxy(src)
        );
        if (tileSources.length === 0) {
          throw new Error('No images found in manifest');
        }

        if (!containerRef.current) return;
        // tear down previous
        viewerRef.current?.destroy();
        viewerRef.current = OpenSeadragon({
          element: containerRef.current,
          prefixUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/',
          tileSources,
          sequenceMode: tileSources.length > 1,
          showNavigationControl: true,
          showNavigator: false,
          gestureSettingsMouse: { clickToZoom: false },
        });
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          console.error('[OpenSeadragon] init failed', err);
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [manifestUrl]);

  return (
    <div className="relative w-full h-[600px] rounded-xl border border-gray-200/70 dark:border-gray-800 bg-gray-900 overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0"
        role="img"
        aria-label={label}
      />
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-300 pointer-events-none">
          {loadingLabel}
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-sm text-amber-200 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
