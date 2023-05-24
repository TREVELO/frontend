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
                        <td class="roomNameHover" @click="goToRoomDetail(reservation.roomId)">
                            {{ reservation.roomName }}
                        </td>
                        <td>{{ reservation.totalPrice }}</td>
                        <td>{{ reservation.checkInDate }}</td>
                        <td>{{ reservation.checkOutDate }}</td>
                        <td>{{ reservation.createdat }}</td>
                        <td>
                            <b-button
                                v-if="reservation.isPaid"
                                variant="danger"
                                @click="cancelReservation(reservation.id)"
                            >
                                Cancel Reservation
                            </b-button>
                            <b-button
                                v-else
                                variant="primary"
                                @click="processPayment(reservation.id)"
                            >
                                Process Payment
                            </b-button>
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
        // cancelReservation(reservationId) {
        //     // 예약 취소 로직을 구현하세요.
        // },
        // processPayment(reservationId) {
        //     // 결제 처리 로직을 구현하세요.
        // },
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
</style>
