import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/Hero";
import { MotionReveal } from "@/components/sections/MotionReveal";
import { AnimatedCardGrid } from "@/components/sections/AnimatedCardGrid";
import { buttonVariants } from "@/components/ui/button";
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
      />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <MotionReveal>
            <PlaceholderPanel
              eyebrow="Team Placeholder"
              title="Brian & Sabra image placeholder"
              description="Swap this block with the owner-approved Brian and Sabra image when the final Cloudinary asset is ready."
              tag="Placeholder Asset"
              caption="Pictured here is owner/operator Brian Ayres and Office Manager Sabra Evanoff. We are the faces behind the phone calls and the service vans, and we are personally committed to your comfort."
            />
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
                <p className="mt-4 leading-8 text-muted-foreground">
                  Add your approved review carousel, testimonial cards, or review-summary module here when the final Cloudinary and review assets are ready.
                </p>
              </div>
              <PlaceholderPanel
                eyebrow="Reviews Placeholder"
                title="Customer review module placeholder"
                description="Reserved for review cards, star ratings, or a testimonial reel."
                tag="Placeholder Component"
              />
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
              <PlaceholderPanel
                eyebrow="Service Vans Placeholder"
                title="Service van image placeholder"
                description="Swap this block with approved service van or fleet imagery from Cloudinary."
                tag="Placeholder Asset"
              />
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }))}>
                  Request Service
                  <ArrowRight aria-hidden="true" />
                </Link>
                <Link href={routes.services} className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Explore Our Services
                </Link>
                <a href={phoneHref} className={buttonVariants({ variant: "dark", size: "lg" })}>
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

function PlaceholderPanel({
  eyebrow,
  title,
  description,
  tag,
  caption,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tag: string;
  caption?: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-border/80 bg-gradient-to-br from-brand-ice via-white to-secondary p-6">
      <div className="flex min-h-[18rem] flex-col justify-between rounded-[1.5rem] border border-dashed border-brand-blue-dark/15 bg-white/75 p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-red">{eyebrow}</p>
          <span className="rounded-full bg-brand-blue-dark px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">{tag}</span>
        </div>
        <div>
          <h3 className="text-2xl font-black text-brand-blue-dark">{title}</h3>
          <p className="mt-3 max-w-xl leading-8 text-muted-foreground">{description}</p>
        </div>
      </div>
      {caption ? <p className="mt-4 text-sm leading-7 text-muted-foreground">{caption}</p> : null}
    </div>
  );
}
