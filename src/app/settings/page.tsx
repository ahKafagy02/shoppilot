import { SettingsForm } from "@/components/settings/settings-form";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <PageHeader
          title="Settings"
          description="Connect your Shopify store and configure your AI provider."
        />
      </div>
      <SettingsForm />
    </div>
  );
}
