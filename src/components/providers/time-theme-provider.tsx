"use client";

import { useEffect } from "react";

import { currentSunPhase } from "@/lib/utils";

function applyPhase(phase: ReturnType<typeof currentSunPhase>) {
  document.documentElement.dataset.sunPhase = phase;
}

export function TimeThemeProvider() {
  useEffect(() => {
    applyPhase(currentSunPhase());
    const interval = window.setInterval(() => {
      applyPhase(currentSunPhase());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return null;
}
