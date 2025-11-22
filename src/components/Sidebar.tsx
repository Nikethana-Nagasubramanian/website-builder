import { usePageStore } from "../store/usePageStore";
import { Quotes, Cards, Star } from "phosphor-react";

// Block type definitions - this will grow!
const BLOCK_TYPES = [
  {
    id: "text",
    name: "Testimonial Section",
    description: "Add a customer testimonial",
    icon: <Quotes className="w-5 h-5" weight="fill" />,
  },
  {
    id: "featureCard",
    name: "Feature Card",
    description: "Add a feature card element",
    icon: <Cards className="w-5 h-5" weight="fill" />,
  },
  {
    id: "heroSection",
    name: "Hero Section",
    description: "Add a hero section",
    icon: <Star className="w-5 h-5" weight="fill" />,
  },
];

export function Sidebar() {
  const addBlock = usePageStore((s) => s.addBlock);

  return (
    <div className="p-4" aria-label="Add block sidebar">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Block</h2>
      <div className="space-y-2" role="list" aria-label="Available block types">
        {BLOCK_TYPES.map((blockType) => (
          <button
            key={blockType.id}
            className="w-full bg-white hover:border-blue-500 hover:bg-blue-50 p-4 rounded-lg text-left transition-all group"
            onClick={() => addBlock(blockType.id)}
            aria-label={`Add ${blockType.name.toLowerCase()}: ${blockType.description}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded flex items-center justify-center transition-colors text-gray-600 group-hover:text-blue-600" aria-hidden="true">
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