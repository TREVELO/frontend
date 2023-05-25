import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isPaidReservations: [], // 결제가 완료된 예약들을 저장하는 배열
    },
    mutations: {
        addPaidReservation(state, reservationId) {
            state.isPaidReservations.push(reservationId);
        },
    },
});
