"use client";

import { useSearchParams } from "next/navigation";
import { RegionsExplorer } from "@/components/regions/RegionsExplorer";

/** Reads ?hub=<slug> so footer links can deep-link to a hub. Wrap in <Suspense>. */
export function RegionsExplorerFromParams() {
  const params = useSearchParams();
  const hub = params.get("hub") ?? undefined;
  return <RegionsExplorer key={hub ?? "default"} initialSlug={hub} />;
}
