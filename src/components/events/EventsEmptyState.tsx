import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { statusLabels, statusOrder, type EventStatus } from "@/content/events";

type EventsEmptyStateProps = {
  regionName: string;
  /** Hub has no events at all ("hub"), or none in the selected status ("filter"). */
  variant: "hub" | "filter";
  status: EventStatus;
  counts: Record<EventStatus, number>;
  registerHref: string;
  onShowStatus?: (status: EventStatus) => void;
};

export function EventsEmptyState({ regionName, variant, status, counts, registerHref, onShowStatus }: EventsEmptyStateProps) {
  const alternatives = statusOrder.filter((s) => s !== status && counts[s] > 0);
  const heading =
    variant === "hub"
      ? `No events scheduled in ${regionName} yet`
      : `No ${statusLabels[status].toLowerCase()} events in ${regionName}`;
  const body =
    variant === "hub"
      ? `The ${regionName} hub's first evening is being planned. Register your interest and we'll let you know as soon as the date and venue are confirmed.`
      : status === "completed"
        ? `Past events for the ${regionName} hub will appear here once they have taken place.`
        : status === "ongoing"
          ? `Nothing is happening in ${regionName} right now. Events appear here while they are taking place.`
          : `New dates for the ${regionName} hub will appear here as soon as they are announced.`;

  return (
    <div className="relative overflow-hidden border border-line bg-white px-6 py-14 text-center sm:px-12 sm:py-16">
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{ backgroundImage: "radial-gradient(rgba(200,150,47,0.12) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-md">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ivory text-gold-ink">
          <CalendarClock className="h-6 w-6" strokeWidth={1.25} aria-hidden />
        </span>
        <h3 className="mt-6 text-[1.4rem] leading-snug">{heading}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={registerHref}
            className="inline-flex items-center justify-center bg-maroon px-6 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-maroon-deep hover:text-gold-bright"
          >
            Register interest
          </Link>
          {onShowStatus &&
            alternatives.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onShowStatus(s)}
                className="inline-flex items-center justify-center border border-maroon/30 px-6 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-ivory"
              >
                View {statusLabels[s].toLowerCase()} ({counts[s]})
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
