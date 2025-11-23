import { useState } from "react";
import { TabNavigation } from "../../components/editor-fields/TabNavigation";
import { DeleteButton } from "../../components/editor-fields/DeleteButton";
import { ContentTab } from "./ContentTab";
import { StylingTab } from "./StylingTab";
import { LayoutTab } from "./LayoutTab";

type TabType = "content" | "styling" | "layout";

type HeroSectionBlockEditorProps = {
  block: { id: string; props: any };
};

export function HeroSectionBlockEditor({ block }: HeroSectionBlockEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("content");

  const tabs = [
    { id: "content" as TabType, label: "Content" },
    { id: "styling" as TabType, label: "Styling" },
    { id: "layout" as TabType, label: "Layout" },
  ];

  return (
    <div className="space-y-4">
      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "content" && <ContentTab block={block} />}
      {activeTab === "styling" && <StylingTab block={block} />}
      {activeTab === "layout" && <LayoutTab block={block} />}

      <DeleteButton block={block} label="Delete Hero Section" />
    </div>
  );
}

