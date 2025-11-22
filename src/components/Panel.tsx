import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Inspector } from "./Inspector";

export function Panel() {
  const [activeTab, setActiveTab] = useState<"add" | "edit">("add");

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-lg">
      {/* Tab Headers - Segmented Control Style */}
      <div className="p-3 bg-white border-b border-gray-200">
        <div className="flex bg-gray-100 rounded-lg p-1 relative">
          <button
            onClick={() => setActiveTab("add")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md relative z-10 ${
              activeTab === "add"
                ? "text-gray-900 bg-white shadow-sm"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Add Block
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md relative z-10 ${
              activeTab === "edit"
                ? "text-gray-900 bg-white shadow-sm"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Edit Block
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "add" ? <Sidebar /> : <Inspector />}
      </div>
    </div>
  );
}