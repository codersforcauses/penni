import React, { useState } from "react";

const TopNavtab = () => {
  const [activeTab, setActiveTab] = useState("Task Details");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Add your custom logic here
    console.log(`Active tab is now: ${tab}`);
  };

  return (
    <div className="flex w-full border-b">
      <button
        className={`flex-1 border-b-2 px-4 py-2 focus:outline-none ${
          activeTab === "Task Details"
            ? "border-penni-main text-penni-main"
            : "border-transparent text-penni-grey-inactive hover:text-penni-main focus:border-penni-main focus:text-penni-main"
        }`}
        onClick={() => handleTabClick("Task Details")}
      >
        Task Details
      </button>
      <button
        className={`flex-1 border-b-2 px-4 py-2 focus:outline-none ${
          activeTab === "Other Details"
            ? "border-blue-500 text-penni-main"
            : "border-transparent text-penni-grey-inactive hover:text-penni-main focus:border-penni-main focus:text-penni-main"
        }`}
        onClick={() => handleTabClick("Other Details")}
      >
        Other Details
      </button>
    </div>
  );
};

export default TopNavtab;
