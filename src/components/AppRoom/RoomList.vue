<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6">
          <div class="col mb-4" v-for="room in roomList" :key="room.id">
            <router-link
              :to="{ name: 'roomView', params: { roomId: room.id } }"
            >
              <div class="card">
                <img
                  :src="room.picture"
                  class="card-img-top"
                  alt="Room Picture"
                />
                <div class="card-body">
                  <div class="card-rating-container">
                    <h5 class="card-title">{{ room.roomName }}</h5>
                    <div class="rating">
                      <span class="average-rating">{{ room.rating }}</span
                      >★
                    </div>
                  </div>
                  <p class="card-text">
                    <b>₩{{ room.pricePerNight }}/박</b>
                  </p>
                  <p class="card-text">{{ room.address }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
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
    if (this.$route.params.keyword) {
      this.searchRooms(this.$route.params.keyword);
    } else {
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
            rating: room.rating,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    }

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
    searchRooms(keyword) {
      axiosInstance
        .get("/room/search", {
          params: {
            keyword: keyword,
          },
        })
        .then((response) => {
          this.roomList = response.data.map((room) => ({
            id: room.id,
            roomName: room.roomName,
            address: room.address,
            pricePerNight: room.pricePerNight,
            rating: room.rating,
            picture: room.picture,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.card-deck {
  margin-top: 20px;
}

.card {
  width: 16rem;
  height: 25rem;
  margin-bottom: 20px;
  border-radius: 10px; /* 카드의 모서리를 둥글게 설정 */
  border: none; /* 카드의 테두리 제거 */
  overflow: hidden; /* 카드 내용이 넘칠 경우 가려지도록 설정 */
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.col {
  margin-bottom: 20px;
  margin-right: 0px;
}

.router-link {
  color: inherit;
  text-decoration: none;
}

.card-body {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}

.card-title {
  color: black;
  margin-bottom: 10px;
  text-align: left;
}

.card-text {
  color: gray;
  margin-bottom: 5px;
  text-align: left;
}

.average-rating {
  color: black;
  font-size: 14px;
}

.card-rating-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  font-size: 14px;
  color: #ffcc00; /* 노란색 별 */
}
</style>
