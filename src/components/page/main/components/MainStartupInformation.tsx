import React from "react";
import StartupInfoCard from "./StartupInfoCard";
import { startupInformation } from "../../../../mocks/startupInformation";

const MainStartupInformation = () => {
  return (
    <section className="w-full bg-white min-h-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          실시간 창업 정보
        </h2>
        <button className="text-[#3578FF] text-sm sm:text-base font-medium">
          전체보기
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {startupInformation.map((info, idx) => (
          <StartupInfoCard key={idx} {...info} />
        ))}
      </div>
    </section>
  );
};

export default MainStartupInformation;
