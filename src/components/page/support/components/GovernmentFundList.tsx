import GovernmentFundCard from "./GovernmentFundCard";

interface Fund {
  id: number;
  title: string;
  description: string;
  category: string[];
  status: string;
  dday: string;
  endDate: string;
  detail: string;
}

interface GovernmentFundListProps {
  funds: Fund[];
  selectedCategory: string;
  selectedStatus: string;
}

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map((fund) => (
        <GovernmentFundCard key={fund.id} {...fund} />
      ))}
    </div>
  );
};

export default GovernmentFundList;
