<template>
  <div>
    <div class="reservation-container">
      <table class="reservation-table">
        <thead>
          <tr>
            <th>예약 번호</th>
            <th>숙소</th>
            <th>총 결제 금액</th>
            <th>체크인 날짜</th>
            <th>체크아웃 날짜</th>
            <th>예약 생성일</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservationList" :key="reservation.id">
            <td>{{ reservation.id }}</td>
            <td
              class="roomNameHover"
              @click="goToRoomDetail(reservation.roomId)"
            >
              {{ reservation.roomName }}
            </td>
            <td>{{ reservation.totalPrice }}</td>
            <td>{{ reservation.checkInDate }}</td>
            <td>{{ reservation.checkOutDate }}</td>
            <td>{{ reservation.createdat }}</td>
            <td>
              <div v-if="reservation.isPaid">
                <b> 결제 완료 </b>
                <a
                  class="reservationCancel"
                  @click="cancelReservation(reservation.id)"
                >
                  결제취소
                </a>
              </div>
              <div v-else>
                <a
                  class="reservationPayment"
                  @click="processPayment(reservation.id)"
                >
                  결제
                </a>
                <a
                  class="reservationPayment"
                  @click="processPayment(reservation.id)"
                >
                  마일리지
                </a>
                <a
                  class="reservationCancel"
                  @click="cancelReservation(reservation.id)"
                >
                  예약취소
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axiosInstance from "@/api/axiosInstance";

export default {
  data() {
    return {
      reservationList: [],
      userinfo: [],
    };
  },
  computed: {
    ...mapGetters("memberStore", ["getUserinfo"]),
  },
  created() {
    this.userinfo = this.$store.getters["memberStore/getUserinfo"];
    console.log(this.userinfo.email);
    this.fetchReservations();
  },
  methods: {
    fetchReservations() {
      axiosInstance
        .get("/reservation/")
        .then((response) => {
          this.reservationList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelReservation(reservationId) {
      if (!confirm("취소하시겠습니까?")) {
        return;
      }
      axiosInstance
        .delete(`/reservation/${reservationId}`)
        .then((response) => {
          console.log(response);
          this.reservationList = this.reservationList.filter(
            (reservation) => reservation.id !== reservationId
          );
          alert("취소가 완료되었습니다.");
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response.data);
        });
    },
    processPayment(reservationId) {
      if (
        !confirm(
          "예약을 확정하시겠습니까? 총 금액의 90%가 마일리지에서 차감됩니다."
        )
      ) {
        return;
      }

      axiosInstance
        .get(`/reservation/${reservationId}/confirm`)
        .then((response) => {
          console.log(response);
          alert("예약 확정 되었습니다.");

          // 결제 처리 후에 reservationList를 업데이트
          this.reservationList = this.reservationList.map((reservation) => {
            if (reservation.id === reservationId) {
              return {
                ...reservation,
                isPaid: true,
              };
            }
            return reservation;
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response.data);
        });
    },
    goToRoomDetail(roomId) {
      this.$router.push(`/room/view/${roomId}`);
    },
  },
};
</script>

<style scoped>
.reservation-table {
  width: 100%;
  border-collapse: collapse;
}

.reservation-table th,
.reservation-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.reservation-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.reservation-table td:last-child {
  text-align: center;
}

.reservation-container {
  margin: 0 auto; /* 가운데 정렬을 위한 마진 설정 */
  max-width: 90%; /* 컨테이너의 최대 너비 설정 */
}

.roomNameHover:hover {
  color: #007bff;
  cursor: pointer;
}

.reservationCancel {
  color: red;
}

.reservationCancel:hover {
  cursor: pointer;
}

.reservationPayment:hover {
  cursor: pointer;
}
</style>
