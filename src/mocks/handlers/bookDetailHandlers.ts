import { http, HttpResponse } from "msw";

export const bookDetailHandlers = [
  http.get(`/api/books/:isbn`, () => {
    return HttpResponse.json({
      title: "아몬드",
      author: "손원평",
      publisher: "창비",
      publicationDate: "2017-03-31",
      isbn13: "9788965467588",
      pageCount: 264,
      loanCount: 1785,
      bookImageUrl:
        "https://cdn.ypbooks.co.kr/admin/image/product/202308/ea85f213-cfe2-4a3a-b912-74c5878ad5ed_512.jpg",
      description:
        "감정을 느끼지 못하는 한 소년의 특별한 성장을 그리고 있다. 감정표현불능증(알렉시티미아)을 앓고 있는 열여섯 살 소년 선윤재. 아몬드라 불리는 머릿속 편도체가 작아 분노도 공포도 잘 느끼지 못하는 그는, 다른 사람의 감정에 공감하지 못한다. 그런 그가 소중한 가족을 잃고 세상에 홀로 남겨졌을 때, 새로운 인연을 만나 감정을 배우고 성장해 나가는 이야기.",
    });
  }),
];
