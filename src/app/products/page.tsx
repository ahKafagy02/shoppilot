"use client";

import { products } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, TrendingUp, TrendingDown, Package, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  draft: "bg-zinc-500/20 text-zinc-400",
  archived: "bg-red-500/20 text-red-400",
};

export default function ProductsPage() {
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0);
  const lowStock = products.filter((p) => p.inventory < 20).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Full product catalog with performance metrics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: products.length, icon: ShoppingBag },
          { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign },
          { label: "Units Sold", value: totalSold.toLocaleString(), icon: Package },
          { label: "Low Stock Alerts", value: lowStock, icon: TrendingDown },
        ].map((stat) => (
          <Card key={stat.label} className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Products Table */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Price</th>
                  <th className="p-4 font-medium text-right">Inventory</th>
                  <th className="p-4 font-medium text-right">Sold</th>
                  <th className="p-4 font-medium text-right">Revenue</th>
                  <th className="p-4 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="text-zinc-300 hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-zinc-200">
                          {product.title}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {product.category}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={cn(
                          "text-[10px] border-0",
                          statusColors[product.status]
                        )}
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right font-medium">
                      ${product.price}
                      {product.compareAtPrice && (
                        <span className="text-xs text-zinc-600 line-through ml-1">
                          ${product.compareAtPrice}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={cn(
                          product.inventory === 0
                            ? "text-red-400"
                            : product.inventory < 20
                            ? "text-amber-400"
                            : "text-zinc-300"
                        )}
                      >
                        {product.inventory}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {product.sold.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-semibold text-white">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={cn(
                          "flex items-center gap-0.5 justify-end text-xs font-medium",
                          product.trend >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        )}
                      >
                        {product.trend >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {product.trend >= 0 ? "+" : ""}
                        {product.trend}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
