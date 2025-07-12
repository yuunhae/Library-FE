import React from "react";

interface TabProps {
  tabs: string[];
  selected: number;
  onSelect: (idx: number) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 m-5">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          onClick={() => onSelect(idx)}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
            selected === idx
              ? "bg-[#3578FF] text-white border-[#3578FF]"
              : "bg-white text-[#222] border-[#e5e7eb] hover:border-[#3578FF]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tab;
