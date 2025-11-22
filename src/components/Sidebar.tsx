import { usePageStore } from "../store/usePageStore";

// Block type definitions - this will grow!
const BLOCK_TYPES = [
  {
    id: "text",
    name: "Text Block",
    description: "Add a text element",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: "featureCard",
    name: "Feature Card",
    description: "Add a feature card element",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const addBlock = usePageStore((s) => s.addBlock);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Block</h2>
      <div className="space-y-2">
        {BLOCK_TYPES.map((blockType) => (
          <button
            key={blockType.id}
            className="w-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 p-4 rounded-lg text-left transition-all group"
            onClick={() => addBlock(blockType.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded flex items-center justify-center transition-colors text-gray-600 group-hover:text-blue-600">
                {blockType.icon}
              </div>
              <div>
                <div className="font-medium text-gray-900">{blockType.name}</div>
                <div className="text-sm text-gray-500">{blockType.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}