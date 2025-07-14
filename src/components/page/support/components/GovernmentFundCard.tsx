interface GovernmentFundCardProps {
  title: string;
  description: string;
  category: string[];
  status: string;
  dday: string;
  endDate: string;
  detail: string;
}

const GovernmentFundCard = ({
  title,
  description,
  category,
  status,
  dday,
  endDate,
  detail,
}: GovernmentFundCardProps) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="text-xs text-green-600 font-semibold">{dday}</span>
      </div>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="flex flex-wrap gap-1 mt-1">
        {category.map((cat) => (
          <span
            key={cat}
            className="bg-gray-100 text-xs px-2 py-0.5 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-blue-600 font-semibold">{status}</span>
        <span className="text-xs text-gray-400">{endDate}</span>
      </div>
      <div className="text-xs text-gray-500 mt-1">{detail}</div>
      <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition">
        자세히 보기
      </button>
    </div>
  );
};

export default GovernmentFundCard;
