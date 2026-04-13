"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store,
  Brain,
  Key,
  CheckCircle,
  AlertCircle,
  Loader2,
  Link2,
  Unlink,
} from "lucide-react";

export function SettingsForm() {
  const [shopifyDomain, setShopifyDomain] = useState("");
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [shopifyLoading, setShopifyLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState("claude");
  const [aiKey, setAiKey] = useState("");
  const [aiModel, setAiModel] = useState("claude-sonnet-4-6");
  const [aiConnected, setAiConnected] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const connectShopify = async () => {
    setShopifyLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setShopifyConnected(true);
    setShopifyLoading(false);
  };

  const testAiKey = async () => {
    setAiLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setAiConnected(aiKey.length > 10);
    setAiLoading(false);
  };

  const models: Record<string, { value: string; label: string }[]> = {
    claude: [
      { value: "claude-opus-4-6", label: "Claude Opus 4.6 (Most capable)" },
      { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (Balanced)" },
      { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (Fastest)" },
    ],
    openai: [
      { value: "gpt-4o", label: "GPT-4o (Most capable)" },
      { value: "gpt-4o-mini", label: "GPT-4o Mini (Fastest)" },
    ],
    gemini: [
      { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
      { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
    ],
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Shopify Connection */}
      <div className="sp-surface rounded-2xl p-6 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-5">
          <Store className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
          <h3 className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
            Shopify Store Connection
          </h3>
          {shopifyConnected && (
            <span className="ml-auto flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}>
              <CheckCircle className="w-3 h-3" /> Connected
            </span>
          )}
        </div>
        <div className="space-y-3">
          <div>
            <Label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>Store Domain</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={shopifyDomain}
                onChange={(e) => setShopifyDomain(e.target.value)}
                placeholder="mystore.myshopify.com"
                disabled={shopifyConnected}
                className="rounded-xl text-[13px]"
                style={{ background: "var(--sp-bg-subtle)", border: "1px solid var(--sp-border)", color: "var(--sp-text)" }}
              />
              {shopifyConnected ? (
                <Button
                  variant="outline"
                  onClick={() => { setShopifyConnected(false); setShopifyDomain(""); }}
                  className="rounded-xl shrink-0 border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Unlink className="w-4 h-4 mr-1.5" /> Disconnect
                </Button>
              ) : (
                <Button
                  onClick={connectShopify}
                  disabled={!shopifyDomain || shopifyLoading}
                  className="rounded-xl shrink-0 text-white shadow-sm"
                  style={{ background: "var(--sp-accent)" }}
                >
                  {shopifyLoading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Link2 className="w-4 h-4 mr-1.5" />}
                  Connect via OAuth
                </Button>
              )}
            </div>
            <p className="text-[11px] mt-1.5" style={{ color: "var(--sp-text-muted)" }}>
              Redirects to Shopify to authorize ShopPilot access via MCP.
            </p>
          </div>
        </div>
      </div>

      {/* AI Provider */}
      <div className="sp-surface rounded-2xl p-6 animate-fade-in-up stagger-1">
        <div className="flex items-center gap-2 mb-5">
          <Brain className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
          <h3 className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
            AI Configuration
          </h3>
          {aiConnected && (
            <span className="ml-auto flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}>
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>AI Provider</Label>
            <Select value={aiProvider} onValueChange={(v) => { if (v) { setAiProvider(v); setAiConnected(false); } }}>
              <SelectTrigger className="mt-1.5 rounded-xl text-[13px]" style={{ background: "var(--sp-bg-subtle)", border: "1px solid var(--sp-border)", color: "var(--sp-text)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-border)" }}>
                <SelectItem value="claude" style={{ color: "var(--sp-text)" }}>Anthropic (Claude)</SelectItem>
                <SelectItem value="openai" style={{ color: "var(--sp-text)" }}>OpenAI (GPT)</SelectItem>
                <SelectItem value="gemini" style={{ color: "var(--sp-text)" }}>Google (Gemini)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>API Key</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                type="password"
                value={aiKey}
                onChange={(e) => { setAiKey(e.target.value); setAiConnected(false); }}
                placeholder={aiProvider === "claude" ? "sk-ant-..." : aiProvider === "openai" ? "sk-..." : "AIza..."}
                className="rounded-xl text-[12px] font-mono"
                style={{ background: "var(--sp-bg-subtle)", border: "1px solid var(--sp-border)", color: "var(--sp-text)" }}
              />
              <Button
                onClick={testAiKey}
                disabled={!aiKey || aiLoading}
                variant="outline"
                className="rounded-xl shrink-0"
                style={{ border: "1px solid var(--sp-border)", color: "var(--sp-text-secondary)" }}
              >
                {aiLoading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Key className="w-4 h-4 mr-1.5" />}
                Test Key
              </Button>
            </div>
            <p className="text-[11px] mt-1.5" style={{ color: "var(--sp-text-muted)" }}>
              Your key is encrypted. All AI costs billed to your account.
            </p>
          </div>

          <div>
            <Label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>Model</Label>
            <Select value={aiModel} onValueChange={(v) => { if (v) setAiModel(v); }}>
              <SelectTrigger className="mt-1.5 rounded-xl text-[13px]" style={{ background: "var(--sp-bg-subtle)", border: "1px solid var(--sp-border)", color: "var(--sp-text)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-border)" }}>
                {models[aiProvider]?.map((m) => (
                  <SelectItem key={m.value} value={m.value} style={{ color: "var(--sp-text)" }}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="sp-surface rounded-2xl p-4 animate-fade-in-up stagger-2">
        <div className="flex items-center gap-6">
          {[
            { label: "Shopify MCP", connected: shopifyConnected },
            { label: "AI Provider", connected: aiConnected },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{ background: item.connected ? "var(--sp-accent)" : "var(--sp-text-muted)" }}
              />
              <span className="text-[12px] font-medium" style={{ color: "var(--sp-text-secondary)" }}>{item.label}</span>
            </div>
          ))}
          <div className="ml-auto">
            {shopifyConnected && aiConnected ? (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}>
                <CheckCircle className="w-3 h-3" /> Ready to use
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: "var(--sp-text-muted)", background: "var(--sp-accent-subtle)" }}>
                <AlertCircle className="w-3 h-3" /> Setup incomplete
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
