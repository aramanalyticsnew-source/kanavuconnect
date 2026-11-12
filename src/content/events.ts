/**
 * Regional events.
 *
 * DATA RULES
 * - Every event belongs to exactly one hub via `regionId` (type-checked against
 *   `RegionId`). Events are never shared or copied between regions.
 * - Each event is a separate record, so a hub can have any number of events and
 *   each can be updated independently.
 * - Never invent dates, venues, attendance, registration URLs or completed events.
 *   Unknown values stay `null` and render as "to be announced".
 *
 * DEVELOPMENT PLACEHOLDERS
 * The reference site plans one regional networking dinner per hub (eight regional
 * events) but publishes no dates or venues. Each hub therefore has one planned
 * dinner marked `placeholder: true`. Placeholders show a visible notice, are
 * excluded from structured data and are marked `noindex`.
 * To publish a real event: set `placeholder: false` and fill in `startDate`,
 * `endDate` and `venue` (and `registrationUrl` if there is one).
 */

import type { RegionId } from "@/content/regions";
import { eventPhotos, type Photo } from "@/content/media";

export type EventStatus = "upcoming" | "ongoing" | "completed";
export type EventCategory = "Networking Dinner" | "Founder Connect" | "Investor Connect" | "Workshop";

export type EventVenue = {
  name: string;
  address?: string;
  city?: string;
};

export type KanavuEvent = {
  /** Unique across all regions; used in the detail URL. */
  slug: string;
  /** The single hub this event belongs to. */
  regionId: RegionId;
  title: string;
  category: EventCategory;
  summary: string;
  description: string[];
  /** ISO 8601 with offset, e.g. "2027-02-14T18:00:00+05:30". null = not announced. */
  startDate: string | null;
  endDate: string | null;
  venue: EventVenue | null;
  image: Pick<Photo, "src" | "alt">;
  registrationUrl: string | null;
  /** Status to show while dates are unknown. Ignored once `startDate` is set. */
  plannedStatus: EventStatus;
  /** Development placeholder: not a confirmed, published event. */
  placeholder: boolean;
  /** ISO date of the last edit to this record. */
  updatedAt: string;
};

export const statusOrder: EventStatus[] = ["upcoming", "ongoing", "completed"];

export const statusLabels: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  completed: "Completed",
};

/** Shared, factual description of the regional dinner format (source: reference About page). */
const dinnerDescription = (hub: string) => [
  `A curated evening of business networking for the ${hub} region, bringing together business owners, founders, investors, mentors, startups, bankers, government representatives and media.`,
  "The evening follows Kanavu Connect's seven-stage format: welcome and registration, opening ceremony, chief and special guest session, founder and business connect, investor and startup connect, business networking and matchmaking, and a networking dinner.",
];

const placeholderDinner = (
  regionId: RegionId,
  hub: string,
  image: Pick<Photo, "src" | "alt">,
): KanavuEvent => ({
  slug: `${regionId}-regional-networking-dinner`,
  regionId,
  title: `${hub} Regional Networking Dinner`,
  category: "Networking Dinner",
  summary: `The planned Kanavu Connect regional evening for the ${hub} hub. Date and venue to be announced.`,
  description: dinnerDescription(hub),
  startDate: null,
  endDate: null,
  venue: null,
  image,
  registrationUrl: null,
  plannedStatus: "upcoming",
  placeholder: true,
  updatedAt: "2026-11-12",
});

/**
 * One record per event. Keep events grouped by hub for readability; the
 * `regionId` field — not the position in this list — decides the hub.
 */
export const events: KanavuEvent[] = [
  placeholderDinner("kanyakumari", "Kanyakumari", eventPhotos.venueArrivals),
  placeholderDinner("madurai", "Madurai", eventPhotos.networkingCircle),
  placeholderDinner("trichy", "Trichy", eventPhotos.panelSession),
  placeholderDinner("coimbatore", "Coimbatore", eventPhotos.sponsorWall),
  placeholderDinner("salem", "Salem", eventPhotos.audienceFrontRow),
  placeholderDinner("thiruvannamalai", "Thiruvannamalai", eventPhotos.lampLighting),
  placeholderDinner("chennai", "Chennai", eventPhotos.stageAddress),
  placeholderDinner("puducherry", "Puducherry", eventPhotos.guestConversation),
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Default length used to decide "ongoing" when an event has a start but no end time. */
const DEFAULT_DURATION_MS = 5 * 60 * 60 * 1000;

export function getEventStatus(event: KanavuEvent, now: Date = new Date()): EventStatus {
  if (!event.startDate) return event.plannedStatus;
  const start = new Date(event.startDate).getTime();
  const end = event.endDate ? new Date(event.endDate).getTime() : start + DEFAULT_DURATION_MS;
  const t = now.getTime();
  if (t < start) return "upcoming";
  if (t <= end) return "ongoing";
  return "completed";
}

/** Events for one hub only. */
export function getEventsByRegion(regionId: RegionId, list: KanavuEvent[] = events): KanavuEvent[] {
  return list.filter((e) => e.regionId === regionId).sort(compareEvents);
}

export function getEvent(regionId: string, slug: string, list: KanavuEvent[] = events): KanavuEvent | undefined {
  // Both must match: an event slug requested under another hub is not found.
  return list.find((e) => e.slug === slug && e.regionId === regionId);
}

export function countByStatus(list: KanavuEvent[], now: Date = new Date()): Record<EventStatus, number> {
  const counts: Record<EventStatus, number> = { upcoming: 0, ongoing: 0, completed: 0 };
  for (const e of list) counts[getEventStatus(e, now)] += 1;
  return counts;
}

/** Dated events first (soonest first), then undated; stable by title. */
function compareEvents(a: KanavuEvent, b: KanavuEvent): number {
  if (a.startDate && b.startDate) return a.startDate.localeCompare(b.startDate);
  if (a.startDate) return -1;
  if (b.startDate) return 1;
  return a.title.localeCompare(b.title);
}

export function eventHref(event: Pick<KanavuEvent, "regionId" | "slug">): string {
  return `/regions/${event.regionId}/events/${event.slug}`;
}

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});
const timeFmt = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export function formatEventDate(event: KanavuEvent): string {
  if (!event.startDate) return "Date to be announced";
  const start = new Date(event.startDate);
  const time = `${timeFmt.format(start)}${event.endDate ? ` – ${timeFmt.format(new Date(event.endDate))}` : ""}`;
  return `${dateFmt.format(start)} · ${time}`;
}

export function formatVenue(event: KanavuEvent): string {
  if (!event.venue) return "Venue to be confirmed";
  return [event.venue.name, event.venue.city].filter(Boolean).join(", ");
}

/** Register Interest destination: the event's own registration link, else the enquiry form for its hub. */
export function registerHref(event: Pick<KanavuEvent, "registrationUrl" | "regionId">): string {
  return event.registrationUrl ?? `/contact?type=general&region=${event.regionId}`;
}
