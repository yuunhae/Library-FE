import React, { useState } from "react";
import { categories, books } from "../../../../mocks/popularBook";

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
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setSelected(idx)}
            className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-md border text-sm sm:text-base font-medium transition-colors ${
              selected === idx
                ? "bg-[#3578FF] text-white border-[#3578FF]"
                : "bg-white text-[#222] border-[#e5e7eb] hover:border-[#3578FF]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#e5e7eb] p-3 sm:p-4 flex flex-col min-w-0 min-h-[180px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[280px] shadow-sm"
          >
            <div className="w-full h-24 sm:h-32 md:h-36 lg:h-40 bg-[#f3f4f6] rounded mb-3 sm:mb-4" />
            <div className="text-sm sm:text-base font-semibold mb-1">
              {book.title}
            </div>
            <div className="text-xs sm:text-sm text-[#666] mb-1">
              {book.author}, {book.publisher}, {book.year}
            </div>
            <div className="text-xs sm:text-sm text-[#3578FF] font-medium mt-auto">
              대출 {book.count.toLocaleString()}회
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBook;
