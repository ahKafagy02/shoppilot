"use client";

import { dailyStats } from "@/data/mock-data";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

const ranges: Record<string, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export function RevenueChart() {
  const [range, setRange] = useState("30d");
  const { theme } = useTheme();
  const data = dailyStats.slice(-ranges[range]);

  const gridColor = theme === "dark" ? "#1e1e2e" : "#e8e8ee";
  const axisColor = theme === "dark" ? "#3f3f5e" : "#a0a0b0";
  const tooltipBg = theme === "dark" ? "#12141c" : "#ffffff";
  const tooltipBorder = theme === "dark" ? "#2a2a3e" : "#e0e0e8";

  return (
    <div className="sp-surface sp-card-hover rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
          <h3
            className="text-sm font-semibold font-[family-name:var(--font-heading)]"
            style={{ color: "var(--sp-text)" }}
          >
            Revenue Timeline
          </h3>
        </div>
        <div
          className="flex items-center rounded-xl p-0.5"
          style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
        >
          {Object.keys(ranges).map((key) => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className="px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200"
              style={{
                color: range === key ? "var(--sp-text)" : "var(--sp-text-muted)",
                background: range === key ? "var(--sp-accent-subtle)" : "transparent",
              }}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--sp-accent)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--sp-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="date"
              stroke={axisColor}
              fontSize={11}
              fontFamily="var(--font-sans)"
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              stroke={axisColor}
              fontSize={11}
              fontFamily="var(--font-sans)"
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "12px",
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              }}
              labelFormatter={(v) =>
                new Date(v).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }
              formatter={(value) => [
                `$${Number(value).toFixed(2)}`,
                "Revenue",
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--sp-accent)"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
