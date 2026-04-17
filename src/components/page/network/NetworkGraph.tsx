'use client';

import { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';
import type { Options } from 'vis-network/standalone';

export type GraphNode = {
  id: string;
  label: string;
  count: number;
};

export type GraphEdge = {
  from: string;
  to: string;
  value: number;
};

type Props = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  focusId?: string;
  onSelectNode?: (id: string | null) => void;
  onDoubleClickNode?: (id: string) => void;
};

const OPTIONS: Options = {
  nodes: {
    shape: 'dot',
    borderWidth: 2,
    borderWidthSelected: 4,
    color: {
      background: '#fef3c7',
      border: '#d97706',
      highlight: {
        background: '#fde68a',
        border: '#b45309',
      },
    },
    font: {
      color: '#1f2937',
      size: 14,
    },
  },
  edges: {
    color: { color: '#d1d5db', highlight: '#ea580c', hover: '#f59e0b' },
    smooth: { enabled: true, type: 'continuous', roundness: 0.2 },
    scaling: {
      min: 1,
      max: 6,
    },
  },
  physics: {
    enabled: true,
    timestep: 0.3,
    stabilization: { iterations: 200 },
    barnesHut: {
      gravitationalConstant: -3000,
      centralGravity: 0.2,
      springLength: 120,
      springConstant: 0.04,
    },
  },
  layout: { randomSeed: 2 },
  interaction: { hover: true, tooltipDelay: 150 },
};

export default function NetworkGraph({
  nodes,
  edges,
  focusId,
  onSelectNode,
  onDoubleClickNode,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const networkRef = useRef<Network | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const visNodes = nodes.map((n) => {
      const isFocus = focusId && n.id === focusId;
      return {
        id: n.id,
        label: n.label,
        value: n.count,
        title: `${n.label}: ${n.count}`,
        color: isFocus
          ? {
              background: '#fca5a5',
              border: '#b91c1c',
              highlight: { background: '#fecaca', border: '#991b1b' },
            }
          : undefined,
      };
    });
    const visEdges = edges.map((e, i) => ({
      id: i,
      from: e.from,
      to: e.to,
      value: e.value,
      title: `${e.from} — ${e.to}: ${e.value}`,
    }));

    const network = new Network(
      containerRef.current,
      { nodes: visNodes, edges: visEdges },
      OPTIONS
    );
    networkRef.current = network;

    // Stop physics after stabilization to reduce CPU
    network.once('stabilizationIterationsDone', () => {
      network.setOptions({ physics: { enabled: false } });
    });
    // Safety timer
    const timer = window.setTimeout(() => {
      try {
        network.stopSimulation();
        network.setOptions({ physics: { enabled: false } });
      } catch {
        /* noop */
      }
    }, 6000);

    network.on('click', (params: { nodes: (string | number)[] }) => {
      const id = params.nodes.length > 0 ? String(params.nodes[0]) : null;
      onSelectNode?.(id);
    });
    network.on('doubleClick', (params: { nodes: (string | number)[] }) => {
      if (params.nodes.length > 0) onDoubleClickNode?.(String(params.nodes[0]));
    });

    return () => {
      window.clearTimeout(timer);
      network.destroy();
      networkRef.current = null;
    };
  }, [nodes, edges, focusId, onSelectNode, onDoubleClickNode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] rounded-xl bg-amber-50/40 dark:bg-gray-950/40"
    />
  );
}
