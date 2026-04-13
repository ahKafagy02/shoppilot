"use client";

import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ConversionFunnel } from "@/components/dashboard/conversion-funnel";
import { SalesChannels } from "@/components/dashboard/sales-channels";
import { dailyStats } from "@/data/mock-data";
import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
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
    { label: "Revenue (30d)", value: `$${(totalRevenue / 1000).toFixed(1)}K` },
    { label: "Orders (30d)", value: totalOrders.toLocaleString() },
    { label: "Visitors (30d)", value: `${(totalVisitors / 1000).toFixed(1)}K` },
    { label: "Avg. Conversion", value: `${avgConversion.toFixed(2)}%` },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PageHeader title="Analytics" description="Deep dive into your store performance metrics." />

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="sp-surface sp-card-hover rounded-2xl p-4 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>{stat.label}</p>
            <p className="text-2xl font-bold mt-1 font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="animate-fade-in-up stagger-3">
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="animate-fade-in-up stagger-4">
          <ConversionFunnel />
        </div>
        <div className="animate-fade-in-up stagger-5">
          <SalesChannels />
        </div>
      </div>

      <div className="sp-surface rounded-2xl p-5 animate-fade-in-up stagger-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
          <h3
            className="text-sm font-semibold font-[family-name:var(--font-heading)]"
            style={{ color: "var(--sp-text)" }}
          >
            Daily Orders (Last 30 Days)
          </h3>
        </div>
        <div className="h-[250px]">
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
    </div>
  );
}
