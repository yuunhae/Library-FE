import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import apiInstance from "../../apiInstance";
import { queryKeys } from "./libList.keys";
import type { GetLibListResponse } from "./libList.type";

const getLibList = async (isbn: string, region?: string) => {
  const params = region ? { region } : {};
  const response = await apiInstance.get<GetLibListResponse>(
    `/api/books/${isbn}/libraries`,
    { params }
  );

  return response.data.content;
};

// eslint-disable-next-line react-refresh/only-export-components
const LibListQueryOptions = (isbn: string, region?: string) =>
  queryOptions({
    queryKey: queryKeys.libraryId(isbn, region),
    queryFn: () => getLibList(isbn, region),
  });

export const useFetchLibListQuery = (isbn: string, region?: string) => {
  return useSuspenseQuery(LibListQueryOptions(isbn, region));
};
