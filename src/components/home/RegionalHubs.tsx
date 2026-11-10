import { regionStats } from "@/content/regions";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RegionsExplorer } from "@/components/regions/RegionsExplorer";

export function RegionalHubs() {
  return (
    <Section tone="ivory" id="regions">
      <Container size="wide">
        <div className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Eight regional hubs"
            title={
              <>
                {regionStats.districts} districts. <em className="text-gold-ink">One</em> network.
              </>
            }
            intro={`${regionStats.coverage} — each hub hosting its own curated evening.`}
          />
          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href="/regions" variant="outline">
              All regions &amp; districts
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <RegionsExplorer />
        </Reveal>
      </Container>
    </Section>
  );
}
