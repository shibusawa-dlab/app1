'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState, useCallback } from 'react';
import { useRouter } from '@/i18n/routing';
import { NETWORK_TRANSLATIONS } from './translations';
import type { Locale } from '@/constants/site';
import type { GraphNode, GraphEdge } from './NetworkGraph';

const NetworkGraph = dynamic(() => import('./NetworkGraph'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-xl bg-amber-50/40 dark:bg-gray-950/40 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
      Loading…
    </div>
  ),
});

type Props = {
  id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  locale: Locale;
};

export default function NetworkDetailClient({ id, nodes, edges, locale }: Props) {
  const t = NETWORK_TRANSLATIONS[locale] ?? NETWORK_TRANSLATIONS.ja;
  const router = useRouter();
  const [selectedOther, setSelectedOther] = useState<string | null>(null);

  const relations = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of edges) {
      if (e.from === id) map[e.to] = (map[e.to] ?? 0) + e.value;
      else if (e.to === id) map[e.from] = (map[e.from] ?? 0) + e.value;
    }
    return Object.entries(map)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value);
  }, [edges, id]);

  const onSelectNode = useCallback(
    (nodeId: string | null) => {
      if (!nodeId || nodeId === id) {
        setSelectedOther(null);
      } else {
        setSelectedOther(nodeId);
      }
    },
    [id]
  );

  const onDoubleClickNode = useCallback(
    (nodeId: string) => {
      if (nodeId !== id) {
        router.push(`/network/${encodeURIComponent(nodeId)}`);
      }
    },
    [id, router]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 p-4">
          <NetworkGraph
            nodes={nodes}
            edges={edges}
            focusId={id}
            onSelectNode={onSelectNode}
            onDoubleClickNode={onDoubleClickNode}
          />
        </div>
        {selectedOther && (
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {locale === 'ja' ? '選択中のノード' : 'Selected node'}
              </p>
              <p className="text-gray-900 dark:text-gray-100 font-medium">
                {selectedOther}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                router.push(`/network/${encodeURIComponent(selectedOther)}`)
              }
              className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-sm font-medium transition-colors"
            >
              {t.viewNetwork}
            </button>
          </div>
        )}
      </div>

      <aside className="lg:col-span-1">
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200/70 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {t.relations}
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                ({relations.length})
              </span>
            </h2>
          </div>
          <ul className="divide-y divide-gray-200/70 dark:divide-gray-800 max-h-[600px] overflow-y-auto">
            {relations.map((r) => (
              <li key={r.key}>
                <button
                  type="button"
                  onClick={() => setSelectedOther(r.key)}
                  onDoubleClick={() =>
                    router.push(`/network/${encodeURIComponent(r.key)}`)
                  }
                  className="w-full flex items-center justify-between gap-3 px-4 py-2 text-left hover:bg-amber-50/40 dark:hover:bg-amber-900/10 transition-colors"
                >
                  <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
                    {r.key}
                  </span>
                  <span className="text-xs tabular-nums text-amber-700 dark:text-amber-300 font-semibold">
                    {r.value}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
