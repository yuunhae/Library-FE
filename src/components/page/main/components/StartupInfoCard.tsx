import React from "react";
import { LuDownload } from "react-icons/lu";

interface StartupInfoCardProps {
  tag: string;
  tagColor?: string;
  date: string;
  title: string;
  org: string;
  desc: string;
  buttonType: "download" | "detail";
  onButtonClick?: () => void;
}

const StartupInfoCard: React.FC<StartupInfoCardProps> = ({
  tag,
  tagColor = "bg-[#E5EDFF] text-[#3578FF]", // 기본값: 파랑
  date,
  title,
  org,
  desc,
  buttonType,
  onButtonClick,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 flex flex-col min-w-0 min-h-[180px] shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-3 py-1 rounded font-medium text-xs ${tagColor}`}>
          {tag}
        </span>
        <span className="text-[#888] text-xs font-medium">{date}</span>
      </div>
      <div className="text-lg font-bold mb-1">{title}</div>
      <div className="text-[#888] text-sm font-semibold mb-1">{org}</div>
      <div className="text-[#888] text-sm mb-4">{desc}</div>
      {buttonType === "download" ? (
        <button
          className="flex items-center gap-1 px-4 py-2 bg-[#222] text-white rounded-md text-sm font-medium w-fit mt-auto"
          onClick={onButtonClick}
        >
          <span className="material-symbols-outlined text-base">
            <LuDownload />
          </span>
          다운로드
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-[#3578FF] text-white rounded-md text-sm font-medium w-fit mt-auto"
          onClick={onButtonClick}
        >
          자세히보기
        </button>
      )}
    </div>
  );
};

export default StartupInfoCard;
