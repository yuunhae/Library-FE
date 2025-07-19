import Header from "../../common/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import BookDetailCard from "./components/BookDetailCard";
import LibraryInfo from "./components/LibraryInfo";
import { Suspense } from "react";

function BookDetail() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen">
        <header>
          <Header />
        </header>

        <main className="p-2.5">
          <nav className="flex">
            {/* href 추후수정 */}
            <a href="/" className="text-sm text-point-color mb-4">
              ← 도서 목록으로 돌아가기
            </a>
          </nav>

          <div className="p-2.5 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-8">
            <section className="space-y-4">
              <BookDetailCard />
            </section>

            <section className="p-6 space-y-4  border border-border-color">
              <LibraryInfo />
            </section>
          </div>
        </main>
      </div>
    </Suspense>
  );
}

export default BookDetail;
