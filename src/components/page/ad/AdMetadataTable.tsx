import type { AdItem } from './data';

type Props = {
  item: AdItem;
  xmlHtml?: string;
  labels: {
    sourceInfo: string;
    ownerPast: string;
    ownerCurrent: string;
    imageUrl: string;
    imageProvider: string;
  };
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="border-b border-gray-200/70 dark:border-gray-800 last:border-0">
      <th
        scope="row"
        className="align-top text-left text-sm font-semibold text-gray-600 dark:text-gray-300 px-4 py-3 w-1/3 bg-gradient-to-r from-amber-50/60 via-orange-50/40 to-transparent dark:from-amber-900/10 dark:via-orange-900/10 dark:to-transparent"
      >
        {label}
      </th>
      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 break-words leading-relaxed">
        {children}
      </td>
    </tr>
  );
}

export default function AdMetadataTable({ item, xmlHtml, labels }: Props) {
  return (
    <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <table className="w-full">
        <tbody>
          {xmlHtml && (
            <Row label={labels.sourceInfo}>
              <div
                className="[&_br]:block [&_br]:my-1"
                dangerouslySetInnerHTML={{ __html: xmlHtml }}
              />
            </Row>
          )}
          {item.provider1 && <Row label={labels.ownerPast}>{item.provider1}</Row>}
          {item.provider2 && (
            <Row label={labels.ownerCurrent}>{item.provider2}</Row>
          )}
          {item.url && (
            <Row label={labels.imageUrl}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 dark:text-amber-400 hover:underline break-all"
              >
                {item.url}
              </a>
            </Row>
          )}
          {item.contributor && (
            <Row label={labels.imageProvider}>{item.contributor}</Row>
          )}
        </tbody>
      </table>
    </div>
  );
}
