import GovernmentFundCard from "./GovernmentFundCard";
import { useEffect, useState } from "react";
import { getSupportPrograms } from "../../../../api/mainSupport/suport";
import type { SupportProgram } from "../../../../api/mainSupport/suport.type";

const MainGovernmentFund = () => {
  const [funds, setFunds] = useState<SupportProgram[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFunds = async () => {
      setLoading(true);
      try {
        const res = await getSupportPrograms("전체", 1, 8); // 8개만 표시
        setFunds(res.content);
      } catch (e) {
        setFunds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFunds();
  }, []);

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
        {loading ? (
          <div className="col-span-full text-center">로딩 중...</div>
        ) : funds.length === 0 ? (
          <div className="col-span-full text-center">지원사업이 없습니다.</div>
        ) : (
          funds.map((fund, id) => (
            <GovernmentFundCard
              key={id}
              title={fund.title}
              organizingBody={fund.organizationName}
              supportField={fund.supportField}
              receptionEndDate={fund.receptionEndDate}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MainGovernmentFund;
