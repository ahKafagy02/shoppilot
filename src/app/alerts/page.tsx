"use client";

import { alerts } from "@/data/mock-data";
import { Bell, AlertTriangle, CheckCircle, Info, XCircle, Shield, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

const typeConfig = {
  critical: { icon: XCircle, color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.15)", label: "Critical" },
  warning: { icon: AlertTriangle, color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.15)", label: "Warning" },
  success: { icon: CheckCircle, color: "#8b5cf6", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.15)", label: "Opportunity" },
  info: { icon: Info, color: "#60a5fa", bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.15)", label: "Info" },
};

export default function AlertsPage() {
  const criticalCount = alerts.filter((a) => a.type === "critical").length;
  const warningCount = alerts.filter((a) => a.type === "warning").length;
  const successCount = alerts.filter((a) => a.type === "success").length;
  const infoCount = alerts.filter((a) => a.type === "info").length;

  const summaryCards = [
    { label: "Critical", value: criticalCount, color: "#f87171", bg: "rgba(248,113,113,0.1)", icon: XCircle },
    { label: "Warnings", value: warningCount, color: "#fbbf24", bg: "rgba(251,191,36,0.1)", icon: AlertTriangle },
    { label: "Opportunities", value: successCount, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", icon: CheckCircle },
    { label: "Insights", value: infoCount, color: "#60a5fa", bg: "rgba(96,165,250,0.1)", icon: Info },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px]">
      <PageHeader
        title="AI Alerts"
        description="AI-detected anomalies, opportunities, and issues across your store."
      />

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <BlurFade key={card.label} delay={0.05 + i * 0.05}>
            <div className="sp-surface sp-card-hover rounded-2xl p-5 flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: card.bg }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>
                  {card.label}
                </p>
                <p className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: card.color }}>
                  <NumberTicker value={card.value} delay={0.1 + i * 0.05} />
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Active alerts badge */}
      <BlurFade delay={0.25}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
            <h2 className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
              Active Alerts
            </h2>
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}
          >
            {alerts.length} active
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--sp-border)" }} />
        </div>
      </BlurFade>

      {/* Alert cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {alerts.map((alert, i) => {
          const config = typeConfig[alert.type];
          return (
            <BlurFade key={alert.id} delay={0.3 + i * 0.05}>
              <div
                className="sp-card-hover rounded-2xl p-5 transition-all duration-200"
                style={{
                  background: config.bg,
                  border: `1px solid ${config.border}`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: config.bg, border: `1px solid ${config.border}` }}
                  >
                    <config.icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{ color: config.color, background: `${config.color}15` }}
                      >
                        {config.label}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <Clock className="w-3 h-3" style={{ color: "var(--sp-text-muted)" }} />
                        <p className="text-[10px]" style={{ color: "var(--sp-text-muted)" }}>
                          {new Date(alert.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-[14px] font-semibold mb-1" style={{ color: "var(--sp-text)" }}>
                      {alert.title}
                    </p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--sp-text-secondary)" }}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
