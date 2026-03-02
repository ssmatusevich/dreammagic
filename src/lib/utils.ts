import type { Metadata } from "next";

import { siteMeta } from "@/data/content";

export function cn(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

export function buildMetadata(input: {
  title: string;
  description?: string;
  image?: string;
}): Metadata {
  const title = `${input.title} — ${siteMeta.title}`;

  return {
    title,
    description: input.description ?? siteMeta.description,
    openGraph: {
      title,
      description: input.description ?? siteMeta.description,
      images: input.image ? [input.image] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description ?? siteMeta.description,
      images: input.image ? [input.image] : undefined,
    },
  };
}

export function formatAvailability(status: "available" | "on hold" | "sold"): string {
  if (status === "on hold") {
    return "on hold";
  }

  return status;
}

export function currentSunPhase(now = new Date()): "morning" | "day" | "evening" | "night" {
  const hour = now.getHours();

  if (hour >= 6 && hour < 12) {
    return "morning";
  }

  if (hour >= 12 && hour < 17) {
    return "day";
  }

  if (hour >= 17 && hour < 21) {
    return "evening";
  }

  return "night";
}
