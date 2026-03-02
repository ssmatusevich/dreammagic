type SectionHeadingProps = {
  overline?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ overline, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-6 md:mb-8">
      {overline ? (
        <p className="mb-2 text-xs tracking-[0.14em] text-[color:var(--text-muted)]">{overline}</p>
      ) : null}
      <h2 className="font-serif text-4xl text-[color:var(--text-primary)] md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm text-[color:var(--text-secondary)] md:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
