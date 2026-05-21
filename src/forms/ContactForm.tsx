"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/validators";

const serviceTypes = ["Heating", "Air Conditioning", "Maintenance", "Ductwork", "Commercial HVAC", "Industrial HVAC", "Emergency Service"];
const customerTypes = ["Residential", "Commercial", "Industrial"];
const urgencyOptions = ["Emergency", "This week", "Routine maintenance", "Planning ahead"];
const contactMethods = ["Phone", "Email", "Either"];
const fallbackErrorMessage = "Something went wrong. Please call for immediate service.";

type SubmissionStatus = {
  type: "success" | "error";
  message: string;
} | null;

type ContactApiResponse =
  | {
      ok: true;
      message?: string;
    }
  | {
      ok: false;
      message?: string;
      errors?: Partial<Record<keyof ContactFormValues, string[]>>;
    };

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const formId = useId();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      serviceType: "",
      customerType: "",
      urgency: "",
      preferredContact: "Phone",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (response.ok && result?.ok) {
        setStatus({ type: "success", message: result.message ?? "Thanks. Your request has been sent." });
        reset();
        return;
      }

      if (result && "errors" in result && result.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          const message = messages?.[0];

          if (message) {
            setError(field as keyof ContactFormValues, { type: "server", message });
          }
        }
      }

      setStatus({ type: "error", message: result?.message ?? fallbackErrorMessage });
    } catch {
      setStatus({ type: "error", message: fallbackErrorMessage });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-3xl border bg-white p-6 shadow-sm" noValidate>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <Input id={`${formId}-website`} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} fieldId={`${formId}-name`}>
          <Input id={`${formId}-name`} autoComplete="name" {...register("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${formId}-name-error` : undefined} />
        </Field>
        <Field label="Phone" error={errors.phone?.message} fieldId={`${formId}-phone`}>
          <Input id={`${formId}-phone`} type="tel" autoComplete="tel" inputMode="tel" {...register("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${formId}-phone-error` : undefined} />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message} fieldId={`${formId}-email`}>
        <Input id={`${formId}-email`} type="email" autoComplete="email" {...register("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${formId}-email-error` : undefined} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Service type" options={serviceTypes} register={register("serviceType")} error={errors.serviceType?.message} fieldId={`${formId}-service-type`} />
        <SelectField label="Customer type" options={customerTypes} register={register("customerType")} error={errors.customerType?.message} fieldId={`${formId}-customer-type`} />
      </div>

      {!compact ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Urgency" options={urgencyOptions} register={register("urgency")} error={errors.urgency?.message} fieldId={`${formId}-urgency`} />
          <SelectField label="Preferred contact" options={contactMethods} register={register("preferredContact")} error={errors.preferredContact?.message} fieldId={`${formId}-preferred-contact`} />
        </div>
      ) : null}

      <Field label="Message" error={errors.message?.message} fieldId={`${formId}-message`}>
        <Textarea id={`${formId}-message`} rows={5} autoComplete="off" {...register("message")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${formId}-message-error` : undefined} />
      </Field>

      <Button type="submit" variant="emergency" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Submit Request"}
      </Button>

      {status?.type === "success" ? (
        <p role="status" aria-live="polite" className="rounded-lg bg-secondary p-3 text-sm font-semibold text-brand-blue-dark">
          {status.message}
        </p>
      ) : null}

      {status?.type === "error" ? (
        <p role="alert" className="rounded-lg bg-accent p-3 text-sm font-semibold text-brand-red">
          {status.message}
        </p>
      ) : null}

      <noscript>
        <p className="rounded-lg bg-secondary p-3 text-sm font-semibold text-brand-blue-dark">
          JavaScript is required for online form submission right now. Please call for immediate service.
        </p>
      </noscript>
    </form>
  );
}

function Field({ label, error, fieldId, children }: { label: string; error?: string; fieldId: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-blue-dark">
      {label}
      {children}
      {error ? <span id={`${fieldId}-error`} role="alert" className="text-sm text-brand-red">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  options,
  register,
  error,
  fieldId,
}: {
  label: string;
  options: string[];
  register: ReturnType<typeof useForm<ContactFormValues>>["register"] extends (name: infer N) => infer R ? R : never;
  error?: string;
  fieldId: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-blue-dark">
      {label}
      <select
        id={fieldId}
        {...register}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">Select...</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error ? <span id={`${fieldId}-error`} role="alert" className="text-sm text-brand-red">{error}</span> : null}
    </label>
  );
}
