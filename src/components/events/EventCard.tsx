import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Tag } from "lucide-react";
import { eventHref, formatEventDate, formatVenue, type EventStatus, type KanavuEvent } from "@/content/events";
import { EventStatusBadge, PlaceholderTag } from "@/components/events/EventStatusBadge";

type EventCardProps = {
  event: KanavuEvent;
  status: EventStatus;
  regionName: string;
};

/** Event summary card. The whole card links to the event's detail page. */
export function EventCard({ event, status, regionName }: EventCardProps) {
  const titleId = `event-${event.slug}-title`;
  return (
    <article
      aria-labelledby={titleId}
      className="group relative flex h-full flex-col border border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_48px_-28px_rgba(61,9,5,0.45)]"
    >
      <div className="paper relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.image.src}
          alt={event.image.alt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-maroon-ink/45 via-transparent to-transparent" aria-hidden />
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <EventStatusBadge status={status} />
        </div>
        <p className="absolute bottom-4 left-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/90">
          {regionName} hub
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold-ink">
            <Tag className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            {event.category}
          </span>
          {event.placeholder && <PlaceholderTag />}
        </div>

        <h3 id={titleId} className="mt-3 text-[1.3rem] leading-snug">
          <Link
            href={eventHref(event)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {event.title}
          </Link>
        </h3>

        <dl className="mt-4 space-y-2 text-sm text-charcoal">
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Date</dt>
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
            <dd className={event.startDate ? "" : "text-muted"}>{formatEventDate(event)}</dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Venue</dt>
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
            <dd className={event.venue ? "" : "text-muted"}>{formatVenue(event)}</dd>
          </div>
        </dl>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">{event.summary}</p>

        <span className="mt-auto flex items-center gap-2 pt-6 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-maroon">
          View details
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden
          />
        </span>
      </div>

      {/* Visible focus ring for the stretched link */}
      <span
        className="pointer-events-none absolute inset-0 ring-gold-ink ring-offset-2 group-has-[a:focus-visible]:ring-2"
        aria-hidden
      />
    </article>
  );
}
