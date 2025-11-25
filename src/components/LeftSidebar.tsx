import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ReorderTab } from "./ReorderTab";
import { TabNavigation } from "./editor-fields/TabNavigation";
import { usePageStore } from "../store/usePageStore";
import { Eye } from "phosphor-react";

const FONT_OPTIONS = [
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Playfair", value: "'Playfair Display', serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
];

export function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<"add" | "reorder">("add");
  const page = usePageStore((s) => s.page);
  const globalStyles = usePageStore((s) => s.globalStyles);
  const setFontFamily = usePageStore((s) => s.setFontFamily);
  
  const canPreview = page.length > 2;

  const handlePreviewClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canPreview) {
      e.preventDefault();
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

  type TabType = "add" | "reorder";

  const tabs = [
    { id: "add" as TabType, label: "Add" },
    { id: "reorder" as TabType, label: "Reorder" },
  ];

  return (
    <div className="w-80 border-r bg-white sticky top-0 h-screen overflow-hidden flex flex-col">
      <div className="p-3 bg-white border-b border-gray-200 flex-shrink-0">
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeTab === "add" && (
          <div id="add-block-panel" role="tabpanel" aria-labelledby="add-tab">
            <Sidebar />
          </div>
        )}
        {activeTab === "reorder" && (
          <div id="reorder-block-panel" role="tabpanel" aria-labelledby="reorder-tab">
            <ReorderTab />
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
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
        <div className="relative group">
          <a
            href={canPreview ? "/preview" : "#"}
            target={canPreview ? "_blank" : undefined}
            rel={canPreview ? "noopener noreferrer" : undefined}
            onClick={handlePreviewClick}
            className={`
              flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg transition-colors shadow-lg
              ${canPreview 
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
            aria-label={canPreview ? "Open preview in new tab" : "Add at least 2 blocks to preview"}
            aria-disabled={!canPreview}
          >
            <Eye size={20} />
            <span>Preview</span>
          </a>
          {!canPreview && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Add at least 2 blocks to preview it.
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                <div className="border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

