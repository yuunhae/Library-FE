export interface StartupInfo {
  tag: string;
  tagColor?: string;
  date: string;
  title: string;
  org: string;
  desc: string;
  buttonType: "download" | "detail";
}

export const startupInformation: StartupInfo[] = [
  {
    tag: "실태조사",
    tagColor: "bg-[#E5EDFF] text-[#3578FF]",
    date: "2025-09-15",
    title: "2024 창업기업 실태조사 보고서",
    org: "중소기업청 창업진흥원",
    desc: "이 보고서는 중소기업청이 주관하고 창업진흥원이 수행하여 그 결과를 수록한 것입니다.",
    buttonType: "download",
  },
  {
    tag: "공모전결과",
    tagColor: "bg-[#E6F7E6] text-[#3CB371]",
    date: "2025-09-15",
    title: "2024년 창업에듀 영상 콘텐츠 공모전 선정결과",
    org: "중소벤처기업부",
    desc: "2024년 창업에듀 영상 콘텐츠 공모전 선정결과 안내",
    buttonType: "detail",
  },
  {
    tag: "정책분석",
    tagColor: "bg-[#E5EDFF] text-[#3578FF]",
    date: "2025-09-15",
    title: "2024 창업기업 실태조사 보고서",
    org: "중소기업청 창업진흥원",
    desc: "이 보고서는 중소기업청이 주관하고 창업진흥원이 수행하여 그 결과를 수록한 것입니다.",
    buttonType: "download",
  },
  {
    tag: "실태조사",
    tagColor: "bg-[#E5EDFF] text-[#3578FF]",
    date: "2025-09-15",
    title: "2024 창업기업 실태조사 보고서",
    org: "중소기업청 창업진흥원",
    desc: "이 보고서는 중소기업청이 주관하고 창업진흥원이 수행하여 그 결과를 수록한 것입니다.",
    buttonType: "download",
  },
];
