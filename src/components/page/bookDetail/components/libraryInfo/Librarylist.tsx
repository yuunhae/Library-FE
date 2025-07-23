import { useFetchLibListQuery } from "../../../../../api/bookDetail/libraryList/useFetchLibList";
import { useLocation } from "react-router-dom";
import useCalulateDistance from "../../../../../hooks/useCalulateDistance";

//도서관 정보
function LibraryList() {
  const location = useLocation();
  const { data } = useFetchLibListQuery(location.state.isbn13);
  const calculatedDistanceList = useCalulateDistance(data);

  return (
    <div className="space-y-3">
      {calculatedDistanceList &&
        calculatedDistanceList.map((lib) => {
          return (
            <div className="flex flex-row justify-between w-full h-31 p-4 border border-border-color text-left text-14 font-light">
              <div key={lib.libCode} className=" space-y-1">
                <p className="text-16 font-semibold">{lib.libName}</p>
                <p className="text-14">{lib.address}</p>
                <p className="text-14">📞 {lib.tel}</p>
                <p className="text-14">🕒{lib.operatingTime}</p>
                <p>📍 {lib.distance}km</p>
              </div>

              <div className="w-24 h-8 xs:w-17 xs:h-6 sm:text-xs bg-[#EDFCED] text-[#21C45E] text-xs flex justify-center items-center">
                대출가능
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default LibraryList;
