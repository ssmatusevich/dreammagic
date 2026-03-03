"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot(): boolean {
  return !getCookie("dreamagic_cookie_consent");
}

function getServerSnapshot(): boolean {
  return false;
}

export function CookieConsentBanner() {
  const shouldShow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const respond = (value: "accepted" | "declined") => {
    document.cookie = `dreamagic_cookie_consent=${value}; path=/; max-age=31536000`;
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AnimatePresence>
      {shouldShow ? (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-4 left-4 z-[90] max-w-md rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-sm"
        >
          <p className="text-sm text-[color:var(--text-secondary)]">
            Мы используем технические и аналитические cookies для улучшения опыта.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => respond("accepted")}
              className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs tracking-[0.1em] text-[color:var(--text-primary)] transition-all duration-300 hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)]"
            >
              ACCEPT
            </button>
            <button
              type="button"
              onClick={() => respond("declined")}
              className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs tracking-[0.1em] text-[color:var(--text-secondary)] transition-colors duration-300 hover:text-[color:var(--text-primary)]"
            >
              DECLINE
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
