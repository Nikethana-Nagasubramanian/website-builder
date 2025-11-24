import { usePageStore } from "../../store/usePageStore";

type ActionButtonVariant = "delete" | "save" | "cancel";

type ActionButtonProps = {
  variant: ActionButtonVariant;
  block: { id: string };
  label: string;
  onClick?: () => void; // Optional - if provided, overrides default behavior
};

const VARIANT_STYLES: Record<ActionButtonVariant, string> = {
  delete: "bg-red-500 hover:bg-red-600 text-white",
  save: "bg-blue-500 hover:bg-blue-600 text-white",
  cancel: "bg-gray-500 hover:bg-gray-600 text-white",
};

export function ActionButton({
  variant,
  block,
  label,
  onClick,
}: ActionButtonProps) {
  const store = usePageStore();

  // Default handlers for each variant
  const getDefaultHandler = () => {
    switch (variant) {
      case "delete":
        return () => store.deleteBlock(block.id);
      case "save":
        return () => {
          // Default save behavior (if any)
          // Could save to localStorage, API, etc.
          console.log("Saving block:", block.id);
        };
      case "cancel":
        return () => store.selectBlock(null);
      default:
        return () => {};
    }
  };

  // Use custom onClick if provided, otherwise use default
  const handleClick = onClick || getDefaultHandler();

  return (
    <div className="pt-4 border-t border-gray-200">
      <button
        onClick={handleClick}
        className={`w-full rounded-lg px-4 py-2 font-medium transition-colors ${VARIANT_STYLES[variant]}`}
        aria-label={`${variant} ${label.toLowerCase()}`}
      >
        {label}
      </button>
    </div>
  );
}

