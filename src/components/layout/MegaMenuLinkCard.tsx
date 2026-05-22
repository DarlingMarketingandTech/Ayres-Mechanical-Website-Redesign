"use client";

import Link from "next/link";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import type { NavigationChild } from "@/content/navigation";
import { cn } from "@/lib/utils";

type MegaMenuLinkCardProps = {
  item: NavigationChild;
  active?: boolean;
};

export function MegaMenuLinkCard({ item, active }: MegaMenuLinkCardProps) {
  const Icon = item.icon;
  const isCta = item.variant === "cta";

  return (
    <NavigationMenuLink
      render={<Link href={item.href} />}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors motion-reduce:transition-none",
        isCta
          ? [
              "border-brand-blue-dark/10 bg-brand-ice",
              "hover:border-brand-blue-dark/20 hover:bg-brand-ice/70",
              active && "border-primary/20 bg-brand-ice",
            ]
          : [
              "border-transparent bg-transparent",
              "hover:border-brand-blue-dark/10 hover:bg-secondary/70",
              active && "border-primary/15 bg-brand-ice",
            ],
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "mt-0.5 size-4 shrink-0",
            isCta ? "text-primary" : "text-brand-blue-dark/50",
          )}
          aria-hidden="true"
        />
      )}
      <div className="min-w-0">
        <span
          className={cn(
            "block text-sm font-black leading-snug",
            isCta ? "text-primary" : "text-brand-blue-dark",
          )}
        >
          {item.label}
        </span>
        {item.description && (
          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {item.description}
          </span>
        )}
      </div>
    </NavigationMenuLink>
  );
}
