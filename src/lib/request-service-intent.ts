import type { ContactFormValues } from "@/lib/validators";

const INTENT_MAP: Record<string, Partial<ContactFormValues>> = {
  "ac-repair": { serviceType: "Air Conditioning" },
  ac: { serviceType: "Air Conditioning" },
  heating: { serviceType: "Heating" },
  maintenance: { serviceType: "Maintenance" },
  commercial: { serviceType: "Commercial HVAC", customerType: "Commercial" },
  emergency: { serviceType: "Emergency Service", urgency: "Emergency" },
};

/**
 * Maps `?intent=` on `/request-service` to react-hook-form defaults (validated field values).
 */
export function prefillFromServiceIntent(raw: string | undefined | null): Partial<ContactFormValues> {
  if (!raw) return {};
  const key = raw.trim().toLowerCase().replace(/_/g, "-");
  return INTENT_MAP[key] ?? {};
}
