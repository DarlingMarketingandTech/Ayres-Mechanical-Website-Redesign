import type { BookingRequestFormInput } from "@/lib/validators";
import { BOOKING_SERVICE_TYPES, BOOKING_URGENCY_OPTIONS } from "@/lib/validators";

const SERVICE_QUERY_MAP: Record<string, NonNullable<BookingRequestFormInput["serviceType"]>> = {
  "ac-repair": "AC Repair",
  ac: "AC Repair",
  "ac-installation": "Air Conditioning Installation",
  installation: "Air Conditioning Installation",
  heating: "Heating Service",
  maintenance: "Maintenance Plans",
  ductwork: "Ductwork / Airflow",
  airflow: "Ductwork / Airflow",
  ductless: "Ductless HVAC",
  commercial: "Commercial HVAC",
  industrial: "Industrial HVAC",
  emergency: "Emergency Service",
};

const INTENT_SERVICE_MAP: Record<string, NonNullable<BookingRequestFormInput["serviceType"]>> = {
  "ac-repair": "AC Repair",
  ac: "AC Repair",
  heating: "Heating Service",
  maintenance: "Maintenance Plans",
  commercial: "Commercial HVAC",
  emergency: "Emergency Service",
};

function normalizeKey(raw: string | undefined | null) {
  if (!raw) return "";
  return raw.trim().toLowerCase().replace(/_/g, "-");
}

function isEmergencyFlag(raw: string | undefined | null | boolean) {
  if (raw === true) return true;
  if (!raw || typeof raw !== "string") return false;
  const value = raw.trim().toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

export type RequestServiceSearchParams = {
  intent?: string | string[];
  service?: string | string[];
  emergency?: string | string[];
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Maps `?intent=`, `?service=`, and `?emergency=` on `/request-service` to booking form defaults.
 */
export function prefillFromRequestServiceSearch(
  params: RequestServiceSearchParams,
): Partial<BookingRequestFormInput> {
  const prefill: Partial<BookingRequestFormInput> = {};

  const intentKey = normalizeKey(firstParam(params.intent));
  const serviceKey = normalizeKey(firstParam(params.service));
  const emergency = isEmergencyFlag(firstParam(params.emergency));

  const serviceType =
    SERVICE_QUERY_MAP[serviceKey] ?? INTENT_SERVICE_MAP[intentKey] ?? SERVICE_QUERY_MAP[intentKey];

  if (serviceType) {
    prefill.serviceType = serviceType;
  }

  if (emergency || serviceKey === "emergency" || intentKey === "emergency") {
    prefill.urgency = "Emergency — need help now";
    if (!prefill.serviceType) {
      prefill.serviceType = "Emergency Service";
    }
  }

  return prefill;
}

/** @deprecated Use prefillFromRequestServiceSearch — kept for legacy intent-only links. */
export function prefillFromServiceIntent(raw: string | undefined | null): Partial<BookingRequestFormInput> {
  return prefillFromRequestServiceSearch({ intent: raw ?? undefined });
}

export function isBookingServiceType(value: string): value is NonNullable<BookingRequestFormInput["serviceType"]> {
  return (BOOKING_SERVICE_TYPES as readonly string[]).includes(value);
}

export function isBookingUrgency(value: string): value is NonNullable<BookingRequestFormInput["urgency"]> {
  return (BOOKING_URGENCY_OPTIONS as readonly string[]).includes(value);
}
