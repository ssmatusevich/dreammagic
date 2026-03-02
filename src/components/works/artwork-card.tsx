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
      className="group flex flex-col gap-3"
    >
      <Link
        href={`/works/${artwork.slug}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)]"
      >
        <Image
          src={artwork.imageUrl}
          alt={artwork.titleRu}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.015] group-hover:brightness-[0.94]"
        />
        <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-12 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="font-serif text-lg text-[color:var(--surface)]">
            {artwork.titleRu}
          </span>
        </span>
      </Link>

      <div className="flex items-start justify-between gap-3 border-b border-[color:var(--line)] pb-3">
        <div>
          <p className="text-[11px] tracking-[0.12em] text-[color:var(--text-muted)]">
            KATERINA MATUSEVICH
          </p>
          <Link
            href={`/works/${artwork.slug}`}
            className="font-serif text-[18px] leading-snug text-[color:var(--text-primary)] transition-colors duration-300 hover:text-[color:var(--accent-clay)]"
          >
            {artwork.titleRu}
          </Link>
          <p className="mt-0.5 text-[13px] text-[color:var(--text-secondary)]">
            {artwork.year} · {artwork.material}
          </p>
        </div>
        <p className="mt-1 shrink-0 text-[11px] tracking-[0.08em] text-[color:var(--text-muted)]">
          {formatAvailability(artwork.availability)}
        </p>
      </div>
    </motion.article>
  );
}
