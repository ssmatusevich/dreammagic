import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { artworks, exhibitions, getExhibitionBySlug } from "@/data/content";
import { buildMetadata } from "@/lib/utils";

type ExhibitionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return exhibitions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ExhibitionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = getExhibitionBySlug(slug);

  if (!exhibition) {
    return buildMetadata({ title: "Exhibition not found" });
  }

  return buildMetadata({
    title: exhibition.title,
    description: exhibition.summary,
    image: exhibition.heroImage,
  });
}

export default async function ExhibitionDetailPage({ params }: ExhibitionPageProps) {
  const { slug } = await params;
  const exhibition = getExhibitionBySlug(slug);

  if (!exhibition) {
    notFound();
  }

  const shownWorks = exhibition.works
    .map((item) => artworks.find((artwork) => artwork.slug === item))
    .filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: exhibition.title,
    startDate: exhibition.dateRange,
    location: {
      "@type": "Place",
      name: exhibition.city,
    },
    image: exhibition.heroImage,
    description: exhibition.summary,
  };

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="overflow-hidden rounded-[28px] border border-[color:var(--line)]">
        <Image
          src={exhibition.heroImage}
          alt={exhibition.title}
          width={1600}
          height={900}
          priority
          sizes="100vw"
          className="h-auto w-full object-cover"
        />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-8 border-t border-[color:var(--line)] pt-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">
            {exhibition.city} · {exhibition.dateRange}
          </p>
          <h1 className="mt-2 font-serif text-5xl text-[color:var(--text-primary)]">{exhibition.title}</h1>
          <p className="mt-4 text-[15px] leading-7 text-[color:var(--text-secondary)]">
            {exhibition.description}
          </p>
        </div>
        <aside className="lg:col-span-5">
          <h2 className="font-serif text-3xl text-[color:var(--text-primary)]">Exhibited works</h2>
          <ul className="mt-4 space-y-3">
            {shownWorks.map((work) =>
              work ? (
                <li key={work.slug} className="border-b border-[color:var(--line)] pb-3">
                  <p className="font-serif text-xl text-[color:var(--text-primary)]">{work.titleRu}</p>
                  <p className="text-sm text-[color:var(--text-secondary)]">
                    {work.year} · {work.material}
                  </p>
                </li>
              ) : null,
            )}
          </ul>
        </aside>
      </section>

      <section className="mt-10 border-t border-[color:var(--line)] pt-8">
        <h2 className="font-serif text-4xl text-[color:var(--text-primary)]">Installation views</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {exhibition.installationViews.map((view, index) => (
            <div key={`${view}-${index}`} className="overflow-hidden rounded-[24px] border border-[color:var(--line)]">
              <Image
                src={view}
                alt={`${exhibition.title} installation view ${index + 1}`}
                width={1200}
                height={900}
                sizes="(max-width: 767px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
