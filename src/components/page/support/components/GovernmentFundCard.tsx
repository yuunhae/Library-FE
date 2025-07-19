import React from "react";

interface GovernmentFundCardProps {
  title: string;
  content: string;
  supportTarget: string;
  supportField: string;
  organizationName: string;
  receptionStartDate: string;
  receptionEndDate: string;
  detailUrl: string;
  status: string;
  dday: string;
}

const GovernmentFundCard: React.FC<GovernmentFundCardProps> = ({
  title,
  content,
  supportTarget,
  supportField,
  organizationName,
  receptionStartDate,
  receptionEndDate,
  detailUrl,
  status,
  dday,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col min-w-0 min-h-[120px] shadow-sm">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="text-base font-semibold">{title}</div>
        {status === "마감" ? (
          <div className="text-xs bg-[#FFE2E1] text-[#AA262B] px-2 py-1 rounded font-medium inline-block ml-2">
            마감
          </div>
        ) : Number(dday.replace(/[^0-9]/g, "")) >= 10 ? (
          <div className="text-xs bg-[#EFF9EF] text-[#228B22] px-2 py-1 rounded font-medium inline-block ml-2">
            {dday}
          </div>
        ) : (
          <div className="text-xs bg-[#FEF9C2] text-[#A57531] px-2 py-1 rounded font-medium inline-block ml-2">
            {dday}
          </div>
        )}
      </div>
      <div className="w-fit text-xs bg-[#e8f0fe] text-[#3578FF] px-2 py-1 rounded font-medium">
        {organizationName}
      </div>
      <div className="text-sm text-[#222] font-normal mb-2">{content}</div>
      <div className="flex flex-col justify-between mt-auto">
        <div>
          <div className="text-sm text-[#222] font-normal flex justify-between">
            지원대상
            <span className="text-[#1db954] font-medium truncate max-w-[120px] inline-block align-bottom overflow-hidden whitespace-nowrap">
              {supportTarget}
            </span>
          </div>
          <div className="text-sm text-[#222] font-normal flex justify-between">
            지원분야
            <span className="text-[#1db954] font-medium truncate max-w-[120px] inline-block align-bottom">
              {supportField}
            </span>
          </div>
          <div className="text-sm text-[#222] font-normal mt-1 flex justify-between">
            접수기간
            <span className="text-[#ef4444] font-medium">
              {receptionStartDate} ~ {receptionEndDate}
            </span>
          </div>
        </div>
      </div>
      <a
        href={detailUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-3 py-1.5 bg-[#f3f4f6] rounded text-[#666] text-sm font-medium text-center block"
      >
        자세히 보기
      </a>
    </div>
  );
};

export default GovernmentFundCard;
