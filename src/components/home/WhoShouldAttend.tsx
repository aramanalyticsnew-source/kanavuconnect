import { audiences } from "@/content/experience";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhoShouldAttend() {
  return (
    <Section tone="ivory" id="who-should-attend">
      <Container size="wide">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Who should attend"
            title="One room. The whole ecosystem."
            intro="Every evening is curated across six communities — so the founder, the investor, the banker and the mentor are already in conversation."
          />
          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href="/experience#audiences" variant="outline">
              Full guest profile
            </ButtonLink>
          </Reveal>
        </div>

        <ul
          aria-label="Who should attend"
          className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-16 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-0 sm:overflow-visible sm:border-l sm:border-t sm:border-line sm:px-0 sm:pb-0 lg:grid-cols-3"
        >
          {audiences.map((audience, i) => (
            <Reveal
              as="li"
              key={audience.title}
              delay={(i % 3) * 0.08}
              className="group relative w-[78%] shrink-0 snap-start border border-line bg-white p-7 transition-colors duration-500 hover:bg-white sm:w-auto sm:border-0 sm:border-b sm:border-r sm:bg-ivory sm:p-10"
            >
              <span className="font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-[1.375rem] sm:mt-6 sm:text-[1.625rem]">{audience.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{audience.members.join(" · ")}</p>
              <span
                className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 ease-luxe group-hover:w-full"
                aria-hidden
              />
            </Reveal>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted sm:hidden" aria-hidden>
          Swipe to see all six communities →
        </p>
      </Container>
    </Section>
  );
}
