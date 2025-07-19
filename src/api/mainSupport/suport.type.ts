// 정부지원사업 API 응답 타입 정의
export interface SupportProgram {
  title: string;
  content: string;
  supportTarget: string;
  supportField: string;
  receptionStartDate: string;
  receptionEndDate: string;
  detailUrl: string;
  organizationName: string;
}

export interface SupportProgramsResponse {
  content: SupportProgram[];
  // 필요시 페이지네이션 등 추가
}
