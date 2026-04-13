"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/mock-data";
import { ShoppingBag, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopProducts() {
  const sorted = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          Top Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sorted.map((product, i) => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30"
          >
            <span className="text-xs font-bold text-zinc-500 w-5">
              #{i + 1}
            </span>
            <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center text-lg">
              {["🎧", "👕", "💧", "👛", "🧘"][i]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">
                {product.title}
              </p>
              <p className="text-xs text-zinc-500">
                {product.sold.toLocaleString()} sold · ${product.price}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">
                ${product.revenue.toLocaleString()}
              </p>
              <div
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium justify-end",
                  product.trend >= 0 ? "text-emerald-400" : "text-red-400"
                )}
              >
                {product.trend >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {product.trend >= 0 ? "+" : ""}
                {product.trend}%
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function WeakProducts() {
  const sorted = [...products]
    .filter((p) => p.status === "active")
    .sort((a, b) => a.trend - b.trend)
    .slice(0, 5);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-red-400" />
          Underperforming Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sorted.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-red-900/20"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">
                {product.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-zinc-500">
                  {product.sold} sold · Stock: {product.inventory}
                </p>
                {product.inventory === 0 && (
                  <Badge variant="destructive" className="text-[10px] h-4">
                    Out of stock
                  </Badge>
                )}
                {product.inventory > 0 && product.inventory < 20 && (
                  <Badge className="text-[10px] h-4 bg-amber-500/20 text-amber-400 hover:bg-amber-500/20">
                    Low stock
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-red-400">
              <TrendingDown className="w-3 h-3" />
              {product.trend}%
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
