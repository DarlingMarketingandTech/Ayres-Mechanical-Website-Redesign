import Link from "next/link";
import { MapPin } from "lucide-react";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/sections/MotionReveal";
import { media } from "@/content/media";
import { serviceCounties } from "@/content/locations";
import { routes } from "@/lib/routes";

export function AboutServiceAreaSection() {
  return (
    <Section>
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-brand-blue-dark text-white shadow-lg">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
            <MotionReveal>
              <div className="flex flex-col justify-center p-7 sm:p-8 lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Service Area</p>
              <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-white">
                Central Indiana coverage with dependable support.
              </h2>
              <p className="mt-4 max-w-xl text-(length:--text-lead) leading-relaxed text-white/80">
                We provide high-quality heating and cooling at a reasonable rate, serving residential, commercial, and
                industrial customers throughout Central Indiana — with no travel charges inside our six-county region.
              </p>
              <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-white/70">Currently serving</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {serviceCounties.map(({ name, representative }) => (
                  <li
                    key={name}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                      <MapPin className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-white">{name}</span>
                      <span className="block truncate text-xs font-bold text-white/70">{representative}, IN</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-bold text-white/75">
                Looking for your city?{" "}
                <Link
                  href={routes.serviceArea}
                  className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-brand-red hover:decoration-brand-red"
                >
                  View all service area locations →
                </Link>
              </p>
              </div>
            </MotionReveal>

            <MotionReveal>
              <figure className="relative min-h-[16rem] w-full lg:min-h-[28rem]">
                <CloudinaryImage
                  asset={media.home.localProof}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-center"
                  crop="fill"
                  gravity="auto"
                />
                <figcaption className="sr-only">{media.home.localProof.alt}</figcaption>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue-dark/80 via-brand-blue-dark/20 to-transparent lg:bg-gradient-to-r lg:from-brand-blue-dark/90 lg:via-brand-blue-dark/25 lg:to-transparent"
                  aria-hidden="true"
                />
              </figure>
            </MotionReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
