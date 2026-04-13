"use client";

import { customers, customerSegments } from "@/data/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, RotateCcw, UserPlus, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const segmentConfig = {
  vip: { label: "VIP", icon: Crown, color: "text-amber-400", bg: "bg-amber-500/20" },
  returning: { label: "Returning", icon: RotateCcw, color: "text-blue-400", bg: "bg-blue-500/20" },
  new: { label: "New", icon: UserPlus, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  lost: { label: "Lost", icon: UserX, color: "text-red-400", bg: "bg-red-500/20" },
};

export default function CustomersPage() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? customers : customers.filter((c) => c.segment === filter);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {customers.length} customers across {new Set(customers.map((c) => c.countryCode)).size} countries.
        </p>
      </div>

      {/* Segment filter pills */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            filter === "all"
              ? "bg-zinc-200 text-zinc-900"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
          )}
        >
          All ({customers.length})
        </button>
        {(Object.keys(segmentConfig) as Array<keyof typeof segmentConfig>).map(
          (key) => {
            const cfg = segmentConfig[key];
            const count = customerSegments[key].count;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
                  filter === key
                    ? "bg-zinc-200 text-zinc-900"
                    : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                )}
              >
                <cfg.icon className="w-3 h-3" />
                {cfg.label} ({count})
              </button>
            );
          }
        )}
      </div>

      {/* Customers Table */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800">
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Segment</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium text-right">Total Spent</th>
                  <th className="p-4 font-medium text-right">Orders</th>
                  <th className="p-4 font-medium text-right">Last Order</th>
                  <th className="p-4 font-medium text-right">Customer Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filtered.map((customer) => {
                  const seg = segmentConfig[customer.segment];
                  return (
                    <tr
                      key={customer.id}
                      className="text-zinc-300 hover:bg-zinc-800/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white">
                            {customer.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-zinc-200">
                              {customer.name}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={cn("text-[10px] border-0", seg.bg, seg.color)}
                        >
                          {seg.label}
                        </Badge>
                      </td>
                      <td className="p-4 text-zinc-400">
                        {customer.city}, {customer.country}
                      </td>
                      <td className="p-4 text-right font-semibold text-white">
                        ${customer.totalSpent.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">{customer.orders}</td>
                      <td className="p-4 text-right text-zinc-400">
                        {new Date(customer.lastOrder).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </td>
                      <td className="p-4 text-right text-zinc-500 text-xs">
                        {new Date(customer.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", year: "numeric" }
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
