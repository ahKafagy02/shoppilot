"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { topCountries, products } from "@/data/mock-data";
import type { FilterState } from "@/types";

const timeRangeOptions = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
];

const segmentOptions = [
  { value: "all", label: "All Segments" },
  { value: "vip", label: "VIP" },
  { value: "returning", label: "Returning" },
  { value: "new", label: "New" },
  { value: "lost", label: "Lost" },
];

const channelOptions = [
  { value: "all", label: "All Channels" },
  { value: "online", label: "Online Store" },
  { value: "social", label: "Social Media" },
  { value: "marketplace", label: "Marketplace" },
  { value: "pos", label: "POS" },
];

const categories = [...new Set(products.map((p) => p.category))];

type Props = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
};

export function FiltersBar({ filters, onChange }: Props) {
  const update = (key: keyof FilterState, value: string | null) => {
    if (value) onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Select
        value={filters.timeRange}
        onValueChange={(v) => update("timeRange", v)}
      >
        <SelectTrigger className="w-[150px] bg-zinc-900 border-zinc-700 text-zinc-200 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700">
          {timeRangeOptions.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-zinc-200">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.country}
        onValueChange={(v) => update("country", v)}
      >
        <SelectTrigger className="w-[150px] bg-zinc-900 border-zinc-700 text-zinc-200 text-sm">
          <SelectValue placeholder="All Countries" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700">
          <SelectItem value="all" className="text-zinc-200">All Countries</SelectItem>
          {topCountries.map((c) => (
            <SelectItem key={c.countryCode} value={c.countryCode} className="text-zinc-200">
              {c.country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.category}
        onValueChange={(v) => update("category", v)}
      >
        <SelectTrigger className="w-[150px] bg-zinc-900 border-zinc-700 text-zinc-200 text-sm">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700">
          <SelectItem value="all" className="text-zinc-200">All Categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c} value={c} className="text-zinc-200">
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.segment}
        onValueChange={(v) => update("segment", v)}
      >
        <SelectTrigger className="w-[150px] bg-zinc-900 border-zinc-700 text-zinc-200 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700">
          {segmentOptions.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-zinc-200">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.channel}
        onValueChange={(v) => update("channel", v)}
      >
        <SelectTrigger className="w-[150px] bg-zinc-900 border-zinc-700 text-zinc-200 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700">
          {channelOptions.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-zinc-200">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
