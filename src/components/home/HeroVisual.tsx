import { regions, regionStats } from "@/content/regions";

/**
 * Hero artwork: a gold constellation of the eight regional hubs on deep maroon.
 * Brand-owned visual (no stock photography). Positions are schematic.
 */
/** Label placement per hub, to avoid collisions between close neighbours. */
const labelAbove = new Set(["thiruvannamalai", "chennai"]);

const route = ["kanyakumari", "madurai", "coimbatore", "salem", "trichy", "puducherry", "thiruvannamalai", "chennai"];

export function HeroVisual() {
  const points = route
    .map((slug) => regions.find((r) => r.slug === slug))
    .filter((r): r is (typeof regions)[number] => Boolean(r));

  // Map 0–100 schematic coords into the drawing area (with padding).
  const px = (x: number) => 14 + x * 0.72;
  const py = (y: number) => 7 + y * 0.66;

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-maroon-deep sm:aspect-square lg:aspect-[4/5]">
      {/* Fine gold grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,181,74,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(232,181,74,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />
      {/* Soft glow */}
      <div
        className="absolute -right-1/4 -top-1/4 h-[80%] w-[80%] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #8a2a12 0%, transparent 70%)" }}
        aria-hidden
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <polyline
          points={points.map((p) => `${px(p.position.x)},${py(p.position.y)}`).join(" ")}
          fill="none"
          stroke="#e8b54a"
          strokeOpacity="0.55"
          strokeWidth="0.35"
          strokeDasharray="1.4 1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {points.map((p, i) => (
        <div
          key={p.slug}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${px(p.position.x)}%`, top: `${py(p.position.y)}%` }}
        >
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span
              className="animate-pulse-ring absolute h-3 w-3 rounded-full bg-gold-bright"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <span className="relative h-2.5 w-2.5 rounded-full bg-gold-bright shadow-[0_0_12px_rgba(232,181,74,0.9)]" />
          </span>
          <span
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.6rem] font-bold uppercase tracking-[0.16em] text-gold-soft/90 sm:text-[0.65rem] ${
              labelAbove.has(p.slug) ? "bottom-full mb-1.5" : "top-full mt-1.5"
            }`}
          >
            {p.name}
          </span>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 border-t border-gold/25 bg-maroon-ink/60 p-6 backdrop-blur-sm sm:p-8">
        <p className="max-w-[15rem] font-display text-2xl leading-tight text-ivory sm:text-[1.75rem]">
          Curated evenings across eight regions
        </p>
        <dl className="flex gap-6 text-right">
          <div className="flex flex-col-reverse">
            <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ivory/70">Districts</dt>
            <dd className="font-display text-3xl font-semibold text-gold-bright">{regionStats.districts}</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ivory/70">Per evening</dt>
            <dd className="font-display text-3xl font-semibold text-gold-bright">{regionStats.participantsPerEvent}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
