import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "light";

const base =
  "group inline-flex items-center justify-center gap-3 text-[0.8125rem] font-bold uppercase tracking-[0.16em] transition-all duration-500 ease-luxe";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon px-7 py-4 text-ivory shadow-[0_10px_30px_-12px_rgba(107,18,8,0.55)] hover:bg-maroon-deep hover:text-gold-bright",
  outline: "border-[1.5px] border-maroon/40 px-7 py-4 text-maroon hover:border-maroon hover:bg-maroon hover:text-ivory",
  light: "bg-ivory px-7 py-4 text-charcoal hover:bg-gold-bright hover:text-maroon-ink",
  ghost: "border-b-2 border-gold py-2 text-maroon hover:text-gold-ink",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", className, arrow = true }: ButtonLinkProps) {
  const external = href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http");
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {content}
    </Link>
  );
}
