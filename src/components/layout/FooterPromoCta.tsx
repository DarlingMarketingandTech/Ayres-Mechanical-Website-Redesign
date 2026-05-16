"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { phoneOutlineCtaClassNames, requestServiceCtaClassNames } from "@/lib/cta-interactions";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

import { useInPageCta } from "@/components/providers/in-page-cta-context";

export function FooterPromoCta() {
  const { hasInPageCta } = useInPageCta();

  if (hasInPageCta) {
    return null;
  }

  return (
    <div className="mb-10 grid gap-6 rounded-2xl bg-white p-6 text-brand-blue-dark shadow-xl lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">24 Hour Service</p>
        <h2 className="mt-2 text-(length:--text-section) font-black text-balance">Need HVAC help now?</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Call Ayres Mechanical or request service online for residential, commercial, and industrial HVAC support.
        </p>
      </div>
      <div className="hidden flex-col gap-3 lg:flex lg:flex-row">
        <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), requestServiceCtaClassNames())}>
          Request Service
        </Link>
        <a href={phoneHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }), phoneOutlineCtaClassNames())}>
          <Phone data-icon="inline-start" className="size-4" aria-hidden />
          Call {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
