import jwtDecode from "jwt-decode";
import axiosInstance from "@/api/axiosInstance";

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
        RESET_MEMBER_STATE(state) {
            // memberStore의 상태 값을 초기화하는 로직을 작성합니다.
            // 예를 들면 state의 모든 속성 값을 기본값으로 설정할 수 있습니다.
            state.userinfo = null;
            state.token = null;
            // ...
        }
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
                await axiosInstance.get("/member/mypage")
                    .then(({ data }) => {
                        const userinfo = data;
                        commit("SET_USERINFO", userinfo);
                    }); // /mypage로 GET 요청 보내기
                // const userinfo = response.data; // 응답 데이터에서 사용자 정보 추출
                // commit("SET_USERINFO", userinfo); // SET_USERINFO 뮤테이션을 호출하여 사용자 정보 설정
            } catch (error) {
                console.error(error);
            }
        },
        resetMemberState({ commit }) {
            commit('RESET_MEMBER_STATE')
        }
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