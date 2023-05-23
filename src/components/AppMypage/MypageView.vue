<template>
    <div>
        <b>MypageView화면</b>
        <table class="table col-9" style="margin: 0 auto; margin-top: 30px; ">
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
                    <td>
                        {{ userinfo.mileage }} 원
                        <input v-model="amount" />
                        <button class="btn btn-outline-secondary btn-sm" @click="requestValidation" style="margin: auto">
                            충전
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div>
            <button class="btn btn-outline-secondary">마일리지 충전</button>
            <button class="btn btn-outline-secondary"><router-link to="modify"
                    style="text-decoration: none; color: black;">회원정보
                    수정</router-link></button>
            <button class="btn btn-outline-secondary">관심 관광지</button>
            <button class="btn btn-outline-secondary">예약내역</button>
        </div>
    </div>
</template>

<script>
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axiosInstance from "@/api/axiosInstance";

export default {
    name: "MypageView",
    data() {
        return {
            userinfo: [],
            amount: "",
            tossPaymentsRequestDto: {},
            tossPaymentsResponseDto: {
                amount: "",
                orderId: "",
                orderName: "",
                customerName: "",
                successUrl: "",
                failUrl: "",
            },
        };
    },
    created() {
        this.userinfo = this.$store.getters["memberStore/getUserinfo"];
        this.tossPaymentsRequestDto = {
            amount: "",
            memberId: this.userinfo.id,
            customerEmail: this.userinfo.email,
            customerName: this.userinfo.name,
        };
    },
    methods: {
        async requestValidation() {
            if (this.amount <= 0) {
                alert("1원 이상 입력해주세요.");
                return;
            }

            this.tossPaymentsRequestDto.amount = this.amount;

            try {
                const response = await axiosInstance.post("/payment/", this.tossPaymentsRequestDto);
                this.tossPaymentsResponseDto.amount = response.data.amount;
                this.tossPaymentsResponseDto.orderId = response.data.orderId;
                this.tossPaymentsResponseDto.orderName = response.data.orderName;
                this.tossPaymentsResponseDto.customerName = response.data.customerName;
                this.tossPaymentsResponseDto.successUrl = response.data.successUrl;
                this.tossPaymentsResponseDto.failUrl = response.data.failUrl;
                console.log(this.tossPaymentsResponseDto);

                this.openPaymentWindow();
                console.log("호출");
            } catch (error) {
                console.log(error);
            }
        },
        openPaymentWindow() {
            const clientKey = "test_ck_aBX7zk2yd8yWXEvbYGqVx9POLqKQ";
            console.log("###############");
            console.log(this.tossPaymentsResponseDto);
            loadTossPayments(clientKey)
                .then((tossPayments) => {
                    tossPayments
                        .requestPayment("카드", {
                            amount: this.tossPaymentsResponseDto.amount,
                            orderId: this.tossPaymentsResponseDto.orderId,
                            orderName: this.tossPaymentsResponseDto.orderName,
                            customerName: this.tossPaymentsResponseDto.customerName,
                            successUrl: this.tossPaymentsResponseDto.successUrl,
                            failUrl: this.tossPaymentsResponseDto.failUrl,

                            // amount: this.amount,
                            // orderId: "wq2cftK2rK4WoLl_BfLbl",
                            // orderName: "마일리지 충전",
                            // customerName: this.userinfo.name,
                            // successUrl: "http://localhost/api/v1/payment/success",
                            // failUrl: "http://localhost/api/v1/payment/fail",
                        })
                        .catch(function (error) {
                            if (error.code === "USER_CANCEL") {
                                // 결제 고객이 결제창을 닫았을 때 에러 처리
                                alert("결제를 취소하셨습니다.");
                            } else if (error.code === "INVALID_CARD_COMPANY") {
                                // 유효하지 않은 카드 코드에 대한 에러 처리
                                alert("결제 오류");
                            }
                        });
                })
                .catch((error) => {
                    console.error("Failed to load TossPayments SDK:", error);
                });
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
</style>
