import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type { ZodSchema } from "zod";

import { rateLimit } from "./rate-limit";

export async function clientIp(): Promise<string> {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return list.get("x-real-ip") || "unknown";
}

type FormHandlerOptions<T> = {
  request: Request;
  schema: ZodSchema<T>;
  rateLimitKey: string;
  onSuccess: (data: T, ip: string) => void;
};

export async function handleFormSubmission<T extends { honeypot?: string }>({
  request,
  schema,
  rateLimitKey,
  onSuccess,
}: FormHandlerOptions<T>) {
  const ip = await clientIp();
  const allowed = rateLimit({ key: `${rateLimitKey}:${ip}`, windowMs: 60_000, limit: 10 });

  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  onSuccess(parsed.data, ip);
  return NextResponse.json({ ok: true });
}
