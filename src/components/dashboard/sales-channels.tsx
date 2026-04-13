"use client";

import { salesByChannel } from "@/data/mock-data";
import { BarChart3 } from "lucide-react";

const channelColors = ["#8b5cf6", "#60a5fa", "#a78bfa", "#fbbf24"];

export function SalesChannels() {
  return (
    <div className="sp-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          Sales by Channel
        </h3>
      </div>
      <div className="space-y-4">
        {salesByChannel.map((channel, i) => (
          <div key={channel.channel} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: channelColors[i] }} />
                <span className="text-[13px] font-medium" style={{ color: "var(--sp-text)" }}>{channel.channel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[13px] font-bold font-[family-name:var(--font-heading)]"
                  style={{ color: "var(--sp-text)" }}
                >
                  ${channel.revenue.toLocaleString()}
                </span>
                <span className="text-[11px] font-medium" style={{ color: "var(--sp-text-muted)" }}>
                  {channel.percentage}%
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--sp-accent-subtle)" }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${channel.percentage}%`, background: channelColors[i] }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s infinite",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
