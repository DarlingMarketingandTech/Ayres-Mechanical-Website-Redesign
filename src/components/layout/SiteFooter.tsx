import Link from "next/link";
import { Clock, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import {
  companyNavigation,
  footerCommercialLinks,
  footerServiceLinks,
  primaryNavigation,
} from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-brand-blue-dark text-white max-lg:pb-[var(--mobile-bottom-chrome-h)]">
      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:gap-12">
          {/* Brand & Contact */}
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1">
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

          {/* Services */}
          <nav aria-label="Services">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Services</p>
            <ul className="mt-5 space-y-3">
              {footerServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Commercial */}
          <nav aria-label="Commercial HVAC">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Commercial</p>
            <ul className="mt-5 space-y-3">
              {footerCommercialLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Company</p>
            <ul className="mt-5 space-y-3">
              {companyNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* More */}
          <nav aria-label="More links">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">More</p>
            <ul className="mt-5 space-y-3">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={routes.requestService}
                  className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                >
                  Request Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom: Legal */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs font-medium text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ayres Mechanical Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href={routes.privacy} className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href={routes.terms} className="transition-colors hover:text-white">
              Terms
            </Link>
            <span>{siteConfig.creditLine}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
