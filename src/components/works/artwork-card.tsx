import Image from "next/image";
import Link from "next/link";

import type { Artwork } from "@/data/content";
import { formatAvailability } from "@/lib/utils";

type ArtworkCardProps = {
  artwork: Artwork;
  priority?: boolean;
};

export function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  return (
    <article className="group flex flex-col gap-3">
      <Link
        href={`/works/${artwork.slug}`}
        className="relative block overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)]"
      >
        <Image
          src={artwork.imageUrl}
          alt={artwork.titleRu}
          width={1200}
          height={900}
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.01] group-hover:opacity-90"
        />
      </Link>
      <div className="flex items-start justify-between gap-3 border-b border-[color:var(--line)] pb-3">
        <div>
          <p className="text-[11px] tracking-[0.12em] text-[color:var(--text-muted)]">
            KATERINA MATUSEVICH
          </p>
          <Link
            href={`/works/${artwork.slug}`}
            className="font-serif text-[18px] text-[color:var(--text-primary)] transition hover:opacity-75"
          >
            {artwork.titleRu}
          </Link>
          <p className="text-[13px] text-[color:var(--text-secondary)]">
            {artwork.year} · {artwork.material}
          </p>
        </div>
        <p className="mt-1 text-[11px] tracking-[0.08em] text-[color:var(--text-muted)]">
          {formatAvailability(artwork.availability)}
        </p>
      </div>
    </article>
  );
}
