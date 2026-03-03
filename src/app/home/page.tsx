import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren } from "@/components/motion/stagger-children";
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
      {/* Hero */}
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <Image
          src={artworks[9].imageUrl}
          alt="DreaMagic hero artwork"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.60)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-[1320px] flex-col justify-end px-4 pb-12 pt-28 md:px-8 md:pb-20 xl:px-[60px]">
          <FadeIn delay={0.15} duration={0.7}>
            <p className="max-w-3xl font-serif text-4xl leading-[1.1] text-[color:var(--surface)] md:text-6xl">
              {siteMeta.manifesto}
            </p>
          </FadeIn>

          <FadeIn delay={0.35} duration={0.6}>
            <div className="mt-10 max-w-xl">
              <div className="mb-2 flex items-center justify-between text-[11px] tracking-[0.14em] text-[color:var(--surface)]/70">
                <span>MORNING</span>
                <span>DAY</span>
                <span>EVENING</span>
              </div>
              <div className="h-[1px] w-full bg-[color:var(--surface)]/20">
                <div
                  className="h-full bg-[color:var(--surface)]/80 transition-all duration-1000 ease-out"
                  style={{
                    width:
                      phase === "morning" ? "20%" : phase === "day" ? "55%" : phase === "evening" ? "85%" : "100%",
                  }}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} duration={0.5}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/works"
                className="rounded-full border border-[color:var(--surface)]/30 px-5 py-2.5 text-xs tracking-[0.12em] text-[color:var(--surface)] transition-all duration-300 hover:border-[color:var(--surface)]/60 hover:bg-[color:var(--surface)]/8"
              >
                VIEW WORKS
              </Link>
              <Link
                href="/exhibitions"
                className="rounded-full border border-[color:var(--surface)]/30 px-5 py-2.5 text-xs tracking-[0.12em] text-[color:var(--surface)] transition-all duration-300 hover:border-[color:var(--surface)]/60 hover:bg-[color:var(--surface)]/8"
              >
                CURRENT EXHIBITION
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Current Exhibition */}
      <FadeIn as="section" className="mx-auto w-full max-w-[1320px] px-4 py-16 md:px-8 md:py-20 xl:px-[60px]">
        <SectionHeading
          overline="CURRENT EXHIBITION"
          title={currentExhibition.title}
          description={currentExhibition.summary}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <Link
            href={`/exhibitions/${currentExhibition.slug}`}
            className="group relative block overflow-hidden md:col-span-8"
          >
            <Image
              src={currentExhibition.heroImage}
              alt={currentExhibition.title}
              width={1400}
              height={900}
              sizes="(max-width: 767px) 100vw, 66vw"
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.01] group-hover:brightness-[0.92]"
            />
          </Link>
          <div className="space-y-4 md:col-span-4">
            {artworks.slice(0, 2).map((item) => (
              <Link
                key={item.slug}
                href={`/works/${item.slug}`}
                className="group relative block overflow-hidden"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.titleRu}
                  width={800}
                  height={560}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.01] group-hover:brightness-[0.92]"
                />
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Selected Works */}
      <FadeIn as="section" className="mx-auto w-full max-w-[1320px] border-t border-[color:var(--line)] px-4 py-16 md:px-8 md:py-20 xl:px-[60px]">
        <SectionHeading overline="SELECTED WORKS" title="Curated Selection" />
        <StaggerChildren className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {selectedWorks.map((item, index) => (
            <ArtworkCard key={item.slug} artwork={item} priority={index < 3} />
          ))}
        </StaggerChildren>
        <div className="mt-10">
          <Link
            href="/works"
            className="rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition-all duration-300 hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)]"
          >
            VIEW ALL WORKS
          </Link>
        </div>
      </FadeIn>

      {/* Artist + Rituals */}
      <section className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-12 border-t border-[color:var(--line)] px-4 py-16 md:grid-cols-2 md:px-8 md:py-20 xl:px-[60px]">
        <FadeIn>
          <SectionHeading
            overline="ARTIST"
            title="Katerina Matusevich"
            description="Художница исследует тему памяти, внутреннего света и космического движения через тактильную живопись и медитативную композицию."
          />
          <Link
            href="/artist"
            className="rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition-all duration-300 hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)]"
          >
            READ STATEMENT
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-5 text-xs tracking-[0.14em] text-[color:var(--text-muted)]">RITUALS / EVENINGS</p>
          <ul className="space-y-0 text-sm text-[color:var(--text-secondary)]">
            <li className="border-b border-[color:var(--line)] py-4">
              <strong className="block text-[color:var(--text-primary)]">Color Meditation Session</strong>
              12 Mar 2026 · 19:00
            </li>
            <li className="border-b border-[color:var(--line)] py-4">
              <strong className="block text-[color:var(--text-primary)]">Artist Talk: Memory Geometry</strong>
              20 Mar 2026 · 18:30
            </li>
            <li className="py-4">
              <strong className="block text-[color:var(--text-primary)]">Private Viewing Evening</strong>
              28 Mar 2026 · by reservation
            </li>
          </ul>
        </FadeIn>
      </section>

      {/* Visit + Journal */}
      <section className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-12 border-t border-[color:var(--line)] px-4 py-16 md:grid-cols-2 md:px-8 md:py-20 xl:px-[60px]">
        <FadeIn>
          <p className="mb-2 text-xs tracking-[0.14em] text-[color:var(--text-muted)]">VISIT</p>
          <h3 className="font-serif text-4xl text-[color:var(--text-primary)]">Book a viewing</h3>
          <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
            Tue-Sat · 11:00-19:00 · by appointment
          </p>
          <Link
            href="/visit"
            className="mt-6 inline-block rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs tracking-[0.12em] text-[color:var(--text-primary)] transition-all duration-300 hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)]"
          >
            GO TO VISIT
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <SectionHeading overline="JOURNAL" title="Latest Notes" />
          <ul className="space-y-0">
            {journalPosts.map((post) => (
              <li key={post.slug} className="border-b border-[color:var(--line)] py-5 transition-colors duration-200 hover:border-[color:var(--accent-clay)]/30">
                <p className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">
                  {post.category} · {post.date}
                </p>
                <p className="mt-1 font-serif text-2xl text-[color:var(--text-primary)]">{post.title}</p>
                <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>
    </div>
  );
}
