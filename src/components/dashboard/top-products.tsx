"use client";

import { Badge } from "@/components/ui/badge";
import { products } from "@/data/mock-data";
import { ShoppingBag, TrendingUp, TrendingDown } from "lucide-react";

export function TopProducts() {
  const sorted = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <div className="sp-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          Top Products
        </h3>
      </div>
      <div className="space-y-2.5">
        {sorted.map((product, i) => (
          <div
            key={product.id}
            className="sp-card-hover flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
            style={{ background: "var(--sp-accent-subtle)", border: "1px solid var(--sp-border)" }}
          >
            <span
              className="text-xs font-bold w-5 text-center font-[family-name:var(--font-heading)]"
              style={{ color: "var(--sp-text-muted)" }}
            >
              #{i + 1}
            </span>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
              style={{ background: "var(--sp-surface)" }}
            >
              {["\u{1F3A7}", "\u{1F455}", "\u{1F4A7}", "\u{1F45B}", "\u{1F9D8}"][i]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate" style={{ color: "var(--sp-text)" }}>
                {product.title}
              </p>
              <p className="text-[11px]" style={{ color: "var(--sp-text-muted)" }}>
                {product.sold.toLocaleString()} sold
              </p>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                ${product.revenue.toLocaleString()}
              </p>
              <div className="flex items-center gap-0.5 text-[11px] font-semibold justify-end"
                style={{ color: product.trend >= 0 ? "#8b5cf6" : "#f87171" }}
              >
                {product.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {product.trend >= 0 ? "+" : ""}{product.trend}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeakProducts() {
  const sorted = [...products]
    .filter((p) => p.status === "active")
    .sort((a, b) => a.trend - b.trend)
    .slice(0, 5);

  return (
    <div className="sp-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingDown className="w-4 h-4" style={{ color: "#f87171" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          Underperforming
        </h3>
      </div>
      <div className="space-y-2.5">
        {sorted.map((product) => (
          <div
            key={product.id}
            className="sp-card-hover flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
            style={{ background: "rgba(248, 113, 113, 0.04)", border: "1px solid rgba(248, 113, 113, 0.1)" }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate" style={{ color: "var(--sp-text)" }}>
                {product.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[11px]" style={{ color: "var(--sp-text-muted)" }}>
                  {product.sold} sold · Stock: {product.inventory}
                </p>
                {product.inventory === 0 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-400">
                    OUT OF STOCK
                  </span>
                )}
                {product.inventory > 0 && product.inventory < 20 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400">
                    LOW STOCK
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold" style={{ color: "#f87171" }}>
              <TrendingDown className="w-3.5 h-3.5" />
              {product.trend}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
