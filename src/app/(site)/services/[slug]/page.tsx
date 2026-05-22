import { notFound } from "next/navigation";

import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { getCachedServiceContentBySlug, getCachedServicePageContent } from "@/core/cache/static-content";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const servicePageContent = await getCachedServicePageContent();
  return servicePageContent.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getCachedServiceContentBySlug(slug);

  if (!service) {
    return {};
  }

  return pageMetadata({
    title: service.title,
    description: service.summary,
    path: "/services/" + service.slug,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getCachedServiceContentBySlug(slug);

  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
