import { useLocation } from "react-router-dom";
import { useFetchBookDetailDataQuery } from "../../../../api/bookDetail/useFetchBookDetailData";
type BookInfoCategoryData = {
  label: string;
  value: React.ReactNode;
};

function BookDetailCard() {
  const location = useLocation();
  const { data } = useFetchBookDetailDataQuery(location.state.isbn13);

  const BookInfoCategory = ({ label, value }: BookInfoCategoryData) => (
    <div className="flex flex-row text-sm items-center justify-between text-left font-light">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <article className="p-6 space-y-4 border border-[#E6E6E6]">
          <section className="flex justify-center items-center w-full h-80 bg-[#F5F5F5]">
            {data.bookImageUrl ? (
              <img
                src={data.bookImageUrl}
                alt="책 커버 사진"
                className="w-auto h-full object-contain"
              />
            ) : (
              <p className="font-light">{data.title}</p>
            )}
          </section>

          <section>
            <p className="text-xl font-semibold text-left text-[#1A1A1A] mb-1">
              {data.title}
            </p>
            <p className="text-left text-16 tracking-tight font-light">
              {data.author}
            </p>
          </section>

          <section className="space-y-1">
            <BookInfoCategory label="출판사" value={data.publisher} />
            <BookInfoCategory label="출간연도" value={data.publicationDate} />
            <BookInfoCategory label="ISBN" value={data.isbn13} />
            {data.pageCount != null ||
              (data.pageCount > 0 && (
                <BookInfoCategory label="페이지" value={`${data.pageCount}p`} />
              ))}
            {data.pageCount != null ||
              (data.pageCount > 0 && (
                <BookInfoCategory
                  label="대출횟수"
                  value={`${data.loanCount}회`}
                />
              ))}
          </section>
        </article>

        {/* 도서소개 */}
        {data.description && (
          <article>
            <div className="p-6 space-y-3 border border-[#E6E6E6] text-left">
              <p className="text-16 font-bold">도서소개</p>
              <p className="text-14 tracking-tight font-light">
                {data.description}
              </p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default BookDetailCard;
