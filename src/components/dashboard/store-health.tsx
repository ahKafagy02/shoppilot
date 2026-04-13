"use client";

import { storeHealth } from "@/data/mock-data";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Eye,
  RotateCcw,
} from "lucide-react";

function StatCard({
  label,
  value,
  prev,
  prefix = "",
  suffix = "",
  icon: Icon,
  decimals = 0,
}: {
  label: string;
  value: number;
  prev: number;
  prefix?: string;
  suffix?: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  decimals?: number;
}) {
  const change = ((value - prev) / prev) * 100;
  const isPositive = change >= 0;

  return (
    <div className="sp-surface sp-card-hover rounded-2xl p-4 group">
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ background: "var(--sp-accent-subtle)" }}
        >
          <Icon className="w-5 h-5" style={{ color: "var(--sp-accent)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>
            {label}
          </p>
          <p className="text-xl font-bold mt-0.5 font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
            {prefix}
            <NumberTicker value={value} decimalPlaces={decimals} className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }} />
            {suffix}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md"
              style={{
                color: isPositive ? "#8b5cf6" : "#f87171",
                background: isPositive ? "rgba(139, 92, 246, 0.1)" : "rgba(248, 113, 113, 0.1)",
              }}
            >
              {isPositive ? "+" : ""}{change.toFixed(1)}%
            </span>
            <span className="text-[10px]" style={{ color: "var(--sp-text-muted)" }}>vs last period</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoreHealth() {
  return (
    <div className="sp-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3 className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
          Store Health
        </h3>
        <div className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Live
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard label="Revenue" value={storeHealth.revenue} prev={storeHealth.revenuePrev} prefix="$" icon={DollarSign} decimals={2} />
        <StatCard label="Orders" value={storeHealth.orders} prev={storeHealth.ordersPrev} icon={ShoppingCart} />
        <StatCard label="Avg. Order Value" value={storeHealth.avgOrderValue} prev={storeHealth.avgOrderValuePrev} prefix="$" icon={DollarSign} decimals={2} />
        <StatCard label="Conversion Rate" value={storeHealth.conversionRate} prev={storeHealth.conversionRatePrev} suffix="%" icon={TrendingUp} decimals={1} />
        <StatCard label="Visitors" value={storeHealth.visitors} prev={storeHealth.visitorsPrev} icon={Eye} />
        <StatCard label="Returning Customers" value={storeHealth.returningCustomerRate} prev={32.1} suffix="%" icon={RotateCcw} decimals={1} />
      </div>
    </div>
  );
}
