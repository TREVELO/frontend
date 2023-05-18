// axiosInstance.js

import axios from 'axios';
import store from '@/store';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost/api/v1', // API의 기본 URL
    headers: {
        common: {
            Authorization: `Bearer ${store.getters['memberStore/getToken']}`, // 토큰을 가져와 헤더에 추가
        },
    },
});

export default axiosInstance;
