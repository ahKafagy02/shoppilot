"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const ranges: Record<string, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export function RevenueChart() {
  const [range, setRange] = useState("30d");
  const data = dailyStats.slice(-ranges[range]);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Revenue Timeline
        </CardTitle>
        <Tabs value={range} onValueChange={setRange}>
          <TabsList className="bg-zinc-800 h-8">
            <TabsTrigger value="7d" className="text-xs h-6 px-2">7D</TabsTrigger>
            <TabsTrigger value="30d" className="text-xs h-6 px-2">30D</TabsTrigger>
            <TabsTrigger value="90d" className="text-xs h-6 px-2">90D</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <YAxis
                stroke="#52525b"
                fontSize={11}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                  fontSize: "12px",
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
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
