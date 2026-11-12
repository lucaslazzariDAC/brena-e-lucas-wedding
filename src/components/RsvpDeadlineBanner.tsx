import { useState } from "react";
import { X } from "lucide-react";
import { useLang } from "@/i18n";
import { wedding } from "@/config/wedding";

/**
 * Faixa de alerta fixa no topo lembrando o prazo de confirmação (RSVP).
 * Some automaticamente após o prazo, ou quando o convidado fecha no "X".
 */
export function RsvpDeadlineBanner() {
  const { t } = useLang();
  const [dismissed, setDismissed] = useState(false);

  const expired = Date.now() > new Date(wedding.rsvpDeadline).getTime();
  if (dismissed || expired) return null;

  return (
    <div
      role="status"
      className="pointer-events-auto relative flex w-full items-center justify-center gap-3 border-b border-navy-deep/20 bg-silver-bright px-10 py-2 text-center font-display text-[10px] uppercase tracking-[0.2em] text-navy-deep shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:text-[11px] sm:tracking-[0.25em]"
    >
      <span>
        {t("banner.rsvp_prefix")}{" "}
        <strong className="font-bold">{t("rsvp.deadline_label")}</strong>
      </span>
      <a
        href="#rsvp"
        className="hidden shrink-0 rounded-full border border-navy-deep/60 px-3 py-0.5 font-semibold transition-colors hover:bg-navy-deep hover:text-silver-bright sm:inline-block"
      >
        {t("banner.rsvp_cta")}
      </a>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={t("banner.close")}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-navy-deep/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
