export interface StartupNewsItem {
  type: string;
  code: string;
  date: string;
  title: string;
  organization: string;
  contentUrl: string;
  detailUrl: string;
  viewCount: number;
}

export interface StartupNewsResponse {
  content: StartupNewsItem[];
  // 기타 필요한 필드가 있으면 추가
}
