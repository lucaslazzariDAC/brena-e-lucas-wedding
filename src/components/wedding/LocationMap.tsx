import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n";
import "leaflet/dist/leaflet.css";

// Free OpenStreetMap tiles via Leaflet — no API key, no billing account, no
// Google dependency. Renders both locations as custom pins (the plain OSM
// iframe embed only supports a single marker). The tile colors are toned
// down via CSS (see .wedding-map-tint in styles.css) to sit better on the
// dark theme.
function markerHtml(idx: number, isCeremony: boolean) {
  return `<div style="
    width:32px;height:32px;border-radius:9999px;
    background:${isCeremony ? "#e8e3d3" : "#b7b7b7"};
    border:2px solid #0d1b2a;
    display:flex;align-items:center;justify-content:center;
    font:700 13px 'Cinzel', serif;color:#0d1b2a;
    box-shadow:0 2px 10px rgba(0,0,0,0.55);
  ">${idx + 1}</div>`;
}

export function LocationMap() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: false });
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const bounds: [number, number][] = wedding.locations.map((loc, idx) => {
        const isCeremony = loc.id === "ceremony";
        const icon = L.divIcon({
          className: "",
          html: markerHtml(idx, isCeremony),
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16],
        });
        L.marker([loc.coords.lat, loc.coords.lng], { icon })
          .addTo(map)
          .bindPopup(`${loc.label} — ${loc.name}`);
        return [loc.coords.lat, loc.coords.lng];
      });

      map.fitBounds(bounds, { padding: [48, 48] });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative isolate overflow-hidden rounded-sm border border-silver/30 bg-navy/50">
        <div
          ref={containerRef}
          aria-label={t("loc.map_title")}
          className="wedding-map-tint h-[360px] w-full sm:h-[480px]"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {wedding.locations.map((loc, idx) => {
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            loc.address,
          )}`;
          return (
            <article
              key={loc.id}
              className="relative flex flex-col items-center rounded-sm border border-silver/30 bg-navy/40 p-6 text-center backdrop-blur-sm transition-all hover:border-silver/60"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-silver/50 bg-navy-deep px-3 py-0.5 font-display text-[10px] tracking-[0.3em] text-silver">
                {String(idx + 1).padStart(2, "0")} · {t(`loc.${loc.id}.label`).toUpperCase()}
              </span>
              <h3 className="mt-3 font-display text-lg tracking-[0.2em] text-paper sm:text-xl">
                {t(`loc.${loc.id}.name`)}
              </h3>
              <p className="mt-2 font-serif text-sm italic text-silver">{loc.address}</p>
              <p className="mt-2 font-serif text-xs uppercase tracking-[0.3em] text-silver/80">
                {t(`loc.${loc.id}.time`)}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-silver/60 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-paper transition-all hover:border-silver hover:bg-silver/10"
                >
                  {t("loc.directions")}
                </a>
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-silver/30 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-silver transition-all hover:border-silver/60 hover:text-paper"
                >
                  {t("loc.view_map")}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
