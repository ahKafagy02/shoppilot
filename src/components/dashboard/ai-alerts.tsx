"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { alerts } from "@/data/mock-data";
import { Bell, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const typeConfig = {
  critical: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-900/30",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-900/30",
  },
  success: {
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-900/30",
  },
  info: {
    icon: Info,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-900/30",
  },
};

export function AIAlerts() {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-400" />
          AI Alerts
          <span className="ml-auto text-xs text-zinc-500 font-normal">
            {alerts.length} active
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.map((alert) => {
          const config = typeConfig[alert.type];
          return (
            <div
              key={alert.id}
              className={cn(
                "p-3 rounded-lg bg-zinc-800/30 border",
                config.border
              )}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={cn(
                    "w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                    config.bg
                  )}
                >
                  <config.icon className={cn("w-3.5 h-3.5", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200">
                    {alert.title}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    {alert.message}
                  </p>
                  <p className="text-[10px] text-zinc-600 mt-1">
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
      </CardContent>
    </Card>
  );
}
