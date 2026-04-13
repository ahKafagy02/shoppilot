"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { salesByChannel } from "@/data/mock-data";
import { BarChart3 } from "lucide-react";

const channelColors = [
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-violet-500",
  "bg-amber-500",
];

export function SalesChannels() {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          Sales by Channel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {salesByChannel.map((channel, i) => (
            <div key={channel.channel}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-zinc-300">{channel.channel}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    ${channel.revenue.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {channel.percentage}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${channelColors[i]} transition-all duration-500`}
                  style={{ width: `${channel.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
