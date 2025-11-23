import { usePageStore } from "../../store/usePageStore";

type LayoutTabProps = {
  block: { id: string; props: any };
};

const SPACING_OPTIONS = [
  { value: "0", label: "None" },
  { value: "4", label: "Small (1rem)" },
  { value: "8", label: "Medium (2rem)" },
  { value: "12", label: "Large (3rem)" },
  { value: "16", label: "X-Large (4rem)" },
];

const ALIGNMENT_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export function LayoutTab({ block }: LayoutTabProps) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  return (
    <div className="space-y-4" id="layout-panel" role="tabpanel" aria-labelledby="layout-tab">
      <div>
        <label htmlFor="hero-padding-input" className="block text-sm font-medium text-gray-700 mb-2">
          Padding
        </label>
        <select
          id="hero-padding-input"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={block.props.padding || "8"}
          onChange={(e) => updateBlock(block.id, { padding: e.target.value })}
        >
          {SPACING_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="hero-spacing-input" className="block text-sm font-medium text-gray-700 mb-2">
          Content Spacing
        </label>
        <select
          id="hero-spacing-input"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={block.props.spacing || "4"}
          onChange={(e) => updateBlock(block.id, { spacing: e.target.value })}
        >
          {SPACING_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Alignment
        </label>
        <div className="flex gap-2">
          {ALIGNMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateBlock(block.id, { textAlign: option.value })}
              className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                (block.props.textAlign || "center") === option.value
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
              aria-label={`Align text ${option.label.toLowerCase()}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

