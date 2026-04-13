"use client";

import { useState } from "react";
import { customers, customerSegments } from "@/data/mock-data";
import { Crown, RotateCcw, UserPlus, UserX, Users, DollarSign, ShoppingCart, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

const segmentConfig = {
  vip: { label: "VIP", icon: Crown, color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  returning: { label: "Returning", icon: RotateCcw, color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  new: { label: "New", icon: UserPlus, color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  lost: { label: "Lost", icon: UserX, color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

export default function CustomersPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = customers
    .filter((c) => filter === "all" || c.segment === filter)
    .filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  const totalSpent = customers.reduce((s, c) => s + c.totalSpent, 0);
  const totalOrders = customers.reduce((s, c) => s + c.orders, 0);
  const countryCount = new Set(customers.map((c) => c.countryCode)).size;

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px]">
      <PageHeader
        title="Customers"
        description={`Manage and analyze your customer base across ${countryCount} countries.`}
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length, icon: Users, prefix: "" },
          { label: "Lifetime Revenue", value: Math.round(totalSpent / 1000), icon: DollarSign, prefix: "$", suffix: "K" },
          { label: "Total Orders", value: totalOrders, icon: ShoppingCart, prefix: "" },
          { label: "Countries", value: countryCount, icon: Crown, prefix: "" },
        ].map((stat, i) => (
          <BlurFade key={stat.label} delay={0.05 + i * 0.05}>
            <div className="sp-surface sp-card-hover rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--sp-accent-subtle)" }}>
                <stat.icon className="w-5 h-5" style={{ color: "var(--sp-accent)" }} />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>{stat.label}</p>
                <p className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                  {stat.prefix}<NumberTicker value={stat.value} delay={0.1 + i * 0.05} />{stat.suffix || ""}
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Segment cards */}
      <BlurFade delay={0.25}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(segmentConfig) as Array<keyof typeof segmentConfig>).map((key) => {
            const cfg = segmentConfig[key];
            const seg = customerSegments[key];
            const isActive = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(isActive ? "all" : key)}
                className="sp-surface rounded-2xl p-4 text-left transition-all duration-200 group"
                style={{
                  border: `1.5px solid ${isActive ? cfg.color + "66" : "var(--sp-border)"}`,
                  background: isActive ? cfg.bg : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: cfg.bg }}
                  >
                    <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>
                <p className="text-lg font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                  {seg.count} <span className="text-[12px] font-normal" style={{ color: "var(--sp-text-muted)" }}>customers</span>
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[11px]" style={{ color: "var(--sp-text-muted)" }}>
                    ${seg.totalRevenue.toLocaleString()} rev
                  </span>
                  <span className="text-[11px] font-semibold" style={{ color: "var(--sp-text-secondary)" }}>
                    ${seg.avgOrderValue.toFixed(0)} AOV
                  </span>
                </div>
                {/* Progress bar showing segment share */}
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--sp-border)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(seg.count / customers.length) * 100}%`, background: cfg.color }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </BlurFade>

      {/* Search bar */}
      <BlurFade delay={0.3}>
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-3"
          style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-border)" }}
        >
          <Search className="w-4 h-4" style={{ color: "var(--sp-text-muted)" }} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[13px] outline-none flex-1 placeholder:opacity-40"
            style={{ color: "var(--sp-text)" }}
          />
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg" style={{ color: "var(--sp-text-muted)", background: "var(--sp-bg-subtle)" }}>
            {filtered.length} results
          </span>
        </div>
      </BlurFade>

      {/* Customer table */}
      <BlurFade delay={0.35}>
        <div className="sp-surface rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--sp-border)" }}>
                  {["Customer", "Segment", "Location", "Total Spent", "Orders", "Last Order", "Since"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-4 text-[11px] font-semibold uppercase tracking-wider ${i >= 3 ? "text-right" : "text-left"}`}
                      style={{ color: "var(--sp-text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => {
                  const seg = segmentConfig[customer.segment];
                  return (
                    <tr
                      key={customer.id}
                      className="sp-card-hover transition-colors duration-200"
                      style={{ borderBottom: "1px solid var(--sp-border)" }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[11px] font-bold text-white shadow-sm shrink-0">
                            {customer.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold" style={{ color: "var(--sp-text)" }}>{customer.name}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: "var(--sp-text-muted)" }}>{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                          style={{ color: seg.color, background: seg.bg }}
                        >
                          <seg.icon className="w-3 h-3" />
                          {seg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[13px]" style={{ color: "var(--sp-text-secondary)" }}>
                        {customer.city}, {customer.country}
                      </td>
                      <td className="px-5 py-4 text-right text-[13px] font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                        ${customer.totalSpent.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-right text-[13px]" style={{ color: "var(--sp-text-secondary)" }}>{customer.orders}</td>
                      <td className="px-5 py-4 text-right text-[13px]" style={{ color: "var(--sp-text-secondary)" }}>
                        {new Date(customer.lastOrder).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </td>
                      <td className="px-5 py-4 text-right text-[11px]" style={{ color: "var(--sp-text-muted)" }}>
                        {new Date(customer.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
