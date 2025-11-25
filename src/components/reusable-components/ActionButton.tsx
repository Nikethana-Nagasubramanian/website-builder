import { usePageStore } from "../../store/usePageStore";
import type { ReactNode } from "react";

type ActionButtonVariant = "delete" | "save" | "cancel" | "preview";

type ActionButtonProps = {
  variant: ActionButtonVariant;
  block?: { id: string }; // Optional for preview button
  label: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void; // Optional - if provided, overrides default behavior
  icon?: ReactNode; // Optional icon to display before label
  href?: string; // Optional href for link buttons
  target?: string; // Optional target for link buttons
  rel?: string; // Optional rel for link buttons
  disabled?: boolean; // Optional disabled state
  tooltip?: string; // Optional tooltip text
  showBorder?: boolean; // Whether to show top border (default: true for block actions)
  className?: string; // Additional className
};

const VARIANT_STYLES: Record<ActionButtonVariant, { enabled: string; disabled: string }> = {
  delete: {
    enabled: "bg-red-500 hover:bg-red-600 text-white",
    disabled: "bg-red-300 text-white cursor-not-allowed",
  },
  save: {
    enabled: "bg-blue-500 hover:bg-blue-600 text-white",
    disabled: "bg-blue-300 text-white cursor-not-allowed",
  },
  cancel: {
    enabled: "bg-gray-500 hover:bg-gray-600 text-white",
    disabled: "bg-gray-300 text-white cursor-not-allowed",
  },
  preview: {
    enabled: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  },
};

export function ActionButton({
  variant,
  block,
  label,
  onClick,
  icon,
  href,
  target,
  rel,
  disabled = false,
  tooltip,
  showBorder = true,
  className = "",
}: ActionButtonProps) {
  const store = usePageStore();

  // Default handlers for each variant
  const getDefaultHandler = () => {
    if (!block) return () => {};
    
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
  const isDisabled = disabled || (variant === "preview" && !href);
  const styles = VARIANT_STYLES[variant];
  const buttonClasses = `flex items-center justify-center gap-2 w-full rounded-lg px-4 py-2 font-medium transition-colors ${
    isDisabled ? styles.disabled : styles.enabled
  } ${className}`;

  const buttonContent = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  const buttonElement = href && !isDisabled ? (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      className={buttonClasses}
      aria-label={label}
      aria-disabled={isDisabled}
    >
      {buttonContent}
    </a>
  ) : (
    <button
      onClick={handleClick}
      className={buttonClasses}
      aria-label={label}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {buttonContent}
    </button>
  );

  const containerClasses = showBorder ? "pt-4 border-t border-gray-200" : "";

  return (
    <div className={`relative group ${containerClasses}`}>
      {buttonElement}
      {tooltip && isDisabled && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}
