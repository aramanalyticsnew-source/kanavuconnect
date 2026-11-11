import type { Metadata } from "next";
import Image from "next/image";
import { aboutIntro, ambition, impactStats, mission, site, vision } from "@/content/site";
import { audiences } from "@/content/experience";
import { aboutImages } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RegistrationCTA } from "@/components/home/RegistrationCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kanavu Connect links established business leaders with first-generation, rural, women and young entrepreneurs across Tamil Nadu and Puducherry.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kanavu Connect"
        title={
          <>
            Built for those who <em className="text-gold-ink">dream</em>, start and grow.
          </>
        }
        intro={aboutIntro.summary}
        image={{ src: aboutImages.logoLaunch.src, alt: aboutImages.logoLaunch.alt, position: "center 22%" }}
      />

      {/* Positioning statement */}
      <Section tone="ivory">
        <Container size="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow">Our purpose</p>
            <p className="mt-8 font-display text-[1.625rem] leading-[1.3] text-ink sm:text-[1.875rem] lg:text-[2.25rem]">
              To build {site.positioning} — reaching beyond the
              metros to Tier-2, Tier-3, Tier-4 and rural communities, where ambition is plentiful and access is not.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Event photography */}
      <section aria-label="Moments from Kanavu Connect" className="bg-ivory pb-16 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-12">
            {[
              { img: aboutImages.openFloor, caption: "Open-floor conversations", span: "md:col-span-7", aspect: "aspect-[3/2]" },
              { img: aboutImages.panel, caption: "Panel discussions", span: "md:col-span-5", aspect: "aspect-[3/2] md:aspect-auto md:h-full" },
            ].map(({ img, caption, span, aspect }, i) => (
              <Reveal key={img.src} delay={i * 0.08} as="article" className={span}>
                <figure className={`paper group relative overflow-hidden ${aspect}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-maroon-ink/75 to-transparent p-5 pt-16 font-display text-[1.125rem] text-ivory sm:p-6 sm:pt-20 sm:text-[1.3rem]">
                    {caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision & mission */}
      <Section tone="white">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading eyebrow="Vision" title="An ecosystem that includes everyone." />
              <ul className="mt-12 border-t border-line">
                {vision.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 0.06} className="flex gap-6 border-b border-line py-6">
                    <span className="font-display text-[1.125rem] text-gold">0{i + 1}</span>
                    <p className="text-base leading-relaxed text-charcoal">{item}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Mission" title="Connections that become opportunities." />
              <ul className="mt-12 border-t border-line">
                {mission.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 0.06} className="flex gap-6 border-b border-line py-6">
                    <span className="font-display text-[1.125rem] text-gold">0{i + 1}</span>
                    <p className="text-base leading-relaxed text-charcoal">{item}</p>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-10 font-display text-[1.3rem] italic text-gold-ink">Connect · Start · Grow</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pillars with image */}
      <Section tone="deep">
        <Container size="wide">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal y={40} className="paper relative aspect-[4/5] overflow-hidden lg:col-span-5">
              <Image
                src={aboutImages.keynote.src}
                alt={aboutImages.keynote.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "22% center" }}
              />
            </Reveal>
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="How we work" title="Three commitments behind every evening." />
              <div className="mt-12 space-y-10">
                {aboutIntro.pillars.map((pillar, i) => (
                  <Reveal key={pillar.title} delay={i * 0.08} className="grid gap-3 sm:grid-cols-[12rem_1fr] sm:gap-8">
                    <h3 className="text-[1.625rem] leading-tight">{pillar.title}</h3>
                    <p className="text-base leading-relaxed text-muted">{pillar.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Numbers */}
      <Section tone="dark">
        <Container size="wide">
          <SectionHeading tone="dark" eyebrow="By the numbers" title="Scale with intent." align="center" />
          <dl className="mt-16 grid grid-cols-2 gap-y-12 lg:grid-cols-5">
            {impactStats.map((stat) => (
              <Reveal key={stat.label} className="flex flex-col-reverse items-center text-center">
                <dt className="mt-3 max-w-[12rem] text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">
                  {stat.label}
                </dt>
                <dd className="font-display text-[3.125rem] text-ivory">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </Reveal>
            ))}
            <Reveal className="col-span-2 flex flex-col-reverse items-center text-center lg:col-span-1">
              <dt className="mt-3 max-w-[12rem] text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">
                {ambition.label} · {ambition.timeframe}
              </dt>
              <dd className="font-display text-[3.125rem] text-gold-soft">{ambition.value}</dd>
            </Reveal>
          </dl>
        </Container>
      </Section>

      {/* Who we serve */}
      <Section tone="ivory">
        <Container size="wide">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Who we bring together" title="Six communities, one table." />
            <Reveal delay={0.1} className="shrink-0">
              <ButtonLink href="/experience" variant="outline">
                See the event format
              </ButtonLink>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 3) * 0.06} className="border-t border-line py-7">
                <h3 className="text-[1.3rem]">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.members.join(" · ")}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <RegistrationCTA />
    </>
  );
}
