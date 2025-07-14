import React from "react";

interface BookCardProps {
  cover: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  available: boolean;
  loanCount: number;
  pages: number;
  onDetail?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  cover,
  title,
  author,
  publisher,
  year,
  available,
  loanCount,
  pages,
  onDetail,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col h-full shadow-sm">
      <div className="flex-1 flex flex-col items-center justify-center m-5">
        <div className="w-28 h-36 bg-gray-100 flex items-center justify-center mb-2">
          {cover ? (
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>
        <div className="text-base font-bold text-center mb-1">{title}</div>
        <div className="text-xs text-gray-500 text-center mb-1">
          {author} · {publisher}, {year}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center text-xs text-gray-500 mb-2">
        <span>{pages}p</span>
        <span>대출 {loanCount.toLocaleString()}건</span>
      </div>
      <div className="flex flex-row justify-between items-center mt-auto">
        <span
          className={`text-xs font-semibold ${available ? "text-blue-600" : "text-gray-400"}`}
        >
          {available ? "대출 가능" : "대출 불가"}
        </span>
        <button
          className="px-4 py-1 bg-[#3578FF] text-white rounded-md text-xs font-medium hover:bg-[#2453b3] transition-colors"
          onClick={onDetail}
        >
          상세보기
        </button>
      </div>
    </div>
  );
};

export default BookCard;
