import { Link } from '@/i18n/routing';
import { FiExternalLink, FiDownload, FiBookOpen } from 'react-icons/fi';
import type { Locale } from '@/constants/site';
import {
  FULLTEXT_MEMBERS,
  getFulltextTr,
  type FulltextMember,
} from './translations';

const GITHUB_PAGES = 'https://shibusawa-dlab.github.io/app1';

type Props = {
  locale: Locale;
};

function MemberRow({ member, locale }: { member: FulltextMember; locale: Locale }) {
  const tr = getFulltextTr(locale);
  const label = member.label[locale] ?? member.label.en;

  const cellBase =
    'px-3 py-3 md:px-4 md:py-4 text-center border-b border-gray-200 dark:border-gray-800';
  const iconLink =
    'inline-flex items-center justify-center w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors';

  return (
    <tr className="hover:bg-amber-50/30 dark:hover:bg-amber-500/[0.04] transition-colors">
      <td className={`${cellBase} text-left font-medium text-gray-900 dark:text-gray-100`}>
        <div className="flex items-start gap-2">
          <FiBookOpen
            className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
            aria-hidden
          />
          <span>{label}</span>
        </div>
      </td>
      <td className={cellBase}>
        <Link
          href={`/viewer/${member.viewer_id}`}
          className={iconLink}
          aria-label={`${tr.columns.viewer}: ${label}`}
        >
          <FiExternalLink aria-hidden />
        </Link>
      </td>
      <td className={cellBase}>
        <a
          href={`${GITHUB_PAGES}/tei/${member.viewer_id}.html`}
          target="_blank"
          rel="noopener noreferrer"
          className={iconLink}
          aria-label={`${tr.columns.html}: ${label}`}
        >
          <FiExternalLink aria-hidden />
        </a>
      </td>
      <td className={cellBase}>
        <a
          href={`${GITHUB_PAGES}/tei/${member.viewer_id}.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className={iconLink}
          aria-label={`${tr.columns.pdf}: ${label}`}
        >
          <FiExternalLink aria-hidden />
        </a>
      </td>
      <td className={cellBase}>
        <a
          href={`${GITHUB_PAGES}/tei/${member.viewer_id}.epub`}
          target="_blank"
          rel="noopener noreferrer"
          className={iconLink}
          aria-label={`${tr.columns.epub}: ${label}`}
        >
          <FiDownload aria-hidden />
        </a>
      </td>
      <td className={cellBase}>
        <a
          href={`${GITHUB_PAGES}/tei/${member.viewer_id}.xml`}
          target="_blank"
          rel="noopener noreferrer"
          className={iconLink}
          aria-label={`${tr.columns.xml}: ${label}`}
        >
          <FiDownload aria-hidden />
        </a>
      </td>
    </tr>
  );
}

export default function FulltextTable({ locale }: Props) {
  const tr = getFulltextTr(locale);

  return (
    <div className="flex flex-col gap-8">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tr.intro}</p>

      <section className="rounded-xl border border-amber-200/60 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/[0.06] p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-700 dark:text-amber-300 mb-3">
          {tr.formatsTitle}
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-200 marker:text-amber-500">
          {tr.formats.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 dark:from-amber-500/[0.12] dark:via-orange-500/[0.12] dark:to-rose-500/[0.12]">
              <th
                scope="col"
                className="px-3 py-3 md:px-4 md:py-4 text-left text-xs font-semibold tracking-[0.15em] uppercase text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800"
              >
                {tr.columns.source}
              </th>
              {(['viewer', 'html', 'pdf', 'epub', 'xml'] as const).map((k) => (
                <th
                  key={k}
                  scope="col"
                  className="px-3 py-3 md:px-4 md:py-4 text-center text-xs font-semibold tracking-[0.15em] uppercase text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800"
                >
                  {tr.columns[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FULLTEXT_MEMBERS.map((m) => (
              <MemberRow key={m.id} member={m} locale={locale} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
