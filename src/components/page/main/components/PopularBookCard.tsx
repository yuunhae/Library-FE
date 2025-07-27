import React from "react";

interface BookCardProps {
  cover: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  loanCount: number;
  onDetail?: () => void;
}

const PopularBookCard: React.FC<BookCardProps> = ({
  cover,
  title,
  author,
  publisher,
  year,
  loanCount,
  onDetail,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col h-full shadow-sm">
      <div className="flex-1 flex flex-col items-center justify-center">
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
      </div>
      <div className="flex flex-col justify-between items-left text-xs text-gray-500 mb-2">
        <div className="text-base font-bold text-left mb-1">{title}</div>
        <div className="text-xs text-gray-500 text-left mb-1">
          {author} · {publisher}, {year}
        </div>
        <span className="text-xs text-blue-500 text-left mb-1">
          대출 {loanCount.toLocaleString()}건
        </span>
      </div>
      <div className="flex flex-row justify-between items-center mt-auto"></div>
    </div>
  );
};

export default PopularBookCard;
