import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { wedding } from "@/config/wedding";
import { ShellIcon } from "./ornaments";
import { useLang } from "@/i18n";

export function GiftPix() {
  const { t } = useLang();
  const [qr, setQr] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(wedding.pix.code, {
      margin: 1,
      width: 240,
      color: { dark: "#0d1b2a", light: "#f2eee6" },
    }).then(setQr).catch(() => {});
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(wedding.pix.code);
      toast.success(t("gift.copied"), { description: wedding.pix.key });
    } catch {
      toast.error(t("gift.copy_error"));
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-sm border border-silver/30 bg-paper-texture p-6 text-navy shadow-[var(--shadow-elegant)] sm:p-10">
      <div className="flex flex-col items-center text-center">
        <ShellIcon className="h-12 w-12 text-navy/70" />
        <h3 className="mt-4 font-display text-2xl tracking-[0.15em] text-navy sm:text-3xl">
          {t("gift.title")}
        </h3>
        <p className="mt-4 max-w-md font-serif text-lg italic leading-relaxed text-navy/80 sm:text-xl">
          {t("gift.quote")}
        </p>

        <div className="mt-8 grid w-full gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          {qr && (
            <div className="mx-auto rounded-sm border border-navy/20 bg-paper p-3">
              <img src={qr} alt="QR Code PIX" className="h-40 w-40" />
            </div>
          )}
          <div className="space-y-3 text-left">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-navy/60">{t("gift.beneficiary")}</div>
              <div className="font-serif text-xl text-navy">{wedding.pix.name}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-navy/60">
                {t("gift.key")} · {wedding.pix.keyType}
              </div>
              <div className="break-all font-mono text-sm text-navy sm:text-base">
                {wedding.pix.key}
              </div>
            </div>
            <button
              onClick={copy}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-navy bg-navy px-5 py-3 text-xs uppercase tracking-[0.3em] text-paper transition-all hover:bg-navy-deep hover:shadow-[0_0_20px_rgba(13,27,42,0.4)] sm:w-auto"
            >
              {t("gift.copy")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
