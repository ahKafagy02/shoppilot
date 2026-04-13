"use client";

import { products } from "@/data/mock-data";
import { ShoppingBag, TrendingUp, TrendingDown, Package, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

const statusStyles: Record<string, { color: string; bg: string }> = {
  active: { color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  draft: { color: "#9398a8", bg: "rgba(147,152,168,0.1)" },
  archived: { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

export default function ProductsPage() {
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0);
  const lowStock = products.filter((p) => p.inventory < 20).length;

  const stats = [
    { label: "Total Products", value: String(products.length), icon: ShoppingBag },
    { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign },
    { label: "Units Sold", value: totalSold.toLocaleString(), icon: Package },
    { label: "Low Stock", value: String(lowStock), icon: TrendingDown },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PageHeader title="Products" description="Full product catalog with performance metrics." />

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="sp-surface sp-card-hover rounded-2xl p-4 flex items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--sp-accent-subtle)" }}>
              <stat.icon className="w-5 h-5" style={{ color: "var(--sp-accent)" }} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>{stat.label}</p>
              <p className="text-lg font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sp-surface rounded-2xl overflow-hidden animate-fade-in-up stagger-3">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--sp-border)" }}>
              {["Product", "Status", "Price", "Inventory", "Sold", "Revenue", "Trend"].map((h, i) => (
                <th
                  key={h}
                  className={`p-4 text-[11px] font-semibold uppercase tracking-wider ${i >= 2 ? "text-right" : "text-left"}`}
                  style={{ color: "var(--sp-text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const st = statusStyles[product.status];
              return (
                <tr
                  key={product.id}
                  className="sp-card-hover transition-colors duration-200"
                  style={{ borderBottom: "1px solid var(--sp-border)" }}
                >
                  <td className="p-4">
                    <p className="text-[13px] font-medium" style={{ color: "var(--sp-text)" }}>{product.title}</p>
                    <p className="text-[11px]" style={{ color: "var(--sp-text-muted)" }}>{product.category}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ color: st.color, background: st.bg }}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-[13px] font-medium" style={{ color: "var(--sp-text)" }}>
                    ${product.price}
                    {product.compareAtPrice && (
                      <span className="text-[11px] line-through ml-1" style={{ color: "var(--sp-text-muted)" }}>${product.compareAtPrice}</span>
                    )}
                  </td>
                  <td className="p-4 text-right text-[13px]" style={{ color: product.inventory === 0 ? "#f87171" : product.inventory < 20 ? "#fbbf24" : "var(--sp-text-secondary)" }}>
                    {product.inventory}
                  </td>
                  <td className="p-4 text-right text-[13px]" style={{ color: "var(--sp-text-secondary)" }}>{product.sold.toLocaleString()}</td>
                  <td className="p-4 text-right text-[13px] font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td className="p-4 text-right">
                    <span className="flex items-center gap-0.5 justify-end text-[12px] font-semibold" style={{ color: product.trend >= 0 ? "#34d399" : "#f87171" }}>
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
  );
}
