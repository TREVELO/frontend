<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-4">
      <div class="col mb-4" v-for="room in roomList" :key="room.id">
        <router-link :to="{ name: 'roomView', params: { roomId: room.id } }">
          <div class="card">
            <img :src="room.picture" class="card-img-top" alt="Room Picture" />
            <div class="card-body">
              <h5 class="card-title">{{ room.roomName }}</h5>
              <p class="card-text">
                <b>₩{{ room.pricePerNight }}/박</b>
              </p>
              <p class="card-text">주소: {{ room.address }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <button v-if="canWriteRoom" class="btn btn-primary" @click="goToWriteRoom">
      숙소 등록
    </button>
  </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      roomList: [], // 숙소 목록 데이터
      canWriteRoom: false, // 숙소 등록 버튼의 가시성을 제어하기 위한 변수
      userinfo: [],
    };
  },
  created() {
    // 숙소 목록 데이터를 백엔드 API로부터 가져옵니다.
    axiosInstance
      .get("/room/")
      .then((response) => {
        // 가져온 데이터를 숙소 목록으로 설정합니다.
        this.roomList = response.data.map((room) => ({
          id: room.id,
          roomName: room.roomName,
          address: room.address,
          pricePerNight: room.pricePerNight,
          picture: room.picture,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    // 로그인한 멤버의 롤(Role)에 따라 숙소 등록 버튼의 가시성을 설정합니다.
    this.userinfo = this.$store.getters["memberStore/getUserinfo"];
    this.canWriteRoom =
      this.userinfo.role == "ADMIN" || this.userinfo.role == "SELLER";
  },
  computed: {
    ...mapGetters("memberStore", ["getUserinfo"]),
  },
  methods: {
    goToWriteRoom() {
      // 숙소 등록 페이지로 이동합니다.
      this.$router.push({ name: "roomWrite" });
    },
  },
};
</script>

<style scoped>
.card-deck {
  margin-top: 20px;
}

.card {
  width: 18rem;
  margin-bottom: 20px;
}

.card-img-top {
  width: 100%;
  height: 200px; /* 원하는 높이로 조정 */
  object-fit: cover;
}

.col {
  margin-bottom: 20px;
  margin-right: 10px; /* 카드 간의 가로 간격 */
}
</style>
