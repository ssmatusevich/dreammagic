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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <section className="space-y-4 lg:col-span-5">
          <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
            <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">EMAIL</p>
            <a href="mailto:hello@dreamagic.art" className="mt-2 block text-[15px] text-[color:var(--text-primary)]">
              hello@dreamagic.art
            </a>
          </div>
          <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
            <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">SOCIAL</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="cursor-default rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--text-muted)]" aria-label="Instagram (coming soon)">
                INSTAGRAM
              </span>
              <span className="cursor-default rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--text-muted)]" aria-label="Telegram (coming soon)">
                TELEGRAM
              </span>
            </div>
          </div>
        </section>
        <section className="lg:col-span-7">
          <LeadForm endpoint="/api/contact" title="Contact form" submitLabel="SEND MESSAGE" />
        </section>
      </div>
    </div>
  );
}
