import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { RegisterInPageCta } from "@/components/providers/in-page-cta-context";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { phoneOutlineCtaClassNames, requestServiceCtaClassNames } from "@/lib/cta-interactions";
import { cn } from "@/lib/utils";

export function CTASection({ title = "Ready to schedule HVAC service?", description = "Tell Ayres Mechanical what is happening and how urgent it is. A clear request helps route the right next step." }: { title?: string; description?: string }) {
  return (
    <RegisterInPageCta>
      <section className="relative overflow-hidden bg-brand-blue-dark py-16 sm:py-24 text-white group">
        <BrandPattern variant="dark" className="opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
        {/* Subtle glowing radial gradient in the background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue-light/10 via-brand-blue-dark/0 to-transparent pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
        
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/60 mb-2">Request Service</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">{title}</h2>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-white/75">{description}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row mt-6 lg:mt-0">
            <Link
              href={routes.requestService}
              className={cn(buttonVariants({ variant: "emergency", size: "lg" }), requestServiceCtaClassNames(), "relative overflow-hidden")}
            >
              Request Service
              <ArrowRight data-icon="inline-end" className="w-4 h-4" aria-hidden />
            </Link>
            <a href={phoneHref} className={cn(buttonVariants({ variant: "inverse", size: "lg" }), phoneOutlineCtaClassNames(), "shadow-lg shadow-black/10 hover:bg-white/90")}>
              <Phone data-icon="inline-start" className="w-4 h-4" aria-hidden />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </RegisterInPageCta>
  );
}
