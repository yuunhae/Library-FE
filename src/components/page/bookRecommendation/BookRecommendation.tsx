import Header from "../../common/Header";
import { TitleAndDescription } from "../../common/TitleAndDescription";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import {
  categories,
  searchBooks,
  sortBooks,
} from "../../../api/books/searchBooks";
import type {
  Book,
  SearchBooksResponse,
} from "../../../api/books/ResponseBooks";
import Tab from "./components/Tab";
import BookCard from "./components/BookCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // API 호출 함수
  const fetchBooks = async (
    searchKeyword: string,
    categoryIndex: number,
    page: number = 1
  ) => {
    //console.log("fetchBooks 파라미터", searchKeyword, categoryIndex, page);
    //console.log("API URL:", import.meta.env.VITE_API_URL);
    setLoading(true);
    setError(null);

    const params = {
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
      category: categoryIndex === 0 ? "전체" : categories[categoryIndex],
      page: page,
      size: 100,
    };
    //console.log("API 요청 파라미터:", params);

    try {
      const response: SearchBooksResponse = await searchBooks(params);

      //console.log("API 응답 데이터:", response); // 추가

      // 정렬 적용
      const sortedBooks = sortBooks(response.content, sort);

      setBooks(sortedBooks);
      //console.log(books);

      setTotalCount(response.totalCount);
      setCurrentPage(response.currentPage);
    } catch (err: any) {
      console.error("도서 검색 에러:", err);
      setError(err.message || "도서를 불러오는데 실패했습니다.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };
  // 초기 로드 및 URL 쿼리스트링 변경 시
  useEffect(() => {
    setSearch(initialSearch);
    fetchBooks(initialSearch, selectedCategory, 1);
  }, [initialSearch]);

  // 카테고리 변경 시
  useEffect(() => {
    fetchBooks(search, selectedCategory, 1);
  }, [search, selectedCategory]);

  // 정렬 변경 시 (API 재호출 없이 클라이언트에서 정렬)
  useEffect(() => {
    if (books.length > 0) {
      const sortedBooks = sortBooks(books, sort);
      setBooks([...sortedBooks]); // 배열 참조 변경으로 리렌더링 트리거
    }
  }, [sort]);

  // 검색 실행
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // setSearch가 이미 최신값을 반영하므로 fetchBooks 호출 필요 없음
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
          fetchBooks(e.target.value, selectedCategory, 1);
        }}
        onSearch={handleSearch}
        sort={sort}
        onSortChange={setSort}
      />

      <Tab
        tabs={categories}
        selected={selectedCategory}
        onSelect={(idx) => {
          setSelectedCategory(idx);
          fetchBooks(search, idx, 1);
        }}
      />

      {/* 로딩 상태 */}
      {loading && (
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
          <div className="m-5 text-sm text-gray-600">
            총 {totalCount}권의 도서가 있습니다.
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-5">
            {books.map((book) => (
              <BookCard
                key={book.id}
                bookImageUrl={book.bookImageUrl || ""}
                title={book.title}
                author={book.author}
                publisher={book.publisher}
                publicationYear={book.publicationYear}
                available={book.available}
                loanCount={book.loanCount}
                pageCount={book.pageCount}
                isbn13={book.isbn13}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookRecommendation;
