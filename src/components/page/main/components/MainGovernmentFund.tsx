import GovernmentFundCard from "./GovernmentFundCard";
import { governmentFundList } from "../../../../mocks/governmentFund";

const MainGovernmentFund = () => {
  return (
    <section className="w-full bg-[#fff] min-h-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          정부지원사업
        </h2>
        <button className="text-[#3578FF] text-sm sm:text-base font-medium">
          전체보기
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {governmentFundList.map((fund: any, id: number) => (
          <GovernmentFundCard
            key={id}
            title={fund.title}
            organizingBody={fund.organizingBody}
            field={fund.field}
            endDate={fund.endDate}
          />
        ))}
      </div>
    </section>
  );
};

export default MainGovernmentFund;
