import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 네트워크 에러나 서버 에러 공통 처리
    if (error.response?.status >= 500) {
      alert("서버 에러가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
