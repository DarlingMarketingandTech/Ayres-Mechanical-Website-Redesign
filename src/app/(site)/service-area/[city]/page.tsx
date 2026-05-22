import { notFound } from "next/navigation";

import { LocationPageTemplate } from "@/components/templates/LocationPageTemplate";
import { getCachedLocationBySlug, getCachedServiceLocations } from "@/core/cache/static-content";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const serviceLocations = await getCachedServiceLocations();
  return serviceLocations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const resolved = await params;
  const location = await getCachedLocationBySlug(resolved.city);
  if (!location) return {};
  return pageMetadata({
    title: "HVAC Services in " + location.city + ", " + location.state,
    description: "Ayres Mechanical provides heating, cooling, maintenance, and HVAC service in " + location.city + ", " + location.state + ". Call 317-538-9837 for service.",
    path: "/service-area/" + location.slug,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const resolved = await params;
  const location = await getCachedLocationBySlug(resolved.city);
  if (!location) notFound();
  return <LocationPageTemplate location={location} />;
}
