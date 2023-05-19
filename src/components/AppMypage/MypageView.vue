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
                    <td>{{ userinfo.name }}</td>
                </tr>
                <tr>
                    <td>아이디</td>
                    <td>{{ userinfo.loginId }}</td>
                </tr>
                <!-- <tr>
                    <td>비밀번호</td>
                    <td>{{ userinfo. }}</td>
                </tr> -->
                <tr>
                    <td>이메일</td>
                    <td>{{ userinfo.email }}</td>
                </tr>
                <tr>
                    <td>회원등급</td>
                    <td>{{ userinfo.grade }}</td>
                </tr>
                <tr>
                    <td>마일리지</td>
                    <td>{{ userinfo.mileage }} 원 </td>
                </tr>
            </tbody>
        </table>

        <div>
            <button class="btn btn-outline-secondary">마일리지 충전</button>
            <button class="btn btn-outline-secondary">회원정보 수정</button>
            <button class="btn btn-outline-secondary">관심 관광지</button>
            <button class="btn btn-outline-secondary">예약내역</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "MypageView",
    data() {
        return {
            userinfo: [],
        };
    },
    created() {
        this.userinfo = this.$store.getters["memberStore/getUserinfo"];
        console.log(this.userinfo)
    }
}
</script>

<style>
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
</style>