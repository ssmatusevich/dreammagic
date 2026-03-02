import Image from "next/image";
import Link from "next/link";

import { ArtworkCard } from "@/components/works/artwork-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { artworks, exhibitions, journalPosts, siteMeta } from "@/data/content";
import { buildMetadata, currentSunPhase } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Home",
  description: "Digital agora of DreaMagic with current exhibition and selected works.",
  image: artworks[0]?.imageUrl,
});

export default function HomePage() {
  const phase = currentSunPhase();
  const selectedWorks = artworks.slice(0, 6);
  const currentExhibition =
    exhibitions.find((item) => item.status === "current") ?? exhibitions[0];

  return (
    <div>
      <section className="relative isolate min-h-[88vh] overflow-hidden border-b border-[color:var(--line)]">
        <Image
          src={artworks[9].imageUrl}
          alt="DreaMagic hero artwork"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.55)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-[1320px] flex-col justify-end px-4 pb-12 pt-28 md:px-8 md:pb-16 xl:px-[60px]">
          <p className="max-w-3xl font-serif text-4xl leading-tight text-[color:var(--surface)] md:text-6xl">
            {siteMeta.manifesto}
          </p>
          <div className="mt-8 max-w-xl">
            <div className="mb-2 flex items-center justify-between text-[11px] tracking-[0.12em] text-[color:var(--surface)]/90">
              <span>MORNING</span>
              <span>DAY</span>
              <span>EVENING</span>
            </div>
            <div className="h-[2px] w-full bg-[color:var(--surface)]/30">
              <div
                className="h-full bg-[color:var(--surface)] transition-all duration-700"
                style={{
                  width:
                    phase === "morning"
                      ? "20%"
                      : phase === "day"
                        ? "55%"
                        : phase === "evening"
                          ? "85%"
                          : "100%",
                }}
              />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/works"
              className="rounded-full border border-[color:var(--surface)]/50 px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--surface)] transition hover:bg-[color:var(--surface)]/10"
            >
              VIEW WORKS
            </Link>
            <Link
              href="/exhibitions"
              className="rounded-full border border-[color:var(--surface)]/50 px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--surface)] transition hover:bg-[color:var(--surface)]/10"
            >
              CURRENT EXHIBITION
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-4 py-12 md:px-8 md:py-16 xl:px-[60px]">
        <SectionHeading
          overline="CURRENT EXHIBITION"
          title={currentExhibition.title}
          description={currentExhibition.summary}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <Link
            href={`/exhibitions/${currentExhibition.slug}`}
            className="group relative block overflow-hidden rounded-[28px] border border-[color:var(--line)] md:col-span-8"
          >
            <Image
              src={currentExhibition.heroImage}
              alt={currentExhibition.title}
              width={1400}
              height={900}
              sizes="(max-width: 767px) 100vw, 66vw"
              className="h-full w-full object-cover transition group-hover:opacity-90"
            />
          </Link>
          <div className="space-y-4 md:col-span-4">
            {artworks.slice(0, 2).map((item) => (
              <Link
                key={item.slug}
                href={`/works/${item.slug}`}
                className="group relative block overflow-hidden rounded-[22px] border border-[color:var(--line)]"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.titleRu}
                  width={800}
                  height={560}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="h-full w-full object-cover transition group-hover:opacity-90"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] border-t border-[color:var(--line)] px-4 py-12 md:px-8 md:py-16 xl:px-[60px]">
        <SectionHeading overline="SELECTED WORKS" title="Curated Selection" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {selectedWorks.map((item, index) => (
            <ArtworkCard key={item.slug} artwork={item} priority={index < 3} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/works"
            className="rounded-full border border-[color:var(--line)] px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--surface-strong)]"
          >
            VIEW ALL WORKS
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-8 border-t border-[color:var(--line)] px-4 py-12 md:grid-cols-2 md:px-8 md:py-16 xl:px-[60px]">
        <div>
          <SectionHeading
            overline="ARTIST"
            title="Katerina Matusevich"
            description="Художница исследует тему памяти, внутреннего света и космического движения через тактильную живопись и медитативную композицию."
          />
          <Link
            href="/artist"
            className="rounded-full border border-[color:var(--line)] px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--surface-strong)]"
          >
            READ STATEMENT
          </Link>
        </div>

        <div className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6">
          <p className="mb-4 text-xs tracking-[0.12em] text-[color:var(--text-muted)]">
            RITUALS / EVENINGS
          </p>
          <ul className="space-y-3 text-sm text-[color:var(--text-secondary)]">
            <li className="border-b border-[color:var(--line)] pb-3">
              <strong className="block text-[color:var(--text-primary)]">Color Meditation Session</strong>
              <span>12 Mar 2026 · 19:00</span>
            </li>
            <li className="border-b border-[color:var(--line)] pb-3">
              <strong className="block text-[color:var(--text-primary)]">Artist Talk: Memory Geometry</strong>
              <span>20 Mar 2026 · 18:30</span>
            </li>
            <li>
              <strong className="block text-[color:var(--text-primary)]">Private Viewing Evening</strong>
              <span>28 Mar 2026 · by reservation</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-8 border-t border-[color:var(--line)] px-4 py-12 md:grid-cols-2 md:px-8 md:py-16 xl:px-[60px]">
        <div className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6">
          <p className="mb-2 text-xs tracking-[0.12em] text-[color:var(--text-muted)]">VISIT</p>
          <h3 className="font-serif text-3xl text-[color:var(--text-primary)]">Book a viewing</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Tue-Sat · 11:00-19:00 · by appointment
          </p>
          <Link
            href="/visit"
            className="mt-4 inline-block rounded-full border border-[color:var(--line)] px-5 py-2 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--surface)]"
          >
            GO TO VISIT
          </Link>
        </div>
        <div>
          <SectionHeading overline="JOURNAL" title="Latest Notes" />
          <ul className="space-y-4">
            {journalPosts.map((post) => (
              <li key={post.slug} className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">
                  {post.category} · {post.date}
                </p>
                <p className="mt-1 font-serif text-2xl text-[color:var(--text-primary)]">{post.title}</p>
                <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
