import React from "react";

interface GovernmentFundCardProps {
  title: string;
  description: string;
  category: string[];
  status: string;
  dday: string;
  endDate: string;
  detail: string;
  target: string;
  field: string;
  organizingBody: string;
  dateRange?: string;
}

const statusBadgeColor = {
  모집중: "bg-green-100 text-green-600 border-green-200",
  마감임박: "bg-yellow-100 text-yellow-700 border-yellow-200",
  마감: "bg-red-100 text-red-500 border-red-200",
};

type StatusType = keyof typeof statusBadgeColor;

const GovernmentFundCard = ({
  title,
  description,
  category,
  status,
  dday,
  endDate,
  detail,
  target,
  field,
  organizingBody,
  dateRange,
}: GovernmentFundCardProps) => {
  const badgeClass =
    statusBadgeColor[status as StatusType] ||
    "bg-gray-100 text-gray-400 border-gray-200";
  return (
    <div className="m-6 border rounded-xl p-6 bg-white shadow flex flex-col gap-3 min-h-[300px] justify-between">
      {/* 상단: 제목, 기관, 상태 뱃지 */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-xl mb-1">{title}</h3>
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded mb-1">
            {organizingBody}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded border ${badgeClass}`}
          >
            {dday}
          </span>
        </div>
      </div>
      {/* 설명 */}
      <div className="text-sm text-gray-700 mb-1">{description}</div>

      {/* 지원대상, 분야, 날짜 */}
      <div className="flex flex-col gap-1 mt-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">지원대상</span>{" "}
          <span className="text-black font-medium">{target}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">분야</span>{" "}
          <span className="text-green-600 font-medium">{field}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">
            {dateRange ? "접수일" : "마감일"}
          </span>{" "}
          <span className="text-red-500 font-medium">
            {dateRange || endDate}
          </span>
        </div>
      </div>
      {/* 상세 설명 */}
      {detail && <div className="text-xs text-gray-500 mt-1">{detail}</div>}
      {/* 하단 버튼 */}
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg text-base font-semibold hover:bg-blue-600 transition">
        자세히 보기
      </button>
    </div>
  );
};

export default GovernmentFundCard;
