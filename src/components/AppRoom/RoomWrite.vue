<template>
    <div class="container">
        <h1>숙소 등록</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="roomName">숙소 이름</label>
                <input
                    type="text"
                    class="form-control"
                    id="roomName"
                    v-model="formData.roomName"
                    required
                />
            </div>
            <div class="form-group">
                <label for="address">주소</label>
                <div>
                    <input
                        type="text"
                        class="form-control"
                        id="address"
                        :value="formattedAddress"
                        disabled
                        required
                    />
                    <button type="button" class="btn btn-secondary" @click="openDaumPostcode">
                        우편번호 찾기
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label for="introduce">소개</label>
                <textarea
                    class="form-control"
                    id="introduce"
                    v-model="formData.introduce"
                    required
                ></textarea>
            </div>
            <div class="form-group">
                <label for="pricePerNight">하룻밤 가격</label>
                <input
                    type="number"
                    class="form-control"
                    id="pricePerNight"
                    v-model="formData.pricePerNight"
                    required
                />
            </div>
            <div class="form-group">
                <label for="imageUpload">사진 업로드</label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    @change="handleImageUpload"
                />
            </div>
            <button type="submit" class="btn btn-primary">등록</button>
        </form>
    </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";

export default {
    data() {
        return {
            formData: {
                roomName: "",
                address: "",
                introduce: "",
                pricePerNight: null,
                sidoCode: 5,
            },
            imageFiles: [],
        };
    },
    computed: {
        formattedAddress() {
            // 주소의 특정 형식으로 포맷팅하여 보여줄 수 있음
            return `${this.formData.address}`; // 예시: 시/도, 시/군/구, 도로명 주소 등
        },
    },
    mounted() {
        // Daum 우편번호 서비스 스크립트 로딩 대기
        if (typeof daum === "undefined") {
            setTimeout(this.openDaumPostcode, 1000); // 1초 후에 openDaumPostcode 메서드 호출
        }
    },
    methods: {
        submitForm() {
            const roomCreateRequestDto = {
                roomName: this.formData.roomName,
                address: this.formData.address,
                introduce: this.formData.introduce,
                pricePerNight: this.formData.pricePerNight,
                sidoCode: this.formData.sidoCode,
            };

            const json = JSON.stringify(roomCreateRequestDto);
            const jsonBlob = new Blob([json], { type: "application/json" });

            const formData = new FormData();
            formData.append("roomCreateRequestDto", jsonBlob);

            this.imageFiles.forEach((image) => {
                formData.append("imageList", image, image.name);
            });

            axiosInstance
                .post("/room/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    // 등록 성공 시, 처리 로직 추가
                    console.log("숙소 등록 성공:", response.data);
                    this.$router.push("/room/list");
                })
                .catch((error) => {
                    console.error("숙소 등록 실패:", error);
                });
        },
        handleImageUpload(event) {
            // 이미지 파일 업로드 처리
            this.imageFiles = Array.from(event.target.files);
        },
        openDaumPostcode() {
            // Daum 우편번호 서비스 팝업을 열어서 주소를 선택하는 기능
            const self = this;
            new window.daum.Postcode({
                oncomplete(data) {
                    // 주소 선택 완료 시 콜백 함수
                    self.formData.address = data.address; // 선택한 주소를 폼 데이터에 할당
                    // 나머지 필요한 주소 정보를 필드에 할당하는 로직 추가
                },
            }).open();
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}
</style>
