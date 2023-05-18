import jwtDecode from "jwt-decode";

const memberStore = {
    namespaced: true,
    state: {
        token: null, // 토큰 상태
        userinfo: null, // 사용자 정보 상태
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
        decodeToken({ commit, state }) {
            if (state.token) {
                const decodedToken = jwtDecode(state.token); // 토큰 디코드
                const userinfo = decodedToken.memberId; // 사용자 정보 추출
                console.log(userinfo)
                commit("SET_USERINFO", userinfo); // SET_USERINFO 뮤테이션을 호출하여 사용자 정보 설정
                return userinfo; // 추출한 사용자 정보 반환
            }
            return null;
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