import { usePageStore } from "../store/usePageStore";

export function FeatureCardBlockEditor({ block }: { block: any }) {
    const updateBlock = usePageStore((s) => s.updateBlock);
    const deleteBlock = usePageStore((s) => s.deleteBlock);
    const selectBlock = usePageStore((s) => s.selectBlock);
  
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateBlock(block.id, { imageUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleDelete = () => {
      deleteBlock(block.id);
      selectBlock(null);
    };
  
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="feature-title-input" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="feature-title-input"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={block.props.title || ""}
            onChange={(e) => updateBlock(block.id, { title: e.target.value })}
            placeholder="Enter feature title..."
            aria-describedby="feature-title-description"
          />
          <span id="feature-title-description" className="sr-only">Enter the feature card title</span>
        </div>
  
        <div>
          <label htmlFor="feature-description-input" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="feature-description-input"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            value={block.props.description || ""}
            onChange={(e) => updateBlock(block.id, { description: e.target.value })}
            placeholder="Enter feature description..."
            aria-describedby="feature-description-description"
          />
          <span id="feature-description-description" className="sr-only">Enter the feature card description</span>
        </div>
  

        <div>
          <label htmlFor="feature-link-text-input" className="block text-sm font-medium text-gray-700 mb-2">
            Link Text
          </label>
          <input
            id="feature-link-text-input"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            value={block.props.linkText || "Learn more"}
            onChange={(e) => updateBlock(block.id, { linkText: e.target.value })}
            placeholder="'Learn more' or 'Read more'"
            aria-describedby="feature-link-text-description"
          />
          <span id="feature-link-text-description" className="sr-only">Enter the text for the feature card link</span>
        </div>

        <div>
          <label htmlFor="feature-link-url-input" className="block text-sm font-medium text-gray-700 mb-2">
            Link URL
          </label>
          <input
            id="feature-link-url-input"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            value={block.props.linkUrl || "www.google.com"}
            onChange={(e) => updateBlock(block.id, { linkUrl: e.target.value })}
            placeholder="Enter link URL..."
            aria-describedby="feature-link-url-description"
          />
          <span id="feature-link-url-description" className="sr-only">Enter a URL for the feature card link</span>
        </div>

        <div>
          <label htmlFor="feature-image-url-input" className="block text-sm font-medium text-gray-700 mb-2">
            Image Upload
          </label>
          <label htmlFor="feature-image-upload" className="block">
            <span className="sr-only">Upload image</span>
            <input
              id="feature-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              aria-label="Upload image file for feature card"
            />
          </label>
        </div>
  
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 font-medium transition-colors"
            aria-label="Delete feature card"
          >
            Delete Feature Card
          </button>
        </div>
      </div>
    );
  }