import React, { useState } from "react";

interface Tab {
  name: string;
  content: React.ReactNode;
}

interface TopNavtabProps {
  tabs: Tab[];
}

export default function TopNavtab({ tabs }: TopNavtabProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    console.log(`Active tab is now: ${tabName}`);
  };

  const buttonClass = (tabName: string) =>
    `flex-1 border-b-2 px-4 py-2 transition-colors focus:outline-none ${
      activeTab === tabName
        ? "border-penni-main text-penni-main"
        : "border-transparent text-penni-grey-inactive hover:text-penni-main focus:border-penni-main focus:text-penni-main"
    }`;

  return (
    <div className="flex w-full flex-col">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={buttonClass(tab.name)}
            onClick={() => handleTabClick(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs.find((tab) => tab.name === activeTab)?.content}
      </div>
    </div>
  );
}
