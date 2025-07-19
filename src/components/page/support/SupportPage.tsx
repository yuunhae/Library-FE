import { useState, useEffect } from "react";
import Header from "../../common/Header";
import CategoryFilter from "./components/CategoryFilter";
import GovernmentFundList from "./components/GovernmentFundList";
import { TitleAndDescription } from "../../common/TitleAndDescription";
import { getSupportPrograms } from "../../../api/mainSupport/suport";
import type { SupportProgram } from "../../../api/mainSupport/suport.type";

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
  const [programs, setPrograms] = useState<SupportProgram[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSupportPrograms(selectedCategory)
      .then((res) => setPrograms(res.content))
      .catch((e) => setError("데이터를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const mappedFunds = programs.map((p, idx) => ({
    id: idx + 1,
    title: p.title,
    content: p.content,
    supportTarget: p.supportTarget,
    supportField: p.supportField,
    receptionStartDate: p.receptionStartDate,
    receptionEndDate: p.receptionEndDate,
    detailUrl: p.detailUrl,
    organizationName: p.organizationName,
    category: [selectedCategory],
  }));

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
      {loading ? (
        <div className="text-center w-full py-10">불러오는 중...</div>
      ) : error ? (
        <div className="text-center w-full py-10 text-red-500">{error}</div>
      ) : (
        <GovernmentFundList
          funds={mappedFunds}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
        />
      )}
    </div>
  );
}
