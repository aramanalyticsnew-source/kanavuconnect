import type { Metadata } from "next";
import { Suspense } from "react";
import { orderedRegions, regionStats } from "@/content/regions";
import { events } from "@/content/events";
import { eventPhotos } from "@/content/media";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RegionalEventsExplorer } from "@/components/regions/RegionalEventsExplorer";
import { RegistrationCTA } from "@/components/home/RegistrationCTA";

export const metadata: Metadata = {
  title: "Regional Events",
  description:
    "Explore Kanavu Connect's eight regional hubs across Tamil Nadu and Puducherry — Kanyakumari, Madurai, Trichy, Coimbatore, Salem, Thiruvannamalai, Chennai and Puducherry — and the events planned in each.",
  alternates: { canonical: "/regions" },
};

/** Static placeholder shown for the split second before URL parameters are read. */
function ExplorerFallback() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="flex gap-2 overflow-hidden">
        {orderedRegions.map((r) => (
          <div key={r.slug} className="h-11 w-32 shrink-0 bg-ivory-deep" />
        ))}
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="paper aspect-[4/5] lg:col-span-4" />
        <div className="grid gap-6 md:grid-cols-2 lg:col-span-8">
          <div className="h-96 bg-ivory-deep" />
        </div>
      </div>
    </div>
  );
}

export default function RegionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Regional events"
        title={
          <>
            Eight hubs. <em className="text-gold-ink">Every</em> corner of the state.
          </>
        }
        intro={`${regionStats.coverage}. Choose a hub to see its districts and the evenings planned there.`}
        image={{ src: eventPhotos.venueArrivals.src, alt: eventPhotos.venueArrivals.alt, position: "center 45%" }}
      />

      <Section tone="ivory" className="border-b border-line py-12! sm:py-16!">
        <Container size="wide">
          <dl className="grid grid-cols-3 text-center">
            {[
              { v: String(regionStats.hubs), l: "Regional hubs" },
              { v: String(regionStats.districts), l: "Districts covered" },
              { v: regionStats.participantsPerEvent, l: "Participants per event" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08} className="flex flex-col-reverse border-line px-2 [&:not(:last-child)]:border-r">
                <dt className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[0.7rem]">{s.l}</dt>
                <dd className="font-display text-[2.5rem] text-ink sm:text-[3.75rem]">{s.v}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="white" id="explorer">
        <Container size="wide">
          <SectionHeading
            eyebrow="Regional Events Explorer"
            title="Find your hub, then your evening."
            intro="Each hub runs its own schedule. Select a hub on the map or list to see its districts and only the events planned there."
            className="mb-10 sm:mb-12"
          />
          <Suspense fallback={<ExplorerFallback />}>
            <RegionalEventsExplorer regions={orderedRegions} events={events} />
          </Suspense>
        </Container>
      </Section>

      <RegistrationCTA
        eyebrow="Join your region"
        title="Your region. Your network."
        body="Register your interest for the hub nearest you and we'll keep you informed as each regional evening is confirmed."
      />
    </>
  );
}
