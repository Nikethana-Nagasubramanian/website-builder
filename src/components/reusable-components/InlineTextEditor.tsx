// src/components/reusable-components/InlineTextEditor.tsx
import { useState, useEffect, useRef } from "react";

type InlineTextEditorProps = {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  tagName?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
};

export function InlineTextEditor({ 
  value, 
  onSave, 
  className = "", 
  tagName: Tag = "div" 
}: InlineTextEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLElement>(null);
  
  // Use a ref to track the value without triggering re-renders while typing
  const valueRef = useRef(value);

  // Sync initial value and handle external updates (like Undo/Redo)
  useEffect(() => {
    if (editorRef.current && !isEditing) {
      editorRef.current.innerText = value;
      valueRef.current = value;
    }
  }, [value, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const newValue = editorRef.current?.innerText || "";
    if (newValue !== value) {
      onSave(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      editorRef.current?.blur();
    }
    if (e.key === "Escape") {
      if (editorRef.current) editorRef.current.innerText = value; // Revert DOM
      editorRef.current?.blur();
    }
  };

  return (
    <Tag
      ref={editorRef as any}
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none transition-all duration-200 ${
        isEditing 
          ? "ring-2 ring-[#99EEFF] rounded-sm bg-white/5 px-1 -mx-1" 
          : "hover:bg-black/5 rounded-sm cursor-text"
      }`}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPointerDown={(e) => e.stopPropagation()}
    /> 
  );
}