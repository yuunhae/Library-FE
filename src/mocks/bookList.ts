export const categories = [
  "전체",
  "비즈니스 모델",
  "마케팅",
  "IR/투자",
  "경영관리",
  "기술창업",
  "법무/세무",
];

// BookRecommendation 페이지용 mock 데이터
export const bookList = [
  {
    id: 1,
    title: "린 스타트업",
    author: "에릭 리스",
    publisher: "인사이트",
    year: 2025,
    cover: "", // 표지 이미지 경로(임시)
    available: true,
    loanCount: 23471,
    pages: 336,
    description: "창업가를 위한 실전 가이드",
  },
  {
    id: 2,
    title: "제로 투 원",
    author: "피터 틸",
    publisher: "21세기북스",
    year: 2024,
    cover: "",
    available: false,
    loanCount: 19876,
    pages: 320,
    description: "독창적인 창업 전략 소개",
  },
  // ... 더미 데이터 추가 가능
];
