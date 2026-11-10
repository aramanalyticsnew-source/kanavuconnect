import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type CtaLink = { label: string; href: string };

type RegistrationCTAProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
};

export function RegistrationCTA({
  eyebrow = "Registration",
  title = "Take your seat at the table.",
  body = "Registration is by expression of interest. Tell us your region and how you'd like to take part — our team will be in touch.",
  primary = { label: "Register your interest", href: "/contact?type=general" },
  secondary = { label: "Explore sponsorship", href: "/sponsorship" },
}: RegistrationCTAProps) {
  return (
    <section className="relative overflow-hidden bg-ivory py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[22vw] leading-none text-gold/[0.07]" aria-hidden>
        Kanavu
      </div>
      <Container size="narrow" className="relative text-center">
        <Reveal>
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="gold-rule" aria-hidden />
            <p className="eyebrow">{eyebrow}</p>
            <span className="gold-rule" aria-hidden />
          </div>
          <h2 className="text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">{title}</h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{body}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            <ButtonLink href={secondary.href} variant="outline">
              {secondary.label}
            </ButtonLink>
          </div>
          <p className="mt-10 text-sm text-muted">
            Or write to{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline decoration-gold underline-offset-4">
              {site.email}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
