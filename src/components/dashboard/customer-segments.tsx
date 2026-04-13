"use client";

import { customerSegments, customers } from "@/data/mock-data";
import { Users, Crown, RotateCcw, UserPlus, UserX } from "lucide-react";

const segments = [
  { key: "vip" as const, label: "VIP", icon: Crown, color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  { key: "returning" as const, label: "Returning", icon: RotateCcw, color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  { key: "new" as const, label: "New", icon: UserPlus, color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  { key: "lost" as const, label: "Lost", icon: UserX, color: "#f87171", bg: "rgba(248,113,113,0.1)" },
];

export function CustomerSegments() {
  const totalCustomers = customers.length;

  return (
    <div className="sp-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          Customer Segments
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {segments.map((seg, i) => {
          const data = customerSegments[seg.key];
          const percentage = ((data.count / totalCustomers) * 100).toFixed(0);
          return (
            <div
              key={seg.key}
              className="sp-card-hover p-3 rounded-xl animate-scale-in"
              style={{
                background: seg.bg,
                border: "1px solid var(--sp-border)",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: seg.bg }}>
                  <seg.icon className="w-3.5 h-3.5" style={{ color: seg.color }} />
                </div>
                <span className="text-[11px] font-medium" style={{ color: "var(--sp-text-secondary)" }}>
                  {seg.label}
                </span>
              </div>
              <p
                className="text-lg font-bold font-[family-name:var(--font-heading)]"
                style={{ color: "var(--sp-text)" }}
              >
                {data.count}
              </p>
              <p className="text-[11px]" style={{ color: "var(--sp-text-muted)" }}>
                {percentage}% · Avg ${data.avgOrderValue.toFixed(0)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--sp-border)" }}>
        <p className="text-[11px] font-semibold mb-2" style={{ color: "var(--sp-text-muted)" }}>
          TOP VIP CUSTOMERS
        </p>
        <div className="space-y-2">
          {customers
            .filter((c) => c.segment === "vip")
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 3)
            .map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    {c.name[0]}
                  </div>
                  <span className="text-[13px]" style={{ color: "var(--sp-text)" }}>{c.name}</span>
                </div>
                <span className="text-[13px] font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text-secondary)" }}>
                  ${c.totalSpent.toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
