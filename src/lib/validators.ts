import { z } from "zod";

export const BOOKING_SERVICE_TYPES = [
  "AC Repair",
  "Air Conditioning Installation",
  "Heating Service",
  "Maintenance Plans",
  "Ductwork / Airflow",
  "Ductless HVAC",
  "Commercial HVAC",
  "Industrial HVAC",
  "Emergency Service",
] as const;

export const BOOKING_URGENCY_OPTIONS = [
  "Emergency — need help now",
  "This week",
  "Routine maintenance",
  "Planning ahead",
] as const;

export const BOOKING_PREFERRED_TIMING = [
  "As soon as possible",
  "Morning",
  "Afternoon",
  "Evening",
  "Flexible",
] as const;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a phone number."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  serviceType: z.string().min(1, "Choose a service type."),
  customerType: z.string().min(1, "Choose a customer type."),
  urgency: z.string().min(1, "Choose an urgency."),
  preferredContact: z.string().min(1, "Choose a contact method."),
  message: z.string().min(10, "Please share a few details about the request."),
});

const bookingServiceTypeSchema = z
  .string()
  .min(1, "Choose a service type.")
  .refine((value): value is (typeof BOOKING_SERVICE_TYPES)[number] =>
    (BOOKING_SERVICE_TYPES as readonly string[]).includes(value),
  );

const bookingUrgencySchema = z
  .string()
  .min(1, "Choose an urgency level.")
  .refine((value): value is (typeof BOOKING_URGENCY_OPTIONS)[number] =>
    (BOOKING_URGENCY_OPTIONS as readonly string[]).includes(value),
  );

const bookingPreferredTimingSchema = z
  .string()
  .min(1, "Choose a preferred timing.")
  .refine((value): value is (typeof BOOKING_PREFERRED_TIMING)[number] =>
    (BOOKING_PREFERRED_TIMING as readonly string[]).includes(value),
  );

export const bookingRequestSchema = z.object({
  serviceType: bookingServiceTypeSchema,
  urgency: bookingUrgencySchema,
  issueDescription: z.string().min(10, "Please describe the issue or request."),
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a phone number."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  city: z.string().min(2, "Please enter your city."),
  zipCode: z
    .string()
    .min(5, "Please enter a valid ZIP code.")
    .max(10, "Please enter a valid ZIP code."),
  preferredTiming: bookingPreferredTimingSchema,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type BookingRequestValues = z.output<typeof bookingRequestSchema>;
export type BookingRequestFormInput = z.input<typeof bookingRequestSchema>;
