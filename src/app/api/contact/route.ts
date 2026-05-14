import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Request captured by placeholder API route." });
}
