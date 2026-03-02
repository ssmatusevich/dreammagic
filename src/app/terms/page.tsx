import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Terms",
  description: "Terms of use for DreaMagic website.",
});

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-[920px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-serif text-5xl text-[color:var(--text-primary)]">Terms of Use</h1>
      <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
        Все изображения и тексты принадлежат DreaMagic и автору работ. Любое использование материалов
        сайта допускается только с письменного согласия правообладателя.
      </p>
    </div>
  );
}
