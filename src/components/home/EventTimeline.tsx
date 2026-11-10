import { eventFormat, stages } from "@/content/experience";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InteractiveTimeline } from "@/components/experience/InteractiveTimeline";

export function EventTimeline() {
  return (
    <Section tone="white" id="timeline">
      <Container size="wide">
        <div className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The evening"
            title="Seven stages, one deliberate evening."
            intro={`${eventFormat.duration}, designed for ${eventFormat.attendance}.`}
          />
          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href="/experience" variant="outline">
              Explore the experience
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <InteractiveTimeline stages={stages} />
        </Reveal>
      </Container>
    </Section>
  );
}
