"use client";

import { FormEvent, useState } from "react";

import { cn } from "@/lib/utils";

type InquiryKind = "inquire" | "request_viewing";

type InquiryPanelProps = {
  artworkSlug: string;
  artworkTitle: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function InquiryPanel({ artworkSlug, artworkTitle }: InquiryPanelProps) {
  const [kind, setKind] = useState<InquiryKind>("inquire");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const openPanel = (value: InquiryKind) => {
    setKind(value);
    setStatus("idle");
    setError("");
    setOpen(true);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          artworkSlug,
          type: kind,
        }),
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
    <>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => openPanel("inquire")}
          className="rounded-full border border-[color:var(--line)] px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--surface-strong)]"
        >
          INQUIRE
        </button>
        <button
          type="button"
          onClick={() => openPanel("request_viewing")}
          className="rounded-full border border-[color:var(--line)] px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--surface-strong)]"
        >
          REQUEST VIEWING
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[80] bg-black/40 p-4 transition",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="mx-auto mt-10 w-full max-w-xl rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-3xl text-[color:var(--text-primary)]">
              {kind === "inquire" ? "Inquire" : "Request viewing"}
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.12em] text-[color:var(--text-secondary)]"
            >
              CLOSE
            </button>
          </div>

          <p className="mb-4 text-sm text-[color:var(--text-secondary)]">{artworkTitle}</p>

          <form onSubmit={onSubmit} className="grid gap-3">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Message" name="message" as="textarea" required />
            <input
              name="honeypot"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 rounded-full border border-[color:var(--line)] px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--surface-strong)] disabled:opacity-70"
            >
              {status === "loading" ? "SENDING..." : "SEND REQUEST"}
            </button>
          </form>

          <p
            className={cn(
              "mt-3 text-sm",
              status === "success" && "text-emerald-700",
              status === "error" && "text-rose-700",
              status === "idle" && "text-[color:var(--text-secondary)]",
            )}
          >
            {status === "success"
              ? "Запрос отправлен. Мы свяжемся с вами в течение 24 часов."
              : status === "error"
                ? error || "Ошибка отправки запроса."
                : "Детали можно уточнить через форму."}
          </p>
        </div>
      </div>
    </>
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
    "w-full rounded-2xl border border-[color:var(--line)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--text-primary)]";

  return (
    <label className="grid gap-1">
      <span className="text-xs tracking-[0.08em] text-[color:var(--text-muted)]">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} rows={4} required={required} className={shared} placeholder={label} />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={shared}
          placeholder={label}
        />
      )}
    </label>
  );
}
