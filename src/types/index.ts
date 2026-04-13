export type TimeRange = "today" | "7d" | "30d" | "90d" | "1y";
export type CustomerSegment = "all" | "vip" | "returning" | "new" | "lost";
export type SalesChannel = "all" | "online" | "social" | "marketplace" | "pos";

export type FilterState = {
  timeRange: TimeRange;
  country: string;
  category: string;
  segment: CustomerSegment;
  channel: SalesChannel;
};
