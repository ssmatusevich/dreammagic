import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { exhibitions } from "@/data/content";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Exhibitions",
  description: "Current, upcoming and past exhibitions in the DreaMagic program.",
  image: exhibitions[0]?.heroImage,
});

const groups = [
  { key: "current", title: "Current", items: exhibitions.filter((item) => item.status === "current") },
  { key: "upcoming", title: "Upcoming", items: exhibitions.filter((item) => item.status === "upcoming") },
  { key: "past", title: "Past", items: exhibitions.filter((item) => item.status === "past") },
] as const;

export default function ExhibitionsPage() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <SectionHeading
        overline="EXHIBITIONS"
        title="Program"
        description="Каждая выставка выстроена как небольшая пространственная история: один сильный кадр, короткий текст и ритм комнат."
      />

      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.key} className="border-t border-[color:var(--line)] pt-8">
            <h2 className="mb-6 font-serif text-3xl text-[color:var(--text-primary)]">{group.title}</h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((exhibition) => (
                <Link
                  key={exhibition.slug}
                  href={`/exhibitions/${exhibition.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={exhibition.heroImage}
                      alt={exhibition.title}
                      width={1000}
                      height={760}
                      sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                      className="h-auto w-full object-cover transition-all duration-700 group-hover:scale-[1.01] group-hover:brightness-[0.92]"
                    />
                  </div>
                  <div className="mt-3 border-b border-[color:var(--line)] pb-4">
                    <p className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">
                      {exhibition.city} · {exhibition.dateRange}
                    </p>
                    <p className="mt-1 font-serif text-2xl text-[color:var(--text-primary)]">
                      {exhibition.title}
                    </p>
                    <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{exhibition.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
