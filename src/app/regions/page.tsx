import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { orderedRegions, regionStats } from "@/content/regions";
import { images } from "@/content/media";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RegionsExplorer } from "@/components/regions/RegionsExplorer";
import { RegionsExplorerFromParams } from "@/components/regions/RegionsExplorerFromParams";
import { RegistrationCTA } from "@/components/home/RegistrationCTA";

export const metadata: Metadata = {
  title: "Regions",
  description:
    "Eight regional hubs covering 38 districts across Tamil Nadu and Puducherry: Kanyakumari, Madurai, Trichy, Coimbatore, Salem, Thiruvannamalai, Chennai and Puducherry.",
};

export default function RegionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Regions & districts"
        title={
          <>
            Eight hubs. <em className="text-gold-ink">Every</em> corner of the state.
          </>
        }
        intro={`${regionStats.coverage}. Each hub brings together ${regionStats.participantsPerEvent} participants for its own regional evening.`}
        image={{ src: images.hall, alt: "A prepared event hall" }}
      />

      <Section tone="ivory" className="border-b border-line">
        <Container size="wide">
          <dl className="grid grid-cols-3 text-center">
            {[
              { v: String(regionStats.hubs), l: "Regional hubs" },
              { v: String(regionStats.districts), l: "Districts covered" },
              { v: regionStats.participantsPerEvent, l: "Participants per event" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08} className="flex flex-col-reverse border-line px-2 [&:not(:last-child)]:border-r">
                <dt className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[0.7rem]">{s.l}</dt>
                <dd className="font-display text-5xl text-ink sm:text-7xl">{s.v}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="white" id="explorer">
        <Container size="wide">
          <SectionHeading
            eyebrow="Explore the network"
            title="Find your regional hub."
            intro="Select a hub on the list or map to see the districts it serves."
            className="mb-16"
          />
          <Suspense fallback={<RegionsExplorer />}>
            <RegionsExplorerFromParams />
          </Suspense>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container size="wide">
          <SectionHeading eyebrow="Directory" title="All hubs and districts." className="mb-14" />
          <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {orderedRegions.map((region, i) => (
              <Reveal
                key={region.slug}
                delay={(i % 4) * 0.05}
                className="border-b border-r border-line bg-ivory p-8 transition-colors duration-500 hover:bg-white"
              >
                <Link href={`/regions?hub=${region.slug}#explorer`} className="group block">
                  <p className="eyebrow">
                    {region.statedCount !== null
                      ? `${region.statedCount} districts`
                      : region.slug === "puducherry"
                        ? "Union Territory"
                        : `${region.districts.length} districts listed`}
                  </p>
                  <h3 className="mt-4 text-3xl transition-colors group-hover:text-gold-ink">{region.name}</h3>
                </Link>
                <ul className="mt-5 space-y-1.5 text-sm text-muted">
                  {region.districts.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {region.note && <p className="mt-5 text-xs leading-relaxed text-muted/80">{region.note}</p>}
              </Reveal>
            ))}
          </div>
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
