"use client";

import { customers, customerSegments } from "@/data/mock-data";
import { Crown, RotateCcw, UserPlus, UserX } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";
import { useState } from "react";

const segmentConfig = {
  vip: { label: "VIP", icon: Crown, color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  returning: { label: "Returning", icon: RotateCcw, color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  new: { label: "New", icon: UserPlus, color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  lost: { label: "Lost", icon: UserX, color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

export default function CustomersPage() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? customers : customers.filter((c) => c.segment === filter);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PageHeader
        title="Customers"
        description={`${customers.length} customers across ${new Set(customers.map((c) => c.countryCode)).size} countries.`}
      />

      {/* Segment filter pills */}
      <div className="flex items-center gap-2 animate-fade-in-up stagger-1">
        <button
          onClick={() => setFilter("all")}
          className="px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
          style={{
            color: filter === "all" ? "var(--sp-bg)" : "var(--sp-text-secondary)",
            background: filter === "all" ? "var(--sp-accent)" : "var(--sp-surface)",
            border: `1px solid ${filter === "all" ? "var(--sp-accent)" : "var(--sp-border)"}`,
          }}
        >
          All ({customers.length})
        </button>
        {(Object.keys(segmentConfig) as Array<keyof typeof segmentConfig>).map((key) => {
          const cfg = segmentConfig[key];
          const count = customerSegments[key].count;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
              style={{
                color: filter === key ? cfg.color : "var(--sp-text-secondary)",
                background: filter === key ? cfg.bg : "var(--sp-surface)",
                border: `1px solid ${filter === key ? cfg.color + "33" : "var(--sp-border)"}`,
              }}
            >
              <cfg.icon className="w-3 h-3" />
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="sp-surface rounded-2xl overflow-hidden animate-fade-in-up stagger-2">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--sp-border)" }}>
              {["Customer", "Segment", "Location", "Total Spent", "Orders", "Last Order", "Since"].map((h, i) => (
                <th
                  key={h}
                  className={`p-4 text-[11px] font-semibold uppercase tracking-wider ${i >= 3 ? "text-right" : "text-left"}`}
                  style={{ color: "var(--sp-text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer, i) => {
              const seg = segmentConfig[customer.segment];
              return (
                <tr
                  key={customer.id}
                  className="sp-card-hover transition-colors duration-200 animate-fade-in-up"
                  style={{
                    borderBottom: "1px solid var(--sp-border)",
                    animationDelay: `${i * 0.03}s`,
                  }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                        {customer.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium" style={{ color: "var(--sp-text)" }}>{customer.name}</p>
                        <p className="text-[11px]" style={{ color: "var(--sp-text-muted)" }}>{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ color: seg.color, background: seg.bg }}>
                      {seg.label}
                    </span>
                  </td>
                  <td className="p-4 text-[13px]" style={{ color: "var(--sp-text-secondary)" }}>
                    {customer.city}, {customer.country}
                  </td>
                  <td className="p-4 text-right text-[13px] font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-[13px]" style={{ color: "var(--sp-text-secondary)" }}>{customer.orders}</td>
                  <td className="p-4 text-right text-[13px]" style={{ color: "var(--sp-text-secondary)" }}>
                    {new Date(customer.lastOrder).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="p-4 text-right text-[11px]" style={{ color: "var(--sp-text-muted)" }}>
                    {new Date(customer.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
