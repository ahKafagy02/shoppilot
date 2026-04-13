"use client";

import { DescriptionGenerator } from "@/components/dashboard/description-generator";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { Sparkles, FileText, Wand2 } from "lucide-react";
import { products } from "@/data/mock-data";
import { NumberTicker } from "@/components/ui/number-ticker";

export default function DescriptionsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px]">
      <PageHeader
        title="AI Description Generator"
        description="Generate SEO-optimized product descriptions with AI. Select products and let AI rewrite them."
      />

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Products Available", value: products.length, icon: FileText, desc: "Ready for AI enhancement" },
          { label: "Avg. Description Length", value: 42, icon: Wand2, suffix: " words", desc: "Current average" },
          { label: "AI Enhanced", value: 0, icon: Sparkles, desc: "Generate to improve SEO" },
        ].map((stat, i) => (
          <BlurFade key={stat.label} delay={0.05 + i * 0.05}>
            <div className="sp-surface sp-card-hover rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--sp-accent-subtle)" }}>
                  <stat.icon className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
                </div>
                <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>
                  {stat.label}
                </p>
              </div>
              <p className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                <NumberTicker value={stat.value} delay={0.1 + i * 0.05} />{stat.suffix || ""}
              </p>
              <p className="text-[11px] mt-1" style={{ color: "var(--sp-text-muted)" }}>{stat.desc}</p>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* How it works */}
      <BlurFade delay={0.2}>
        <div className="sp-surface rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
            <h3 className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
              How it works
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Select Products", desc: "Choose which products need better descriptions" },
              { step: "2", title: "AI Generates", desc: "Our AI creates SEO-optimized copy based on your product data" },
              { step: "3", title: "Review & Apply", desc: "Compare side-by-side and push to your Shopify store" },
            ].map((item, i) => (
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

      {/* Generator */}
      <BlurFade delay={0.25}>
        <DescriptionGenerator />
      </BlurFade>
    </div>
  );
}
