"use client";

import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ConversionFunnel } from "@/components/dashboard/conversion-funnel";
import { SalesChannels } from "@/components/dashboard/sales-channels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dailyStats, topCountries } from "@/data/mock-data";
import { BarChart3, TrendingUp } from "lucide-react";
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
  const last30 = dailyStats.slice(-30);
  const totalRevenue = last30.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = last30.reduce((s, d) => s + d.orders, 0);
  const totalVisitors = last30.reduce((s, d) => s + d.visitors, 0);
  const avgConversion =
    last30.reduce((s, d) => s + d.conversionRate, 0) / last30.length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Deep dive into your store performance metrics.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Revenue (30d)", value: `$${(totalRevenue / 1000).toFixed(1)}K` },
          { label: "Orders (30d)", value: totalOrders.toLocaleString() },
          { label: "Visitors (30d)", value: `${(totalVisitors / 1000).toFixed(1)}K` },
          { label: "Avg. Conversion", value: `${avgConversion.toFixed(2)}%` },
        ].map((stat) => (
          <Card key={stat.label} className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4">
              <p className="text-xs text-zinc-500">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue chart */}
      <RevenueChart />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ConversionFunnel />
        <SalesChannels />
      </div>

      {/* Orders per day bar chart */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Daily Orders (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last30}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                  dataKey="date"
                  stroke="#52525b"
                  fontSize={11}
                  tickFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis stroke="#52525b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
