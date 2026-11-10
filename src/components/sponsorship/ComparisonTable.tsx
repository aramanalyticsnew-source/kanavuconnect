import { Check, Minus } from "lucide-react";
import { comparison, tierShortNames } from "@/content/sponsorship";

export function ComparisonTable() {
  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[46rem] border-collapse text-sm">
        <caption className="sr-only">Sponsorship benefits by tier</caption>
        <thead>
          <tr className="border-b border-maroon/25">
            <th scope="col" className="sticky left-0 bg-white py-5 pr-6 text-left text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
              Benefit
            </th>
            {tierShortNames.map((name) => (
              <th key={name} scope="col" className="px-2 py-5 text-center font-display text-lg font-semibold text-ink">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.benefit} className="border-b border-line transition-colors hover:bg-ivory">
              <th scope="row" className="sticky left-0 bg-white py-4 pr-6 text-left font-semibold text-charcoal">
                {row.benefit}
              </th>
              {row.included.map((included, i) => (
                <td key={tierShortNames[i]} className="px-2 py-4 text-center">
                  {included ? (
                    <Check className="mx-auto h-4 w-4 text-gold-ink" strokeWidth={2} aria-label="Included" />
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-line" strokeWidth={2} aria-label="Not included" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
