"use client";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="animate-fade-in-up">
      <h1
        className="text-2xl font-bold tracking-tight font-[family-name:var(--font-heading)]"
        style={{ color: "var(--sp-text)" }}
      >
        {title}
      </h1>
      <p className="text-sm mt-1" style={{ color: "var(--sp-text-muted)" }}>
        {description}
      </p>
    </div>
  );
}
