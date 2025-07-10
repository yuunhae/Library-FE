import React from "react";
import { earlyStartupData } from "../../../../mocks/earlyStartupData";

const MainEarlyStartupData = () => {
  return (
    <section className="w-full bg-[#fafafa] min-h-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          초기 창업 실전 자료
        </h2>
        <button className="text-[#3578FF] text-sm sm:text-base font-medium">
          전체보기
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {earlyStartupData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#e5e7eb] p-5 flex flex-col min-w-0 min-h-[160px] shadow-sm"
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <div className="text-base sm:text-lg font-bold mb-1">
              {item.title}
            </div>
            <div className="text-sm text-[#666] mb-2">{item.type}</div>
            <div className="text-sm text-[#3578FF] font-medium mt-auto">
              조회수 {item.views.toLocaleString()}회
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainEarlyStartupData;
