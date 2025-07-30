import Header from "../../common/Header";
import { TitleAndDescription } from "../../common/TitleAndDescription";
import SearchBar from "./components/SearchBar";
import { useState, useRef, useEffect, useCallback } from "react";
import { categories, searchBooks } from "../../../api/books/searchBooks";
import type {
  Book,
  SearchBooksResponse,
} from "../../../api/books/ResponseBooks";
import Tab from "./components/Tab";
import BookCard from "./components/BookCard";
import { useLocation } from "react-router-dom";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

const BookRecommendation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  // 스크롤 위치 유지를 위한 ref
  const booksContainerRef = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false); // 추가 로딩 상태 추적

  // 상태 관리
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sort, setSort] = useState("loan");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // API 호출 함수
  const fetchBooks = async (
    searchKeyword: string,
    categoryIndex: number,
    sortType: string,
    page: number = 1,
    append: boolean = false
  ) => {
    console.log("fetchBooks 호출:", {
      searchKeyword,
      categoryIndex,
      sortType,
      page,
      append,
    });

    setLoading(true);
    setError(null);

    // 추가 로딩 시작 시 현재 스크롤 위치 저장
    let savedScrollPosition = 0;
    if (append) {
      isLoadingMoreRef.current = true;
      savedScrollPosition = window.pageYOffset;
    }

    const params = {
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
      category: categoryIndex === 0 ? "전체" : categories[categoryIndex],
      sort: sortType,
      page: page,
      size: 50,
    };

    try {
      const response: SearchBooksResponse = await searchBooks(params);
      console.log("API 응답:", {
        contentLength: response.content.length,
        totalCount: response.totalCount,
        hasNext: response.hasNext,
      });

      if (append) {
        setBooks((prev) => {
          const newBooks = [...prev, ...response.content];
          console.log("추가 로드 후 총 책 개수:", newBooks.length);

          // DOM 업데이트 후 스크롤 위치 복원
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              window.scrollTo(0, savedScrollPosition);
              isLoadingMoreRef.current = false;
            });
          });

          return newBooks;
        });
      } else {
        setBooks(response.content);
        console.log("새로 로드된 책 개수:", response.content.length);
      }

      setTotalCount(response.totalCount || 0);

      // hasMore 계산
      const shouldHaveMore =
        response.hasNext !== undefined
          ? response.hasNext
          : response.content.length === 16;

      console.log("hasMore 계산:", {
        responseContentLength: response.content.length,
        totalCount: response.totalCount,
        hasNext: response.hasNext,
        shouldHaveMore,
      });
      setHasMore(shouldHaveMore);
    } catch (err: any) {
      console.error("도서 검색 에러:", err);
      setError(err.message || "도서를 불러오는데 실패했습니다.");
      if (!append) {
        setBooks([]);
      }
      isLoadingMoreRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  // 무한 스크롤 핸들러 - useCallback으로 메모이제이션
  const handleLoadMore = useCallback(() => {
    console.log("handleLoadMore 호출:", {
      loading,
      hasMore,
      currentPage,
      booksLength: books.length,
      totalCount,
      isLoadingMore: isLoadingMoreRef.current,
    });

    if (!loading && hasMore && !isLoadingMoreRef.current) {
      const nextPage = currentPage + 1;
      console.log("다음 페이지 로드:", nextPage);
      setCurrentPage(nextPage);
      fetchBooks(search, selectedCategory, sort, nextPage, true);
    }
  }, [
    loading,
    hasMore,
    currentPage,
    books.length,
    totalCount,
    search,
    selectedCategory,
    sort,
  ]);

  // 무한 스크롤 훅 사용
  const observerRef = useInfiniteScroll({
    onIntersect: handleLoadMore,
    enabled: !loading && hasMore && !isLoadingMoreRef.current,
  });

  // 초기 로드 및 URL 쿼리스트링 변경 시
  useEffect(() => {
    setSearch(initialSearch);
    setCurrentPage(1);
    setHasMore(true);
    isLoadingMoreRef.current = false;
    fetchBooks(initialSearch, selectedCategory, sort, 1, false);
  }, [initialSearch]);

  // 검색 실행 (검색 버튼 클릭 시)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setHasMore(true);
    isLoadingMoreRef.current = false;
    fetchBooks(search, selectedCategory, sort, 1, false);
  };

  // 카테고리 선택 시 검색 실행
  const handleCategorySelect = (idx: number) => {
    setSelectedCategory(idx);
    setCurrentPage(1);
    setHasMore(true);
    isLoadingMoreRef.current = false;
    fetchBooks(search, idx, sort, 1, false);
  };

  return (
    <div className="w-full text-left">
      <Header />
      <TitleAndDescription
        title="창업 도서"
        description="국립중앙도서관 대출 데이터 기반 창업 관련 도서"
      />

      <SearchBar
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onSearch={handleSearch}
        sort={sort}
        onSortChange={setSort}
      />

      <Tab
        tabs={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />

      {/* 로딩 상태 */}
      {loading && books.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">도서를 불러오는 중...</div>
        </div>
      )}

      {/* 에러 상태 */}
      {error && (
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      )}

      {/* 검색 결과가 없을 때 */}
      {!loading && !error && books.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500 text-lg">검색 결과가 없습니다.</div>
        </div>
      )}

      {/* 도서 목록 */}
      {!loading && !error && books.length > 0 && (
        <>
          <div
            ref={booksContainerRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-5"
          >
            {books.map((book, index) => (
              <BookCard
                key={`${book.isbn13 || book.id}-${index}`} // isbn13을 우선 사용하고 id를 fallback으로
                bookImageUrl={book.bookImageUrl || ""}
                title={book.title}
                author={book.author}
                publisher={book.publisher}
                publicationYear={book.publicationYear}
                loanCount={book.loanCount}
                pageCount={book.pageCount}
                isbn13={book.isbn13}
              />
            ))}
          </div>

          {/* 무한 스크롤 관찰자 */}
          <div
            ref={observerRef}
            className="flex justify-center items-center h-32 bg-gray-50"
          >
            {loading && (
              <div className="text-lg">추가 도서를 불러오는 중...</div>
            )}
            {!loading && hasMore && (
              <div className="text-gray-500">
                스크롤하여 더 많은 도서를 불러오세요
              </div>
            )}
            {!loading && !hasMore && books.length > 0 && (
              <div className="text-gray-500">모든 도서를 불러왔습니다</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookRecommendation;
