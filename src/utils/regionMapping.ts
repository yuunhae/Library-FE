const REGION_BOUNDARIES = {
  '11': { // 서울
    name: '서울',
    minLat: 37.4293, maxLat: 37.7013,
    minLng: 126.7653, maxLng: 127.1838
  },
  '21': { // 부산
    name: '부산',
    minLat: 35.0260, maxLat: 35.3960,
    minLng: 128.8080, maxLng: 129.3160
  },
  '22': { // 대구
    name: '대구',
    minLat: 35.6290, maxLat: 36.0640,
    minLng: 128.3540, maxLng: 128.7840
  },
  '23': { // 인천
    name: '인천', 
    minLat: 37.2639, maxLat: 37.6394,
    minLng: 126.1182, maxLng: 126.9388
  },
  '24': { // 광주
    name: '광주',
    minLat: 35.0635, maxLat: 35.2535,
    minLng: 126.7344, maxLng: 127.0144
  },
  '25': { // 대전
    name: '대전',
    minLat: 36.1975, maxLat: 36.4875,
    minLng: 127.2344, maxLng: 127.5644
  },
  '26': { // 울산
    name: '울산',
    minLat: 35.4019, maxLat: 35.7119,
    minLng: 129.0419, maxLng: 129.4219
  },
  '29': { // 세종
    name: '세종',
    minLat: 36.4375, maxLat: 36.6275,
    minLng: 127.2044, maxLng: 127.3344
  },
  '31': { // 경기
    name: '경기',
    minLat: 36.8950, maxLat: 38.3090,
    minLng: 126.4870, maxLng: 127.9630
  },
  '32': { // 강원
    name: '강원',
    minLat: 37.0200, maxLat: 38.6124,
    minLng: 127.5944, maxLng: 129.3644
  },
  '33': { // 충북
    name: '충북',
    minLat: 36.0344, maxLat: 37.2644,
    minLng: 127.4344, maxLng: 128.9644
  },
  '34': { // 충남
    name: '충남',
    minLat: 35.9644, maxLat: 37.1044,
    minLng: 126.1144, maxLng: 127.8444
  },
  '35': { // 전북
    name: '전북',
    minLat: 35.5644, maxLat: 36.2944,
    minLng: 126.4344, maxLng: 127.8644
  },
  '36': { // 전남
    name: '전남',
    minLat: 34.2644, maxLat: 35.4344,
    minLng: 126.0844, maxLng: 127.4344
  },
  '37': { // 경북
    name: '경북',
    minLat: 35.4344, maxLat: 37.1644,
    minLng: 127.9344, maxLng: 129.5644
  },
  '38': { // 경남
    name: '경남',
    minLat: 34.7344, maxLat: 35.8644,
    minLng: 127.6344, maxLng: 129.2644
  },
  '39': { // 제주
    name: '제주',
    minLat: 33.1144, maxLat: 33.5644,
    minLng: 126.1644, maxLng: 126.9444
  }
};

export const getRegionCodeFromCoordinates = (latitude: number, longitude: number): string | null => {
  for (const [code, boundary] of Object.entries(REGION_BOUNDARIES)) {
    if (
      latitude >= boundary.minLat &&
      latitude <= boundary.maxLat &&
      longitude >= boundary.minLng &&
      longitude <= boundary.maxLng
    ) {
      return code;
    }
  }
  return null;
};

export const getRegionNameFromCode = (code: string): string | null => {
  return REGION_BOUNDARIES[code as keyof typeof REGION_BOUNDARIES]?.name || null;
};

export const REGION_CODE_MAP = {
  '서울': '11',
  '부산': '21', 
  '대구': '22',
  '인천': '23',
  '광주': '24',
  '대전': '25',
  '울산': '26',
  '세종': '29',
  '경기': '31',
  '강원': '32',
  '충북': '33',
  '충남': '34',
  '전북': '35',
  '전남': '36',
  '경북': '37',
  '경남': '38',
  '제주': '39'
} as const;