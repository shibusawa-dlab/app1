'use client';

import dynamic from 'next/dynamic';
import type { ViewerMessages } from '@/components/page/viewer/translations';

const TeiViewer = dynamic(() => import('@/components/page/viewer/TeiViewer'), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10 p-10 text-center text-amber-800 dark:text-amber-200">
      Loading viewer…
    </div>
  ),
});

export default function TeiViewerClient({
  id,
  messages,
}: {
  id: string;
  messages: ViewerMessages;
}) {
  return <TeiViewer id={id} messages={messages} />;
}
