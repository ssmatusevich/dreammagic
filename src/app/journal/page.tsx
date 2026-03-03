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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {journalPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6"
          >
            <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">
              {post.category} · {post.date}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[color:var(--text-primary)]">{post.title}</h2>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{post.excerpt}</p>
            <p className="mt-3 text-xs tracking-[0.1em] text-[color:var(--text-muted)]">{post.readTime}</p>
            <span
              className="mt-5 inline-block cursor-default rounded-full border border-[color:var(--line)] px-4 py-2 text-xs tracking-[0.12em] text-[color:var(--text-muted)]"
              aria-label="Full article coming soon"
            >
              COMING SOON
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
