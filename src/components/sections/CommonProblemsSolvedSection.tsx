import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { routes } from "@/lib/routes";
import { phoneHref } from "@/lib/constants";
import { siteConfig } from "@/content/site";

const problems = [
  {
    symptom: "Blowing warm air?",
    solution: "See AC Repair",
    href: routes.service("cooling"),
    external: false,
  },
  {
    symptom: "Making strange noises?",
    solution: "Request a Diagnostic",
    href: routes.requestService,
    external: false,
  },
  {
    symptom: "Spiking your energy bills?",
    solution: "View Maintenance Plans",
    href: routes.service("maintenance"),
    external: false,
  },
  {
    symptom: "Not turning on at all?",
    solution: `Call ${siteConfig.phone} — 24-Hour Emergency Service`,
    href: phoneHref,
    external: true,
  },
] as const;

export function CommonProblemsSolvedSection() {
  return (
    <Section className="bg-brand-blue-dark text-white">
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-white/60">
            Common Problems Solved
          </p>
          <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-white">
            Is your system…
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {problems.map(({ symptom, solution, href, external }) => {
            const rowClass =
              "group flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/8 px-5 py-4 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/14 motion-reduce:transform-none";
            const inner = (
              <>
                <span className="text-base font-black text-white sm:text-lg">{symptom}</span>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand-red/90 group-hover:text-brand-red transition-colors duration-300">
                  {solution}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </span>
              </>
            );
            return external ? (
              <a key={symptom} href={href} className={rowClass}>
                {inner}
              </a>
            ) : (
              <Link key={symptom} href={href} className={rowClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
