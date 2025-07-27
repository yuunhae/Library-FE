import React from "react";
import { Link } from "react-router-dom";

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
    <Link to={detailUrl}>
      <div className="relative bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col min-w-0 min-h-[120px] shadow-sm gap-2 group cursor-pointer transition-all duration-300 hover:shadow-lg">
        {/* 호버 시 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-xl transition-all duration-300 z-10"></div>

        {/* 호버 시 content 오버레이 */}
        <div className="absolute inset-0 flex p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <div className=" rounded-lg p-4 max-w-full max-h-full overflow-y-auto shadow-lg">
            <div className="text-m text-white font-normal leading-relaxed">
              {content}
            </div>
          </div>
        </div>

        {/* 기존 카드  */}
        <div className="flex flex-row justify-between items-center mb-2 relative z-0">
          <div className="text-base font-semibold">{title}</div>
          {status === "마감" ? (
            <div className="text-xs bg-[#FFE2E1] text-[#AA262B] px-2 py-1 rounded font-medium inline-block ml-2 w-11">
              마감
            </div>
          ) : Number(dday.replace(/[^0-9]/g, "")) >= 10 ? (
            <div className="text-xs bg-[#EFF9EF] text-[#228B22] px-2 py-1 rounded font-medium inline-block ml-2 w-11">
              {dday}
            </div>
          ) : (
            <div className="text-xs bg-[#FEF9C2] text-[#A57531] px-2 py-1 rounded font-medium inline-block ml-2 w-11">
              {dday}
            </div>
          )}
        </div>
        <div className="w-fit text-xs bg-[#e8f0fe] text-[#3578FF] px-2 py-1 rounded font-medium relative z-0">
          {organizationName}
        </div>
        <div className="flex flex-col justify-between mt-auto relative z-0">
          <div>
            <div className="text-sm text-[#222] font-normal flex justify-between">
              지원대상
              <span className="text-[#1db954] font-medium truncate max-w-[400px] inline-block align-bottom overflow-hidden whitespace-nowrap">
                {supportTarget}
              </span>
            </div>
            <div className="text-sm text-[#222] font-normal flex justify-between">
              지원분야
              <span className="text-[#1db954] font-medium truncate max-w-[400px] inline-block align-bottom">
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
      </div>
    </Link>
  );
};

export default GovernmentFundCard;
