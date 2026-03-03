import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { InquiryPanel } from "@/components/forms/inquiry-panel";
import { ArtworkCard } from "@/components/works/artwork-card";
import { artworks, getArtworkBySlug, relatedArtworks, siteMeta } from "@/data/content";
import { buildMetadata, formatAvailability } from "@/lib/utils";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    return buildMetadata({ title: "Work not found" });
  }

  return buildMetadata({
    title: artwork.titleRu,
    description: `${artwork.material}, ${artwork.size}, ${artwork.year}. ${artwork.description}`,
    image: artwork.imageUrl,
  });
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const related = relatedArtworks(slug, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.titleRu,
    creator: { "@type": "Person", name: siteMeta.author },
    artMedium: artwork.material,
    dateCreated: artwork.year,
    description: artwork.description,
    image: artwork.imageUrl,
  };

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <FadeIn as="section" className="lg:col-span-7">
          <Image
            src={artwork.imageUrl}
            alt={artwork.titleRu}
            width={1400}
            height={1200}
            priority
            sizes="(max-width: 1023px) 100vw, 60vw"
            className="h-auto w-full object-cover"
          />

          {artwork.images.length > 1 ? (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {artwork.images.map((image, index) => (
                <FadeIn key={`${image}-${index}`} delay={index * 0.06}>
                  <Image
                    src={image}
                    alt={`${artwork.titleRu} detail ${index + 1}`}
                    width={900}
                    height={700}
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    className="h-auto w-full object-cover transition-all duration-500 hover:brightness-[0.96]"
                  />
                </FadeIn>
              ))}
            </div>
          ) : null}
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-5">
          <p className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">WORK DETAIL</p>
          <h1 className="mt-2 font-serif text-5xl leading-tight text-[color:var(--text-primary)]">
            {artwork.titleRu}
          </h1>
          <p className="mt-1 text-base text-[color:var(--text-secondary)]">{artwork.titleEn}</p>

          <div className="mt-6 border-t border-[color:var(--line)] pt-6">
            <p className="text-[15px] leading-7 text-[color:var(--text-secondary)]">
              {artwork.description}
            </p>
          </div>

          <dl className="mt-6 grid gap-0 text-sm">
            <MetaRow label="Year" value={artwork.year} />
            <MetaRow label="Material" value={artwork.material} />
            <MetaRow label="Size" value={artwork.size} />
            <MetaRow label="Status" value={formatAvailability(artwork.availability)} />
            <MetaRow label="Room" value={artwork.room} />
          </dl>

          <div className="mt-8">
            <InquiryPanel artworkSlug={artwork.slug} artworkTitle={artwork.titleRu} />
          </div>
        </FadeIn>
      </div>

      <FadeIn as="section" className="mt-16 border-t border-[color:var(--line)] pt-12">
        <h2 className="font-serif text-4xl text-[color:var(--text-primary)]">In the same room</h2>
        <StaggerChildren className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <ArtworkCard key={item.slug} artwork={item} />
          ))}
        </StaggerChildren>
      </FadeIn>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--line)] py-3">
      <dt className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">{label}</dt>
      <dd className="text-right text-[color:var(--text-primary)]">{value}</dd>
    </div>
  );
}
