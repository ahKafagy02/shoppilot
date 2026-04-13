"use client";

import { recentOrders } from "@/data/mock-data";
import { ShoppingCart } from "lucide-react";

const statusStyles: Record<string, { color: string; bg: string; label: string }> = {
  fulfilled: { color: "#8b5cf6", bg: "rgba(52,211,153,0.1)", label: "Fulfilled" },
  pending: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)", label: "Pending" },
  refunded: { color: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Refunded" },
  partially_fulfilled: { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", label: "Partial" },
};

export function RecentOrders() {
  return (
    <div className="sp-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          Recent Orders
        </h3>
      </div>
      <div className="space-y-2">
        {recentOrders.map((order, i) => {
          const st = statusStyles[order.status];
          return (
            <div
              key={order.id}
              className="sp-card-hover flex items-center gap-3 p-3 rounded-xl animate-fade-in-up"
              style={{
                background: "var(--sp-accent-subtle)",
                border: "1px solid var(--sp-border)",
                animationDelay: `${i * 0.04}s`,
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[13px] font-semibold font-[family-name:var(--font-heading)]"
                    style={{ color: "var(--sp-text)" }}
                  >
                    {order.orderNumber}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{ color: st.color, background: st.bg }}
                  >
                    {st.label}
                  </span>
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--sp-text-muted)" }}>
                  {order.customer} · {order.city}, {order.country}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-[13px] font-bold font-[family-name:var(--font-heading)]"
                  style={{ color: "var(--sp-text)" }}
                >
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-[10px]" style={{ color: "var(--sp-text-muted)" }}>
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
