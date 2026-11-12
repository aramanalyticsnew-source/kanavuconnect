import { notFound, redirect } from "next/navigation";
import { isRegionId, regionIds } from "@/content/regions";

type Params = { regionId: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return regionIds.map((regionId) => ({ regionId }));
}

/** Friendly hub URLs (/regions/madurai) open the explorer with that hub selected. */
export default async function RegionPage({ params }: { params: Promise<Params> }) {
  const { regionId } = await params;
  if (!isRegionId(regionId)) notFound();
  redirect(`/regions?hub=${regionId}`);
}
