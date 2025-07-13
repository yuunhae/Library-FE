import { libraryLocation } from "../../../../../mocks/libraryLocationData";

function LibraryList() {
  return (
    <div className="space-y-3">
      {libraryLocation.map((lib, idx) => {
        return (
          <div
            key={idx}
            className="flex flex-row justify-between w-full h-31 p-4 border border-border-color text-left"
          >
            <div className=" space-y-1">
              <p className="text-16">{lib.name}</p>
            <p className="text-14">{lib.address}</p>
            <div className="flex flex-row">
              <p className="text-14">
                📞 {lib.number} 🕒{lib.time} 📍{lib.distance}
              </p>
            </div>
            </div>
             
            <div className="w-24 h-8 xs:w-17 xs:h-6 sm:text-xs bg-[#EDFCED] text-[#21C45E] text-xs flex justify-center items-center">대출가능</div>
          </div>
        );
      })}
    </div>
  );
}

export default LibraryList;
