import Link from "next/link";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/Hero";
import { MotionReveal } from "@/components/sections/MotionReveal";
import { AnimatedCardGrid } from "@/components/sections/AnimatedCardGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/content/media";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";

export const metadata = pageMetadata({ title: "About", description: "Learn about Ayres Mechanical Inc., a Central Indiana heating and air conditioning company serving residential, commercial, and industrial customers.", path: "/about" });

const whyChooseItems = [
  {
    title: "Elite Credentials",
    description: "We are a proud Rheem Dealer and a Mitsubishi Diamond Contractor.",
  },
  {
    title: "Straightforward Pricing",
    description: "Free project estimates and a transparent $25 service fee with no-surprises billing.",
  },
  {
    title: "24-Hour Emergency Response",
    description: "Indiana weather doesn’t stick to a 9-to-5 schedule, and neither does our team.",
  },
  {
    title: "Comprehensive Expertise",
    description: "From residential split systems to commercial RTUs and industrial refrigeration, we support a wide range of equipment and environments.",
  },
];

const counties = ["Marion", "Hendricks", "Hamilton", "Montgomery", "Putnam", "Boone"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Ayres Mechanical"
        title="A Practical HVAC Service Partner for Central Indiana."
        description="Ayres Mechanical serves residential, commercial, and industrial customers with direct communication and dependable service."
        backgroundImage={media.home.localProof}
        photoOverlay="light-blend"
        backgroundPriority
      />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <MotionReveal>
            <figure className="overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-sm">
              <div className="relative w-full" style={{ aspectRatio: `${media.about.ownerTeam.width} / ${media.about.ownerTeam.height}` }}>
                <CloudinaryImage
                  asset={media.about.ownerTeam}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  width={Math.min(media.about.ownerTeam.width, 1400)}
                  height={Math.max(
                    2,
                    Math.round(
                      (media.about.ownerTeam.height / media.about.ownerTeam.width) * Math.min(media.about.ownerTeam.width, 1400),
                    ),
                  )}
                  className="object-cover object-top"
                  crop="fill"
                  gravity="auto"
                />
              </div>
              <figcaption className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                Brian Ayres and Sabra Evanoff are the faces behind the phone calls and the service vans, personally committed to your comfort.
              </figcaption>
            </figure>
          </MotionReveal>
          <MotionReveal>
            <div className="rounded-[2rem] border border-border/70 bg-white p-7 shadow-sm sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Our Story</p>
              <h2 className="mt-3 text-4xl font-black text-balance text-brand-blue-dark">Real People, Real Equipment, a Direct Promise.</h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                Ayres Mechanical, Inc. was founded in 2007 by Brian Ayres with a simple goal: to provide Central Indiana with a high-quality HVAC partner that values honesty over high-pressure sales.
              </p>
              <p className="mt-4 leading-8 text-muted-foreground">
                As a family-run business, we understand that when your heating or cooling fails, you don’t just need a technician—you need peace of mind. That’s why we focus on practical diagnostics.
              </p>
              <p className="mt-4 leading-8 text-muted-foreground">
                We won’t tell you to replace a system that can be reliably repaired, and we won’t leave you guessing about the cost.
              </p>
            </div>
          </MotionReveal>
        </Container>
      </Section>
      <Section className="bg-brand-ice">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Why Choose Ayres Mechanical</p>
            <h2 className="mt-3 text-4xl font-black text-balance text-brand-blue-dark">A direct service experience backed by practical expertise.</h2>
          </div>
          <AnimatedCardGrid items={whyChooseItems} className="md:grid-cols-2 xl:grid-cols-4" />
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-8 lg:grid-cols-2">
          <MotionReveal>
            <div className="space-y-6 rounded-[2rem] border border-border/70 bg-white p-7 shadow-sm sm:p-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Social Proof</p>
                <h2 className="mt-3 text-4xl font-black text-balance text-brand-blue-dark">What Our Customers Say</h2>
              </div>
              <Testimonials limit={3} />
            </div>
          </MotionReveal>
          <MotionReveal>
            <div className="space-y-6 rounded-[2rem] border border-border/70 bg-brand-blue-dark p-7 text-white shadow-sm sm:p-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-white/60">Service Area</p>
                <h2 className="mt-3 text-4xl font-black text-balance">Central Indiana coverage with dependable support.</h2>
                <p className="mt-4 leading-8 text-white/75">
                  We provide high-quality heating and cooling at a reasonable rate, serving residential, commercial, and industrial customers throughout Central Indiana.
                </p>
              </div>
              <figure className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 shadow-lg">
                <div className="relative w-full" style={{ aspectRatio: `${media.home.localProof.width} / ${media.home.localProof.height}` }}>
                  <CloudinaryImage
                    asset={media.home.localProof}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    width={960}
                    height={720}
                    className="object-cover object-center"
                    crop="fill"
                    gravity="auto"
                  />
                </div>
                <figcaption className="sr-only">{media.home.localProof.alt}</figcaption>
              </figure>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white/60">Currently serving</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {counties.map((county) => (
                    <span key={county} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85">
                      {county} County
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <MotionReveal>
            <div className="rounded-[2rem] border border-border/70 bg-white p-7 shadow-sm sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Ready to get started?</p>
              <h2 className="mt-3 text-4xl font-black text-balance text-brand-blue-dark">Whether you have a quick question or need a full project quote, we would love to assist you.</h2>
              <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
                From a strange furnace noise at home to a detailed commercial installation scope, our team is ready to help you choose the clearest next step.
              </p>
              <div className="mt-8 hidden w-full flex-col gap-3 lg:flex lg:flex-row lg:flex-wrap">
                <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "w-full min-h-12 justify-center sm:w-auto")}>
                  Request Service
                  <ArrowRight aria-hidden="true" />
                </Link>
                <Link href={routes.services} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full min-h-12 justify-center sm:w-auto")}>
                  Explore Our Services
                </Link>
                <a href={phoneHref} className={cn(buttonVariants({ variant: "dark", size: "lg" }), "w-full min-h-12 justify-center sm:w-auto")}>
                  <Phone aria-hidden="true" />
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </Section>
    </>
  );
}

