'use client';

import { useEffect, useState } from 'react';
import { FaTwitter, FaFacebook, FaLink, FaCheck } from 'react-icons/fa';

type Props = {
  title: string;
  shareLabel: string;
  shareOnTwitter: string;
  shareOnFacebook: string;
  shareOnLink: string;
};

export default function ShareButtons({
  title,
  shareLabel,
  shareOnTwitter,
  shareOnFacebook,
  shareOnLink,
}: Props) {
  const [pageUrl, setPageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

  const twitterUrl = pageUrl
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`
    : '#';
  const facebookUrl = pageUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
    : '#';

  const copyLink = async () => {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  const btnClass =
    'inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:border-amber-300 dark:hover:border-amber-500/60 hover:text-amber-600 dark:hover:text-amber-400 hover:-translate-y-0.5 hover:shadow-md transition-all';

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mr-1">
        {shareLabel}
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label={shareOnTwitter}
        title={shareOnTwitter}
      >
        <FaTwitter className="w-4 h-4" aria-hidden="true" />
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label={shareOnFacebook}
        title={shareOnFacebook}
      >
        <FaFacebook className="w-4 h-4" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        className={btnClass}
        aria-label={shareOnLink}
        title={shareOnLink}
      >
        {copied ? (
          <FaCheck className="w-4 h-4 text-amber-500" aria-hidden="true" />
        ) : (
          <FaLink className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
