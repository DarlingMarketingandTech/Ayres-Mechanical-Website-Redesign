"use client";

import type { CSSProperties } from "react";
import { useId } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { reviewSummary, testimonials } from "@/content/testimonials";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type TestimonialsProps = {
  limit?: number;
};

export function Testimonials({ limit }: TestimonialsProps) {
  const reduceMotion = useReducedMotion();
  const regionId = useId();

  const displayTestimonials = typeof limit === "number" ? testimonials.slice(0, limit) : testimonials;
  const hasMoreReviews = displayTestimonials.length < testimonials.length;
  const marqueeItems = [...displayTestimonials, ...displayTestimonials];

  const marqueeDurationSec = Math.max(28, displayTestimonials.length * 5.5);

  return (
    <div className="space-y-12">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="group relative overflow-hidden rounded-3xl bg-brand-blue-dark p-6 text-white shadow-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-blue-dark/35 motion-reduce:transform-none">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-red/15 via-transparent to-primary/20 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          <p className="relative z-10 text-sm font-black uppercase tracking-[0.2em] text-white/60">Reviews</p>
          <div className="relative z-10 mt-4 flex items-end gap-3">
            <p className="text-7xl font-black leading-none drop-shadow-md">{reviewSummary.rating}</p>
            <p className="pb-2 text-sm font-bold uppercase tracking-[0.18em] text-white/80">{reviewSummary.count} reviews</p>
          </div>
          <div className="relative z-10 mt-8 space-y-3">
            {reviewSummary.distribution.map((item) => (
              <div key={item.stars} className="grid grid-cols-[1.5rem_1fr_3rem] items-center gap-3 text-sm font-bold text-white/90">
                <span className="flex items-center gap-1">
                  {item.stars} <Star className="h-3 w-3 fill-current opacity-70" />
                </span>
                <div className="h-2.5 overflow-hidden rounded-full bg-black/20 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-brand-red shadow-[0_0_10px_rgba(220,38,38,0.6)]"
                  />
                </div>
                <span className="text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue-dark/10 motion-reduce:transform-none">
          <CardContent className="p-0">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">Customer proof</p>
            <h3 className="mt-4 text-3xl font-black leading-tight text-brand-blue-dark sm:text-4xl">Real reviews from Central Indiana HVAC customers.</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Ayres Mechanical has earned consistent recommendations for prompt service, practical diagnostics, fair pricing, and follow-through on heating and cooling work.
            </p>
            {hasMoreReviews ? (
              <Link
                href={routes.reviews}
                className="mt-6 inline-flex items-center gap-1 font-black text-brand-red transition-[color,transform] duration-300 hover:text-brand-blue-dark hover:translate-x-1"
              >
                Read all {reviewSummary.count} reviews →
              </Link>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {reduceMotion ? (
        <div
          id={regionId}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Customer reviews"
        >
          {displayTestimonials.map((testimonial, index) => (
            <figure key={`${testimonial.name}-${testimonial.date}-${index}`} className="w-[min(100%,22rem)] shrink-0 snap-start sm:w-[26rem]">
              <ReviewCard testimonial={testimonial} />
            </figure>
          ))}
        </div>
      ) : (
        <div
          id={regionId}
          className="ayres-marquee relative -mx-4 px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ "--ayres-marquee-duration": `${marqueeDurationSec}s` } as CSSProperties}
          aria-label="Customer reviews"
        >
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-20" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-20" />
          <div className="mask-edges overflow-hidden">
            <div className="ayres-marquee-track flex w-max gap-5 sm:gap-7">
              {marqueeItems.map((testimonial, idx) => (
                <figure key={`${testimonial.name}-${testimonial.date}-${idx}`} className="w-[min(85vw,22rem)] shrink-0 sm:w-[24rem]">
                  <ReviewCard testimonial={testimonial} />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <Card className="h-full border border-gray-100 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-xl hover:shadow-brand-blue-dark/10 motion-reduce:transform-none">
      <CardContent className="flex h-full flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", i < Math.floor(testimonial.rating) ? "fill-brand-red text-brand-red" : "fill-gray-200 text-gray-200")}
              />
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground/80">{testimonial.date}</p>
        </div>
        <blockquote className="line-clamp-6 text-base font-semibold leading-relaxed text-brand-blue-dark sm:line-clamp-5">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-auto space-y-1 text-xs font-bold text-muted-foreground">
          <p className="uppercase tracking-[0.18em] text-brand-blue-dark">{testimonial.name}</p>
          <p className="text-brand-red/80">{testimonial.recommended ? "✓ Recommends Ayres Mechanical" : "Customer review"}</p>
          {testimonial.amount ? <p className="opacity-75">Project cost: {testimonial.amount}</p> : null}
        </figcaption>
      </CardContent>
    </Card>
  );
}
