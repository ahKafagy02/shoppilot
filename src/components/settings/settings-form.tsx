"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Store,
  Brain,
  Key,
  CheckCircle,
  AlertCircle,
  Loader2,
  Link2,
  Unlink,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    // TODO: Replace with real Shopify OAuth flow
    await new Promise((r) => setTimeout(r, 1500));
    setShopifyConnected(true);
    setShopifyLoading(false);
  };

  const disconnectShopify = () => {
    setShopifyConnected(false);
    setShopifyDomain("");
  };

  const testAiKey = async () => {
    setAiLoading(true);
    // TODO: Replace with real API key validation
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
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-400" />
            Shopify Store Connection
            {shopifyConnected && (
              <Badge className="ml-auto bg-emerald-500/10 text-emerald-400 border-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Store Domain</Label>
            <div className="flex gap-2">
              <Input
                value={shopifyDomain}
                onChange={(e) => setShopifyDomain(e.target.value)}
                placeholder="mystore.myshopify.com"
                disabled={shopifyConnected}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-200 placeholder:text-zinc-600"
              />
              {shopifyConnected ? (
                <Button
                  variant="outline"
                  onClick={disconnectShopify}
                  className="border-red-800 text-red-400 hover:bg-red-500/10 shrink-0"
                >
                  <Unlink className="w-4 h-4 mr-1.5" />
                  Disconnect
                </Button>
              ) : (
                <Button
                  onClick={connectShopify}
                  disabled={!shopifyDomain || shopifyLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
                >
                  {shopifyLoading ? (
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  ) : (
                    <Link2 className="w-4 h-4 mr-1.5" />
                  )}
                  Connect via OAuth
                </Button>
              )}
            </div>
            <p className="text-[11px] text-zinc-600">
              This will redirect you to Shopify to authorize ShopPilot to access
              your store data via MCP.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Provider */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <Brain className="w-4 h-4 text-emerald-400" />
            AI Configuration
            {aiConnected && (
              <Badge className="ml-auto bg-emerald-500/10 text-emerald-400 border-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">AI Provider</Label>
            <Select value={aiProvider} onValueChange={(v) => { if (v) { setAiProvider(v); setAiConnected(false); } }}>
              <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="claude" className="text-zinc-200">Anthropic (Claude)</SelectItem>
                <SelectItem value="openai" className="text-zinc-200">OpenAI (GPT)</SelectItem>
                <SelectItem value="gemini" className="text-zinc-200">Google (Gemini)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">API Key</Label>
            <div className="flex gap-2">
              <Input
                type="password"
                value={aiKey}
                onChange={(e) => {
                  setAiKey(e.target.value);
                  setAiConnected(false);
                }}
                placeholder={
                  aiProvider === "claude"
                    ? "sk-ant-..."
                    : aiProvider === "openai"
                    ? "sk-..."
                    : "AIza..."
                }
                className="bg-zinc-800/50 border-zinc-700 text-zinc-200 placeholder:text-zinc-600 font-mono text-xs"
              />
              <Button
                onClick={testAiKey}
                disabled={!aiKey || aiLoading}
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 shrink-0"
              >
                {aiLoading ? (
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                ) : (
                  <Key className="w-4 h-4 mr-1.5" />
                )}
                Test Key
              </Button>
            </div>
            <p className="text-[11px] text-zinc-600">
              Your API key is encrypted and stored securely. We never see or log
              your key. All AI costs are billed directly to your account.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Model</Label>
            <Select value={aiModel} onValueChange={(v) => { if (v) setAiModel(v); }}>
              <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                {models[aiProvider]?.map((m) => (
                  <SelectItem key={m.value} value={m.value} className="text-zinc-200">
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  shopifyConnected ? "bg-emerald-400" : "bg-zinc-600"
                )}
              />
              <span className="text-xs text-zinc-400">Shopify MCP</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  aiConnected ? "bg-emerald-400" : "bg-zinc-600"
                )}
              />
              <span className="text-xs text-zinc-400">AI Provider</span>
            </div>
            <div className="ml-auto">
              {shopifyConnected && aiConnected ? (
                <Badge className="bg-emerald-500/10 text-emerald-400 border-0">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Ready to use
                </Badge>
              ) : (
                <Badge className="bg-zinc-800 text-zinc-500 border-0">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Setup incomplete
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
