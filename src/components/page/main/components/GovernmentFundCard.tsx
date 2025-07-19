import React from "react";

interface GovernmentFundCardProps {
  title: string;
  organizingBody: string;
  supportField: string;
  receptionEndDate: string;
}

const formatDate = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 8) return dateStr;
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
};

const splitTitle = (title: string) => {
  if (title.length <= 18) return [title];
  const slice = title.slice(0, 18);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace === -1) return [title];
  return [title.slice(0, lastSpace), title.slice(lastSpace + 1)];
};

const GovernmentFundCard: React.FC<GovernmentFundCardProps> = ({
  title,
  organizingBody,
  supportField,
  receptionEndDate,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col min-w-0 min-h-[120px] shadow-sm">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="text-base font-semibold">
          {splitTitle(title).map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx === 0 && splitTitle(title).length > 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </div>
        <div className="text-xs bg-[#e8f0fe] text-[#3578FF] px-2 py-1 rounded font-medium">
          {organizingBody}
        </div>
      </div>
      <div className="flex flex-col justify-between mt-auto">
        <div>
          <div className="text-sm text-[#222] font-normal flex justify-between">
            지원규모
            <span
              className="text-[#1db954] font-medium truncate max-w-[120px] inline-block align-bottom"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {supportField}
            </span>
          </div>
          <div className="text-sm text-[#222] font-normal mt-1 flex justify-between">
            마감일
            <span className="text-[#ef4444] font-medium">
              {formatDate(receptionEndDate)}
            </span>
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
