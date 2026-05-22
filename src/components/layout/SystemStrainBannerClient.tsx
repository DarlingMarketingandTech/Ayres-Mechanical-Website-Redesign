"use client";

import { AlertTriangle, Phone, Snowflake } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

const GEOLOCATION_TIMEOUT_MS = 2500;

export type WeatherCoordinates = {
  latitude: number;
  longitude: number;
};

export type LocationSource = "default" | "browser";
type DebugSystemStrain = "heat" | "cold" | null;
type SearchParamsReader = {
  get(name: string): string | null;
};

export type SystemStrainState =
  | { kind: "normal"; temperature: number; source: LocationSource }
  | { kind: "heat"; temperature: number; source: LocationSource }
  | { kind: "cold"; temperature: number; source: LocationSource };

function resetBannerOffsetVariables() {
  document.documentElement.style.setProperty("--system-strain-banner-h", "0px");
  document.documentElement.style.setProperty("--system-strain-banner-visible-h", "0px");
}

function toSystemStrainState(temperature: number, source: LocationSource): SystemStrainState {
  if (temperature > 90) {
    return { kind: "heat", temperature, source };
  }

  if (temperature < 25) {
    return { kind: "cold", temperature, source };
  }

  return { kind: "normal", temperature, source };
}

async function loadWeatherForCoordinates(
  coordinates: WeatherCoordinates,
  signal: AbortSignal,
  source: LocationSource,
) {
  const searchParams = new URLSearchParams({
    latitude: String(coordinates.latitude),
    longitude: String(coordinates.longitude),
    current: "temperature_2m",
    temperature_unit: "fahrenheit",
    forecast_days: "1",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${searchParams.toString()}`, {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Weather request failed with ${response.status}`);
  }

  const payload = (await response.json()) as {
    current?: {
      temperature_2m?: number;
    };
  };

  const temperature = payload.current?.temperature_2m;

  if (typeof temperature !== "number" || Number.isNaN(temperature)) {
    throw new Error("Weather response missing temperature");
  }

  return toSystemStrainState(temperature, source);
}

function getBrowserCoordinates() {
  return new Promise<WeatherCoordinates>((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation unavailable"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: false,
        timeout: GEOLOCATION_TIMEOUT_MS,
        maximumAge: 30 * 60 * 1000,
      },
    );
  });
}

function getDebugSystemStrain(searchParams: SearchParamsReader): DebugSystemStrain {
  const rawValue = searchParams.get("system-strain");

  if (rawValue === "heat" || rawValue === "cold") {
    return rawValue;
  }

  return null;
}

export function SystemStrainBannerClient({
  initialSystemStrain,
}: {
  initialSystemStrain: SystemStrainState | null;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [systemStrain, setSystemStrain] = useState<SystemStrainState | null>(initialSystemStrain);
  const debugSystemStrain = getDebugSystemStrain(searchParams);
  const debugState =
    debugSystemStrain === "heat"
      ? { kind: "heat", temperature: 96, source: "default" as const }
      : debugSystemStrain === "cold"
        ? { kind: "cold", temperature: 18, source: "default" as const }
        : null;
  const effectiveSystemStrain = debugState ?? systemStrain;

  useEffect(() => {
    if (debugSystemStrain || !initialSystemStrain || initialSystemStrain.kind === "normal") {
      return;
    }

    const abortController = new AbortController();

    async function refineWeatherFromBrowserLocation() {
      try {
        const browserCoordinates = await getBrowserCoordinates();

        if (abortController.signal.aborted) {
          return;
        }

        const browserState = await loadWeatherForCoordinates(
          browserCoordinates,
          abortController.signal,
          "browser",
        );

        if (!abortController.signal.aborted) {
          setSystemStrain(browserState.kind === "normal" ? initialSystemStrain : browserState);
        }
      } catch {}
    }

    void refineWeatherFromBrowserLocation();

    return () => abortController.abort();
  }, [debugSystemStrain, initialSystemStrain]);

  useEffect(() => {
    if (!effectiveSystemStrain || effectiveSystemStrain.kind === "normal" || !bannerRef.current) {
      resetBannerOffsetVariables();
      return;
    }

    let frameId = 0;
    const root = bannerRef.current;

    const measure = () => {
      const height = root.offsetHeight;
      const visibleHeight = Math.max(height - window.scrollY, 0);

      document.documentElement.style.setProperty("--system-strain-banner-h", `${height}px`);
      document.documentElement.style.setProperty("--system-strain-banner-visible-h", `${visibleHeight}px`);
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(measure);
    };

    measure();

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(root);

    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      resetBannerOffsetVariables();
    };
  }, [effectiveSystemStrain]);

  if (!effectiveSystemStrain || effectiveSystemStrain.kind === "normal") {
    return null;
  }

  const isHeat = effectiveSystemStrain.kind === "heat";
  const temperatureLabel = `${Math.round(effectiveSystemStrain.temperature)}F`;
  const isBrowserLocal = effectiveSystemStrain.source === "browser";
  const areaLabel = isBrowserLocal ? "your area" : "Central Indiana";
  const locationChipLabel = isBrowserLocal ? `Near you ${temperatureLabel}` : `Indianapolis ${temperatureLabel}`;
  const title = isHeat
    ? `High system strain detected today in ${areaLabel}.`
    : `Freeze-risk system strain detected today in ${areaLabel}.`;
  const detail = isHeat
    ? isBrowserLocal
      ? "Temperatures near you are pushing aging AC systems into long run cycles and compressor-risk conditions. If airflow is dropping or your home is warming up, get on the schedule before the rush stacks up."
      : "Temperatures across Central Indiana are pushing aging AC systems into long run cycles and compressor-risk conditions. If airflow is dropping or your home is warming up, get on the schedule before the rush stacks up."
    : isBrowserLocal
      ? "Temperatures near you are forcing heat pumps into backup heat, increasing furnace cycling stress, and raising freeze-risk pressure. If your system is struggling, call before a no-heat problem escalates."
      : "Temperatures across Central Indiana are forcing heat pumps into backup heat, increasing furnace cycling stress, and raising freeze-risk pressure. If your system is struggling, call before a no-heat problem escalates.";

  return (
    <div
      ref={bannerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-60 border-b shadow-[0_16px_42px_rgb(10_26_68_/0.14)] will-change-transform",
        isHeat
          ? "border-amber-300/70 bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 text-white"
          : "border-cyan-200/70 bg-linear-to-r from-sky-900 via-blue-900 to-cyan-900 text-white",
      )}
      style={{
        transform: "translateY(calc(var(--system-strain-banner-visible-h, 0px) - var(--system-strain-banner-h, 0px)))",
      }}
    >
      <Container className="py-3 sm:py-3.5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-black uppercase tracking-[0.22em] text-white/82">
              {isHeat ? <AlertTriangle className="size-3.5 shrink-0" aria-hidden="true" /> : <Snowflake className="size-3.5 shrink-0" aria-hidden="true" />}
              <span>System Strain Advisory</span>
              <span className="rounded-full border border-white/18 bg-white/14 px-2 py-0.5 text-[0.68rem] tracking-[0.16em] text-white">
                {locationChipLabel}
              </span>
            </p>
            <p className="mt-2 text-sm font-black leading-snug text-balance sm:text-base">{title}</p>
            <p className="mt-1 max-w-4xl text-sm leading-relaxed text-white/88">{detail}</p>
          </div>

          <a
            href={phoneHref}
            data-analytics-event="cta_click"
            data-analytics-category="system_strain_banner"
            data-analytics-label={isHeat ? "emergency_cooling_call" : "emergency_heating_call"}
            data-analytics-location="global_header_banner"
            data-analytics-href={phoneHref}
            className={cn(
              "inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-center text-sm font-black shadow-[0_12px_28px_rgb(10_26_68_/0.18)] transition-colors sm:text-base",
              isHeat
                ? "border-white/28 bg-white text-amber-900 hover:bg-amber-50"
                : "border-white/24 bg-white text-sky-950 hover:bg-sky-50",
            )}
            aria-label={`Call ${siteConfig.phone} for emergency HVAC service`}
          >
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            <span>Call {siteConfig.phone}</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
