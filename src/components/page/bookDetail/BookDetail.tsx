import { useParams } from "react-router-dom";
import Header from "../../common/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";

import BookDetailsCard from "./components/BookDetailsCard";
import LibraryDetailsCard from "./components/LibraryDetailsCard";

import { Suspense } from "react";
import useGeolocation from "../../../hooks/useGeolocation";
import { getRegionCodeFromCoordinates } from "../../../utils/regionMapping";
type Params = { isbn: string };

function BookDetail() {
  const { isbn } = useParams<Params>();
  const { latitude, longitude, error, loading } = useGeolocation();

  if (!isbn || isbn.length < 13) {
    return <p>잘못된 ISBN 입니다. 다시 시도해주세요</p>;
  }

  const regionCode =
    latitude && longitude
      ? getRegionCodeFromCoordinates(latitude, longitude)
      : null;

  if (loading) {
    <p>위치 정보를 불러 오는 중입니다.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen">
        <header>
          <Header />
        </header>
        <main className="p-4">
          <nav className="flex">
            {/* href 추후수정 */}
            <a href="/" className="text-sm text-point-color mb-4 font-light">
              ← 도서 목록으로 돌아가기
            </a>
          </nav>
          {isbn && (
            <div className=" grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 ">
              <section className="space-y-4 ">
                <BookDetailsCard isbn={isbn} />
              </section>

              <section className="p-6 border border-border-color rounded shadow-sm">
                <LibraryDetailsCard isbn={isbn} regionCode={regionCode} />
              </section>
            </div>
          )}
        </main>
      </div>
    </Suspense>
  );
}

export default BookDetail;
