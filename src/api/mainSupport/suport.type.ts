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
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
