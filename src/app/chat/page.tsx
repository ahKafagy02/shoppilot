"use client";

import { AIChat } from "@/components/chat/ai-chat";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { Bot, Sparkles, Zap } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px]">
      <div className="flex items-start justify-between gap-6">
        <PageHeader
          title="AI Chat"
          description="Ask anything about your store. Powered by your AI, connected to your Shopify via MCP."
        />
        <BlurFade delay={0.05}>
          <div className="flex items-center gap-2">
            {[
              { icon: Bot, label: "AI Ready", color: "var(--sp-accent)" },
              { icon: Zap, label: "MCP Connected", color: "#fbbf24" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold"
                style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-border)", color: "var(--sp-text-secondary)" }}
              >
                <badge.icon className="w-3 h-3" style={{ color: badge.color }} />
                {badge.label}
              </div>
            ))}
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.1}>
        <AIChat />
      </BlurFade>
    </div>
  );
}
