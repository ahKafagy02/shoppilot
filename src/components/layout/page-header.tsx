"use client";

import { BlurFade } from "@/components/ui/blur-fade";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <BlurFade delay={0}>
      <div>
        <h1
          className="text-2xl font-bold tracking-tight font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          {title}
        </h1>
        <p className="text-sm mt-1.5 max-w-xl leading-relaxed" style={{ color: "var(--sp-text-muted)" }}>
          {description}
        </p>
      </div>
    </BlurFade>
  );
}
