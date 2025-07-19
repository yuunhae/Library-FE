import { useLocation } from "react-router-dom";
import { useFetchBookDetailDataQuery } from "../../../../api/bookDetail/useFetchBookDetailData";

function BookDetailCard() {
  const location = useLocation();
  const { data } = useFetchBookDetailDataQuery(location.state.isbn13);
  console.log(data);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <article className="p-6 space-y-4 border border-#E6E6E6">
          <div className="flex justify-center items-center w-full h-80 bg-[#F5F5F5]">
            <img
              src={data.bookImageUrl}
              alt="책 커버 사진"
              className="object-contain"
            />
          </div>

          <p className="text-xl font-semibold text-left text-#1A1A1A">
            {data.title}
          </p>
          <p className="text-left text-16">{data.author}</p>
          {/* TODO : 코드 반복 줄이기 */}
          <div className="space-y-2">
            <div className="flex flex-row items-center justify-between text-left">
              <p>출판사</p>
              <p>{data.publisher}</p>
            </div>
            <div className="flex flex-row items-center justify-between text-left">
              <p>출간연도</p>
              <p>{data.publicationDate}</p>
            </div>
            <div className="flex flex-row items-center justify-between text-left">
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
        <article>
          <div className="p-6 space-y-3 border border-#E6E6E6 text-left">
            <p className="text-16">도서소개</p>
            <p className="text-14">{data.description}</p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BookDetailCard;
