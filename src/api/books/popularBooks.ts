import axios from "axios";
import type { PopularBooksResponse } from "./popularBooks.type";

const BASE_URL = "https://api.startup.klr.kr/api/books/popular";

export async function getPopularBooks(
  category?: string
): Promise<PopularBooksResponse> {
  const params = category ? { category } : {};
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
