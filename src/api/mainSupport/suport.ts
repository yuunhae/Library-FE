import axios from "axios";
import type { SupportProgramsResponse } from "./suport.type";

// 카테고리별 정부지원사업 목록 조회
export async function getSupportPrograms(
  category: string = "전체",
  page: number = 1,
  size: number = 20
): Promise<SupportProgramsResponse> {
  const response = await axios.get<SupportProgramsResponse>(
    `https://api.startup.klr.kr/api/startup/support-programs`,
    {
      params: { category, page, size },
    }
  );
  return response.data;
}
