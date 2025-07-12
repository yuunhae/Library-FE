import React from "react";
// Tab import 제거

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent) => void;
  // categories, selectedCategory, onCategoryChange 제거
  sort: string;
  onSortChange: (sort: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  sort,
  onSortChange,
}) => {
  return (
    <div className="w-auto p-[10px]  m-[10px]">
      <form onSubmit={onSearch} className="w-full flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="책 제목이나 저자를 검색하세요"
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md bg-white text-[#222] font-medium shadow-sm focus:ring-2 focus:ring-[#3578FF] focus:border-[#3578FF] hover:border-[#3578FF] transition-colors outline-none cursor-pointer"
          >
            <option value="title">가나다 순</option>
            <option value="author">저자명 순</option>
            <option value="pubYear">출판년도 순</option>
            <option value="loan">대출 많은 순</option>
          </select>
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 text-sm">
            ▼
          </span>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
