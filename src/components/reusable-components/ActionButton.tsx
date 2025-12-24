import { usePageStore } from "../../store/usePageStore";
import { useState, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom"; // This is the "teleporter"

type ActionButtonVariant = "delete" | "save" | "cancel" | "preview" | "secondary";

type ActionButtonProps = {
  variant: ActionButtonVariant;
  block?: { id: string };
  label: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  icon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  tooltip?: string;
  showBorder?: boolean;
  className?: string;
};

const VARIANT_STYLES: Record<ActionButtonVariant, { enabled: string; disabled: string }> = {
  delete: { enabled: "bg-red-500 hover:bg-red-600 text-white", disabled: "bg-red-300 text-white cursor-not-allowed", }, 
  save: { enabled: "bg-blue-500 hover:bg-blue-600 text-white", disabled: "bg-blue-300 text-white cursor-not-allowed", }, 
  cancel: { enabled: "bg-gray-500 hover:bg-gray-600 text-white", disabled: "bg-gray-300 text-white cursor-not-allowed", }, 
  preview: { enabled: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg", disabled: "bg-gray-300 text-gray-500 cursor-not-allowed", },
  secondary: { enabled: "bg-blue-100 border border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50", disabled: "bg-gray-300 border-gray-300 text-gray-600 cursor-not-allowed", },
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
  
  // 1. State to track tooltip position and visibility
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      // 2. Measure exactly where the button is on the screen
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top, // Vertical start of button
        left: rect.left + rect.width / 2, // Horizontal center of button
      });
      setIsHovered(true);
    }
  };

  const getDefaultHandler = () => {
    if (!block) return () => { };
    switch (variant) {
      case "delete": return () => store.deleteBlock(block.id);
      case "cancel": return () => store.selectBlock(null);
      case "save": return () => console.log("Saving block:", block.id);
      default: return () => { };
    }
  };

  const handleClick = onClick || getDefaultHandler();
  const isDisabled = disabled || (variant === "preview" && !href);
  const styles = VARIANT_STYLES[variant];

  const buttonClasses = `
    inline-flex items-center justify-center 
    whitespace-nowrap text-sm font-medium
    h-8 px-3 gap-1.5 rounded-md
    transition-[background-color,color,box-shadow]
    focus-visible:ring-[3px] 
    focus-visible:ring-ring/50 
    focus-visible:border-ring 
    outline-none
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0 
    [&_svg:not([class*='size-'])]:size-4
    ${isDisabled ? styles.disabled : styles.enabled}
    ${className}
  `;

  const buttonContent = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  const buttonElement =
    href && !isDisabled ? (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={handleClick}
        aria-label={label}
        aria-disabled={isDisabled}
        className={buttonClasses}
      >
        {buttonContent}
      </a>
    ) : (
      <button
        onClick={handleClick}
        aria-label={label}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        className={buttonClasses}
      >
        {buttonContent}
      </button>
    );

  const containerClasses = showBorder ? "pt-4 border-t border-border" : "";

  return (
    <div 
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${containerClasses}`}
    >
      {buttonElement}

      {/* 3. The Portal: Teleporting the tooltip to document.body */}
      {tooltip && isDisabled && isHovered && createPortal(
        <div 
          className="fixed z-[9999] px-3 py-2 rounded-md text-sm bg-gray-900 text-white shadow-xl pointer-events-none whitespace-nowrap"
          style={{
            top: `${coords.top - 8}px`, // 8px gap above the button
            left: `${coords.left}px`,
            transform: 'translate(-50%, -100%)', // Centers it and pulls it above
          }}
        >
          {tooltip}
          {/* Optional: Little triangle arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
        </div>,
        document.body
      )}
    </div>
  );
}