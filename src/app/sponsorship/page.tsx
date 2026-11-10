import type { Metadata } from "next";
import { categoryPartnerships, reachStats, sponsorshipTerms, tiers, whyPartner } from "@/content/sponsorship";
import { images } from "@/content/media";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TierAccordion } from "@/components/sponsorship/TierAccordion";
import { ComparisonTable } from "@/components/sponsorship/ComparisonTable";
import { GreenInitiative } from "@/components/home/GreenInitiative";
import { RegistrationCTA } from "@/components/home/RegistrationCTA";

export const metadata: Metadata = {
  title: "Sponsorship",
  description:
    "Seven sponsorship tiers and exclusive category partnerships across Kanavu Connect's eight regional events in Tamil Nadu and Puducherry.",
};

export default function SponsorshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Sponsorship & partnerships"
        title={
          <>
            Partner with the <em className="text-gold-ink">next</em> generation of enterprise.
          </>
        }
        intro="Reach business owners, founders, investors and emerging entrepreneurs across eight regional markets — with visibility that runs from outdoor and print to the networking dinner itself."
        image={{ src: images.stage, alt: "A speaker on a lit conference stage" }}
      >
        <ButtonLink href="/contact?type=sponsorship">Enquire about sponsorship</ButtonLink>
      </PageHero>

      {/* Why partner */}
      <Section tone="ivory">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Why partner" title="Visibility where growth is happening." />
              <dl className="mt-12 space-y-6 border-t border-line pt-8">
                {reachStats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between gap-6 border-b border-line pb-6">
                    <dt className="text-sm text-muted">{stat.label}</dt>
                    <dd className="font-display text-4xl text-ink">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
              {whyPartner.map((item, i) => (
                <Reveal as="li" key={item.title} delay={(i % 2) * 0.08} className="border-t border-line py-8">
                  <span className="font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-3xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Tiers */}
      <Section tone="white" id="tiers">
        <Container size="wide">
          <div className="mb-14 grid gap-8 lg:grid-cols-12">
            <SectionHeading
              className="lg:col-span-7"
              eyebrow="Seven tiers"
              title="From title partner to an accessible entry tier."
            />
            <Reveal delay={0.1} className="lg:col-span-5 lg:self-end">
              <p className="text-sm leading-relaxed text-muted">
                Investment levels and availability are shared on request. Open a tier to see its full deliverables, then
                enquire directly to discuss the right fit.
              </p>
            </Reveal>
          </div>
          <TierAccordion tiers={tiers} />
        </Container>
      </Section>

      {/* Comparison */}
      <Section tone="white" className="pt-0! sm:pt-0! lg:pt-0!">
        <Container size="wide">
          <SectionHeading eyebrow="At a glance" title="Compare benefits by tier." className="mb-12" />
          <Reveal>
            <ComparisonTable />
          </Reveal>
          <ul className="mt-10 grid gap-3 text-xs leading-relaxed text-muted sm:grid-cols-2">
            {sponsorshipTerms.map((term) => (
              <li key={term} className="flex gap-3">
                <span className="mt-[0.45rem] h-px w-3 shrink-0 bg-gold" aria-hidden />
                {term}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Category partnerships */}
      <Section tone="dark">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                tone="dark"
                eyebrow="Exclusive category partnerships"
                title="Own your category."
                intro="Customised partnerships with category exclusivity, tailored to your business objectives."
              />
              <div className="mt-10">
                <ButtonLink href="/contact?type=partnership" variant="light">
                  Discuss a category
                </ButtonLink>
              </div>
            </div>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <ul className="flex flex-wrap gap-3">
                {categoryPartnerships.map((category) => (
                  <li
                    key={category}
                    className="border border-ivory/15 px-5 py-2.5 text-sm text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-ivory"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <GreenInitiative tone="ivory" />

      <RegistrationCTA
        eyebrow="Partner with us"
        title="Let's build your regional presence."
        body={`Tell us about your brand and objectives, or write to ${site.email} to discuss tiers and availability.`}
        primary={{ label: "Start a sponsorship enquiry", href: "/contact?type=sponsorship" }}
        secondary={{ label: "Exhibitor enquiries", href: "/contact?type=exhibitor" }}
      />
    </>
  );
}
