import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ReorderTab } from "./ReorderTab";
import { TabNavigation } from "./editor-fields/TabNavigation";

export function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<"add" | "reorder">("add");

  type TabType = "add" | "reorder";

  const tabs = [
    { id: "add" as TabType, label: "Add" },
    { id: "reorder" as TabType, label: "Reorder" },
  ];

  return (
    <div className="w-80 border-r bg-white sticky top-0 h-screen overflow-y-auto flex flex-col">
      <div className="p-3 bg-white border-b border-gray-200">
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
    </div>
  );
}

