<template>
    <div class="container">
        <div class="row">
            <!-- 왼쪽 영역 - 숙소 정보 -->
            <div class="col-md-4">
                <h2>{{ roomName }}</h2>
                <p>가격: {{ pricePerNight }}</p>
                <p>주소: {{ address }}</p>
                <p>설명: {{ introduce }}</p>
                <p>예약 날짜 선택:</p>
                <!-- 달력 컴포넌트 -->
                <input
                    type="text"
                    v-model="selectedDate"
                    class="form-control"
                    placeholder="날짜 선택"
                />
            </div>

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
            <button v-if="isOwner" class="btn btn-info spaced-button" @click="deleteRoom">
                숙소 수정
            </button>
            <button v-if="isOwner" class="btn btn-danger spaced-button" @click="deleteRoom">
                숙소 삭제
            </button>
        </div>
    </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
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
        };
    },
    computed: {
        ...mapGetters("memberStore", ["getUserinfo"]),
    },
    created() {
        this.userinfo = this.$store.getters["memberStore/getUserinfo"];
        // roomId를 라우트 파라미터에서 가져옴
        const roomId = this.$route.params.roomId;

        // roomId를 이용하여 숙소 정보를 가져옴
        this.fetchRoomData(roomId);
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
</style>
