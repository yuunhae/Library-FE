import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가 (디버깅용)
apiInstance.interceptors.request.use(
  (config) => {
    console.log('API 요청:', {
      url: config.url,
      baseURL: config.baseURL,
      method: config.method
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response);
    return response;
  },
  (error) => {
    console.log('API 에러:', error);
    // 네트워크 에러나 서버 에러 공통 처리
    if (error.response?.status >= 500) {
      alert("서버 에러가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
