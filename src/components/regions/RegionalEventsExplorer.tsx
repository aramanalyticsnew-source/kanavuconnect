"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { getRegion, isRegionId, type Region, type RegionId } from "@/content/regions";
import {
  countByStatus,
  getEventStatus,
  getEventsByRegion,
  statusLabels,
  statusOrder,
  type EventStatus,
  type KanavuEvent,
} from "@/content/events";
import { RegionMap } from "@/components/regions/RegionMap";
import { HubSelector } from "@/components/regions/HubSelector";
import { EventFilters } from "@/components/events/EventFilters";
import { EventCard } from "@/components/events/EventCard";
import { EventsEmptyState } from "@/components/events/EventsEmptyState";

type RegionalEventsExplorerProps = {
  regions: Region[];
  events: KanavuEvent[];
  defaultHub?: RegionId;
};

const isStatus = (v: string | null): v is EventStatus => !!v && (statusOrder as string[]).includes(v);
const RESULTS_ID = "regional-events-results";

/**
 * Regional Events Explorer.
 * State lives in the URL (?hub=madurai&status=upcoming) so selections are
 * shareable. Updates use the History API: no navigation, no full-page reload.
 */
export function RegionalEventsExplorer({ regions, events, defaultHub }: RegionalEventsExplorerProps) {
  const params = useSearchParams();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [now] = useState(() => new Date());
  const [mapFocus, setMapFocus] = useState<{ id: RegionId | null; request: number }>({ id: null, request: 0 });

  const hubParam = params.get("hub");
  const statusParam = params.get("status");
  const activeId: RegionId = isRegionId(hubParam) ? hubParam : (defaultHub ?? regions[0].slug);
  const activeStatus: EventStatus = isStatus(statusParam) ? statusParam : "upcoming";
  const region = getRegion(activeId) ?? regions[0];

  const updateUrl = useCallback(
    (next: { hub?: RegionId; status?: EventStatus }, mode: "push" | "replace") => {
      const qs = new URLSearchParams(window.location.search);
      if (next.hub) qs.set("hub", next.hub);
      if (next.status) qs.set("status", next.status);
      const url = `${pathname}?${qs.toString()}${window.location.hash}`;
      if (mode === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    [pathname],
  );

  const selectHub = useCallback(
    (id: RegionId) => {
      setMapFocus((current) => ({ id, request: current.request + 1 }));
      updateUrl({ hub: id }, "push");
    },
    [updateUrl],
  );
  const selectStatus = useCallback(
    (status: EventStatus) => updateUrl({ hub: activeId, status }, "replace"),
    [updateUrl, activeId],
  );

  // Per-hub totals for the selector and map badges.
  const hubCounts = useMemo(() => {
    const counts: Partial<Record<RegionId, number>> = {};
    for (const r of regions) counts[r.slug] = getEventsByRegion(r.slug, events).length;
    return counts;
  }, [regions, events]);

  // Events for the selected hub ONLY.
  const hubEvents = useMemo(() => getEventsByRegion(activeId, events), [activeId, events]);
  const statusCounts = useMemo(() => countByStatus(hubEvents, now), [hubEvents, now]);
  const visible = useMemo(
    () => hubEvents.filter((e) => getEventStatus(e, now) === activeStatus),
    [hubEvents, activeStatus, now],
  );

  const registerHref = `/contact?type=general&region=${activeId}`;
  const announcement =
    hubEvents.length === 0
      ? `${region.name}: no events scheduled yet.`
      : `Showing ${visible.length} ${statusLabels[activeStatus].toLowerCase()} ${visible.length === 1 ? "event" : "events"} in ${region.name}.`;

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div>
      <HubSelector regions={regions} activeId={activeId} onSelect={selectHub} counts={hubCounts} />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-14">
        {/* Hub panel: map + districts */}
        <aside className="min-w-0 lg:col-span-4" aria-label={`${region.name} hub`}>
          <div className="lg:sticky lg:top-28">
            <RegionMap
              regions={regions}
              activeId={activeId}
              onSelect={selectHub}
              counts={hubCounts}
              focusId={mapFocus.id}
              focusRequest={mapFocus.request}
              className="mx-auto aspect-[5/4] max-w-md sm:aspect-[4/3] lg:aspect-[4/5] lg:max-w-none"
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={region.slug} {...fade} className="mt-8">
                <p className="eyebrow flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden /> Regional hub
                </p>
                <h2 className="mt-3 text-[2.25rem] leading-tight sm:text-[2.5rem] lg:text-[2.125rem] xl:text-[2.5rem]">
                  {region.name}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {region.statedCount !== null
                    ? `${region.statedCount} districts`
                    : region.slug === "puducherry"
                      ? "Union Territory"
                      : `${region.districts.length} districts listed`}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Districts in the ${region.name} hub`}>
                  {region.districts.map((d) => (
                    <li key={d} className="border border-line bg-white px-3 py-1.5 text-xs font-medium text-charcoal">
                      {d}
                    </li>
                  ))}
                </ul>
                {region.note && <p className="mt-4 text-xs leading-relaxed text-muted">{region.note}</p>}
                <Link
                  href={registerHref}
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-maroon px-6 py-4 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ivory shadow-[0_10px_30px_-12px_rgba(107,18,8,0.55)] transition-colors hover:bg-maroon-deep hover:text-gold-bright sm:w-auto"
                >
                  Register interest · {region.name}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>

        {/* Events */}
        <section className="lg:col-span-8" aria-labelledby="regional-events-heading">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 id="regional-events-heading" className="text-[1.625rem] sm:text-[1.875rem]">
              Events in {region.name}
            </h2>
            <p className="text-xs text-muted">
              {hubEvents.length} {hubEvents.length === 1 ? "event" : "events"} in this hub
            </p>
          </div>

          {hubEvents.length > 0 && (
            <EventFilters active={activeStatus} counts={statusCounts} onChange={selectStatus} panelId={RESULTS_ID} />
          )}

          <p className="sr-only" aria-live="polite" role="status">
            {announcement}
          </p>

          <div
            id={RESULTS_ID}
            role={hubEvents.length > 0 ? "tabpanel" : undefined}
            aria-labelledby={hubEvents.length > 0 ? `event-tab-${activeStatus}` : undefined}
            className="mt-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${activeId}-${activeStatus}`} {...fade}>
                {hubEvents.length === 0 ? (
                  <EventsEmptyState
                    variant="hub"
                    regionName={region.name}
                    status={activeStatus}
                    counts={statusCounts}
                    registerHref={registerHref}
                  />
                ) : visible.length === 0 ? (
                  <EventsEmptyState
                    variant="filter"
                    regionName={region.name}
                    status={activeStatus}
                    counts={statusCounts}
                    registerHref={registerHref}
                    onShowStatus={selectStatus}
                  />
                ) : (
                  <ul className="grid gap-6 md:grid-cols-2">
                    {visible.map((event) => (
                      <li key={event.slug}>
                        <EventCard event={event} status={getEventStatus(event, now)} regionName={region.name} />
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}
