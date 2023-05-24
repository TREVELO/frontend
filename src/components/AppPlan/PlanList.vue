<template>
    <div>
        PlanList화면
        <button class="btn btn-primary"><router-link :to="{name : 'PlanWrite'}">글작성</router-link></button>
    </div>
</template>

<script>
import axiosInstance from '@/api/axiosInstance';

export default {
    data() {
        return {
            planList: [],
        }
    },
    created() {
        this.getPlanList();
    },
    methods: {
        async getPlanList() {
            axiosInstance.get('http://localhost/api/v1/plan/list')
                .then((res) => {
                    this.planList = res.data;
                    console.log(this.planList);
                })
                .catch((err) => {
                console.log(err)
            })
        }
    }

}
</script>

<style></style>