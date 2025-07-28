import GovernmentFundCard from "./GovernmentFundCard";

interface Fund {
  id: number;
  title: string;
  content: string;
  supportTarget: string;
  supportField: string;
  receptionStartDate: string;
  receptionEndDate: string;
  detailUrl: string;
  organizationName: string;
  category: string[]; // 카테고리 추가
}

interface GovernmentFundListProps {
  funds: Fund[];
  selectedCategory: string;
  selectedStatus: string;
}

const getStatusAndDday = (receptionEndDate: string) => {
  // YYYYMMDD 형식 처리
  let formattedDate = receptionEndDate;
  if (receptionEndDate && receptionEndDate.length === 8) {
    formattedDate = `${receptionEndDate.slice(0, 4)}-${receptionEndDate.slice(4, 6)}-${receptionEndDate.slice(6, 8)}`;
  }
  if (!formattedDate || isNaN(new Date(formattedDate).getTime())) {
    return { status: "마감일 미정", dday: "미정" };
  }
  const today = new Date();
  const end = new Date(formattedDate);
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
    filtered = filtered.filter(
      (f) => getStatusAndDday(f.receptionEndDate).status === selectedStatus
    );
  }

  return (
    <div className="flex flex-wrap md:mt-8 gap-4 m-4 justify-center">
      {" "}
      {filtered.map((fund) => {
        const { status, dday } = getStatusAndDday(fund.receptionEndDate);
        return (
          <GovernmentFundCard
            key={fund.id}
            title={fund.title}
            content={fund.content}
            supportTarget={fund.supportTarget}
            supportField={fund.supportField}
            organizationName={fund.organizationName}
            receptionStartDate={fund.receptionStartDate}
            receptionEndDate={fund.receptionEndDate}
            detailUrl={fund.detailUrl}
            status={status}
            dday={dday}
          />
        );
      })}
    </div>
  );
};

export default GovernmentFundList;
