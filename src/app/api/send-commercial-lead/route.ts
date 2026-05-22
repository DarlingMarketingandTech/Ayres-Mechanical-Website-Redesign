import { NextResponse } from "next/server";

import { CommercialLeadUnavailableError, submitCommercialLead } from "@/lib/commercial-lead-submission";
import { getRateLimitState } from "@/lib/rate-limit";
import { commercialLeadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const { limited, retryAfterSeconds } = getRateLimitState(request);

  if (limited) {
    return NextResponse.json(
      { ok: false, message: "Too many requests submitted in a short period. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Please submit the commercial intake form using valid form fields." }, { status: 400 });
  }

  const parsed = commercialLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: "Thanks. Your request has been received." }, { status: 200 });
  }

  try {
    const result = await submitCommercialLead(parsed.data);
    return NextResponse.json({ ok: true, ...result }, { status: 200 });
  } catch (error) {
    if (error instanceof CommercialLeadUnavailableError) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(error.message);
      }
      return NextResponse.json({ ok: false, message: error.message }, { status: 503 });
    }

    if (process.env.NODE_ENV !== "production") {
      console.error("Commercial lead delivery failed.", error);
    } else {
      console.error("Commercial lead delivery failed.");
    }
    return NextResponse.json({ ok: false, message: "Unable to send this commercial request right now. Please call for immediate service." }, { status: 502 });
  }
}
