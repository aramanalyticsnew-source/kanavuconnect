import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  image?: { src: string; alt: string; position?: string };
  children?: ReactNode;
};

/** Shared hero for inner pages: editorial headline with an optional image band. */
export function PageHero({ eyebrow, title, intro, image, children }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden bg-ivory pt-36 sm:pt-44">
      <Container>
        <div className="grid gap-10 pb-16 lg:grid-cols-12 lg:items-end lg:pb-20">
          <div className="rise lg:col-span-7">
            <div className="mb-7 flex items-center gap-4">
              <span className="gold-rule" aria-hidden />
              <p className="eyebrow">{eyebrow}</p>
            </div>
            <h1 className="text-[2.5rem] leading-[1.1] sm:text-[3.125rem] lg:text-[4.25rem]">{title}</h1>
          </div>
          <div className="rise lg:col-span-5 lg:pb-3" style={{ animationDelay: "0.12s" }}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </Container>
      {image ? (
        <div className="rise relative" style={{ animationDelay: "0.2s" }}>
          <div className="paper relative mx-auto aspect-[16/7] w-full max-w-[90rem] overflow-hidden sm:aspect-[16/6]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={image.position ? { objectPosition: image.position } : undefined}
            />
            <div className="absolute inset-0 bg-linear-to-t from-maroon-ink/30 to-transparent" aria-hidden />
          </div>
        </div>
      ) : (
        <Container>
          <div className="hairline" />
        </Container>
      )}
    </header>
  );
}
