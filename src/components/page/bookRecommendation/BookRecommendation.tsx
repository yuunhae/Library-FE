import Header from "../../common/Header";
import { TitleAndDescription } from "../../common/TitleAndDescription";
import SearchBar from "./components/SearchBar";
import { useState, useEffect, useCallback } from "react";
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

  // 상태 관리
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sort, setSort] = useState("loan");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 무한 스크롤을 위한 추가 로드 함수
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const params = {
        ...(search ? { keyword: search } : {}),
        category:
          selectedCategory === 0 ? "전체" : categories[selectedCategory],
        sort: sort,
        page: page,
        size: 60,
      };

      const response: SearchBooksResponse = await searchBooks(params);
      const newBooks = response.content;

      if (newBooks.length === 0) {
        setHasMore(false);
      } else {
        setBooks((prev) => [...prev, ...newBooks]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("추가 데이터 로딩 실패:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [search, selectedCategory, sort, page, hasMore, isLoadingMore]);

  // 무한 스크롤 훅 사용
  const observerRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: hasMore && !isLoadingMore,
  });

  // API 호출 함수
  const fetchBooks = async (
    searchKeyword: string,
    categoryIndex: number,
    sortType: string,
    page: number = 1,
    append: boolean = false
  ) => {
    setLoading(true);
    setError(null);

    const params = {
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
      category: categoryIndex === 0 ? "전체" : categories[categoryIndex],
      sort: sortType,
      page: page,
      size: 60,
    };

    try {
      const response: SearchBooksResponse = await searchBooks(params);

      if (append) {
        setBooks((prev) => [...prev, ...response.content]);
      } else {
        setBooks(response.content);
      }

      const shouldHaveMore =
        response.hasNext !== undefined
          ? response.hasNext
          : response.content.length === 60;

      setHasMore(shouldHaveMore);
    } catch (err: any) {
      console.error("도서 검색 에러:", err);
      setError(err.message || "도서를 불러오는데 실패했습니다.");
      if (!append) {
        setBooks([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearch(initialSearch);
    setBooks([]);
    setPage(1);
    setHasMore(true);

    fetchBooks(initialSearch, selectedCategory, sort, 1, false);
  }, [initialSearch]);

  // 검색 실행 (검색 버튼 클릭 시)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setBooks([]);
    setPage(1);
    setHasMore(true);
    fetchBooks(search, selectedCategory, sort, 1, false);
  };

  // 카테고리 선택 시 검색 실행
  const handleCategorySelect = (idx: number) => {
    setSelectedCategory(idx);
    setBooks([]);
    setPage(1);
    setHasMore(true);
    fetchBooks(search, idx, sort, 1, false);
  };

  // 정렬 옵션 변경 핸들러 추가
  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setBooks([]);
    setPage(1);
    setHasMore(true);
    fetchBooks(search, selectedCategory, newSort, 1, false);
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
        onSortChange={handleSortChange}
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
          <div className="flex flex-wrap gap-4 m-5 justify-center items-center">
            {books.map((book, index) => (
              <BookCard
                key={`${book.isbn13 || book.id}-${index}`}
                bookImageUrl={book.bookImageUrl || ""}
                title={book.title}
                author={book.author}
                publisher={book.publisher}
                publicationYear={book.publicationYear}
                loanCount={book.loanCount}
                isbn13={book.isbn13}
              />
            ))}
          </div>
        </>
      )}

      {/* 무한 스크롤 관찰자 요소 */}
      {hasMore && (
        <div
          ref={observerRef}
          className="w-full h-10 flex items-center justify-center"
        ></div>
      )}
    </div>
  );
};

export default BookRecommendation;
