import { SectionHeading } from "@/components/ui/section-heading";
import { journalPosts } from "@/data/content";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Journal",
  description: "Editorial notes, essays and process materials from DreaMagic.",
});

export default function JournalPage() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <SectionHeading
        overline="JOURNAL"
        title="Notes and Essays"
        description="Тексты о процессе, выставочных сценариях и связи пространства с восприятием работ."
      />

      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-12">
        {journalPosts.map((post) => (
          <article
            key={post.slug}
            className="border-b border-[color:var(--line)] py-6"
          >
            <p className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">
              {post.category} · {post.date}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[color:var(--text-primary)]">{post.title}</h2>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{post.excerpt}</p>
            <p className="mt-3 text-xs tracking-[0.1em] text-[color:var(--text-muted)]">{post.readTime}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
