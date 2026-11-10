import { site } from "@/content/site";
import { orderedRegions } from "@/content/regions";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/home/HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory pt-28 sm:pt-36 lg:pt-40">
      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 lg:py-10">
            <div className="rise">
              <div className="mb-6 flex items-center gap-4 sm:mb-8">
                <span className="gold-rule" aria-hidden />
                <p className="eyebrow">Business networking · Tamil Nadu &amp; Puducherry</p>
              </div>
            </div>
            <div className="rise" style={{ animationDelay: "0.08s" }}>
              <h1 className="text-[3.1rem] leading-[0.98] sm:text-7xl lg:text-[5.5rem] xl:text-[6.25rem]">
                Connect. Collaborate.
                <br />
                <em className="text-gold-ink">Start.</em> Grow.
              </h1>
            </div>
            <div className="rise" style={{ animationDelay: "0.16s" }}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">{site.description}</p>
            </div>
            <div className="rise" style={{ animationDelay: "0.24s" }}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
                <ButtonLink href="/experience">See how it works</ButtonLink>
                <ButtonLink href="/sponsorship" variant="outline">
                  Become a partner
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="rise relative lg:col-span-6" style={{ animationDelay: "0.12s" }}>
            <HeroVisual />
            <div
              className="absolute -left-4 -top-4 -z-10 hidden h-full w-full border-2 border-gold/50 lg:block"
              aria-hidden
            />
          </div>
        </div>
      </Container>

      <div className="mt-14 bg-maroon-deep sm:mt-20 lg:mt-24">
        <Container size="wide">
          <ul
            aria-label="Regional hubs"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-5 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-gold-soft sm:justify-between"
          >
            {orderedRegions.map((region) => (
              <li key={region.slug}>{region.name}</li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
