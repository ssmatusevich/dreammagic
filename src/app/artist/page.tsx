import Image from "next/image";
import Link from "next/link";

import { ArtworkCard } from "@/components/works/artwork-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { artworks, exhibitions, siteMeta } from "@/data/content";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Artist",
  description: "Statement and selected works by Katerina Matusevich.",
  image: artworks[1]?.imageUrl,
});

export default function ArtistPage() {
  const selected = artworks.slice(0, 3);
  const selectedExhibitions = exhibitions.slice(0, 2);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMeta.author,
    description:
      "Contemporary visual artist exploring cosmic forms, memory and light through abstract painting.",
  };

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="overflow-hidden rounded-[28px] border border-[color:var(--line)] lg:col-span-5">
          <Image
            src={artworks[1].imageUrl}
            alt="Katerina Matusevich portrait placeholder"
            width={1100}
            height={1300}
            priority
            sizes="(max-width: 1023px) 100vw, 40vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="lg:col-span-7">
          <SectionHeading overline="ARTIST" title="Katerina Matusevich" />
          <p className="max-w-3xl text-[15px] leading-8 text-[color:var(--text-secondary)]">
            Я строю живописные пространства вокруг света, памяти и внутреннего движения формы.
            В моих работах цвет живет как энергия: иногда мягко пульсирует, иногда собирается в
            центр и раскрывается как орбита, цветок или вихрь. Проект DreaMagic для меня — это
            не коллекция отдельных полотен, а единая архитектура созерцания, где зритель проходит
            путь от внешнего взгляда к личному ощущению глубины.
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[color:var(--text-secondary)]">
            Я работаю с маслом, акрилом и смешанными материалами, сохраняя в кадре тактильность
            мазка и честность фактуры. Эта визуальная практика соединяет космические мотивы и
            человеческий опыт тишины, трансформации и присутствия.
          </p>
        </div>
      </div>

      <section className="mt-10 border-t border-[color:var(--line)] pt-8">
        <h2 className="font-serif text-4xl text-[color:var(--text-primary)]">Selected works</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {selected.map((item) => (
            <ArtworkCard key={item.slug} artwork={item} />
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-[color:var(--line)] pt-8">
        <h2 className="font-serif text-4xl text-[color:var(--text-primary)]">Selected exhibitions</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {selectedExhibitions.map((item) => (
            <div
              key={item.slug}
              className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5"
            >
              <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">
                {item.city} · {item.dateRange}
              </p>
              <h3 className="mt-1 font-serif text-2xl text-[color:var(--text-primary)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{item.summary}</p>
              <Link
                href={`/exhibitions/${item.slug}`}
                className="mt-4 inline-block rounded-full border border-[color:var(--line)] px-4 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)]"
              >
                VIEW EXHIBITION
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
