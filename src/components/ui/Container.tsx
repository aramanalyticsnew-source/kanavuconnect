import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", sizes[size], className)}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "white" | "deep" | "dark";
};

const tones = {
  ivory: "bg-ivory",
  white: "bg-white",
  deep: "bg-ivory-deep",
  dark: "bg-maroon-deep text-ivory",
};

export function Section({ children, className, id, tone = "ivory" }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-16 sm:py-24 lg:py-32", tones[tone], className)}>
      {children}
    </section>
  );
}
