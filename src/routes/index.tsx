import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { wedding } from "@/config/wedding";
import { EnvelopeIntro } from "@/components/wedding/EnvelopeIntro";
import { Countdown } from "@/components/wedding/Countdown";
import { LocationMap } from "@/components/wedding/LocationMap";
import { GiftPix } from "@/components/wedding/GiftPix";
import { RSVPForm } from "@/components/wedding/RSVPForm";
import { SilverParticles } from "@/components/wedding/SilverParticles";
import {
  CornerOrnament,
  Divider,
  ShellIcon,
  SwordIcon,
  WaveBackground,
  WaveIcon,
  WaveBand,
  CrownIcon,
  MoonIcon,
  StarfishIcon,
  SpearWithLeaves,
  OrixaCrest,
} from "@/components/wedding/ornaments";
import ogumPanel from "@/assets/ogum-panel.jpg";
import iemanjaPanel from "@/assets/iemanja-panel.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import { useLang } from "@/i18n";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas & Brena · 29.03.2027 — Guarda do Embaú" },
      {
        name: "description",
        content:
          "Com a proteção de Ogum e as bênçãos de Iemanjá, celebramos nossa união em 29 de março de 2027, na Guarda do Embaú, Santa Catarina.",
      },
      { property: "og:title", content: "Lucas & Brena · 29.03.2027" },
      {
        property: "og:description",
        content: "Convite de casamento — Guarda do Embaú, SC. Axé, amor e união.",
      },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Casamento de Lucas e Brena",
          startDate: wedding.date,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: wedding.venue,
            address: wedding.address,
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setShowRsvpModal(true), 900);
  };

  return (
    <>
      <Toaster theme="dark" position="top-center" />
      {!opened && <EnvelopeIntro onOpen={handleOpen} />}
      <main className="relative overflow-hidden bg-navy-texture text-paper">
        <PageOrnaments />
        <div className="relative">
          <Hero />
          <RSVPCta />
          <CountdownSection />

          <OrixaSection />
          <GallerySection />
          <LocationSection />
          <DressCodeSection />
          <LodgingSection />
          <GiftSection />
          <RSVPSection />
          <Footer />
        </div>
      </main>

      {/* RSVP reminder modal — custom to avoid Radix SSR/hydration quirks */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowRsvpModal(false)}
          />
          <div className="relative z-10 mx-4 w-full max-w-md rounded-sm border border-silver/50 bg-navy-deep/98 p-6 shadow-lg">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="font-display text-2xl tracking-[0.15em] text-paper sm:text-3xl">
                {t("modal.rsvp.title")}
              </h2>
              <p className="pt-4 font-serif text-lg leading-relaxed text-silver/90">
                {t("modal.rsvp.message_part1")}
                <span className="mx-1 font-bold text-paper">
                  {t("rsvp.deadline_label")}
                </span>
                {t("modal.rsvp.message_part2")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowRsvpModal(false)}
              className="mt-6 w-full rounded-sm border border-silver bg-silver/20 px-6 py-4 text-sm font-medium uppercase tracking-[0.3em] text-paper transition-all hover:bg-silver/30 hover:shadow-[0_0_30px_rgba(183,183,183,0.45)]"
            >
              {t("modal.rsvp.ok")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}


/* ───────────────────────── Sections ───────────────────────── */

function SectionHeading({
  eyebrowKey,
  titleKey,
  className,
}: {
  eyebrowKey?: string;
  titleKey: string;
  className?: string;
}) {
  const { t } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className={`text-center ${className ?? ""}`}
    >
      {eyebrowKey && (
        <p className="text-[10px] uppercase tracking-[0.4em] text-silver/80">{t(eyebrowKey)}</p>
      )}
      <h2 className="mt-3 font-display text-3xl tracking-[0.15em] text-paper sm:text-5xl">
        {t(titleKey)}
      </h2>
      <Divider className="mt-5" />
    </motion.div>
  );
}

function ScatteredOrnaments() {
  // Silver-foil styled icons spread across the hero background
  const items = [
    { Cmp: SpearWithLeaves, cls: "top-10 left-2 h-44 w-auto sm:h-72 md:h-[60vh]" },
    { Cmp: SpearWithLeaves, cls: "top-10 right-2 h-44 w-auto -scale-x-100 sm:h-72 md:h-[60vh]" },
    { Cmp: ShellIcon, cls: "top-[8%] left-[18%] h-8 w-8 sm:h-12 sm:w-12" },
    { Cmp: StarfishIcon, cls: "top-[14%] right-[18%] h-9 w-9 sm:h-12 sm:w-12 rotate-12" },
    { Cmp: MoonIcon, cls: "top-[6%] right-[40%] h-6 w-6 sm:h-9 sm:w-9" },
    { Cmp: CrownIcon, cls: "top-[28%] left-[6%] h-10 w-auto sm:h-14" },
    { Cmp: ShellIcon, cls: "top-[34%] right-[5%] h-9 w-9 sm:h-14 sm:w-14 -rotate-12" },
    { Cmp: StarfishIcon, cls: "top-[50%] left-[4%] h-8 w-8 sm:h-12 sm:w-12 -rotate-12" },
    { Cmp: WaveIcon, cls: "top-[44%] right-[3%] h-6 w-20 sm:h-9 sm:w-28" },
    { Cmp: SwordIcon, cls: "bottom-[18%] left-[10%] h-16 w-auto sm:h-24 -rotate-12" },
    { Cmp: SwordIcon, cls: "bottom-[18%] right-[10%] h-16 w-auto sm:h-24 rotate-12 -scale-x-100" },
    { Cmp: ShellIcon, cls: "bottom-[8%] left-[28%] h-8 w-8 sm:h-12 sm:w-12" },
    { Cmp: StarfishIcon, cls: "bottom-[10%] right-[28%] h-8 w-8 sm:h-12 sm:w-12 rotate-45" },
    { Cmp: MoonIcon, cls: "bottom-[30%] right-[40%] h-5 w-5 sm:h-8 sm:w-8 -scale-x-100" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-silver/55">
      {items.map(({ Cmp, cls }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.05 * i }}
          className={`absolute ${cls}`}
          style={{ filter: "drop-shadow(0 0 6px rgba(180,200,220,0.15))" }}
        >
          <Cmp className="h-full w-full" />
        </motion.div>
      ))}
    </div>
  );
}

/* Atmospheric scattered ornaments tiled across the full page background */
function PageOrnaments() {
  const icons = [ShellIcon, StarfishIcon, MoonIcon, CrownIcon, SwordIcon, WaveIcon];
  // Pseudo-random but deterministic positions
  const seeds = Array.from({ length: 70 }, (_, i) => {
    const r = (n: number) => (Math.sin((i + 1) * n) + 1) / 2;
    return {
      Cmp: icons[i % icons.length],
      top: `${(r(12.9) * 100).toFixed(2)}%`,
      left: `${(r(78.2) * 100).toFixed(2)}%`,
      size: 22 + Math.floor(r(43.1) * 36),
      rot: Math.floor(r(31.7) * 360),
      op: 0.15 + r(57.3) * 0.35,
    };
  });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden text-silver"
    >
      {seeds.map((s, i) => {
        const { Cmp } = s;
        return (
          <Cmp
            key={i}
            className="absolute"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: s.op,
              transform: `rotate(${s.rot}deg)`,
              filter: "drop-shadow(0 0 4px rgba(180,200,220,0.15))",
            }}
          />
        );
      })}
    </div>
  );
}


function Hero() {
  const { t } = useLang();
  return (
    <section className="relative min-h-screen overflow-hidden px-3 py-14 sm:px-6 sm:py-24">
      <SilverParticles />
      <ScatteredOrnaments />
      <WaveBackground className="bottom-0" opacity={0.45} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-2xl"
      >
        {/* Outer silver double-border frame */}
        <div className="relative rounded-sm border border-silver/40 p-1 shadow-[var(--shadow-elegant)] sm:p-1.5">
          <div className="relative rounded-sm border border-silver/30 bg-paper-texture px-5 py-10 text-navy-deep sm:px-12 sm:py-16">
            {/* Art-deco corners */}
            <CornerOrnament className="absolute left-2 top-2 h-10 w-10 text-navy-deep/80 sm:left-3 sm:top-3 sm:h-14 sm:w-14" />
            <CornerOrnament className="absolute right-2 top-2 h-10 w-10 -scale-x-100 text-navy-deep/80 sm:right-3 sm:top-3 sm:h-14 sm:w-14" />
            <CornerOrnament className="absolute bottom-2 left-2 h-10 w-10 -scale-y-100 text-navy-deep/80 sm:bottom-3 sm:left-3 sm:h-14 sm:w-14" />
            <CornerOrnament className="absolute bottom-2 right-2 h-10 w-10 -scale-100 text-navy-deep/80 sm:bottom-3 sm:right-3 sm:h-14 sm:w-14" />

            <div className="relative flex flex-col items-center text-center">
              <OrixaCrest className="h-20 w-auto text-navy-deep/90 sm:h-28" />

              <p className="mt-6 font-serif text-xs font-medium uppercase tracking-[0.3em] text-navy-deep sm:text-sm sm:tracking-[0.35em]">
                {t("hero.blessing_line1")}
                <br />
                {t("hero.blessing_line2")}
              </p>
              <p className="mt-3 max-w-md font-serif text-[11px] uppercase tracking-[0.3em] text-navy-deep/80 sm:text-xs">
                {t("hero.invite")}
              </p>

              <h1 className="mt-7 font-display text-[44px] font-bold leading-none tracking-[0.04em] text-navy-deep sm:text-7xl">
                {wedding.groom}
              </h1>
              <span className="my-1 font-serif text-3xl italic text-navy-deep/70 sm:my-2 sm:text-4xl">
                &amp;
              </span>
              <h1 className="font-display text-[44px] font-bold leading-none tracking-[0.04em] text-navy-deep sm:text-7xl">
                {wedding.bride}
              </h1>

              <div className="mt-6 flex items-center justify-center gap-3 text-navy-deep/70">
                <span className="h-px w-10 bg-current sm:w-14" />
                <ShellIcon className="h-4 w-4" />
                <span className="h-px w-10 bg-current sm:w-14" />
              </div>

              <p className="mt-5 font-display text-lg font-semibold tracking-[0.25em] text-navy-deep sm:text-2xl">
                {t("hero.date")}
              </p>
              <p className="mt-1 font-serif text-sm italic tracking-[0.3em] text-navy-deep/85 sm:text-base">
                · {t("hero.time")} ·
              </p>

              <div className="mt-5 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-navy-deep/75">
                  <MoonIcon className="h-3.5 w-3.5" />
                  <StarfishIcon className="h-3.5 w-3.5" />
                  <MoonIcon className="h-3.5 w-3.5 -scale-x-100" />
                </div>
                <p className="mt-2 font-display text-base font-semibold tracking-[0.25em] text-navy-deep sm:text-xl">
                  {wedding.venue.toUpperCase()}
                </p>
                <p className="font-serif text-xs tracking-[0.3em] text-navy-deep/85 sm:text-sm">
                  {t("hero.state")}
                </p>
              </div>

              <WaveBand className="mt-7 h-7 w-40 text-navy-deep/65 sm:h-8 sm:w-56" />

              <p className="mt-3 font-serif text-sm italic tracking-[0.3em] text-navy-deep sm:text-base sm:tracking-[0.4em]">
                {t("hero.tagline")}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function RSVPCta() {
  const { t, lang } = useLang();
  const label = lang === "pt" ? "Confirmar Presença" : "Confirm Attendance";
  const hint = lang === "pt" ? "Sua confirmação é muito importante" : "Your RSVP means a lot to us";
  const handleClick = () => {
    const el = document.getElementById("rsvp");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section className="relative px-4 pt-6 pb-10 sm:pt-10 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center"
      >
        <p className="font-serif text-sm font-semibold uppercase tracking-[0.3em] text-paper sm:text-base">
          {hint}
        </p>
        <button
          type="button"
          onClick={handleClick}
          className="group relative inline-flex items-center gap-3 rounded-sm border-2 border-paper bg-paper px-10 py-4 font-display text-xs font-bold uppercase tracking-[0.35em] text-navy-deep shadow-[0_0_30px_rgba(248,244,240,0.35),0_10px_40px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(248,244,240,0.5),0_12px_50px_-10px_rgba(0,0,0,0.5)] hover:bg-silver sm:px-14 sm:py-5 sm:text-sm"
          aria-label={label}
        >
          <span>{label}</span>
          <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
        </button>
      </motion.div>
      {/* swallow unused t() to avoid lint */}
      <span className="sr-only">{t("section.rsvp.title")}</span>
    </section>
  );
}

function CountdownSection() {

  return (
    <section className="relative px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrowKey="section.countdown.eyebrow" titleKey="section.countdown.title" />
        <div className="mt-10">
          <Countdown />
        </div>
      </div>
    </section>
  );
}

function OrixaSection() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy to-navy-deep" />
      <SilverParticles />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrowKey="section.orixa.eyebrow" titleKey="section.orixa.title" />
        <p className="mx-auto mt-6 max-w-xl text-center font-serif text-lg italic leading-relaxed text-silver">
          {t("section.orixa.values")}
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative overflow-hidden rounded-sm border border-silver/30 shadow-[var(--shadow-elegant)]"
          >
            <img src={ogumPanel} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 via-navy-deep/55 to-navy-deep/85" />
            <div className="relative flex min-h-[520px] flex-col items-center justify-end px-8 pb-12 pt-10 text-center">
              <h3 className="font-display text-2xl tracking-[0.4em] text-paper">OGUM</h3>
              <Divider className="mt-4" />
              <p className="mt-6 whitespace-pre-line font-serif text-lg leading-relaxed tracking-wide text-paper sm:text-xl">
                {t("section.orixa.ogum_text")}
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="group relative overflow-hidden rounded-sm border border-silver/40 shadow-[var(--shadow-elegant)]"
          >
            <img src={iemanjaPanel} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/10 to-paper-warm/90" />
            <div className="relative flex min-h-[520px] flex-col items-center justify-end px-8 pb-12 pt-10 text-center text-navy-deep">
              <h3 className="font-display text-2xl tracking-[0.4em] text-navy-deep">IEMANJÁ</h3>
              <Divider className="mt-4 !text-navy-deep/60" />
              <p className="mt-6 whitespace-pre-line font-serif text-lg italic leading-relaxed tracking-wide text-navy-deep sm:text-xl">
                {t("section.orixa.iemanja_text")}
              </p>
            </div>
          </motion.article>
        </div>

        <p className="mx-auto mt-14 max-w-xl text-center font-serif text-base italic leading-relaxed text-silver/80">
          {t("section.orixa.footer")}
        </p>
      </div>
    </section>
  );
}

function GallerySection() {
  const photos = [gallery2, gallery7, gallery8, gallery3, gallery4, gallery6, gallery9];
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrowKey="section.gallery.eyebrow" titleKey="section.gallery.title" />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {photos.map((src, i) => {
            const tall = i === 0 || i === 3;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-sm border border-silver/30 bg-navy-deep ${
                  tall ? "row-span-2 aspect-[3/4] sm:aspect-[3/5]" : "aspect-square"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrowKey="section.location.eyebrow" titleKey="section.location.title" />
        <div className="mt-12">
          <LocationMap />
        </div>
      </div>
    </section>
  );
}

function DressCodeSection() {
  const { t } = useLang();
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrowKey="section.dresscode.eyebrow" titleKey="section.dresscode.title" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex flex-col items-center rounded-sm border border-silver/25 bg-navy/40 p-10 text-center backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 text-ocean-light">
            <ShellIcon className="h-8 w-8" />
            <WaveIcon className="h-6 w-16" />
            <ShellIcon className="h-8 w-8 -scale-x-100" />
          </div>
          <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-silver">
            {t("section.dresscode.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function LodgingSection() {
  const { t } = useLang();
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrowKey="section.lodging.eyebrow" titleKey="section.lodging.title" />
        <p className="mt-6 text-center font-serif text-base italic text-silver">
          {t("section.lodging.subtitle")}
        </p>
        <div className="mt-12 grid gap-6">
          {wedding.hotels.map((h, i) => (
            <motion.a
              key={h.name}
              href={h.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col items-center rounded-sm border border-silver/25 bg-navy/40 p-10 text-center backdrop-blur-sm transition-all hover:border-silver/60 hover:shadow-[0_0_24px_rgba(79,163,195,0.18)]"
            >
              <ShellIcon className="h-10 w-10 text-ocean-light" />
              <h3 className="mt-4 font-display text-xl tracking-[0.3em] text-paper">
                {t("hotel.airbnb.name")}
              </h3>
              <p className="mt-3 max-w-md font-serif text-lg italic leading-relaxed text-silver">
                {t("hotel.airbnb.description")}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-sm border border-silver/50 px-5 py-2 text-[10px] uppercase tracking-[0.35em] text-paper transition-colors group-hover:border-silver group-hover:bg-silver/10">
                {t("hotel.airbnb.cta")} →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftSection() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrowKey="section.gift.eyebrow" titleKey="section.gift.title" />
        <div className="mt-14">
          <GiftPix />
        </div>
      </div>
    </section>
  );
}

function RSVPSection() {
  return (
    <section id="rsvp" className="relative overflow-hidden px-4 py-24 sm:py-32 scroll-mt-20">

      <WaveBackground className="top-0 -scale-y-100" opacity={0.3} />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading eyebrowKey="section.rsvp.eyebrow" titleKey="section.rsvp.title" />
        <div className="mt-14">
          <RSVPForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-silver/20 bg-navy-deep px-4 py-16 text-center">
      <WaveBackground className="top-0" opacity={0.25} />
      <div className="relative mx-auto max-w-2xl">
        <div className="flex items-center justify-center gap-4 text-silver/70">
          <ShellIcon className="h-8 w-8" />
          <SwordIcon className="h-12 w-6" />
          <ShellIcon className="h-8 w-8" />
        </div>
        <p className="mt-6 font-serif text-lg italic leading-relaxed text-silver sm:text-xl">
          {t("footer.quote")}
        </p>
        <Divider className="mt-8" />
        <p className="mt-6 font-display text-sm tracking-[0.4em] text-silver/80">
          LUCAS &amp; BRENA · 29.03.2027
        </p>
      </div>
    </footer>
  );
}
