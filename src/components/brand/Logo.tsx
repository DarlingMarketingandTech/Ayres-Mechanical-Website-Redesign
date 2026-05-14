import Link from "next/link";

import { siteConfig } from "@/content/site";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { TriangleMark } from "./TriangleMark";

type LogoProps = {
  className?: string;
  markTone?: "default" | "light";
  href?: string;
};

export function Logo({ className, markTone = "default", href = routes.home }: LogoProps) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-3", className)} aria-label={siteConfig.name}>
      <span className="flex size-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border">
        <TriangleMark className="h-9 w-6" tone={markTone} />
      </span>
      <span className="leading-none">
        <span className="block font-heading text-2xl font-black tracking-tight text-brand-blue">AYRES</span>
        <span className="block font-heading text-lg font-black tracking-[0.12em] text-brand-red">MECHANICAL</span>
      </span>
    </Link>
  );
}
