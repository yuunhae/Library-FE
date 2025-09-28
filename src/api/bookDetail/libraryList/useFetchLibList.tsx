import { useInfiniteQuery } from "@tanstack/react-query";
import apiInstance from "../../apiInstance";
import { queryKeys } from "./libList.keys";
import type { GetLibListResponse } from "./libList.type";

const getLibList = async (isbn: string, page: number, region?: string) => {
  const params = { region, page };

  const response = await apiInstance.get<GetLibListResponse>(
    `/api/books/${isbn}/libraries`,
    { params }
  );
  return response.data;
};

export const useFetchLibListQuery = (isbn: string, region?: string) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.libraryId(isbn, region),
    queryFn: ({ pageParam = 1 }) => getLibList(isbn, pageParam, region),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.content),
    initialPageParam: 1,
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
