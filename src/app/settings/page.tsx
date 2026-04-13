"use client";

import { SettingsForm } from "@/components/settings/settings-form";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { Settings, Shield, Zap } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px]">
      <div className="flex items-start justify-between gap-6">
        <PageHeader
          title="Settings"
          description="Connect your Shopify store and configure your AI provider."
        />
        <BlurFade delay={0.05}>
          <div className="flex items-center gap-2">
            {[
              { icon: Shield, label: "Encrypted" },
              { icon: Zap, label: "OAuth 2.0" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold"
                style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-border)", color: "var(--sp-text-secondary)" }}
              >
                <badge.icon className="w-3 h-3" style={{ color: "var(--sp-accent)" }} />
                {badge.label}
              </div>
            ))}
          </div>
        </BlurFade>
      </div>

      {/* Setup guide */}
      <BlurFade delay={0.1}>
        <div className="sp-surface rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
            <h3 className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
              Quick Setup Guide
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Connect Shopify", desc: "Link your store via OAuth for secure data access through MCP" },
              { step: "2", title: "Add AI Key", desc: "Paste your API key from Anthropic, OpenAI, or Google" },
              { step: "3", title: "Start Using", desc: "Chat with AI, generate descriptions, and get alerts" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--sp-bg-subtle)" }}>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                  style={{ background: "var(--sp-accent-subtle)", color: "var(--sp-accent)" }}
                >
                  {item.step}
                </div>
                <div>
                  <p className="text-[12px] font-semibold" style={{ color: "var(--sp-text)" }}>{item.title}</p>
                  <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "var(--sp-text-muted)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.15}>
        <SettingsForm />
      </BlurFade>
    </div>
  );
}
