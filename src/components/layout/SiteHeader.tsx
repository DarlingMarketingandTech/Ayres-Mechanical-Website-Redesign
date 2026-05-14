import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import { primaryNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { TopBar } from "./TopBar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <TopBar />
      <Container className="flex min-h-20 items-center justify-between gap-6 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-bold text-brand-blue-dark hover:bg-secondary hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={phoneHref} className="text-sm font-black text-brand-blue-dark hover:text-primary">
            {siteConfig.phone}
          </a>
          <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }))}>
            Request Service
          </Link>
        </div>
        <MobileNav />
      </Container>
    </header>
  );
}
