import type { LibraryDataProps } from "../../../../../hooks/useCalulateDistance";
import { LibraryCard } from "./components/libraryCard";

//도서관 정보
type LibraryListProps = {
  LibraryData: LibraryDataProps[];
  error?: GeolocationPositionError;
  searchKeyword: string;
};
function LibraryList({ LibraryData, error, searchKeyword }: LibraryListProps) {
  return (
    <section>
      {LibraryData && (
        <div className="space-y-3">
          {LibraryData.map((lib) => {
            if (
              lib.address.includes(searchKeyword) ||
              lib.libName.includes(searchKeyword)
            )
              return (
                <LibraryCard
                  key={lib.libCode}
                  libCode={lib.libCode}
                  libName={lib.libName}
                  address={lib.address}
                  tel={lib.tel}
                  operatingTime={lib.operatingTime}
                  isAvailable={lib.isAvailable}
                  error={error}
                  distance={lib.distance}
                />
              );
          })}
        </div>
      )}
    </section>
  );
}

export default LibraryList;
