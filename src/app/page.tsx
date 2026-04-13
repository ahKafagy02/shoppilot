"use client";

import { useState } from "react";
import { FiltersBar } from "@/components/layout/filters-bar";
import { StoreHealth } from "@/components/dashboard/store-health";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { TopProducts, WeakProducts } from "@/components/dashboard/top-products";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { ConversionFunnel } from "@/components/dashboard/conversion-funnel";
import { CustomerSegments } from "@/components/dashboard/customer-segments";
import { AIAlerts } from "@/components/dashboard/ai-alerts";
import { SalesChannels } from "@/components/dashboard/sales-channels";
import { WeeklySummary } from "@/components/dashboard/weekly-summary";
import { CustomerGlobe } from "@/components/globe/customer-globe";
import type { FilterState } from "@/types";

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterState>({
    timeRange: "30d",
    country: "all",
    category: "all",
    segment: "all",
    channel: "all",
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Welcome back. Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <FiltersBar filters={filters} onChange={setFilters} />
      </div>

      {/* Row 1: Store Health */}
      <StoreHealth />

      {/* Row 2: Revenue Chart + Globe */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart />
        <CustomerGlobe />
      </div>

      {/* Row 3: Weekly Summary */}
      <WeeklySummary />

      {/* Row 4: Products + Segments */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <TopProducts />
        <WeakProducts />
        <CustomerSegments />
      </div>

      {/* Row 5: Funnel + Channels + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ConversionFunnel />
        <SalesChannels />
        <AIAlerts />
      </div>

      {/* Row 6: Recent Orders */}
      <RecentOrders />
    </div>
  );
}
