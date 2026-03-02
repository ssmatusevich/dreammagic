"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { navItems, siteMeta } from "@/data/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
        scrolled
          ? "border-b border-[color:var(--line)] bg-[color:var(--surface)]/[0.92] backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between px-4 md:px-8 xl:px-[60px]">
        <Link
          href="/home"
          className={cn(
            "font-serif tracking-[0.08em] text-[color:var(--text-primary)] transition-all duration-500",
            scrolled ? "text-base" : "text-lg",
          )}
        >
          {siteMeta.title}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-xs tracking-[0.14em] transition-colors duration-300",
                pathname?.startsWith(item.href)
                  ? "text-[color:var(--text-primary)]"
                  : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]",
              )}
            >
              {item.label}
              {pathname?.startsWith(item.href) ? (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 h-[1px] w-full bg-[color:var(--text-primary)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
            </Link>
          ))}
          <Link
            href="/contacts"
            className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs tracking-[0.14em] text-[color:var(--text-primary)] transition-all duration-300 hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)]"
          >
            CONTACT
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-full border border-[color:var(--line)] px-3 py-2 text-xs tracking-[0.14em] text-[color:var(--text-primary)] transition-colors duration-300 hover:bg-[color:var(--surface-strong)] lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--surface)] lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-[1320px] flex-col px-4 py-4 md:px-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className={cn(
                      "block border-b border-[color:var(--line)] py-3 text-sm tracking-[0.12em] transition-colors duration-200",
                      pathname?.startsWith(item.href)
                        ? "text-[color:var(--text-primary)]"
                        : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.04, duration: 0.2 }}
              >
                <Link
                  href="/contacts"
                  onClick={closeMobile}
                  className="block py-3 text-sm tracking-[0.12em] text-[color:var(--text-primary)] transition-colors duration-200 hover:text-[color:var(--accent-clay)]"
                >
                  CONTACT
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
