"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Phone,
  Wrench,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/content/site";
import {
  DIAGNOSTIC_START_STEP,
  diagnosticPhone,
  getDiagnosticNode,
  legacySystemNote,
  metaStepFieldMap,
  metaStepLabelFieldMap,
  resolveRouterNext,
  type DiagnosticMetaData,
  type DiagnosticNode,
  type DiagnosticOption,
} from "@/content/diagnosticData";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  diagnosticContactSchema,
  type DiagnosticContactValues,
  type DiagnosticSubmissionPayload,
} from "@/lib/validators";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "loading" | "success" | "error";

type DiagnosticApiResponse =
  | { ok: true; message?: string }
  | { ok: false; message?: string; errors?: Partial<Record<keyof DiagnosticContactValues, string[]>> };

const fallbackErrorMessage = "Something went wrong. Please call for immediate service.";

function isMetaStep(stepId: string) {
  return stepId.startsWith("meta_");
}

function isContactStep(stepId: string) {
  return stepId === "contact_dispatch";
}

export function DiagnosticWizard() {
  const formId = useId();
  const [currentStepId, setCurrentStepId] = useState(DIAGNOSTIC_START_STEP);
  const [history, setHistory] = useState<string[]>([]);
  const [metaData, setMetaData] = useState<DiagnosticMetaData>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [pathSummary, setPathSummary] = useState<string[]>([]);
  const [contactMode, setContactMode] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const currentNode = getDiagnosticNode(currentStepId);

  const showLegacyNote = metaData.systemAge === "legacy";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DiagnosticContactValues>({
    resolver: zodResolver(diagnosticContactSchema),
    defaultValues: { website: "" },
  });

  const progressLabel = useMemo(() => {
    const phase = contactMode
      ? "Contact"
      : currentNode?.type === "resolution"
        ? "DIY guide"
        : currentNode?.type === "emergency"
          ? "Emergency"
          : isMetaStep(currentStepId)
            ? "About your system"
            : "Symptoms";
    return phase;
  }, [contactMode, currentNode?.type, currentStepId]);

  const resolveNextStep = useCallback(
    (nextId: string): string => {
      if (nextId === "router_symptom") {
        return resolveRouterNext(metaData.propertyType);
      }
      return nextId;
    },
    [metaData.propertyType],
  );

  const goToStep = useCallback((nextId: string, pushHistory = true) => {
    const resolved = resolveNextStep(nextId);

    if (resolved === "contact_dispatch" || isContactStep(resolved)) {
      setContactMode(true);
      if (pushHistory) {
        setHistory((prev) => [...prev, currentStepId]);
      }
      setCurrentStepId(resolved);
      return;
    }

    setContactMode(false);
    if (pushHistory) {
      setHistory((prev) => [...prev, currentStepId]);
    }
    setCurrentStepId(resolved);
  }, [currentStepId, resolveNextStep]);

  const handleOptionSelect = useCallback(
    (option: DiagnosticOption) => {
      const node = getDiagnosticNode(currentStepId);
      if (!node || node.type !== "question") return;

      if (isMetaStep(currentStepId)) {
        const field = metaStepFieldMap[currentStepId];
        const labelField = metaStepLabelFieldMap[currentStepId];
        if (field) {
          setMetaData((prev) => ({
            ...prev,
            [field]: option.value,
            ...(labelField ? { [labelField]: option.label } : {}),
          }));
        }
      } else {
        setUserAnswers((prev) => ({ ...prev, [currentStepId]: option.label }));
        setPathSummary((prev) => [...prev, `${node.prompt} → ${option.label}`]);
      }

      if (node.requiresContact || option.next === "contact_dispatch") {
        setContactMode(true);
        setHistory((prev) => [...prev, currentStepId]);
        setCurrentStepId("contact_dispatch");
        return;
      }

      goToStep(option.next);
    },
    [currentStepId, goToStep],
  );

  const handleBack = useCallback(() => {
    if (contactMode) {
      setContactMode(false);
      setSubmitState("idle");
      setSubmitMessage(null);
    }

    const previous = history[history.length - 1];
    if (!previous) return;

    setHistory((prev) => prev.slice(0, -1));
    setCurrentStepId(previous);

    if (isContactStep(previous)) {
      setContactMode(true);
    }
  }, [contactMode, history]);

  const requestProfessionalHelp = useCallback(() => {
    setContactMode(true);
    setHistory((prev) => [...prev, currentStepId]);
    setCurrentStepId("contact_dispatch");
  }, [currentStepId]);

  async function onContactSubmit(values: DiagnosticContactValues) {
    setSubmitState("loading");
    setSubmitMessage(null);

    trackAnalyticsEvent("form_submit_attempt", { form: "diagnostic_triage" });

    const payload: DiagnosticSubmissionPayload = {
      metaData,
      userAnswers,
      contactInfo: values,
      pathSummary,
      currentStepId,
    };

    try {
      const response = await fetch("/api/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as DiagnosticApiResponse | null;

      if (response.ok && result?.ok) {
        trackAnalyticsEvent("form_submit_success", { form: "diagnostic_triage" });
        setSubmitState("success");
        setSubmitMessage(result.message ?? "Thanks. A technician will follow up shortly.");
        reset();
        return;
      }

      if (result && "errors" in result && result.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          const message = messages?.[0];
          if (message) {
            setError(field as keyof DiagnosticContactValues, { type: "server", message });
          }
        }
      }

      trackAnalyticsEvent("form_submit_error", { form: "diagnostic_triage", status: response.status });
      setSubmitState("error");
      setSubmitMessage(result?.message ?? fallbackErrorMessage);
    } catch {
      trackAnalyticsEvent("form_submit_error", { form: "diagnostic_triage", status: "network_error" });
      setSubmitState("error");
      setSubmitMessage(fallbackErrorMessage);
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-[2rem] border border-border/70 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-3xl font-black text-brand-blue-dark">Request received</h2>
        <p className="mt-3 max-w-xl text-lg leading-8 text-muted-foreground">{submitMessage}</p>
        <p className="mt-4 text-sm font-semibold text-brand-blue-dark">
          Need immediate help? Call{" "}
          <a href={phoneHref} className="font-black text-primary underline underline-offset-4">
            {siteConfig.phone}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={routes.requestService} className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
            Request Service
          </Link>
          <Link href={routes.home} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (contactMode || isContactStep(currentStepId)) {
    return (
      <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-sm sm:p-8">
        <WizardHeader
          progressLabel={progressLabel}
          showBack={history.length > 0}
          onBack={handleBack}
          showLegacyNote={showLegacyNote}
        />
        <h2 className="mt-6 text-2xl font-black text-brand-blue-dark sm:text-3xl">Schedule your professional diagnosis</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Share your contact details and our team will follow up with next steps. For emergencies, call{" "}
          <a href={phoneHref} className="font-black text-primary underline underline-offset-4">
            {diagnosticPhone}
          </a>
          .
        </p>

        <form onSubmit={handleSubmit(onContactSubmit)} className="mt-8 grid gap-4" noValidate>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor={`${formId}-website`}>Website</label>
            <Input id={`${formId}-website`} tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <ContactField label="Name" error={errors.name?.message} fieldId={`${formId}-name`}>
            <Input
              id={`${formId}-name`}
              autoComplete="name"
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            />
          </ContactField>

          <ContactField label="Phone" error={errors.phone?.message} fieldId={`${formId}-phone`}>
            <Input
              id={`${formId}-phone`}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              {...register("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            />
          </ContactField>

          <ContactField label="City" error={errors.city?.message} fieldId={`${formId}-city`}>
            <Input
              id={`${formId}-city`}
              autoComplete="address-level2"
              {...register("city")}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? `${formId}-city-error` : undefined}
            />
          </ContactField>

          <Button type="submit" variant="default" size="lg" disabled={isSubmitting || submitState === "loading"}>
            {isSubmitting || submitState === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              "Submit for follow-up"
            )}
          </Button>

          {submitState === "error" && submitMessage ? (
            <p role="alert" className="rounded-lg bg-accent p-3 text-sm font-semibold text-brand-red">
              {submitMessage}
            </p>
          ) : null}
        </form>
      </div>
    );
  }

  if (!currentNode) {
    return (
      <div className="rounded-[2rem] border border-border/70 bg-white p-8">
        <p className="text-brand-red font-semibold">We could not load this step. Please start over or call {diagnosticPhone}.</p>
        <Button className="mt-4" onClick={() => setCurrentStepId(DIAGNOSTIC_START_STEP)}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-sm sm:p-8">
      <WizardHeader
        progressLabel={progressLabel}
        showBack={history.length > 0}
        onBack={handleBack}
        showLegacyNote={showLegacyNote}
      />

      {currentNode.type === "question" ? (
        <QuestionStep node={currentNode} onSelect={handleOptionSelect} />
      ) : null}

      {currentNode.type === "resolution" ? (
        <ResolutionStep node={currentNode} onRequestHelp={requestProfessionalHelp} />
      ) : null}

      {currentNode.type === "emergency" ? (
        <EmergencyStep node={currentNode} onRequestHelp={requestProfessionalHelp} />
      ) : null}
    </div>
  );
}

function WizardHeader({
  progressLabel,
  showBack,
  onBack,
  showLegacyNote,
}: {
  progressLabel: string;
  showBack: boolean;
  onBack: () => void;
  showLegacyNote: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-ice px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-brand-blue-dark">
          <Wrench className="size-3.5 text-primary" aria-hidden="true" />
          {progressLabel}
        </p>
        {showBack ? (
          <Button type="button" variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
        ) : null}
      </div>
      {showLegacyNote ? (
        <p className="mt-4 rounded-2xl border border-brand-blue/15 bg-brand-ice p-4 text-sm leading-7 text-brand-blue-dark">
          {legacySystemNote}
        </p>
      ) : null}
    </div>
  );
}

function QuestionStep({
  node,
  onSelect,
}: {
  node: Extract<DiagnosticNode, { type: "question" }>;
  onSelect: (option: DiagnosticOption) => void;
}) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-black text-balance text-brand-blue-dark sm:text-3xl">{node.prompt}</h2>
      {node.helperText ? <p className="mt-3 max-w-2xl text-muted-foreground">{node.helperText}</p> : null}
      <ul className="mt-8 grid gap-3">
        {node.options.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              onClick={() => onSelect(option)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border/80 bg-white px-5 py-4 text-left text-base font-bold text-brand-blue-dark shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span>{option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResolutionStep({
  node,
  onRequestHelp,
}: {
  node: Extract<DiagnosticNode, { type: "resolution" }>;
  onRequestHelp: () => void;
}) {
  return (
    <div className="mt-6">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-red">DIY fix guide</p>
      <h2 className="mt-3 text-2xl font-black text-brand-blue-dark sm:text-3xl">{node.title}</h2>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{node.summary}</p>
      <ol className="mt-6 grid gap-3">
        {node.steps.map((step, index) => (
          <li
            key={step}
            className="flex gap-4 rounded-2xl border border-border/70 bg-brand-ice/60 px-4 py-4 text-sm leading-7 text-brand-blue-dark sm:text-base"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      {node.cta ? <p className="mt-6 text-sm leading-7 text-muted-foreground">{node.cta}</p> : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button" variant="default" size="lg" onClick={onRequestHelp}>
          Request professional diagnosis
        </Button>
        <a href={phoneHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          <Phone className="size-4" aria-hidden="true" />
          Call {diagnosticPhone}
        </a>
      </div>
    </div>
  );
}

function EmergencyStep({
  node,
  onRequestHelp,
}: {
  node: Extract<DiagnosticNode, { type: "emergency" }>;
  onRequestHelp: () => void;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-brand-red/25 bg-brand-red/[0.06] p-6">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-red text-white">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-2xl font-black text-brand-blue-dark sm:text-3xl">{node.title}</h2>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">{node.message}</p>
      <a
        href={phoneHref}
        className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "mt-6 w-full justify-center sm:w-auto")}
        aria-label={`Call emergency line at ${node.phone}`}
      >
        <Phone className="size-4" aria-hidden="true" />
        Call {node.phone} now
      </a>
      <Button type="button" variant="outline" size="lg" className="mt-3 w-full sm:ml-3 sm:w-auto" onClick={onRequestHelp}>
        Submit details for dispatch
      </Button>
    </div>
  );
}

function ContactField({
  label,
  error,
  fieldId,
  children,
}: {
  label: string;
  error?: string;
  fieldId: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-blue-dark">
      {label}
      {children}
      {error ? (
        <span id={`${fieldId}-error`} role="alert" className="text-sm text-brand-red">
          {error}
        </span>
      ) : null}
    </label>
  );
}
