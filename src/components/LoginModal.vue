<template>
    <div>
        <transition name="modal">
            <div v-if="defaultLoginModalVisible" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 slot="header">로그인</h3>
                            <button class="modal-default-button" @click="$emit('close')">X</button>
                        </div>

                        <div class="modal-body">
                            <slot name="body">
                                <form @submit.prevent="login">
                                    <div class="form-group">
                                        <input
                                            type="text"
                                            v-model="form.loginId"
                                            class="form-control"
                                            id="loginId"
                                            placeholder="Your login id..."
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="password"
                                            v-model="form.loginPassword"
                                            class="form-control"
                                            id="password"
                                            placeholder="Your password..."
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            class="btn btn-info btn-block btn-round"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </slot>
                        </div>

                        <div class="signup-section model-footer" style="text-align: center">
                            회원이 아니신가요? <a href="#a" class="text-info"> 회원 가입</a>.
                        </div>

                        <div
                            class="signup-section model-footer"
                            style="text-align: center"
                            @click="showLoginIdFind"
                        >
                            아이디를 잊으셨나요? <span class="findRequest"> 아이디 찾기</span>.
                        </div>

                        <div
                            class="signup-section model-footer"
                            style="text-align: center"
                            @click="showPasswordFind"
                        >
                            비밀번호를 잊으셨나요?
                            <span class="findRequest"> 비밀번호 찾기</span>.
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- 아이디 찾기 모달 -->
        <transition name="modal">
            <div v-if="loginIdFindModalVisible" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 slot="header">아이디 찾기</h3>
                            <button class="modal-default-button" @click="closefindLoginModal">
                                X
                            </button>
                        </div>
                        <!-- 아이디 찾기 모달 내용 -->
                        <form @submit.prevent="findLoginId">
                            <div class="form-group">
                                <input
                                    type="hidden"
                                    v-model="informationFindRequestDto.loginId"
                                    class="form-control"
                                    id="loginId"
                                    placeholder="Your login id..."
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    v-model="informationFindRequestDto.email"
                                    class="form-control"
                                    id="email"
                                    placeholder="Your email..."
                                />
                            </div>
                            <div>
                                <button type="submit" class="btn btn-info btn-block btn-round">
                                    아이디 찾기
                                </button>
                            </div>
                        </form>
                        <br />
                        <div class="signup-section model-footer">
                            <div v-if="findInformationShow">
                                <ul id="errorMsg">
                                    <li
                                        v-for="result in findInformationArr"
                                        :key="result"
                                        style="text-align: center"
                                    >
                                        <b>{{ result }}</b>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button class="modal-default-button" @click="showLoginPage">
                                로그인
                            </button>
                            <button class="modal-default-button" @click="closefindLoginModal">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- 비밀번호 찾기 모달 -->
        <transition name="modal">
            <div v-if="passwordResetModalVisible" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 slot="header">비밀번호 찾기</h3>
                            <button class="modal-default-button" @click="closePasswordModal">
                                X
                            </button>
                        </div>
                        <!-- 비밀번호 찾기 모달 내용 -->
                        <form @submit.prevent="findPassword">
                            <div class="form-group">
                                <input
                                    type="text"
                                    v-model="informationFindRequestDto.loginId"
                                    class="form-control"
                                    id="loginId"
                                    placeholder="Your login id..."
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    v-model="informationFindRequestDto.email"
                                    class="form-control"
                                    id="email"
                                    placeholder="Your email..."
                                />
                            </div>
                            <div>
                                <button type="submit" class="btn btn-info btn-block btn-round">
                                    비밀번호 찾기
                                </button>
                            </div>
                        </form>
                        <br />
                        <div class="signup-section model-footer">
                            <div v-if="findInformationShow">
                                <ul id="errorMsg">
                                    <li
                                        v-for="result in findInformationArr"
                                        :key="result"
                                        style="text-align: center"
                                    >
                                        <b>{{ result }}</b>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button class="modal-default-button" @click="showLoginPage">
                                로그인
                            </button>
                            <button class="modal-default-button" @click="closePasswordModal">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

//import MainHeaderVue from './Main-Header.vue';

export default {
    data() {
        return {
            form: {
                loginId: "",
                loginPassword: "",
            },
            informationFindRequestDto: {
                loginId: "",
                email: "",
            },
            errors: [],
            errorshow: false,
            defaultLoginModalVisible: true,
            passwordResetModalVisible: false,
            loginIdFindModalVisible: false,
            findInformationArr: [],
            findInformationShow: false,
        };
    },
    computed: {
        ...mapGetters("memberStore", ["getUserinfo"]),
    },

    methods: {
        ...mapActions("memberStore", ["setToken", "getToken", "fetchUserinfo"]), // Vuex의 memberStore 모듈의 setToken 액션을 매핑

        validationCheck() {
            if (!this.form.loginId) {
                this.errors.push("아이디를 입력해주세요.");
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "아이디를 입력해주세요.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else if (!this.form.loginPassword) {
                this.errors.push("비밀번호를 입력해주세요.");
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "비밀번호를 입력해주세요.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
        async login() {
            console.log("login request");
            console.log("id = " + this.form.loginId + " password " + this.form.loginPassword);
            this.validationCheck();
            // console.log(this.errors);
            if (this.errors.length === 0) {
                console.log(this.form);

                try {
                    const response = await axios.post(
                        "http://localhost/api/v1/member/login",
                        this.form
                    );
                    console.log(response.data);

                    const token = response.data; // 응답에서 토큰 추출

                    // 토큰을 세션 스토리지에 저장
                    sessionStorage.setItem("token", token);

                    // Vuex의 memberStore 모듈의 setToken 액션을 호출하여 토큰 설정
                    this.$store.dispatch("memberStore/setToken", token);
                    console.log(token);
                    console.log("token is");
                    console.log(this.$store.getters["memberStore/getToken"]);
                    console.log(sessionStorage.getItem("token"));

                    try {
                        this.userinfo = this.$store.dispatch("memberStore/fetchUserinfo");
                    } catch (err) {
                        console.log(err);
                    }

                    console.log("유저 정보");

                    await Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "로그인 되었습니다.",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    this.$emit("close");
                    //{ MainHeaderVue.mainHeaderReload() }
                } catch (error) {
                    console.log(error.response.data);
                    this.errors = [];
                    this.errors.push(error.response.data);
                    if (!this.errorshow) {
                        this.errorshow = true;
                    }
                    await Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `${this.errors}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        },
        showPasswordFind() {
            this.defaultLoginModalVisible = false;
            this.passwordResetModalVisible = true;
            this.loginIdFindModalVisible = false;
        },
        showLoginIdFind() {
            this.defaultLoginModalVisible = false;
            this.passwordResetModalVisible = false;
            this.loginIdFindModalVisible = true;
        },
        showLoginPage() {
            this.defaultLoginModalVisible = true;
            this.passwordResetModalVisible = false;
            this.loginIdFindModalVisible = false;
        },
        async findLoginId() {
            if (!this.informationFindRequestDto.email) {
                await Swal.fire({
                    icon: "error",
                    title: "이메일은 필수 입력 사항입니다.",
                });
                return;
            }

            await axios
                .post("http://localhost/api/v1/member/find/id", this.informationFindRequestDto)
                .then((response) => {
                    this.findInformationArr.push(response.data);
                    if (!this.findInformationShow) {
                        this.findInformationShow = true;
                    }
                    console.log(response.data);
                })
                .catch((err) => {
                    this.findInformationArr = [];
                    this.findInformationArr.push(err.response.data);
                    if (!this.findInformationShow) {
                        this.findInformationShow = true;
                    }
                    console.log(err.response.data);
                });
        },
        async findPassword() {
            if (!this.informationFindRequestDto.email) {
                await Swal.fire({
                    icon: "error",
                    title: "이메일은 필수 입력 사항입니다.",
                });
                return;
            }
            if (!this.informationFindRequestDto.loginId) {
                await Swal.fire({
                    icon: "error",
                    title: "아이디는 필수 입력 사항입니다.",
                });
                return;
            }

            await axios
                .post(
                    "http://localhost/api/v1/member/find/password",
                    this.informationFindRequestDto
                )
                .then((response) => {
                    this.findInformationArr.push(response.data);
                    this.findInformationShow = true;
                    console.log(response.data);
                })
                .catch((err) => {
                    this.findInformationArr = [];
                    this.findInformationArr.push(err.response.data);
                    if (!this.findInformationShow) {
                        this.findInformationShow = true;
                    }

                    console.log(this.findInformationShow);
                    console.log(this.findInformationArr);
                    console.log(err.response.data);
                });
        },
        closePasswordModal() {
            this.passwordResetModalVisible = false;
            this.$emit("close");
        },
        closefindLoginModal() {
            this.loginIdFindModalVisible = false;
            this.$emit("close");
        },
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

.findRequest {
    color: #17a2b8;
}

.findRequest:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
