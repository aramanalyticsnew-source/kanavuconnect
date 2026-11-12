"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/content/media";
import { cn } from "@/lib/cn";

type GalleryProps = { items: GalleryItem[]; categories?: GalleryCategory[] };

export function Gallery({ items, categories = [] }: GalleryProps) {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const current = index !== null ? visible[index] : null;

  return (
    <div>
      {categories.length > 0 && (
      <div role="group" aria-label="Filter gallery" className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-line">
        {(["All", ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={filter === cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "relative pb-4 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors",
              filter === cat ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {cat}
            {filter === cat && (
              <motion.span layoutId="gallery-filter" className="absolute inset-x-0 -bottom-px h-px bg-gold" />
            )}
          </button>
        ))}
      </div>
      )}

      <motion.ul layout className="grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[16rem] lg:grid-cols-3 lg:auto-rows-[18rem]">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.li
              layout
              key={item.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                item.span === "tall" && "sm:row-span-2",
                item.span === "wide" && "sm:col-span-2",
              )}
            >
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
                className="paper group relative block h-full w-full overflow-hidden text-left"
                aria-label={`Open image: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-linear-to-t from-maroon-ink/70 via-maroon-ink/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-ivory">
                  <span>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-display text-[1.125rem]">{item.caption}</span>
                  </span>
                  <Expand className="h-4 w-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" strokeWidth={1.5} aria-hidden />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${index + 1} of ${visible.length}: ${current.caption}`}
            className="fixed inset-0 z-[70] flex flex-col bg-maroon-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <div className="flex items-center justify-between px-6 py-5 text-ivory/70 sm:px-10">
              <p className="text-xs font-semibold tabular-nums tracking-[0.2em]">
                {String(index + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center text-ivory transition-colors hover:text-gold-soft"
              >
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>

            <div className="relative flex-1 px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.src}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold-soft sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold-soft sm:right-6"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>

            <div className="px-6 py-6 text-center sm:px-10" onClick={(e) => e.stopPropagation()}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">{current.category}</p>
              <p className="mt-1 font-display text-[1.3rem] text-ivory">{current.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
