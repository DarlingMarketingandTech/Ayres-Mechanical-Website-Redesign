import { siteConfig } from "@/content/site";

export type DiagnosticStepType = "question" | "resolution" | "emergency";

export type DiagnosticOption = {
  label: string;
  value: string;
  next: string;
};

export type QuestionNode = {
  id: string;
  type: "question";
  prompt: string;
  helperText?: string;
  options: DiagnosticOption[];
  /** When true, selecting any option triggers professional contact intake. */
  requiresContact?: boolean;
};

export type ResolutionNode = {
  id: string;
  type: "resolution";
  title: string;
  summary: string;
  steps: string[];
  /** Optional follow-up CTA copy shown below steps. */
  cta?: string;
};

export type EmergencyNode = {
  id: string;
  type: "emergency";
  title: string;
  message: string;
  phone: string;
};

export type DiagnosticNode = QuestionNode | ResolutionNode | EmergencyNode;

export const DIAGNOSTIC_START_STEP = "meta_property_type";

export const diagnosticPhone = siteConfig.phone;

export const legacySystemNote =
  "Note: Because your system is a legacy unit over 12 years old, parts can be tougher to source. Brian can diagnose it, but we can also discuss high-efficiency upgrade options if a major component has failed.";

export const diagnosticNodes: Record<string, DiagnosticNode> = {
  meta_property_type: {
    id: "meta_property_type",
    type: "question",
    prompt: "What type of property are we troubleshooting?",
    options: [
      { label: "🏡 Residential", value: "residential", next: "meta_system_age" },
      { label: "🏢 Commercial", value: "commercial", next: "meta_system_age" },
    ],
  },
  meta_system_age: {
    id: "meta_system_age",
    type: "question",
    prompt: "How old is your HVAC system?",
    options: [
      { label: "Newer (under 8 years)", value: "newer", next: "meta_existing_customer" },
      { label: "Mid-aged (8–12 years)", value: "mid", next: "meta_existing_customer" },
      { label: "Legacy (12+ years)", value: "legacy", next: "meta_existing_customer" },
    ],
  },
  meta_existing_customer: {
    id: "meta_existing_customer",
    type: "question",
    prompt: "Have we serviced your property before?",
    options: [
      { label: "Yes — existing Ayres customer", value: "yes", next: "router_symptom" },
      { label: "No — first time reaching out", value: "no", next: "router_symptom" },
    ],
  },
  router_symptom: {
    id: "router_symptom",
    type: "question",
    prompt: "Routing to the right symptom checklist…",
    options: [],
  },
  res_symptom: {
    id: "res_symptom",
    type: "question",
    prompt: "What is your system doing right now?",
    options: [
      { label: "Blowing warm air (cooling mode)", value: "warm_air", next: "res_warm_air_filter" },
      { label: "Not turning on at all", value: "no_power", next: "res_no_power" },
      { label: "Short cycling (turns on/off repeatedly)", value: "short_cycle", next: "res_short_cycle" },
      { label: "Strange noises or burning smell", value: "safety", next: "res_safety_emergency" },
      { label: "Uneven temperatures between rooms", value: "uneven", next: "res_uneven" },
    ],
  },
  res_warm_air_filter: {
    id: "res_warm_air_filter",
    type: "question",
    prompt: "When did you last check or replace your air filter?",
    helperText: "A dirty filter is the #1 cause of weak cooling in residential systems.",
    options: [
      { label: "Filter looks dirty or overdue", value: "dirty", next: "res_filter_resolution" },
      { label: "Filter looks clean — changed recently", value: "clean", next: "res_warm_air_pro" },
    ],
  },
  res_filter_resolution: {
    id: "res_filter_resolution",
    type: "resolution",
    title: "Try this DIY fix first",
    summary: "A clogged filter restricts airflow and can make your system blow warm air.",
    steps: [
      "Turn the system off at the thermostat.",
      "Locate your return-air filter (usually near the furnace or a central grille).",
      "Remove the dirty filter and note its size printed on the frame.",
      "Install a matching replacement filter with the arrow pointing toward the blower.",
      "Restore power and run cooling for 15–20 minutes to test improvement.",
    ],
    cta: "If airflow improves, schedule preventive maintenance so this does not happen again. If not, request professional diagnosis below.",
  },
  res_warm_air_pro: {
    id: "res_warm_air_pro",
    type: "question",
    prompt: "Filter is clean but still blowing warm air?",
    helperText: "This often points to refrigerant, compressor, or control issues that need a licensed technician.",
    options: [
      { label: "Request professional diagnosis", value: "dispatch", next: "contact_dispatch" },
    ],
    requiresContact: true,
  },
  res_no_power: {
    id: "res_no_power",
    type: "question",
    prompt: "Quick checks before we dispatch a technician",
    options: [
      { label: "Thermostat screen is blank", value: "thermostat", next: "res_thermostat_resolution" },
      { label: "Thermostat is on — unit still dead", value: "unit_dead", next: "res_no_power_pro" },
      { label: "Breaker tripped or recently reset", value: "breaker", next: "res_breaker_resolution" },
    ],
  },
  res_thermostat_resolution: {
    id: "res_thermostat_resolution",
    type: "resolution",
    title: "Check your thermostat power",
    summary: "Many no-start calls trace back to thermostat batteries or settings.",
    steps: [
      "Replace thermostat batteries if your model uses them.",
      "Confirm the mode is set to Heat or Cool (not Off).",
      "Set the temperature several degrees above (heat) or below (cool) room temp.",
      "Wait 3–5 minutes — some systems have a built-in delay before starting.",
    ],
    cta: "Still blank or unresponsive? Request service — we can verify wiring and controls on site.",
  },
  res_breaker_resolution: {
    id: "res_breaker_resolution",
    type: "resolution",
    title: "Reset the HVAC breaker safely",
    summary: "A tripped breaker can cut power to the outdoor unit or air handler.",
    steps: [
      "Locate your electrical panel and find the HVAC breaker (often labeled AC, Air, or Furnace).",
      "Push the breaker fully to OFF, then firmly to ON.",
      "Wait 5 minutes before testing the thermostat again.",
      "If the breaker trips again immediately, stop and call for service — do not keep resetting.",
    ],
    cta: "Repeated trips indicate an electrical or compressor issue that needs professional diagnosis.",
  },
  res_no_power_pro: {
    id: "res_no_power_pro",
    type: "question",
    prompt: "Thermostat is on but equipment will not run?",
    options: [
      { label: "Request professional diagnosis", value: "dispatch", next: "contact_dispatch" },
    ],
    requiresContact: true,
  },
  res_short_cycle: {
    id: "res_short_cycle",
    type: "question",
    prompt: "Short cycling can stress your compressor. What fits best?",
    options: [
      { label: "Started after I changed the filter", value: "filter", next: "res_filter_check_resolution" },
      { label: "Happens in very hot or very cold weather", value: "weather", next: "res_short_cycle_pro" },
      { label: "Happens randomly — not tied to weather", value: "random", next: "res_short_cycle_pro" },
    ],
  },
  res_filter_check_resolution: {
    id: "res_filter_check_resolution",
    type: "resolution",
    title: "Verify filter installation",
    summary: "An incorrectly seated or wrong-size filter can restrict airflow and cause rapid cycling.",
    steps: [
      "Turn the system off at the thermostat.",
      "Remove the filter and confirm it matches the slot size with no gaps.",
      "Reinstall with the airflow arrow pointing toward the blower.",
      "Run the system for 20 minutes and listen for longer, steadier cycles.",
    ],
    cta: "If short cycling continues, request service — we will check charge levels, limits, and controls.",
  },
  res_short_cycle_pro: {
    id: "res_short_cycle_pro",
    type: "question",
    prompt: "Short cycling usually needs on-site diagnostics",
    helperText: "Common causes include refrigerant issues, oversized equipment, or failing sensors.",
    options: [
      { label: "Request professional diagnosis", value: "dispatch", next: "contact_dispatch" },
    ],
    requiresContact: true,
  },
  res_uneven: {
    id: "res_uneven",
    type: "question",
    prompt: "Uneven comfort between rooms?",
    options: [
      { label: "Some vents closed or blocked by furniture", value: "vents", next: "res_vents_resolution" },
      { label: "Vents open — still uneven", value: "duct", next: "res_uneven_pro" },
    ],
  },
  res_vents_resolution: {
    id: "res_vents_resolution",
    type: "resolution",
    title: "Balance airflow at the vents",
    summary: "Closed or blocked supply vents are a common cause of hot/cold spots.",
    steps: [
      "Walk each room and confirm supply vents are fully open.",
      "Move furniture, rugs, or drapes at least 6 inches away from vents.",
      "Keep interior doors open during extreme weather for better circulation.",
      "Run the system for 30 minutes and note which rooms improve.",
    ],
    cta: "Still uneven after balancing vents? Duct design or zoning may need professional evaluation.",
  },
  res_uneven_pro: {
    id: "res_uneven_pro",
    type: "question",
    prompt: "Persistent hot/cold spots with open vents?",
    options: [
      { label: "Request professional diagnosis", value: "dispatch", next: "contact_dispatch" },
    ],
    requiresContact: true,
  },
  res_safety_emergency: {
    id: "res_safety_emergency",
    type: "emergency",
    title: "Safety first — stop and call now",
    message:
      "Strange noises, burning smells, or visible smoke can signal electrical failure, overheating, or gas-related hazards. Turn the system off at the thermostat and do not run it until a technician evaluates the equipment.",
    phone: diagnosticPhone,
  },
  comm_symptom: {
    id: "comm_symptom",
    type: "question",
    prompt: "What best describes the issue in your building?",
    helperText: "Commercial paths focus on zones and electrical supply — we do not ask you to open equipment enclosures.",
    options: [
      { label: "One zone is too hot or too cold", value: "zone", next: "comm_zone_issue" },
      { label: "Entire building — no cooling or heating", value: "whole_building", next: "comm_whole_building" },
      { label: "Alarms, error codes, or BMS alerts", value: "alarms", next: "comm_alarms" },
      { label: "Burning smell, smoke, or loud mechanical failure", value: "safety", next: "comm_safety_emergency" },
    ],
  },
  comm_zone_issue: {
    id: "comm_zone_issue",
    type: "question",
    prompt: "Single-zone comfort issue — what have you observed?",
    options: [
      { label: "Thermostat in that zone shows normal but room is off", value: "thermostat_ok", next: "comm_zone_pro" },
      { label: "Thermostat in that zone is blank or unresponsive", value: "thermostat_dead", next: "comm_zone_pro" },
      { label: "Other zones are comfortable — only one area affected", value: "isolated", next: "comm_zone_pro" },
    ],
    requiresContact: true,
  },
  comm_whole_building: {
    id: "comm_whole_building",
    type: "question",
    prompt: "Whole-building outage — check building power first",
    helperText: "We will not ask you to access rooftop units or mechanical rooms. Confirm electrical supply with your facilities contact.",
    options: [
      { label: "Main HVAC breaker is OFF or tripped", value: "breaker", next: "comm_breaker_guidance" },
      { label: "Breakers look normal — building still has no HVAC", value: "no_hvac", next: "comm_whole_pro" },
      { label: "Unsure — need Ayres to coordinate with facilities", value: "unsure", next: "contact_dispatch" },
    ],
  },
  comm_breaker_guidance: {
    id: "comm_breaker_guidance",
    type: "resolution",
    title: "Coordinate a safe breaker reset",
    summary: "Commercial HVAC breakers should only be reset by qualified personnel after the cause is understood.",
    steps: [
      "Contact your facilities manager or electrician before resetting HVAC breakers.",
      "Document which breaker label tripped (RTU-1, MAU, etc.) and when it occurred.",
      "Do not reset more than once without investigation — repeated trips can damage compressors.",
      "If the building is without heat in freezing weather or without cooling for critical operations, call for emergency dispatch.",
    ],
    cta: "Need Ayres on site? Submit your details below and note the affected zones.",
  },
  comm_whole_pro: {
    id: "comm_whole_pro",
    type: "question",
    prompt: "Power looks normal but the building has no HVAC?",
    options: [
      { label: "Request emergency commercial dispatch", value: "dispatch", next: "contact_dispatch" },
    ],
    requiresContact: true,
  },
  comm_alarms: {
    id: "comm_alarms",
    type: "question",
    prompt: "BMS or equipment alarms active?",
    helperText: "Note the alarm code if available — our dispatcher will pass it to the technician.",
    options: [
      { label: "Request commercial service dispatch", value: "dispatch", next: "contact_dispatch" },
    ],
    requiresContact: true,
  },
  comm_zone_pro: {
    id: "comm_zone_pro",
    type: "question",
    prompt: "Zone issue likely needs rooftop or controls diagnosis",
    options: [
      { label: "Request commercial service dispatch", value: "dispatch", next: "contact_dispatch" },
    ],
    requiresContact: true,
  },
  comm_safety_emergency: {
    id: "comm_safety_emergency",
    type: "emergency",
    title: "Commercial safety emergency",
    message:
      "Shut down affected equipment through your BMS or facilities contact if safe to do so. Evacuate affected areas if you smell gas, smoke, or burning electrical odor. Do not restart equipment until Ayres Mechanical evaluates the site.",
    phone: diagnosticPhone,
  },
  contact_dispatch: {
    id: "contact_dispatch",
    type: "question",
    prompt: "Let's get a technician scheduled",
    helperText: "Share your contact details and our team will follow up promptly.",
    options: [],
    requiresContact: true,
  },
};

export function getDiagnosticNode(stepId: string): DiagnosticNode | undefined {
  return diagnosticNodes[stepId];
}

export function resolveRouterNext(propertyType: string | undefined): string {
  return propertyType === "commercial" ? "comm_symptom" : "res_symptom";
}

export type DiagnosticMetaData = {
  propertyType?: string;
  propertyTypeLabel?: string;
  systemAge?: string;
  systemAgeLabel?: string;
  existingCustomer?: string;
  existingCustomerLabel?: string;
};

export const metaStepFieldMap: Record<string, keyof DiagnosticMetaData> = {
  meta_property_type: "propertyType",
  meta_system_age: "systemAge",
  meta_existing_customer: "existingCustomer",
};

export const metaStepLabelFieldMap: Record<string, keyof DiagnosticMetaData> = {
  meta_property_type: "propertyTypeLabel",
  meta_system_age: "systemAgeLabel",
  meta_existing_customer: "existingCustomerLabel",
};
