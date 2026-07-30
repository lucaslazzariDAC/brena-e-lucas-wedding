import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import coverLeft from "@/assets/cover-left.jpg";
import coverRight from "@/assets/cover-right.jpg";
import { useLang } from "@/i18n";

export function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const { t } = useLang();
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(onOpen, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy-texture px-4 py-6">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-4 sm:gap-6 my-auto">

        <div className="relative" style={{ perspective: "1800px" }}>
          <motion.div
            initial={{ rotateX: -8, scale: 0.92, opacity: 0 }}
            animate={{ rotateX: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative"
          >
            <Cover opening={opening} onSealClick={handleOpen} />
          </motion.div>
        </div>

        <AnimatePresence>
          {!opening && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              onClick={handleOpen}
              className="group relative inline-flex items-center gap-2 rounded-sm border border-silver/50 bg-transparent px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-silver/90 backdrop-blur-sm transition-all hover:border-silver hover:bg-silver/10 hover:text-paper"
            >
              <span>{t("envelope.open")}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: opening ? 0 : 0.95 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center font-display text-base tracking-[0.45em] text-silver-bright sm:text-xl"
        >
          {t("envelope.tagline")}
        </motion.p>
      </div>
    </div>
  );
}

function Cover({ opening, onSealClick }: { opening: boolean; onSealClick: () => void }) {
  const { t } = useLang();
  return (
    <div className="relative h-[min(70dvh,560px)] w-[min(78vw,360px)] sm:h-[min(75dvh,600px)] sm:w-[min(60vw,400px)]">
      <motion.div
        animate={
          opening
            ? { scale: 0.85, y: -20, opacity: 0, filter: "blur(8px)" }
            : { scale: 1, y: 0, opacity: 1 }
        }
        transition={{ duration: 1.6, delay: opening ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full overflow-hidden rounded-sm shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)]"
      >
        {/* Two image halves */}
        <img
          src={coverLeft}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-y-0 left-0 h-full w-1/2 object-cover"
        />
        <img
          src={coverRight}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-y-0 right-0 h-full w-1/2 object-cover"
        />

        {/* Wavy silver deckled seam down the middle */}
        <svg
          viewBox="0 0 40 600"
          preserveAspectRatio="none"
          className="absolute inset-y-0 left-1/2 h-full w-10 -translate-x-1/2"
          aria-hidden
        >
          <defs>
            <linearGradient id="seamSilver" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8a8a8a" />
              <stop offset="50%" stopColor="#f0f0f0" />
              <stop offset="100%" stopColor="#8a8a8a" />
            </linearGradient>
          </defs>
          {/* Silver torn-edge band */}
          <path
            d="M20 0
               C 6 60 34 120 18 200
               C 4 280 36 360 20 440
               C 6 520 34 600 20 600
               L 20 600 L 20 0 Z"
            stroke="url(#seamSilver)"
            strokeWidth="3"
            fill="none"
            opacity="0.95"
          />
          <path
            d="M20 0 C 6 60 34 120 18 200 C 4 280 36 360 20 440 C 6 520 34 600 20 600"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Ribbon & wax seal */}
        <AnimatePresence>
          {!opening && (
            <>
              {/* Navy satin ribbon — left half */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ x: "-120%", opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute left-0 top-[52%] h-14 w-1/2 origin-right -translate-y-1/2 overflow-hidden shadow-[0_10px_22px_rgba(0,0,0,0.55)]"
                style={{
                  background:
                    "linear-gradient(180deg, #2a4d80 0%, #1b3460 18%, #0f1f44 38%, #050d22 52%, #0c1c3e 66%, #1a3258 84%, #28477a 100%)",
                }}
              >
                {/* Silk sheen sweep */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(255,255,255,0.18) 45%, transparent 58%)",
                    mixBlendMode: "screen",
                  }}
                />
                {/* Fold shadow near seal (right edge) */}
                <div
                  aria-hidden
                  className="absolute inset-y-0 right-0 w-10"
                  style={{
                    background:
                      "linear-gradient(270deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ x: "120%", opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute right-0 top-[52%] h-14 w-1/2 origin-left -translate-y-1/2 overflow-hidden shadow-[0_10px_22px_rgba(0,0,0,0.55)]"
                style={{
                  background:
                    "linear-gradient(180deg, #2a4d80 0%, #1b3460 18%, #0f1f44 38%, #050d22 52%, #0c1c3e 66%, #1a3258 84%, #28477a 100%)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(255,255,255,0.18) 45%, transparent 58%)",
                    mixBlendMode: "screen",
                  }}
                />
                {/* Fold shadow near seal (left edge) */}
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-10"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
                  }}
                />
              </motion.div>

              {/* Irregular wax seal button */}
              <motion.button
                type="button"
                onClick={onSealClick}
                initial={{ scale: 0, rotate: -15, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ y: 60, rotate: 25, opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                aria-label={t("envelope.seal_aria")}
                className="absolute left-1/2 top-[52%] h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                style={{ filter: "drop-shadow(0 12px 16px rgba(0,0,0,0.6))" }}
              >
                <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
                  <defs>
                    <radialGradient id="waxSilver" cx="35%" cy="30%" r="75%">
                      <stop offset="0%" stopColor="#f6f6f6" />
                      <stop offset="35%" stopColor="#d4d4d4" />
                      <stop offset="70%" stopColor="#8e8e8e" />
                      <stop offset="100%" stopColor="#4a4a4a" />
                    </radialGradient>
                  </defs>
                  {/* Irregular wax blob — mimics drippy melted wax */}
                  <path
                    d="M50 4
                       C 60 5 67 3 72 7
                       C 80 6 88 13 88 22
                       C 94 27 97 34 95 42
                       C 99 49 98 58 92 64
                       C 94 73 88 82 79 84
                       C 76 92 66 96 58 93
                       C 52 98 42 98 36 94
                       C 28 96 19 91 17 83
                       C 9 81 4 73 6 64
                       C 2 58 2 49 6 43
                       C 3 35 7 27 14 23
                       C 13 14 21 6 30 7
                       C 36 3 44 3 50 4 Z"
                    fill="url(#waxSilver)"
                    stroke="#3a3a3a"
                    strokeWidth="0.8"
                  />
                  {/* Subtle inner ring (pressed edge) */}
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="33"
                    ry="32"
                    fill="none"
                    stroke="rgba(0,0,0,0.18)"
                    strokeWidth="0.8"
                  />
                  <ellipse
                    cx="50"
                    cy="49"
                    rx="33"
                    ry="32"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="0.6"
                  />
                  {/* Highlight crescent */}
                  <path
                    d="M22 28 Q 35 14 55 14"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* L&B monogram engraved */}
                  <text
                    x="50"
                    y="60"
                    textAnchor="middle"
                    fontFamily="'Cinzel', 'Cinzel Decorative', serif"
                    fontSize="22"
                    fontStyle="italic"
                    fontWeight="500"
                    fill="#2a2a2a"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.3"
                  >
                    L&amp;B
                  </text>
                </svg>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
