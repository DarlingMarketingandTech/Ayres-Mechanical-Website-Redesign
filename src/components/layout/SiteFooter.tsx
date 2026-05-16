import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import { footerServiceLinks } from "@/content/navigation";
import { serviceCounties } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

const trustMarkers = ["Rheem Dealer", "Mitsubishi Diamond Contractor", "4.9 Star Rating"] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-brand-blue-dark text-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Logo linkClassName="max-w-full" className="h-auto w-full max-h-12 sm:max-h-14" />
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/75">
              <Clock className="size-4" aria-hidden="true" />
              Family-Owned &amp; Operated since 2007.
            </p>
            <a href={phoneHref} className="mt-6 inline-flex items-center gap-3 text-2xl font-black text-white transition-colors hover:text-brand-ice sm:text-3xl">
              <Phone className="size-6" aria-hidden="true" />
              <span>
                <span className="block text-sm font-black uppercase tracking-[0.18em] text-white/70">Emergency 24/7</span>
                {siteConfig.phone}
              </span>
            </a>
          </div>

          <FooterColumn title="Our Services">
            <ul className="grid gap-3 text-white/75">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Service Area">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
              <MapPin className="size-4" aria-hidden="true" />
              Local Expertise. No Travel Fees.
            </p>
            <ul className="mt-4 grid gap-3 text-white/75">
              {serviceCounties.map((county) => (
                <li key={county.name} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-ice" aria-hidden="true" />
                  <span>{county.name.replace(" County", "")}</span>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Connect &amp; Trust">
            <div className="grid gap-3">
              {trustMarkers.map((marker) => (
                <div key={marker} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                  <p className="text-sm font-black text-white">{marker}</p>
                  <div className="mt-3 h-9 rounded-xl border border-dashed border-white/20 bg-white/4" aria-hidden="true" />
                </div>
              ))}
            </div>
            <Link href={routes.requestService} className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "mt-5 w-full justify-center")}>
              Request Service Online
            </Link>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ayres Mechanical Inc. All rights reserved.</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <Link href={routes.privacy} className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span>Built by Darling Marketing &amp; Tech</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
