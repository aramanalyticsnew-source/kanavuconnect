import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { enquiryTypes, site } from "@/content/site";
import { orderedRegions } from "@/content/regions";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "General, sponsorship, partnership and exhibitor enquiries for Kanavu Connect. Email contact@kanavuconnect.com or call +91 73970 95609.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s start a <em className="text-gold-ink">conversation</em>.
          </>
        }
        intro="Whether you'd like to attend, sponsor, partner or exhibit, our team is here to help. Choose an enquiry type below or write to us directly."
      />

      <Section tone="ivory" className="pt-16! sm:pt-20!">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Direct contact */}
            <aside className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">Reach us directly</p>
                <ul className="mt-8 space-y-7 border-t border-line pt-8">
                  <li>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">Email · all enquiries</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-2 flex items-center gap-3 font-display text-2xl text-ink transition-colors hover:text-gold-ink"
                    >
                      <Mail className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">Phone / WhatsApp</p>
                    {site.phones.map((phone) => (
                      <div key={phone.href} className="mt-2 flex items-center justify-between gap-4">
                        <a
                          href={phone.href}
                          className="flex items-center gap-3 font-display text-2xl text-ink transition-colors hover:text-gold-ink"
                        >
                          <Phone className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                          {phone.display}
                        </a>
                        <a
                          href={phone.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${phone.display}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-charcoal transition-colors hover:border-gold hover:text-gold-ink"
                        >
                          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                        </a>
                      </div>
                    ))}
                  </li>
                  <li>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">Website</p>
                    <p className="mt-2 font-display text-2xl text-ink">{site.website}</p>
                  </li>
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="mt-14">
                <p className="eyebrow">Regional hubs</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {orderedRegions.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/regions?hub=${r.slug}#explorer`}
                        className="inline-block border border-line px-3.5 py-1.5 text-xs text-charcoal transition-colors hover:border-gold hover:text-gold-ink"
                      >
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </aside>

            {/* Form */}
            <div className="lg:col-span-8">
              <Reveal className="bg-white p-8 sm:p-12">
                <h2 className="text-4xl">Send an enquiry</h2>
                <p className="mt-3 mb-10 text-sm text-muted">Tell us a little about yourself and how you&apos;d like to be involved.</p>
                <Suspense fallback={<div className="h-[36rem]" aria-hidden />}>
                  <EnquiryForm idPrefix="contact" />
                </Suspense>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Enquiry types */}
      <Section tone="white">
        <Container size="wide">
          <SectionHeading eyebrow="Enquiry types" title="Write to the right desk." className="mb-14" />
          <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {enquiryTypes.map((type, i) => (
              <Reveal as="li" key={type.value} delay={i * 0.06} className="border-b border-r border-line">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(type.subject)}`}
                  className="group flex h-full flex-col justify-between gap-10 p-8 transition-colors duration-500 hover:bg-ivory"
                >
                  <span>
                    <span className="font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-4 block font-display text-3xl text-ink">{type.label.replace(" enquiry", "")}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-muted">{type.description}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-charcoal group-hover:text-gold-ink">
                    Email this desk <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
