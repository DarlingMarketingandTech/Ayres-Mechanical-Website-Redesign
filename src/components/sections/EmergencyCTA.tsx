import Link from "next/link";
import { Siren } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type EmergencyCTAProps = {
  className?: string;
  /** Slightly tighter layout for mid-page placement. */
  compact?: boolean;
};

export function EmergencyCTA({ className, compact = false }: EmergencyCTAProps) {
  const emergencyRequestHref = routes.requestServiceQuery({ service: "emergency", emergency: true });

  return (
    <section
      aria-labelledby="emergency-cta-heading"
      className={cn(
        "grid gap-6 rounded-3xl border border-brand-red/25 bg-linear-to-br from-brand-red via-brand-red to-[#b8141a] p-6 text-white shadow-[0_12px_40px_rgb(215_25_32_/0.28)] lg:items-center",
        compact ? "lg:grid-cols-[auto_1fr_auto] lg:gap-5 lg:p-6" : "lg:grid-cols-[auto_1fr_auto] lg:p-8",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25",
          "animate-emergency-pulse",
        )}
        aria-hidden
      >
        <Siren className="size-7" />
      </div>
      <div>
        <h2 id="emergency-cta-heading" className={cn("font-black text-white", compact ? "text-2xl" : "text-3xl")}>
          Heating or cooling emergency?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
          Call {siteConfig.phone} for urgent HVAC service, or request service online with emergency urgency selected.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <a href={phoneHref} className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "min-h-12 justify-center")}>
          Call Now
        </a>
        <Link
          href={emergencyRequestHref}
          className={cn(buttonVariants({ variant: "dark", size: "lg" }), "min-h-12 justify-center")}
        >
          Request Service
        </Link>
      </div>
    </section>
  );
}
