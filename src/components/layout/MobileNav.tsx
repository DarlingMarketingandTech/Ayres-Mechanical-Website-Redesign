"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { primaryNavigation, utilityNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <Button variant="outline" size="icon" aria-label="Open menu" onClick={() => setOpen(true)}>
        <Menu aria-hidden="true" />
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-brand-blue-dark/40 backdrop-blur-sm" role="presentation">
          <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-2xl" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <div className="flex items-center justify-between border-b p-4">
              <Logo />
              <Button variant="ghost" size="icon" aria-label="Close menu" onClick={close}>
                <X aria-hidden="true" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile primary navigation">
              {primaryNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={close} className="rounded-lg px-3 py-3 text-base font-bold text-brand-blue-dark hover:bg-secondary">
                  {item.label}
                </Link>
              ))}
              {utilityNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={close} className="rounded-lg px-3 py-3 text-base font-bold text-brand-blue-dark hover:bg-secondary">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto grid gap-3 border-t p-4">
              <Button variant="emergency" size="lg" onClick={close}>
                <Link href={routes.requestService}>Request Service</Link>
              </Button>
              <a href={phoneHref} className="rounded-lg border border-border px-4 py-3 text-center font-bold text-brand-blue-dark">
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
