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
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight font-[family-name:var(--font-heading)]"
            style={{ color: "var(--sp-text)" }}
          >
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--sp-text-muted)" }}>
            Welcome back. Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <FiltersBar filters={filters} onChange={setFilters} />
      </div>

      {/* Row 1: Store Health */}
      <div className="animate-fade-in-up stagger-1">
        <StoreHealth />
      </div>

      {/* Row 2: Revenue Chart + Globe */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="animate-fade-in-up stagger-2">
          <RevenueChart />
        </div>
        <div className="animate-fade-in-up stagger-3">
          <CustomerGlobe />
        </div>
      </div>

      {/* Row 3: Weekly Summary */}
      <div className="animate-fade-in-up stagger-4">
        <WeeklySummary />
      </div>

      {/* Row 4: Products + Segments */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="animate-fade-in-up stagger-5">
          <TopProducts />
        </div>
        <div className="animate-fade-in-up stagger-6">
          <WeakProducts />
        </div>
        <div className="animate-fade-in-up stagger-7">
          <CustomerSegments />
        </div>
      </div>

      {/* Row 5: Funnel + Channels + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="animate-fade-in-up stagger-6">
          <ConversionFunnel />
        </div>
        <div className="animate-fade-in-up stagger-7">
          <SalesChannels />
        </div>
        <div className="animate-fade-in-up stagger-8">
          <AIAlerts />
        </div>
      </div>

      {/* Row 6: Recent Orders */}
      <div className="animate-fade-in-up stagger-8">
        <RecentOrders />
      </div>
    </div>
  );
}
