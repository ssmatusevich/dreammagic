import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-[920px] flex-col items-start justify-center px-4 py-12 md:px-8">
      <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">404</p>
      <h1 className="mt-2 font-serif text-5xl text-[color:var(--text-primary)]">Page not found</h1>
      <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
        Такой страницы не существует или она была перемещена.
      </p>
      <Link
        href="/home"
        className="mt-6 rounded-full border border-[color:var(--line)] px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)]"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
