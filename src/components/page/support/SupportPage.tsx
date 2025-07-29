import { useState, useEffect, useCallback } from "react";
import Header from "../../common/Header";
import CategoryFilter from "./components/CategoryFilter";
import GovernmentFundList from "./components/GovernmentFundList";
import { TitleAndDescription } from "../../common/TitleAndDescription";
import { getSupportPrograms } from "../../../api/mainSupport/suport";
import type { SupportProgram } from "../../../api/mainSupport/suport.type";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const response = await getSupportPrograms(selectedCategory, page, 10);
      const newPrograms = response.content;

      if (newPrograms.length === 0) {
        setHasMore(false);
      } else {
        setPrograms((prev) => [...prev, ...newPrograms]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("추가 데이터 로딩 실패:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [selectedCategory, page, hasMore, isLoadingMore]);

  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: hasMore && !isLoadingMore,
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPrograms([]);
    setPage(1);
    setHasMore(true);

    getSupportPrograms(selectedCategory, 1, 10)
      .then((res) => {
        setPrograms(res.content);
        setHasMore(res.content.length === 10);
        setPage(2);
      })
      .catch(() => setError("데이터를 불러오지 못했습니다."))
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
        <div className="flex items-start gap-2">
          <span className="font-semibold text-base w-[60px] flex-shrink-0 text-[#5F7280]">
            카테고리:
          </span>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold w-18 text-base text-[#5F7280]">
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
        <>
          <GovernmentFundList
            funds={mappedFunds}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            isLoadingMore={isLoadingMore}
          />
          {hasMore && (
            <div
              ref={observerRef}
              className="w-full h-10 flex items-center justify-center"
            ></div>
          )}
        </>
      )}
    </div>
  );
}
