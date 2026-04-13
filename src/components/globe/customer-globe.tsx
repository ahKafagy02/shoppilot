"use client";

import { useMemo, useState } from "react";
import { Globe } from "@/components/ui/globe";
import { customers, topCountries } from "@/data/mock-data";
import { Globe as GlobeIcon, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import type { COBEOptions } from "cobe";

function latLngToAngles(lat: number, lng: number): [number, number] {
  return [lat * (Math.PI / 180), lng * (Math.PI / 180)];
}

export function CustomerGlobe() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const markers = useMemo(
    () =>
      customers.map((c) => ({
        location: [c.lat, c.lng] as [number, number],
        size: c.segment === "vip" ? 0.08 : 0.04,
      })),
    []
  );

  const globeConfig: COBEOptions = useMemo(
    () => ({
      width: 800,
      height: 800,
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.2 : 2.5,
      mapSamples: 20000,
      mapBrightness: isDark ? 2.5 : 8,
      baseColor: isDark ? [0.15, 0.1, 0.35] : [0.94, 0.92, 1],
      markerColor: [0.55, 0.36, 0.96],
      glowColor: isDark ? [0.25, 0.15, 0.55] : [0.7, 0.6, 0.95],
      markers,
    }),
    [isDark, markers]
  );

  return (
    <div className="sp-surface sp-card-hover rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <GlobeIcon className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3 className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
          Customer World Map
        </h3>
        <span className="ml-auto text-[11px] font-medium" style={{ color: "var(--sp-text-muted)" }}>
          {customers.length} customers · {new Set(customers.map((c) => c.countryCode)).size} countries
        </span>
      </div>

      <div className="flex gap-5">
        {/* Globe */}
        <div
          className="relative aspect-square flex-1 max-w-[400px] mx-auto rounded-2xl overflow-hidden"
          style={{
            background: isDark
              ? "radial-gradient(circle at 50% 50%, #1a1040 0%, #06060e 70%)"
              : "radial-gradient(circle at 50% 50%, #ede8ff 0%, #fafafe 70%)",
          }}
        >
          <Globe config={globeConfig} />
        </div>

        {/* Top countries sidebar */}
        <div className="hidden xl:flex flex-col flex-1 max-w-[260px]">
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5" style={{ color: "var(--sp-accent)" }} />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>
              Top Countries
            </span>
          </div>
          <div className="space-y-0.5 flex-1">
            {topCountries.slice(0, 8).map((country, i) => (
              <div
                key={country.countryCode}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl transition-all duration-200 cursor-default"
                style={{
                  background: hoveredCountry === country.countryCode ? "var(--sp-accent-subtle)" : "transparent",
                }}
                onMouseEnter={() => setHoveredCountry(country.countryCode)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold w-4 text-center" style={{ color: "var(--sp-text-muted)" }}>{i + 1}</span>
                  <span className="text-[12px] font-medium" style={{ color: "var(--sp-text)" }}>{country.country}</span>
                </div>
                <div className="text-right">
                  <span className="text-[12px] font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                    ${(country.revenue / 1000).toFixed(1)}K
                  </span>
                  <p className="text-[10px]" style={{ color: "var(--sp-text-muted)" }}>{country.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
