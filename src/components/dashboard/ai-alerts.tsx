"use client";

import { alerts } from "@/data/mock-data";
import { Bell, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

const typeConfig = {
  critical: { icon: XCircle, color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.15)" },
  warning: { icon: AlertTriangle, color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.15)" },
  success: { icon: CheckCircle, color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.15)" },
  info: { icon: Info, color: "#60a5fa", bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.15)" },
};

export function AIAlerts() {
  return (
    <div className="sp-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          AI Alerts
        </h3>
        <span
          className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}
        >
          {alerts.length} active
        </span>
      </div>
      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const config = typeConfig[alert.type];
          return (
            <div
              key={alert.id}
              className="sp-card-hover p-3 rounded-xl animate-fade-in-up"
              style={{
                background: config.bg,
                border: `1px solid ${config.border}`,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: config.bg }}
                >
                  <config.icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold" style={{ color: "var(--sp-text)" }}>
                    {alert.title}
                  </p>
                  <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "var(--sp-text-secondary)" }}>
                    {alert.message}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "var(--sp-text-muted)" }}>
                    {new Date(alert.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
