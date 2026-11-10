"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Tier } from "@/content/sponsorship";
import { cn } from "@/lib/cn";

/** Sponsorship tiers as an accessible single-open accordion. Opens the tier named in the URL hash. */
export function TierAccordion({ tiers }: { tiers: Tier[] }) {
  const [open, setOpen] = useState<string | null>(tiers[0]?.slug ?? null);

  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.replace("#", "");
      if (tiers.some((t) => t.slug === slug)) setOpen(slug);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tiers]);

  return (
    <div className="border-t border-line">
      {tiers.map((tier) => {
        const isOpen = open === tier.slug;
        const panelId = `tier-panel-${tier.slug}`;
        const buttonId = `tier-button-${tier.slug}`;
        return (
          <div key={tier.slug} id={tier.slug} className="scroll-mt-32 border-b border-line">
            <h3 className="font-sans">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : tier.slug)}
                className="group grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-4 py-8 text-left sm:grid-cols-[4.5rem_1fr_auto] sm:gap-6"
              >
                <span className="font-display text-2xl italic text-gold">{tier.rank}</span>
                <span>
                  <span
                    className={cn(
                      "block font-display text-3xl leading-tight transition-colors sm:text-4xl",
                      isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink",
                    )}
                  >
                    {tier.name}
                  </span>
                  <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted">{tier.positioning}</span>
                </span>
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ease-luxe",
                    isOpen ? "rotate-45 border-maroon bg-maroon text-gold-bright" : "border-line text-charcoal group-hover:border-gold",
                  )}
                  aria-hidden
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-x-10 gap-y-10 pb-12 sm:grid-cols-2 sm:pl-[6rem] lg:grid-cols-3">
                    {tier.groups.map((group) => (
                      <div key={group.title}>
                        <p className="eyebrow">{group.title}</p>
                        <ul className="mt-4 space-y-2.5">
                          {group.items.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal">
                              <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-gold" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="sm:col-span-2 lg:col-span-3">
                      <Link
                        href={`/contact?type=sponsorship&tier=${tier.slug}`}
                        className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-charcoal underline decoration-gold underline-offset-8 hover:text-gold-ink"
                      >
                        Enquire about {tier.name}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
