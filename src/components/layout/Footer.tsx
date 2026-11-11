import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { navigation, site } from "@/content/site";
import { orderedRegions } from "@/content/regions";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-maroon-ink text-ivory">
      <div className="h-1 bg-linear-to-r from-gold via-gold-bright to-gold" aria-hidden />
      <Container size="wide">
        <div className="grid gap-14 border-b border-ivory/10 py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size={96} tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">{site.description}</p>
            <p className="mt-8 font-display text-[1.125rem] font-semibold italic text-gold-bright">{site.tagline}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-gold-bright">Explore</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ivory/70 transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-gold-bright">Regional hubs</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {orderedRegions.map((region) => (
                <li key={region.slug}>
                  <Link
                    href={`/regions?hub=${region.slug}`}
                    className="text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-gold-bright">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-ivory/80 hover:text-ivory">
                  <Mail className="h-4 w-4 text-gold-bright" strokeWidth={1.5} aria-hidden />
                  {site.email}
                </a>
              </li>
              {site.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="flex items-center gap-3 text-ivory/80 hover:text-ivory">
                    <Phone className="h-4 w-4 text-gold-bright" strokeWidth={1.5} aria-hidden />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 pt-2 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-gold-bright hover:text-ivory"
                >
                  All enquiries <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Tamil Nadu &amp; Puducherry</p>
        </div>
      </Container>
    </footer>
  );
}
