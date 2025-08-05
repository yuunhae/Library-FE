import { useState, useEffect } from "react";
import { categories } from "../../../../mocks/bookList";
import PopularBookCard from "./PopularBookCard";
import { getPopularBooks } from "../../../../api/mainPopularBooks/popularBooks";
import type { PopularBook } from "../../../../api/mainPopularBooks/popularBooks.type";
import { Link } from "react-router-dom";

const MainPopularBook = () => {
  const [selected, setSelected] = useState(0);
  const [books, setBooks] = useState<PopularBook[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const category =
          categories[selected] === "전체" ? undefined : categories[selected];
        const data = await getPopularBooks(category);
        setBooks(data);
      } catch (e) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [selected]);

  return (
    <section className="w-full bg-[#fafafa] h-[500px] p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          인기 창업 도서
        </h2>
        <Link to="/book-recommendation">
          <button className="text-[#3578FF] text-sm sm:text-base font-medium">
            전체보기
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 ">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setSelected(idx)}
            className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-md border text-sm sm:text-base font-medium transition-colors ${
              selected === idx
                ? "bg-[#3578FF] text-white border-[#3578FF]"
                : "bg-white text-[#222] border-[#E3E3E3] hover:border-[#3578FF]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto h-[350px] scrollbar-hide">
        <div className="flex gap-4 sm:gap-6 min-w-max">
          {loading ? (
            <div className="flex items-center justify-center w-full h-32">
              로딩 중...
            </div>
          ) : books.length === 0 ? (
            <div className="flex items-center justify-center w-full h-32">
              도서가 없습니다.
            </div>
          ) : (
            books.map((book, idx) => (
              <PopularBookCard
                key={idx}
                cover={book.bookImageUrl}
                title={book.title}
                author={book.author}
                publisher={book.publisher}
                year={Number(book.publicationYear)}
                loanCount={book.loanCount}
                onDetail={() => {}}
                isbn={book.isbn13}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MainPopularBook;
