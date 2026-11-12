import type { Metadata } from "next";
import Image from "next/image";
import { audiences, eventFormat, guestTiers, networkingOpportunities, stages } from "@/content/experience";
import { eventPhotos } from "@/content/media";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InteractiveTimeline } from "@/components/experience/InteractiveTimeline";
import { RegistrationCTA } from "@/components/home/RegistrationCTA";

export const metadata: Metadata = {
  title: "The Experience",
  description:
    "A curated five-hour evening in seven stages — from welcome and keynotes to founder, investor and B2B connect sessions and an exclusive networking dinner.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="The experience"
        title={
          <>
            An evening, <em className="text-gold-ink">composed</em>.
          </>
        }
        intro={`${eventFormat.duration} in seven deliberate stages, designed for ${eventFormat.attendance}.`}
        image={{ src: eventPhotos.panelSession.src, alt: eventPhotos.panelSession.alt, position: "center 30%" }}
      />

      {/* Interactive overview */}
      <Section tone="white">
        <Container size="wide">
          <SectionHeading
            eyebrow="Run of show"
            title="Seven stages at a glance."
            intro="Select a stage to see what happens."
            className="mb-16"
          />
          <InteractiveTimeline stages={stages} />
        </Container>
      </Section>

      {/* Detailed vertical timeline */}
      <Section tone="ivory">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SectionHeading eyebrow="In detail" title="From first handshake to final course." />
                <Reveal delay={0.1} className="paper relative mt-12 hidden aspect-[4/5] overflow-hidden lg:block">
                  <Image src={eventPhotos.audienceTables.src} alt={eventPhotos.audienceTables.alt} fill sizes="30vw" className="object-cover" />
                </Reveal>
              </div>
            </div>
            <ol className="relative lg:col-span-8">
              <span className="absolute left-[1.15rem] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[1.4rem]" aria-hidden />
              {stages.map((stage, i) => (
                <Reveal as="li" key={stage.number} delay={i * 0.04} className="relative grid grid-cols-[2.3rem_1fr] gap-6 pb-14 last:pb-0 sm:grid-cols-[2.8rem_1fr] sm:gap-10">
                  <span className="relative z-10 flex h-[2.3rem] w-[2.3rem] items-center justify-center rounded-full border border-gold bg-ivory text-[0.7rem] font-semibold text-gold-ink sm:h-[2.8rem] sm:w-[2.8rem]">
                    {stage.number}
                  </span>
                  <div className="pt-1">
                    <p className="eyebrow">Stage {stage.number}</p>
                    <h3 className="mt-3 text-[1.625rem] sm:text-[1.875rem]">{stage.title}</h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{stage.detail}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Guest tiers */}
      <Section tone="dark">
        <Container size="wide">
          <SectionHeading
            tone="dark"
            eyebrow="Guests"
            title="Who you'll meet in the room."
            intro="Three circles of guests, each curated for the region."
          />
          <div className="mt-16 grid gap-px bg-ivory/10 lg:grid-cols-3">
            {guestTiers.map((tier, i) => (
              <Reveal key={tier.title} delay={i * 0.08} className="bg-maroon-deep p-8 sm:p-10 lg:first:pl-0">
                <span className="font-display text-lg italic text-gold">{["I", "II", "III"][i]}</span>
                <h3 className="mt-5 text-[1.625rem] text-ivory">{tier.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/60">{tier.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Audiences */}
      <Section tone="white" id="audiences">
        <Container size="wide">
          <SectionHeading
            eyebrow="Who can attend"
            title="Six communities, deliberately mixed."
            intro="Kanavu Connect is open to the full entrepreneurial ecosystem — the balance of the room is what makes the introductions work."
          />
          <div className="mt-16 grid border-t border-line md:grid-cols-2">
            {audiences.map((audience, i) => (
              <Reveal
                key={audience.title}
                delay={(i % 2) * 0.06}
                className="grid gap-4 border-b border-line py-10 sm:grid-cols-[4rem_1fr] md:odd:border-r md:odd:pr-10 md:even:pl-10"
              >
                <span className="font-display text-[1.125rem] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[1.625rem]">{audience.title}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {audience.members.map((m) => (
                      <li key={m} className="border border-line px-3.5 py-1.5 text-xs text-charcoal">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Networking */}
      <Section tone="deep">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12">
            <SectionHeading
              className="lg:col-span-5"
              eyebrow="Networking opportunities"
              title="Five moments built for connection."
            />
            <ol className="lg:col-span-7">
              {networkingOpportunities.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.05} className="flex items-baseline gap-6 border-t border-line py-6 last:border-b">
                  <span className="text-[0.7rem] font-semibold tabular-nums text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[1.3rem]">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <RegistrationCTA />
    </>
  );
}
