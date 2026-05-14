import Link from "next/link";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function CTASection({ title = "Ready to schedule HVAC service?", description = "Tell Ayres Mechanical what is happening and how urgent it is. A clear request helps route the right next step." }: { title?: string; description?: string }) {
  return (
    <section className="relative overflow-hidden bg-brand-blue-dark py-16 text-white">
      <BrandPattern variant="dark" />
      <div className="relative mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-white/60">Request Service</p>
          <h2 className="mt-3 text-4xl font-black text-white">{title}</h2>
          <p className="mt-3 max-w-2xl text-lg text-white/75">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }))}>Request Service</Link>
          <a href={phoneHref} className={cn(buttonVariants({ variant: "inverse", size: "lg" }))}>Call {siteConfig.phone}</a>
        </div>
      </div>
    </section>
  );
}
