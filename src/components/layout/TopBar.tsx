import { Clock, Phone } from "lucide-react";

import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { Container } from "./Container";

export function TopBar() {
  return (
    <div className="bg-brand-blue-dark text-white">
      <Container className="flex min-h-10 flex-col items-center justify-between gap-2 py-2 text-sm font-semibold sm:flex-row">
        <a href={phoneHref} className="inline-flex items-center gap-2 hover:underline">
          <Phone className="size-4" aria-hidden="true" />
          Call {siteConfig.phone}
        </a>
        <p className="inline-flex items-center gap-2 text-white/90">
          <Clock className="size-4" aria-hidden="true" />
          24 Hour Service · Residential · Commercial · Industrial
        </p>
      </Container>
    </div>
  );
}
