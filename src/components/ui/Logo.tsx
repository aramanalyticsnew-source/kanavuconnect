import Image from "next/image";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/Wordmark";

export const LOGO_SRC = "/brand/kanavu-connect-logo.png";

type LogoProps = {
  /** Medallion diameter in pixels. */
  size?: number;
  /** Show the typographic name beside the medallion. */
  withWordmark?: boolean;
  tone?: "dark" | "light";
  priority?: boolean;
  className?: string;
};

/** Official Kanavu Connect medallion, optionally paired with the wordmark. */
export function Logo({ size = 52, withWordmark = true, tone = "dark", priority, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3.5", className)}>
      <Image
        src={LOGO_SRC}
        alt={withWordmark ? "" : "Kanavu Connect"}
        aria-hidden={withWordmark || undefined}
        width={size}
        height={size}
        priority={priority}
        className="shrink-0 rounded-full drop-shadow-[0_4px_12px_rgba(61,9,5,0.25)]"
        style={{ width: size, height: size }}
      />
      {withWordmark && <Wordmark tone={tone} />}
    </span>
  );
}
