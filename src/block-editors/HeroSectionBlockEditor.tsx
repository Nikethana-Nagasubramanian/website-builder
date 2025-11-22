import { usePageStore } from "../store/usePageStore";

export function HeroSectionBlockEditor({ block }: { block: any }) {
    const updateBlock = usePageStore((s) => s.updateBlock);
    const deleteBlock = usePageStore((s) => s.deleteBlock);
    const selectBlock = usePageStore((s) => s.selectBlock);
  
    const handleDelete = () => {
      deleteBlock(block.id);
      selectBlock(null);
    }
  
    const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateBlock(block.id, { bgImage: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="hero-title-input" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="hero-title-input"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={block.props.title || ""}
            onChange={(e) => updateBlock(block.id, { title: e.target.value })}
            placeholder="Enter hero title..."
            aria-describedby="hero-title-description"
          />
          <span id="hero-title-description" className="sr-only">Enter the hero section title</span>
        </div>
  
        <div>
          <label htmlFor="hero-description-input" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="hero-description-input"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            value={block.props.description || ""}
            onChange={(e) => updateBlock(block.id, { description: e.target.value })}
            placeholder="Enter hero description..."
            aria-describedby="hero-description-description"
          />
          <span id="hero-description-description" className="sr-only">Enter the hero section description</span>
        </div>
  
        <div>
          <label htmlFor="hero-bg-image-url-input" className="block text-sm font-medium text-gray-700 mb-2">
            Background Image URL
          </label>
          <input
            id="hero-bg-image-url-input"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            value={block.props.bgImage || ""}
            onChange={(e) => updateBlock(block.id, { bgImage: e.target.value })}
            placeholder="Enter background image URL..."
            aria-describedby="hero-bg-image-url-description"
          />
          <span id="hero-bg-image-url-description" className="sr-only">Enter a URL for the hero section background image</span>
          <div className="text-xs text-gray-500 mb-2" aria-hidden="true">or</div>
          <label htmlFor="hero-bg-image-upload" className="block">
            <span className="sr-only">Upload background image</span>
            <input
              id="hero-bg-image-upload"
              type="file"
              accept="image/*"
              onChange={handleBackgroundImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              aria-label="Upload background image file for hero section"
            />
          </label>
        </div>
  
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-2 font-medium transition-colors"
            aria-label="Delete hero section"
          >
            Delete Hero Section
          </button>
        </div>
      </div>
    );
  }