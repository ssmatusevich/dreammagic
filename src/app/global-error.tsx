"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body className="bg-[#f5f1e8] text-[#26231f]">
        <main className="mx-auto flex min-h-screen w-full max-w-[920px] flex-col items-start justify-center px-4 py-12 md:px-8">
          <p className="text-xs tracking-[0.12em] text-[#7a6f60]">500</p>
          <h1 className="mt-2 font-serif text-5xl">Unexpected error</h1>
          <p className="mt-3 text-sm text-[#5c5448]">
            Произошла непредвиденная ошибка. Попробуйте повторить действие.
          </p>
          <p className="mt-2 text-xs text-[#7a6f60]">{error.message}</p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-full border border-[#b6aa95] px-5 py-2 text-xs tracking-[0.12em]"
            >
              RETRY
            </button>
            <Link
              href="/home"
              className="rounded-full border border-[#b6aa95] px-5 py-2 text-xs tracking-[0.12em]"
            >
              HOME
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
