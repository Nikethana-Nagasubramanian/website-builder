import { usePageStore } from "../../../store/usePageStore";
import { TextField } from "../../reusable-components/TextField";
import { TextAreaField } from "../../reusable-components/TextAreaField";
import { ImagePresetSelector } from "../../reusable-components/ImagePresetSelector";
import { FileUploadField } from "../../reusable-components/FileUploadField";
import { compressImage } from "../../../utils/imageCompression";
import hero1 from "../../../assets/background1.jpg";
import hero2 from "../../../assets/background2.jpg";
import hero3 from "../../../assets/background3.jpg";
import hero4 from "../../../assets/background4.jpg";
import hero5 from "../../../assets/background5.jpg";
import hero6 from "../../../assets/background6.jpg";
import hero7 from "../../../assets/background7.jpg";
import hero8 from "../../../assets/background8.jpg";

type ContentTabProps = {
  block: { id: string; props: any };
};

export function ContentTab({ block }: ContentTabProps) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  const backgroundImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8];

  const handleSelectPreset = (url: string) => {
    updateBlock(block.id, { bgImage: url });
  };

  const handleBackgroundImageUpload = async (file: File) => {
    // Check file size (5MB limit)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      alert(`Image is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Please use an image smaller than 5MB.`);
      return;
    }

    try {
      // Compress the image before converting to base64
      const compressedFile = await compressImage(file, 1920, 1080, 0.8);
      
      const reader = new FileReader();
      reader.onerror = () => {
        console.error("Failed to read image file");
        alert("Failed to process image. Please try again.");
      };
      reader.onloadend = () => {
        if (reader.result) {
          updateBlock(block.id, { bgImage: reader.result as string });
        }
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
      alert("Failed to compress image. Please try a different image.");
    }
  };

  return (
    <div className="space-y-4" id="content-panel" role="tabpanel" aria-labelledby="content-tab">
      <TextField
        id="hero-title-input"
        label="Title"
        value={block.props.title || ""}
        onChange={(value) => updateBlock(block.id, { title: value })}
        placeholder="Enter hero title..."
        description="Enter the hero section title"
      />

      <TextAreaField
        id="hero-description-input"
        label="Description"
        value={block.props.description || ""}
        onChange={(value) => updateBlock(block.id, { description: value })}
        placeholder="Enter hero description..."
        description="Enter the hero section description"
      />

      <ImagePresetSelector
        presets={backgroundImages}
        selected={block.props.bgImage || ""}
        onSelect={handleSelectPreset}
        label="Choose a Background"
      />

      <FileUploadField
        id="hero-bg-image-upload"
        label="Upload Background Image"
        accept="image/*"
        onChange={handleBackgroundImageUpload}
        description="Upload background image file for hero section"
      />
    </div>
  );
}

