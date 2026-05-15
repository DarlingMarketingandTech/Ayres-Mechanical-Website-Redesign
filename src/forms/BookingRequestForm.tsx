"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  BOOKING_PREFERRED_TIMING,
  BOOKING_SERVICE_TYPES,
  BOOKING_URGENCY_OPTIONS,
  bookingRequestSchema,
  type BookingRequestFormInput,
} from "@/lib/validators";

const STEPS = ["Service", "Details", "Contact"] as const;
const fallbackErrorMessage = "Something went wrong. Please call for immediate service.";

type SubmissionStatus = {
  type: "success" | "error";
  message: string;
  isEmergency?: boolean;
} | null;

export function BookingRequestForm({
  prefill,
  formId = "request-service-form",
}: {
  prefill?: Partial<BookingRequestFormInput>;
  formId?: "request-service-form";
}) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<SubmissionStatus>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<BookingRequestFormInput>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      serviceType: "",
      urgency: "",
      issueDescription: "",
      name: "",
      phone: "",
      email: "",
      city: "",
      zipCode: "",
      preferredTiming: "",
      ...prefill,
    },
  });

  const urgency = watch("urgency");
  const isEmergency = urgency?.startsWith("Emergency") ?? false;

  async function goToNextStep() {
    const fields: (keyof BookingRequestFormInput)[] =
      step === 0 ? ["serviceType", "urgency"] : step === 1 ? ["issueDescription", "preferredTiming"] : [];
    const valid = await trigger(fields);
    if (valid) setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  async function onSubmit(values: BookingRequestFormInput) {
    const parsed = bookingRequestSchema.parse(values);
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "booking", values: parsed }),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (response.ok) {
        setStatus({
          type: "success",
          message: result?.message ?? "Thanks. Your service request has been received.",
          isEmergency: parsed.urgency.startsWith("Emergency"),
        });
        reset();
        setStep(0);
        return;
      }
      setStatus({ type: "error", message: result?.message ?? fallbackErrorMessage });
    } catch {
      setStatus({ type: "error", message: fallbackErrorMessage });
    }
  }

  if (status?.type === "success") {
    return (
      <div
        id={formId}
        className="scroll-mt-28 rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Request received</p>
        <h2 className="mt-3 text-3xl font-black text-brand-blue-dark">Thanks — we have your service request.</h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{status.message}</p>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          A team member will follow up using the contact details you provided. For routine scheduling, expect a call or
          email during business hours.
        </p>
        {status.isEmergency ? (
          <div className="mt-6 rounded-2xl border border-brand-red/25 bg-accent p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-red">Emergency HVAC</p>
            <p className="mt-2 font-semibold text-brand-blue-dark">
              If your heat or cooling cannot wait, call now for the fastest dispatch.
            </p>
            <a
              href={phoneHref}
              className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "mt-4 inline-flex gap-2")}
            >
              <Phone className="size-5" aria-hidden />
              Call now — {siteConfig.phone}
            </a>
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Back to home
          </Link>
          <Link href="/services" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
            Browse services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="scroll-mt-28 rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Request service</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>
        </div>
        <ol className="flex gap-2" aria-label="Form progress">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={cn("h-2 w-10 rounded-full transition-colors", index <= step ? "bg-primary" : "bg-border")}
              aria-hidden
            />
          ))}
        </ol>
      </div>

      {isEmergency ? (
        <div className="mt-5 rounded-2xl border border-brand-red/20 bg-accent/80 px-4 py-3">
          <p className="text-sm font-bold text-brand-blue-dark">
            For immediate emergency dispatch, call{" "}
            <a href={phoneHref} className="text-brand-red underline-offset-2 hover:underline">
              {siteConfig.phone}
            </a>{" "}
            while you complete this form.
          </p>
        </div>
      ) : null}

      {step === 0 ? (
        <div className="mt-6 grid gap-4">
          <SelectField
            label="Service type"
            options={BOOKING_SERVICE_TYPES}
            register={register("serviceType")}
            error={errors.serviceType?.message}
          />
          <SelectField
            label="Urgency"
            options={BOOKING_URGENCY_OPTIONS}
            register={register("urgency")}
            error={errors.urgency?.message}
          />
        </div>
      ) : null}

      {step === 1 ? (
        <div className="mt-6 grid gap-4">
          <Field label="Describe the issue or request" error={errors.issueDescription?.message}>
            <Textarea rows={5} {...register("issueDescription")} aria-invalid={Boolean(errors.issueDescription)} />
          </Field>
          <SelectField
            label="Preferred timing"
            options={BOOKING_PREFERRED_TIMING}
            register={register("preferredTiming")}
            error={errors.preferredTiming?.message}
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <Input {...register("name")} autoComplete="name" aria-invalid={Boolean(errors.name)} />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <Input {...register("phone")} type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
            </Field>
          </div>
          <Field label="Email (optional)" error={errors.email?.message}>
            <Input type="email" {...register("email")} autoComplete="email" aria-invalid={Boolean(errors.email)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" error={errors.city?.message}>
              <Input {...register("city")} autoComplete="address-level2" aria-invalid={Boolean(errors.city)} />
            </Field>
            <Field label="ZIP code" error={errors.zipCode?.message}>
              <Input {...register("zipCode")} autoComplete="postal-code" aria-invalid={Boolean(errors.zipCode)} />
            </Field>
          </div>
        </div>
      ) : null}

      {status?.type === "error" ? (
        <p className="mt-4 rounded-lg bg-accent p-3 text-sm font-semibold text-brand-red" role="alert">
          {status.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" size="lg" onClick={() => setStep((current) => current - 1)}>
            Back
          </Button>
        ) : null}
        {step < STEPS.length - 1 ? (
          <Button type="button" variant="emergency" size="lg" onClick={goToNextStep}>
            Continue
          </Button>
        ) : (
          <Button type="submit" variant="emergency" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit request"}
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-blue-dark">
      {label}
      {children}
      {error ? <span className="text-sm font-semibold text-brand-red">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  options,
  register,
  error,
}: {
  label: string;
  options: readonly string[];
  register: ReturnType<typeof useForm<BookingRequestFormInput>>["register"] extends (name: infer N) => infer R
    ? R
    : never;
  error?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-blue-dark">
      {label}
      <select
        {...register}
        aria-invalid={Boolean(error)}
        className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="text-sm font-semibold text-brand-red">{error}</span> : null}
    </label>
  );
}
