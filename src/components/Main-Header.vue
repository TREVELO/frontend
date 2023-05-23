<template>
  <div id="Header"
    style="background-image: url('data:image/jpeg;base64,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');">
    <!-- data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDw8QEA8VFRUVDw8VDw8PDw8VDxcPFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGC0dHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKsBJgMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QALhAAAgIBAgUCBgICAwAAAAAAAAECEQMSIQQxQVFhE3EFgZGhscFS0TLhFELw/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQG/8QAHhEBAQEAAQUBAQAAAAAAAAAAABEBAgMSEyExUUH/2gAMAwEAAhEDEQA/APWhE0oUS0fSvnC0hRQEpEUGkugotWI0hRdCoVImhaS6CgRFBpNKChVjPSOi6ChUiKHRVDoUiKHRVBRKsTQUXQUKRFDoqgoUiKBougoUjOh0XQUKRFBRVAKQqCh0OhSJolo0oGiUjLSFF0FFqRm4io0oloVNxDQimIqHE0RnAtDWsUAAZaMBoApAVQUSkTQ6KoKFImgougoUiKHRVBQpE0FFUOhSIodFUFCiaHQ6HRBFBRdBQoigougoUiKCi6FRaRFBRdBQpEUFFUFAIB0FEENCo0aIaKJExsTKzrKQDkBpz3DiUiYlomt4aGkCRSRGwkOhpDozVhJDopIEiVYVBRVDoUiaCiqHQpEUFF0FEpEUOiqHQpEUFF0FCkRQ6KoKFImgougoVYmhUXQUKkRQUXQqFIihUXQUKRFBRVAWkTQqLFQpE0S0W0JoVIyZDNWiGjSayYDaGaYiYmiIiaxRN1rMNItIEikjG63mEkVQ0hpEqigoqgIqaHRVBQCoKHQyKVBQx0KiaCigoUKgodDoUTQUVQUKRNBRVAKJoKKAVYmgodBQpE0Ki6ChRFCosVComgoqgoURRNGlEtFGTRDRtJGbRrNY1i0BTQGkTBG0URjRvFGd1rMNIaRSQ0jNbhUOhpDM1YkdDoBSFQ6GFEpCGAxVhBQ6HQpEgVQUKQqCigohE0FFUFAiQoqgoETQUVQUCJoKKoARNCouhAiaAqhUUiaCiqChSIomjShNFqbjKSM5I3aM5I1ms7jCSAqSA2xBjRvFGWNG8Uc911zDodDAzWoAoYECoC8eNy5L37Gy4KfPb67k3lmfdazhy35jnAcotc017ocMUpbJdBUm/Enq8H8K1Rud9dk1X1K4bhVCn/2/lW69ux04c+mat7PaTdvY8/U6u764vV0+hme+Tmj8LipW3avZdPn3Fxnw5c4bbct2n/R6+Tx8vYwyK+pxzq8ra7b0eEkfNgepP4em5O+d8jgy4ZQ5+aZ6+PUzk8XPpcuLMBjo3WIVCoqgoUiaGOgFQhUUKhVhAXjg5NJf6OhfD57cvq+RneeZ9Xjw5cvmOMDuj8Nle8veluTk4Bq6kntyqmTy8f1rw8/xxgbPGlG3z6JdPcyN5tY3IQDAIkTRYiiGjOSNpLuvqjOSLmpuOeSAuaEbrEd0vh6X+LfzoceEl4M+HWV7v9I64Tkv8t32PLvLln9r3ePhv8jDJwsl59ilwktN2vY6ZZZPt9OQU2qb+RPJyXxcXDPG1zXt2Jo9HHhTpPdDycE5O1GMfZ/kvlz+sb0N/jp+G4V6SvtdryzocEluRwHDOEXckkrfLne+5rmwKST25bNL9Hk5beW+3s45OOOXJii6ven8jKGFapVya5flms4V1+5lF7/0bzdjO5lbqh5MSa6jwYFzvcvLJLnL5WjN9+mp+teEzxUVFbUZZMt/7OPIt9nXlMvHTe7f2Hbn0v8AGm/8vwc2bL0a3/o3nGlSOTJG+RvixyZz4Z1afyMGmuaO6EW0U622OmdTc+uO9HN+enDDFJ8kPJhlHmvmuR3QnW30LybrmPJtPBkeUXixuTSX1rZLudcMMYv+zowNat9qW3YvLq/iceh+6wxfD3zb9qX5s0lwkEt1bv7/ANHZLiobqn7ozlNSWz+q6nHyct+u+dPhnxlj4VbypW+vQqtLT8lQybGebfYl3d9tTM+NZy1O6pdxaO+5ELSCTIrHPjjfK1zOTJg322/B21Zk00dePLccuXDNYw4bu/kEsK7GkshjPIazeWs9nHP4Txxb7bq2ux62HgFC2uq5HkYnb3+x6WPit3bfSjPU3l8xrp5xtiuIwxkqZ5XFcJW8fmn+j2dnucPFvmjPT57mr1OGcs9vFkB3+nH+Kb8gery48ng39VfRP6WVjg+srRzYtXY1i5JnJ6XTjxxVu/t+C336eTjnkk/6Jtme2r3O+OXxe/8A6jtw5sdNvZ1um9/l3PCvyxLPJE3pVc6ke1/zZW+VdNv2Y55ym3Jv2V2l7HkzzSfMj1Jd/ki50om9V6it85P2Ffn5HmRm1yK9SXcvYne9VT6X9BSjj7/dnBjlJcy3luydi9zo9CN/5P8AR0Rx0udnl+sy/Usbx0zlj0YyvZtfs3WNJHiPJ5LXFOqv7md6e/xc6mf13SbTdMnUnyONcSOU7Ndup3Y6nMbdnJ6yRS4jz8h26d2OhltUk3z6HJ/yfJUcyZJq3G0Jb7/IWvZ1+TCWQzUrZe1O50wzSbSW7/R0T2OTCpJp3RvLJfMzyz36a4769q9UNZlPG6scYPq/oSYt1vCVGeVkt+SMj2GZ7N30xnIhuxSN8VV+Tr8xy+6wjFpprY7MfJfZmMpFxZnl7a45HQ8zrcwyzsVWLKkkjOZmNXdYZdgJmr5gdM1iFj4hdWhzzX1+hhBGkYeBMX2uD8mqSJi2uhWrwvsTTC07bidA34Jt9gh0gioth6ngPWXYez009KIaUjF5yfWE0uNtiWkZeoN5CxKpolhqDUVD9MahHuJDpIEDUSJTHqIci4aEaRijGyrCNWkJkJjiRTaZKTNHAqIpBHpubqWxKkkKeWkY3238OV9/qYOck+YTnfNmOTKuhrMZ3W74mXT8C9aXU5ZZiHmZrsZ73Xr8mss5xY2+xbQ3jhnJpPib28lQy789jFRRQmF11viI9DDNxarYybXU58jRM44u8tXPjJe3hJfsDkkwOnbn4x3b+tseY3jnPMx5F3N4yXcbxXvejHOV6xwxki1JGe3F7nQ8xLymWpC1IRO5o8gtTI1BrLCq1DTMnkDWIlbWhajLUPWIVpqHbIUxuYVepg2zLWCmIVpYCYgi7GididRFa6hazJMdiFdUcvITyGGoWsna13NnkM5TZGoeosZqJNiWOT3o01D9QtSYmPD92aKEUS5Etk9r6a6hWZ2LUIVrQiVITmA2jOcUVqMsuQYvpE4oDny5QNzWbjjxJ9zsxxfc5cTOzGa3WMxpFGsUZxZojFah0FFodEqxlXkK8mjQaUWkZ15FRtQmiUjKgo0YRii1Iigrya6UKiVYiikUoiYpBqFrBINKAnUKzTShxQpDxwKlEERNka9ZgZNksRWVWLUSJlReoFIzEIlbag1GQhCtdQlIgAVrqFrM2JiLVyymGSfkJnHmLmJvJObJuBhkYHWOdf/Z -->
    <div id="topHeader">
      <span v-if="this.getUserinfo != null">
        <button id="btn-header" @click="goMypage"><span style="font-family: 'Karla', sans-serif;">마이페이지</span></button>
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
      <label style="display: inline-block; margin-left: 10px;">
        <select v-model="searchbox.subject">
          <option v-for="(item, index) in this.searchbox.subjectList" :key="index" :value="item.value">
            {{ item.name }}
          </option>
        </select>
        <input type="text" id="searchWord" placeholder="검색어를 입력해주세요." required
          style="background-color: white; font-family: 'Open Sans', sans-serif; padding-left: 9.5em;"
          v-model="searchbox.sentence">
        <button type="submit" id="btn-search" @click="goSearch(searchbox)">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="height: 30px; vertical-align: middle;" />
        </button>
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
      searchbox: {
        subject: "-1",
        subjectList: [
          {
            name: "유형 선택", value: "-1"
          },
          {
            name: "관광지", value: "12"
          },
          {
            name: "문화시설", value: "14"
          },
          {
            name: "축제공연행사", value: "15"
          },
          {
            name: "여행코스", value: "25"
          },
          {
            name: "레포츠", value: "28"
          },
          {
            name: "숙박", value: "32"
          },
          {
            name: "쇼핑", value: "38"
          },
          {
            name: "음식점", value: "39"
          }
        ],
        sentence: ""
      },
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
    },
    goMypage() {
      if (this.$route.path !== '/mypage/view') {
        this.$router.push({ name: 'mypage' })
      }

    },
    goSearch(searchbox) {
      console.log("goSearch 실행")
      console.log(searchbox)
      if (searchbox.subject == -1) {
        alert("유형을 선택해주세요!!")
      } else if (searchbox.sentence == "") {
        alert("검색어를 입력해주세요!!")
      } else {
        console.log(this.$route.path)
        if (this.$route.path === '/map/Map') {
          console.log("A")
          this.$route.params.subject = searchbox.subject;
          this.$route.params.sentence = searchbox.sentence;
          this.$emit('mark');
        } else {
          console.log("B")
          this.$router.push({ name: 'MapMap', params: { subject: searchbox.subject, sentence: searchbox.sentence } })
            .catch(() => {

            });
        }
      }
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
  color: black;
  font-weight: bold;
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

/* a {
  float: right;
  margin-right: 75px;
  text-decoration: none;
  padding-top: 30px;
} */

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

select {
  height: 50px;
  margin-left: 20px;
  position: absolute;
  border: none;
  vertical-align: middle;
  margin-top: 3px;
  color: blue;
  font-size: large;
  font-weight: bold;
}

@import url('https://fonts.googleapis.com/css2?family=Karla&family=Open+Sans&display=swap');
</style>
