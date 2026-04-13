"use client";

import { CustomerGlobe } from "@/components/globe/customer-globe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { topCountries, customers } from "@/data/mock-data";
import { MapPin, TrendingUp } from "lucide-react";

export default function GlobePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Customer World Map</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Visualize your global customer base. Click and drag to rotate the globe.
        </p>
      </div>

      <CustomerGlobe />

      {/* Top Countries Table */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            Revenue by Country
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800">
                  <th className="pb-2 font-medium">#</th>
                  <th className="pb-2 font-medium">Country</th>
                  <th className="pb-2 font-medium text-right">Revenue</th>
                  <th className="pb-2 font-medium text-right">Orders</th>
                  <th className="pb-2 font-medium text-right">Customers</th>
                  <th className="pb-2 font-medium text-right">AOV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {topCountries.map((country, i) => (
                  <tr
                    key={country.countryCode}
                    className="text-zinc-300 hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="py-2.5 text-zinc-500">{i + 1}</td>
                    <td className="py-2.5 font-medium">{country.country}</td>
                    <td className="py-2.5 text-right font-semibold text-white">
                      ${country.revenue.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right">{country.orders}</td>
                    <td className="py-2.5 text-right">{country.customers}</td>
                    <td className="py-2.5 text-right text-zinc-400">
                      ${(country.revenue / country.orders).toFixed(0)}
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
