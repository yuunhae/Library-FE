import Header from "../../common/Header";
import { TitleAndDescription } from "../../common/TitleAndDescription";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { categories, bookList } from "../../../mocks/bookList";
import Tab from "./components/Tab";
import BookCard from "./components/BookCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const BookRecommendation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sort, setSort] = useState("loan");

  // 쿼리스트링이 바뀔 때마다 search 상태를 동기화
  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  // 카테고리별 필터링
  const filteredBooks = bookList
    .filter((book) => {
      if (selectedCategory === 0) return true;
      // 카테고리별 필터링 로직 필요시 추가 (예시: book.category === categories[selectedCategory])
      return true;
    })
    .filter((book) => {
      // 검색어 필터링
      return book.title.includes(search) || book.author.includes(search);
    });

  return (
    <div className="w-full text-left">
      <Header />
      <TitleAndDescription
        title="창업 도서"
        description="국립중앙도서관 대출 데이터 기반 창업 관련 도서"
      />

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={(e) => {
          e.preventDefault();
        }}
        sort={sort}
        onSortChange={setSort}
      />
      <Tab
        tabs={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-5">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            cover={book.cover}
            title={book.title}
            author={book.author}
            publisher={book.publisher}
            year={book.year}
            available={book.available}
            loanCount={book.loanCount}
            pages={book.pages}
            onDetail={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default BookRecommendation;
