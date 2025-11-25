import { usePageStore } from "../../../store/usePageStore";

type StylingTabProps = {
  block: { id: string; props: any };
};

const TEXT_COLORS = [
  { value: "text-white", label: "White", preview: "bg-white" },
  { value: "text-black", label: "Black", preview: "bg-black" },
  { value: "text-gray-100", label: "Light Gray", preview: "bg-gray-100" },
  { value: "text-gray-900", label: "Dark Gray", preview: "bg-gray-900" },
  { value: "text-blue-500", label: "Blue", preview: "bg-blue-500" },
  { value: "text-red-500", label: "Red", preview: "bg-red-500" },
  { value: "text-green-500", label: "Green", preview: "bg-green-500" },
  { value: "text-yellow-500", label: "Yellow", preview: "bg-yellow-500" },
];

export function StylingTab({ block }: StylingTabProps) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  const currentTextColor = block.props.textColor || "text-white";

  const handleColorSelect = (color: string) => {
    updateBlock(block.id, { textColor: color });
  };

  return (
    <div className="space-y-4" id="styling-panel" role="tabpanel" aria-labelledby="styling-tab">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div className="grid grid-cols-4 gap-3">
          {TEXT_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleColorSelect(color.value)}
              className={`relative h-16 rounded-lg border-2 overflow-hidden transition-all ${
                currentTextColor === color.value
                  ? "ring-2 ring-blue-500 border-blue-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              aria-label={`Select ${color.label} text color`}
            >
              <div className={`w-full h-full ${color.preview}`} />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                {color.label}
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selected: <span className="font-medium">{TEXT_COLORS.find(c => c.value === currentTextColor)?.label || "White"}</span>
        </p>
      </div>
    </div>
  );
}

