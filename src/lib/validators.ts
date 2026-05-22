import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a phone number."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  serviceType: z.string().min(1, "Choose a service type."),
  customerType: z.string().min(1, "Choose a customer type."),
  urgency: z.string().min(1, "Choose an urgency."),
  preferredContact: z.string().min(1, "Choose a contact method."),
  message: z.string().min(10, "Please share a few details about the request."),
  website: z.string().trim().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const diagnosticContactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a phone number."),
  city: z.string().min(2, "Please enter your city."),
  website: z.string().trim().optional(),
});

export type DiagnosticContactValues = z.infer<typeof diagnosticContactSchema>;

export const diagnosticSubmissionSchema = z.object({
  metaData: z.object({
    propertyType: z.string().optional(),
    propertyTypeLabel: z.string().optional(),
    systemAge: z.string().optional(),
    systemAgeLabel: z.string().optional(),
    existingCustomer: z.string().optional(),
    existingCustomerLabel: z.string().optional(),
  }),
  userAnswers: z.record(z.string(), z.string()),
  contactInfo: diagnosticContactSchema,
  pathSummary: z.array(z.string()).optional(),
  currentStepId: z.string().optional(),
});

export type DiagnosticSubmissionPayload = z.infer<typeof diagnosticSubmissionSchema>;

export const commercialLeadSchema = z
  .object({
    leadType: z.literal("commercial"),
    submittedFrom: z.enum(["commercial-maintenance-plans", "commercial-partnerships"]),
    serviceScope: z.string().min(1, "Choose a facility scope.").optional(),
    portfolioType: z.string().min(1, "Choose a facility scope.").optional(),
    scope: z.string().min(1, "Choose a facility scope.").optional(),
    squareFootage: z.string().min(1, "Choose a square footage range."),
    locations: z.string().min(1, "Choose the number of facility locations."),
    equipment: z.array(z.string().min(1)).min(1, "Choose at least one equipment option."),
    companyName: z.string().trim().min(1, "Enter the company name."),
    contactName: z.string().trim().min(1, "Enter a contact name."),
    email: z.string().trim().email("Enter a valid work email."),
    phone: z.string().trim().min(7, "Enter a phone number."),
    principalCity: z.string().trim().min(2, "Enter a principal city."),
    preferredFollowUp: z.enum(["Phone", "Email", "Either"]),
    notes: z.string().trim().optional().or(z.literal("")),
    estimatedComplexity: z.enum(["low", "medium", "high"]),
    recommendedFollowUpAngle: z.enum([
      "Commercial maintenance plan review",
      "Multi-building maintenance planning",
      "RTU condition and maintenance review",
      "Industrial facility support review",
    ]),
    website: z.string().trim().optional(),
  })
  .strict()
  .superRefine((values, context) => {
    if (values.serviceScope || values.portfolioType || values.scope) {
      return;
    }

    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["serviceScope"],
      message: "Choose a facility scope.",
    });
  })
  .transform(({ portfolioType, ...values }) => {
    const normalizedScope = values.serviceScope ?? portfolioType ?? values.scope ?? "";

    return {
      ...values,
      submittedFrom: "commercial-maintenance-plans" as const,
      serviceScope: normalizedScope,
      scope: values.scope ?? normalizedScope,
    };
  });

export type CommercialLeadValues = z.infer<typeof commercialLeadSchema>;
