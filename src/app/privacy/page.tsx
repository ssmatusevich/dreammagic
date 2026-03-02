import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Privacy",
  description: "Privacy policy for DreaMagic website visitors.",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[920px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-serif text-5xl text-[color:var(--text-primary)]">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
        Мы собираем только данные, необходимые для обратной связи и записи на просмотр. Контактные
        данные не передаются третьим лицам и используются исключительно для коммуникации по запросу
        пользователя.
      </p>
    </div>
  );
}
