import React, { useState } from "react";
import LibraryList from "./libraryInfo/Librarylist";
import LibraryMap from "./libraryInfo/LibraryMap";

function LibraryInfo() {
  const searchOptions = ["목록", "지도"];

  const [option, setOption] = useState("목록");
  const [isNationwide, setIsNationWide] = useState(false);
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 추가
  };

  return (
    <div className="space-y-4">
      <section>
        <div className="flex flex-row justify-between">
          <p className="text-left text-lg  font-bold">도서관 위치 </p>
          <div className="space-x-2">
            {searchOptions.map((opt) => {
              return (
                <button
                  key={opt}
                  onClick={() => setOption(opt)}
                  className={`w-14 h-8 text-sm hover:bg-point-color hover:text-white transition-colors ${opt === option ? "bg-point-color text-white" : "bg-[#F5F5F5] text-#666666 hover:bg-point-color"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <form
          onSubmit={handleSearch}
          className="w-full h-10 flex flex-row space-x-4"
        >
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="도서관명 또는 지역을 검색하세요"
            className="w-[93%] xs:w-[80%] h-full border  border-border-color px-3 text-sm placeholder-gray-400 xs:placeholder:text-xs"
          />
          <button
            onClick={(event) =>
              event.detail === 0
                ? event.preventDefault()
                : setIsNationWide((prev) => !prev)
            }
            className={`w-[7%] xs:w-[20%]  h-full text-sm border border-solid border-border-color hover:bg-point-color  hover:text-white transition-colors ${isNationwide ? "bg-point-color text-white" : "bg-white"}`}
          >
            전국
          </button>
        </form>
      </section>

      <p className="text-left text-sm text-#666">
        총 5개의 도서관 중 4개 도서관에서 대출 가능
      </p>

      <section>{option == "목록" ? <LibraryList /> : <LibraryMap />}</section>
    </div>
  );
}

export default LibraryInfo;
