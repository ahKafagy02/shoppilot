"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { conversionFunnel } from "@/data/mock-data";
import { Filter } from "lucide-react";

export function ConversionFunnel() {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          Conversion Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {conversionFunnel.map((step, i) => {
            const width = step.rate;
            const prevRate = i > 0 ? conversionFunnel[i - 1].rate : 100;
            const dropOff = prevRate - step.rate;

            return (
              <div key={step.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-300">{step.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">
                      {step.count.toLocaleString()}
                    </span>
                    {i > 0 && (
                      <span className="text-xs text-red-400">
                        -{dropOff.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-8 bg-zinc-800 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {step.rate}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
