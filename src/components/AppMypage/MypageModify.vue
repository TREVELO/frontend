<template>
    <div>
        <b>MypageView화면</b>
        <table class="table" style="margin-top: 30px">
            <thead>
                <tr>
                    <th>항목</th>
                    <th>세부사항</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr>
                    <td>이름</td>
                    <td>
                        <input
                            type="text"
                            name=""
                            id=""
                            v-model="memberUpdateDto.name"
                            style="text-align: center"
                            readonly
                        />
                    </td>
                </tr>
                <tr>
                    <td>아이디</td>
                    <td>
                        <input
                            type="text"
                            name=""
                            id=""
                            v-model="memberUpdateDto.loginId"
                            style="text-align: center"
                            readonly
                        />
                    </td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td>
                        <input
                            type="password"
                            name=""
                            id=""
                            v-model="memberUpdateDto.loginPassword"
                            style="text-align: center"
                        />
                    </td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td>
                        <input
                            type="text"
                            name=""
                            id=""
                            v-model="memberUpdateDto.email"
                            style="text-align: center"
                        />
                    </td>
                </tr>
                <tr>
                    <td>회원등급</td>
                    <td>
                        <input
                            type="text"
                            name=""
                            id=""
                            v-model="userinfo.grade"
                            style="text-align: center"
                            readonly
                        />
                    </td>
                </tr>
                <tr>
                    <td>마일리지</td>
                    <td>
                        <input
                            type="text"
                            name=""
                            id=""
                            v-model="userinfo.mileage"
                            style="text-align: center"
                            readonly
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <div>
            <button class="btn btn-outline-secondary" @click="memberModify">회원정보 수정</button>
        </div>
    </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";

export default {
    name: "MypageModify",
    data() {
        return {
            userinfo: [],
            memberUpdateDto: {
                loginId: "",
                loginPassword: "",
                name: "",
                email: "",
            },
        };
    },
    created() {
        this.userinfo = this.$store.getters["memberStore/getUserinfo"];
        console.log(this.userinfo);
        this.memberUpdateDto.loginId = this.userinfo.loginId;
        this.memberUpdateDto.name = this.userinfo.name;
        this.memberUpdateDto.email = this.userinfo.email;
    },
    methods: {
        memberModify() {
            if (!this.memberUpdateDto.loginPassword || !this.memberUpdateDto.email) {
                Swal.fire({
                    icon: "error",
                    title: "수정 할 항목을 작성해주세요.",
                });
                return;
            }

            if (
                Swal.fire({
                    title: "회원 정보를 변경하시겠습니까?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "확인",
                    cancelButtonText: "취소",
                    reverseButtons: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        axiosInstance
                            .put("/member/mypage", this.memberUpdateDto)
                            .then((response) => {
                                console.log(response.data);
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "정보가 수정되었습니다.",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });

                                // 변경된 정보를 가져오기 위해 fetchUserinfo 액션 호출
                                this.$store.dispatch("memberStore/fetchUserinfo").then(() => {
                                    // 변경된 정보로 userinfo 업데이트
                                    this.userinfo = this.$store.getters["memberStore/getUserinfo"];
                                    // 페이지 이동
                                    this.$router.push({ path: "/mypage" });
                                });
                            });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            icon: "error",
                            title: "서버 에러입니다. 잠시후 다시 시도해주세요.",
                        });
                    }
                })
            );

            // if (confirm("회원 정보를 변경하시겠습니까?")) {
            //     axiosInstance
            //         .put("/member/mypage", this.memberUpdateDto)
            //         .then((response) => {
            //             console.log(response.data);
            //             Swal.fire({
            //                 position: "top-end",
            //                 icon: "success",
            //                 title: "정보가 수정되었습니다.",
            //                 showConfirmButton: false,
            //                 timer: 1500,
            //             });

            //             // 변경된 정보를 가져오기 위해 fetchUserinfo 액션 호출
            //             this.$store.dispatch("memberStore/fetchUserinfo").then(() => {
            //                 // 변경된 정보로 userinfo 업데이트
            //                 this.userinfo = this.$store.getters["memberStore/getUserinfo"];
            //                 // 페이지 이동
            //                 this.$router.push({ path: "/mypage" });
            //             });
            //         })
            //         .catch((err) => {
            //             console.log(err.response.data);
            //             alert(err.response.data);
            //         });
            // }
        },
    },
};
</script>

<style scoped>
tr {
    height: 60px;
}

td {
    text-align: center;
    vertical-align: middle;
}

button {
    margin-top: 30px;
    margin-left: 2%;
    margin-right: 2%;
}

input {
    border-radius: 5px;
}
</style>
