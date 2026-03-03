"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import type { Artwork } from "@/data/content";
import { formatAvailability } from "@/lib/utils";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

type ArtworkCardProps = {
  artwork: Artwork;
  priority?: boolean;
};

export function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col"
    >
      <Link
        href={`/works/${artwork.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={artwork.imageUrl}
          alt={artwork.titleRu}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-[0.92]"
        />
      </Link>

      <div className="mt-3 border-b border-[color:var(--line)] pb-4">
        <p className="text-[11px] tracking-[0.14em] text-[color:var(--text-muted)]">
          KATERINA MATUSEVICH
        </p>
        <Link
          href={`/works/${artwork.slug}`}
          className="mt-1 block font-serif text-[20px] leading-snug text-[color:var(--text-primary)] transition-colors duration-300 hover:text-[color:var(--accent-clay)]"
        >
          {artwork.titleRu}
        </Link>
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <p className="text-[13px] text-[color:var(--text-secondary)]">
            {artwork.year} · {artwork.material}
          </p>
          <p className="shrink-0 text-[11px] tracking-[0.08em] text-[color:var(--text-muted)]">
            {formatAvailability(artwork.availability)}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
