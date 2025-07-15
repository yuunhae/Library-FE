import { useState } from "react";
import { categories, books } from "../../../../mocks/popularBook";
import PopularBookCard from "./PopularBookCard";

const PopularBook = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="w-full bg-[#fafafa] min-h-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          인기 창업 도서
        </h2>
        <button className="text-[#3578FF] text-sm sm:text-base font-medium">
          전체보기
        </button>
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {books.map((book, idx) => (
          <PopularBookCard
            key={idx}
            cover={""}
            title={book.title}
            author={book.author}
            publisher={book.publisher}
            year={2025}
            loanCount={book.count}
            onDetail={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularBook;
