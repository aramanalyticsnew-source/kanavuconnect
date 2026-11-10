import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { reachStats, tiers } from "@/content/sponsorship";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SponsorshipShowcase() {
  return (
    <Section tone="white" id="sponsorship">
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Sponsorship"
                title="Seven ways to partner across eight markets."
                intro="From title partnership to an accessible entry tier, every level carries stage, networking dinner and CSR visibility."
              />
              <dl className="mt-12 grid grid-cols-3 border-t border-line pt-8">
                {reachStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="mt-2 text-[0.7rem] leading-snug text-muted">{stat.label}</dt>
                    <dd className="font-display text-4xl text-ink">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-12">
                <ButtonLink href="/sponsorship">Explore sponsorship</ButtonLink>
              </div>
            </div>
          </div>

          <ol className="border-t border-line lg:col-span-7">
            {tiers.map((tier, i) => (
              <Reveal as="li" key={tier.slug} delay={i * 0.05}>
                <Link
                  href={`/sponsorship#${tier.slug}`}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-7 transition-colors duration-500 hover:bg-ivory sm:grid-cols-[4rem_1fr_auto] sm:px-4"
                >
                  <span className="font-display text-xl italic text-gold">{tier.rank}</span>
                  <span>
                    <span className="block font-display text-3xl leading-tight text-ink sm:text-[2.1rem]">{tier.name}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted">{tier.positioning}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-muted transition-all duration-500 ease-luxe group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
