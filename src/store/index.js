import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import memberStore from "@/store/modules/memberStore";

Vue.use(Vuex);

export default new Vuex.Store({
<<<<<<< HEAD
    modules: {
        memberStore,
    },
    plugins: [
        createPersistedState({
            storage: sessionStorage,
        }),
    ],
});
=======
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
>>>>>>> 2f4562d4bf3cb188f5314537fbbd8a1a2a0d7efc
