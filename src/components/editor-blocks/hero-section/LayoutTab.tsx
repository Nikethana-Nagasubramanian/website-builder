import { usePageStore } from "../../../store/usePageStore";

type LayoutTabProps = {
  block: { id: string; props: any };
};

const PILL_OPTIONS = [
  { value: "4", label: "S" },
  { value: "8", label: "M" },
  { value: "12", label: "L" },
  { value: "16", label: "XL" },
];

const ALIGNMENT_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const HEIGHT_OPTIONS = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "tall", label: "Tall" },
  { value: "full", label: "Full Height" },
];

export function LayoutTab({ block }: LayoutTabProps) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  return (
    <div className="space-y-6" id="layout-panel" role="tabpanel" aria-labelledby="layout-tab">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Padding
        </label>
        <div className="flex gap-2">
          {PILL_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateBlock(block.id, { padding: option.value })}
              className={`flex-1 h-9 flex items-center justify-center rounded-full border text-sm font-medium leading-none transition-all ${
                (block.props.padding || "8") === option.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Content Spacing
        </label>
        <div className="flex gap-2">
          {PILL_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateBlock(block.id, { spacing: option.value })}
              className={`flex-1 h-9 flex items-center justify-center rounded-full border text-sm font-medium leading-none transition-all ${
                (block.props.spacing || "4") === option.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Text Alignment
        </label>
        <div className="flex gap-2">
          {ALIGNMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateBlock(block.id, { textAlign: option.value })}
              className={`flex-1 h-9 flex items-center justify-center rounded-md border text-sm font-medium leading-none transition-all ${
                (block.props.textAlign || "center") === option.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Section Height
        </label>
        <div className="flex flex-wrap gap-2">
          {HEIGHT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateBlock(block.id, { sectionHeight: option.value })}
              className={`flex-1 min-w-[80px] h-9 flex items-center justify-center rounded-md border text-xs font-medium leading-none transition-all ${
                (block.props.sectionHeight || "tall") === option.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3">Size Legend</div>
        <div className="flex justify-between items-center text-[10px] text-blue-700 font-medium">
          <div className="flex gap-1.5 items-baseline"><span>S:</span> <span className="font-bold">4px</span></div>
          <div className="w-px h-2.5 bg-blue-200" />
          <div className="flex gap-1.5 items-baseline"><span>M:</span> <span className="font-bold">8px</span></div>
          <div className="w-px h-2.5 bg-blue-200" />
          <div className="flex gap-1.5 items-baseline"><span>L:</span> <span className="font-bold">12px</span></div>
          <div className="w-px h-2.5 bg-blue-200" />
          <div className="flex gap-1.5 items-baseline"><span>XL:</span> <span className="font-bold">16px</span></div>
        </div>
      </div>
    </div>
  );
}

