"use client";

import { FormEvent, useState } from "react";

import { cn } from "@/lib/utils";
import { Field } from "./field";

type LeadFormProps = {
  endpoint: "/api/contact" | "/api/visit";
  title: string;
  submitLabel: string;
  includePreferredDate?: boolean;
};

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({
  endpoint,
  title,
  submitLabel,
  includePreferredDate = false,
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(body.error || "Request failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="mb-6 font-serif text-3xl text-[color:var(--text-primary)]">{title}</h2>
      <div className="grid gap-4">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        {includePreferredDate ? <Field label="Preferred date / time" name="preferredDate" required /> : null}
        <Field label="Message" name="message" as="textarea" />
        <input name="honeypot" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition-all duration-300 hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)] disabled:opacity-60"
      >
        {status === "loading" ? "SENDING..." : submitLabel}
      </button>

      <p
        className={cn(
          "mt-3 text-sm transition-colors duration-300",
          status === "success" && "text-emerald-700",
          status === "error" && "text-rose-700",
          status === "idle" && "text-[color:var(--text-secondary)]",
        )}
      >
        {status === "success"
          ? "Спасибо! Мы получили ваш запрос."
          : status === "error"
            ? error || "Ошибка отправки. Попробуйте позже."
            : "Мы ответим в течение 24 часов."}
      </p>
    </form>
  );
}
