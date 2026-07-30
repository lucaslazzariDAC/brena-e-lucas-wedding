import { useLang } from "@/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="fixed left-1/2 top-3 z-[60] flex -translate-x-1/2 items-center gap-0 rounded-full border border-silver/70 bg-navy-deep/90 p-1 font-display text-[11px] uppercase tracking-[0.3em] text-silver shadow-[0_8px_28px_rgba(0,0,0,0.55)] backdrop-blur-md sm:top-5 sm:text-[12px]"
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        className={`rounded-full px-4 py-1.5 transition-all sm:px-5 sm:py-2 ${
          lang === "pt"
            ? "bg-silver text-navy-deep shadow-inner"
            : "text-silver/85 hover:text-paper"
        }`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-4 py-1.5 transition-all sm:px-5 sm:py-2 ${
          lang === "en"
            ? "bg-silver text-navy-deep shadow-inner"
            : "text-silver/85 hover:text-paper"
        }`}
      >
        EN
      </button>
    </div>
  );
}
