import Link from "next/link";

import { siteMeta } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[color:var(--line)]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 px-4 py-8 text-sm text-[color:var(--text-secondary)] md:flex-row md:items-center md:justify-between md:px-8 xl:px-[60px]">
        <p>{siteMeta.copyright}</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="transition-colors duration-200 hover:text-[color:var(--text-primary)]">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors duration-200 hover:text-[color:var(--text-primary)]">
            Terms
          </Link>
          <Link href="/cookies" className="transition-colors duration-200 hover:text-[color:var(--text-primary)]">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
