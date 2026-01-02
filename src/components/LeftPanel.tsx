import { useState } from "react";
import { AddBlocksPanel } from "./AddBlocksPanel";
// import { ReorderBlocksPanel } from "./ReorderBlocksPanel"; // Kept for potential future use
import { TabNavigation } from "./reusable-components/TabNavigation";
import { ActionButton } from "./reusable-components/ActionButton";
import { usePageStore } from "../store/usePageStore";
import { Eye, ArrowCounterClockwise, ArrowClockwise } from "@phosphor-icons/react";

const FONT_OPTIONS = [
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Playfair", value: "'Playfair Display', serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
];

export function LeftPanel() {
  const [activeTab, setActiveTab] = useState<"add">("add");
  const page = usePageStore((s) => s.page);
  const globalStyles = usePageStore((s) => s.globalStyles);
  const setFontFamily = usePageStore((s) => s.setFontFamily);
  const undo = usePageStore((s) => s.undo);
  const redo = usePageStore((s) => s.redo);
  const canUndo = usePageStore((s) => s.canUndo());
  const canRedo = usePageStore((s) => s.canRedo());
  
  const canPreview = page.length > 2;

  const handlePreviewClick = (e?: React.MouseEvent<HTMLElement>) => {
    if (!canPreview) {
      e?.preventDefault();
      return;
    }
    // Ensure current state is saved to localStorage before opening preview
    try {
      localStorage.setItem(
        "page-builder-state",
        JSON.stringify({ page, globalStyles })
      );
    } catch (error) {
      console.error("Failed to save state before preview:", error);
    }
  };

  type TabType = "add"; // "reorder" removed - drag handles now in Canvas

  const tabs = [
    { id: "add" as TabType, label: "Add" },
    // Reorder tab removed - drag handles now appear on hover in Canvas
  ];

  return (
    <div className="w-80 border-r bg-white sticky top-0 h-screen overflow-hidden flex flex-col">
      <div className="p-3 bg-white border-b border-gray-200 flex-shrink-0">
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div 
          id="add-panel" 
          role="tabpanel" 
          aria-labelledby="add-tab"
          aria-hidden="false"
        >
          <AddBlocksPanel />
        </div>
        {/* Reorder panel removed - drag handles now appear on hover in Canvas */}
      </div>
      <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          History
        </h3>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors flex items-center justify-center gap-2 ${
              canUndo
                ? "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
            title="Undo (Ctrl+Z)"
          >
            <ArrowCounterClockwise size={16} />
            <span>Undo</span>
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo}
            className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors flex items-center justify-center gap-2 ${
              canRedo
                ? "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
            title="Redo (Ctrl+Shift+Z or Ctrl+Y)"
          >
            <ArrowClockwise size={16} />
            <span>Redo</span>
          </button>
        </div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Global Styles
        </h3>
        <div className="flex gap-2">
          {FONT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFontFamily(option.value)}
              className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                globalStyles.fontFamily === option.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {/* Preview Button - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <ActionButton
          variant="preview"
          label="Preview"
          icon={<Eye size={20} />}
          href={canPreview ? "/preview" : undefined}
          target={canPreview ? "_blank" : undefined}
          rel={canPreview ? "noopener noreferrer" : undefined}
          onClick={handlePreviewClick}
          disabled={!canPreview}
          tooltip={!canPreview ? "Add at least 2 blocks to preview it." : undefined}
          showBorder={false}
          className="w-full"
        />
      </div>
    </div>
  );
}

