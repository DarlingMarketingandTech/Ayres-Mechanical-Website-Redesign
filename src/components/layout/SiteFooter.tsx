import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { serviceCounties } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-brand-blue-dark text-white max-lg:pb-[var(--mobile-bottom-chrome-h)]">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Brand & Contact */}
          <div className="flex max-w-sm flex-col items-start">
            <Logo linkClassName="max-w-full" className="h-auto w-full max-h-12 sm:max-h-14" />
            
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/70">
              <Clock className="size-4 text-brand-ice/70" aria-hidden="true" />
              Family-Owned &amp; Operated since 2007.
            </p>
            
            <a 
              href={phoneHref} 
              className="group mt-8 flex flex-col gap-1 rounded-2xl bg-white/5 p-5 transition-colors hover:bg-white/10"
            >
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-ice">
                <Phone className="size-4" aria-hidden="true" />
                Emergency 24/7
              </span>
              <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {siteConfig.phone}
              </span>
            </a>
          </div>

          {/* Right: Service Area */}
          <div className="lg:max-w-md lg:pt-2">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/50">
              Service Area
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-medium text-white/80 sm:gap-x-12">
              {serviceCounties.map((county) => (
                <li key={county.name} className="flex items-center gap-2.5">
                  <MapPin className="size-4 shrink-0 text-brand-ice/70" aria-hidden="true" />
                  <span>{county.name.replace(" County", "")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: Legal */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs font-medium text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ayres Mechanical Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href={routes.privacy} className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span>{siteConfig.creditLine}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
