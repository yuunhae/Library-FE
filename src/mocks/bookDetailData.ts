type BookDetail = {
  name: string;
  author: string;
  publisher: string;
  publishDate: string;
  ISBN: number;
  page: number;
  loanCount: number;
};
export const bookDetailFields: Array<{
  key: keyof BookDetail;
  label: string | number;
}> = [
  { key: "publisher", label: "출판사" },
  { key: "publishDate", label: "출간연도" },
  { key: "ISBN", label: "ISBN" },
  { key: "page", label: "페이지" },
  { key: "loanCount", label: "대출횟수" },
];

export const bookDatails = [
  {
    name: "린 스타트업",
    author: "에릭 리스",
    publisher: "한빛비즈",
    publishDate: "2012-03-15",
    ISBN: 9788960512887,
    page: 336,
    loanCount: 2847,
    introduction:
      "고객이 정말로 원하는 제품을 만들기 위한 린 스타트업 방법론을 제시합니다. 최소존속제품(MVP)을 통한 빠른 검증과 지속적인 개선을 통해 성공적인 스타트업을 만드는 방법을 배울 수 있습니다.",
    index:
      "1부 비전 - 스타트업의 경영 철학 1부 비전 - 스타트업의 경영 철학 1부 비전 - 스타트업의 경영 철학 1부 비전 - 스타트업의 경영 철학",
  },
];
