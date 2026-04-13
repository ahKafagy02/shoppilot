import { AIChat } from "@/components/chat/ai-chat";
import { PageHeader } from "@/components/layout/page-header";

export default function ChatPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <PageHeader
          title="AI Chat"
          description="Ask anything about your store. Powered by your AI, connected to your Shopify via MCP."
        />
      </div>
      <AIChat />
    </div>
  );
}
