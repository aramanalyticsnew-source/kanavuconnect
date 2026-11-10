import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <div className={cn("mb-6 flex items-center gap-4", centered && "justify-center")}>
          <span className="gold-rule" aria-hidden />
          <p className={cn("eyebrow", tone === "dark" && "text-gold-bright")}>{eyebrow}</p>
        </div>
      )}
      <Tag
        className={cn(
          "text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]",
          tone === "dark" && "text-ivory",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-ivory/70" : "text-muted",
            centered && "mx-auto max-w-2xl",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
