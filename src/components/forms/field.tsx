type FieldProps = {
  label: string;
  name: string;
  type?: string;
  as?: "textarea";
  required?: boolean;
};

const shared =
  "w-full rounded-2xl border border-[color:var(--line)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[color:var(--text-muted)]";

export function Field({
  label,
  name,
  type = "text",
  as,
  required = false,
}: FieldProps) {
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
