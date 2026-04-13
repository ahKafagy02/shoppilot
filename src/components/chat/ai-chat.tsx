"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, Loader2, Bot } from "lucide-react";
import { useTheme } from "next-themes";

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

**Revenue:** $47,832.50 (+16.1%)
**Orders:** 312 (+12.2%)
**AOV:** $153.31 (+3.4%)

Best days are weekends, consistently outperforming weekdays by ~35%. Online Store drives 70.4% of revenue.

Want me to analyze a specific product or time range?`,

  clients: `Your customer analysis:

**Total:** 24 customers across 16 countries

**VIP** (8) — 67% of revenue, avg $197.95/order
**Returning** (8) — steady base, avg $120.99/order
**New** (5) — growing, avg $166.42/order
**Lost** (3) — no orders in 60+ days

**Recommendation:** Your VIP segment is your goldmine. Consider a loyalty program or exclusive early access for new products.`,

  produits: `**Stars** (high sales + growing):
1. Wireless Headphones — $158K, +12.5%
2. Smart Water Bottle — $70K, +23.1%

**Dogs** (low sales, declining):
- Stainless Steel Mug — $1.1K, -31.5% (high returns!)
- Bamboo Desk Organizer — $7K, -15.3%

**Actions:**
1. Feature Smart Water Bottle on homepage
2. Investigate Mug quality issues (8.5% return rate)
3. Consider discontinuing the Mug`,
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
  "How are my sales doing?",
  "Show me customer segments",
  "Which products need attention?",
  "Full store analysis",
];

function formatContent(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--sp-text)">$1</strong>')
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

export function AIChat() {
  const { resolvedTheme: theme } = useTheme();
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
        <div className="max-w-3xl mx-auto py-6 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  background: msg.role === "assistant"
                    ? "var(--sp-accent-subtle)"
                    : "rgba(139, 92, 246, 0.1)",
                  border: `1px solid ${msg.role === "assistant" ? "var(--sp-accent)" : "rgba(139, 92, 246, 0.3)"}20`,
                }}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
                ) : (
                  <User className="w-4 h-4" style={{ color: "#8b5cf6" }} />
                )}
              </div>
              <div
                className="max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed sp-card-hover"
                style={{
                  background: msg.role === "assistant"
                    ? "var(--sp-surface)"
                    : "rgba(139, 92, 246, 0.08)",
                  border: `1px solid ${msg.role === "assistant" ? "var(--sp-border)" : "rgba(139, 92, 246, 0.15)"}`,
                  color: "var(--sp-text-secondary)",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                />
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "var(--sp-accent-subtle)" }}
              >
                <Bot className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
              </div>
              <div
                className="rounded-2xl px-4 py-3"
                style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-border)" }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--sp-accent)", animationDelay: "0s" }} />
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--sp-accent)", animationDelay: "0.15s" }} />
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--sp-accent)", animationDelay: "0.3s" }} />
                </div>
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
                className="text-[12px] font-medium px-3.5 py-2 rounded-xl transition-all duration-200 sp-card-hover"
                style={{
                  background: "var(--sp-surface)",
                  border: "1px solid var(--sp-border)",
                  color: "var(--sp-text-secondary)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4">
        <div
          className="max-w-3xl mx-auto relative rounded-2xl overflow-hidden"
          style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-border)" }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything about your store..."
            rows={1}
            className="w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-[13px] outline-none placeholder:opacity-40"
            style={{ color: "var(--sp-text)", caretColor: "var(--sp-accent)" }}
          />
          <Button
            size="icon"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2.5 bottom-2.5 h-8 w-8 rounded-xl shadow-sm transition-all duration-200"
            style={{
              background: input.trim() ? "var(--sp-accent)" : "var(--sp-accent-subtle)",
              color: input.trim() ? "#fff" : "var(--sp-text-muted)",
            }}
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
        <p className="text-[10px] text-center mt-2" style={{ color: "var(--sp-text-muted)" }}>
          AI responses use your own API key. Data pulled from your Shopify store via MCP.
        </p>
      </div>
    </div>
  );
}
