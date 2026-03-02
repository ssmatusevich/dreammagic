import { Suspense } from "react";

import { WorksPageClient } from "@/components/works/works-page-client";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Works",
  description: "Museum-like grid of artworks with filters by medium, availability and size.",
});

export default function WorksPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1320px] px-4 py-12 text-sm text-[color:var(--text-secondary)] md:px-8 xl:px-[60px]">Loading works...</div>}>
      <WorksPageClient />
    </Suspense>
  );
}
