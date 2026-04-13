"use client";

import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ConversionFunnel } from "@/components/dashboard/conversion-funnel";
import { SalesChannels } from "@/components/dashboard/sales-channels";
import { dailyStats } from "@/data/mock-data";
import { BarChart3, TrendingUp, Eye, ShoppingCart, Percent } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const { resolvedTheme: theme } = useTheme();
  const last30 = dailyStats.slice(-30);
  const totalRevenue = last30.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = last30.reduce((s, d) => s + d.orders, 0);
  const totalVisitors = last30.reduce((s, d) => s + d.visitors, 0);
  const avgConversion = last30.reduce((s, d) => s + d.conversionRate, 0) / last30.length;

  const gridColor = theme === "dark" ? "#1e1e2e" : "#e8e8ee";
  const axisColor = theme === "dark" ? "#3f3f5e" : "#a0a0b0";

  const stats = [
    { label: "Revenue (30d)", value: Math.round(totalRevenue / 1000), icon: TrendingUp, prefix: "$", suffix: "K", decimals: 0 },
    { label: "Orders (30d)", value: totalOrders, icon: ShoppingCart, prefix: "", suffix: "", decimals: 0 },
    { label: "Visitors (30d)", value: Math.round(totalVisitors / 1000), icon: Eye, prefix: "", suffix: "K", decimals: 0 },
    { label: "Avg. Conversion", value: avgConversion, icon: Percent, prefix: "", suffix: "%", decimals: 2 },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px]">
      <PageHeader title="Analytics" description="Deep dive into your store performance metrics over the last 30 days." />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <BlurFade key={stat.label} delay={0.05 + i * 0.05}>
            <div className="sp-surface sp-card-hover rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--sp-accent-subtle)" }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
                </div>
                <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>
                  {stat.label}
                </p>
              </div>
              <p className="text-2xl font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                {stat.prefix}
                <NumberTicker value={stat.value} delay={0.15 + i * 0.05} decimalPlaces={stat.decimals} />
                {stat.suffix}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Revenue chart - hero section */}
      <BlurFade delay={0.25}>
        <RevenueChart />
      </BlurFade>

      {/* Funnel + Channels side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BlurFade delay={0.3}>
          <ConversionFunnel />
        </BlurFade>
        <BlurFade delay={0.35}>
          <SalesChannels />
        </BlurFade>
      </div>

      {/* Daily orders bar chart */}
      <BlurFade delay={0.4}>
        <div className="sp-surface rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--sp-accent-subtle)" }}
            >
              <BarChart3 className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
            </div>
            <div>
              <h3
                className="text-sm font-semibold font-[family-name:var(--font-heading)]"
                style={{ color: "var(--sp-text)" }}
              >
                Daily Orders
              </h3>
              <p className="text-[11px]" style={{ color: "var(--sp-text-muted)" }}>
                Last 30 days order volume
              </p>
            </div>
            <div className="ml-auto">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}>
                {totalOrders} total
              </span>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last30}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="date"
                  stroke={axisColor}
                  fontSize={11}
                  fontFamily="var(--font-sans)"
                  tickFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis stroke={axisColor} fontSize={11} fontFamily="var(--font-sans)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#12141c" : "#ffffff",
                    border: `1px solid ${theme === "dark" ? "#2a2a3e" : "#e0e0e8"}`,
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontFamily: "var(--font-sans)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  }}
                />
                <Bar dataKey="orders" fill="var(--sp-accent)" radius={[6, 6, 0, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
