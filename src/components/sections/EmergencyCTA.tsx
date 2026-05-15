import Link from "next/link";
import { Siren } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function EmergencyCTA({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6 rounded-3xl bg-brand-red p-6 text-white shadow-xl lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-8", className)}>
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15"><Siren className="size-7" aria-hidden="true" /></div>
      <div>
        <h2 className="text-3xl font-black text-white">Heating or cooling emergency?</h2>
        <p className="mt-2 text-white/85">Call {siteConfig.phone} for urgent HVAC service, or submit the request form with emergency urgency selected.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href={phoneHref} className={cn(buttonVariants({ variant: "inverse", size: "lg" }))}>Call Now</a>
        <Link href={routes.requestService} className={cn(buttonVariants({ variant: "dark", size: "lg" }))}>Request Service</Link>
      </div>
    </div>
  );
}
