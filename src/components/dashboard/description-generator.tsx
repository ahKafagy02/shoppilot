"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/mock-data";
import { FileText, Sparkles, Check, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const mockGeneratedDescriptions: Record<string, string> = {
  prod_001:
    "Experience pure audio bliss with our Wireless Noise-Cancelling Headphones. Featuring advanced ANC technology that blocks out 98% of ambient noise, premium 40mm drivers for crystal-clear sound, and an impressive 30-hour battery life. The ergonomic over-ear design with memory foam cushions ensures comfort during long listening sessions. Perfect for commuters, remote workers, and music lovers who demand the best.",
  prod_002:
    "Elevate your everyday wardrobe with our Organic Cotton T-Shirt. Crafted from 100% GOTS-certified organic cotton, this tee combines sustainability with comfort. The breathable, pre-shrunk fabric maintains its shape wash after wash, while the reinforced seams ensure lasting durability. Available in classic black — a versatile essential that pairs with anything.",
  prod_003:
    "Stay hydrated smarter with our Smart Water Bottle. The built-in LED temperature display shows your drink's exact temperature in real-time, while smart hydration reminders keep you on track throughout the day. The 750ml double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12. BPA-free, leak-proof, and designed to fit standard cup holders.",
  prod_006:
    "Brew cafe-quality coffee at home with our Ceramic Pour-Over Coffee Set. Each piece is handcrafted by skilled artisans, featuring a precision-engineered dripper with optimal flow rate for a smooth, full-bodied extraction. The set includes a matching 12oz ceramic mug with a comfortable handle. The clean, minimalist design makes it a beautiful addition to any kitchen.",
  prod_007:
    "Declutter your workspace with our Bamboo Desk Organizer. Sustainably sourced bamboo provides a warm, natural aesthetic while keeping your essentials within reach. Features 5 compartments for pens, cards, and supplies, plus an integrated phone stand with optimal viewing angle. The smooth, splinter-free finish protects your devices and documents.",
  prod_010:
    "Your perfect travel companion — our Stainless Steel Insulated Mug keeps coffee hot for 6 hours and iced drinks cold for 12. The double-wall vacuum insulation prevents condensation, while the spill-proof lid makes it safe for your bag. The 18/8 food-grade stainless steel won't retain flavors or odors. Fits most car cup holders.",
};

type ProductStatus = "idle" | "generating" | "done";

export function DescriptionGenerator() {
  const [statuses, setStatuses] = useState<Record<string, ProductStatus>>({});
  const [generated, setGenerated] = useState<Record<string, string>>({});
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );

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
      [id]:
        mockGeneratedDescriptions[id] ||
        `Enhanced SEO-optimized description for ${products.find((p) => p.id === id)?.title}. This product stands out with its premium quality, exceptional craftsmanship, and outstanding value. Perfect for customers who appreciate the finer things in life. Order now and experience the difference.`,
    }));
    setStatuses((prev) => ({ ...prev, [id]: "done" }));
  };

  const generateSelected = async () => {
    for (const id of selectedProducts) {
      await generateOne(id);
    }
  };

  const generateAll = async () => {
    for (const product of products) {
      await generateOne(product.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
            {selectedProducts.size} selected
          </Badge>
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
            {Object.values(statuses).filter((s) => s === "done").length} /
            {products.length} generated
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateSelected}
            disabled={selectedProducts.size === 0}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Generate Selected
          </Button>
          <Button
            size="sm"
            onClick={generateAll}
            className="bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Generate All
          </Button>
        </div>
      </div>

      {/* Products list */}
      <div className="space-y-3">
        {products.map((product) => {
          const status = statuses[product.id] || "idle";
          const newDesc = generated[product.id];

          return (
            <Card
              key={product.id}
              className={cn(
                "bg-zinc-900/50 border-zinc-800 transition-colors",
                selectedProducts.has(product.id) && "border-emerald-500/50"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleSelect(product.id)}
                    className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-1 transition-colors",
                      selectedProducts.has(product.id)
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-zinc-600 hover:border-zinc-400"
                    )}
                  >
                    {selectedProducts.has(product.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    {/* Product info */}
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-medium text-white">
                        {product.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-[10px] bg-zinc-800 text-zinc-400"
                      >
                        ${product.price}
                      </Badge>
                      {status === "done" && (
                        <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-0">
                          AI Enhanced
                        </Badge>
                      )}
                    </div>

                    {/* Current vs generated */}
                    <div
                      className={cn(
                        "grid gap-3",
                        newDesc ? "grid-cols-2" : "grid-cols-1"
                      )}
                    >
                      <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                        <p className="text-[10px] font-medium text-zinc-500 mb-1">
                          CURRENT
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      {newDesc && (
                        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                          <p className="text-[10px] font-medium text-emerald-400 mb-1">
                            AI GENERATED
                          </p>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {newDesc}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Generate button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => generateOne(product.id)}
                    disabled={status === "generating"}
                    className="shrink-0 text-zinc-400 hover:text-emerald-400"
                  >
                    {status === "generating" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : status === "done" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
