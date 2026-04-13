"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customerSegments, customers } from "@/data/mock-data";
import { Users, Crown, RotateCcw, UserPlus, UserX } from "lucide-react";
import { cn } from "@/lib/utils";

const segments = [
  {
    key: "vip" as const,
    label: "VIP",
    icon: Crown,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    key: "returning" as const,
    label: "Returning",
    icon: RotateCcw,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    key: "new" as const,
    label: "New",
    icon: UserPlus,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    key: "lost" as const,
    label: "Lost",
    icon: UserX,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
];

export function CustomerSegments() {
  const totalCustomers = customers.length;

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-400" />
          Customer Segments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {segments.map((seg) => {
            const data = customerSegments[seg.key];
            const percentage = ((data.count / totalCustomers) * 100).toFixed(0);
            return (
              <div
                key={seg.key}
                className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-md flex items-center justify-center",
                      seg.bg
                    )}
                  >
                    <seg.icon className={cn("w-3.5 h-3.5", seg.color)} />
                  </div>
                  <span className="text-xs font-medium text-zinc-400">
                    {seg.label}
                  </span>
                </div>
                <p className="text-lg font-bold text-white">{data.count}</p>
                <p className="text-xs text-zinc-500">
                  {percentage}% · Avg ${data.avgOrderValue.toFixed(0)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Top VIP Customers */}
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <p className="text-xs font-medium text-zinc-400 mb-2">
            Top VIP Customers
          </p>
          <div className="space-y-2">
            {customers
              .filter((c) => c.segment === "vip")
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .slice(0, 3)
              .map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                      {c.name[0]}
                    </div>
                    <span className="text-zinc-300">{c.name}</span>
                  </div>
                  <span className="text-zinc-400 font-medium">
                    ${c.totalSpent.toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
