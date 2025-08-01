import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  bookImageUrl: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  loanCount: number;
  pageCount: number;
  isbn13: string;
  // onDetail?: () => void;
}
const BookCard: React.FC<BookCardProps> = ({
  bookImageUrl,
  title,
  author,
  publisher,
  publicationYear,
  loanCount,
  pageCount,
  isbn13,
  // onDetail,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col h-full shadow-sm">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-28 h-36 bg-gray-100 flex items-center justify-center mb-2">
          {bookImageUrl ? (
            <img
              src={bookImageUrl}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>
        <div className="text-base font-bold text-left mb-1">{title}</div>
        <div className="text-xs text-gray-500 text-left mb-1">
          {author} · {publisher}, {publicationYear}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center text-xs text-gray-500 mb-2">
        <span>페이지</span>
        <span className="text-blue-600">{pageCount}p</span>
      </div>
      <div className="flex flex-row justify-between items-center text-xs text-gray-500 mb-2">
        <span>대출</span>
        <span className="text-blue-600">{loanCount.toLocaleString()}회</span>
      </div>
      <div className="flex flex-row justify-center items-center mt-auto">
        <Link
          className="w-full h-8 px-4 py-1 bg-[#3578FF] text-white rounded-md text-xs font-medium hover:bg-[#2453b3] transition-colors"
          to={`/bookdetail/${isbn13}`}
        >
          상세보기
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
