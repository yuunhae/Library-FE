import { useParams } from "react-router-dom";
import Header from "../../common/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";

import BookDetailsCard from "./components/BookDetailsCard";
import LibraryDetailsCard from "./components/LibraryDetailsCard";

import { Suspense } from "react";
type Params = { isbn: string };

function BookDetail() {
  const { isbn } = useParams<Params>();
  if (!isbn) {
    return <div>ISBN이 없습니다.</div>; // 없는 경우를 명시적으로 처리
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
                <LibraryDetailsCard isbn={isbn} />
              </section>
            </div>
          )}
        </main>
      </div>
    </Suspense>
  );
}

export default BookDetail;
