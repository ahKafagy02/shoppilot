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
import { BlurFade } from "@/components/ui/blur-fade";
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
      <BlurFade delay={0}>
        <div className="flex items-start justify-between gap-6">
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
      </BlurFade>

      {/* TIER 1: KPIs */}
      <BlurFade delay={0.05}>
        <StoreHealth />
      </BlurFade>

      {/* TIER 2: Revenue (full width hero) */}
      <BlurFade delay={0.1}>
        <RevenueChart />
      </BlurFade>

      {/* TIER 3: AI Summary */}
      <BlurFade delay={0.15}>
        <WeeklySummary />
      </BlurFade>

      {/* TIER 4: Globe + Segments */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <BlurFade delay={0.2} className="xl:col-span-3">
          <CustomerGlobe />
        </BlurFade>
        <BlurFade delay={0.25} className="xl:col-span-2">
          <CustomerSegments />
        </BlurFade>
      </div>

      {/* TIER 5: Products */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BlurFade delay={0.25}>
          <TopProducts />
        </BlurFade>
        <BlurFade delay={0.3}>
          <WeakProducts />
        </BlurFade>
      </div>

      {/* TIER 6: Funnel + Channels */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BlurFade delay={0.3}>
          <ConversionFunnel />
        </BlurFade>
        <BlurFade delay={0.35}>
          <SalesChannels />
        </BlurFade>
      </div>

      {/* TIER 7: Alerts + Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <BlurFade delay={0.35} className="xl:col-span-2">
          <AIAlerts />
        </BlurFade>
        <BlurFade delay={0.4} className="xl:col-span-3">
          <RecentOrders />
        </BlurFade>
      </div>
    </div>
  );
}
