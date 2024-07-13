import { useEffect, useRef, useState } from "react";

interface Tab {
  name: string;
  content: React.ReactNode;
}

interface TopNavtabProps {
  tabs: Tab[];
  isFixed?: boolean;
}

export default function TopNavtab({ tabs, isFixed = false }: TopNavtabProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const buttonClass = (tabName: string) =>
    `flex-1 border-b-2 px-4 py-2 transition-colors focus:outline-none ${
      activeTab === tabName
        ? "border-penni-main text-penni-main"
        : "border-transparent text-penni-grey-inactive hover:text-penni-main focus:border-penni-main focus:text-penni-main"
    }`;
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [paddingTop, setPaddingTop] = useState<number>(0);

  useEffect(() => {
    if (targetDivRef.current) {
      setPaddingTop(targetDivRef.current.offsetHeight);
    }
  }, []);
  return (
    <div className="relative flex w-full flex-col">
      <div
        ref={targetDivRef}
        className={`${isFixed ? "fixed top-0" : ""} z-40 flex w-full border-b bg-penni-background-light-mode`}
      >
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
      <div
        className="relative"
        style={{ paddingTop: `${isFixed ? paddingTop : 0}px` }}
      >
        {tabs.find((tab) => tab.name === activeTab)?.content}
      </div>
    </div>
  );
}
