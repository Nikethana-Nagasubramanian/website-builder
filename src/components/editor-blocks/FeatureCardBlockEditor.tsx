import { useEffect, useState } from "react";
import { usePageStore } from "../../store/usePageStore";
import { FileUploadField } from "../reusable-components/FileUploadField";
import { TextField } from "../reusable-components/TextField";
import { TextAreaField } from "../reusable-components/TextAreaField";
import { ActionButton } from "../reusable-components/ActionButton";
import { Plus, Trash } from "@phosphor-icons/react";
import { compressImage } from "../../utils/imageCompression";

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
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
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
    // Create a deep copy to ensure we're not passing references
    const featuresCopy = updated.map(f => ({
      title: f.title,
      description: f.description,
      imageUrl: f.imageUrl,
      linkUrl: f.linkUrl,
      linkText: f.linkText,
    }));
    updateBlock(block.id, { features: featuresCopy });
  };

  const handleFeatureChange = (index: number, field: keyof FeatureItem, value: string) => {
    const updated = features.map((f, i) => 
      i === index ? { ...f, [field]: value } : { ...f }
    );
    updateFeatures(updated);
  };

  const handleImageUpload = async (index: number, file: File) => {
    // Check file size (5MB limit for original file)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      alert(`Image is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Please use an image smaller than 5MB.`);
      return;
    }

    setUploadingIndex(index);
    
    try {
      // Compress the image before converting to base64
      const compressedFile = await compressImage(file, 1920, 1080, 0.8);
      
      const reader = new FileReader();
      reader.onerror = () => {
        console.error("Failed to read image file");
        alert("Failed to process image. Please try again.");
        setUploadingIndex(null);
      };
      
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result as string;
          const originalSize = file.size;
          const compressedSize = compressedFile.size;
          const base64Size = base64String.length;
          
          console.log(`Image processed - Original: ${(originalSize / 1024).toFixed(2)}KB, Compressed: ${(compressedSize / 1024).toFixed(2)}KB, Base64: ${(base64Size / 1024).toFixed(2)}KB`);
          
          // Warn if base64 is still very large
          if (base64Size > 3 * 1024 * 1024) {
            console.warn("Warning: Base64 image is still large, may cause storage issues");
          }

          const updated = features.map((f, i) => 
            i === index ? { ...f, imageUrl: base64String } : { ...f }
          );
          updateFeatures(updated);
          setUploadingIndex(null);
        }
      };
      
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
      alert("Failed to compress image. Please try a different image.");
      setUploadingIndex(null);
    }
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
              description={uploadingIndex === index ? "Processing image..." : "Upload image for this feature"}
            />
          </div>
        ))}

        <ActionButton
          variant="secondary"
          label="Add feature"
          icon={<Plus size={18} />}
          onClick={addFeature}
          disabled={features.length >= 3}
          showBorder={false}
          className="w-full"
        />
      </div>
    </div>
  );
}