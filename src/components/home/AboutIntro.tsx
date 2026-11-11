import { aboutIntro, ambition } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutIntro() {
  return (
    <Section tone="white" id="about">
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative min-w-0 lg:col-span-5" y={24}>
            <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-maroon-deep p-8 sm:aspect-square sm:p-10 lg:aspect-[4/5]">
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: "radial-gradient(rgba(232,181,74,0.9) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
                aria-hidden
              />
              <p className="eyebrow relative text-gold-soft">Kanavu · கனவு</p>
              <div className="relative">
                <p lang="ta" className="font-display text-[4rem] font-bold leading-none text-gold-bright sm:text-[6rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                  கனவு
                </p>
                <p className="mt-4 font-display text-[1.3rem] italic text-ivory/85 sm:text-[1.625rem]">noun — a dream.</p>
              </div>
              <div className="relative border-t border-gold/25 pt-6">
                <p className="font-display text-[2.5rem] font-semibold leading-none text-ivory">{ambition.value}</p>
                <p className="mt-2 text-sm text-ivory/70">
                  {ambition.label} · <span className="text-gold-soft">{ambition.timeframe}</span>
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:pt-8">
            <SectionHeading
              eyebrow="About Kanavu Connect"
              title={
                <>
                  Kanavu means <em className="text-gold-ink">dream</em>. We connect the people who make them real.
                </>
              }
              intro={aboutIntro.summary}
            />

            <ol className="mt-14 border-t border-line">
              {aboutIntro.pillars.map((pillar, i) => (
                <Reveal as="li" key={pillar.title} delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7 sm:grid-cols-[4rem_14rem_1fr] sm:gap-6">
                  <span className="font-display text-[1.3rem] text-gold">0{i + 1}</span>
                  <h3 className="text-[1.3rem] leading-tight">{pillar.title}</h3>
                  <p className="col-start-2 text-sm leading-relaxed text-muted sm:col-start-auto">{pillar.body}</p>
                </Reveal>
              ))}
            </ol>

            <div className="mt-12">
              <ButtonLink href="/about" variant="ghost">
                Our vision &amp; mission
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
