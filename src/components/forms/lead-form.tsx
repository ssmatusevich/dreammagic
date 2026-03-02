"use client";

import { FormEvent, useState } from "react";

import { cn } from "@/lib/utils";

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
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Request failed" }));
        throw new Error(body.error || "Request failed");
      }

      setStatus("success");
      form.reset();
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Unknown error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6"
    >
      <h2 className="mb-4 font-serif text-3xl text-[color:var(--text-primary)]">{title}</h2>
      <div className="grid gap-3">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        {includePreferredDate ? (
          <Field label="Preferred date / time" name="preferredDate" required />
        ) : null}
        <Field label="Message" name="message" as="textarea" />
        <input
          name="honeypot"
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition-all duration-300 hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)] disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-[color:var(--text-primary)]"
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

function Field({
  label,
  name,
  type = "text",
  as,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "textarea";
  required?: boolean;
}) {
  const shared =
    "w-full rounded-2xl border border-[color:var(--line)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[color:var(--text-muted)]";

  return (
    <label className="grid gap-1">
      <span className="text-xs tracking-[0.08em] text-[color:var(--text-muted)]">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} rows={4} required={required} className={shared} placeholder={label} />
      ) : (
        <input name={name} type={type} required={required} className={shared} placeholder={label} />
      )}
    </label>
  );
}
