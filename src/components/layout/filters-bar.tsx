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

  const selectClass = "w-[140px] text-[12px] font-medium rounded-xl";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {[
        { key: "timeRange" as const, value: filters.timeRange, options: timeRangeOptions },
        { key: "country" as const, value: filters.country, options: [{ value: "all", label: "All Countries" }, ...topCountries.map((c) => ({ value: c.countryCode, label: c.country }))] },
        { key: "category" as const, value: filters.category, options: [{ value: "all", label: "All Categories" }, ...categories.map((c) => ({ value: c, label: c }))] },
        { key: "segment" as const, value: filters.segment, options: segmentOptions },
        { key: "channel" as const, value: filters.channel, options: channelOptions },
      ].map((filter) => (
        <Select
          key={filter.key}
          value={filter.value}
          onValueChange={(v) => update(filter.key, v)}
        >
          <SelectTrigger
            className={selectClass}
            style={{
              background: "var(--sp-surface)",
              borderColor: "var(--sp-border)",
              color: "var(--sp-text-secondary)",
            }}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            style={{
              background: "var(--sp-surface)",
              borderColor: "var(--sp-border)",
            }}
          >
            {filter.options.map((o) => (
              <SelectItem
                key={o.value}
                value={o.value}
                style={{ color: "var(--sp-text)" }}
              >
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
