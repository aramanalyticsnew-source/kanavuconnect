import type { Metadata } from "next";
import { Suspense } from "react";
import { Info } from "lucide-react";
import { gallery, galleryCategories, mediaOpportunities } from "@/content/media";
import { audiences } from "@/content/experience";
import { site } from "@/content/site";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Gallery } from "@/components/media/Gallery";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Media",
  description: "Gallery, media partnerships and press enquiries for Kanavu Connect.",
};

export default function MediaPage() {
  const mediaAudience = audiences.find((a) => a.title === "Media & Influence");

  return (
    <>
      <PageHero
        eyebrow="Media & gallery"
        title={
          <>
            Moments worth <em className="text-gold-ink">sharing</em>.
          </>
        }
        intro="A look at the atmosphere of a Kanavu Connect evening, along with opportunities for journalists, creators and media partners."
      />

      <Section tone="ivory" className="pt-16! sm:pt-20!">
        <Container size="wide">
          <Reveal>
            <p className="mb-10 flex items-start gap-3 text-xs leading-relaxed text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
              Images shown are representative. Official photography from regional evenings will be added as events take
              place.
            </p>
          </Reveal>
          <Gallery items={gallery} categories={galleryCategories} />
        </Container>
      </Section>

      <Section tone="white">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Media & influence"
                title="A seat for the storytellers."
                intro={`${mediaAudience ? mediaAudience.members.join(", ") : "Media"} are part of every evening's networking floor.`}
              />
            </div>
            <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7">
              {mediaOpportunities.map((item, i) => (
                <Reveal as="li" key={item.title} delay={(i % 2) * 0.08} className="border-t border-line py-8">
                  <span className="font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-3xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="deep" id="media-enquiry">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Press & partnerships"
                title="Media enquiries."
                intro="Media organisations and creators interested in partnering with Kanavu Connect can reach us here."
              />
              <p className="mt-8 text-sm text-muted">
                Or email{" "}
                <a href={`mailto:${site.email}`} className="text-ink underline decoration-gold underline-offset-4">
                  {site.email}
                </a>
              </p>
            </div>
            <div className="bg-white p-8 sm:p-12 lg:col-span-8">
              <Suspense fallback={null}>
                <EnquiryForm defaultType="partnership" lockType idPrefix="media" />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
