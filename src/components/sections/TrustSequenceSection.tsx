import { HomeSectionHeading } from "@/components/home/SectionEyebrow";
import { SectionDivider } from "@/components/home/SectionDivider";
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
    <section
      className="relative border-b border-brand-blue-dark/10 bg-linear-to-b from-white via-brand-ice/70 to-brand-ice"
      aria-labelledby="trust-sequence-heading"
    >
      <Container className="pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12">
        <HomeSectionHeading
          eyebrow="PROCESS"
          title="From first contact to a completed plan."
          description="Every dispatch follows the same transparent rhythm—so you always know what happens next."
        />
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
        <SectionDivider className="mt-10 max-w-3xl" />
      </Container>
    </section>
  );
}
