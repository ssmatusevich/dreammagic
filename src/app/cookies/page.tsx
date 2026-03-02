import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Cookies",
  description: "Cookie policy for DreaMagic website.",
});

export default function CookiesPage() {
  return (
    <div className="mx-auto w-full max-w-[920px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-serif text-5xl text-[color:var(--text-primary)]">Cookies</h1>
      <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
        Сайт использует технические cookies и, при согласии пользователя, аналитические cookies для
        улучшения качества сервиса и пользовательского опыта.
      </p>
    </div>
  );
}
