type BookDetail = {
  name: string;
  author: string;
  publisher: string;
  publishDate: string;
  ISBN: number;
  page: number;
  loanCount: number;
};
export const bookDetailLabel: Array<{
  key: keyof BookDetail;
  label: string | number;
}> = [
  { key: "publisher", label: "출판사" },
  { key: "publishDate", label: "출간연도" },
  { key: "ISBN", label: "ISBN" },
  { key: "page", label: "페이지" },
  { key: "loanCount", label: "대출횟수" },
];

export const bookDatails = 
  [{
    title: "린 스타트업",
    bookImageUrl:'',
    author: "에릭 리스",
    publisher: "한빛비즈",
    publicationDate: "2012",
    isbn13: '9791170612759',
    pageCount: 336,
    loanCount: 2847,
    description:
      "고객이 정말로 원하는 제품을 만들기 위한 린 스타트업 방법론을 제시합니다. 최소존속제품(MVP)을 통한 빠른 검증과 지속적인 개선을 통해 성공적인 스타트업을 만드는 방법을 배울 수 있습니다.",
  }]

