"use client";

import { useState } from "react";
import { orderedRegions, regionStats, type RegionId } from "@/content/regions";
import { RegionMap } from "@/components/regions/RegionMap";

export function HeroVisual() {
  const [activeId, setActiveId] = useState<RegionId>("chennai");
  const [focusRequest, setFocusRequest] = useState(0);

  const selectHub = (id: RegionId) => {
    setActiveId(id);
    setFocusRequest((request) => request + 1);
  };

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-maroon-deep sm:aspect-square lg:aspect-[4/5]">
      <RegionMap
        regions={orderedRegions}
        activeId={activeId}
        onSelect={selectHub}
        focusId={activeId}
        focusRequest={focusRequest}
        className="hero-regional-map absolute inset-0 z-0 h-full w-full border-0"
      />

      <div className="pointer-events-none absolute inset-0 z-[400] bg-linear-to-t from-maroon-ink/75 via-transparent to-maroon-ink/10" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[500] flex items-end justify-between gap-6 border-t border-gold/25 bg-maroon-ink/75 p-6 backdrop-blur-sm sm:p-8">
        <p className="max-w-[15rem] font-display text-[1.3rem] leading-tight text-ivory sm:text-[1.45rem]">
          Curated evenings across eight regions
        </p>
        <dl className="flex gap-6 text-right">
          <div className="flex flex-col-reverse">
            <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ivory/70">Districts</dt>
            <dd className="font-display text-[1.625rem] font-semibold text-gold-bright">{regionStats.districts}</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ivory/70">Per evening</dt>
            <dd className="font-display text-[1.625rem] font-semibold text-gold-bright">
              {regionStats.participantsPerEvent}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
