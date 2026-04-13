import { AIChat } from "@/components/chat/ai-chat";

export default function ChatPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Chat</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Ask anything about your store. Powered by your AI, connected to your Shopify via MCP.
        </p>
      </div>
      <AIChat />
    </div>
  );
}
