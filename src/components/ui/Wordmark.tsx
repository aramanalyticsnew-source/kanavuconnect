import { cn } from "@/lib/cn";

/** Typographic name used beside the logo medallion. */
export function Wordmark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[1rem] font-bold sm:text-[1.2rem] uppercase tracking-[0.06em]",
          tone === "dark" ? "text-ink" : "text-gold-bright",
        )}
      >
        Kanavu Connect
      </span>
      <span
        className={cn(
          "mt-1 text-[0.5rem] font-bold sm:text-[0.56rem] uppercase tracking-[0.3em]",
          tone === "dark" ? "text-gold-ink" : "text-gold-soft/80",
        )}
      >
        A place to connect &amp; grow
      </span>
    </span>
  );
}
