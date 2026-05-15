import Link from "next/link";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { Logo } from "@/components/brand/Logo";
import { FooterPromoCta } from "@/components/layout/FooterPromoCta";
import { industries } from "@/content/industries";
import { serviceLocations } from "@/content/locations";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand-blue-dark text-white">
      <BrandPattern variant="dark" />
      <Container className="relative py-12 max-lg:pb-[calc(var(--mobile-bottom-chrome-h)+3rem+env(safe-area-inset-bottom))] lg:pb-12">
        <FooterPromoCta />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="max-w-[min(100%,280px)]" />
            <p className="mt-5 max-w-sm text-white/75">{siteConfig.description}</p>
            <a href={phoneHref} className="mt-5 inline-block text-xl font-black text-white hover:underline">{siteConfig.phone}</a>
          </div>
          <FooterLinks title="Services" links={services.map((service) => ({ label: service.shortTitle, href: routes.service(service.slug) }))} />
          <FooterLinks title="Industries" links={industries.map((industry) => ({ label: industry.title.replace(" Services", ""), href: routes.industry(industry.slug) }))} />
          <FooterLinks title="Service Area" links={[{ label: "Service Area", href: routes.serviceArea }, ...serviceLocations.map((location) => ({ label: location.city + ", IN", href: routes.location(location.slug) }))]} />
        </div>
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row">
          <p>© {new Date().getFullYear()} Ayres Mechanical Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href={routes.privacy} className="hover:text-white">Privacy Policy</Link>
            <Link href={routes.terms} className="hover:text-white">Terms</Link>
            <Link href={routes.financing} className="hover:text-white">Financing</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">{title}</h3>
      <ul className="mt-4 grid gap-2 text-white/75">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-white hover:underline">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
