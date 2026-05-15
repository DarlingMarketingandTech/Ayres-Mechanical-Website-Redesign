import Link from "next/link";
import { Star } from "lucide-react";
import type { CSSProperties } from "react";

import { reviewSummary, testimonials } from "@/content/testimonials";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type TestimonialsProps = {
  limit?: number;
  /** When false, hides the right “pitch” column so the page can supply its own section heading. */
  showPitchColumn?: boolean;
};

export function Testimonials({ limit, showPitchColumn = true }: TestimonialsProps) {
  const visibleTestimonials = typeof limit === "number" ? testimonials.slice(0, limit) : testimonials;
  const hasMoreReviews = visibleTestimonials.length < testimonials.length;

  return (
    <div className="space-y-6">
      <div className={showPitchColumn ? "grid gap-5 lg:grid-cols-[0.85fr_1.15fr]" : "max-w-md"}>
        <div className="rounded-2xl bg-brand-blue-dark p-6 text-white shadow-lg ring-1 ring-brand-blue-dark/20">
          {showPitchColumn ? (
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white/60">Reviews</p>
          ) : null}
          <div className={cn("flex items-end gap-3", showPitchColumn ? "mt-4" : "mt-2")}>
            <p className="text-6xl font-black leading-none tabular-nums">{reviewSummary.rating}</p>
            <div className="pb-2">
              <div className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-brand-red text-brand-red" />
                ))}
              </div>
              <p className="mt-1 text-sm font-bold text-white/70">{reviewSummary.count} verified reviews</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {reviewSummary.distribution.map((item, index) => (
              <div key={item.stars} className="grid grid-cols-[1.5rem_1fr_3rem] items-center gap-3 text-sm font-bold text-white/80">
                <span>{item.stars}</span>
                <div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-brand-red animate-rating-bar-fill"
                    style={
                      {
                        "--rating-fill": `${item.percentage}%`,
                        animationDelay: `${index * 80}ms`,
                      } as CSSProperties
                    }
                  />
                </div>
                <span className="text-right tabular-nums">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        {showPitchColumn ? (
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">Customer proof</p>
            <h3 className="mt-3 text-3xl font-black text-brand-blue-dark">Real reviews from Central Indiana HVAC customers.</h3>
            <p className="mt-3 leading-8 text-muted-foreground">
              Ayres Mechanical has earned consistent recommendations for prompt service, practical diagnostics, fair pricing, and follow-through on heating and cooling work.
            </p>
            {hasMoreReviews ? (
              <Link href={routes.reviews} className="mt-5 inline-flex font-black text-brand-red hover:text-brand-blue-dark">
                Read all {reviewSummary.count} reviews
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>

      {hasMoreReviews && !showPitchColumn ? (
        <Link href={routes.reviews} className="inline-flex font-black text-brand-red hover:text-brand-blue-dark">
          Read all {reviewSummary.count} reviews
        </Link>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleTestimonials.map((testimonial, index) => (
          <figure
            key={`${testimonial.name}-${testimonial.date}`}
            className={cn(
              "flex flex-col rounded-2xl border p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none",
              index === 0 ? "border-brand-blue-dark/20 bg-linear-to-br from-brand-ice/80 to-white" : "border-border bg-white",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                <span className="text-xl font-black text-brand-red tabular-nums">{testimonial.rating.toFixed(1)}</span>
                <Star className="size-4 fill-brand-red text-brand-red" aria-hidden />
              </div>
              <time dateTime={testimonial.date} className="text-xs font-medium text-muted-foreground/80">
                {testimonial.date}
              </time>
            </div>
            <blockquote className="mt-4 flex-1 text-base font-semibold leading-7 text-brand-blue-dark">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 space-y-1 border-t border-border/60 pt-4 text-sm">
              <p className="font-black text-brand-blue-dark">{testimonial.name}</p>
              <p className="text-muted-foreground">
                {testimonial.recommended ? "Recommends Ayres Mechanical" : "Customer review"}
              </p>
              {testimonial.source ? (
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/90">{testimonial.source}</p>
              ) : null}
              {testimonial.amount ? (
                <p className="text-xs text-muted-foreground">Reported project cost: {testimonial.amount}</p>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
