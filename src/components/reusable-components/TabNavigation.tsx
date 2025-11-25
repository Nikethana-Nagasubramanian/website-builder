type TabNavigationProps<T extends string> = {
  tabs: { id: T; label: string }[];
  activeTab: T;
  setActiveTab: (tab: T) => void;
};

export function TabNavigation<T extends string>({
  tabs,
  activeTab,
  setActiveTab,
}: TabNavigationProps<T>) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 relative" role="tablist" aria-label="Editor tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
          className={`flex-1 px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out rounded-md relative z-10 ${
            activeTab === tab.id
              ? "text-gray-900 bg-white shadow-sm"
              : "text-gray-700 bg-gray-100 hover:text-gray-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

