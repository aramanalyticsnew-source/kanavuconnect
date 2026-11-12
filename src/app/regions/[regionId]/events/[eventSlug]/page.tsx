import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Info, MapPin, Tag } from "lucide-react";
import { getRegion } from "@/content/regions";
import {
  eventHref,
  events,
  formatEventDate,
  formatVenue,
  getEvent,
  getEventStatus,
  getEventsByRegion,
  registerHref,
} from "@/content/events";
import { stages } from "@/content/experience";
import { site } from "@/content/site";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EventCard } from "@/components/events/EventCard";
import { EventStatusBadge, PlaceholderTag } from "@/components/events/EventStatusBadge";

type Params = { regionId: string; eventSlug: string };

/** Only known hub/event pairs exist; anything else is a 404. */
export const dynamicParams = false;
/** Re-evaluate status (upcoming → ongoing → completed) hourly. */
export const revalidate = 3600;

export function generateStaticParams(): Params[] {
  return events.map((e) => ({ regionId: e.regionId, eventSlug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { regionId, eventSlug } = await params;
  const event = getEvent(regionId, eventSlug);
  const region = getRegion(regionId);
  if (!event || !region) return { title: "Event not found" };

  const title = `${event.title} · ${region.name}`;
  return {
    title,
    description: event.summary,
    alternates: { canonical: eventHref(event) },
    // Development placeholders must not be indexed as real events.
    robots: event.placeholder ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      title,
      description: event.summary,
      images: [{ url: event.image.src, alt: event.image.alt }],
    },
  };
}

export default async function EventDetailPage({ params }: { params: Promise<Params> }) {
  const { regionId, eventSlug } = await params;
  const region = getRegion(regionId);
  const event = getEvent(regionId, eventSlug);
  if (!region || !event) notFound();

  const status = getEventStatus(event);
  const others = getEventsByRegion(region.slug).filter((e) => e.slug !== event.slug);
  const register = registerHref(event);
  const external = register.startsWith("http");

  // Structured data only for confirmed events with a real date and venue.
  const jsonLd =
    !event.placeholder && event.startDate && event.venue
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          description: event.summary,
          startDate: event.startDate,
          ...(event.endDate ? { endDate: event.endDate } : {}),
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          image: [new URL(event.image.src, site.url).toString()],
          location: {
            "@type": "Place",
            name: event.venue.name,
            address: {
              "@type": "PostalAddress",
              ...(event.venue.address ? { streetAddress: event.venue.address } : {}),
              addressLocality: event.venue.city ?? region.name,
              addressCountry: "IN",
            },
          },
          organizer: { "@type": "Organization", name: site.name, url: site.url },
        }
      : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      <header className="bg-ivory pt-32 sm:pt-40">
        <Container size="wide">
          <nav aria-label="Breadcrumb" className="rise text-xs font-semibold text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/regions" className="hover:text-ink">
                  Regions
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/regions?hub=${region.slug}#explorer`} className="hover:text-ink">
                  {region.name}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {event.title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-16">
            <div className="rise lg:col-span-7" style={{ animationDelay: "0.06s" }}>
              <div className="flex flex-wrap items-center gap-3">
                <EventStatusBadge status={status} className="border border-line" />
                <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold-ink">
                  <Tag className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                  {event.category}
                </span>
                {event.placeholder && <PlaceholderTag />}
              </div>
              <h1 className="mt-6 text-[2.25rem] leading-[1.1] sm:text-[3rem] lg:text-[3.5rem]">{event.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{event.summary}</p>
            </div>

            <div className="rise lg:col-span-5" style={{ animationDelay: "0.12s" }}>
              <dl className="divide-y divide-line border-y border-line">
                <div className="flex items-start gap-4 py-4">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
                  <div>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">Date</dt>
                    <dd className={`mt-1 text-sm ${event.startDate ? "text-ink" : "text-muted"}`}>
                      {event.startDate ? <time dateTime={event.startDate}>{formatEventDate(event)}</time> : formatEventDate(event)}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
                  <div>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">Venue</dt>
                    <dd className={`mt-1 text-sm ${event.venue ? "text-ink" : "text-muted"}`}>
                      {formatVenue(event)}
                      {event.venue?.address && <span className="block text-muted">{event.venue.address}</span>}
                    </dd>
                  </div>
                </div>
              </dl>
              <a
                href={register}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-maroon px-7 py-4 text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-ivory shadow-[0_10px_30px_-12px_rgba(107,18,8,0.55)] transition-colors hover:bg-maroon-deep hover:text-gold-bright"
              >
                Register interest
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
              </a>
            </div>
          </div>
        </Container>

        <div className="rise" style={{ animationDelay: "0.18s" }}>
          <div className="paper relative mx-auto aspect-[16/8] w-full max-w-[90rem] overflow-hidden sm:aspect-[16/6]">
            <Image src={event.image.src} alt={event.image.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
      </header>

      <Section tone="white">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              {event.placeholder && (
                <Reveal>
                  <div className="mb-10 flex gap-3 border border-dashed border-gold/70 bg-ivory p-5 text-sm leading-relaxed text-charcoal">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" strokeWidth={1.75} aria-hidden />
                    <p>
                      <strong className="font-semibold">Development placeholder.</strong> This regional evening is planned,
                      but its date, venue and registration details have not been announced. Register your interest to be
                      notified when they are confirmed.
                    </p>
                  </div>
                </Reveal>
              )}
              <Reveal>
                <p className="eyebrow">About this event</p>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-charcoal">
                  {event.description.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal className="mt-14">
                <p className="eyebrow">The evening</p>
                <ol className="mt-6 border-t border-line">
                  {stages.map((stage) => (
                    <li key={stage.number} className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-line py-5">
                      <span className="font-display text-lg text-gold">{stage.number}</span>
                      <div>
                        <h2 className="text-[1.125rem] font-semibold leading-snug tracking-[-0.01em]">{stage.title}</h2>
                        <p className="mt-1 text-sm text-muted">{stage.summary}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <aside className="lg:col-span-5" aria-label={`${region.name} hub`}>
              <div className="lg:sticky lg:top-28">
                <div className="border border-line bg-ivory p-8">
                  <p className="eyebrow flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden /> Regional hub
                  </p>
                  <h2 className="mt-3 text-[1.875rem]">{region.name}</h2>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Districts in the ${region.name} hub`}>
                    {region.districts.map((d) => (
                      <li key={d} className="border border-line bg-white px-3 py-1.5 text-xs font-medium text-charcoal">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/regions?hub=${region.slug}#explorer`}
                    className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-maroon underline decoration-gold underline-offset-8 hover:text-gold-ink"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    All {region.name} events
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {others.length > 0 && (
        <Section tone="ivory">
          <Container size="wide">
            <h2 className="mb-10 text-[1.875rem]">More in {region.name}</h2>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((e) => (
                <li key={e.slug}>
                  <EventCard event={e} status={getEventStatus(e)} regionName={region.name} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
