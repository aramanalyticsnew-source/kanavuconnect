"use client";

import dynamic from "next/dynamic";
import type { Region, RegionId } from "@/content/regions";
import { cn } from "@/lib/cn";

type RegionMapProps = {
  regions: Region[];
  activeId: RegionId;
  onSelect: (id: RegionId) => void;
  counts?: Partial<Record<RegionId, number>>;
  focusId: RegionId | null;
  focusRequest: number;
  className?: string;
};

const LeafletRegionMap = dynamic(() => import("./LeafletRegionMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-ivory-deep" aria-hidden />,
});

export function RegionMap({ regions, activeId, onSelect, counts, focusId, focusRequest, className }: RegionMapProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden border border-line bg-ivory-deep", className)}
      aria-label="Interactive map of regional hubs in Tamil Nadu and Puducherry"
    >
      <LeafletRegionMap
        regions={regions}
        activeId={activeId}
        onSelect={onSelect}
        counts={counts}
        focusId={focusId}
        focusRequest={focusRequest}
      />
    </div>
  );
}
