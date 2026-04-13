import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Connect your Shopify store and configure your AI provider.
        </p>
      </div>
      <SettingsForm />
    </div>
  );
}
