import { AIAlerts } from "@/components/dashboard/ai-alerts";
import { PageHeader } from "@/components/layout/page-header";

export default function AlertsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PageHeader
        title="AI Alerts"
        description="AI-detected anomalies, opportunities, and issues in your store."
      />
      <div className="max-w-2xl animate-fade-in-up stagger-1">
        <AIAlerts />
      </div>
    </div>
  );
}
