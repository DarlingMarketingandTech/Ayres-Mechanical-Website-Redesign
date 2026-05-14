import { Testimonials } from "@/components/sections/Testimonials";
import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Reviews", description: "Verified customer reviews and testimonials for Ayres Mechanical Inc.", path: "/reviews" });

export default function ReviewsPage() {
  return <BasicPageTemplate eyebrow="Reviews" title="Customer reviews for Ayres Mechanical." description="Read real customer feedback about heating, cooling, ductwork, diagnostics, and service follow-through."><Testimonials /></BasicPageTemplate>;
}
