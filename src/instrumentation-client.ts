import { trackAnalyticsEvent } from "./lib/analytics";

try {
  performance.mark("ayres-app-init");

  window.addEventListener("error", (event) => {
    trackAnalyticsEvent("client_error", {
      type: "error",
      message: event.message,
      source: event.filename || "unknown",
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason =
      typeof event.reason === "string"
        ? event.reason
        : event.reason && typeof event.reason === "object" && "message" in event.reason
          ? String(event.reason.message)
          : "Unhandled promise rejection";

    trackAnalyticsEvent("client_error", {
      type: "unhandledrejection",
      message: reason,
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;

    if (!target) {
      return;
    }

    trackAnalyticsEvent(target.dataset.analyticsEvent || "interaction", {
      category: target.dataset.analyticsCategory,
      label: target.dataset.analyticsLabel,
      location: target.dataset.analyticsLocation,
      href: target.dataset.analyticsHref,
    });
  });
} catch {
  // Ignore analytics bootstrap failures.
}

export function onRouterTransitionStart(url: string, navigationType: "push" | "replace" | "traverse") {
  trackAnalyticsEvent("router_transition_start", {
    url,
    navigationType,
  });
}
