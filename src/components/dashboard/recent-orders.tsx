"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentOrders } from "@/data/mock-data";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  fulfilled: "bg-emerald-500/20 text-emerald-400",
  pending: "bg-amber-500/20 text-amber-400",
  refunded: "bg-red-500/20 text-red-400",
  partially_fulfilled: "bg-blue-500/20 text-blue-400",
};

const statusLabels: Record<string, string> = {
  fulfilled: "Fulfilled",
  pending: "Pending",
  refunded: "Refunded",
  partially_fulfilled: "Partial",
};

export function RecentOrders() {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-emerald-400" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-200">
                    {order.orderNumber}
                  </span>
                  <Badge
                    className={cn(
                      "text-[10px] h-4 border-0",
                      statusColors[order.status]
                    )}
                  >
                    {statusLabels[order.status]}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {order.customer} · {order.city}, {order.country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-xs text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
