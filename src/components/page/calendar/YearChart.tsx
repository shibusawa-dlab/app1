import type { YearsData } from './CalendarGrid';

// Lightweight bar chart (column chart) using plain SVG/divs, no external deps.
// Replaces the vue-google-charts ColumnChart from the legacy site.

export default function YearChart({ data }: { data: YearsData }) {
  const yearKeys = Object.keys(data)
    .map((y) => Number(y))
    .filter((y) => !Number.isNaN(y));
  if (yearKeys.length === 0) return null;

  const minYear = Math.min(...yearKeys);
  const maxYear = Math.max(...yearKeys);

  const rows: { year: number; count: number }[] = [];
  for (let y = minYear; y <= maxYear; y++) {
    let freq = 0;
    const months = data[String(y)];
    if (months) {
      for (const m in months) freq += months[m];
    }
    rows.push({ year: y, count: freq });
  }

  const max = Math.max(1, ...rows.map((r) => r.count));

  return (
    <div className="rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-white dark:bg-gray-900 p-5 md:p-6 shadow-sm">
      <div className="flex items-stretch gap-[2px] h-44 md:h-56">
        {rows.map((r) => {
          const h = (r.count / max) * 100;
          return (
            <div
              key={r.year}
              className="flex-1 flex flex-col justify-end group"
              title={`${r.year}: ${r.count}`}
            >
              <div
                className="w-full rounded-t bg-gradient-to-t from-amber-400 to-orange-500 dark:from-amber-500 dark:to-rose-500 group-hover:from-amber-500 group-hover:to-rose-500 transition-colors"
                style={{ height: `${h}%`, minHeight: r.count > 0 ? '2px' : '0' }}
                aria-hidden
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
        <span>{rows[0].year}</span>
        <span>{rows[Math.floor(rows.length / 2)].year}</span>
        <span>{rows[rows.length - 1].year}</span>
      </div>
    </div>
  );
}
