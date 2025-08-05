import React, { useState } from "react";
import LibraryList from "./libraryDetailCard/Librarylist";
import LibraryMap from "./libraryDetailCard/LibraryMap";
import { useFetchLibListQuery } from "../../../../api/bookDetail/libraryList/useFetchLibList";
import useCalulateDistance from "../../../../hooks/useCalulateDistance";
import useGeolocation from "../../../../hooks/useGeolocation";
import { getRegionCodeFromCoordinates, getRegionNameFromCode } from "../../../../utils/regionMapping";

type LibraryInfoProps = {
  isbn: string;
};

function LibraryInfo({ isbn }: LibraryInfoProps) {
  const { latitude, longitude } = useGeolocation();
  
  const regionCode = latitude && longitude 
    ? getRegionCodeFromCoordinates(latitude, longitude) 
    : null;
    
  const { data } = useFetchLibListQuery(isbn, regionCode || undefined);
  const { LibraryData, error } = useCalulateDistance(data);
  const searchOptions = ["목록", "지도"];

  const [option, setOption] = useState("목록");
  const [search, setSearch] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 추가
  };

  const availableCount = LibraryData.filter((lib) => lib.isAvailable).length;
  const regionName = regionCode ? getRegionNameFromCode(regionCode) : null;
  const locationPrefix = regionName ? `${regionName} 내` : '전국';

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
        <form
          onSubmit={handleSearch}
          className="w-full h-10 flex flex-row space-x-4"
        >
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="도서관명 또는 지역을 검색하세요"
            className="rounded w-full xs:w-[80%] h-full border  border-border-color px-3 text-sm placeholder-gray-400 xs:placeholder:text-xs font-light"
          />
        </form>
      </section>

      <p className="text-left text-sm text-[#666] font-light">
        {locationPrefix} 총 {LibraryData.length}개의 도서관 중 {availableCount}개 도서관에서 대출
        가능
      </p>

      <section>
        {LibraryData && option == "목록" ? (
          <LibraryList LibraryData={LibraryData} error={error} />
        ) : (
          <LibraryMap isbn={isbn} />
        )}
      </section>
    </div>
  );
}

export default LibraryInfo;
