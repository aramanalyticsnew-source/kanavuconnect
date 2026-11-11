"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { orderedRegions, regions, type Region } from "@/content/regions";
import { cn } from "@/lib/cn";

type RegionsExplorerProps = {
  initialSlug?: string;
  /** Show the enquiry link inside the detail panel. */
  showEnquiry?: boolean;
};

/** Schematic route linking hubs from south to north — decorative only. */
const routeOrder = ["kanyakumari", "madurai", "coimbatore", "salem", "trichy", "puducherry", "thiruvannamalai", "chennai"];

export function RegionsExplorer({ initialSlug, showEnquiry = true }: RegionsExplorerProps) {
  const fallback = orderedRegions[0];
  const [activeSlug, setActiveSlug] = useState<string>(
    regions.some((r) => r.slug === initialSlug) ? (initialSlug as string) : fallback.slug,
  );
  const active: Region = regions.find((r) => r.slug === activeSlug) ?? fallback;

  const route = routeOrder
    .map((slug) => regions.find((r) => r.slug === slug))
    .filter((r): r is Region => Boolean(r))
    .map((r) => `${r.position.x},${r.position.y}`)
    .join(" ");

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Hub list */}
      <div className="lg:col-span-4">
        <p className="eyebrow mb-4" id="hub-list-label">
          Select a regional hub
        </p>
        <ul aria-labelledby="hub-list-label" className="border-t border-line">
          {orderedRegions.map((region, i) => {
            const selected = region.slug === active.slug;
            return (
              <li key={region.slug}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveSlug(region.slug)}
                  className={cn(
                    "group flex w-full items-center justify-between border-b border-line py-4 text-left transition-colors duration-300",
                    selected ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span className="flex items-baseline gap-5">
                    <span className={cn("text-[0.7rem] font-semibold tabular-nums", selected ? "text-gold-ink" : "text-muted/70")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.3rem] sm:text-[1.4rem]">{region.name}</span>
                  </span>
                  <span
                    className={cn(
                      "h-px transition-all duration-500 ease-luxe",
                      selected ? "w-10 bg-gold" : "w-0 bg-line group-hover:w-5",
                    )}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Schematic map */}
      <div className="lg:col-span-4">
        <div className="paper relative mx-auto aspect-[3/4] w-full max-w-sm border border-line">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <polyline
              points={route}
              fill="none"
              stroke="var(--color-gold)"
              strokeOpacity="0.35"
              strokeWidth="0.35"
              strokeDasharray="1.2 1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {regions.map((region) => {
            const selected = region.slug === active.slug;
            return (
              <button
                key={region.slug}
                type="button"
                onClick={() => setActiveSlug(region.slug)}
                aria-label={`Show ${region.name} hub`}
                aria-pressed={selected}
                className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                style={{ left: `${region.position.x}%`, top: `${region.position.y}%` }}
              >
                <span className="relative flex h-3 w-3 items-center justify-center">
                  {selected && <span className="animate-pulse-ring absolute h-3 w-3 rounded-full bg-gold" />}
                  <span
                    className={cn(
                      "relative rounded-full transition-all duration-500",
                      selected ? "h-3 w-3 bg-gold" : "h-2 w-2 bg-maroon/40 group-hover:bg-gold",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                    selected ? "text-ink" : "text-muted/80",
                  )}
                >
                  {region.name}
                </span>
              </button>
            );
          })}
          <p className="absolute bottom-3 right-4 text-[0.6rem] uppercase tracking-[0.18em] text-muted/70">
            Schematic · not to scale
          </p>
        </div>
      </div>

      {/* Detail */}
      <div className="lg:col-span-4" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden /> Regional hub
            </p>
            <h3 className="mt-4 text-[2.5rem] lg:text-[2rem] xl:text-[2.125rem] 2xl:text-[2.5rem]">{active.name}</h3>
            <p className="mt-3 text-sm text-muted">
              {active.statedCount !== null
                ? `${active.statedCount} districts`
                : active.slug === "puducherry"
                  ? "Union Territory"
                  : `${active.districts.length} districts listed`}
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-line">
              {active.districts.map((district) => (
                <li key={district} className="border-b border-line py-3 text-sm text-ink">
                  {district}
                </li>
              ))}
            </ul>

            {active.note && <p className="mt-6 text-sm leading-relaxed text-muted">{active.note}</p>}

            <p className="mt-6 text-xs leading-relaxed text-muted/80">
              Venue and date: to be confirmed.
            </p>

            {showEnquiry && (
              <Link
                href={`/contact?type=general&region=${active.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-charcoal underline decoration-gold decoration-1 underline-offset-8 transition-colors hover:text-gold-ink"
              >
                Register interest for {active.name}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
