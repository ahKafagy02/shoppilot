import { DescriptionGenerator } from "@/components/dashboard/description-generator";
import { PageHeader } from "@/components/layout/page-header";

export default function DescriptionsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <PageHeader
          title="AI Description Generator"
          description="Generate SEO-optimized product descriptions with AI. Select products and let AI rewrite them."
        />
      </div>
      <DescriptionGenerator />
    </div>
  );
}
