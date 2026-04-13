"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

const mockResponses: Record<string, string> = {
  default: `Based on your store data, here's what I see:

**Revenue this period:** $47,832.50 (+16.1% vs last period)
**Top performer:** Smart Water Bottle 750ml is trending up +23.1%
**Needs attention:** UV Protection Sunglasses is out of stock with high demand

Would you like me to dig deeper into any of these areas?`,

  ventes: `Here's your sales breakdown:

| Metric | This Period | Last Period | Change |
|--------|-----------|-------------|--------|
| Revenue | $47,832.50 | $41,200.00 | +16.1% |
| Orders | 312 | 278 | +12.2% |
| AOV | $153.31 | $148.20 | +3.4% |

**Best days:** Weekends consistently outperform weekdays by ~35%.
**Best channel:** Online Store drives 70.4% of revenue.

Want me to analyze a specific product or time range?`,

  clients: `Your customer analysis:

**Total customers:** 24 across 16 countries
**Segments:**
- VIP (8 customers) — 67% of revenue, avg $197.95/order
- Returning (8) — steady base, avg $120.99/order
- New (5) — growing, avg $166.42/order
- Lost (3) — haven't ordered in 60+ days

**Top VIP:** Sophie Mueller ($3,200.75), Maria Garcia ($2,450.00), Kim Soo-jin ($2,100.00)

**Recommendation:** Your VIP segment is your goldmine. Consider setting up a loyalty program or exclusive early access for new products.`,

  produits: `Product performance analysis:

**Stars (high sales + growing):**
1. Wireless Headphones — $158K revenue, +12.5% trend
2. Smart Water Bottle — $70K revenue, +23.1% trend (fastest growing!)

**Cash cows (high sales, stable):**
3. Organic Cotton T-Shirt — $75K revenue, +8.3%
4. Minimalist Leather Wallet — $61K revenue, -2.4%

**Dogs (low sales, declining):**
- Stainless Steel Mug — $1.1K revenue, -31.5% (also high returns)
- Bamboo Desk Organizer — $7K revenue, -15.3%

**Action items:**
1. Feature the Smart Water Bottle on homepage
2. Investigate Mug quality issues (8.5% return rate)
3. Consider discontinuing or discounting the Mug`,
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("vente") || lower.includes("revenue") || lower.includes("sales") || lower.includes("ca"))
    return mockResponses.ventes;
  if (lower.includes("client") || lower.includes("customer") || lower.includes("segment"))
    return mockResponses.clients;
  if (lower.includes("produit") || lower.includes("product") || lower.includes("stock"))
    return mockResponses.produits;
  return mockResponses.default;
}

const suggestions = [
  "How are my sales doing this week?",
  "Show me my customer segments",
  "Which products need attention?",
  "Give me a full store analysis",
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey! I'm your ShopPilot AI assistant. I have access to your Shopify store data via MCP. Ask me anything about your sales, products, customers, or trends.",
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking time
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getResponse(content),
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Messages */}
      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        <div className="max-w-3xl mx-auto py-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.role === "user" && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  msg.role === "assistant"
                    ? "bg-emerald-500/20"
                    : "bg-violet-500/20"
                )}
              >
                {msg.role === "assistant" ? (
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                ) : (
                  <User className="w-4 h-4 text-violet-400" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "assistant"
                    ? "bg-zinc-800/50 border border-zinc-700/50 text-zinc-200"
                    : "bg-violet-600/20 border border-violet-500/20 text-zinc-200"
                )}
              >
                <div
                  className="prose prose-sm prose-invert max-w-none [&_table]:text-xs [&_th]:px-2 [&_td]:px-2"
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n\n/g, "<br/><br/>")
                      .replace(/\n/g, "<br/>")
                      .replace(
                        /\|(.+)\|/g,
                        (match) => `<code>${match}</code>`
                      ),
                  }}
                />
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3">
                <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="max-w-3xl mx-auto relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything about your store..."
            className="bg-zinc-800/50 border-zinc-700 text-zinc-200 placeholder:text-zinc-600 pr-12 min-h-[48px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button
            size="icon"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 h-8 w-8 bg-emerald-600 hover:bg-emerald-500"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
        <p className="text-[10px] text-zinc-600 text-center mt-2">
          AI responses use your own API key. Data pulled from your Shopify store via MCP.
        </p>
      </div>
    </div>
  );
}
