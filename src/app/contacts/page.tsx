import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contacts",
  description: "Direct contact details and inquiry form.",
});

export default function ContactsPage() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <SectionHeading
        overline="CONTACT"
        title="Get in touch"
        description="Для запросов о работах, выставках и частных просмотрах используйте форму или прямые каналы связи."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <section className="lg:col-span-5">
          <dl className="grid gap-0 text-sm">
            <div className="border-b border-[color:var(--line)] py-4">
              <dt className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">EMAIL</dt>
              <dd className="mt-1">
                <a href="mailto:hello@dreamagic.art" className="text-[15px] text-[color:var(--text-primary)] underline decoration-[color:var(--line)] underline-offset-4 transition-colors hover:decoration-[color:var(--accent-clay)]">
                  hello@dreamagic.art
                </a>
              </dd>
            </div>
            <div className="py-4">
              <dt className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">SOCIAL</dt>
              <dd className="mt-2 flex flex-wrap gap-3">
                <span className="cursor-default text-[13px] text-[color:var(--text-muted)]" aria-label="Instagram (coming soon)">
                  Instagram
                </span>
                <span className="cursor-default text-[13px] text-[color:var(--text-muted)]" aria-label="Telegram (coming soon)">
                  Telegram
                </span>
              </dd>
            </div>
          </dl>
        </section>
        <section className="lg:col-span-7">
          <LeadForm endpoint="/api/contact" title="Contact form" submitLabel="SEND MESSAGE" />
        </section>
      </div>
    </div>
  );
}
