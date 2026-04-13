import { AIAlerts } from "@/components/dashboard/ai-alerts";

export default function AlertsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Alerts</h1>
        <p className="text-sm text-zinc-500 mt-1">
          AI-detected anomalies, opportunities, and issues in your store.
        </p>
      </div>
      <div className="max-w-2xl">
        <AIAlerts />
      </div>
    </div>
  );
}
