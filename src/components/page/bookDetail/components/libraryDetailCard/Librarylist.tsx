import type { LibraryDataProps } from "../../../../../hooks/useCalulateDistance";
import { LibraryCard } from "./components/LibraryCard";

//도서관 정보

type LibraryListProps = {
  LibraryData: LibraryDataProps[];
  error?: GeolocationPositionError;
};
function LibraryList({ LibraryData, error }: LibraryListProps) {
  return (
    <section>
      {LibraryData && (
        <div className="space-y-3">
          {LibraryData.map((lib) => {
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
