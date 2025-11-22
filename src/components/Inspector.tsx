import { usePageStore } from "../store/usePageStore";

// This will grow with different editors for different block types
function TextBlockEditor({ block }: { block: any }) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Content
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
          value={block.props.text}
          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
          placeholder="Enter text content..."
        />
      </div>
    </div>
  );
}

function FeatureCardBlockEditor({ block }: { block: any }) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Icon
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={block.props.icon}
          onChange={(e) => updateBlock(block.id, { icon: e.target.value })}
          placeholder="Enter icon name..."
        />
      </div>
    </div>
  );
}

export function Inspector() {
  const { page, selectedId } = usePageStore();
  const block = page.find((b) => b.id === selectedId);

  if (!block) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Block</h2>
        <div className="text-center py-12 text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          <p className="text-sm">No block selected</p>
          <p className="text-xs mt-1">Click on a block to edit it</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Block</h2>
      
      {/* Router pattern - switch based on block type */}
      {block.type === "text" && <TextBlockEditor block={block} />}
      {block.type === "featureCard" && <FeatureCardBlockEditor block={block} />}
      {/* Future: block.type === "hero" && <HeroBlockEditor block={block} /> */}
      {/* Future: block.type === "impact-numbers" && <ImpactNumbersEditor block={block} /> */}
      
      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <div className="mb-1">
            <span className="font-medium">Type:</span> {block.type}
          </div>
          <div>
            <span className="font-medium">ID:</span> {block.id.slice(0, 8)}...
          </div>
        </div>
      </div>
    </div>
  );
}