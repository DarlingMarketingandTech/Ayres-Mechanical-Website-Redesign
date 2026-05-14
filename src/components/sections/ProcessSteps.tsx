const steps = [
  { title: "Tell us what is happening", description: "Share the system type, symptoms, urgency, and best contact method." },
  { title: "Get a clear service path", description: "Ayres Mechanical reviews the request and helps route the right next step." },
  { title: "Restore comfort and confidence", description: "Service focuses on practical diagnostics, clear communication, and dependable work." },
];

export function ProcessSteps() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {steps.map((step, index) => (
        <div key={step.title} className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-full bg-brand-blue text-lg font-black text-white">{index + 1}</div>
          <h3 className="mt-5 text-2xl font-black">{step.title}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
