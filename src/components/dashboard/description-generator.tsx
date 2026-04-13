"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/mock-data";
import { Sparkles, Check, Loader2 } from "lucide-react";

const mockGeneratedDescriptions: Record<string, string> = {
  prod_001: "Experience pure audio bliss with our Wireless Noise-Cancelling Headphones. Featuring advanced ANC technology that blocks out 98% of ambient noise, premium 40mm drivers for crystal-clear sound, and an impressive 30-hour battery life.",
  prod_002: "Elevate your everyday wardrobe with our Organic Cotton T-Shirt. Crafted from 100% GOTS-certified organic cotton, this tee combines sustainability with comfort. Breathable, pre-shrunk, and built to last.",
  prod_003: "Stay hydrated smarter with our Smart Water Bottle. Built-in LED temperature display, smart hydration reminders, and 750ml double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12.",
  prod_006: "Brew cafe-quality coffee at home with our Ceramic Pour-Over Coffee Set. Handcrafted with a precision-engineered dripper for a smooth, full-bodied extraction. Includes matching 12oz ceramic mug.",
  prod_007: "Declutter your workspace with our Bamboo Desk Organizer. Sustainably sourced bamboo with 5 compartments and an integrated phone stand. Smooth, splinter-free finish.",
  prod_010: "Your perfect travel companion — our Stainless Steel Insulated Mug keeps coffee hot for 6 hours and iced drinks cold for 12. Spill-proof lid, fits most car cup holders.",
};

type ProductStatus = "idle" | "generating" | "done";

export function DescriptionGenerator() {
  const [statuses, setStatuses] = useState<Record<string, ProductStatus>>({});
  const [generated, setGenerated] = useState<Record<string, string>>({});
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generateOne = async (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "generating" }));
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    setGenerated((prev) => ({
      ...prev,
      [id]: mockGeneratedDescriptions[id] || `Enhanced SEO-optimized description for ${products.find((p) => p.id === id)?.title}. Premium quality with exceptional craftsmanship and outstanding value.`,
    }));
    setStatuses((prev) => ({ ...prev, [id]: "done" }));
  };

  const generateAll = async () => {
    for (const product of products) {
      await generateOne(product.id);
    }
  };

  const doneCount = Object.values(statuses).filter((s) => s === "done").length;

  return (
    <div className="space-y-5">
      {/* Actions bar */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
            style={{ color: "var(--sp-text-secondary)", background: "var(--sp-surface)", border: "1px solid var(--sp-border)" }}
          >
            {selectedProducts.size} selected
          </span>
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
            style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}
          >
            {doneCount}/{products.length} generated
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => { for (const id of selectedProducts) await generateOne(id); }}
            disabled={selectedProducts.size === 0}
            className="rounded-xl text-[12px]"
            style={{ border: "1px solid var(--sp-border)", color: "var(--sp-text-secondary)" }}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Generate Selected
          </Button>
          <Button
            size="sm"
            onClick={generateAll}
            className="rounded-xl text-[12px] text-white shadow-sm"
            style={{ background: "var(--sp-accent)" }}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Generate All
          </Button>
        </div>
      </div>

      {/* Products list */}
      <div className="space-y-3">
        {products.map((product, i) => {
          const status = statuses[product.id] || "idle";
          const newDesc = generated[product.id];
          const isSelected = selectedProducts.has(product.id);

          return (
            <div
              key={product.id}
              className="sp-surface sp-card-hover rounded-2xl p-4 animate-fade-in-up"
              style={{
                animationDelay: `${i * 0.04}s`,
                borderColor: isSelected ? "var(--sp-accent)" : undefined,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleSelect(product.id)}
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200"
                  style={{
                    background: isSelected ? "var(--sp-accent)" : "transparent",
                    border: `2px solid ${isSelected ? "var(--sp-accent)" : "var(--sp-border-hover)"}`,
                  }}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[13px] font-semibold" style={{ color: "var(--sp-text)" }}>
                      {product.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ color: "var(--sp-text-muted)", background: "var(--sp-accent-subtle)" }}>
                      ${product.price}
                    </span>
                    {status === "done" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}>
                        AI Enhanced
                      </span>
                    )}
                  </div>

                  <div className={`grid gap-3 ${newDesc ? "grid-cols-2" : "grid-cols-1"}`}>
                    <div className="p-3 rounded-xl" style={{ background: "var(--sp-bg-subtle)", border: "1px solid var(--sp-border)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--sp-text-muted)" }}>Current</p>
                      <p className="text-[12px] leading-relaxed" style={{ color: "var(--sp-text-secondary)" }}>{product.description}</p>
                    </div>
                    {newDesc && (
                      <div className="p-3 rounded-xl" style={{ background: "var(--sp-accent-subtle)", border: "1px solid rgba(52,211,153,0.15)" }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--sp-accent)" }}>AI Generated</p>
                        <p className="text-[12px] leading-relaxed" style={{ color: "var(--sp-text)" }}>{newDesc}</p>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => generateOne(product.id)}
                  disabled={status === "generating"}
                  className="shrink-0 w-8 h-8 rounded-xl"
                >
                  {status === "generating" ? (
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: "var(--sp-accent)" }} />
                  ) : status === "done" ? (
                    <Check className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
                  ) : (
                    <Sparkles className="w-4 h-4" style={{ color: "var(--sp-text-muted)" }} />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
