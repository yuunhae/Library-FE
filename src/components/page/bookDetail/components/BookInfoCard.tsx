import {
  bookDatails,
  bookDetailFields,
} from "../../../../mocks/bookDetailData";

function BookInfoCard() {
  return (
    <div className="space-y-4">
      {/* 좌측 도서 정보 */}
      {bookDatails.map((book) => {
        return (
          <div className="space-y-4">
            {/* 데이터 보고 수정 예정 */}

            <article
              key={book.ISBN}
              className="p-6 space-y-4 border border-#E6E6E6"
            >
              <div className="flex justify-center items-center w-full h-80 bg-[#F5F5F5]">
                <img src="..." alt="책 커버 사진" className="object-contain" />
              </div>

              <p className="text-xl font-semibold text-left text-#1A1A1A">
                {book.name}
              </p>
              <p className="text-left text-16">{book.author}</p>

              <div className="space-y-2">
                {bookDetailFields.map(({ key, label }) => (
                  <div key={key} className="flex justify-between">
                    <p className="text-14 ">{label}</p>
                    <p
                      className={`text-14 ${key === "loanCount" ? "text-point-color" : ""}`}
                    >
                      {" "}
                      {key === "page"
                        ? `${book[key]}p`
                        : key === "loanCount"
                          ? `${book[key]}회`
                          : book[key]}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* 도서소개 */}
            <article>
              <div className="p-6 space-y-3 border border-E6E6E6 text-left">
                <p className="text-16">도서소개</p>
                <p className="text-14">{book.introduction}</p>

                <p className="text-16">목차 </p>
                <div className="p-2.5 text-14">
                  <p>{book.index}</p>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}

export default BookInfoCard;
