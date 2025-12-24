// src/components/reusable-components/Tooltip.tsx
import { useState, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  children: ReactNode;
  content: string;
  disabled?: boolean;
};

export function Tooltip({ children, content, disabled }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!triggerRef.current || disabled) return;
    
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
    setIsHovered(true);
  };

  return (
    <>
      <div 
        ref={triggerRef} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={() => setIsHovered(false)}
        className="inline-block" // Ensures it only takes up the space of the child
      >
        {children}
      </div>

      {isHovered && !disabled && createPortal(
        <div 
          className="fixed z-[9999] px-3 py-2 rounded-md text-sm bg-gray-900 text-white shadow-xl pointer-events-none whitespace-nowrap"
          style={{
            top: `${coords.top - 8}px`,
            left: `${coords.left}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
        </div>,
        document.body
      )}
    </>
  );
}