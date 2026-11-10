"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
};

/** Subtle fade-up, triggered just before content enters the viewport. Respects reduced motion. */
export function Reveal({ children, className, delay = 0, y = 14, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  // The positive bottom margin starts the reveal before the element scrolls into view,
  // so fast scrolling never shows blank space.
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0.001, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 25% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
