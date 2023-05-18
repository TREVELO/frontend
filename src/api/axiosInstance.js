import axios from "axios";
import store from "@/store";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: "http://localhost/api/v1", // API의 기본 URL
});

// Request interceptor를 추가하여 요청을 보낼 때마다 토큰을 가져와 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
    const token = store.getters["memberStore/getToken"];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(config.headers.Authorization);
    }

    return config;
});

export default axiosInstance;
