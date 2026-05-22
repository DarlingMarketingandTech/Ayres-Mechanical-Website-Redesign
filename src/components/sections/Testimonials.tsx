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
  /** Full homepage/reviews layout, or compact strip for embedded pages (e.g. About). */
  variant?: "default" | "embedded";
  /** Marquee edge fade color — use parent section background on embedded layouts. */
  marqueeFadeClassName?: string;
};

export function Testimonials({ limit, variant = "default", marqueeFadeClassName = "from-background" }: TestimonialsProps) {
  const reduceMotion = useReducedMotion();
  const regionId = useId();

  const displayTestimonials = typeof limit === "number" ? testimonials.slice(0, limit) : testimonials;
  const hasMoreReviews = displayTestimonials.length < testimonials.length;
  const marqueeItems = [...displayTestimonials, ...displayTestimonials];

  const marqueeDurationSec = Math.max(28, displayTestimonials.length * 5.5);
  const isEmbedded = variant === "embedded";

  return (
    <div className={cn("space-y-8", isEmbedded ? "sm:space-y-10" : "sm:space-y-12")}>
      {isEmbedded ? (
        <div className="flex flex-col gap-5 rounded-3xl border border-border/70 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
          <div className="flex flex-wrap items-end gap-3 sm:gap-4">
            <p className="w-full text-sm font-black uppercase tracking-[0.2em] text-brand-red sm:w-auto">Rated by customers</p>
            <p className="text-5xl font-black leading-none text-brand-blue-dark">{reviewSummary.rating}</p>
            <div className="flex items-center gap-0.5 pb-1" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-red text-brand-red" />
              ))}
            </div>
            <p className="pb-1 text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {reviewSummary.count} verified reviews
            </p>
          </div>
          {hasMoreReviews ? (
            <Link
              href={routes.reviews}
              className="inline-flex shrink-0 items-center gap-1 font-black text-brand-red transition-[color,transform] duration-300 hover:text-brand-blue-dark hover:translate-x-0.5"
            >
              Read all reviews →
            </Link>
          ) : null}
        </div>
      ) : (
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="group relative overflow-hidden rounded-3xl bg-brand-blue-dark p-5 text-white shadow-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-blue-dark/35 motion-reduce:transform-none sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-red/15 via-transparent to-primary/20 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          <p className="relative z-10 text-sm font-black uppercase tracking-[0.2em] text-white/60">Reviews</p>
          <div className="relative z-10 mt-3 flex items-center justify-between gap-4 sm:mt-4 sm:items-end sm:justify-start">
            <div className="flex items-end gap-2 sm:gap-3">
              <p className="text-5xl font-black leading-none drop-shadow-md sm:text-7xl">{reviewSummary.rating}</p>
              <div className="flex items-center gap-0.5 pb-1 sm:pb-2" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-red text-brand-red sm:h-4 sm:w-4" />
                ))}
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80 sm:hidden">{reviewSummary.count} reviews</p>
            <p className="hidden pb-2 text-sm font-bold uppercase tracking-[0.18em] text-white/80 sm:block">{reviewSummary.count} reviews</p>
          </div>
          <div className="relative z-10 mt-5 space-y-2 sm:mt-8 sm:space-y-3 max-sm:[&>div:nth-child(n+3)]:hidden">
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

        <Card className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue-dark/10 motion-reduce:transform-none sm:p-8">
          <CardContent className="p-0">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">Customer proof</p>
            <h3 className="mt-3 text-2xl font-black leading-tight text-brand-blue-dark sm:mt-4 sm:text-3xl lg:text-4xl">Real reviews from Central Indiana HVAC customers.</h3>
            <p className="mt-3 hidden text-base leading-relaxed text-muted-foreground sm:mt-4 sm:block sm:text-lg">
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
      )}

      {reduceMotion ? (
        <div
          id={regionId}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Customer reviews"
        >
          {displayTestimonials.map((testimonial, index) => (
            <figure key={`${testimonial.name}-${testimonial.date}-${index}`}>
              <ReviewCard testimonial={testimonial} />
            </figure>
          ))}
        </div>
      ) : (
        <div
          id={regionId}
          className={cn(
            "ayres-marquee relative py-4",
            isEmbedded ? "-mx-0 px-0" : "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
          )}
          style={{ "--ayres-marquee-duration": `${marqueeDurationSec}s` } as CSSProperties}
          aria-label="Customer reviews"
        >
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-10 bg-gradient-to-r to-transparent sm:w-16 lg:w-20",
              marqueeFadeClassName,
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-10 bg-gradient-to-l to-transparent sm:w-16 lg:w-20",
              marqueeFadeClassName,
            )}
          />
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
