import { useInView } from "react-intersection-observer";
import { useFetchLibListQuery } from "../../../../../api/bookDetail/libraryList/useFetchLibList";
import { useEffect } from "react";
import { LibraryCard } from "./components/libraryCard";

//도서관 정보
type LibraryListProps = {
  isbn: string;
  regionCode: string | null;
};

function LibraryList({ isbn, regionCode }: LibraryListProps) {
  const {
    data,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useFetchLibListQuery(isbn, regionCode || undefined);

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading]);

  if (isError) {
    return (
      <div>
        도서관 정보를 불러오는 데에 실패했습니다. 잠시 후 다시 시도해주세요
      </div>
    );
  }

  return (
    <section>
      {data && (
        <article className="space-y-3">
          <div className="space-y-3">
            {data.map((lib) => {
              // if (
              //   lib.address.includes(searchKeyword) ||
              //   lib.libName.includes(searchKeyword)
              // )
              return (
                <article ref={ref}>
                  <LibraryCard
                    key={lib.libCode}
                    libCode={lib.libCode}
                    libName={lib.libName}
                    address={lib.address}
                    tel={lib.tel}
                    operatingTime={lib.operatingTime}
                    isAvailable={lib.isAvailable}
                    LibLatitude={lib.latitude}
                    LibLongitude={lib.longitude}
                  />
                </article>
              );
            })}
          </div>
          {isFetchingNextPage && "로드중"}
          {!hasNextPage && "마지막 페이지 입니다."}
        </article>
      )}
    </section>
  );
}

export default LibraryList;
