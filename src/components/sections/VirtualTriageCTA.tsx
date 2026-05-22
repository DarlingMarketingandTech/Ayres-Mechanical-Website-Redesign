import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type VirtualTriageCTAProps = {
  className?: string;
  /** When false, only the inner card is rendered (parent supplies Container/Section). */
  withContainer?: boolean;
  interactiveToolId?: string;
};

export function VirtualTriageCTA({ className, withContainer = true, interactiveToolId }: VirtualTriageCTAProps) {
  const card = (
    <div
      data-interactive-tool={interactiveToolId}
      className={cn(
        "grid gap-6 rounded-[2rem] border border-brand-blue/20 bg-brand-ice p-6 shadow-sm lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8 lg:p-8",
        className,
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_6px_18px_-6px_rgb(13_63_184_/0.45)]">
        <Wrench className="size-7" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Free Virtual Triage</p>
        <h2 className="mt-2 text-2xl font-black text-balance text-brand-blue-dark sm:text-3xl">
          Got an HVAC issue?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Before you spend money on a service call, run your symptoms through our Virtual Triage Assistant to see if
          it&apos;s a quick DIY fix.
        </p>
      </div>
      <Link
        href={routes.troubleshoot}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "w-full justify-center lg:w-auto lg:shrink-0",
        )}
      >
        Start Virtual Triage
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );

  if (!withContainer) {
    return card;
  }

  return <Container>{card}</Container>;
}
