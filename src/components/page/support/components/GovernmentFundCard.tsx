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
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col w-auto h-auto md:w-[720px] md:h-[310px] shadow-sm gap-2 group cursor-pointer transition-all duration-300 hover:shadow-lg">
        {" "}
        <div className="flex flex-row justify-between items-start mb-2 relative z-0">
          <div className="text-base font-semibold flex-1 break-words mr-2">
            {title}
          </div>
          {status === "마감" ? (
            <div className="text-xs bg-[#FFE2E1] text-[#AA262B] px-2 py-1 rounded font-medium flex-shrink-0 w-11 flex justify-center items-center">
              마감
            </div>
          ) : Number(dday.replace(/[^0-9]/g, "")) >= 10 ? (
            <div className="text-xs bg-[#EFF9EF] text-[#228B22] px-2 py-1 rounded font-medium flex-shrink-0 w-11 flex justify-center items-center">
              {dday}
            </div>
          ) : (
            <div className="text-xs bg-[#FEF9C2] text-[#A57531] px-2 py-1 rounded font-medium flex-shrink-0 w-11 flex justify-center items-center">
              {dday}
            </div>
          )}
        </div>
        <div className="w-fit text-xs bg-[#e8f0fe] text-[#3578FF] px-2 py-1 rounded font-medium relative z-0">
          {organizationName}
        </div>
        <div className="text-sm text-[#222] font-normal flex justify-start items-center">
          {content}
        </div>
        <div className="flex flex-col justify-between mt-auto relative z-0 gap-4">
          <div className="flex flex-col gap-2 h-310h">
            <div className="text-sm text-[#222] font-normal flex justify-between">
              지원대상
              <span className="text-[#111827] font-medium truncate max-w-[200px] md:max-w-[450px] inline-block align-bottom overflow-hidden whitespace-nowrap">
                {supportTarget}
              </span>
            </div>
            <div className="text-sm text-[#222] font-normal flex justify-between">
              지원분야
              <span className="text-[#1db954] font-medium truncate max-w-[200px] md:max-w-[450px] inline-block align-bottom">
                {supportField}
              </span>
            </div>
            <div className="text-sm text-[#222] font-normal flex justify-between">
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
