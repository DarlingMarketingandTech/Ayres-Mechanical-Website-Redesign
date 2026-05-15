import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: 1 as const,
    title: "Book online or call",
    description: "Reach dispatch anytime—schedule online or talk with a live teammate.",
  },
  {
    n: 2 as const,
    title: "Tech dispatched",
    description: "A qualified technician is routed to your home or business with the right context.",
  },
  {
    n: 3 as const,
    title: "Clear options / fixed pricing / repair plan",
    description: "Straightforward choices, upfront pricing where it applies, and a written path forward.",
  },
];

function StepNumberBadge({ n, className }: { n: 1 | 2 | 3; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-red text-lg font-black text-white shadow-[0_3px_0_0_rgb(101_8_11_/0.35),0_6px_14px_-4px_rgb(215_25_32_/0.55)] ring-2 ring-white/90 sm:size-14 sm:text-xl",
        className,
      )}
      aria-hidden
    >
      {n}
    </span>
  );
}

export function TrustSequenceSection() {
  return (
    <section className="border-b border-brand-blue-dark/10 bg-brand-ice/80" aria-labelledby="trust-sequence-heading">
      <Container className="py-6 sm:py-8 lg:py-10">
        <h2 id="trust-sequence-heading" className="sr-only">
          How service works in three steps
        </h2>
        <ol className="grid gap-6 sm:gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {STEPS.map((step) => (
            <li key={step.n} className="flex gap-4 sm:gap-5 md:flex-col md:items-start">
              <div className="flex shrink-0 md:items-center">
                <StepNumberBadge n={step.n} />
              </div>
              <div className="min-w-0 pt-0.5 md:pt-0">
                <p className="text-base font-black uppercase leading-snug tracking-wide text-brand-blue-dark sm:text-lg">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-(length:--text-lead)">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
