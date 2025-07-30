// API 요청 파라미터 타입 정의
export interface SearchBooksRequest {
  category?: string; // 카테고리
  keyword?: string; // 검색 키워드
  page?: number; // 페이지 번호
  size?: number; // 페이지 크기 몇개씩 보여줄건지
  sort?: string; // 정렬 옵션
}

// 응답 타입 import
export type { Book, SearchBooksResponse, ApiError } from "./ResponseBooks";
