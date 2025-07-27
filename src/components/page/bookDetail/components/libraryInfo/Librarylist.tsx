import { useFetchLibListQuery } from "../../../../../api/bookDetail/libraryList/useFetchLibList";
import { useLocation } from "react-router-dom";
import useCalulateDistance from "../../../../../hooks/useCalulateDistance";

//도서관 정보
function LibraryList() {
  const location = useLocation();
  const { data: rawlibData } = useFetchLibListQuery(location.state.isbn13);
  const { libWithDistance, error } = useCalulateDistance(rawlibData);

  const availableCount = libWithDistance.filter(
    (lib) => lib.isAvailable
  ).length;

  return (
    <div>
      {libWithDistance && (
        <div className="space-y-3">
          {error ? (
            "브라우저 설정에서 위치 권한을 허용해주세요."
          ) : (
            <p className="text-left text-sm text-[#666] font-light">
              총 {libWithDistance.length}개의 도서관 중 {availableCount}개
              도서관에서 대출 가능
            </p>
          )}

          {libWithDistance.map((lib) => {
            return (
              <div className="grid grid-cols-[2.5fr_0.5fr] justify-between w-full h-31 p-4 border border-border-color text-left text-14 font-light">
                <div key={lib.libCode} className=" space-y-1">
                  <p className="text-16 font-semibold">{lib.libName}</p>
                  <p className="text-14">{lib.address}</p>

                  <p className="text-14">📞 {lib.tel}</p>
                  <p className="text-14">🕒{lib.operatingTime}</p>
                  {error ? (
                    "브라우저 설정에서 위치 권한을 허용해주세요."
                  ) : (
                    <p>📍 {lib.distance}km</p>
                  )}
                </div>
                {lib.isAvailable ? (
                  <div className="w-24 h-8 xs:w-17 xs:h-6 sm:text-xs bg-[#EDFCED] text-[#21C45E] text-xs flex justify-center items-center">
                    대출가능
                  </div>
                ) : (
                  <div className="w-24 h-8 xs:w-17 xs:h-6 sm:text-xs bg-[#EDFCED] text-[#DE5252] text-xs flex justify-center items-center">
                    대출불가
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LibraryList;
