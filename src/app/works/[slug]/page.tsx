import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    return buildMetadata({
      title: "Work not found",
    });
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
    creator: {
      "@type": "Person",
      name: siteMeta.author,
    },
    artMedium: artwork.material,
    dateCreated: artwork.year,
    description: artwork.description,
    image: artwork.imageUrl,
  };

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <section className="lg:col-span-7">
          <div className="overflow-hidden rounded-[28px] border border-[color:var(--line)]">
            <Image
              src={artwork.imageUrl}
              alt={artwork.titleRu}
              width={1400}
              height={1200}
              priority
              sizes="(max-width: 1023px) 100vw, 60vw"
              className="h-auto w-full object-cover"
            />
          </div>

          {artwork.images.length > 1 ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {artwork.images.map((image, index) => (
                <div key={`${image}-${index}`} className="overflow-hidden rounded-[20px] border border-[color:var(--line)]">
                  <Image
                    src={image}
                    alt={`${artwork.titleRu} detail ${index + 1}`}
                    width={900}
                    height={700}
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <aside className="lg:col-span-5">
          <p className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">WORK DETAIL</p>
          <h1 className="mt-2 font-serif text-5xl text-[color:var(--text-primary)]">{artwork.titleRu}</h1>
          <p className="mt-2 text-base text-[color:var(--text-secondary)]">{artwork.titleEn}</p>
          <p className="mt-4 text-[15px] leading-7 text-[color:var(--text-secondary)]">{artwork.description}</p>

          <dl className="mt-6 grid gap-3 rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5 text-sm">
            <MetaRow label="Year" value={artwork.year} />
            <MetaRow label="Material" value={artwork.material} />
            <MetaRow label="Size" value={artwork.size} />
            <MetaRow label="Status" value={formatAvailability(artwork.availability)} />
            <MetaRow label="Room" value={artwork.room} />
          </dl>

          <div className="mt-6">
            <InquiryPanel artworkSlug={artwork.slug} artworkTitle={artwork.titleRu} />
          </div>
        </aside>
      </div>

      <section className="mt-12 border-t border-[color:var(--line)] pt-10">
        <h2 className="font-serif text-4xl text-[color:var(--text-primary)]">In the same room</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <ArtworkCard key={item.slug} artwork={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[color:var(--line)] pb-3 last:border-0 last:pb-0">
      <dt className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">{label}</dt>
      <dd className="text-right text-[color:var(--text-primary)]">{value}</dd>
    </div>
  );
}
