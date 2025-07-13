import Header from "../../common/Header";
import BookInfoCard from "./components/BookInfoCard";
import LibraryInfo from "./components/LibraryInfo";

function BookDetail() {
  return (
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
            <BookInfoCard />
          </section>

          <section className="p-6 space-y-4  border border-border-color">
            <LibraryInfo />
          </section>
        </div>
      </main>
    </div>
  );
}

export default BookDetail;
