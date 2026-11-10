import { impactStats } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function ImpactStats() {
  return (
    <section aria-label="Impact at a glance" className="bg-ivory py-10 sm:py-20">
      <Container size="wide">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex flex-col-reverse border-line px-2 py-6 text-center sm:py-8 odd:border-r lg:border-r lg:py-4 lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
            >
              <dt className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted">
                {stat.label}
              </dt>
              <dd className="font-display text-5xl leading-none text-ink sm:text-7xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
