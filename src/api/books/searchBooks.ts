import apiInstance from "../apiInstance";
import type { SearchBooksRequest } from "./searchBooks.typs";
import type { Book, SearchBooksResponse } from "./ResponseBooks";
import { bookList } from "../../mocks/bookList";

/**
 * 도서 검색 API 호출 함수
 * @param params - 검색 파라미터 (카테고리, 키워드, 페이지 등)
 * @returns Promise<SearchBooksResponse> - 검색 결과
 */
export const searchBooks = async (
  params: SearchBooksRequest
): Promise<SearchBooksResponse> => {
  try {
    // API 요청을 위한 쿼리 파라미터 구성
    const queryObj: Record<string, string> = {
      keyword: params.keyword ?? "",
      page: String(params.page ?? 1),
      size: String(params.size ?? 100),
    };
    if (params.category !== undefined) {
      queryObj.category = params.category;
    }
    if (params.sort !== undefined) {
      queryObj.sort = params.sort;
    }

    const queryParams = new URLSearchParams(queryObj).toString();

    const url = `/api/books/search?${queryParams}`;
    // console.log("최종 요청 URL:", url);
    const response = await apiInstance.get(url);

    return response.data;
  } catch (error: any) {
    // 에러 처리
    console.error("도서 검색 API 에러:", error);

    if (error.response?.data) {
      throw error.response.data;
    } else if (error.message) {
      throw { message: error.message, code: "NETWORK_ERROR", status: 0 };
    } else {
      throw {
        message: "알 수 없는 에러가 발생했습니다.",
        code: "UNKNOWN_ERROR",
        status: 0,
      };
    }
  }
};

export const categories = [
  "전체",
  "비즈니스 모델",
  "마케팅",
  "IR/투자",
  "경영관리",
  "기술창업",
  "법무/세무",
];

/**
 * 정렬 옵션을 위한 유틸리티 함수
 * @param books
 * @param sortType
 * @returns 정렬된 책 배열
 */
export const sortBooks = (books: Book[], sortType: string): Book[] => {
  const sortedBooks = [...books];

  switch (sortType) {
    case "loan":
      return sortedBooks.sort((a, b) => b.loanCount - a.loanCount);
    case "publicationYear":
      return sortedBooks.sort((a, b) => b.publicationYear - a.publicationYear);
    case "title":
      return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sortedBooks;
  }
};
