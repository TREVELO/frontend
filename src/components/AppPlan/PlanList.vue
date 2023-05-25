<template>
    <div>
        <b-container>
            <div style="display: flex; justify-content: flex-end; margin-top: 20px; margin-bottom: 30px;">
                <button class="btn btn-outline-primary" @click="gowrite">글작성</button>
            </div>
            <b-table hover :items="planList" :fields="planListfields" @row-clicked="view">
                <template #cell(planName)="row">
                    <span>{{ row.item.planName }}</span>
                </template>
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
                    console.log("여행계획", this.planList);

                    for (var index = 0; index < this.planList.length; index++) {
                        this.planList[index].createdat = this.planList[index].createdat.substring(0, 10) + " " + this.planList[index].createdat.substring(11, this.planList[index].createdat.length);
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        },
        view(item) {
            this.$router.push({ name: 'PlanView', params: { planId: item.planId } })
        },
        gowrite() {
            this.$router.push({ name: 'PlanWrite' })
        }
    }

}
</script>

<style></style>