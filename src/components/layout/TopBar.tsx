import { Clock, Phone } from "lucide-react";

import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { Container } from "./Container";

export function TopBar() {
  return (
    <div className="bg-brand-blue-dark text-white">
      <Container className="flex min-h-11 flex-col items-center justify-center gap-2 py-2.5 text-center text-sm font-semibold text-balance sm:min-h-10 sm:flex-row sm:justify-between sm:py-2 sm:text-left">
        <a
          href={phoneHref}
          className="inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-md px-2 py-1 hover:underline sm:min-h-0 sm:justify-start"
        >
          <Phone className="size-4 shrink-0" aria-hidden="true" />
          Call {siteConfig.phone}
        </a>
        <p className="inline-flex max-w-prose items-center justify-center gap-2 text-white/90 sm:max-w-none sm:justify-end">
          <Clock className="size-4 shrink-0" aria-hidden="true" />
          <span className="leading-snug">24 Hour Service · Residential · Commercial · Industrial</span>
        </p>
      </Container>
    </div>
  );
}
