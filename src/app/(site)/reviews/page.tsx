import { Testimonials } from "@/components/sections/Testimonials";
import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Reviews", description: "Verified customer reviews and testimonials for Ayres Mechanical Inc.", path: "/reviews" });

export default function ReviewsPage() {
  return <BasicPageTemplate eyebrow="Reviews" title="Verified customer proof belongs here." description="This page is ready for real reviews once they are approved and sourced."><Testimonials /></BasicPageTemplate>;
}
