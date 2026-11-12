import Image from "next/image";
import { guestTiers, networkingOpportunities } from "@/content/experience";
import { eventPhotos } from "@/content/media";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Networking() {
  return (
    <Section tone="dark" id="networking" className="overflow-hidden">
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading
              tone="dark"
              eyebrow="Networking opportunities"
              title="Introductions with intent."
              intro="Five structured moments through the evening, each designed around a different kind of connection."
            />
            <ol className="mt-14 border-t border-ivory/10">
              {networkingOpportunities.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 0.06}
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-ivory/10 py-6 sm:grid-cols-[3rem_16rem_1fr]"
                >
                  <span className="text-[0.7rem] font-semibold tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[1.3rem] text-ivory transition-colors group-hover:text-gold-soft">
                    {item.title}
                  </h3>
                  <p className="col-start-2 text-sm leading-relaxed text-ivory/60 sm:col-start-auto">{item.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <Reveal y={40} className="paper relative aspect-[5/4] overflow-hidden">
              <Image
                src={eventPhotos.networkingCircle.src}
                alt={eventPhotos.networkingCircle.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {guestTiers.map((tier, i) => (
                <Reveal key={tier.title} delay={i * 0.08}>
                  <p className="eyebrow text-gold-bright">{tier.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/60">{tier.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
