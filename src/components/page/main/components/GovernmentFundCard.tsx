import React from "react";

interface GovernmentFundCardProps {
  title: string;
  organizingBody: string;
  field: string;
  endDate: string;
}

const GovernmentFundCard: React.FC<GovernmentFundCardProps> = ({
  title,
  organizingBody,
  field,
  endDate,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col min-w-0 min-h-[120px] shadow-sm">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="text-base font-semibold">{title}</div>
        <div className="text-xs bg-[#e8f0fe] text-[#3578FF] px-2 py-1 rounded font-medium">
          {organizingBody}
        </div>
      </div>
      <div className="flex flex-col justify-between mt-auto">
        <div>
          <div className="text-sm text-[#222] font-normal flex justify-between">
            지원규모
            <span className="text-[#1db954] font-medium">{field}</span>
          </div>
          <div className="text-sm text-[#222] font-normal mt-1 flex justify-between">
            마감일
            <span className="text-[#ef4444] font-medium">{endDate}</span>
          </div>
        </div>
      </div>
      <button className="w-full mt-3 py-1.5 bg-[#f3f4f6] rounded text-[#666] text-sm font-medium">
        자세히 보기
      </button>
    </div>
  );
};

export default GovernmentFundCard;
