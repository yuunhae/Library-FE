import { useState } from "react";
import Header from "../../../common/Header";
import { governmentFundList } from "../../../../mocks/governmentFund";
import CategoryFilter from "./CategoryFilter";
import GovernmentFundList from "./GovernmentFundList";
import { TitleAndDescription } from "../../../common/TitleAndDescription";

const categories = [
  "전체",
  "자금지원",
  "멘토링",
  "공간지원",
  "교육프로그램",
  "해외진출",
];
const statuses = ["전체", "모집중", "마감임박"];

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState("전체");

  return (
    <div className="w-full text-left">
      <Header />
      <TitleAndDescription
        title="정부지원사업"
        description="현재 진행 중인 정부지원사업을 확인하세요."
      />
      <div className=" my-4 mx-12 flex flex-col sm:flex-colum gap-4 items-start sm:items-left">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base text-[#5F7280]">
            카테고리:
          </span>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base text-[#5F7280]">
            공고상태:
          </span>
          <CategoryFilter
            categories={statuses}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />
        </div>
      </div>
      <GovernmentFundList
        funds={governmentFundList}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
      />
    </div>
  );
}
