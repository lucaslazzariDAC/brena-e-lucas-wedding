import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n";

function getDiff(target: number) {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s };
}

export function Countdown() {
  const { t } = useLang();
  const target = new Date(wedding.date).getTime();
  const [tm, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    setT(getDiff(target));
    const id = setInterval(() => setT(getDiff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: t("countdown.days"), value: tm?.d ?? 0 },
    { label: t("countdown.hours"), value: tm?.h ?? 0 },
    { label: t("countdown.minutes"), value: tm?.m ?? 0 },
    { label: t("countdown.seconds"), value: tm?.s ?? 0 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
      {items.map((it) => (
        <div
          key={it.label}
          className="relative rounded-sm border border-silver/30 bg-navy/40 px-3 py-5 text-center backdrop-blur-sm sm:py-7"
          style={{ boxShadow: "inset 0 0 20px rgba(79,163,195,0.08)" }}
        >
          <div className="font-serif text-3xl font-light text-paper sm:text-5xl">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-silver sm:text-xs">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
