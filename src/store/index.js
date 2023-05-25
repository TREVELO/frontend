import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import memberStore from "@/store/modules/memberStore";
import ReservationStore from "./modules/ReservationStore";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        memberStore,
        ReservationStore,
    },
    plugins: [
        createPersistedState({
            storage: sessionStorage,
        }),
    ],
});
