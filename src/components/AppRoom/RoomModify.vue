<template>
    <div class="container">
        <h1>숙소 수정</h1>
        <form @submit.prevent="submitForm">
            <b-form-group label="숙소 이름" label-for="roomName">
                <b-form-input id="roomName" v-model="formData.roomName" required></b-form-input>
            </b-form-group>

            <b-row>
                <b-col cols="9">
                    <b-form-group label="주소" label-for="address">
                        <div class="input-group">
                            <b-form-input
                                id="address"
                                :value="formattedAddress"
                                disabled
                                required
                            ></b-form-input>
                            <b-button variant="secondary" @click="openDaumPostcode">
                                우편번호 찾기
                            </b-button>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group label="하룻밤 가격" label-for="pricePerNight">
                        <b-form-input
                            id="pricePerNight"
                            type="number"
                            v-model="formData.pricePerNight"
                            required
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-group label="숙소 소개" label-for="introduce">
                <b-form-textarea
                    id="introduce"
                    v-model="formData.introduce"
                    required
                    rows="6"
                ></b-form-textarea>
            </b-form-group>

            <div class="form-group">
                <label for="imageUpload">사진 업로드</label>
                <div class="image-upload">
                    <div class="upload-button">
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            multiple
                            @change="handleImageUpload"
                            style="display: none"
                        />
                        <label for="imageUpload">
                            <i class="fas fa-upload"></i>
                            <span>사진 선택</span>
                        </label>
                    </div>
                    <!-- 이미지 목록 출력 -->
                    <div class="image-list">
                        <div class="image-item" v-for="(image, index) in imageFiles" :key="index">
                            <img :src="getImageUrl(image)" alt="Image" class="uploaded-image" />
                            <!-- 이미지 제거 버튼 -->
                            <button
                                type="button"
                                class="btn btn-remove-image"
                                @click="removeImage(index)"
                            >
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <b-modal v-if="selectedImageIndex !== null" @hide="selectedImageIndex = null">
                <img
                    :src="imageFiles[selectedImageIndex].url"
                    alt="Selected Image"
                    @click="openImageModal(selectedImageIndex)"
                />
            </b-modal>

            <b-button type="submit" variant="primary">수정</b-button>
        </form>
    </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            formData: {
                roomName: "",
                address: "",
                introduce: "",
                pricePerNight: null,
            },
            imageFiles: [],
            selectedImageIndex: null,
            roomId: "",
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
    created() {
        // 수정할 숙소 정보를 백엔드 API로부터 가져옵니다.
        this.roomId = this.$route.params.roomId;
        axiosInstance
            .get(`/room/${this.roomId}`)
            .then((response) => {
                const room = response.data;
                this.formData.roomName = room.roomName;
                this.formData.address = room.address;
                this.formData.introduce = room.introduce;
                this.formData.pricePerNight = room.pricePerNight;
                this.imageFiles = room.roomPictures.map((url) => ({
                    url,
                    file: null,
                }));
            })
            .catch((error) => {
                console.error("숙소 정보를 가져오지 못했습니다:", error);
            });
    },
    methods: {
        submitForm() {
            if (
                !this.formData.roomName ||
                !this.formData.address ||
                !this.formData.introduce ||
                !this.formData.pricePerNight ||
                this.imageFiles.length == 0
            ) {
                Swal.fire({
                    icon: "error",
                    title: "모든 요소가 입력되어야 합니다.",
                });
                return;
            }
            const roomUpdateRequestDto = {
                roomName: this.formData.roomName,
                address: this.formData.address,
                introduce: this.formData.introduce,
                pricePerNight: this.formData.pricePerNight,
            };

            const json = JSON.stringify(roomUpdateRequestDto);
            const jsonBlob = new Blob([json], { type: "application/json" });

            const formData = new FormData();
            formData.append("roomUpdateRequestDto", jsonBlob);

            this.imageFiles.forEach((image) => {
                if (image.file) {
                    formData.append("imageList", image.file, image.file.name);
                }
            });

            axiosInstance
                .put(`/room/${this.roomId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    // 등록 성공 시, 처리 로직 추가
                    console.log("숙소 등록 성공:", response.data);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "숙소가 수정되었습니다.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.$router.push("/room/list");
                })
                .catch((error) => {
                    console.error("숙소 등록 실패:", error);
                });
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
        // 이미지 관련 메소드들 추가
        openImageModal(index) {
            this.selectedImageIndex = index;
        },
        handleImageUpload(event) {
            const files = Array.from(event.target.files);
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const url = e.target.result;
                    this.imageFiles.push({
                        url,
                        file,
                    });
                };
                reader.readAsDataURL(file);
            });
        },
        removeImage(index) {
            this.imageFiles.splice(index, 1);
        },
        getImageUrl(image) {
            if (image.url) {
                return image.url;
            }
            return URL.createObjectURL(image.file);
        },
    },
};
</script>

<style scoped>
.container {
    margin: 0 auto;
    padding: 20px;
}

.input-group {
    display: flex;
    align-items: center;
}

.input-group > * {
    margin-right: 10px;
}

.form-group {
    margin-bottom: 20px;
}

.image-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.image-item {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
}

.uploaded-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
}

.btn-remove-image {
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    border: none;
    color: red;
    cursor: pointer;
}
</style>
