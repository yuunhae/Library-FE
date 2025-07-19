// 개별 책 정보 타입
export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  bookImageUrl?: string;
  available: boolean;
  loanCount: number;
  pageCount: number;
  description?: string;
}

// API 응답 타입 정의
export interface SearchBooksResponse {
  content: Book[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// API 에러 응답 타입
export interface ApiError {
  message: string;
  code: string;
  status: number;
}
