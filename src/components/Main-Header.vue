<template>
  <div id="Header"
    style="background-image: url('https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1600');">
    <div id="topHeader">
      <span v-if="this.getUserinfo != null">
        <button id="btn-header"><span style="font-family: 'Karla', sans-serif;">마이페이지</span></button>
        <button id="btn-header" @click="Logout"><span style="font-family: 'Karla', sans-serif;">로그아웃</span></button>
      </span>
      <span v-if="this.getUserinfo === null">
        <button id="btn-header" @click="showRegisterModal = true"><span
            style="font-family: 'Karla', sans-serif;">회원가입</span></button>
        <button id="btn-header" @click="showModal = true"><span
            style="font-family: 'Karla', sans-serif;">로그인</span></button>
      </span>
      <LoginModal v-if="showModal" @close="showModal = false">
      </LoginModal>
      <register-modal-vue v-if="showRegisterModal" @close="showRegisterModal = false">
      </register-modal-vue>
    </div>
    <!-- <img src="../assets/Image Pasted at 2023-5-15 16-35.png" alt=""> -->
    <div id="searchBox">
      <label>
        <input type="text" id="searchWord" placeholder="검색어를 입력해주세요." required
          style="font-family: 'Open Sans', sans-serif; padding-left: 1.5em;">
        <button type="submit" id="btn-search"><font-awesome-icon :icon="['fas', 'magnifying-glass']"
            style="height: 30px; vertical-align: middle;" /></button>
      </label>
    </div>
  </div>
</template>

<script>
import LoginModal from './LoginModal.vue';
import { mapGetters, mapActions } from 'vuex';
import RegisterModalVue from './RegisterModal.vue';
// import memberStore from '@/store/modules/memberStore';

export default {
  name: 'Main_Header',
  data() {
    return {
      showModal: false,
      showRegisterModal: false,
      // userinfo: [],
    }
  },
  components: {
    LoginModal,
    RegisterModalVue,
  },
  computed: {
    ...mapGetters("memberStore", ["getUserinfo"]),
    ...mapActions("memberStore", ["resetMemberState"]),

  },
  methods: {
    Logout() {
      if (confirm('로그아웃하시겠습니까??')) {
        this.$store.dispatch('memberStore/resetMemberState');
        sessionStorage.clear();
        window.location.reload(true)
      }
    },
    mainHeaderReload() {
      window.location.reload(true)
    }
  },
}
</script>

<style scoped>
#Header {
  background-image: -moz-radial-gradient();
  height: 350px;
}

span {
  color: white;
}

span:hover {
  font-weight: bolder;
}

#topHeader {
  vertical-align: middle;
  float: right;
  width: 100%;
  height: 100px;
}

a {
  float: right;
  margin-right: 75px;
  text-decoration: none;
  padding-top: 30px;
}

label {
  margin-top: 30px;
  position: relative;
}

#btn-search {
  position: absolute;
  right: 0px;
  width: 55px;
  height: 55px;
  border-radius: 24px;
  background-color: transparent;
  border: none;
}

#searchWord {
  width: 750px;
  height: 55px;
  border-radius: 24px;
  font-size: large;
}

#btn-header {
  text-align: center;
  padding: auto;
  float: right;
  margin-right: 60px;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  border-radius: 24px;
  opacity: 50%;
  border: none;
  background-color: transparent;
}

::placeholder {
  color: black;
  font-family: 'Open Sans', sans-serif;
}

@import url('https://fonts.googleapis.com/css2?family=Karla&family=Open+Sans&display=swap');
</style>
