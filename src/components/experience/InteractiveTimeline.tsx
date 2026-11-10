"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Stage } from "@/content/experience";
import { cn } from "@/lib/cn";

/**
 * Seven-stage evening timeline. Desktop: horizontal rail with a detail panel.
 * Mobile: the same tabs stack vertically. Implements the WAI-ARIA tabs pattern.
 */
export function InteractiveTimeline({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = stages[active];
  const progress = stages.length > 1 ? active / (stages.length - 1) : 1;

  const select = (index: number) => {
    const next = (index + stages.length) % stages.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(stages.length - 1);
    }
  };

  return (
    <div>
      {/* Rail */}
      <div className="relative">
        <div className="absolute left-[1.15rem] top-0 h-full w-px bg-line lg:left-0 lg:top-[1.15rem] lg:h-px lg:w-full" aria-hidden />
        <motion.div
          className="absolute left-[1.15rem] top-0 w-px origin-top bg-gold lg:hidden"
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
        <motion.div
          className="absolute left-0 top-[1.15rem] hidden h-px origin-left bg-gold lg:block"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />

        <div
          role="tablist"
          aria-label="Event stages"
          aria-orientation="horizontal"
          className="relative grid gap-6 lg:grid-cols-7 lg:gap-4"
        >
          {stages.map((stage, i) => {
            const selected = i === active;
            const passed = i <= active;
            return (
              <button
                key={stage.number}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`stage-tab-${i}`}
                aria-selected={selected}
                aria-controls="stage-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className="group flex items-center gap-5 text-left lg:flex-col lg:items-start lg:gap-5"
              >
                <span
                  className={cn(
                    "relative flex h-[2.3rem] w-[2.3rem] shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-semibold transition-all duration-500",
                    selected
                      ? "border-maroon bg-maroon text-gold-bright"
                      : passed
                        ? "border-gold bg-ivory text-gold-ink"
                        : "border-line bg-ivory text-muted group-hover:border-gold",
                  )}
                >
                  {stage.number}
                </span>
                <span
                  className={cn(
                    "font-display text-xl leading-tight transition-colors duration-300 lg:text-[1.15rem] xl:text-xl",
                    selected ? "text-ink" : "text-muted group-hover:text-ink",
                  )}
                >
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel */}
      <div
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active}`}
        className="mt-14 grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:items-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 lg:col-span-10 lg:grid-cols-10 lg:items-baseline"
          >
            <p className="font-display text-7xl leading-none text-gold/70 lg:col-span-2 lg:text-8xl">{current.number}</p>
            <div className="lg:col-span-8">
              <h3 className="text-3xl sm:text-4xl">{current.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{current.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-3 lg:col-span-2 lg:justify-end">
          <button
            type="button"
            onClick={() => setActive((active - 1 + stages.length) % stages.length)}
            aria-label="Previous stage"
            className="flex h-12 w-12 items-center justify-center border border-line text-charcoal transition-colors hover:border-gold hover:text-gold-ink"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={() => setActive((active + 1) % stages.length)}
            aria-label="Next stage"
            className="flex h-12 w-12 items-center justify-center border border-line text-charcoal transition-colors hover:border-gold hover:text-gold-ink"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </div>
  );
}
