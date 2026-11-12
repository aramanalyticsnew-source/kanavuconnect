"use client";

import { motion } from "framer-motion";
import type { Region, RegionId } from "@/content/regions";
import { cn } from "@/lib/cn";

type HubSelectorProps = {
  regions: Region[];
  activeId: RegionId;
  onSelect: (id: RegionId) => void;
  counts?: Partial<Record<RegionId, number>>;
};

/** Horizontal, scrollable row of hub buttons (wraps on large screens). */
export function HubSelector({ regions, activeId, onSelect, counts }: HubSelectorProps) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul aria-label="Regional hubs" className="flex min-w-max gap-2 lg:min-w-0 lg:flex-wrap">
        {regions.map((region) => {
          const selected = region.slug === activeId;
          const count = counts?.[region.slug] ?? 0;
          return (
            <li key={region.slug}>
              <button
                type="button"
                onClick={() => onSelect(region.slug)}
                aria-pressed={selected}
                className={cn(
                  "relative flex items-center gap-2.5 border px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                  selected
                    ? "border-maroon text-ivory"
                    : "border-line bg-white text-charcoal hover:border-gold hover:text-ink",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="hub-selector-active"
                    className="absolute inset-0 bg-maroon"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    aria-hidden
                  />
                )}
                <span className="relative">{region.name}</span>
                <span
                  className={cn(
                    "relative min-w-5 rounded-full px-1.5 text-center text-[0.65rem] font-bold tabular-nums",
                    selected ? "bg-ivory/15 text-gold-soft" : "bg-ivory-deep text-muted",
                  )}
                >
                  <span className="sr-only">, </span>
                  {count}
                  <span className="sr-only"> {count === 1 ? "event" : "events"}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
