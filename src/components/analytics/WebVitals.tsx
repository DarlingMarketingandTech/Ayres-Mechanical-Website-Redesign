"use client";

import { useReportWebVitals } from "next/web-vitals";

import { trackAnalyticsEvent } from "@/lib/analytics";

const reportWebVitals: Parameters<typeof useReportWebVitals>[0] = (metric) => {
  trackAnalyticsEvent("web_vital", {
    id: metric.id,
    name: metric.name,
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    rating: metric.rating,
    navigationType: metric.navigationType,
  });
};

export function WebVitals() {
  useReportWebVitals(reportWebVitals);
  return null;
}
