// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'

// 각 페이지별 목 데이터를 import 합니다.
import page1Data from '../data/mock1.json';
import page2Data from '../data/mock2.json';
import page3Data from '../data/mock3.json';
import page4Data from '../data/mock4.json';
import page5Data from '../data/mock5.json';

const pages = [page1Data, page2Data, page3Data, page4Data, page5Data];

export const libListHandlers = [
  http.get('/api/books/:isbn/libraries', async ({ request }) => {
    // 스켈레톤 로딩 확인을 위한 지연 추가 (2초)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 1. 요청 URL에서 'page' 파라미터를 읽어옵니다.
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    // 2. 페이지 번호에 맞는 목 데이터를 찾습니다. (배열 인덱스는 0부터 시작)
    const data = pages[page - 1];

    // 3. 해당 페이지 데이터가 있으면 성공 응답을, 없으면 에러 응답을 보냅니다.
    if (data) {
      return HttpResponse.json(data);
    } else {
      // 마지막 페이지 이후의 요청을 테스트하기 위함
      return new HttpResponse(null, { status: 404 });
    }
  }),
]