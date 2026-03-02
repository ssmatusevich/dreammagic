import { NextResponse } from "next/server";

import { clientIp } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const ip = await clientIp();
  const allowed = rateLimit({
    key: `contact:${ip}`,
    windowMs: 60_000,
    limit: 10,
  });

  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const payload = parsed.data;

  if (payload.honeypot) {
    return NextResponse.json({ ok: true });
  }

  console.info("[CONTACT]", {
    name: payload.name,
    email: payload.email,
    ip,
  });

  return NextResponse.json({ ok: true });
}
