<template>
    <div>
        <b>MypageView화면</b>
        <table class="table" style="margin-top: 30px;">
            <thead>
                <tr>
                    <th>항목</th>
                    <th>세부사항</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr>
                    <td>이름</td>
                    <td><input type="text" name="" id="" v-model="userinfo.name" readonly></td>
                </tr>
                <tr>
                    <td>아이디</td>
                    <td><input type="text" name="" id="" v-model="userinfo.loginId" readonly></td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td><input type="text" name="" id="" v-model="userinfo.password"></td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td><input type="text" name="" id="" v-model="userinfo.email"></td>
                </tr>
                <tr>
                    <td>회원등급</td>
                    <td><input type="text" name="" id="" v-model="userinfo.grade" readonly></td>
                </tr>
                <tr>
                    <td>마일리지</td>
                    <td><input type="text" name="" id="" v-model="userinfo.mileage" readonly></td>
                </tr>
            </tbody>
        </table>

        <div>
            <button class="btn btn-outline-secondary" @click="memberModify">회원정보 수정</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "MypageModify",
    data() {
        return {
            userinfo: [],
        };
    },
    created() {
        this.userinfo = this.$store.getters["memberStore/getUserinfo"];
        console.log(this.userinfo)
    },
    methods: {
        memberModify(userinfo) {
            if (confirm("회원 정보를 변경하시겠습니까??")) {
                console.log(userinfo)

                this.$router.push({ path: '/mypage' })
            }
        },
    }
}
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