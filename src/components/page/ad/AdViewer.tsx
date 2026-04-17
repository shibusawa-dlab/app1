'use client';

import dynamic from 'next/dynamic';

const OpenSeadragonViewer = dynamic(() => import('./OpenSeadragonViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-xl border border-gray-200/70 dark:border-gray-800 bg-gray-900" />
  ),
});

type Props = {
  manifestUrl: string;
  label?: string;
  loadingLabel: string;
};

export default function AdViewer(props: Props) {
  return <OpenSeadragonViewer {...props} />;
}
