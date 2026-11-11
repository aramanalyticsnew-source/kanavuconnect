import Image from "next/image";
import { Leaf } from "lucide-react";
import { greenInitiative } from "@/content/sponsorship";
import { images } from "@/content/media";
import { Container, Section } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GreenInitiative({ tone = "deep" }: { tone?: "deep" | "ivory" | "white" }) {
  return (
    <Section tone={tone} id="green-initiative">
      <Container size="wide">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal y={40} className="paper relative aspect-[4/3] overflow-hidden lg:col-span-6 lg:aspect-[5/6]">
            <Image
              src={images.forest}
              alt="Sunlight through a canopy of trees"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/90 text-gold-ink backdrop-blur">
              <Leaf className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Green Entrepreneurship Initiative"
              title={
                <>
                  Every evening leaves something <em className="text-gold-ink">growing</em>.
                </>
              }
              intro={greenInitiative.summary}
            />
            <dl className="mt-14 grid grid-cols-2 border-t border-line">
              {greenInitiative.stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 0.1}
                  className="flex flex-col-reverse border-line pt-8 first:border-r first:pr-6 last:pl-6 sm:last:pl-10"
                >
                  <dt className="mt-3 text-sm text-muted">{stat.label}</dt>
                  <dd className="font-display text-[3.125rem] leading-none text-ink sm:text-[3.75rem]">
                    <CountUp value={stat.value} />
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
