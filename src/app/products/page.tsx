"use client";

import { useState } from "react";
import { products } from "@/data/mock-data";
import { ShoppingBag, TrendingUp, TrendingDown, Package, DollarSign, Search, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

const statusStyles: Record<string, { color: string; bg: string }> = {
  active: { color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  draft: { color: "#9398a8", bg: "rgba(147,152,168,0.1)" },
  archived: { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("revenue");

  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0);
  const lowStock = products.filter((p) => p.inventory < 20).length;
  const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;

  const filtered = products
    .filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "revenue") return b.revenue - a.revenue;
      if (sortBy === "sold") return b.sold - a.sold;
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "trend") return b.trend - a.trend;
      return 0;
    });

  const stats = [
    { label: "Total Products", value: products.length, icon: ShoppingBag, prefix: "" },
    { label: "Total Revenue", value: Math.round(totalRevenue / 1000), icon: DollarSign, prefix: "$", suffix: "K" },
    { label: "Units Sold", value: totalSold, icon: Package, prefix: "" },
    { label: "Low Stock Items", value: lowStock, icon: TrendingDown, prefix: "" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px]">
      <PageHeader title="Products" description="Full product catalog with performance metrics and inventory management." />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <BlurFade key={stat.label} delay={0.05 + i * 0.05}>
            <div className="sp-surface sp-card-hover rounded-2xl p-5 flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "var(--sp-accent-subtle)" }}
              >
                <stat.icon className="w-5 h-5" style={{ color: "var(--sp-accent)" }} />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>
                  {stat.label}
                </p>
                <p className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                  {stat.prefix}
                  <NumberTicker value={stat.value} delay={0.1 + i * 0.05} />
                  {stat.suffix || ""}
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Search & Filters toolbar */}
      <BlurFade delay={0.3}>
        <div className="sp-surface rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div
            className="flex items-center gap-2 flex-1 rounded-xl px-3.5 py-2.5"
            style={{ background: "var(--sp-bg-subtle)", border: "1px solid var(--sp-border)" }}
          >
            <Search className="w-4 h-4" style={{ color: "var(--sp-text-muted)" }} />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:opacity-40"
              style={{ color: "var(--sp-text)" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: "var(--sp-text-muted)" }} />
            {["all", "active", "draft", "archived"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all duration-200"
                style={{
                  color: statusFilter === s ? "var(--sp-bg)" : "var(--sp-text-secondary)",
                  background: statusFilter === s ? "var(--sp-accent)" : "transparent",
                  border: `1px solid ${statusFilter === s ? "var(--sp-accent)" : "var(--sp-border)"}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-transparent outline-none cursor-pointer"
            style={{ color: "var(--sp-text-secondary)", border: "1px solid var(--sp-border)" }}
          >
            <option value="revenue">Sort: Revenue</option>
            <option value="sold">Sort: Units Sold</option>
            <option value="price">Sort: Price</option>
            <option value="trend">Sort: Trend</option>
          </select>
        </div>
      </BlurFade>

      {/* Products table */}
      <BlurFade delay={0.35}>
        <div className="sp-surface rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5" style={{ borderBottom: "1px solid var(--sp-border)" }}>
            <p className="text-[12px] font-semibold" style={{ color: "var(--sp-text-secondary)" }}>
              Showing {filtered.length} of {products.length} products
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--sp-border)" }}>
                  {["Product", "Status", "Price", "Inventory", "Sold", "Revenue", "Trend"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-4 text-[11px] font-semibold uppercase tracking-wider ${i >= 2 ? "text-right" : "text-left"}`}
                      style={{ color: "var(--sp-text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  const st = statusStyles[product.status];
                  return (
                    <tr
                      key={product.id}
                      className="sp-card-hover transition-colors duration-200"
                      style={{ borderBottom: "1px solid var(--sp-border)" }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{ background: "var(--sp-accent-subtle)", color: "var(--sp-accent)" }}
                          >
                            {product.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold" style={{ color: "var(--sp-text)" }}>
                              {product.title}
                            </p>
                            <p className="text-[11px] mt-0.5" style={{ color: "var(--sp-text-muted)" }}>
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide"
                          style={{ color: st.color, background: st.bg }}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-[13px] font-semibold" style={{ color: "var(--sp-text)" }}>
                          ${product.price}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[11px] line-through ml-1.5" style={{ color: "var(--sp-text-muted)" }}>
                            ${product.compareAtPrice}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span
                          className="text-[13px] font-medium"
                          style={{
                            color: product.inventory === 0 ? "#f87171" : product.inventory < 20 ? "#fbbf24" : "var(--sp-text-secondary)",
                          }}
                        >
                          {product.inventory}
                        </span>
                        {product.inventory < 20 && product.inventory > 0 && (
                          <span className="text-[9px] ml-1.5 font-bold px-1.5 py-0.5 rounded" style={{ color: "#fbbf24", background: "rgba(251,191,36,0.1)" }}>
                            LOW
                          </span>
                        )}
                        {product.inventory === 0 && (
                          <span className="text-[9px] ml-1.5 font-bold px-1.5 py-0.5 rounded" style={{ color: "#f87171", background: "rgba(248,113,113,0.1)" }}>
                            OUT
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right text-[13px]" style={{ color: "var(--sp-text-secondary)" }}>
                        {product.sold.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-right text-[13px] font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                        ${product.revenue.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span
                          className="inline-flex items-center gap-1 text-[12px] font-semibold px-2 py-0.5 rounded-lg"
                          style={{
                            color: product.trend >= 0 ? "#34d399" : "#f87171",
                            background: product.trend >= 0 ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                          }}
                        >
                          {product.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {product.trend >= 0 ? "+" : ""}{product.trend}%
                        </span>
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
