import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <figure key={testimonial.name} className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <blockquote className="text-xl font-semibold leading-8 text-brand-blue-dark">“{testimonial.quote}”</blockquote>
          <figcaption className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{testimonial.name} · {testimonial.context}</figcaption>
        </figure>
      ))}
      <div className="rounded-2xl bg-brand-blue-dark p-6 text-white">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-white/60">Proof System</p>
        <h3 className="mt-3 text-3xl font-black text-white">Ready for verified reviews.</h3>
        <p className="mt-3 text-white/75">The structure is prepared for real testimonials without inventing customer claims.</p>
      </div>
    </div>
  );
}
