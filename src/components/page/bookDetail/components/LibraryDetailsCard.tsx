import React, { useState } from "react";
import LibraryList from "./libraryDetailCard/Librarylist";
import LibraryMap from "./libraryDetailCard/LibraryMap";
import { useFetchLibListQuery } from "../../../../api/bookDetail/libraryList/useFetchLibList";
import { getRegionNameFromCode } from "../../../../utils/regionMapping";

export type LibraryInfoProps = {
  isbn: string;
  regionCode: string | null;
};

function LibraryDetailsCard({ isbn, regionCode }: LibraryInfoProps) {
  const searchOptions = ["목록", "지도"];
  const [option, setOption] = useState("목록");
  const [search, setSearch] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { data, isLoading, isError } = useFetchLibListQuery(isbn, regionCode || undefined);
  const availableCount = data
    ? data.filter((lib) => lib?.isAvailable).length
    : 0;
  const regionName = regionCode ? getRegionNameFromCode(regionCode) : null;
  const locationPrefix = regionName ? `${regionName} 내` : "전국";

  return (
    <div className="space-y-4">
      <section>
        <div className="flex flex-row justify-between ">
          <p className="text-left text-lg  font-bold">도서관 위치 </p>
          <div className="space-x-2">
            {searchOptions.map((opt) => {
              return (
                <button
                  key={opt}
                  onClick={() => setOption(opt)}
                  className={`w-14 h-8 text-sm font-light hover:bg-point-color hover:text-white transition-colors ${opt === option ? "bg-point-color text-white" : "bg-[#F5F5F5] text-[#666666] hover:bg-point-color"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <form className="w-full h-10 flex flex-row space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="도서관명 또는 지역을 검색하세요"
            className="rounded w-full xs:w-[80%] h-full border  border-border-color px-3 text-sm placeholder-gray-400 xs:placeholder:text-xs font-light"
          />
        </form>
      </section>
      {isLoading && (
        <div className="flex justify-center items-center h-32">
          <p>도서관 정보를 불러오는 중...</p>
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-32">
          <p>도서관 정보를 불러오는데 실패했습니다.</p>
        </div>
      )}
      {data && !isLoading && !isError && (
        <article>
          <p className="text-left text-sm text-[#666] font-light">
            {locationPrefix} 총 {data.length}개의 도서관 중 {availableCount}개
            도서관에서 대출 가능
          </p>
          <section className="w-full h-[600px] overflow-x-hidden">
            {option == "목록" ? (
              <LibraryList
                isbn={isbn}
                regionCode={regionCode}
                searchKeyword={search}
              />
            ) : (
              // <LibraryList isbn={isbn} searchKeyword={search} />
              <LibraryMap data={data} />
            )}
          </section>
        </article>
      )}
    </div>
  );
}

export default LibraryDetailsCard;
