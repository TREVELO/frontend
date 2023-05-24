<template>
  <div>
    planWrite화면
    <div>
      <b-calendar v-model="form.planStart">시작일</b-calendar>
      <b-calendar v-model="form.planEnd">도착일</b-calendar>
    </div>
    <div>시작일 : {{ form.planStart }}</div>
    <div>도착일 : {{ form.planEnd }}</div>
    <div><input type="text" v-model="form.planName"></div>
    <div><button class="btn btn-outline-dark" @click="register"></button></div>
  </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance"
export default {
    data() {
        return {
            form: {
                planStart: '',
                planEnd: '',
                planName: '',
                path:{
                  
                }
          },
            myfavorite : [],
        }
  },
  created() {
    this.getFavoriteList();
  },
  methods : {
    register() {
        console.log(this.form)
    },
      getFavoriteList() {
      axiosInstance.get('http://localhost/api/v1/attraction/favorite')
        .then((res) => {
          this.myfavorite = res.data;
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style>

</style>