import { DescriptionGenerator } from "@/components/dashboard/description-generator";

export default function DescriptionsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Description Generator</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Generate SEO-optimized product descriptions with AI. Select products and let AI rewrite them.
        </p>
      </div>
      <DescriptionGenerator />
    </div>
  );
}
