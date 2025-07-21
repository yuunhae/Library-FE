import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetBookDetailResponse } from "./bookDetail.type";
import { queryKeys } from "./bookDetail.keys";
import apiInstance from "../apiInstance";

const getBookDetail = async (isbn: string) => {
  const response = await apiInstance.get<GetBookDetailResponse>(`/api/books/${isbn}`);

  return response.data;
};

const BookDetailQueryOptions = (isbn: string) =>
  queryOptions({
    queryKey: queryKeys.bookId(isbn),
    queryFn: () => getBookDetail(isbn),
  });

export const useFetchBookDetailDataQuery = (isbn: string) => {
  return useSuspenseQuery(BookDetailQueryOptions(isbn));
};
