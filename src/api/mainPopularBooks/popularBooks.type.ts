// 인기 도서 응답 타입 정의
export interface PopularBook {
  title: string;
  author: string;
  publisher: string;
  publicationYear: string;
  isbn: string;
  loanCount: number;
  bookImageUrl: string;
  authorPublisherMeta: string;
}

export type PopularBooksResponse = PopularBook[];
