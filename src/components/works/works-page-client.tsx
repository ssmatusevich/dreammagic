"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { artworks, type Availability, type Medium } from "@/data/content";
import { cn } from "@/lib/utils";

import { ArtworkCard } from "./artwork-card";

const mediumOptions: Medium[] = ["painting", "mixed media"];
const availabilityOptions: Availability[] = ["available", "on hold", "sold"];
const sizeOptions = ["small", "medium", "large"] as const;

function sizeCategory(size: string): (typeof sizeOptions)[number] {
  const first = Number.parseInt(size, 10);

  if (Number.isNaN(first) || first <= 55) {
    return "small";
  }

  if (first <= 75) {
    return "medium";
  }

  return "large";
}

export function WorksPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const selectedMedium = searchParams.get("medium");
  const selectedAvailability = searchParams.get("availability");
  const selectedSize = searchParams.get("size");

  const filtered = useMemo(() => {
    return artworks.filter((item) => {
      const mediumMatch = !selectedMedium || item.medium === selectedMedium;
      const availabilityMatch =
        !selectedAvailability || item.availability === selectedAvailability;
      const sizeMatch = !selectedSize || sizeCategory(item.size) === selectedSize;

      return mediumMatch && availabilityMatch && sizeMatch;
    });
  }, [selectedMedium, selectedAvailability, selectedSize]);

  const applyFilter = (key: "medium" | "availability" | "size", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const resetFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const filterContent = (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs tracking-[0.12em] text-[color:var(--text-muted)]">MEDIUM</p>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={!selectedMedium}
            onClick={() => applyFilter("medium", "")}
            label="all"
          />
          {mediumOptions.map((option) => (
            <FilterButton
              key={option}
              active={selectedMedium === option}
              onClick={() => applyFilter("medium", option)}
              label={option}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs tracking-[0.12em] text-[color:var(--text-muted)]">
          AVAILABILITY
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={!selectedAvailability}
            onClick={() => applyFilter("availability", "")}
            label="all"
          />
          {availabilityOptions.map((option) => (
            <FilterButton
              key={option}
              active={selectedAvailability === option}
              onClick={() => applyFilter("availability", option)}
              label={option}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs tracking-[0.12em] text-[color:var(--text-muted)]">SIZE</p>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={!selectedSize}
            onClick={() => applyFilter("size", "")}
            label="all"
          />
          {sizeOptions.map((option) => (
            <FilterButton
              key={option}
              active={selectedSize === option}
              onClick={() => applyFilter("size", option)}
              label={option}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--surface-strong)]"
      >
        RESET FILTERS
      </button>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <div className="mb-8 flex items-center justify-between md:hidden">
        <h1 className="font-serif text-4xl text-[color:var(--text-primary)]">Works</h1>
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)]"
        >
          FILTER
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <aside className="hidden lg:col-span-3 lg:block">{filterContent}</aside>
        <section className="lg:col-span-9">
          {filtered.length === 0 ? (
            <div className="rounded-[24px] border border-[color:var(--line)] p-8 text-center">
              <p className="font-serif text-2xl text-[color:var(--text-primary)]">No works found</p>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                Попробуйте изменить фильтры или вернуться к полному каталогу.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full border border-[color:var(--line)] px-4 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)]"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((artwork, index) => (
                <ArtworkCard key={artwork.slug} artwork={artwork} priority={index < 3} />
              ))}
            </div>
          )}
        </section>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[70] bg-black/30 p-4 transition md:hidden",
          mobileFiltersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className={cn(
            "mt-auto max-h-[88vh] overflow-auto rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition-transform duration-200",
            mobileFiltersOpen ? "translate-y-0" : "translate-y-8",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[color:var(--text-primary)]">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="text-xs tracking-[0.12em] text-[color:var(--text-secondary)]"
            >
              CLOSE
            </button>
          </div>
          {filterContent}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="mt-6 w-full rounded-full border border-[color:var(--line)] px-4 py-3 text-xs tracking-[0.12em] text-[color:var(--text-primary)]"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-[11px] tracking-[0.1em] transition",
        active
          ? "border-[color:var(--text-primary)] text-[color:var(--text-primary)]"
          : "border-[color:var(--line)] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]",
      )}
    >
      {label.toUpperCase()}
    </button>
  );
}
