"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles } from "lucide-react";

export function WeeklySummary() {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          Weekly AI Summary
          <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">
            <Sparkles className="w-3 h-3" />
            AI Generated
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm prose-invert max-w-none">
          <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
            <p>
              <strong className="text-white">Great week overall.</strong> Your
              store generated <strong className="text-emerald-400">$47,832</strong>{" "}
              in revenue from <strong className="text-white">312 orders</strong>,
              up 16.1% from last week. Your average order value climbed to $153.31.
            </p>
            <p>
              <strong className="text-white">Star performer:</strong> The Smart
              Water Bottle is on fire with a{" "}
              <strong className="text-emerald-400">+23.1% growth</strong>. Consider
              featuring it on your homepage and increasing ad spend.
            </p>
            <p>
              <strong className="text-amber-400">Watch out:</strong> Stainless
              Steel Insulated Mug and Bamboo Desk Organizer are trending down
              (-31.5% and -15.3%). The mug also has an unusually high return rate
              (8.5%). Review customer feedback for quality issues.
            </p>
            <p>
              <strong className="text-white">Customer insight:</strong> You gained
              5 new customers this week, with strong activity from France and South
              Korea. Your VIP segment (8 customers) drives 67% of total revenue —
              consider a loyalty reward to retain them.
            </p>
            <p>
              <strong className="text-red-400">Action needed:</strong> UV Protection
              Sunglasses is out of stock and getting 12+ views/day. Restock ASAP to
              avoid losing sales.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
