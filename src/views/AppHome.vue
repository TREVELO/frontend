<template>
  <div class="home">
    <div id="header">
      <main-header />
      <sub-header></sub-header>
    </div>
    <b>Home창</b>
    <div>
      <button class="btn btn-outline-secondary" v-if="isPositionAccesable === false" @click="getCurrentPosition()">
        현재 위치 기반 추천 장소 찾기
      </button>
      <div v-else>
        GPS 동의 상태
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue"
import SubHeader from "@/components/Sub-Header.vue";

export default {
  name: 'AppHome',
  components: {
    'main-header': MainHeader,
    'sub-header': SubHeader,
  },
  data() {
    return {
      position: {},
      isPositionAccesable: false
    }
  },
  methods: {
    getCurrentPosition() {
      if (!navigator.geolocation) {
        alert("위치 정보 기능 사용 불가")
      } else {
        navigator.geolocation.getCurrentPosition(this.getPositionValue, this.gelocationError)
      }
    },
    getPositionValue(val) {
      this.position.latitude = val.coords.latitude;
      this.position.longitude = val.coords.longitude;
      this.isPositionAccesable = true
      console.log("현재 latitude 좌표")
      console.log(this.position.latitude)
      console.log("현재 longitude 좌표")
      console.log(this.position.longitude)
    },
    gelocationError() {
      alert("위치 정보 권한을 허용해 주십시오.")
    }
  }
}
</script>

<style scoped></style>
