"use client";

import { motion } from "framer-motion";
import { useRef, type KeyboardEvent } from "react";
import { statusLabels, statusOrder, type EventStatus } from "@/content/events";
import { cn } from "@/lib/cn";

type EventFiltersProps = {
  active: EventStatus;
  counts: Record<EventStatus, number>;
  onChange: (status: EventStatus) => void;
  /** id of the results panel these tabs control. */
  panelId: string;
};

/** Upcoming / Ongoing / Completed tabs (WAI-ARIA tabs pattern with arrow-key support). */
export function EventFilters({ active, counts, onChange, panelId }: EventFiltersProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % statusOrder.length;
    if (e.key === "ArrowLeft") next = (index - 1 + statusOrder.length) % statusOrder.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = statusOrder.length - 1;
    if (next >= 0) {
      e.preventDefault();
      onChange(statusOrder[next]);
      refs.current[next]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Filter events by status"
      className="flex min-w-0 flex-nowrap gap-6 overflow-x-auto border-b border-line [scrollbar-width:none] sm:gap-8"
    >
      {statusOrder.map((status, i) => {
        const selected = status === active;
        return (
          <button
            key={status}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`event-tab-${status}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(status)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative flex shrink-0 items-center gap-2 pb-4 text-[0.75rem] font-bold uppercase tracking-[0.16em] transition-colors",
              selected ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {statusLabels[status]}
            <span
              className={cn(
                "rounded-full px-1.5 text-[0.65rem] tabular-nums",
                selected ? "bg-maroon text-ivory" : "bg-ivory-deep text-muted",
              )}
            >
              {counts[status]}
            </span>
            {selected && (
              <motion.span
                layoutId="event-filter-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-gold"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
