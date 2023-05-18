import jwtDecode from "jwt-decode";
import axiosInstance from "@/api/axiosInstance";

const memberStore = {
    namespaced: true,
    state: {
        token: null, // 토큰 상태
<<<<<<< HEAD
        userinfo: null,
=======
        userinfo: null, // 사용자 정보 상태
>>>>>>> 3aa72f61bc4a843629f66425d40f448110f7374b
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
<<<<<<< HEAD
        async fetchUserinfo({ commit }) {
            try {
                const response = await axiosInstance.get("/member/mypage"); // /mypage로 GET 요청 보내기
                const userinfo = response.data; // 응답 데이터에서 사용자 정보 추출
                commit("SET_USERINFO", userinfo); // SET_USERINFO 뮤테이션을 호출하여 사용자 정보 설정
            } catch (error) {
                console.error(error);
            }
=======
        fetchUserinfo({ commit }) {
            axiosInstance.get("/mypage")
                .then(response => {
                    const userinfo = response.data; // 응답 데이터에서 사용자 정보 추출
                    commit("SET_USERINFO", userinfo); // SET_USERINFO 뮤테이션을 호출하여 사용자 정보 설정
                })
                .catch(error => {
                    console.error(error);
                });
>>>>>>> 3aa72f61bc4a843629f66425d40f448110f7374b
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
