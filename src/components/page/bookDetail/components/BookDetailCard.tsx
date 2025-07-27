import { useLocation } from "react-router-dom";
import { useFetchBookDetailDataQuery } from "../../../../api/bookDetail/useFetchBookDetailData";

function BookDetailCard() {
  const location = useLocation();
  const { data } = useFetchBookDetailDataQuery(location.state.isbn13);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <article className="p-6 space-y-4 border border-[#E6E6E6]">
          <div className="flex justify-center items-center w-full h-80 bg-[#F5F5F5]">
            {data.bookImageUrl ? (
              <img
                src={data.bookImageUrl}
                alt="책 커버 사진"
                className="w-auto h-full object-contain"
              />
            ) : (
              <p className="font-light">{data.title}</p>
            )}
          </div>

          <div>
            <p className="text-xl font-semibold text-left text-[#1A1A1A] mb-1">
              {data.title}
            </p>
            <p className="text-left text-16 tracking-tight font-light">
              {data.author}
            </p>
          </div>

          {/* TODO : 코드 반복 줄이기 */}
          <div className="space-y-1">
            <div className="flex flex-row text-sm items-center justify-between text-left font-light">
              <p>출판사</p>
              <p>{data.publisher}</p>
            </div>
            <div className="flex flex-row  text-sm items-center justify-between text-left font-light">
              <p>출간연도</p>
              <p>{data.publicationDate}</p>
            </div>
            <div className="flex flex-row text-sm items-center justify-between text-left font-light">
              <p>ISBN</p>
              <p>{data.isbn13}</p>
            </div>
            {data.pageCount === null ||
              (data.pageCount === 0 && (
                <div className="flex flex-row items-center justify-between text-left">
                  <p>페이지</p>
                  <p>{data.pageCount}p</p>
                </div>
              ))}

            {data.pageCount === null ||
              (data.pageCount === 0 && (
                <div className="flex flex-row items-center justify-between text-left">
                  <p>대출횟수</p>
                  <p>{data.loanCount}회</p>
                </div>
              ))}
          </div>
        </article>

        {/* 도서소개 */}
        {data.description ? (
          <article>
            <div className="p-6 space-y-3 border border-#E6E6E6 text-left">
              <p className="text-16 font-bold">도서소개</p>
              <p className="text-14 tracking-tight font-light">
                {data.description}
              </p>
            </div>
          </article>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BookDetailCard;
