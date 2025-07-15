import React from "react";
import GovernmentFundCard from "./GovernmentFundCard";

interface Fund {
  id: number;
  title: string;
  description: string;
  category: string[];
  status?: string;
  dday?: string;
  endDate: string;
  detail?: string;
  target: string;
  field: string;
  dateRange?: string;
  organizingBody?: string;
}

interface GovernmentFundListProps {
  funds: Fund[];
  selectedCategory: string;
  selectedStatus: string;
}

const getStatusAndDday = (endDate: string) => {
  const today = new Date();
  const end = new Date(endDate);
  // 시간 차이(밀리초)
  const diff = end.getTime() - today.setHours(0, 0, 0, 0);
  const dday = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (dday < 0) {
    return { status: "마감", dday: "마감" };
  } else if (dday === 0) {
    return { status: "마감임박", dday: `D-Day` };
  } else if (dday < 10) {
    return { status: "마감임박", dday: `D-${dday}` };
  } else {
    return { status: "모집중", dday: `D-${dday}` };
  }
};

const GovernmentFundList = ({
  funds,
  selectedCategory,
  selectedStatus,
}: GovernmentFundListProps) => {
  let filtered =
    selectedCategory === "전체"
      ? funds
      : funds.filter((f) => f.category.includes(selectedCategory));

  if (selectedStatus !== "전체") {
    filtered = filtered.filter((f) => f.status === selectedStatus);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {filtered.map((fund) => {
        const { status, dday } = getStatusAndDday(fund.endDate);
        const dateRange = fund.dateRange || fund.endDate;
        return (
          <GovernmentFundCard
            key={fund.id}
            title={fund.title}
            description={fund.description}
            category={fund.category}
            status={status}
            dday={dday}
            endDate={fund.endDate}
            detail={fund.detail || ""}
            target={fund.target}
            field={fund.field}
            organizingBody={fund.organizingBody || ""}
            dateRange={dateRange}
          />
        );
      })}
    </div>
  );
};

export default GovernmentFundList;
