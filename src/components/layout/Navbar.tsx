"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const links = navigation.filter((item) => item.href !== "/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-maroon focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe",
          scrolled || open
            ? "border-b border-line/80 bg-ivory/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-[90rem] items-center justify-between px-6 transition-all duration-500 ease-luxe sm:px-8 lg:px-12",
            scrolled ? "h-[4.75rem]" : "h-24",
          )}
        >
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10">
            <Logo size={scrolled ? 46 : 58} priority className="transition-all duration-500 [&>img]:transition-all [&>img]:duration-500" />
          </Link>

          <ul className="hidden items-center gap-8 xl:flex">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[0.8125rem] font-semibold tracking-[0.04em] transition-colors duration-300",
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden items-center gap-2 bg-maroon px-5 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:bg-maroon-deep hover:text-gold-bright sm:inline-flex"
            >
              Get in touch
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 -mr-2 inline-flex h-11 w-11 items-center justify-center text-maroon xl:hidden"
            >
              {open ? <X className="h-6 w-6" strokeWidth={1.25} /> : <Menu className="h-6 w-6" strokeWidth={1.25} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-40 flex flex-col bg-ivory pt-28 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex-1 overflow-y-auto px-6 sm:px-8">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-5"
                  >
                    <span
                      className={cn(
                        "font-display text-[2rem] font-bold leading-none",
                        isActive(item.href) ? "text-gold-ink" : "text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                    <ArrowRight className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-8 text-sm text-muted sm:px-8">
              <a href={`mailto:${site.email}`} className="block py-1 text-ink">
                {site.email}
              </a>
              <a href={site.phones[0].href} className="block py-1">
                {site.phones[0].display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
