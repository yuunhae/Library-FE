import StartupInfoCard from "./StartupInfoCard";
import { useEffect, useState } from "react";
import { fetchStartupNews } from "../../../../api/mainStartupNews/startupNews";
import type { StartupNewsItem } from "../../../../api/mainStartupNews/startupNews.type";

const MainStartupInformation = () => {
  const [startupNews, setStartupNews] = useState<StartupNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchStartupNews(0, 8);
        setStartupNews(data.content);
      } catch (e) {
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getData();
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
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          실시간 창업 정보
        </h2>
        <button className="text-[#3578FF] text-sm sm:text-base font-medium">
          전체보기
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          startupNews
            .slice(0, 4)
            .map((item, idx) => (
              <StartupInfoCard key={idx} {...mapToCardProps(item)} />
            ))
        )}
      </div>
    </section>
  );
};

export default MainStartupInformation;
