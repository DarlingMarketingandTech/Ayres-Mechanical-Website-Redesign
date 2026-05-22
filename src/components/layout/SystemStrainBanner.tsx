import { cacheLife } from "next/cache";

import {
  SystemStrainBannerClient,
  type LocationSource,
  type SystemStrainState,
  type WeatherCoordinates,
} from "./SystemStrainBannerClient";

const INDIANAPOLIS_COORDINATES = {
  latitude: 39.7684,
  longitude: -86.1581,
} as const;

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
    next: { revalidate: 60 * 30 },
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

async function getIndianapolisSystemStrain() {
  "use cache";
  cacheLife("hours");

  try {
    const state = await loadWeatherForCoordinates(INDIANAPOLIS_COORDINATES, "default");
    return state.kind === "normal" ? null : state;
  } catch {
    return null;
  }
}

export async function SystemStrainBanner() {
  const initialSystemStrain = await getIndianapolisSystemStrain();

  return <SystemStrainBannerClient initialSystemStrain={initialSystemStrain} />;
}

/** Reserves zero height while search params resolve — avoids layout shift when banner is absent. */
export function SystemStrainBannerFallback() {
  return <div aria-hidden className="h-0 overflow-hidden" />;
}
