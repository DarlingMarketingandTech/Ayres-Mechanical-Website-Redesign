import Link from "next/link";
import { Phone, Siren } from "lucide-react";

import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";

export function EmergencyCTA() {
  return (
    <div className="grid gap-5 rounded-3xl bg-brand-red p-6 text-white shadow-xl lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6 lg:p-8">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15">
        <Siren className="size-7" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-3xl font-black text-white">Heating or cooling emergency?</h2>
        <p className="mt-2 max-w-3xl text-white/85">
          Call{" "}
          <a href={phoneHref} className="font-black text-white underline underline-offset-4" aria-label={`Call now at ${siteConfig.phone}`}>
            {siteConfig.phone}
          </a>{" "}
          for urgent HVAC service. Not an emergency?{" "}
          <Link href={routes.requestService} className="font-black text-white underline underline-offset-4">
            Request service online
          </Link>
          .
        </p>
        <a
          href={phoneHref}
          className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-white"
          aria-label={`Call now at ${siteConfig.phone}`}
        >
          <Phone data-icon="inline-start" className="size-4" aria-hidden="true" />
          Emergency call line
        </a>
      </div>
    </div>
  );
}
