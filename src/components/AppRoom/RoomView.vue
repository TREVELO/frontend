<template>
    <div class="container">
        <div class="row">
            <!-- 중앙 영역 - 숙소 사진 갤러리 -->
            <div class="col-md-8">
                <!-- 선택된 사진 크게 보여주기 -->
                <img :src="selectedPicture" class="img-fluid" alt="Selected Picture" />

                <!-- 사진 갤러리 -->
                <div class="gallery">
                    <div class="row">
                        <div class="col-md-4" v-for="picture in roomPictures" :key="picture">
                            <img
                                :src="picture"
                                class="img-thumbnail"
                                alt="Room Picture"
                                @click="selectPicture(picture)"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 오른쪽 영역 - 숙소 정보 -->
            <div class="col-md-4">
                <h2>{{ roomName }}</h2>
                <p>₩{{ pricePerNight }}/박</p>
                <p>{{ address }}</p>
                <p>{{ introduce }}</p>

                <!-- 달력 컴포넌트 -->
                <b-form-group label="체크인">
                    <b-datepicker
                        v-model="checkInDate"
                        class="form-control"
                        :date-disabled-fn="disabledDates"
                    ></b-datepicker>
                </b-form-group>
                <b-form-group label="체크아웃">
                    <b-datepicker
                        v-model="checkOutDate"
                        class="form-control"
                        :date-disabled-fn="disabledDates"
                    ></b-datepicker>
                </b-form-group>
                <button class="btn btn-primary" @click="makeReservation">예약하기</button>
                <div class="signup-section model-footer" style="text-align: center">
                    <pre v-if="errorshow">
                    <ul id="errorMsg">
                        <li v-for="error in errors" :key="error">
                            <b>{{ error }}</b>
                        </li>
                    </ul>
                </pre>
                </div>
            </div>
        </div>

        <!-- 숙소 수정과 숙소 삭제 버튼 -->
        <div class="row">
            <div class="col-md-4 offset-md-8">
                <button v-if="isOwner" class="btn btn-info spaced-button" @click="goToModifyPage()">
                    숙소 수정
                </button>
                <button v-if="isOwner" class="btn btn-danger spaced-button" @click="deleteRoom">
                    숙소 삭제
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";
import { mapGetters } from "vuex";
import moment from "moment";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            roomId: "",
            roomName: "", // 숙소 이름
            pricePerNight: 0, // 가격
            address: "", // 주소
            introduce: "", // 설명
            selectedDate: "", // 선택된 예약 날짜
            selectedPicture: "", // 선택된 사진
            roomPictures: [], // 숙소 사진 목록
            ownerId: "",
            userinfo: [],
            isOwner: false,
            errors: [],
            errorshow: false,
            reservedDates: [], // 예약된 날짜 목록
            checkInDate: new Date().toISOString().substr(0, 10),
            checkOutDate: new Date().toISOString().substr(0, 10),
        };
    },
    computed: {
        ...mapGetters("memberStore", ["getUserinfo"]),
        // 예약된 날짜를 비활성화할 함수
    },
    created() {
        this.userinfo = this.$store.getters["memberStore/getUserinfo"];
        // roomId를 라우트 파라미터에서 가져옴
        this.roomId = this.$route.params.roomId;

        // roomId를 이용하여 숙소 정보를 가져옴
        this.fetchRoomData(this.roomId);
        this.fetchReservedDates(this.roomId);
    },
    methods: {
        // 사진 선택 시 호출되는 메서드
        selectPicture(picture) {
            this.selectedPicture = picture;
        },
        // API를 통해 숙소 정보를 가져오는 메서드
        fetchRoomData(roomId) {
            axiosInstance
                .get(`/room/${roomId}`)
                .then((response) => {
                    const roomData = response.data; // 백엔드에서 받아온 데이터
                    console.log(roomData);
                    // 숙소 정보 초기화
                    this.roomName = roomData.roomName;
                    this.pricePerNight = roomData.pricePerNight;
                    this.address = roomData.address;
                    this.introduce = roomData.introduce;
                    this.ownerId = roomData.ownerId;
                    // 숙소 사진 목록 초기화
                    this.roomPictures = roomData.roomPictures;

                    // 초기 선택된 사진 초기화
                    this.selectedPicture = roomData.roomPictures[0];

                    this.isOwner = this.userinfo.id == this.ownerId;
                    console.log(this.isOwner);
                })
                .catch((error) => {
                    console.error("Error fetching room data:", error);
                });
        },
        deleteRoom() {
            confirm("정말 삭제하시겠습니까?");
            const roomId = this.$route.params.roomId;

            axiosInstance
                .delete(`/room/${roomId}`)
                .then((response) => {
                    console.log(response.data);
                    // 삭제 성공 시, 처리 로직 추가
                    // 예를 들어, 삭제 후 홈 화면으로 이동하거나 메시지를 표시하는 등의 작업을 수행할 수 있습니다.
                    alert(response.data);
                    const vm = this; // 컴포넌트 인스턴스를 변수에 저장
                    setTimeout(function () {
                        vm.$router.push({ name: "roomList" }); // setTimeout 내에서 $router.push 호출
                    }, 0);
                })
                .catch((error) => {
                    console.error("Error deleting room:", error);
                });
        },
        async makeReservation() {
            // 예약 생성 로직

            if (!this.checkInDate) {
                await Swal.fire({
                    icon: "error",
                    title: "체크인 날짜를 선택해주세요.",
                });
                return;
            }

            if (!this.checkOutDate) {
                await Swal.fire({
                    icon: "error",
                    title: "체크아웃 날짜를 선택해주세요.",
                });
                return;
            }

            if (this.checkInDate > this.checkOutDate) {
                await Swal.fire({
                    icon: "error",
                    title: "예약 날짜가 올바르지 않습니다.",
                });
                return;
            }
            var today = moment().startOf("day");

            if (moment(this.checkInDate).isBefore(today)) {
                await Swal.fire({
                    icon: "error",
                    title: "체크인 날짜는 오늘 이후를 선택해주세요.",
                });
                return;
            }

            const checkIn = moment(this.checkInDate, "YYYY-MM-DD");
            const checkOut = moment(this.checkOutDate, "YYYY-MM-DD");
            const nights = checkOut.diff(checkIn, "days");

            const result = await Swal.fire({
                title: `${this.checkInDate} 부터 ${this.checkOutDate} 까지 예약하시겠습니까?`,
                text: `총 숙박 금액의 10%(${
                    (nights + 1) * this.pricePerNight * 0.1
                })가 예약금으로 결제 될 것입니다.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "예약",
                cancelButtonText: "취소",
            });

            if (result.isConfirmed) {
                const reservationData = {
                    roomId: this.roomId,
                    customerId: this.userinfo.id,
                    checkInDate: this.checkInDate,
                    checkOutDate: this.checkOutDate,
                };
                console.log(reservationData);
                axiosInstance
                    .post(`/reservation/${this.roomId}`, reservationData)
                    .then((response) => {
                        console.log(response.data);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "예약이 완료되었습니다.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this.$router.push({ name: "ReservationList" });
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                        this.errors = [];
                        this.errors.push(error.response.data);
                        alert(this.errors);
                        if (!this.errorshow) {
                            this.errorshow = true;
                        }
                    });
            }
        },
        goToModifyPage() {
            var roomId = this.roomId;
            this.$router.push({ name: "roomModify", params: { roomId } });
        },
        // 예약된 날짜 조회 API 호출
        fetchReservedDates(roomId) {
            axiosInstance
                .get(`/reservation/date/${roomId}`)
                .then((response) => {
                    this.reservedDates = response.data.map((item) => item.reservationDate);
                    console.log(this.reservedDates);
                })
                .catch((error) => {
                    console.error("Error fetching reserved dates:", error);
                });
        },
        disabledDates(ymd, date) {
            const formattedDate = moment(date).format("YYYY-MM-DD");
            const isBeforeToday = moment(date).isBefore(moment(), "day");
            const isReservedDate = this.reservedDates.includes(formattedDate);

            return isBeforeToday || isReservedDate; // 이전 날짜 또는 예약된 날짜에 대해 비활성화 처리
        },
    },
};
</script>

<style>
.gallery {
    margin-top: 20px;
}

.gallery .img-thumbnail {
    cursor: pointer;
}

.gallery .img-thumbnail:hover {
    border-color: #007bff;
}

.spaced-button {
    margin-right: 10px; /* 원하는 간격 크기를 지정합니다. */
}

#errorMsg {
    color: crimson;
    font-size: 13px;
    list-style: none;
}
</style>
