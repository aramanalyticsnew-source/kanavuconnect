import { statusLabels, type EventStatus } from "@/content/events";
import { cn } from "@/lib/cn";

const styles: Record<EventStatus, string> = {
  upcoming: "bg-ivory text-maroon",
  ongoing: "bg-maroon text-gold-bright",
  completed: "bg-charcoal/80 text-ivory",
};

export function EventStatusBadge({ status, className }: { status: EventStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em]",
        styles[status],
        className,
      )}
    >
      {status === "ongoing" && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="animate-pulse-ring absolute h-1.5 w-1.5 rounded-full bg-gold-bright" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-gold-bright" />
        </span>
      )}
      {statusLabels[status]}
    </span>
  );
}

export function PlaceholderTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-dashed border-gold/70 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-gold-ink",
        className,
      )}
      title="Development placeholder: date and venue not yet announced"
    >
      Placeholder
    </span>
  );
}
