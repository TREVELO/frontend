import jwtDecode from "jwt-decode";
import axiosInstance from "@/api/axiosInstance";

const memberStore = {
    namespaced: true,
    state: {
        token: null, // 토큰 상태
        userinfo: null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token; // 토큰 상태 업데이트
        },
        SET_USERINFO(state, userinfo) {
            state.userinfo = userinfo; // 사용자 정보 상태 업데이트
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit("SET_TOKEN", token); // SET_TOKEN 뮤테이션을 호출하여 토큰 설정
        },
        decodeToken({ state }) {
            if (state.token) {
                const decodedToken = jwtDecode(state.token); // 토큰 디코드
                return decodedToken;
            }
            return null;
        },
        async fetchUserinfo({ commit }) {
            try {
                const response = await axiosInstance.get("/member/mypage"); // /mypage로 GET 요청 보내기
                const userinfo = response.data; // 응답 데이터에서 사용자 정보 추출
                commit("SET_USERINFO", userinfo); // SET_USERINFO 뮤테이션을 호출하여 사용자 정보 설정
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        getToken(state) {
            return state.token; // 토큰 상태 반환
        },
        getUserinfo(state) {
            return state.userinfo; // 사용자 정보 상태 반환
        },
    },
};

export default memberStore;
