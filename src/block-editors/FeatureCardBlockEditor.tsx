import { usePageStore } from "../store/usePageStore";
import { FileUploadField } from "../components/editor-fields/FileUploadField";
import { TextField } from "../components/editor-fields/TextField";
import { TextAreaField } from "../components/editor-fields/TextAreaField";
import { ActionButton } from "../components/editor-fields/ActionButton";

export function FeatureCardBlockEditor({ block }: { block: any }) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  return (
    <div className="space-y-4">

      <TextField
        id="feature-title-input"
        label="Title"
        value={block.props.title || ""}
        onChange={(value) => updateBlock(block.id, { title: value })}
        placeholder="Enter feature title..."
        description="Enter the feature card title"
      />

      <TextAreaField
        id="feature-description-input"
        label="Description"
        rows={4}
        value={block.props.description || ""}
        onChange={(value) => updateBlock(block.id, { description: value })}
        placeholder="Enter feature description..."
        description="Enter the feature card description"
      />

      <TextField
        id="feature-link-text-input"
        label="Link Text"
        value={block.props.linkText || "Learn more"}
        onChange={(value) => updateBlock(block.id, { linkText: value })}
        placeholder="'Learn more' or 'Read more'"
        description="Enter the text for the feature card link"
      />

      <TextField
        id="feature-link-url-input"
        label="Link URL"
        value={block.props.linkUrl || "www.google.com"}
        onChange={(value) => updateBlock(block.id, { linkUrl: value })}
        placeholder="Enter link URL..."
        description="Enter the URL for the feature card link"
      />


      <FileUploadField
        id="feature-image-upload"
        label="Upload Image"
        accept="image/*"
        onChange={(file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            updateBlock(block.id, { imageUrl: reader.result as string });
          };
          reader.readAsDataURL(file);
        }}
        description="Upload image file for feature card"
      />


      <ActionButton variant="delete" block={block} label="Delete Feature Card" />


    </div>
  );
}