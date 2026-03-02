import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Visit",
  description: "Visit information and booking for private viewing sessions.",
});

export default function VisitPage() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]">
      <SectionHeading
        overline="VISIT"
        title="Book a viewing"
        description="Частные просмотры доступны по записи. Мы поможем подобрать спокойное время для знакомства с работами."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <section className="space-y-4 lg:col-span-6">
          <InfoCard title="Hours">Tue-Sat · 11:00-19:00</InfoCard>
          <InfoCard title="Address">Dreamagic Art Space, Bodrum Coastline</InfoCard>
          <InfoCard title="How to get there">
            15 minutes from city center. We will send exact location after booking confirmation.
          </InfoCard>
          <InfoCard title="Policies">
            Фото и видео разрешены без вспышки. Доставка и возврат обсуждаются индивидуально в
            процессе сделки.
          </InfoCard>
          <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
            <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">MAP</p>
            <div className="mt-3 flex h-52 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] text-sm text-[color:var(--text-secondary)]">
              Mono map placeholder (lazy-load external map after interaction)
            </div>
          </div>
        </section>

        <section className="lg:col-span-6">
          <LeadForm
            endpoint="/api/visit"
            title="Viewing request"
            submitLabel="BOOK A VIEWING"
            includePreferredDate
          />
        </section>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
      <p className="text-xs tracking-[0.12em] text-[color:var(--text-muted)]">{title}</p>
      <p className="mt-2 text-[15px] text-[color:var(--text-secondary)]">{children}</p>
    </div>
  );
}
