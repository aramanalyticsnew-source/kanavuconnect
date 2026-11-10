"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = { value: number; suffix?: string; duration?: number };

const format = (n: number) => n.toLocaleString("en-IN");

/** Counts up to `value` when scrolled into view. Server-rendered with the final value. */
export function CountUp({ value, suffix = "", duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} aria-label={`${format(value)}${suffix}`}>
      <span aria-hidden>
        {format(display)}
        {suffix}
      </span>
    </span>
  );
}
