<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-4">
            <div class="col mb-4" v-for="room in roomList" :key="room.id">
                <div class="card">
                    <img :src="room.picture" class="card-img-top" alt="Room Picture" />
                    <div class="card-body">
                        <h5 class="card-title">{{ room.roomName }}</h5>
                        <p class="card-text">가격: {{ room.pricePerNight }}</p>
                        <p class="card-text">주소: {{ room.address }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";

export default {
    data() {
        return {
            roomList: [], // 숙소 목록 데이터
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
                    picture:
                        "https://ssafyfinal.s3.ap-northeast-2.amazonaws.com/356511fd-c244-4110-9386-f8febc80571a.jpg", // 첫 번째 사진 URL을 사용합니다.
                }));
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
</script>

<style>
.card-deck {
    margin-top: 20px;
}

.card {
    width: 18rem;
    margin-bottom: 20px;
}
</style>
