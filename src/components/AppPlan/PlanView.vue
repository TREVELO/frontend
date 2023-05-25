<template>
    <div>

        <b-container>
            <div style="margin-bottom: 50px; margin-top: 80px;">
                <div style="display: flex; justify-content: flex-end;">
                    <button class="btn btn-outline-danger" @click="deletePlan">Delete</button>
                </div>
                <div style="text-align: left; font-size: 45px; width: auto;">
                    {{ plan.planName }}
                </div>
                <div style="text-align: right; width: auto;">
                    {{ plan.planStart }} ~ {{ plan.planEnd }}
                </div>
            </div>


            <div>
                {{ plan.path }}
            </div>


        </b-container>

    </div>
</template>

<script>
import axiosInstance from '@/api/axiosInstance';
export default {
    data() {
        return {
            plan: {},
        }
    },
    created() {
        this.getPlan();
    },
    methods: {
        getPlan() {
            let param = this.$route.params.planId;
            console.log(param);

            axiosInstance.get('http://localhost/api/v1/plan/view/' + param)
                .then((res) => {
                    this.plan = res.data;
                    console.log(this.plan)

                    this.plan.path = JSON.parse(this.plan.path)
                    console.log(this.plan)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deletePlan() {
            console.log(this.plan.planId);

            if (confirm("진짜로 삭제??")) {
                axiosInstance.delete('http://localhost/api/v1/plan/delete/' + this.plan.planId)
                    .then(() => {
                        console.log("삭제는 성공")
                        this.$router.push({ name: 'plan' })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
}
</script>

<style></style>