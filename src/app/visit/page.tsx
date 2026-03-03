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

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <section className="lg:col-span-6">
          <dl className="grid gap-0 text-sm">
            <InfoRow label="Hours" value="Tue-Sat · 11:00-19:00" />
            <InfoRow label="Address" value="Dreamagic Art Space, Bodrum Coastline" />
            <InfoRow label="How to get there" value="15 minutes from city center. We will send exact location after booking confirmation." />
            <InfoRow label="Policies" value="Фото и видео разрешены без вспышки. Доставка и возврат обсуждаются индивидуально." />
          </dl>

          <div className="mt-8 border-t border-[color:var(--line)] pt-6">
            <p className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">MAP</p>
            <div className="mt-3 flex h-48 items-center justify-center border border-[color:var(--line)] text-sm text-[color:var(--text-muted)]">
              Map loads on interaction
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[color:var(--line)] py-4">
      <dt className="text-xs tracking-[0.14em] text-[color:var(--text-muted)]">{label}</dt>
      <dd className="mt-1 text-[15px] text-[color:var(--text-secondary)]">{value}</dd>
    </div>
  );
}
