<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" style="border-radius: 24px">
                    <div class="modal-header">
                        <h3 slot="header">회원가입</h3>
                        <button class="modal-default-button" @click="$emit('close')">X</button>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <form @submit.prevent="join">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        v-model="form.name"
                                        class="form-control"
                                        id="name"
                                        placeholder="Your Name..."
                                    />
                                </div>

                                <div class="form-group">
                                    <input
                                        type="text"
                                        v-model="form.loginId"
                                        class="form-control"
                                        id="loginId"
                                        placeholder="Your Id..."
                                    />
                                </div>

                                <div class="form-group">
                                    <input
                                        type="password"
                                        v-model="form.loginPassword"
                                        class="form-control"
                                        id="loginPassword"
                                        placeholder="Your Password..."
                                    />
                                </div>

                                <div class="form-group">
                                    <input
                                        type="date"
                                        v-model="form.birthday"
                                        class="form-control"
                                        id="birthday"
                                    />
                                </div>

                                <div class="form-group">
                                    <input
                                        type="email"
                                        v-model="form.email"
                                        class="form-control"
                                        id="email"
                                        placeholder="Your email..."
                                    />
                                </div>

                                <div>
                                    <button type="submit" class="btn btn-info btn-block btn-round">
                                        Join
                                    </button>
                                </div>
                            </form>
                        </slot>
                    </div>

                    <!-- <div class="signup-section model-footer" style="text-align: center;">회원이 아니신가요? <a href="#a"
                            class="text-info"> 회원 가입</a>.
                    </div>

                    <div class="signup-section model-footer" style="text-align: center;">비밀번호를 잊으셨나요? <a href="#a"
                            class="text-info"> 비밀번호 찾기</a>.
                    </div> -->
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from "axios";
// import memberStore from "@/store/modules/memberStore";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            form: {},
            errors: [],
        };
    },
    computed: {
        ...mapGetters("memberStore", ["getUserinfo"]),
    },

    methods: {
        ...mapActions("memberStore", ["setToken", "getToken", "fetchUserinfo"]), // Vuex의 memberStore 모듈의 setToken 액션을 매핑

        validationCheck() {
            if (!this.form.name) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "이름을 입력해주세요.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }
            if (!this.form.loginId) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "아이디를 입력해주세요.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }
            if (!this.form.loginPassword) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "비밀번호를 입력해주세요.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }
            if (!this.form.birthday) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "생일을 입력해주세요.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }
            if (!this.form.email) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "이메일을 입력해주세요.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }
        },
        async join() {
            console.log("join request");
            console.log(this.form);
            this.validationCheck();
            // console.log(this.errors);
            if (this.errors.length === 0) {
                console.log(this.form);

                try {
                    const response = await axios.post(
                        "http://localhost/api/v1/member/join",
                        this.form
                    );
                    console.log(response.data);

                    // const token = response.data; // 응답에서 토큰 추출

                    // // 토큰을 세션 스토리지에 저장
                    // sessionStorage.setItem("token", token);

                    // // Vuex의 memberStore 모듈의 setToken 액션을 호출하여 토큰 설정
                    // this.$store.dispatch("memberStore/setToken", token);
                    // console.log(token);
                    // console.log("token is");
                    // console.log(this.$store.getters["memberStore/getToken"]);
                    // console.log(sessionStorage.getItem("token"));

                    // console.log("userinfo 생성");

                    // this.$store.dispatch("memberStore/fetchUserinfo");
                    // console.log("유저 정보")

                    await Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "회원 가입 되었습니다.",
                        showConfirmButton: false,
                        timer: 1000,
                    });

                    this.$emit("close");
                    window.location.reload(true);
                } catch (error) {
                    console.log(error.response.data);
                    this.errors = [];
                    this.errors.push(error.response.data);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `${this.errors}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    return;
                }
            }
        },
    },
};
</script>

<style scoped>
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
    border-radius: 24px;
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
    border-radius: 24px;
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
