"use client";

import { FileText, Sparkles } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

export function WeeklySummary() {
  return (
    <div className="sp-surface sp-card-hover rounded-2xl p-5 relative overflow-hidden">
      <BorderBeam size={120} duration={8} colorFrom="#8b5cf6" colorTo="#f59e0b" />
      {/* Subtle accent glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--sp-accent)" }}
      />

      <div className="flex items-center gap-2 mb-4 relative">
        <FileText className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          Weekly AI Summary
        </h3>
        <span
          className="ml-auto flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}
        >
          <Sparkles className="w-3 h-3" />
          AI Generated
        </span>
      </div>

      <div className="space-y-3 text-sm leading-relaxed relative" style={{ color: "var(--sp-text-secondary)" }}>
        <p>
          <strong style={{ color: "var(--sp-text)" }}>Great week overall.</strong> Your
          store generated <strong style={{ color: "var(--sp-accent)" }}>$47,832</strong>{" "}
          in revenue from <strong style={{ color: "var(--sp-text)" }}>312 orders</strong>,
          up 16.1% from last week. Your average order value climbed to $153.31.
        </p>
        <p>
          <strong style={{ color: "var(--sp-text)" }}>Star performer:</strong> The Smart
          Water Bottle is on fire with a{" "}
          <strong style={{ color: "var(--sp-accent)" }}>+23.1% growth</strong>. Consider
          featuring it on your homepage and increasing ad spend.
        </p>
        <p>
          <strong style={{ color: "#f59e0b" }}>Watch out:</strong> Stainless
          Steel Insulated Mug and Bamboo Desk Organizer are trending down
          (-31.5% and -15.3%). The mug also has an unusually high return rate
          (8.5%). Review customer feedback for quality issues.
        </p>
        <p>
          <strong style={{ color: "var(--sp-text)" }}>Customer insight:</strong> You gained
          5 new customers this week, with strong activity from France and South
          Korea. Your VIP segment (8 customers) drives 67% of total revenue —
          consider a loyalty reward to retain them.
        </p>
        <p>
          <strong style={{ color: "#f87171" }}>Action needed:</strong> UV Protection
          Sunglasses is out of stock and getting 12+ views/day. Restock ASAP to
          avoid losing sales.
        </p>
      </div>
    </div>
  );
}
