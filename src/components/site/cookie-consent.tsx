"use client";

import { useState } from "react";

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

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-[90] max-w-md rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-sm">
      <p className="text-sm text-[color:var(--text-secondary)]">
        Мы используем технические и аналитические cookies для улучшения опыта.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={accept}
          className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs tracking-[0.1em] text-[color:var(--text-primary)]"
        >
          ACCEPT
        </button>
        <button
          type="button"
          onClick={decline}
          className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs tracking-[0.1em] text-[color:var(--text-secondary)]"
        >
          DECLINE
        </button>
      </div>
    </div>
  );
}
