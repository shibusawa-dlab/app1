'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiList, FiInfo, FiX, FiArrowLeft } from 'react-icons/fi';
import { Link } from '@/i18n/routing';
import { TEI_CDN_BASE, type ViewerMessages } from './translations';

// CETEIcean is loaded at runtime via a CDN script. The library exposes a
// global `CETEI` constructor. An npm package exists (`ceteicean`) but has an
// unusual capitalised name and sparse typings, so we stay with the CDN-script
// approach used by the legacy Nuxt plugin (backup/plugins/cetei.js) for now.
declare global {
  interface Window {
    CETEI?: new () => {
      addBehaviors: (behaviors: Record<string, unknown>) => void;
      getHTML5: (url: string, cb: (data: DocumentFragment) => void) => void;
    };
  }
}

const CETEICEAN_CDN =
  'https://cdn.jsdelivr.net/npm/CETEIcean@1.9.4/dist/CETEI.min.js';

function loadCeteicean(): Promise<typeof window.CETEI> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('window unavailable'));
      return;
    }
    if (window.CETEI) {
      resolve(window.CETEI);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-cetei-loader="1"]`
    );
    if (existing) {
      existing.addEventListener('load', () => resolve(window.CETEI));
      existing.addEventListener('error', () => reject(new Error('CETEIcean failed to load')));
      return;
    }
    const script = document.createElement('script');
    script.src = CETEICEAN_CDN;
    script.async = true;
    script.dataset.ceteiLoader = '1';
    script.onload = () => resolve(window.CETEI);
    script.onerror = () => reject(new Error('CETEIcean failed to load'));
    document.head.appendChild(script);
  });
}

type MenuItem = { label: string; id: string; children?: MenuItem[] };

function buildMenu(xmlRoot: Element | DocumentFragment | null): MenuItem[] {
  if (!xmlRoot) return [];
  const text = xmlRoot.querySelector('tei-text');
  if (!text) return [];
  const type = text.getAttribute('type');

  const pickChildren = (element: Element): MenuItem[] => {
    const menu: MenuItem[] = [];
    const front = element.querySelector(':scope > tei-front');
    if (front) {
      for (const child of Array.from(front.children)) {
        const id = child.getAttribute('xml:id');
        const head = child.querySelector('tei-head');
        if (id && head) {
          menu.push({ label: head.textContent ?? '', id });
        }
      }
    }
    const group = element.querySelector(':scope > tei-group');
    if (group) {
      for (const child of Array.from(group.children)) {
        const id = child.getAttribute('xml:id');
        if (!id) continue;
        const head = child.querySelector('tei-head');
        menu.push({ label: head?.textContent ?? 'No Title', id });
      }
    }
    return menu;
  };

  if (type === 'diary') {
    return pickChildren(text);
  }
  if (type === 'volume') {
    const menu: MenuItem[] = [];
    const front = text.querySelector(':scope > tei-front');
    if (front) {
      for (const child of Array.from(front.children)) {
        const id = child.getAttribute('xml:id');
        const head = child.querySelector('tei-head');
        if (id && head) {
          menu.push({ label: head.textContent ?? '', id });
        }
      }
    }
    const group = text.querySelector(':scope > tei-group');
    if (group) {
      const groupChildren = Array.from(group.children);
      const diary = groupChildren[0];
      const schedule = groupChildren[2];
      if (diary) {
        menu.push({ label: '日記', id: 'diary', children: pickChildren(diary) });
      }
      if (schedule) {
        menu.push({
          label: '日時通知表',
          id: 'schedule',
          children: pickChildren(schedule),
        });
      }
    }
    return menu;
  }
  return [];
}

export default function TeiViewer({
  id,
  messages,
}: {
  id: string;
  messages: ViewerMessages;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [metadataHtml, setMetadataHtml] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [metadataOpen, setMetadataOpen] = useState(false);

  const teiUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      const u = new URLSearchParams(window.location.search).get('u');
      if (u) return u;
    }
    return `${TEI_CDN_BASE}/tei/${id}.xml`;
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    loadCeteicean()
      .then((CETEI) => {
        if (!CETEI || !containerRef.current) return;
        const instance = new CETEI();
        instance.addBehaviors({ tei: { graphic() {} } });
        instance.getHTML5(teiUrl, (data) => {
          if (cancelled || !containerRef.current) return;

          // Clear prior render.
          containerRef.current.innerHTML = '';
          // `data` is a DocumentFragment in CETEIcean 1.9.x.
          const frag = data as unknown as DocumentFragment;
          containerRef.current.appendChild(frag);

          const rootEl = containerRef.current;
          const teiTitle = rootEl.querySelector('tei-title');
          if (teiTitle) setTitle(teiTitle.textContent ?? '');

          setMenu(buildMenu(rootEl));

          const header = rootEl.querySelector('tei-teiheader');
          if (header) {
            setMetadataHtml(header.outerHTML);
          }

          setLoading(false);
        });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [teiUrl]);

  const scrollTo = useCallback((targetId: string) => {
    if (!containerRef.current) return;
    const el = containerRef.current.querySelector(`#${CSS.escape(targetId)}`);
    if (el && 'scrollIntoView' in el) {
      (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  }, []);

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-3 shadow-sm">
        <Link
          href="/viewer"
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-800 dark:text-gray-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-200"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          {messages.backToList}
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-800 dark:text-gray-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-200"
          aria-label={menuOpen ? messages.closeMenu : messages.openMenu}
        >
          <FiList className="h-4 w-4" aria-hidden />
          {messages.contents}
        </button>

        <div className="mx-2 flex-1 truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
          {title || id}
        </div>

        <button
          type="button"
          onClick={() => setMetadataOpen((v) => !v)}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-800 dark:text-gray-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-200"
          aria-label={metadataOpen ? messages.closeMetadata : messages.openMetadata}
        >
          <FiInfo className="h-4 w-4" aria-hidden />
          {messages.metadata}
        </button>
      </div>

      {loading && (
        <div className="rounded-xl border border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10 p-10 text-center">
          <p className="font-semibold text-amber-800 dark:text-amber-200">
            {messages.loading}
          </p>
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
            {messages.loadingHint}
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-xl border border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20 p-6 text-rose-800 dark:text-rose-200">
          <p className="font-semibold">{messages.loadFailed}</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      <div className={loading ? 'hidden' : 'block'}>
        {/* TEI body */}
        <div
          ref={containerRef}
          id="tei"
          className="tei-body rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm max-h-[75vh] overflow-y-auto leading-loose"
        />
      </div>

      {/* Menu drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-80 transform border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl transition-transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-3">
          <h3 className="text-sm font-bold">{messages.contents}</h3>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={messages.closeMenu}
          >
            <FiX className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <nav className="max-h-[calc(100vh-3rem)] overflow-y-auto p-2 text-sm">
          {menu.map((item) => (
            <MenuEntry key={item.id} item={item} onSelect={scrollTo} />
          ))}
        </nav>
      </aside>

      {/* Metadata drawer */}
      {metadataOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm"
          onClick={() => setMetadataOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-96 max-w-full transform border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl transition-transform ${
          metadataOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-3">
          <h3 className="text-sm font-bold">{messages.metadata}</h3>
          <button
            type="button"
            onClick={() => setMetadataOpen(false)}
            className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={messages.closeMetadata}
          >
            <FiX className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div
          className="max-h-[calc(100vh-3rem)] overflow-y-auto p-4 text-xs leading-relaxed tei-metadata"
          dangerouslySetInnerHTML={{
            __html: metadataHtml || `<p>${messages.noMetadata}</p>`,
          }}
        />
      </aside>

      <style
        // Injected once per viewer mount. Scoped via `#tei` / `.tei-metadata`.
        dangerouslySetInnerHTML={{
          __html: `
            #tei tei-persname { background-color: #ffccbc; padding: 0 2px; border-radius: 2px; }
            #tei tei-placename { background-color: #c8e6c9; padding: 0 2px; border-radius: 2px; }
            #tei tei-date { background-color: #bbdefb; padding: 0 2px; border-radius: 2px; }
            #tei tei-time { background-color: #fff9c4; padding: 0 2px; border-radius: 2px; }
            #tei tei-head { display: block; margin: 1.25rem 0; font-size: 1.125rem; font-weight: 700; }
            :is(.dark) #tei tei-persname { background-color: rgb(180, 80, 60); color: #fff; }
            :is(.dark) #tei tei-placename { background-color: rgb(60, 140, 80); color: #fff; }
            :is(.dark) #tei tei-date { background-color: rgb(60, 100, 160); color: #fff; }
            :is(.dark) #tei tei-time { background-color: rgb(180, 160, 60); color: #111; }
            .tei-metadata tei-encodingdesc,
            .tei-metadata tei-publicationstmt,
            .tei-metadata tei-publicationstmt > *,
            .tei-metadata tei-sourcedesc { display: block; margin-bottom: 0.5rem; }
          `,
        }}
      />
    </div>
  );
}

function MenuEntry({
  item,
  onSelect,
}: {
  item: MenuItem;
  onSelect: (id: string) => void;
}) {
  if (item.children && item.children.length > 0) {
    return (
      <details className="group mb-1 rounded-md" open>
        <summary className="cursor-pointer list-none rounded-md px-2 py-1 font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/30">
          {item.label}
        </summary>
        <div className="ml-2 border-l border-gray-200 dark:border-gray-800 pl-2">
          {item.children.map((c) => (
            <MenuEntry key={c.id} item={c} onSelect={onSelect} />
          ))}
        </div>
      </details>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className="block w-full truncate rounded-md px-2 py-1 text-left hover:bg-amber-50 dark:hover:bg-amber-900/30"
    >
      {item.label || item.id}
    </button>
  );
}
