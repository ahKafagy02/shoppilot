"use client";

import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import createGlobe from "cobe";
import { customers, topCountries } from "@/data/mock-data";
import { Globe, MapPin } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

function latLngToAngles(lat: number, lng: number): [number, number] {
  return [lat * (Math.PI / 180), lng * (Math.PI / 180)];
}

export function CustomerGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0.3);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const markers = useMemo(
    () =>
      customers.map((c) => ({
        location: latLngToAngles(c.lat, c.lng) as [number, number],
        size: c.segment === "vip" ? 0.08 : 0.05,
      })),
    []
  );

  const segmentCounts = useMemo(() => {
    const counts = { vip: 0, returning: 0, new: 0, lost: 0 };
    customers.forEach((c) => counts[c.segment]++);
    return counts;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0.3,
      theta: 0.15,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.5 : 2.5,
      mapSamples: 20000,
      mapBrightness: isDark ? 3 : 8,
      baseColor: isDark ? [0.12, 0.14, 0.2] : [0.92, 0.93, 0.96],
      markerColor: [0.2, 0.82, 0.6],
      glowColor: isDark ? [0.08, 0.5, 0.35] : [0.3, 0.7, 0.5],
      markers,
    });

    globeRef.current = globe;

    // Auto-rotate via update loop
    let rafId: number;
    const animate = () => {
      phiRef.current += 0.003;
      globe.update({ phi: phiRef.current });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      globeRef.current = null;
    };
  }, [isDark, markers]);

  return (
    <div className="sp-surface sp-card-hover rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
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
              ? "radial-gradient(circle at 50% 50%, #0c1a14 0%, #060810 70%)"
              : "radial-gradient(circle at 50% 50%, #e8f5f0 0%, #f0f2f8 70%)",
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ contain: "layout paint size" }}
          />

          {/* Legend overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-4 sp-glass rounded-xl px-3 py-2">
            {[
              { color: "#34d399", label: "Customers", count: customers.length },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <span className="text-[10px] font-medium" style={{ color: "var(--sp-text-secondary)" }}>
                  {item.count} {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top countries sidebar */}
        <div className="hidden xl:flex flex-col flex-1 max-w-[260px]">
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5" style={{ color: "var(--sp-accent)" }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--sp-text-muted)" }}
            >
              Top Countries
            </span>
          </div>
          <div className="space-y-0.5 flex-1">
            {topCountries.slice(0, 8).map((country, i) => (
              <div
                key={country.countryCode}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl transition-all duration-200 cursor-default"
                style={{
                  background:
                    hoveredCountry === country.countryCode
                      ? "var(--sp-accent-subtle)"
                      : "transparent",
                }}
                onMouseEnter={() => setHoveredCountry(country.countryCode)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-[10px] font-bold w-4 text-center"
                    style={{ color: "var(--sp-text-muted)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[12px] font-medium" style={{ color: "var(--sp-text)" }}>
                    {country.country}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className="text-[12px] font-bold font-[family-name:var(--font-heading)]"
                    style={{ color: "var(--sp-text)" }}
                  >
                    ${(country.revenue / 1000).toFixed(1)}K
                  </span>
                  <p className="text-[10px]" style={{ color: "var(--sp-text-muted)" }}>
                    {country.orders} orders
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
