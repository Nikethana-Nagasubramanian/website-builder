type ImagePresetSelectorProps = {
  presets: string[];
  selected: string;
  onSelect: (url: string) => void;
  label?: string;
};

export function ImagePresetSelector({
  presets,
  selected,
  onSelect,
  label = "Choose a Background",
}: ImagePresetSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((img, idx) => (
          <button
            key={idx}
            type="button"
            className={`relative h-20 rounded-lg border overflow-hidden ${
              selected === img
                ? "ring-2 ring-blue-500 border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => onSelect(img)}
            aria-label={`Select preset image ${idx + 1}`}
          >
            <img src={img} alt={`Preset ${idx + 1}`} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>
    </div>
  );
}

