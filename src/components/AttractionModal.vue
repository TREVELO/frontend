<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3 slot="header">관광지 정보</h3>
                        <button class="modal-default-button" @click="$emit('close')">
                            닫기
                        </button>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <div class="form-group">
                                <img :src="attraction.first_image" alt="" height="300px" width="300px"
                                    v-if="attraction.first_image" />
                                <img src="https://williesweeneewagon.com/wp-content/plugins/clover-online-orders/public/img/noImg.png"
                                    alt="" v-else>
                            </div>
                            <div class="form-group">
                                <b>이름 : {{ attraction.title }}</b>
                            </div>
                            <div>
                                <b>위치 : {{ attraction.addr }}</b>
                            </div>
                            <button v-if="isLiked == false" class="btn-success btn" style="margin-top: 15px"
                                @click="registerAttraction">
                                관심 관광지 등록하기
                            </button>
                            <button v-else-if="isLiked == true" class="btn-danger btn" style="margin-top: 15px"
                                @click="cancelRegisterAttraction">
                                관심 관광지 취소하기
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<!-- 
이미지 없을때 띄울 이미지 주소 
https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg
-->

<script>
import axiosInstance from "@/api/axiosInstance";

export default {
    data() {
        return {
            userinfo: [],
            favoriteList: [],
            isLiked: false,
        };
    },
    props: {
        attraction: Object,
    },
    mounted() {
        console.log("Modal");
        console.log(this.attraction);
        this.userinfo = this.$store.getters["memberStore/getUserinfo"];
        console.log(this.userinfo);

        axiosInstance.get("http://localhost/api/v1/attraction/favorite")
            .then((res) => {
                this.favoriteList = res.data;
                console.log("favorite List")
                console.log(this.attraction.contentId)
                for (let index = 0; index < this.favoriteList.length; index++) {
                    if (this.favoriteList[index].contentId == this.attraction.contentId) {
                        this.isLiked = true;
                        console.log("가지고있음!!")
                        console.log(this.isLiked)
                        break;
                    }
                }
                console.log(this.favoriteList)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    methods: {
        registerAttraction() {
            // console.log("관심지로 등록하기");

            axiosInstance.post(
                `http://localhost/api/v1/attraction/favorite/regist/${this.attraction.contentId}`)
                .then(() => {
                    this.isLiked = true;
                    alert("관심지 등록 성공")
                    // this.$emit('close');
                })
                .catch((err) => {
                    console.log(err);
                    alert("관심지 등록 실패")
                });
        },
        cancelRegisterAttraction() {
            console.log("관심지 취소하기")

            axiosInstance.post(`http://localhost/api/v1/attraction/favorite/delete/${this.attraction.contentId}`)
                .then(() => {
                    this.isLiked = false;
                    alert("관심지 해제 성공")
                    // this.$emit('close');
                })
                .catch((err) => {
                    console.log(err);
                    alert("관심지 해제 실패")
                })
        }
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Karla&family=Open+Sans&display=swap");

* {
    font-family: "Open Sans", sans-serif;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    color: #555555;
}

.modal-container {
    width: 450px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
    border: #fff;
    color: gray;
    background: #fff;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

#errorMsg {
    color: crimson;
    font-size: 13px;
    list-style: none;
}
</style>
