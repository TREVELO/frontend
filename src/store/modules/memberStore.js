import jwtDecode from "jwt-decode";

const memberStore = {
    namespaced: true,
    state: {
        token: null, // 토큰 상태
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token; // 토큰 상태 업데이트
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
    },
    getters: {
        getToken(state) {
            return state.token; // 토큰 상태 반환
        },
    },
};

export default memberStore;