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
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 animate-fade-in-up">
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

      {/* === TIER 1: The most important info at a glance === */}
      <div className="animate-fade-in-up stagger-1">
        <StoreHealth />
      </div>

      {/* === TIER 2: Revenue trend (full width — the hero chart) === */}
      <div className="animate-fade-in-up stagger-2">
        <RevenueChart />
      </div>

      {/* === TIER 3: AI Summary — the "so what" of the data === */}
      <div className="animate-fade-in-up stagger-3">
        <WeeklySummary />
      </div>

      {/* === TIER 4: Geographic + Segments — who are your customers === */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 animate-fade-in-up stagger-4">
          <CustomerGlobe />
        </div>
        <div className="xl:col-span-2 animate-fade-in-up stagger-5">
          <CustomerSegments />
        </div>
      </div>

      {/* === TIER 5: Products — what sells, what doesn't === */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="animate-fade-in-up stagger-5">
          <TopProducts />
        </div>
        <div className="animate-fade-in-up stagger-6">
          <WeakProducts />
        </div>
      </div>

      {/* === TIER 6: Funnel + Channels — how they buy === */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="animate-fade-in-up stagger-6">
          <ConversionFunnel />
        </div>
        <div className="animate-fade-in-up stagger-7">
          <SalesChannels />
        </div>
      </div>

      {/* === TIER 7: Alerts + Recent Orders — latest activity === */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-2 animate-fade-in-up stagger-7">
          <AIAlerts />
        </div>
        <div className="xl:col-span-3 animate-fade-in-up stagger-8">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
