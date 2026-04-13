"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { storeHealth } from "@/data/mock-data";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  Eye,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

function StatCard({
  label,
  value,
  prev,
  prefix = "",
  suffix = "",
  icon: Icon,
}: {
  label: string;
  value: number;
  prev: number;
  prefix?: string;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const change = ((value - prev) / prev) * 100;
  const isPositive = change >= 0;

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10">
        <Icon className="w-5 h-5 text-emerald-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-zinc-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-white mt-0.5">
          {prefix}
          {value.toLocaleString("en-US", {
            minimumFractionDigits: suffix === "%" ? 1 : 0,
            maximumFractionDigits: suffix === "%" ? 1 : 2,
          })}
          {suffix}
        </p>
        <p
          className={cn(
            "text-xs font-medium mt-1",
            isPositive ? "text-emerald-400" : "text-red-400"
          )}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(1)}% vs last period
        </p>
      </div>
    </div>
  );
}

export function StoreHealth() {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Store Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <StatCard
            label="Revenue"
            value={storeHealth.revenue}
            prev={storeHealth.revenuePrev}
            prefix="$"
            icon={DollarSign}
          />
          <StatCard
            label="Orders"
            value={storeHealth.orders}
            prev={storeHealth.ordersPrev}
            icon={ShoppingCart}
          />
          <StatCard
            label="Avg. Order Value"
            value={storeHealth.avgOrderValue}
            prev={storeHealth.avgOrderValuePrev}
            prefix="$"
            icon={DollarSign}
          />
          <StatCard
            label="Conversion Rate"
            value={storeHealth.conversionRate}
            prev={storeHealth.conversionRatePrev}
            suffix="%"
            icon={TrendingUp}
          />
          <StatCard
            label="Visitors"
            value={storeHealth.visitors}
            prev={storeHealth.visitorsPrev}
            icon={Eye}
          />
          <StatCard
            label="Returning Customers"
            value={storeHealth.returningCustomerRate}
            prev={32.1}
            suffix="%"
            icon={RotateCcw}
          />
        </div>
      </CardContent>
    </Card>
  );
}
