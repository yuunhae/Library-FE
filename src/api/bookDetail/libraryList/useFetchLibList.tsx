import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import apiInstance from "../../apiInstance";
import { queryKeys } from "./libList.keys";
import type { GetLibListResponse } from "./libList.type";

const getLibList = async (isbn: string) => {
  const response = await apiInstance.get<GetLibListResponse>(
    `/api/books/${isbn}/libraries`
  );

  return response.data.content;
};

// eslint-disable-next-line react-refresh/only-export-components
const LibListQueryOptions = (isbn: string) =>
  queryOptions({
    queryKey: queryKeys.libraryId(isbn),
    queryFn: () => getLibList(isbn),
  });

export const useFetchLibListQuery = (isbn: string) => {
  return useSuspenseQuery(LibListQueryOptions(isbn));
};
