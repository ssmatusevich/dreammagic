"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems, siteMeta } from "@/data/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        scrolled && "border-[color:var(--line)] bg-[color:color-mix(in_oklab,var(--surface)_88%,white_12%)]/95 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between px-4 md:px-8 xl:px-[60px]">
        <Link
          href="/home"
          className="font-serif text-lg tracking-[0.08em] text-[color:var(--text-primary)] transition-opacity hover:opacity-70"
        >
          {siteMeta.title}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs tracking-[0.14em] text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]",
                pathname?.startsWith(item.href) && "text-[color:var(--text-primary)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contacts"
            className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs tracking-[0.14em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--surface-strong)]"
          >
            CONTACT
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-full border border-[color:var(--line)] px-3 py-2 text-xs tracking-[0.14em] text-[color:var(--text-primary)] lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          MENU
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-transparent bg-[color:var(--surface)] transition-all duration-200 lg:hidden",
          mobileOpen ? "max-h-96 border-[color:var(--line)]" : "max-h-0",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1320px] flex-col px-4 py-4 md:px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "border-b border-[color:var(--line)] py-3 text-sm tracking-[0.12em] text-[color:var(--text-secondary)]",
                pathname?.startsWith(item.href) && "text-[color:var(--text-primary)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contacts"
            onClick={() => setMobileOpen(false)}
            className="py-3 text-sm tracking-[0.12em] text-[color:var(--text-primary)]"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </header>
  );
}
