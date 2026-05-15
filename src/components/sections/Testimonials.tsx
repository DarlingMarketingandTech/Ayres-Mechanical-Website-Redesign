"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Star } from "lucide-react";

import { reviewSummary, testimonials } from "@/content/testimonials";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type TestimonialsProps = {
  limit?: number;
};

export function Testimonials({ limit }: TestimonialsProps) {
  // Use all testimonials for the marquee, or a subset if specified
  const displayTestimonials = typeof limit === "number" ? testimonials.slice(0, limit) : testimonials;
  const hasMoreReviews = displayTestimonials.length < testimonials.length;

  // Duplicate for seamless infinite scroll
  const marqueeItems = [...displayTestimonials, ...displayTestimonials];

  return (
    <div className="space-y-12">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl bg-brand-blue-dark p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-dark to-brand-blue-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/60 relative z-10">Reviews</p>
          <div className="mt-4 flex items-end gap-3 relative z-10">
            <p className="text-7xl font-black leading-none drop-shadow-md">{reviewSummary.rating}</p>
            <p className="pb-2 text-sm font-bold uppercase tracking-[0.18em] text-white/80">{reviewSummary.count} reviews</p>
          </div>
          <div className="mt-8 space-y-3 relative z-10">
            {reviewSummary.distribution.map((item) => (
              <div key={item.stars} className="grid grid-cols-[1.5rem_1fr_3rem] items-center gap-3 text-sm font-bold text-white/90">
                <span className="flex items-center gap-1">{item.stars} <Star className="w-3 h-3 fill-current opacity-70" /></span>
                <div className="h-2.5 overflow-hidden rounded-full bg-black/20 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-brand-red shadow-[0_0_10px_rgba(220,38,38,0.6)]" 
                  />
                </div>
                <span className="text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">Customer proof</p>
          <h3 className="mt-4 text-3xl sm:text-4xl font-black text-brand-blue-dark leading-tight">Real reviews from Central Indiana HVAC customers.</h3>
          <p className="mt-4 leading-relaxed text-lg text-muted-foreground">
            Ayres Mechanical has earned consistent recommendations for prompt service, practical diagnostics, fair pricing, and follow-through on heating and cooling work.
          </p>
          {hasMoreReviews ? (
            <Link href={routes.reviews} className="mt-6 inline-flex font-black text-brand-red hover:text-brand-blue-dark hover:translate-x-1 transition-all">
              Read all {reviewSummary.count} reviews &rarr;
            </Link>
          ) : null}
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative -mx-4 flex overflow-hidden px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mask-edges">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex w-max gap-6 sm:gap-8"
        >
          {marqueeItems.map((testimonial, idx) => (
            <figure 
              key={`${testimonial.name}-${testimonial.date}-${idx}`} 
              className="w-[300px] shrink-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:w-[400px] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < Math.floor(testimonial.rating) ? "fill-brand-red text-brand-red" : "fill-gray-200 text-gray-200")} />
                  ))}
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground/70">{testimonial.date}</p>
              </div>
              <blockquote className="mt-5 text-base font-semibold leading-relaxed text-brand-blue-dark">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 space-y-1.5 text-xs font-bold text-muted-foreground">
                <p className="uppercase tracking-[0.18em] text-brand-blue-dark">{testimonial.name}</p>
                <p className="text-brand-red/80">{testimonial.recommended ? "✓ Recommends Ayres Mechanical" : "Customer review"}</p>
                {testimonial.amount ? <p className="opacity-75">Project cost: {testimonial.amount}</p> : null}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </div>
  );
}
