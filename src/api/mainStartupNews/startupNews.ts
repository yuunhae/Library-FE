import apiInstance from "../apiInstance";
import type { StartupNewsResponse } from "./startupNews.type";

export const fetchStartupNews = async (page = 1, size = 20) => {
  const { data } = await apiInstance.get<StartupNewsResponse>(
    `/api/startup/news`,
    {
      params: { page, size },
    }
  );
  return data;
};
