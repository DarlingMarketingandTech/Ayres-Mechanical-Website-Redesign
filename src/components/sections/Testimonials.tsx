import Link from "next/link";

import { reviewSummary, testimonials } from "@/content/testimonials";
import { routes } from "@/lib/routes";

type TestimonialsProps = {
  limit?: number;
};

export function Testimonials({ limit }: TestimonialsProps) {
  const visibleTestimonials = typeof limit === "number" ? testimonials.slice(0, limit) : testimonials;
  const hasMoreReviews = visibleTestimonials.length < testimonials.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl bg-brand-blue-dark p-6 text-white">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/60">Reviews</p>
          <div className="mt-4 flex items-end gap-3">
            <p className="text-6xl font-black leading-none">{reviewSummary.rating}</p>
            <p className="pb-2 text-sm font-bold uppercase tracking-[0.18em] text-white/70">{reviewSummary.count} reviews</p>
          </div>
          <div className="mt-6 space-y-3">
            {reviewSummary.distribution.map((item) => (
              <div key={item.stars} className="grid grid-cols-[1.5rem_1fr_3rem] items-center gap-3 text-sm font-bold text-white/80">
                <span>{item.stars}</span>
                <div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-brand-red" style={{ width: `${item.percentage}%` }} />
                </div>
                <span className="text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
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
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleTestimonials.map((testimonial) => (
          <figure key={`${testimonial.name}-${testimonial.date}`} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <p className="text-2xl font-black text-brand-red">{testimonial.rating.toFixed(1)}</p>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{testimonial.date}</p>
            </div>
            <blockquote className="mt-4 text-lg font-semibold leading-8 text-brand-blue-dark">&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <figcaption className="mt-5 space-y-2 text-sm font-bold text-muted-foreground">
              <p className="uppercase tracking-[0.18em] text-brand-blue-dark">{testimonial.name}</p>
              <p>{testimonial.recommended ? "Recommends Ayres Mechanical" : "Customer review"}</p>
              {testimonial.amount ? <p>Reported project cost: {testimonial.amount}</p> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
