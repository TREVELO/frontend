<template>
    <div>
        PlanList화면
        <button class="btn btn-primary"><router-link :to="{ name: 'PlanWrite' }">글작성</router-link></button>

        <b-container>
            <b-table hover :items="planList" :fields="planListfields">

            </b-table>
        </b-container>
    </div>
</template>

<script>
import axiosInstance from '@/api/axiosInstance';

export default {
    data() {
        return {
            planList: [

            ],
            planListfields: [
                {
                    key: 'planName',
                    label: '여행 이름'
                },
                {
                    key: 'planStart',
                    label: '출발 날짜'
                },
                {
                    key: 'planEnd',
                    label: '도착 날짜'
                },
                {
                    key: 'createdat',
                    label: '작성 날짜'
                }
            ],
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