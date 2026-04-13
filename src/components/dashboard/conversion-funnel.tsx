"use client";

import { conversionFunnel } from "@/data/mock-data";
import { Filter } from "lucide-react";

export function ConversionFunnel() {
  return (
    <div className="sp-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          Conversion Funnel
        </h3>
      </div>
      <div className="space-y-3">
        {conversionFunnel.map((step, i) => {
          const prevRate = i > 0 ? conversionFunnel[i - 1].rate : 100;
          const dropOff = prevRate - step.rate;

          return (
            <div key={step.stage} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] font-medium" style={{ color: "var(--sp-text)" }}>{step.stage}</span>
                <div className="flex items-center gap-3">
                  <span
                    className="text-[13px] font-bold font-[family-name:var(--font-heading)]"
                    style={{ color: "var(--sp-text)" }}
                  >
                    {step.count.toLocaleString()}
                  </span>
                  {i > 0 && (
                    <span className="text-[10px] font-semibold" style={{ color: "#f87171" }}>
                      -{dropOff.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <div
                className="h-8 rounded-xl overflow-hidden relative"
                style={{ background: "var(--sp-accent-subtle)" }}
              >
                <div
                  className="h-full rounded-xl transition-all duration-700 ease-out relative overflow-hidden"
                  style={{
                    width: `${step.rate}%`,
                    background: `linear-gradient(90deg, var(--sp-accent), ${i === 0 ? "var(--sp-accent)" : "rgba(139,92,246,0.5)"})`,
                  }}
                >
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 3s infinite",
                    }}
                  />
                </div>
                <span
                  className="absolute inset-0 flex items-center justify-center text-[11px] font-bold"
                  style={{ color: "var(--sp-text)" }}
                >
                  {step.rate}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
