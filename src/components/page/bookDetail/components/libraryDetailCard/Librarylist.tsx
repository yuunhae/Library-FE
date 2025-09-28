import { useInView } from "react-intersection-observer";
import { useFetchLibListQuery } from "../../../../../api/bookDetail/libraryList/useFetchLibList";
import { useEffect } from "react";
// import { MiniLoadingSpinner } from "../../../../common/LoadingSpinner";
import LibrarySkeleton from "./LibrarySkeleton";
import { LibraryCard } from "./components/libraryCard";

//도서관 정보
type LibraryListProps = {
  isbn: string;
  regionCode: string | null;
  searchKeyword: string;
};

function LibraryList({ isbn, regionCode, searchKeyword }: LibraryListProps) {
  const {
    data,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useFetchLibListQuery(isbn, regionCode || undefined);

  const { ref, inView } = useInView({
    rootMargin: "0px 0px 800px 0px",
    triggerOnce: true,
  });

  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isLoading &&
      !searchKeyword
    ) {
      fetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    searchKeyword,
  ]);

  if (isError) {
    return (
      <div>
        도서관 정보를 불러오는 데에 실패했습니다. 잠시 후 다시 시도해주세요
      </div>
    );
  }

  return (
    <section>
      {isLoading ? (
        <LibrarySkeleton />
      ) : (
        data && (
          <article className="space-y-3">
            <div className="space-y-3">
              {data
                .filter((lib) => lib && lib.address && lib.libName) // undefined나 필수 속성이 없는 항목 제거
                .map((lib) => {
                  if (
                    lib.address.includes(searchKeyword) ||
                    lib.libName.includes(searchKeyword)
                  )
                    return (
                      <article key={lib.libCode} ref={ref}>
                        <LibraryCard
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
                  return null;
                })}
            </div>
            {isFetchingNextPage && <LibrarySkeleton />}
            {!hasNextPage && "마지막 페이지 입니다."}
          </article>
        )
      )}
    </section>
  );
}

export default LibraryList;
