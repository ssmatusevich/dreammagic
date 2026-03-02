"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(true);

  const accept = () => {
    document.cookie = "dreamagic_cookie_consent=accepted; path=/; max-age=31536000";
    setVisible(false);
  };

  const decline = () => {
    document.cookie = "dreamagic_cookie_consent=declined; path=/; max-age=31536000";
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
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
              onClick={accept}
              className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs tracking-[0.1em] text-[color:var(--text-primary)] transition-all duration-300 hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)]"
            >
              ACCEPT
            </button>
            <button
              type="button"
              onClick={decline}
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
