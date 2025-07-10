import React, { useState } from "react";

const MainSearchBar = () => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 추가
  };

  return (
    <div className="w-full min-h-[30vh] md:min-h-[30vh] py-10 md:py-20 bg-[#4276e7] flex flex-col items-start justify-start pl-6 md:pl-10">
      <h1 className="text-white text-xl md:text-3xl font-bold mb-3 md:mb-6 text-left">
        창업 성공을 위한 맞춤형 도서 추천
      </h1>
      <p className="text-white text-sm md:text-lg mb-5 md:mb-8 text-left">
        국립중앙도서관 데이터 기반 검증된 창업 도서와 지원사업 정보
      </p>
      <form
        onSubmit={handleSearch}
        className="w-[90%] max-w-[600px] flex items-center justify-start"
      >
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="책 제목이나 저자를 검색하세요"
          className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-l-md text-base md:text-lg outline-none bg-white placeholder-gray-400 h-14 md:h-14"
        />
        <button
          type="submit"
          className="w-24 h-14 md:h-14 bg-[#2453b3] text-white text-base md:text-lg font-semibold rounded-r-md hover:bg-[#183a7a] transition-colors focus:outline-none"
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default MainSearchBar;
