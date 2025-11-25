import { useEffect } from "react";
import { usePageStore } from "../store/usePageStore";
import { FileUploadField } from "../components/editor-fields/FileUploadField";
import { TextField } from "../components/editor-fields/TextField";
import { TextAreaField } from "../components/editor-fields/TextAreaField";
import { ActionButton } from "../components/editor-fields/ActionButton";
import { Plus, Trash } from "phosphor-react";

type FeatureItem = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  linkText?: string;
};

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    title: "Feature Title",
    description: "Describe the benefit or capability of this feature.",
    imageUrl: "https://via.placeholder.com/256x192",
    linkUrl: "#",
    linkText: "Learn more",
  },
  {
    title: "Feature Title",
    description: "Describe the benefit or capability of this feature.",
    imageUrl: "https://via.placeholder.com/256x192",
    linkUrl: "#",
    linkText: "Learn more",
  },
  {
    title: "Feature Title",
    description: "Describe the benefit or capability of this feature.",
    imageUrl: "https://via.placeholder.com/256x192",
    linkUrl: "#",
    linkText: "Learn more",
  },
];

export function FeatureCardBlockEditor({ block }: { block: any }) {
  const updateBlock = usePageStore((s) => s.updateBlock);
  const features: FeatureItem[] = block.props.features && block.props.features.length > 0
    ? block.props.features
    : DEFAULT_FEATURES;

  useEffect(() => {
    if (!block.props.features || block.props.features.length === 0) {
      updateBlock(block.id, { features: DEFAULT_FEATURES });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.id]);

  const updateFeatures = (updated: FeatureItem[]) => {
    updateBlock(block.id, { features: updated });
  };

  const handleFeatureChange = (index: number, field: keyof FeatureItem, value: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    updateFeatures(updated);
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...features];
      updated[index] = { ...updated[index], imageUrl: reader.result as string };
      updateFeatures(updated);
    };
    reader.readAsDataURL(file);
  };

  const removeFeature = (index: number) => {
    if (features.length === 1) return;
    updateFeatures(features.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (features.length >= 3) return;
    updateFeatures([
      ...features,
      {
        title: "New Feature",
        description: "Describe this feature.",
        imageUrl: "https://via.placeholder.com/256x192",
        linkUrl: "#",
        linkText: "Learn more",
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="border-b border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold">Feature {index + 1}</h4>
              </div>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                disabled={features.length === 1}
                className={`p-2 rounded-lg transition-colors ${
                  features.length === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-red-500 hover:bg-red-50"
                }`}
                aria-label={`Delete feature ${index + 1}`}
              >
                <Trash size={18} />
              </button>
            </div>

            <TextField
              id={`feature-title-${index}`}
              label="Title"
              value={feature.title}
              onChange={(value) => handleFeatureChange(index, "title", value)}
              placeholder="Enter feature title..."
            />

            <TextAreaField
              id={`feature-description-${index}`}
              label="Description"
              rows={4}
              value={feature.description}
              onChange={(value) => handleFeatureChange(index, "description", value)}
              placeholder="Enter feature description..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextField
                id={`feature-link-text-${index}`}
                label="Link Text"
                value={feature.linkText || "Learn more"}
                onChange={(value) => handleFeatureChange(index, "linkText", value)}
                placeholder="'Learn more' or 'Read more'"
              />

              <TextField
                id={`feature-link-url-${index}`}
                label="Link URL"
                value={feature.linkUrl || ""}
                onChange={(value) => handleFeatureChange(index, "linkUrl", value)}
                placeholder="https://example.com"
              />
            </div>

            <FileUploadField
              id={`feature-image-${index}`}
              label="Upload Image"
              accept="image/*"
              onChange={(file) => handleImageUpload(index, file)}
              description="Upload image for this feature"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addFeature}
          disabled={features.length >= 3}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            features.length >= 3
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <Plus size={18} />
          Add feature
        </button>
      </div>

      <ActionButton variant="delete" block={block} label="Delete Feature Card" />
    </div>
  );
}