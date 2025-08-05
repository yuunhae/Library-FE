import StartupInfoCard from "../../main/components/StartupInfoCard";
import { useEffect, useState, useCallback } from "react";
import { fetchStartupNews } from "../../../../api/mainStartupNews/startupNews";
import type { StartupNewsItem } from "../../../../api/mainStartupNews/startupNews.type";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

const StartupInformationList = () => {
  const [startupNews, setStartupNews] = useState<StartupNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const response = await fetchStartupNews(page, 8);
      const newNews = response.content || [];

      if (newNews.length === 0) {
        setHasMore(false);
      } else {
        setStartupNews((prev) => [...prev, ...newNews]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("추가 데이터 로딩 실패:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, hasMore, isLoadingMore]);

  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: hasMore && !isLoadingMore,
  });

  useEffect(() => {
    setLoading(true);
    setError("");
    setStartupNews([]);
    setPage(1);
    setHasMore(true);

    fetchStartupNews(1, 8)
      .then((res) => {
        setStartupNews(res.content || []);
        setHasMore((res.content || []).length === 8);
        setPage(2);
      })
      .catch(() => setError("데이터를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  const mapToCardProps = (item: StartupNewsItem) => {
    const buttonType = item.contentUrl
      ? ("download" as const)
      : ("detail" as const);
    return {
      tag: item.type || "정보",
      tagColor: "bg-[#E5EDFF] text-[#3578FF]", // 필요시 타입별 색상 매핑
      date: item.date,
      title: item.title,
      org: item.organization,
      desc: (item as any).content || "", // content 필드가 있으면 사용, 없으면 빈 문자열
      buttonType,
      onButtonClick: () => {
        if (buttonType === "download" && item.contentUrl) {
          window.open(item.contentUrl, "_blank");
        } else if (item.detailUrl) {
          const url = item.detailUrl.startsWith("http")
            ? item.detailUrl
            : `https://${item.detailUrl.replace(/^\//, "")}`;
          window.open(url, "_blank");
        }
      },
    };
  };

  return (
    <section className="w-full bg-white min-h-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            {startupNews.map((item, idx) => (
              <StartupInfoCard key={idx} {...mapToCardProps(item)} />
            ))}
            {isLoadingMore && (
              <div className="col-span-full text-center py-4">
                추가 로딩 중...
              </div>
            )}
            {hasMore && (
              <div
                ref={observerRef}
                className="col-span-full w-full h-10 flex items-center justify-center"
              ></div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default StartupInformationList;
